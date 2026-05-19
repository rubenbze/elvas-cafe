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

  const [menuItems, setMenuItems] =
    useState<any[]>([]);

  const [newItem, setNewItem] =
    useState({
      name: "",
      price: "",
      category: "",
      description: "",
    });

  async function fetchData() {

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

    const menuData =
      await supabase
        .from("menu_items")
        .select("*");

    setOrders(
      ordersData.data || []
    );

    setReservations(
      reservationsData.data || []
    );

    setMenuItems(
      menuData.data || []
    );

  }

  useEffect(() => {

    if (authenticated) {

      fetchData();

    }

  }, [authenticated]);

  function login() {

    if (password === "elvasadmin") {

      setAuthenticated(true);

    } else {

      alert("Wrong password");

    }

  }

  async function addMenuItem() {

    await supabase
      .from("menu_items")
      .insert([
        {
          name: newItem.name,
          price: Number(newItem.price),
          category:
            newItem.category,
          description:
            newItem.description,
          available: true,
        },
      ]);

    setNewItem({
      name: "",
      price: "",
      category: "",
      description: "",
    });

    fetchData();

  }

  async function deleteItem(id: number) {

    await supabase
      .from("menu_items")
      .delete()
      .eq("id", id);

    fetchData();

  }

  async function toggleAvailability(
    id: number,
    current: boolean
  ) {

    await supabase
      .from("menu_items")
      .update({
        available: !current,
      })
      .eq("id", id);

    fetchData();

  }

  async function updateReservationStatus(
    id: number,
    status: string
  ) {

    await supabase
      .from("reservations")
      .update({
        status,
      })
      .eq("id", id);

    fetchData();

  }

  async function updateOrderStatus(
    id: number,
    status: string
  ) {

    await supabase
      .from("orders")
      .update({
        status,
      })
      .eq("id", id);

    fetchData();

  }

  if (!authenticated) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">

        <div className="bg-[#111] border border-white/10 rounded-3xl p-10 w-full max-w-md">

          <h1 className="text-5xl text-center text-[#f5e6c8] mb-8">
            Admin Login
          </h1>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 mb-6 outline-none"
          />

          <button
            onClick={login}
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

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order.id}
                className="bg-[#111] border border-white/10 rounded-3xl p-8"
              >

                <div className="flex flex-wrap gap-10 mb-6">

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
                      {order.phone || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Status
                    </p>

                    <select
                      value={
                        order.status
                      }
                      onChange={(e) =>
                        updateOrderStatus(
                          order.id,
                          e.target.value
                        )
                      }
                      className="bg-black border border-white/10 rounded-xl px-4 py-2"
                    >
                      <option>
                        Preparing
                      </option>

                      <option>
                        Ready
                      </option>

                      <option>
                        Completed
                      </option>

                    </select>

                  </div>

                </div>

                <div className="space-y-4">

                  {Array.isArray(
                    order.items
                  ) &&
                    order.items.map(
                      (
                        item: any,
                        index: number
                      ) => (

                        <div
                          key={index}
                          className="bg-black/30 rounded-2xl p-5"
                        >

                          <div className="flex justify-between mb-3">

                            <h3 className="text-xl">
                              {item.name}
                            </h3>

                            <p>
                              Qty:
                              {" "}
                              {
                                item.quantity
                              }
                            </p>

                          </div>

                          {item.customizations && (

                            <div className="text-sm text-gray-300 space-y-1">

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

                              <p>
                                Notes:
                                {" "}
                                {item.customizations.notes || "—"}
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

          <h2 className="text-4xl mb-10">
            Reservations
          </h2>

          <div className="space-y-6">

            {reservations.map((reservation) => (

              <div
                key={reservation.id}
                className="bg-[#111] border border-white/10 rounded-3xl p-8"
              >

                <div className="grid md:grid-cols-6 gap-6 items-center">

                  <div>
                    <p className="text-gray-400">
                      Name
                    </p>

                    <p>
                      {reservation.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Phone
                    </p>

                    <p>
                      {reservation.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Guests
                    </p>

                    <p>
                      {reservation.guests}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Date
                    </p>

                    <p>
                      {reservation.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400">
                      Time
                    </p>

                    <p>
                      {reservation.time}
                    </p>
                  </div>

                  <div>

                    <select
                      value={
                        reservation.status
                      }
                      onChange={(e) =>
                        updateReservationStatus(
                          reservation.id,
                          e.target.value
                        )
                      }
                      className="bg-black border border-white/10 rounded-xl px-4 py-2"
                    >
                      <option>
                        Pending
                      </option>

                      <option>
                        Approved
                      </option>

                      <option>
                        Declined
                      </option>

                    </select>

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

          <div className="bg-[#111] border border-white/10 rounded-3xl p-8 mb-10">

            <h3 className="text-2xl mb-6">
              Add Menu Item
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mb-4">

              <input
                placeholder="Item Name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    name: e.target.value,
                  })
                }
                className="bg-black/30 border border-white/10 rounded-2xl p-4 outline-none"
              />

              <input
                placeholder="Price"
                value={newItem.price}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    price:
                      e.target.value,
                  })
                }
                className="bg-black/30 border border-white/10 rounded-2xl p-4 outline-none"
              />

              <input
                placeholder="Category"
                value={
                  newItem.category
                }
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    category:
                      e.target.value,
                  })
                }
                className="bg-black/30 border border-white/10 rounded-2xl p-4 outline-none"
              />

              <input
                placeholder="Description"
                value={
                  newItem.description
                }
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    description:
                      e.target.value,
                  })
                }
                className="bg-black/30 border border-white/10 rounded-2xl p-4 outline-none"
              />

            </div>

            <button
              onClick={addMenuItem}
              className="bg-[#d6b98c] text-black px-8 py-4 rounded-2xl font-semibold"
            >
              Add Item
            </button>

          </div>

          <div className="space-y-4">

            {menuItems.map((item) => (

              <div
                key={item.id}
                className="bg-[#111] border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >

                <div>

                  <p className="text-2xl">
                    {item.name}
                  </p>

                  <p className="text-[#d6b98c]">
                    ${item.price}
                  </p>

                  <p className="text-gray-400">
                    {item.category}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {item.description}
                  </p>

                </div>

                <div className="flex gap-4">

                  <button
                    onClick={() =>
                      toggleAvailability(
                        item.id,
                        item.available
                      )
                    }
                    className={`px-5 py-3 rounded-2xl ${
                      item.available
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {item.available
                      ? "Available"
                      : "Unavailable"}
                  </button>

                  <button
                    onClick={() =>
                      deleteItem(item.id)
                    }
                    className="bg-red-500 px-5 py-3 rounded-2xl"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

      </div>

    </main>

  );

}