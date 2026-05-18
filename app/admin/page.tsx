"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import { supabase } from "@/lib/supabase";

import "@fontsource/playfair-display";

export default function AdminPage() {

  const [orders, setOrders] = useState<any[]>([]);

  const [reservations, setReservations] = useState<any[]>([]);

  async function fetchOrders() {

    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (data) {
      setOrders(data);
    }
  }

  async function fetchReservations() {

    const { data } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (data) {
      setReservations(data);
    }
  }

  useEffect(() => {

    fetchOrders();

    fetchReservations();

  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      <PageBackground />

      <Navbar />

      <section className="relative z-10 pt-44 px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h1
            className="text-5xl md:text-7xl mb-16 text-center"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Admin Dashboard
          </h1>

          {/* ORDERS */}

          <div className="mb-24">

            <h2 className="text-4xl mb-10 text-[#d6b98c]">
              Live Orders
            </h2>

            <div className="space-y-8">

              {orders.map((order) => (

                <div
                  key={order.id}
                  className="bg-black/30 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                      <h3 className="text-3xl">
                        Order #{order.order_number}
                      </h3>

                      <p className="text-gray-300 mt-2">
                        {order.customer_name}
                      </p>

                      <p className="text-gray-400">
                        {order.customer_phone}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-[#d6b98c] text-3xl">
                        ${Number(order.total).toFixed(2)}
                      </p>

                    </div>

                  </div>

                  <div className="mt-8 space-y-4">

                    {order.items.map((item: any, index: number) => (

                      <div
                        key={index}
                        className="border-b border-white/10 pb-4"
                      >

                        <div className="flex justify-between">

                          <p>
                            {item.quantity}x {item.name}
                          </p>

                          <p>
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>

                        </div>

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

                            {(item.customizations.extras ?? []).length > 0 && (
                              <p>
                                Extras:{" "}
                                {item.customizations.extras.join(", ")}
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

                </div>

              ))}

            </div>

          </div>

          {/* RESERVATIONS */}

          <div>

            <h2 className="text-4xl mb-10 text-[#d6b98c]">
              Reservations
            </h2>

            <div className="space-y-8">

              {reservations.map((reservation) => (

                <div
                  key={reservation.id}
                  className="bg-black/30 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
                >

                  <div className="flex flex-col md:flex-row md:justify-between gap-6">

                    <div>

                      <h3 className="text-3xl">
                        {reservation.customer_name}
                      </h3>

                      <p className="text-gray-300 mt-2">
                        {reservation.customer_phone}
                      </p>

                    </div>

                    <div className="text-right">

                      <p>
                        {reservation.reservation_date}
                      </p>

                      <p>
                        {reservation.reservation_time}
                      </p>

                      <p>
                        Party of {reservation.party_size}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}