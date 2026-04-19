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
    </section>
  );
}
