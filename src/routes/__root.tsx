import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">Signal lost</h2>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you're looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center bg-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground hover:bg-cobalt transition-colors"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VALENCE — Engineered for the Obsessed." },
      { name: "description", content: "Technical apparel for the chemically literate. Phase I limited release." },
      { name: "theme-color", content: "#000000" },
      { property: "og:title", content: "VALENCE — Engineered for the Obsessed." },
      { property: "og:description", content: "Technical apparel for the chemically literate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        {/* Google Analytics 4 — replace G-VALENCE2026 with your real Measurement ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VALENCE2026" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-VALENCE2026');
`,
          }}
        />
      </head>
      <body className="bg-background text-foreground">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
