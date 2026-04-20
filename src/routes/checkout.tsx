import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart, cartSubtotal } from "@/lib/cart";
import { SHIPPING_FLAT, FREE_SHIPPING_THRESHOLD } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout | VALENCE" },
      { name: "description", content: "Complete your Phase I order." },
    ],
  }),
  component: Checkout,
});

type FormFields = {
  fullName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

const empty: FormFields = {
  fullName: "", email: "", street: "", city: "", state: "", zip: "",
  cardNumber: "", expiry: "", cvv: "",
};

function formatCardNumber(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

function generateOrderNumber() {
  return "VLC-" + Math.random().toString(36).toUpperCase().slice(2, 8);
}

function Checkout() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const subtotal = cartSubtotal(items);
  const shipping = items.length === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  const [fields, setFields] = useState<FormFields>(empty);
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [orderNumber, setOrderNumber] = useState("");

  function set(key: keyof FormFields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validate(): boolean {
    const e: Partial<FormFields> = {};
    if (!fields.fullName.trim()) e.fullName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Valid email required";
    if (!fields.street.trim()) e.street = "Required";
    if (!fields.city.trim()) e.city = "Required";
    if (!fields.state.trim()) e.state = "Required";
    if (!/^\d{5}$/.test(fields.zip)) e.zip = "5-digit ZIP required";
    if (fields.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "16-digit card number required";
    if (!/^\d{2}\/\d{2}$/.test(fields.expiry)) e.expiry = "MM/YY required";
    if (!/^\d{3,4}$/.test(fields.cvv)) e.cvv = "3–4 digits required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setOrderNumber(generateOrderNumber());
    clear();
  }

  if (orderNumber) {
    return (
      <section className="mx-auto max-w-lg px-5 sm:px-8 py-32 text-center">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Phase I — Dispatch</div>
        <div className="mt-8 flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
            <circle cx="24" cy="24" r="23" stroke="#9B5FFF" strokeWidth="1.5" />
            <path d="M14 24.5l7 7 13-14" stroke="#00FFD1" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </div>
        <h1 className="mt-6 font-display text-3xl sm:text-4xl" style={{ color: "#F5F5F5" }}>
          Order Placed.
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Your Phase I units are queued for dispatch.
        </p>
        <div className="mt-8 border border-border p-6 text-left space-y-3">
          <div className="flex justify-between text-xs uppercase tracking-[0.2em]">
            <span className="text-muted-foreground">Order number</span>
            <span style={{ color: "#9B5FFF" }} className="font-display">{orderNumber}</span>
          </div>
          <div className="flex justify-between text-xs uppercase tracking-[0.2em]">
            <span className="text-muted-foreground">Status</span>
            <span style={{ color: "#00FFD1" }}>Confirmed</span>
          </div>
          <div className="flex justify-between text-xs uppercase tracking-[0.2em]">
            <span className="text-muted-foreground">Payment</span>
            <span className="text-foreground">Stripe (test mode)</span>
          </div>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          A confirmation will be sent to <span style={{ color: "#F5F5F5" }}>{fields.email}</span>
        </p>
        <Link
          to="/shop"
          className="mt-10 inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-colors"
          style={{ backgroundColor: "#9B5FFF" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0047FF")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#9B5FFF")}
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-24">
      <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Checkout</div>
      <h1 className="font-display text-4xl sm:text-5xl mt-3" style={{ color: "#F5F5F5" }}>
        Complete order.
      </h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mt-12 grid lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-16">
          {/* Form fields */}
          <div className="space-y-10">
            {/* Contact */}
            <fieldset className="space-y-4">
              <legend className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground pb-4 border-b border-border w-full">
                Contact
              </legend>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full name" error={errors.fullName}>
                  <input
                    type="text"
                    autoComplete="name"
                    value={fields.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                    placeholder="Leo Doerler"
                    className={inputCls(errors.fullName)}
                  />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="leo@valence.co"
                    className={inputCls(errors.email)}
                  />
                </Field>
              </div>
            </fieldset>

            {/* Shipping */}
            <fieldset className="space-y-4">
              <legend className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground pb-4 border-b border-border w-full">
                Shipping address
              </legend>
              <Field label="Street address" error={errors.street}>
                <input
                  type="text"
                  autoComplete="street-address"
                  value={fields.street}
                  onChange={(e) => set("street", e.target.value)}
                  placeholder="123 Protocol Ave"
                  className={inputCls(errors.street)}
                />
              </Field>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Field label="City" error={errors.city} className="col-span-2 sm:col-span-1">
                  <input
                    type="text"
                    autoComplete="address-level2"
                    value={fields.city}
                    onChange={(e) => set("city", e.target.value)}
                    placeholder="Chicago"
                    className={inputCls(errors.city)}
                  />
                </Field>
                <Field label="State" error={errors.state}>
                  <input
                    type="text"
                    autoComplete="address-level1"
                    maxLength={2}
                    value={fields.state}
                    onChange={(e) => set("state", e.target.value.toUpperCase())}
                    placeholder="IL"
                    className={inputCls(errors.state)}
                  />
                </Field>
                <Field label="ZIP" error={errors.zip}>
                  <input
                    type="text"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    maxLength={5}
                    value={fields.zip}
                    onChange={(e) => set("zip", e.target.value.replace(/\D/g, ""))}
                    placeholder="60601"
                    className={inputCls(errors.zip)}
                  />
                </Field>
              </div>
            </fieldset>

            {/* Payment */}
            <fieldset className="space-y-4">
              <legend className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground pb-4 border-b border-border w-full">
                Payment — visual mockup, no real processing
              </legend>
              <Field label="Card number" error={errors.cardNumber}>
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  value={fields.cardNumber}
                  onChange={(e) => set("cardNumber", formatCardNumber(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  className={inputCls(errors.cardNumber)}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Expiry" error={errors.expiry}>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    value={fields.expiry}
                    onChange={(e) => set("expiry", formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    className={inputCls(errors.expiry)}
                  />
                </Field>
                <Field label="CVV" error={errors.cvv}>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    maxLength={4}
                    value={fields.cvv}
                    onChange={(e) => set("cvv", e.target.value.replace(/\D/g, ""))}
                    placeholder="123"
                    className={inputCls(errors.cvv)}
                  />
                </Field>
              </div>
            </fieldset>
          </div>

          {/* Order summary */}
          <aside className="border border-border p-6 h-fit lg:sticky lg:top-24 space-y-4">
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Order summary</div>
            {items.length > 0 && (
              <ul className="divide-y divide-border text-sm">
                {items.map((item) => (
                  <li key={`${item.slug}-${item.size ?? ""}`} className="py-3 flex justify-between gap-3">
                    <span className="text-muted-foreground">
                      {item.name}
                      {item.size && <span className="ml-1 text-[10px] uppercase">/ {item.size}</span>}
                      {item.quantity > 1 && <span className="ml-1 text-[10px]">×{item.quantity}</span>}
                    </span>
                    <span className="tabular-nums flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}
            <dl className="pt-2 space-y-2 text-sm border-t border-border">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tabular-nums">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="tabular-nums">
                  {shipping === 0 ? <span style={{ color: "#00FFD1" }}>Free</span> : `$${shipping.toFixed(2)}`}
                </dd>
              </div>
            </dl>
            <div className="pt-4 border-t border-border flex justify-between text-base">
              <span className="font-display" style={{ color: "#F5F5F5" }}>Total</span>
              <span className="tabular-nums font-display" style={{ color: "#F5F5F5" }}>${total.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              className="w-full py-4 text-xs uppercase tracking-[0.25em] text-white transition-colors font-display"
              style={{ backgroundColor: "#9B5FFF" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0047FF")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#9B5FFF")}
            >
              Place order
            </button>
            <Link
              to="/cart"
              className="block text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to cart
            </Link>
          </aside>
        </div>
      </form>
    </section>
  );
}

function inputCls(error?: string) {
  return [
    "w-full bg-transparent border px-4 py-3 text-sm text-foreground",
    "placeholder:text-muted-foreground focus:outline-none transition-colors",
    error ? "border-destructive focus:border-destructive" : "border-border focus:border-[#9B5FFF]",
  ].join(" ");
}

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-[10px] text-destructive">{error}</p>}
    </div>
  );
}
