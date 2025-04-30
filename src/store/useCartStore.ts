import { create } from "zustand";
import { Product } from "../types/product";
import { persist } from "zustand/middleware";

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  updateQuantity: (id: string, quantity: number) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product) => {
        const items = get().items;
        const existing = items.find((item) => item.id === product.id);

        if (existing) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clearCart: () => set({ items: [] }),
      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          return;
        }

        const items = get().items;
        const existing = items.find((item) => item.id === id);

        if (existing) {
          set({
            items: items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          });
        }
      },
      getTotalCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),

    {
      name: "cart-storage",
    }
  )
);
