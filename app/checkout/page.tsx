"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import { useCartStore } from "@/store/cartStore";

import "@fontsource/playfair-display";

import { useState } from "react";

export default function CheckoutPage() {

  const cart = useCartStore((state) => state.cart);

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const subtotal = cart.reduce((total, item) => {

    return total + (Number(item.price) * item.quantity);

  }, 0);

  const gst = subtotal * 0.125;

  const finalTotal = subtotal + gst;

  const orderNumber =
    Math.floor(100 + Math.random() * 900);

  const submitOrder = () => {

    if (!name || !phone) {
      alert("Please complete all required fields.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setSubmitted(true);

    clearCart();

  };

  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      <PageBackground />

      <Navbar />

      <section className="relative z-10 pt-44 pb-24 px-6">

        <div className="max-w-5xl mx-auto">

          <h1
            className="text-5xl md:text-7xl text-center mb-16"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Checkout
          </h1>

          {!submitted ? (

            <div className="backdrop-blur-2xl bg-black/30 border border-white/10 rounded-[40px] p-10">

              {/* CUSTOMER INFO */}

              <div className="grid md:grid-cols-2 gap-6 mb-12">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="bg-white/10 border border-white/10 rounded-2xl px-6 py-5 outline-none"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="bg-white/10 border border-white/10 rounded-2xl px-6 py-5 outline-none"
                />

              </div>

              {/* CART ITEMS */}

              <div className="space-y-6 mb-12">

                {cart.map((item, index) => (

                  <div
                    key={index}
                    className="border-b border-white/10 pb-5"
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <h2 className="text-2xl">
                          {item.name}
                        </h2>

                        <p className="text-gray-400 text-sm mt-2">

                          Qty: {item.quantity}

                        </p>

                        {item.customizations && (

                          <div className="text-sm text-[#d6b98c] mt-2 space-y-1">

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

                            {item.customizations.syrup && (
                              <p>
                                Syrup: {item.customizations.syrup}
                              </p>
                            )}

                            {item.customizations.extras?.length > 0 && (
                              <p>
                                Extras:
                                {" "}
                                {item.customizations.extras.join(", ")}
                              </p>
                            )}

                          </div>

                        )}

                      </div>

                      <p className="text-2xl text-[#d6b98c]">

                        $
                        {(item.price * item.quantity).toFixed(2)}

                      </p>

                    </div>

                  </div>

                ))}

              </div>

              {/* TOTALS */}

              <div className="space-y-4 border-t border-white/10 pt-8">

                <div className="flex justify-between text-lg">

                  <p>Subtotal</p>

                  <p>
                    ${subtotal.toFixed(2)}
                  </p>

                </div>

                <div className="flex justify-between text-lg">

                  <p>GST (12.5%)</p>

                  <p>
                    ${gst.toFixed(2)}
                  </p>

                </div>

                <div className="flex justify-between text-3xl text-[#d6b98c] font-semibold">

                  <p>Total</p>

                  <p>
                    ${finalTotal.toFixed(2)}
                  </p>

                </div>

              </div>

              {/* SUBMIT */}

              <button
                onClick={submitOrder}
                className="mt-12 w-full bg-[#d6b98c] text-black py-5 rounded-full text-lg font-semibold hover:scale-[1.02] transition"
              >
                Submit Order
              </button>

            </div>

          ) : (

            <div className="backdrop-blur-2xl bg-black/30 border border-white/10 rounded-[40px] p-16 text-center">

              <h2
                className="text-5xl mb-8 text-[#d6b98c]"
                style={{
                  fontFamily: "Playfair Display",
                }}
              >
                Order Confirmed
              </h2>

              <p className="text-2xl mb-4">
                Thank you, {name}
              </p>

              <p className="text-gray-300 text-lg mb-8">
                Your order has been successfully placed.
              </p>

              <div className="inline-block bg-[#d6b98c] text-black px-10 py-5 rounded-full text-2xl font-bold">

                Order #{orderNumber}

              </div>

              <p className="mt-8 text-gray-400">
                Please show this number when collecting your order.
              </p>

            </div>

          )}

        </div>

      </section>

      <Footer />

    </main>
  );
}