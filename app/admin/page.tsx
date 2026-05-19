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
  items: string;
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

          <div className="space-y-8">

            {orders.map((order) => {

              const parsedItems =
                JSON.parse(order.items);

              return (

                <div
                  key={order.id}
                  className="bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
                >

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">

                    <div>

                      <h2 className="text-3xl text-[#d6b98c]">
                        {order.order_number}
                      </h2>

                      <p className="mt-3 text-xl">
                        {order.customer_name}
                      </p>

                      <p className="text-gray-400">
                        {order.customer_phone}
                      </p>

                      <p className="text-sm text-gray-500 mt-3">
                        {new Date(
                          order.created_at
                        ).toLocaleString()}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-4xl text-[#d6b98c]">
                        $
                        {Number(
                          order.total
                        ).toFixed(2)}
                      </p>

                    </div>

                  </div>

                  <div className="mt-8 border-t border-white/10 pt-8 space-y-6">

                    {parsedItems.map(
                      (
                        item: any,
                        index: number
                      ) => (

                        <div
                          key={index}
                          className="border border-white/10 rounded-2xl p-5"
                        >

                          <div className="flex justify-between items-center">

                            <div>

                              <h3 className="text-2xl">
                                {item.name}
                              </h3>

                              <p className="text-gray-400 mt-1">
                                Qty:
                                {" "}
                                {item.quantity}
                              </p>

                            </div>

                            <p className="text-[#d6b98c] text-xl">
                              $
                              {item.price}
                            </p>

                          </div>

                          {item.customizations && (

                            <div className="mt-5 text-sm text-[#d6b98c] space-y-2">

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

                              {item.customizations.extras?.length > 0 && (

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

                      )
                    )}

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </section>

      <Footer />

    </main>

  );

}