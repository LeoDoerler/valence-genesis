import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, SIZES } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p
      ? `VALENCE — ${p.name} | Engineered for the Obsessed.`
      : "VALENCE — Product";
    return {
      meta: [
        { title },
        { name: "description", content: p?.description ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: p?.description ?? "" },
        ...(p ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="px-5 py-32 text-center">
      <h1 className="font-display text-3xl">Unit not found</h1>
      <Link to="/shop" className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-primary">
        Return to shop
      </Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const add = useCart((s) => s.add);
  const [size, setSize] = useState<string | null>(product.hasSizes ? null : null);
  const [error, setError] = useState("");

  function handleAdd() {
    if (product.hasSizes && !size) {
      setError("Select a size.");
      return;
    }
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.hasSizes ? size : null,
    });
    navigate({ to: "/cart" });
  }

  return (
    <article className="mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Image */}
        <div className="relative aspect-[4/5] bg-card border border-border">
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={1280}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {product.hasSizes && (
            <span className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase text-cryo border border-cryo px-2 py-1">
              Limited Units — Phase I
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Phase I — Unit
          </div>
          <h1 className="font-display text-3xl sm:text-4xl mt-3">{product.name}</h1>
          <div className="mt-2 text-lg text-muted-foreground tabular-nums">${product.price}</div>

          <p className="mt-8 text-sm text-foreground leading-relaxed">{product.description}</p>

          {product.hasSizes && (
            <div className="mt-10">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Size</div>
              <div className="grid grid-cols-5 gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSize(s);
                      setError("");
                    }}
                    className={`py-3 text-xs uppercase tracking-[0.2em] border transition-colors ${
                      size === s
                        ? "border-primary text-primary"
                        : "border-border text-foreground hover:border-cobalt"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
            </div>
          )}

          <button
            onClick={handleAdd}
            className="mt-8 w-full bg-primary py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground hover:bg-cobalt transition-colors"
          >
            Add to cart
          </button>

          {/* Fabric specs */}
          <section className="mt-14 border-t border-border pt-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-cryo mb-4">Fabric specs</div>
            <dl className="divide-y divide-border">
              <div className="grid grid-cols-3 py-3 text-sm">
                <dt className="text-muted-foreground uppercase text-xs tracking-wider">GSM</dt>
                <dd className="col-span-2 text-foreground tabular-nums">{product.fabric.gsm}</dd>
              </div>
              <div className="grid grid-cols-3 py-3 text-sm">
                <dt className="text-muted-foreground uppercase text-xs tracking-wider">Composition</dt>
                <dd className="col-span-2 text-foreground">{product.fabric.composition}</dd>
              </div>
              <div className="grid grid-cols-3 py-3 text-sm">
                <dt className="text-muted-foreground uppercase text-xs tracking-wider">Fit</dt>
                <dd className="col-span-2 text-foreground">{product.fabric.fit}</dd>
              </div>
            </dl>
          </section>

          {/* Molecular design */}
          <section className="mt-12 border-t border-border pt-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-cryo mb-4">Molecular design</div>
            <div className="text-sm text-foreground font-display">{product.molecular.compound}</div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {product.molecular.role}
            </p>
          </section>

          {/* Reviews placeholder */}
          <section className="mt-12 border-t border-border pt-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Reviews</div>
            <p className="text-sm text-muted-foreground">
              No reviews yet. Phase I is in initial dispatch.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
