"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import { useCartStore } from "@/store/cartStore";

import "@fontsource/playfair-display";

export default function CheckoutPage() {

  const cart = useCartStore(
    (state) => state.cart
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const [savedOrder, setSavedOrder] =
    useState<any>(null);

  const displayedSubtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const subtotal =
    displayedSubtotal / 1.125;

  const gst =
    displayedSubtotal - subtotal;

  const total =
    displayedSubtotal;

  useEffect(() => {

    const existingOrder =
      localStorage.getItem(
        "latestOrder"
      );

    if (existingOrder) {

      setSavedOrder(
        JSON.parse(existingOrder)
      );

    }

  }, []);

  const submitOrder = () => {

    if (!name || !phone) {

      alert(
        "Please complete all required fields."
      );

      return;

    }

    if (cart.length === 0) {

      alert(
        "Your cart is empty."
      );

      return;

    }

    const orderNumber =
      Math.floor(
        1000 + Math.random() * 9000
      );

    const orderData = {

      orderNumber,

      name,

      phone,

      items: cart,

      subtotal,

      gst,

      total,

      createdAt:
        new Date().toLocaleString(),

    };

    localStorage.setItem(
      "latestOrder",
      JSON.stringify(orderData)
    );

    const existingHistory =
      JSON.parse(
        localStorage.getItem(
          "orderHistory"
        ) || "[]"
      );

    localStorage.setItem(
      "orderHistory",
      JSON.stringify([
        orderData,
        ...existingHistory,
      ])
    );

    setSavedOrder(orderData);

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
              fontFamily:
                "Playfair Display",
            }}
          >
            Checkout
          </h1>

          {!submitted ? (

            <div className="backdrop-blur-2xl bg-black/30 border border-white/10 rounded-[40px] p-10">

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

              <div className="space-y-6 mb-12">

                {cart.map((item, index) => (

                  <div
                    key={index}
                    className="border-b border-white/10 pb-6"
                  >

                    <div className="flex items-center justify-between gap-6">

                      <div>

                        <h2 className="text-2xl">
                          {item.name}
                        </h2>

                        <p className="text-gray-400 mt-2">
                          Qty:
                          {" "}
                          {item.quantity}
                        </p>

                        {item.customizations && (

                          <div className="text-sm text-[#d6b98c] mt-3 space-y-1">

                            {item.customizations.size && (
                              <p>
                                Size:
                                {" "}
                                {item.customizations.size}
                              </p>
                            )}

                            {item.customizations.temperature && (
                              <p>
                                Temperature:
                                {" "}
                                {item.customizations.temperature}
                              </p>
                            )}

                            {item.customizations.milk && (
                              <p>
                                Milk:
                                {" "}
                                {item.customizations.milk}
                              </p>
                            )}

                            {item.customizations.syrup && (
                              <p>
                                Syrup:
                                {" "}
                                {item.customizations.syrup}
                              </p>
                            )}

                            {item.customizations.extras &&
                              item.customizations.extras.length > 0 && (

                              <p>
                                Extras:
                                {" "}
                                {item.customizations.extras.join(", ")}
                              </p>

                            )}

                            {item.customizations.notes && (
                              <p>
                                Notes:
                                {" "}
                                {item.customizations.notes}
                              </p>
                            )}

                          </div>

                        )}

                      </div>

                      <p className="text-2xl text-[#d6b98c] whitespace-nowrap">

                        $
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}

                      </p>

                    </div>

                  </div>

                ))}

              </div>

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
                    ${total.toFixed(2)}
                  </p>

                </div>

              </div>

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
                  fontFamily:
                    "Playfair Display",
                }}
              >
                Order Confirmed
              </h2>

              <p className="text-2xl mb-6">

                Thank you,
                {" "}
                {savedOrder?.name}

              </p>

              <div className="inline-block bg-[#d6b98c] text-black px-10 py-5 rounded-full text-3xl font-bold mb-8">

                Order #
                {savedOrder?.orderNumber}

              </div>

              <div className="space-y-3 text-gray-300 text-lg">

                <p>
                  Subtotal:
                  {" "}
                  $
                  {savedOrder?.subtotal?.toFixed(2)}
                </p>

                <p>
                  GST:
                  {" "}
                  $
                  {savedOrder?.gst?.toFixed(2)}
                </p>

                <p className="text-[#d6b98c] text-2xl">

                  Total:
                  {" "}
                  $
                  {savedOrder?.total?.toFixed(2)}

                </p>

                <p className="pt-4 text-sm text-gray-400">

                  Saved on this device

                </p>

                <p className="text-sm text-gray-400">

                  {savedOrder?.createdAt}

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