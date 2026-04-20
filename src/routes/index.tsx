import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VALENCE | Engineered for the Obsessed" },
      { name: "description", content: "High-performance gym apparel engineered for the obsessed. Phase I Limited Release." },
      { property: "og:title", content: "VALENCE | Engineered for the Obsessed" },
      { property: "og:description", content: "High-performance gym apparel engineered for the obsessed. Phase I Limited Release." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.slice(0, 3);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-5 sm:px-8 text-center overflow-hidden">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Phase I — Limited Release
        </div>

        <h1 className="wordmark text-foreground text-[clamp(2.5rem,13vw,12rem)] leading-none">
          VALENCE
        </h1>
        <p className="mt-6 text-sm sm:text-base text-muted-foreground tracking-[0.2em] uppercase">
          Engineered for the Obsessed.
        </p>
        <Link
          to="/shop"
          className="mt-12 inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-colors rounded-none"
          style={{ backgroundColor: "#9B5FFF" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0047FF")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#9B5FFF")}
        >
          Enter Phase I
        </Link>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="block w-px h-8 bg-border" />
          Scroll
        </div>
      </section>

      {/* FEATURED */}
      <section className="px-5 sm:px-8 py-24 mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">001 — Catalog</div>
            <h2 className="font-display text-3xl sm:text-4xl mt-3">Featured units</h2>
          </div>
          <Link to="/shop" className="text-xs uppercase tracking-[0.2em] link-hover hidden sm:inline-block">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="px-5 sm:px-8 py-24 border-t border-border">
        <div className="mx-auto max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">002 — Thesis</div>
          <p className="mt-6 font-display text-2xl sm:text-3xl leading-snug text-foreground">
            Most apparel is designed for spectators. Ours is designed for the people who track macros, log lifts, and read the studies before they cite them.
          </p>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            Every garment carries the molecular structure of a compound that does the work. The graphic is not decoration. It is the receipt.
          </p>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section className="px-5 sm:px-8 py-24 border-t border-border">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">003 — Access</div>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">Get early access to Phase I.</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              setSubmitted(true);
              setEmail("");
            }}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@protocol.io"
              className="flex-1 bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cobalt"
            />
            <button
              type="submit"
              className="px-6 py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-colors rounded-none"
              style={{ backgroundColor: "#9B5FFF", fontFamily: "var(--font-display)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0047FF")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#9B5FFF")}
            >
              Submit
            </button>
          </form>
          {submitted && (
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-cryo">
              Registered. Standby for Phase I dispatch.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
