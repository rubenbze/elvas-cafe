"use client";

import Link from "next/link";

import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import { useCartStore } from "@/store/cartStore";

export default function CartSidebar() {

  const cart = useCartStore(
    (state) => state.cart
  );

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-black/50 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl sticky top-32 h-fit shadow-2xl">

      <h2 className="text-3xl mb-8 text-[#f5e6c8]">
        Your Order
      </h2>

      <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">

        {cart.length === 0 && (
          <p className="text-gray-400">
            Your cart is empty.
          </p>
        )}

        {cart.map((item) => (

          <div
            key={item.id}
            className="border-b border-white/10 pb-5"
          >

            <div className="flex justify-between gap-4 mb-4">

              <div>

                <p className="font-semibold text-lg">
                  {item.name}
                </p>

                <p className="text-[#d6b98c]">
                  ${item.price}
                </p>

              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:scale-110 transition"
              >
                <Trash2 size={18} />
              </button>

            </div>

            <div className="flex items-center gap-4">

              <button
                onClick={() => decreaseQuantity(item.id)}
                className="bg-white/10 p-2 rounded-full"
              >
                <Minus size={16} />
              </button>

              <span>
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  addToCart({
                    ...item,
                    quantity: 1,
                  })
                }
                className="bg-white/10 p-2 rounded-full"
              >
                <Plus size={16} />
              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="border-t border-white/10 mt-8 pt-8">

        <div className="flex justify-between text-2xl mb-8">

          <span>Total</span>

          <span className="text-[#d6b98c]">
            ${total}
          </span>

        </div>

        <Link
          href="/checkout"
          className="block w-full text-center bg-[#d6b98c] text-black py-4 rounded-full font-semibold hover:scale-105 transition"
        >
          View Checkout
        </Link>

      </div>

    </div>
  );
}