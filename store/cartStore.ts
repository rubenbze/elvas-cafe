import { create } from "zustand";

export interface CartItem {

  id: number;

  name: string;

  price: number;

  quantity: number;

  customizations?: {

    size?: string;

    temperature?: string;

    milk?: string;

    syrup?: string;

    extras?: string[];

    notes?: string;

  };

}

interface CartStore {

  cart: CartItem[];

  addToCart: (
    item: CartItem
  ) => void;

  removeFromCart: (
    index: number
  ) => void;

  increaseQuantity: (
    index: number
  ) => void;

  decreaseQuantity: (
    index: number
  ) => void;

  clearCart: () => void;

}

export const useCartStore =
  create<CartStore>((set) => ({

    cart: [],

    addToCart: (item) =>

      set((state) => ({

        cart: [
          ...state.cart,
          item,
        ],

      })),

    removeFromCart: (index) =>

      set((state) => ({

        cart: state.cart.filter(
          (_, i) => i !== index
        ),

      })),

    increaseQuantity: (index) =>

      set((state) => ({

        cart: state.cart.map(
          (item, i) =>

            i === index
              ? {
                  ...item,
                  quantity:
                    item.quantity + 1,
                }
              : item
        ),

      })),

    decreaseQuantity: (index) =>

      set((state) => ({

        cart: state.cart
          .map((item, i) =>

            i === index
              ? {
                  ...item,
                  quantity:
                    item.quantity - 1,
                }
              : item
          )
          .filter(
            (item) =>
              item.quantity > 0
          ),

      })),

    clearCart: () =>

      set({

        cart: [],

      }),

  }));