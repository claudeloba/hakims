import { ProductSchema } from "@/drizzle/schema";
import { z } from "zod";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const CartItemSchema = ProductSchema.extend({
  quantity: z.number().min(1),
});

type CartItem = z.infer<typeof CartItemSchema>;

interface CartStore {
  items: CartItem[];
  addItem: (data: CartItem) => void;
  removeItem: (id: number, removeAll?: boolean) => void;
  removeAll: () => void;
  totalItems: number;
}

const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      addItem: (data: CartItem) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);
        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === data.id
                ? { ...item, quantity: item.quantity + data.quantity }
                : item,
            ),
            totalItems: get().totalItems + data.quantity,
          });
        } else {
          set({
            items: [...currentItems, data],
            totalItems: get().totalItems + data.quantity,
          });
        }
      },
      removeItem: (id: number, removeAll = false) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === id);
        if (existingItem) {
          if (removeAll || existingItem.quantity === 1) {
            set({
              items: currentItems.filter((item) => item.id !== id),
              totalItems: get().totalItems - existingItem.quantity,
            });
          } else {
            set({
              items: currentItems.map((item) =>
                item.id === id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item,
              ),
              totalItems: get().totalItems - 1,
            });
          }
        }
      },
      removeAll: () => set({ items: [], totalItems: 0 }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCart;
