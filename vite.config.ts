// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// When building on Vercel (VERCEL=1 is set automatically), skip the
// Cloudflare Workers bundler so the output is a plain Web Fetch API
// handler that Vercel Edge Functions can run directly.
export default defineConfig({
  cloudflare: !process.env.VERCEL,
});
