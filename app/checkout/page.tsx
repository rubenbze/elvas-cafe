"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import { useCartStore } from "@/store/cartStore";

import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {

  const cart = useCartStore(
    (state) => state.cart
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [orderHistory, setOrderHistory] =
    useState<any[]>([]);

  const subtotal = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.125;

  const total = subtotal + gst;

  useEffect(() => {

    const savedOrders =
      localStorage.getItem(
        "orderHistory"
      );

    if (savedOrders) {

      setOrderHistory(
        JSON.parse(savedOrders)
      );

    }

  }, []);

  async function handleSubmitOrder() {

    setError("");
    setSuccess("");

    if (!name || !phone) {

      setError(
        "Please fill out all required fields."
      );

      return;

    }

    if (cart.length === 0) {

      setError(
        "Your cart is empty."
      );

      return;

    }

    if (!supabase) {

      setError(
        "Supabase not connected."
      );

      return;

    }

    const orderNumber =
      `Order #${Math.floor(
        1000 + Math.random() * 9000
      )}`;

    const itemsString =
      JSON.stringify(cart);

    const { error } =
      await supabase
        .from("orders")
        .insert([
          {
            order_number:
              orderNumber,

            customer_name:
              name,

            customer_phone:
              phone,

            items:
              itemsString,

            subtotal,

            gst,

            total,
          },
        ]);

    if (error) {

      console.error(error);

      setError(
        error.message
      );

      return;

    }

    const newOrder = {

      orderNumber,

      total,

      name,

      phone,

      createdAt:
        new Date().toLocaleString(),

    };

    const updatedHistory = [
      newOrder,
      ...orderHistory,
    ];

    localStorage.setItem(
      "orderHistory",
      JSON.stringify(updatedHistory)
    );

    setOrderHistory(
      updatedHistory
    );

    setSuccess(
      `${orderNumber} placed successfully!`
    );

    clearCart();

  }

  return (

    <main className="relative min-h-screen overflow-hidden text-white">

      <PageBackground />

      <Navbar />

      <section className="relative z-10 pt-44 px-6 pb-20">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-6xl text-center mb-16">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* CHECKOUT */}

            <div className="bg-black/30 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

              <div className="space-y-6">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 outline-none"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 outline-none"
                />

              </div>

              <div className="mt-10 border-t border-white/10 pt-6 space-y-3">

                <div className="flex justify-between">

                  <p>Subtotal</p>

                  <p>
                    ${subtotal.toFixed(2)}
                  </p>

                </div>

                <div className="flex justify-between">

                  <p>GST (12.5%)</p>

                  <p>
                    ${gst.toFixed(2)}
                  </p>

                </div>

                <div className="flex justify-between text-2xl text-[#d6b98c] font-semibold">

                  <p>Total</p>

                  <p>
                    ${total.toFixed(2)}
                  </p>

                </div>

              </div>

              {error && (

                <div className="mt-6 bg-red-500/20 border border-red-500 rounded-xl p-4 text-red-300">

                  {error}

                </div>

              )}

              {success && (

                <div className="mt-6 bg-green-500/20 border border-green-500 rounded-xl p-4 text-green-300">

                  {success}

                </div>

              )}

              <button
                onClick={
                  handleSubmitOrder
                }
                className="w-full mt-10 bg-[#d6b98c] text-black py-4 rounded-2xl text-lg font-semibold"
              >
                Submit Order
              </button>

            </div>

            {/* ORDER HISTORY */}

            <div className="bg-black/30 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

              <h2 className="text-3xl mb-8 text-[#d6b98c]">
                Order History
              </h2>

              <div className="space-y-6">

                {orderHistory.length === 0 && (

                  <p className="text-gray-400">
                    No previous orders yet.
                  </p>

                )}

                {orderHistory.map(
                  (order, index) => (

                    <div
                      key={index}
                      className="border border-white/10 rounded-2xl p-5"
                    >

                      <p className="text-xl font-semibold">
                        {order.orderNumber}
                      </p>

                      <p className="text-gray-300 mt-2">
                        {order.name}
                      </p>

                      <p className="text-gray-400">
                        {order.phone}
                      </p>

                      <p className="text-[#d6b98c] mt-3">
                        Total:
                        {" "}
                        $
                        {order.total.toFixed(2)}
                      </p>

                      <p className="text-sm text-gray-500 mt-2">
                        {order.createdAt}
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>

  );

}