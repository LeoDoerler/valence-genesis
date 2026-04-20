// Reshapes the Vite build output into Vercel Build Output API v3 format.
// Runs after `vite build` in Vercel's build pipeline.
// https://vercel.com/docs/build-output-api/v3
import { cpSync, mkdirSync, writeFileSync, rmSync } from "node:fs";

const out = ".vercel/output";

rmSync(out, { recursive: true, force: true });

// Static assets → served directly by Vercel's CDN
mkdirSync(`${out}/static`, { recursive: true });
cpSync("dist/client", `${out}/static`, { recursive: true });

// Server bundle → Vercel Edge Function
const fnDir = `${out}/functions/ssr.func`;
mkdirSync(fnDir, { recursive: true });
cpSync("dist/server", fnDir, { recursive: true });

// Tell Vercel to run this as an Edge Function.
// TanStack Start's server entry exports `export default { fetch }` —
// the same Web Fetch API interface Vercel Edge expects.
writeFileSync(
  `${fnDir}/.vc-config.json`,
  JSON.stringify({ runtime: "edge", entrypoint: "index.js" }, null, 2),
);

// Routing: serve static files first (CDN), fall through to SSR for everything else.
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

console.log("✓  Vercel Build Output API written to .vercel/output/");
