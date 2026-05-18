"use client";

import Link from "next/link";

import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

import { useState } from "react";

import { useCartStore } from "@/store/cartStore";

export default function FloatingCart() {

  const [open, setOpen] = useState(false);

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

  const totalItems = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* FLOATING BUTTON */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed top-28 right-6 z-[100] bg-[#d6b98c] text-black w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition"
      >

        <ShoppingBag size={28} />

        {totalItems > 0 && (

          <div className="absolute -top-2 -right-2 bg-black text-white text-xs w-7 h-7 rounded-full flex items-center justify-center">

            {totalItems}

          </div>

        )}

      </button>

      {/* CART PANEL */}

      {open && (

        <div className="fixed top-48 right-6 z-[100] w-[380px] max-h-[70vh] overflow-y-auto bg-black/90 backdrop-blur-2xl border border-white/10 rounded-[35px] p-8 shadow-2xl">

          <h2 className="text-3xl mb-8 text-white">
            Your Order
          </h2>

          {cart.length === 0 ? (

            <p className="text-gray-400">
              Your cart is empty.
            </p>

          ) : (

            <>
              <div className="space-y-6">

                {cart.map((item) => (

                  <div
                    key={item.id}
                    className="border-b border-white/10 pb-5"
                  >

                    <div className="flex justify-between items-center mb-3">

                      <div>

                        <h3 className="text-white">
                          {item.name}
                        </h3>

                        <p className="text-[#d6b98c]">
                          ${item.price}
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                    <div className="flex items-center gap-4">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center"
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
                        className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>

                    </div>

                  </div>

                ))}

              </div>

              <div className="mt-8 border-t border-white/10 pt-6">

                <div className="flex justify-between text-xl mb-6">

                  <span>Total</span>

                  <span className="text-[#d6b98c]">
                    ${totalPrice}
                  </span>

                </div>

                <Link
                  href="/checkout"
                  className="block text-center bg-[#d6b98c] text-black py-4 rounded-full font-semibold hover:scale-105 transition"
                >
                  View Checkout
                </Link>

              </div>
            </>
          )}

        </div>

      )}

    </>
  );
}