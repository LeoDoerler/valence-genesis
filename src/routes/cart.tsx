import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart, cartSubtotal } from "@/lib/cart";
import { SHIPPING_FLAT, FREE_SHIPPING_THRESHOLD } from "@/lib/products";
import { Minus, Plus, X } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "VALENCE — Cart | Engineered for the Obsessed." },
      { name: "description", content: "Review your selection." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const [checkingOut, setCheckingOut] = useState(false);

  const subtotal = cartSubtotal(items);
  const shipping = items.length === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-5 sm:px-8 py-32 text-center">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Cart</div>
        <h1 className="font-display text-4xl mt-3">Empty.</h1>
        <p className="mt-4 text-sm text-muted-foreground">No units selected.</p>
        <Link
          to="/shop"
          className="mt-10 inline-block bg-primary px-8 py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground hover:bg-cobalt transition-colors"
        >
          Enter shop
        </Link>
      </section>
    );
  }

  function handleCheckout() {
    setCheckingOut(true);
    // Stripe not yet enabled — placeholder confirmation.
    setTimeout(() => {
      alert(
        "Checkout placeholder.\n\nStripe test-mode payments are not yet enabled on this project.\nTo activate real checkout, enable Lovable Stripe payments from chat.",
      );
      setCheckingOut(false);
    }, 400);
  }

  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-24">
      <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Cart</div>
      <h1 className="font-display text-4xl sm:text-5xl mt-3">Selection.</h1>

      <div className="mt-12 grid lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-16">
        {/* Items */}
        <div className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <div key={`${item.slug}-${item.size ?? ""}`} className="py-6 flex gap-5">
              <div className="w-24 h-32 bg-card flex-shrink-0 border border-border">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="font-display text-base">{item.name}</h3>
                    {item.size && (
                      <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        Size {item.size}
                      </div>
                    )}
                  </div>
                  <div className="text-sm tabular-nums">${(item.price * item.quantity).toFixed(2)}</div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQty(item.slug, item.size, item.quantity - 1)}
                      aria-label="Decrease"
                      className="p-2 hover:text-primary transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-3 text-sm tabular-nums">{item.quantity}</span>
                    <button
                      onClick={() => setQty(item.slug, item.size, item.quantity + 1)}
                      aria-label="Increase"
                      className="p-2 hover:text-primary transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => remove(item.slug, item.size)}
                    aria-label="Remove"
                    className="text-muted-foreground hover:text-destructive transition-colors flex items-center gap-2 text-xs uppercase tracking-[0.2em]"
                  >
                    <X className="h-3 w-3" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="py-4 flex justify-end">
            <button
              onClick={clear}
              className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear cart
            </button>
          </div>
        </div>

        {/* Summary */}
        <aside className="border border-border p-6 h-fit lg:sticky lg:top-24">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Summary</div>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="tabular-nums">
                {shipping === 0 ? <span className="text-cryo">Free</span> : `$${shipping.toFixed(2)}`}
              </dd>
            </div>
            {subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="text-[10px] text-cryo uppercase tracking-[0.2em] pt-2">
                ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} from free shipping
              </p>
            )}
          </dl>
          <div className="mt-6 pt-6 border-t border-border flex justify-between text-base">
            <span className="font-display">Total</span>
            <span className="tabular-nums font-display">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={checkingOut}
            className="mt-8 w-full bg-primary py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground hover:bg-cobalt transition-colors disabled:opacity-60"
          >
            {checkingOut ? "Processing…" : "Checkout"}
          </button>
          <Link
            to="/shop"
            className="mt-4 block text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground link-hover"
          >
            ← Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}
