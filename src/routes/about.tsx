import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "VALENCE — About | Engineered for the Obsessed." },
      { name: "description", content: "The thesis behind Valence." },
      { property: "og:title", content: "VALENCE — About" },
      { property: "og:description", content: "The thesis behind Valence." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <section className="mx-auto max-w-3xl px-5 sm:px-8 py-20 sm:py-32">
      <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">About</div>
      <h1 className="font-display text-4xl sm:text-5xl mt-3">The thesis.</h1>

      <div className="mt-12 space-y-8 text-base text-foreground leading-relaxed">
        <p>
          Valence exists because most performance apparel is designed for people who like the idea of training. Ours is designed for the people who actually do it. The ones who track sleep, periodize blocks, and know the difference between volume and intensity.
        </p>
        <p>
          Every garment carries the molecular structure of a compound that does measurable work in the human body. Caffeine. Citrulline. Testosterone. The graphics are not aesthetics. They are the underlying mechanism, printed on the fabric.
        </p>
        <p>
          Phase I is the first release. Limited units, structured fits, and fabric weights chosen for the gym floor — not the lookbook. If you understand the references, you understand the brand.
        </p>
      </div>

      {/* Founder */}
      <div className="mt-20 border-t border-border pt-14">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">The architect</div>
        <blockquote className="mt-8 space-y-5 text-base text-foreground leading-relaxed">
          <p>
            I started Valence because I genuinely couldn't find what I was looking for. I'm a student who spends a lot of time in the gym and a lot of time reading about nutrition, supplements, and biology — and the apparel aimed at people like me never felt right. It was either too aggressive or too generic.
          </p>
          <p>
            I wanted something that had a real design language behind it. Pieces that look clean with no context, but mean something if you know what you're looking at.
          </p>
          <p>
            I built this for people who actually know their stuff, and want their wardrobe to reflect that without having to explain it.
          </p>
        </blockquote>
        <p className="mt-8 font-display text-lg" style={{ color: "#9B5FFF" }}>
          Leo — Founder & Architect, Valence
        </p>
      </div>
    </section>
  );
}
