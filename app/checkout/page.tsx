"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import { useCartStore } from "@/store/cartStore";

import { useState } from "react";

import "@fontsource/playfair-display";

export default function CheckoutPage() {

  const cart = useCartStore(
    (state) => state.cart
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [success, setSuccess] =
    useState(false);

  const [orderNumber, setOrderNumber] =
    useState<number | null>(null);

  const [error, setError] =
    useState("");

  function handleOrder() {

    if (!name || !phone) {

      setError(
        "Please complete all required information."
      );

      return;
    }

    setError("");

    const randomOrder =
      Math.floor(Math.random() * 900) + 100;

    setOrderNumber(randomOrder);

    setSuccess(true);

    clearCart();
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      <PageBackground />

      <Navbar />

      <section className="relative z-10 pt-44 px-6 pb-24">

        <div className="max-w-3xl mx-auto bg-black/50 border border-white/10 rounded-[40px] p-12 backdrop-blur-xl shadow-2xl">

          <h1
            className="text-6xl mb-12 text-center"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Checkout
          </h1>

          {!success ? (
            <>

              <div className="space-y-6 mb-10">

                {cart.map((item) => (

                  <div
                    key={item.id}
                    className="flex justify-between border-b border-white/10 pb-4"
                  >

                    <div>

                      <p className="font-semibold">
                        {item.name}
                      </p>

                      <p className="text-gray-400 text-sm">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <p className="text-[#d6b98c]">
                      $
                      {item.price * item.quantity}
                    </p>

                  </div>

                ))}

              </div>

              <div className="space-y-5 mb-10">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/10 rounded-full px-6 py-4 outline-none"
                />

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full bg-white/10 border border-white/10 rounded-full px-6 py-4 outline-none"
                />

              </div>

              {error && (

                <div className="mb-8 bg-red-500/20 border border-red-500/30 text-red-300 px-6 py-4 rounded-2xl">

                  {error}

                </div>

              )}

              <div className="flex justify-between text-3xl mb-10">

                <span>Total</span>

                <span className="text-[#d6b98c]">
                  ${total}
                </span>

              </div>

              <button
                onClick={handleOrder}
                className="w-full bg-[#d6b98c] text-black py-5 rounded-full text-lg font-semibold hover:scale-105 transition"
              >
                Place Order
              </button>

            </>
          ) : (

            <div className="text-center space-y-6">

              <h2 className="text-5xl text-[#d6b98c]">
                Order Successful
              </h2>

              <p className="text-xl">
                Thank you for ordering from
                Elva&apos;s Cafe.
              </p>

              <div className="bg-white/10 rounded-[30px] p-8 border border-white/10">

                <p className="text-gray-400 mb-3">
                  Your Reference
                </p>

                <p className="text-5xl text-[#d6b98c]">
                  Order #{orderNumber}
                </p>

              </div>

            </div>

          )}

        </div>

      </section>

      <Footer />

    </main>
  );
}