import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart, cartCount } from "@/lib/cart";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const items = useCart((s) => s.items);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCount(cartCount(items));
  }, [items]);

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="wordmark text-base text-[#F5F5F5]" style={{ fontFamily: "var(--font-display)" }}>
          VALENCE
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm uppercase tracking-[0.18em] text-[#F5F5F5] transition-colors duration-150 hover:text-[#9B5FFF]"
              style={{ fontFamily: "var(--font-sans)" }}
              activeProps={{ style: { color: "#9B5FFF", fontFamily: "var(--font-sans)" } }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/cart"
            className="relative flex items-center text-[#F5F5F5] transition-colors duration-150 hover:text-[#9B5FFF]"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {count > 0 && (
              <span className="ml-2 text-xs tracking-widest text-primary">[{count}]</span>
            )}
          </Link>
        </nav>

        <div className="md:hidden flex items-center gap-5">
          <Link
            to="/cart"
            className="relative flex items-center text-[#F5F5F5] transition-colors duration-150 hover:text-[#9B5FFF]"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {count > 0 && <span className="ml-1.5 text-xs text-primary">[{count}]</span>}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="text-[#F5F5F5] transition-colors duration-150 hover:text-[#9B5FFF]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-black">
          <nav className="flex flex-col px-5 py-6 gap-5">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.18em] text-[#F5F5F5] transition-colors duration-150 hover:text-[#9B5FFF]"
                style={{ fontFamily: "var(--font-sans)" }}
                activeProps={{ style: { color: "#9B5FFF", fontFamily: "var(--font-sans)" } }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
