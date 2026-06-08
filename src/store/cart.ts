import { create } from "zustand";

export type CartItem = {
  id: string;
  label: string;
  price: number;       // in kobo (₦ × 100)
  type: "base" | "addon" | "subscription";
  recurring?: boolean;
};

type CartStore = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: () => number;
};

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  add: (item) =>
    set((s) => ({
      items: s.items.some((i) => i.id === item.id)
        ? s.items
        : [...s.items, item],
    })),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.price, 0),
}));
