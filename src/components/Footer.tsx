import { Link } from "@tanstack/react-router";
import { Instagram, Twitter } from "lucide-react";

// TikTok inline (lucide doesn't ship one)
function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.16 8.16 0 0 0 4.77 1.52V6.69a4.85 4.85 0 0 1-1.84 0z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-black mt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid gap-12 md:grid-cols-3">
        <div>
          <div className="wordmark text-base">VALENCE</div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
            Engineered for the Obsessed.
          </p>
        </div>

        <nav className="flex flex-col gap-3 md:items-center text-sm uppercase tracking-[0.18em]">
          <Link to="/shop" className="link-hover">Shop</Link>
          <Link to="/about" className="link-hover">About</Link>
          <Link to="/contact" className="link-hover">Contact</Link>
        </nav>

        <div className="flex flex-col md:items-end gap-5">
          <div className="flex gap-5">
            <a href="https://instagram.com" aria-label="Instagram" className="link-hover text-foreground">
              <Instagram className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a href="https://tiktok.com" aria-label="TikTok" className="link-hover text-foreground">
              <TikTokIcon className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" aria-label="X" className="link-hover text-foreground">
              <Twitter className="h-5 w-5" strokeWidth={1.5} />
            </a>
          </div>
          <a href="mailto:hello@valence.co" className="text-xs text-muted-foreground link-hover tracking-wide">
            hello@valence.co
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 text-xs text-muted-foreground tracking-wider uppercase">
          © 2026 Valence. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export { TikTokIcon };
