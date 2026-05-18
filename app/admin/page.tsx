"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import { supabase } from "@/lib/supabase";

type Order = {
  id: number;
  customer_name: string;
  phone: string;
  total: number;
  order_number: string;
  created_at: string;
};

type Reservation = {
  id: number;
  name: string;
  phone: string;
  guests: number;
  reservation_date: string;
  reservation_time: string;
  created_at: string;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetchOrders();
    fetchReservations();
  }, []);

  async function fetchOrders() {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    setOrders(data || []);
  }

  async function fetchReservations() {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    setReservations(data || []);
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <PageBackground />

      <Navbar />

      <section className="relative z-10 pt-44 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl mb-16 text-center text-[#f5e6c8]">
            Admin Dashboard
          </h1>

          {/* ORDERS */}

          <div className="mb-24">
            <h2 className="text-4xl mb-10 text-[#d6b98c]">
              Recent Orders
            </h2>

            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-2xl font-semibold">
                        {order.order_number}
                      </p>

                      <p className="text-gray-300 mt-2">
                        {order.customer_name}
                      </p>

                      <p className="text-gray-400">
                        {order.phone}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-3xl text-[#d6b98c]">
                        BZD ${Number(order.total).toFixed(2)}
                      </p>

                      <p className="text-sm text-gray-400 mt-2">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {orders.length === 0 && (
                <p className="text-gray-400">
                  No orders yet.
                </p>
              )}
            </div>
          </div>

          {/* RESERVATIONS */}

          <div>
            <h2 className="text-4xl mb-10 text-[#d6b98c]">
              Reservations
            </h2>

            <div className="space-y-6">
              {reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-2xl font-semibold">
                        {reservation.name}
                      </p>

                      <p className="text-gray-300 mt-2">
                        {reservation.phone}
                      </p>

                      <p className="text-gray-400">
                        Guests: {reservation.guests}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xl text-[#d6b98c]">
                        {reservation.reservation_date}
                      </p>

                      <p className="text-gray-300">
                        {reservation.reservation_time}
                      </p>

                      <p className="text-sm text-gray-400 mt-2">
                        {new Date(
                          reservation.created_at
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {reservations.length === 0 && (
                <p className="text-gray-400">
                  No reservations yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}