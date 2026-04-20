// Reshapes the Vite build output into Vercel Build Output API v3 format.
// Runs after `vite build` in Vercel's build pipeline.
// https://vercel.com/docs/build-output-api/v3
import { cpSync, mkdirSync, writeFileSync, rmSync } from "node:fs";

const out = ".vercel/output";

rmSync(out, { recursive: true, force: true });

// Static assets → served directly by Vercel's CDN
mkdirSync(`${out}/static`, { recursive: true });
cpSync("dist/client", `${out}/static`, { recursive: true });

// Server bundle → Node.js serverless function
// Edge Runtime is not viable because TanStack Start's server bundle imports
// node:events, node:async_hooks, node:stream which Edge Runtime doesn't support.
const fnDir = `${out}/functions/ssr.func`;
mkdirSync(fnDir, { recursive: true });
cpSync("dist/server", fnDir, { recursive: true });

// Adapter: bridges Vercel's Node.js IncomingMessage/ServerResponse to the
// Web Fetch API handler that TanStack Start exports as its default export.
writeFileSync(
  `${fnDir}/_adapter.js`,
  `
import app from './index.js';

export default async function handler(req, res) {
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host  = req.headers['x-forwarded-host'] || req.headers.host;
  const url   = new URL(req.url, \`\${proto}://\${host}\`);

  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (v == null) continue;
    Array.isArray(v) ? v.forEach(val => headers.append(k, val)) : headers.set(k, v);
  }

  let body = undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    body = Buffer.concat(chunks);
  }

  const request  = new Request(url.toString(), { method: req.method, headers, body });
  const env = {};
  const ctx = { waitUntil: () => {}, passThroughOnException: () => {} };
  const response = await app.fetch(request, env, ctx);

  res.statusCode = response.status;
  response.headers.forEach((v, k) => res.setHeader(k, v));
  res.end(Buffer.from(await response.arrayBuffer()));
}
`.trimStart(),
);

// Tell Node.js to treat all .js files in the function directory as ES modules,
// matching the ESM syntax used by both _adapter.js and the TanStack Start bundle.
writeFileSync(`${fnDir}/package.json`, JSON.stringify({ type: "module" }, null, 2));

// Node.js 22 serverless runtime — no Edge limitations, full Node.js API support.
writeFileSync(
  `${fnDir}/.vc-config.json`,
  JSON.stringify(
    { runtime: "nodejs22.x", handler: "_adapter.js", launcherType: "Nodejs" },
    null,
    2,
  ),
);

// Routing: static files first (CDN hit), everything else to SSR function.
writeFileSync(
  `${out}/config.json`,
  JSON.stringify(
    {
      version: 3,
      routes: [
        { handle: "filesystem" },
        { src: "^/(.*)$", dest: "/ssr" },
      ],
    },
    null,
    2,
  ),
);

console.log("✓  Vercel Build Output API (Node.js 22 serverless) written to .vercel/output/");
