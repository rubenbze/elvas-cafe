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

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const [open, setOpen] =
    useState(false);

  const subtotal = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.125;

  const total = subtotal + gst;

  const totalItems = cart.reduce(
    (acc, item) =>
      acc + item.quantity,
    0
  );

  return (
    <>

      {/* FLOATING BUTTON */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="fixed bottom-8 right-8 z-50 bg-[#d6b98c] text-black p-5 rounded-full shadow-2xl hover:scale-105 transition"
      >

        <div className="relative">

          <ShoppingBag size={28} />

          {totalItems > 0 && (

            <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center">

              {totalItems}

            </div>

          )}

        </div>

      </button>

      {/* CART PANEL */}

      <div
        className={`fixed top-0 right-0 h-screen w-full md:w-[450px] bg-[#0d0d0d] border-l border-white/10 z-50 transition-transform duration-500 overflow-y-auto ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* HEADER */}

        <div className="flex items-center justify-between p-6 border-b border-white/10">

          <h2 className="text-3xl text-[#f5e6c8]">
            Your Order
          </h2>

          <button
            onClick={() =>
              setOpen(false)
            }
            className="text-2xl"
          >
            ✕
          </button>

        </div>

        {/* EMPTY */}

        {cart.length === 0 && (

          <div className="flex flex-col items-center justify-center h-[70vh] text-center px-10">

            <ShoppingBag
              size={70}
              className="mb-6 text-[#d6b98c]"
            />

            <h3 className="text-2xl mb-4">
              Your cart is empty
            </h3>

            <p className="text-gray-400 leading-7">
              Add handcrafted drinks,
              pastries, and desserts
              to begin your order.
            </p>

          </div>

        )}

        {/* ITEMS */}

        <div className="p-6 space-y-6">

          {cart.map(
            (item, index) => (

              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-[30px] p-5"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h3 className="text-xl mb-2">
                      {item.name}
                    </h3>

                    <p className="text-[#d6b98c] text-lg">
                      $
                      {(
                        item.price *
                        item.quantity
                      ).toFixed(2)}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(
                        index
                      )
                    }
                    className="text-red-400 hover:scale-110 transition"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

                {/* CUSTOMIZATIONS */}

                {item.customizations && (

                  <div className="mt-5 space-y-2 text-sm text-gray-300">

                    {item.customizations
                      .temperature && (

                      <p>

                        • Temperature:{" "}
                        {
                          item
                            .customizations
                            .temperature
                        }

                      </p>

                    )}

                    {item.customizations
                      .milk && (

                      <p>

                        • Milk:{" "}
                        {
                          item
                            .customizations
                            .milk
                        }

                      </p>

                    )}

                    {item.customizations
                      .extras &&
                      item
                        .customizations
                        .extras.length >
                        0 && (

                      <p>

                        • Extras:{" "}
                        {item.customizations.extras.join(
                          ", "
                        )}

                      </p>

                    )}

                    {item.customizations
                      .notes && (

                      <p>

                        • Notes:{" "}
                        {
                          item
                            .customizations
                            .notes
                        }

                      </p>

                    )}

                  </div>

                )}

                {/* QUANTITY */}

                <div className="flex items-center justify-between mt-6">

                  <div className="flex items-center gap-3">

                    <button
                      onClick={() =>
                        decreaseQuantity(
                          index
                        )
                      }
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="text-lg">

                      {item.quantity}

                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          index
                        )
                      }
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                    >
                      <Plus size={16} />
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

        {/* TOTALS */}

        {cart.length > 0 && (

          <div className="sticky bottom-0 bg-[#0d0d0d] border-t border-white/10 p-6">

            <div className="space-y-3 mb-6">

              <div className="flex justify-between text-gray-300">

                <p>Subtotal</p>

                <p>
                  $
                  {subtotal.toFixed(2)}
                </p>

              </div>

              <div className="flex justify-between text-gray-300">

                <p>GST (12.5%)</p>

                <p>
                  $
                  {gst.toFixed(2)}
                </p>

              </div>

              <div className="flex justify-between text-2xl text-[#d6b98c]">

                <p>Total</p>

                <p>
                  $
                  {total.toFixed(2)}
                </p>

              </div>

            </div>

            <Link
              href="/checkout"
              className="block text-center bg-[#d6b98c] text-black py-4 rounded-full text-lg font-semibold hover:scale-[1.02] transition"
            >
              View Checkout
            </Link>

          </div>

        )}

      </div>

    </>
  );
}