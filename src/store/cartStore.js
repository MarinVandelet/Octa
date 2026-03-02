import { create } from "zustand";

const keyOf = (item) => `${item.id}_${item.size}_${item.color}`;

export const useCart = create((set, get) => ({
  items: [],

  addItem: (product) =>
    set((state) => {
      const k = keyOf(product);
      const existing = state.items.find((i) => keyOf(i) === k);
      if (existing) {
        return {
          items: state.items.map((i) =>
            keyOf(i) === k ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...product, qty: 1 }] };
    }),

  removeItem: (key) =>
    set((state) => ({ items: state.items.filter((i) => keyOf(i) !== key) })),

  setQty: (key, qty) =>
    set((state) => ({
      items: state.items.map((i) =>
        keyOf(i) === key ? { ...i, qty: Math.max(1, qty) } : i
      ),
    })),

  clearCart: () => set({ items: [] }),

  total: () => get().items.reduce((acc, i) => acc + i.price * i.qty, 0),
}));
