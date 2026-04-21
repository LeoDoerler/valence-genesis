import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-card border border-border group-hover:border-cobalt transition-colors">
        <img
          src={product.image}
          alt={product.altText}
          loading="lazy"
          width={1024}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {product.hasSizes && (
          <span className="absolute top-3 left-3 text-xs uppercase px-2 py-1" style={{ color: "#00FFD1", fontWeight: 700, letterSpacing: "0.1em" }}>
            Limited Units — Phase I
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="font-display text-base" style={{ color: "#F5F5F5" }}>{product.name}</h3>
        <span className="text-sm tabular-nums font-display" style={{ color: "#F5F5F5" }}>${product.price}</span>
      </div>
    </Link>
  );
}
