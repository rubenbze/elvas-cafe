import { create } from "zustand";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;

  customizations?: {
    temperature?: string;
    milk?: string;
    extras?: string[];
    notes?: string;
  };
};

type CartStore = {
  cart: CartItem[];

  addToCart: (
    item: CartItem
  ) => void;

  removeFromCart: (
    id: number
  ) => void;

  increaseQuantity: (
    id: number
  ) => void;

  decreaseQuantity: (
    id: number
  ) => void;

  clearCart: () => void;
};

export const useCartStore =
  create<CartStore>((set) => ({

    cart: [],

    addToCart: (item) =>
      set((state) => {

        const existingItem =
          state.cart.find(
            (cartItem) =>
              cartItem.id === item.id
          );

        if (existingItem) {

          return {
            cart: state.cart.map(
              (cartItem) =>

                cartItem.id === item.id
                  ? {
                      ...cartItem,
                      quantity:
                        cartItem.quantity + 1,
                    }
                  : cartItem
            ),
          };

        }

        return {
          cart: [
            ...state.cart,
            item,
          ],
        };

      }),

    removeFromCart: (id) =>
      set((state) => ({
        cart: state.cart.filter(
          (item) => item.id !== id
        ),
      })),

    increaseQuantity: (id) =>
      set((state) => ({
        cart: state.cart.map((item) =>

          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        ),
      })),

    decreaseQuantity: (id) =>
      set((state) => ({
        cart: state.cart
          .map((item) =>

            item.id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity - 1,
                }
              : item
          )
          .filter(
            (item) => item.quantity > 0
          ),
      })),

    clearCart: () =>
      set({
        cart: [],
      }),

  }));