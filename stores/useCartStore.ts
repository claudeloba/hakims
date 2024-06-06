import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CartItem = {
  id: number;
  quantity: number;
};

type CartState = {
  cart: CartItem[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  removeAllFromCart: (id: number) => void;
  getTotalCount: () => number;
  getAllCartItems: () => CartItem[];
};

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (id: number) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return { cart: [...state.cart, { id, quantity: 1 }] };
        }),
      removeFromCart: (id: number) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === id);
          if (existingItem) {
            if (existingItem.quantity > 1) {
              return {
                cart: state.cart.map((item) =>
                  item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item,
                ),
              };
            } else {
              return {
                cart: state.cart.filter((item) => item.id !== id),
              };
            }
          }
          return state;
        }),
      removeAllFromCart: (id: number) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      getTotalCount: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),
      getAllCartItems: () => get().cart,
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCartStore;
