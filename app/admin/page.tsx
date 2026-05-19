"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AdminPage() {
  const supabase = createClientComponentClient();

  const [orders, setOrders] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  async function fetchDashboard() {
    setLoading(true);

    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: reservationsData } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    setOrders(ordersData || []);
    setReservations(reservationsData || []);

    setLoading(false);
  }

  useEffect(() => {
    if (loggedIn) {
      fetchDashboard();
    }
  }, [loggedIn]);

  async function updateReservation(
    id: number,
    status: string
  ) {
    await supabase
      .from("reservations")
      .update({ status })
      .eq("id", id);

    fetchDashboard();
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-6 text-white">
        <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-3xl p-10">
          <h1 className="text-4xl mb-8 text-center text-[#f5e6c8]">
            Admin Login
          </h1>

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-black border border-white/10 outline-none mb-6"
          />

          <button
            onClick={() => {
              if (password === "elvasadmin") {
                setLoggedIn(true);
              }
            }}
            className="w-full bg-[#d6b98c] text-black py-4 rounded-2xl font-semibold"
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl text-[#f5e6c8]">
            Admin Dashboard
          </h1>

          <button
            onClick={fetchDashboard}
            className="bg-[#d6b98c] text-black px-6 py-3 rounded-2xl"
          >
            Refresh Dashboard
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ORDERS */}

            <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
              <h2 className="text-3xl text-[#f5e6c8] mb-8">
                Live Orders
              </h2>

              <div className="space-y-6">
                {orders.map((order) => {
                  const items = Array.isArray(order.items)
                    ? order.items
                    : JSON.parse(order.items || "[]");

                  return (
                    <div
                      key={order.id}
                      className="bg-black/40 border border-white/10 rounded-2xl p-6"
                    >
                      <div className="flex justify-between mb-4">
                        <div>
                          <p className="text-xl text-[#f5e6c8]">
                            Order #{order.id}
                          </p>

                          <p>{order.name}</p>

                          <p className="text-sm text-gray-400">
                            {order.phone}
                          </p>
                        </div>

                        <p className="text-[#d6b98c] text-xl">
                          ${order.total}
                        </p>
                      </div>

                      <div className="space-y-4">
                        {items.map(
                          (item: any, index: number) => (
                            <div
                              key={index}
                              className="border border-white/10 rounded-2xl p-4"
                            >
                              <div className="flex justify-between mb-2">
                                <p className="font-semibold">
                                  {item.quantity}x {item.name}
                                </p>

                                <p>${item.price}</p>
                              </div>

                              <div className="text-sm text-gray-300 space-y-1">

                                {item.customizations?.size && (
                                  <p>
                                    Size:
                                    {" "}
                                    {item.customizations.size}
                                  </p>
                                )}

                                {item.customizations?.temperature && (
                                  <p>
                                    Temperature:
                                    {" "}
                                    {item.customizations.temperature}
                                  </p>
                                )}

                                {item.customizations?.milk && (
                                  <p>
                                    Milk:
                                    {" "}
                                    {item.customizations.milk}
                                  </p>
                                )}

                                {item.customizations?.extras?.length > 0 && (
                                  <p>
                                    Extras:
                                    {" "}
                                    {item.customizations.extras.join(", ")}
                                  </p>
                                )}

                                {item.customizations?.notes && (
                                  <p>
                                    Notes:
                                    {" "}
                                    {item.customizations.notes}
                                  </p>
                                )}

                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RESERVATIONS */}

            <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
              <h2 className="text-3xl text-[#f5e6c8] mb-8">
                Reservations
              </h2>

              <div className="space-y-6">
                {reservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="bg-black/40 border border-white/10 rounded-2xl p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xl text-[#f5e6c8]">
                          {reservation.name}
                        </p>

                        <p>{reservation.phone}</p>
                      </div>

                      <span className="bg-[#d6b98c] text-black px-4 py-2 rounded-full text-sm">
                        {reservation.status || "Pending"}
                      </span>
                    </div>

                    <div className="text-gray-300 space-y-2 mb-6">
                      <p>Date: {reservation.date}</p>
                      <p>Time: {reservation.time}</p>
                      <p>Guests: {reservation.guests}</p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          updateReservation(
                            reservation.id,
                            "Approved"
                          )
                        }
                        className="flex-1 bg-green-500 text-black py-3 rounded-2xl font-semibold"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateReservation(
                            reservation.id,
                            "Declined"
                          )
                        }
                        className="flex-1 bg-red-500 text-white py-3 rounded-2xl font-semibold"
                      >
                        Decline
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}