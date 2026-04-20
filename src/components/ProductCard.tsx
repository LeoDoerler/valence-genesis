import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const [hover, setHover] = useState(false);
  const showHover = hover && product.hoverImage && product.hoverImage !== product.image;

  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-card border border-border group-hover:border-cobalt transition-colors">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
          style={{ opacity: showHover ? 0 : 1, filter: "brightness(3) contrast(1.1)" }}
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden
            loading="lazy"
            width={1024}
            height={1280}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
            style={{ opacity: showHover ? 1 : 0, filter: "brightness(3) contrast(1.1)" }}
          />
        )}
        {product.hasSizes && (
          <span className="absolute top-3 left-3 text-[10px] tracking-[0.2em] uppercase text-cryo border border-cryo px-2 py-1">
            Limited Units — Phase I
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="font-display text-base text-foreground">{product.name}</h3>
        <span className="text-sm text-muted-foreground tabular-nums">${product.price}</span>
      </div>
    </Link>
  );
}
