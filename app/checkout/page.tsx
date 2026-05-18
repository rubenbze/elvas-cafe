"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import { useCartStore } from "@/store/cartStore";

import { supabase } from "@/lib/supabase";

import "@fontsource/playfair-display";

export default function CheckoutPage() {

  const cart = useCartStore((state) => state.cart);

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const gst = subtotal * 0.125;

  const total = subtotal + gst;

  async function handleSubmitOrder() {

    setError("");
    setSuccess("");

    if (!name || !phone) {
      setError("Please fill out all required fields.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);

    const orderNumber = Math.floor(
      1000 + Math.random() * 9000
    );

    const { error } = await supabase
      .from("orders")
      .insert([
        {
          order_number: orderNumber,
          customer_name: name,
          customer_phone: phone,
          items: cart,
          subtotal,
          gst,
          total,
        },
      ]);

    setLoading(false);

    if (error) {
      setError("Failed to place order.");
      return;
    }

    const orderData = {
      orderNumber,
      name,
      phone,
      total,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "latestOrder",
      JSON.stringify(orderData)
    );

    setSuccess(
      `Order #${orderNumber} placed successfully.`
    );

    clearCart();
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      <PageBackground />

      <Navbar />

      <section className="relative z-10 pt-44 px-6 pb-20">

        <div className="max-w-5xl mx-auto">

          <h1
            className="text-5xl md:text-7xl mb-12 text-center"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Checkout
          </h1>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* LEFT */}

            <div className="bg-black/30 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

              <h2 className="text-3xl mb-8">
                Customer Information
              </h2>

              <div className="space-y-6">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 outline-none"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 outline-none"
                />

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

            </div>

            {/* RIGHT */}

            <div className="bg-black/30 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

              <h2 className="text-3xl mb-8">
                Your Order
              </h2>

              <div className="space-y-6">

                {cart.map((item, index) => (

                  <div
                    key={index}
                    className="border-b border-white/10 pb-6"
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <h3 className="text-xl">
                          {item.name}
                        </h3>

                        <p className="text-[#d6b98c] mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>

                      </div>

                      <div className="flex items-center gap-3">

                        <button
                          onClick={() =>
                            decreaseQuantity(index)
                          }
                          className="w-8 h-8 rounded-full bg-white/10"
                        >
                          -
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(index)
                          }
                          className="w-8 h-8 rounded-full bg-white/10"
                        >
                          +
                        </button>

                        <button
                          onClick={() =>
                            removeFromCart(index)
                          }
                          className="ml-3 text-red-400"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                    {item.customizations && (

                      <div className="mt-3 text-sm text-[#d6b98c] space-y-1">

                        {item.customizations.size && (
                          <p>
                            Size: {item.customizations.size}
                          </p>
                        )}

                        {item.customizations.temperature && (
                          <p>
                            Temperature: {item.customizations.temperature}
                          </p>
                        )}

                        {item.customizations.milk && (
                          <p>
                            Milk: {item.customizations.milk}
                          </p>
                        )}

                        {(item.customizations.extras ?? []).length > 0 && (
                          <p>
                            Extras:{" "}
                            {item.customizations.extras?.join(", ")}
                          </p>
                        )}

                        {item.customizations.notes && (
                          <p>
                            Notes: {item.customizations.notes}
                          </p>
                        )}

                      </div>

                    )}

                  </div>

                ))}

              </div>

              <div className="mt-10 space-y-3 border-t border-white/10 pt-6">

                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>

                <div className="flex justify-between">
                  <p>GST (12.5%)</p>
                  <p>${gst.toFixed(2)}</p>
                </div>

                <div className="flex justify-between text-2xl text-[#d6b98c] font-semibold pt-4">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>

              </div>

              <button
                onClick={handleSubmitOrder}
                disabled={loading}
                className="w-full mt-10 bg-[#d6b98c] text-black py-4 rounded-2xl text-lg font-semibold hover:scale-[1.02] transition"
              >
                {loading ? "Submitting..." : "Submit Order"}
              </button>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}