import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string | null;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (slug: string, size: string | null) => void;
  setQty: (slug: string, size: string | null, qty: number) => void;
  clear: () => void;
};

const keyOf = (slug: string, size: string | null) => `${slug}::${size ?? ""}`;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item, qty = 1) =>
        set((s) => {
          const k = keyOf(item.slug, item.size);
          const existing = s.items.find((i) => keyOf(i.slug, i.size) === k);
          if (existing) {
            return {
              items: s.items.map((i) =>
                keyOf(i.slug, i.size) === k ? { ...i, quantity: i.quantity + qty } : i,
              ),
            };
          }
          return { items: [...s.items, { ...item, quantity: qty }] };
        }),
      remove: (slug, size) =>
        set((s) => ({ items: s.items.filter((i) => keyOf(i.slug, i.size) !== keyOf(slug, size)) })),
      setQty: (slug, size, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (keyOf(i.slug, i.size) === keyOf(slug, size) ? { ...i, quantity: qty } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "valence-cart" },
  ),
);

export const cartCount = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.quantity, 0);

export const cartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.quantity, 0);
