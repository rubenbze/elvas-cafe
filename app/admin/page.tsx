"use client";

import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL!;

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
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

  const [menuItems, setMenuItems] =
    useState<any[]>([]);

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

  async function fetchMenu() {

    const { data } = await supabase
      .from("menu_items")
      .select("*");

    if (data) {

      setMenuItems(data);

    }

  }

  useEffect(() => {

    if (authenticated) {

      fetchOrders();
      fetchReservations();
      fetchMenu();

    }

  }, [authenticated]);

  function handleLogin() {

    if (password === "elvasadmin") {

      setAuthenticated(true);

    } else {

      alert("Incorrect Password");

    }

  }

  async function deleteMenuItem(id: number) {

    await supabase
      .from("menu_items")
      .delete()
      .eq("id", id);

    fetchMenu();

  }

  if (!authenticated) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="bg-[#111] border border-white/10 rounded-3xl p-10 w-full max-w-md">

          <h1 className="text-4xl mb-8 text-center text-[#f5e6c8]">
            Admin Login
          </h1>

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 mb-6 outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-[#d6b98c] text-black py-4 rounded-2xl font-semibold"
          >
            Login
          </button>

        </div>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-black text-white px-6 py-16">

      <div className="max-w-7xl mx-auto space-y-20">

        <h1 className="text-6xl text-[#f5e6c8]">
          Elva's Admin Dashboard
        </h1>

        {/* ORDERS */}

        <section>

          <h2 className="text-4xl mb-8">
            Orders
          </h2>

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-[#111] border border-white/10 rounded-3xl p-6"
              >

                <p>
                  <strong>Name:</strong>{" "}
                  {order.customer_name}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {order.phone}
                </p>

                <p>
                  <strong>Total:</strong>{" "}
                  ${order.total}
                </p>

                <div className="mt-4">

                  <strong>Items:</strong>

                  <pre className="mt-2 text-sm text-gray-300 whitespace-pre-wrap">
                    {JSON.stringify(
                      order.items,
                      null,
                      2
                    )}
                  </pre>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* RESERVATIONS */}

        <section>

          <h2 className="text-4xl mb-8">
            Reservations
          </h2>

          <div className="space-y-6">

            {reservations.map((reservation) => (

              <div
                key={reservation.id}
                className="bg-[#111] border border-white/10 rounded-3xl p-6"
              >

                <p>
                  <strong>Name:</strong>{" "}
                  {reservation.name}
                </p>

                <p>
                  <strong>Guests:</strong>{" "}
                  {reservation.guests}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {reservation.date}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {reservation.time}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* MENU */}

        <section>

          <h2 className="text-4xl mb-8">
            Menu Items
          </h2>

          <div className="space-y-4">

            {menuItems.map((item) => (

              <div
                key={item.id}
                className="bg-[#111] border border-white/10 rounded-3xl p-6 flex items-center justify-between"
              >

                <div>

                  <p className="text-2xl">
                    {item.name}
                  </p>

                  <p className="text-[#d6b98c]">
                    ${item.price}
                  </p>

                </div>

                <button
                  onClick={() =>
                    deleteMenuItem(item.id)
                  }
                  className="bg-red-500 px-5 py-3 rounded-2xl"
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </section>

      </div>

    </main>

  );

}