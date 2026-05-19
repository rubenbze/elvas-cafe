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

  const [newName, setNewName] =
    useState("");

  const [newPrice, setNewPrice] =
    useState("");

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

  async function addMenuItem() {

    if (!newName || !newPrice) return;

    await supabase
      .from("menu_items")
      .insert([
        {
          name: newName,
          price: Number(newPrice),
        },
      ]);

    setNewName("");
    setNewPrice("");

    fetchMenu();

  }

  async function deleteMenuItem(id: number) {

    await supabase
      .from("menu_items")
      .delete()
      .eq("id", id);

    fetchMenu();

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

  if (!authenticated) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="bg-[#111] border border-white/10 rounded-3xl p-10 w-full max-w-md">

          <h1 className="text-5xl text-[#f5e6c8] text-center mb-8">
            Elva's Admin
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

      <div className="max-w-7xl mx-auto space-y-24">

        <div>

          <h1 className="text-6xl text-[#f5e6c8] mb-4">
            Elva's Café Dashboard
          </h1>

          <p className="text-gray-400">
            Manage orders, reservations, and menu items.
          </p>

        </div>

        {/* ORDERS */}

        <section>

          <h2 className="text-4xl mb-10">
            Orders
          </h2>

          <div className="space-y-8">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-[#111] border border-white/10 rounded-3xl p-8"
              >

                <div className="flex flex-wrap gap-8 mb-6">

                  <div>
                    <p className="text-gray-400">
                      Customer
                    </p>

                    <p className="text-xl">
                      {order.customer_name}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Phone
                    </p>

                    <p className="text-xl">
                      {order.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Total
                    </p>

                    <p className="text-xl text-[#d6b98c]">
                      ${order.total}
                    </p>
                  </div>

                </div>

                <div>

                  <p className="text-2xl mb-4">
                    Items Ordered
                  </p>

                  <div className="space-y-4">

                    {order.items?.map(
                      (
                        item: any,
                        index: number
                      ) => (

                        <div
                          key={index}
                          className="bg-black/30 rounded-2xl p-5"
                        >

                          <div className="flex justify-between">

                            <h3 className="text-xl">
                              {item.name}
                            </h3>

                            <p className="text-[#d6b98c]">
                              ${item.price}
                            </p>

                          </div>

                          {item.customizations && (

                            <div className="mt-4 text-sm text-gray-300 space-y-1">

                              {item.customizations.size && (
                                <p>
                                  Size:{" "}
                                  {
                                    item
                                      .customizations
                                      .size
                                  }
                                </p>
                              )}

                              {item.customizations.temperature && (
                                <p>
                                  Temperature:{" "}
                                  {
                                    item
                                      .customizations
                                      .temperature
                                  }
                                </p>
                              )}

                              {item.customizations.milk && (
                                <p>
                                  Milk:{" "}
                                  {
                                    item
                                      .customizations
                                      .milk
                                  }
                                </p>
                              )}

                              {item.customizations.extras?.length > 0 && (
                                <p>
                                  Extras:{" "}
                                  {item.customizations.extras.join(
                                    ", "
                                  )}
                                </p>
                              )}

                              {item.customizations.notes && (
                                <p>
                                  Notes:{" "}
                                  {
                                    item
                                      .customizations
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

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* RESERVATIONS */}

        <section>

          <h2 className="text-4xl mb-10">
            Reservations
          </h2>

          <div className="space-y-6">

            {reservations.map((reservation) => (

              <div
                key={reservation.id}
                className="bg-[#111] border border-white/10 rounded-3xl p-6"
              >

                <div className="grid md:grid-cols-4 gap-6">

                  <div>
                    <p className="text-gray-400">
                      Name
                    </p>

                    <p className="text-xl">
                      {reservation.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Guests
                    </p>

                    <p className="text-xl">
                      {reservation.guests}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Date
                    </p>

                    <p className="text-xl">
                      {reservation.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
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

        {/* MENU */}

        <section>

          <h2 className="text-4xl mb-10">
            Menu Management
          </h2>

          {/* ADD ITEM */}

          <div className="bg-[#111] border border-white/10 rounded-3xl p-8 mb-10">

            <h3 className="text-2xl mb-6">
              Add Menu Item
            </h3>

            <div className="grid md:grid-cols-3 gap-4">

              <input
                placeholder="Item Name"
                value={newName}
                onChange={(e) =>
                  setNewName(e.target.value)
                }
                className="bg-black/40 border border-white/10 rounded-2xl p-4 outline-none"
              />

              <input
                placeholder="Price"
                value={newPrice}
                onChange={(e) =>
                  setNewPrice(e.target.value)
                }
                className="bg-black/40 border border-white/10 rounded-2xl p-4 outline-none"
              />

              <button
                onClick={addMenuItem}
                className="bg-[#d6b98c] text-black rounded-2xl font-semibold"
              >
                Add Item
              </button>

            </div>

          </div>

          {/* EXISTING ITEMS */}

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