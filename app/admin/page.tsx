"use client";

import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {

  const [orders, setOrders] = useState<any[]>([]);
  const [reservations, setReservations] =
    useState<any[]>([]);

  const [expandedOrder, setExpandedOrder] =
    useState<number | null>(null);

  useEffect(() => {

    fetchAll();

  }, []);

  async function fetchAll() {

    const { data: ordersData } =
      await supabase
        .from("orders")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    const { data: reservationsData } =
      await supabase
        .from("reservations")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    setOrders(ordersData || []);
    setReservations(
      reservationsData || []
    );

  }

  async function updateReservation(
    id: number,
    status: string
  ) {

    await supabase
      .from("reservations")
      .update({
        status,
      })
      .eq("id", id);

    fetchAll();

  }

  return (

    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-14">

          <h1 className="text-6xl text-[#f5e6c8]">
            Admin Dashboard
          </h1>

          <button
            onClick={fetchAll}
            className="bg-[#d6b98c] text-black px-6 py-3 rounded-2xl font-semibold"
          >
            Refresh Dashboard
          </button>

        </div>

        {/* ORDERS */}

        <div className="mb-24">

          <h2 className="text-4xl text-[#f5e6c8] mb-10">
            Live Orders
          </h2>

          <div className="space-y-6">

            {orders.map((order) => {

              const items =
                typeof order.items === "string"
                  ? JSON.parse(order.items)
                  : order.items;

              return (

                <div
                  key={order.id}
                  className="bg-[#111] border border-white/10 rounded-[32px] p-8"
                >

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                    <div>

                      <h3 className="text-3xl mb-2">

                        #{order.id}

                      </h3>

                      <p className="text-gray-300">
                        {order.name}
                      </p>

                      <p className="text-gray-500">
                        {order.phone}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-[#d6b98c] text-3xl mb-4">

                        ${order.total}

                      </p>

                      <button
                        onClick={() =>
                          setExpandedOrder(
                            expandedOrder === order.id
                              ? null
                              : order.id
                          )
                        }
                        className="bg-[#d6b98c] text-black px-5 py-3 rounded-2xl"
                      >

                        {expandedOrder === order.id
                          ? "Hide Order"
                          : "View Order"}

                      </button>

                    </div>

                  </div>

                  {expandedOrder === order.id && (

                    <div className="mt-10 border-t border-white/10 pt-8 space-y-6">

                      {items.map(
                        (item: any, index: number) => (

                          <div
                            key={index}
                            className="bg-black/30 rounded-2xl p-6"
                          >

                            <div className="flex justify-between mb-3">

                              <h4 className="text-2xl">

                                {item.name}

                              </h4>

                              <p className="text-[#d6b98c]">

                                x{item.quantity}

                              </p>

                            </div>

                            {item.customizations && (

                              <div className="text-gray-300 space-y-2">

                                {item.customizations.size && (
                                  <p>
                                    Size:{" "}
                                    {
                                      item.customizations
                                        .size
                                    }
                                  </p>
                                )}

                                {item.customizations.temperature && (
                                  <p>
                                    Temp:{" "}
                                    {
                                      item.customizations
                                        .temperature
                                    }
                                  </p>
                                )}

                                {item.customizations.milk && (
                                  <p>
                                    Milk:{" "}
                                    {
                                      item.customizations
                                        .milk
                                    }
                                  </p>
                                )}

                                {item.customizations.extras?.length > 0 && (
                                  <p>
                                    Add Ons:{" "}
                                    {item.customizations.extras.join(
                                      ", "
                                    )}
                                  </p>
                                )}

                                {item.customizations.notes && (
                                  <p>
                                    Notes:{" "}
                                    {
                                      item.customizations
                                        .notes
                                    }
                                  </p>
                                )}

                              </div>

                            )}

                          </div>

                        )
                      )}

                    </div>

                  )}

                </div>

              );

            })}

          </div>

        </div>

        {/* RESERVATIONS */}

        <div>

          <h2 className="text-4xl text-[#f5e6c8] mb-10">
            Reservations
          </h2>

          <div className="space-y-6">

            {reservations.map(
              (reservation) => (

                <div
                  key={reservation.id}
                  className="bg-[#111] border border-white/10 rounded-[32px] p-8"
                >

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                    <div>

                      <h3 className="text-2xl mb-2">
                        {reservation.name}
                      </h3>

                      <p className="text-gray-400">
                        {reservation.date}
                      </p>

                      <p className="text-gray-400">
                        {reservation.time}
                      </p>

                      <p className="text-gray-400">
                        Party of{" "}
                        {reservation.guests}
                      </p>

                    </div>

                    <div className="flex gap-4">

                      <button
                        onClick={() =>
                          updateReservation(
                            reservation.id,
                            "approved"
                          )
                        }
                        className="bg-green-500 text-black px-5 py-3 rounded-2xl"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateReservation(
                            reservation.id,
                            "declined"
                          )
                        }
                        className="bg-red-500 text-white px-5 py-3 rounded-2xl"
                      >
                        Decline
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </main>

  );

}