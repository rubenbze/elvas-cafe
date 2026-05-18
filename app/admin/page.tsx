"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import { supabase } from "@/lib/supabase";

type Order = {
  id: number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  total: number;
  created_at: string;
};

export default function AdminPage() {

  const [orders, setOrders] =
    useState<Order[]>([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  async function fetchOrders() {

    if (!supabase) return;

    const { data, error } =
      await supabase
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

  return (

    <main className="relative min-h-screen overflow-hidden text-white">

      <PageBackground />

      <Navbar />

      <section className="relative z-10 pt-44 px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-6xl text-center mb-20 text-[#f5e6c8]">
            Admin Dashboard
          </h1>

          <div>

            <h2 className="text-4xl mb-10 text-[#d6b98c]">
              Live Orders
            </h2>

            <div className="space-y-6">

              {orders.map((order) => (

                <div
                  key={order.id}
                  className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                      <h3 className="text-2xl font-semibold">
                        {order.order_number}
                      </h3>

                      <p className="text-gray-300 mt-2">
                        {order.customer_name}
                      </p>

                      <p className="text-gray-400">
                        {order.customer_phone}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-3xl text-[#d6b98c]">
                        BZD $
                        {Number(order.total).toFixed(2)}
                      </p>

                      <p className="text-sm text-gray-400 mt-2">
                        {new Date(
                          order.created_at
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

              {orders.length === 0 && (

                <div className="bg-black/30 border border-white/10 rounded-3xl p-10 text-center text-gray-400">

                  No orders yet.

                </div>

              )}

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>

  );

}