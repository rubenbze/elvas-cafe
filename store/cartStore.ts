"use client";

import { create } from "zustand";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  type?: string;

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
    index: number
  ) => void;

  increaseQuantity: (
    index: number
  ) => void;

  decreaseQuantity: (
    index: number
  ) => void;

  clearCart: () => void;
};

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