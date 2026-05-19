"use client";

import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {

  const [password, setPassword] =
    useState("");

  const [authenticated, setAuthenticated] =
    useState(false);

  const [orders, setOrders] =
    useState<any[]>([]);

  const [reservations, setReservations] =
    useState<any[]>([]);

  const [refreshing, setRefreshing] =
    useState(false);

  async function fetchDashboard() {

    setRefreshing(true);

    const ordersData =
      await supabase
        .from("orders")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    const reservationsData =
      await supabase
        .from("reservations")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    setOrders(
      ordersData.data || []
    );

    setReservations(
      reservationsData.data || []
    );

    setRefreshing(false);

  }

  useEffect(() => {

    if (authenticated) {

      fetchDashboard();

      const interval =
        setInterval(() => {

          fetchDashboard();

        }, 10000);

      return () =>
        clearInterval(interval);

    }

  }, [authenticated]);

  function login() {

    if (password === "elvasadmin") {

      setAuthenticated(true);

    } else {

      alert("Wrong Password");

    }

  }

  if (!authenticated) {

    return (

      <main className="min-h-screen bg-black flex items-center justify-center px-6 text-white">

        <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-[40px] p-10">

          <h1 className="text-5xl text-center text-[#f5e6c8] mb-10">
            Admin Login
          </h1>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-black/30 border border-white/10 rounded-2xl p-5 outline-none mb-6"
          />

          <button
            onClick={login}
            className="w-full bg-[#d6b98c] text-black py-5 rounded-2xl font-semibold"
          >
            Login
          </button>

        </div>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-[#050505] text-white px-6 py-12">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">

          <div>

            <h1 className="text-6xl text-[#f5e6c8] mb-3">
              Elva's Café
            </h1>

            <p className="text-gray-400 text-lg">
              Live Café Management Dashboard
            </p>

          </div>

          <button
            onClick={fetchDashboard}
            className="bg-[#d6b98c] text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"
          >
            {refreshing
              ? "Refreshing..."
              : "Refresh Dashboard"}
          </button>

        </div>

        {/* LIVE ORDERS */}

        <section className="mb-24">

          <div className="flex items-center justify-between mb-10">

            <h2 className="text-4xl">
              Live Orders
            </h2>

            <div className="bg-[#111] border border-white/10 rounded-2xl px-6 py-3">

              {orders.length} Orders

            </div>

          </div>

          <div className="grid gap-8">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-[#111] border border-white/10 rounded-[32px] p-8 shadow-2xl"
              >

                <div className="grid md:grid-cols-4 gap-6 mb-8">

                  <div>

                    <p className="text-gray-400 mb-2">
                      Customer
                    </p>

                    <p className="text-2xl">
                      {order.customer_name}
                    </p>

                  </div>

                  <div>

                    <p className="text-gray-400 mb-2">
                      Phone
                    </p>

                    <p className="text-2xl">
                      {order.phone || "N/A"}
                    </p>

                  </div>

                  <div>

                    <p className="text-gray-400 mb-2">
                      Total
                    </p>

                    <p className="text-2xl text-[#d6b98c]">
                      ${order.total}
                    </p>

                  </div>

                  <div>

                    <p className="text-gray-400 mb-2">
                      Order #
                    </p>

                    <p className="text-2xl">
                      {order.id}
                    </p>

                  </div>

                </div>

                <div className="space-y-5">

                  {Array.isArray(order.items) &&
                    order.items.map(
                      (
                        item: any,
                        index: number
                      ) => (

                        <div
                          key={index}
                          className="bg-black/30 rounded-2xl p-6"
                        >

                          <div className="flex justify-between mb-3">

                            <h3 className="text-xl">
                              {item.name}
                            </h3>

                            <p>
                              Qty:
                              {" "}
                              {item.quantity}
                            </p>

                          </div>

                          {item.customizations && (

                            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-300">

                              <p>
                                Size:
                                {" "}
                                {item.customizations.size || "—"}
                              </p>

                              <p>
                                Temperature:
                                {" "}
                                {item.customizations.temperature || "—"}
                              </p>

                              <p>
                                Milk:
                                {" "}
                                {item.customizations.milk || "—"}
                              </p>

                              <p>
                                Extras:
                                {" "}
                                {item.customizations.extras?.join(", ") || "—"}
                              </p>

                              <p className="md:col-span-2">
                                Notes:
                                {" "}
                                {item.customizations.notes || "None"}
                              </p>

                            </div>

                          )}

                        </div>

                      )
                    )}

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* RESERVATIONS */}

        <section>

          <div className="flex items-center justify-between mb-10">

            <h2 className="text-4xl">
              Reservations
            </h2>

            <div className="bg-[#111] border border-white/10 rounded-2xl px-6 py-3">

              {reservations.length} Reservations

            </div>

          </div>

          <div className="grid gap-8">

            {reservations.map((reservation) => (

              <div
                key={reservation.id}
                className="bg-[#111] border border-white/10 rounded-[32px] p-8"
              >

                <div className="grid md:grid-cols-5 gap-6">

                  <div>

                    <p className="text-gray-400 mb-2">
                      Name
                    </p>

                    <p className="text-xl">
                      {reservation.name}
                    </p>

                  </div>

                  <div>

                    <p className="text-gray-400 mb-2">
                      Phone
                    </p>

                    <p className="text-xl">
                      {reservation.phone}
                    </p>

                  </div>

                  <div>

                    <p className="text-gray-400 mb-2">
                      Guests
                    </p>

                    <p className="text-xl">
                      {reservation.guests}
                    </p>

                  </div>

                  <div>

                    <p className="text-gray-400 mb-2">
                      Date
                    </p>

                    <p className="text-xl">
                      {reservation.date}
                    </p>

                  </div>

                  <div>

                    <p className="text-gray-400 mb-2">
                      Time
                    </p>

                    <p className="text-xl">
                      {reservation.time}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

      </div>

    </main>

  );

}