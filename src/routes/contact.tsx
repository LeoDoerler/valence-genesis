import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Twitter } from "lucide-react";
import { TikTokIcon } from "@/components/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "VALENCE — Contact | Engineered for the Obsessed." },
      { name: "description", content: "Direct channel to Valence." },
      { property: "og:title", content: "VALENCE — Contact" },
      { property: "og:description", content: "Direct channel to Valence." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  return (
    <section className="mx-auto max-w-4xl px-5 sm:px-8 py-20 sm:py-32">
      <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Contact</div>
      <h1 className="font-display text-4xl sm:text-5xl mt-3">Direct channel.</h1>

      <div className="mt-16 grid md:grid-cols-[1.5fr_1fr] gap-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!form.name || !form.email || !form.message) return;
            setSubmitted(true);
            setForm({ name: "", email: "", message: "" });
          }}
          className="space-y-6"
        >
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              maxLength={100}
              className="mt-2 w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-cobalt"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              maxLength={255}
              className="mt-2 w-full bg-transparent border-b border-border py-3 text-foreground focus:outline-none focus:border-cobalt"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              maxLength={1000}
              className="mt-2 w-full bg-transparent border border-border p-4 text-foreground focus:outline-none focus:border-cobalt resize-none"
            />
          </div>
          <button
            type="submit"
            className="bg-primary px-8 py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground hover:bg-cobalt transition-colors"
          >
            Transmit
          </button>
          {submitted && (
            <p className="text-xs uppercase tracking-[0.2em] text-cryo">
              Message received. Response within 48 hours.
            </p>
          )}
        </form>

        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Channels</div>
          <div className="flex gap-5">
            <a href="https://instagram.com" aria-label="Instagram" className="link-hover text-foreground">
              <Instagram className="h-6 w-6" strokeWidth={1.5} />
            </a>
            <a href="https://tiktok.com" aria-label="TikTok" className="link-hover text-foreground">
              <TikTokIcon className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" aria-label="X" className="link-hover text-foreground">
              <Twitter className="h-6 w-6" strokeWidth={1.5} />
            </a>
          </div>

          <div className="mt-10">
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">Direct line</div>
            <a href="mailto:hello@valence.co" className="text-sm text-muted-foreground link-hover">
              hello@valence.co
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
