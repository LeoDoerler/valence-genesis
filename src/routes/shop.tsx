import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Catalog | VALENCE" },
      { name: "description", content: "Explore the Phase I collection featuring molecularly inspired designs." },
      { property: "og:title", content: "Catalog | VALENCE" },
      { property: "og:description", content: "Explore the Phase I collection featuring molecularly inspired designs." },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-24">
      <div className="mb-12">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Catalog — Phase I</div>
        <h1 className="font-display text-4xl sm:text-5xl mt-3">Shop</h1>
        <p className="mt-4 text-sm text-muted-foreground max-w-md">
          {products.length} units in current rotation. All apparel runs S through XXL.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}
