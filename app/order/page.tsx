"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import FloatingCart from "@/components/FloatingCart";
import CustomizeDrinkModal from "@/components/CustomizeDrinkModal";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function OrderPage() {

  const [menuItems, setMenuItems] =
    useState<any[]>([]);

  useEffect(() => {

    fetchMenu();

  }, []);

  async function fetchMenu() {

    const { data } =
      await supabase
        .from("menu_items")
        .select("*")
        .eq("available", true);

    setMenuItems(data || []);

  }

  const grouped =
    menuItems.reduce(
      (acc: any, item: any) => {

        if (!acc[item.category]) {

          acc[item.category] = [];

        }

        acc[item.category].push(item);

        return acc;

      },
      {}
    );

  return (

    <main className="relative min-h-screen text-white">

      <PageBackground />

      <Navbar />

      <FloatingCart />

      <section className="relative z-10 pt-40 px-6 pb-24">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <h1 className="text-6xl md:text-7xl text-[#f5e6c8] mb-6">
              Order Online
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Experience handcrafted luxury café ordering.
            </p>

          </div>

          {/* CATEGORY NAV */}

          <div className="flex flex-wrap justify-center gap-4 mb-24">

            {Object.keys(grouped).map(
              (category) => (

                <a
                  key={category}
                  href={`#${category}`}
                  className="px-6 py-3 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 hover:bg-[#d6b98c] hover:text-black transition"
                >
                  {category}
                </a>

              )
            )}

          </div>

          {/* MENU */}

          <div className="space-y-28">

            {Object.entries(grouped).map(
              ([category, items]: any) => (

                <div
                  key={category}
                  id={category}
                >

                  <h2 className="text-5xl text-[#f5e6c8] mb-14">
                    {category}
                  </h2>

                  <div className="grid gap-8">

                    {items.map(
                      (item: any) => (

                        <div
                          key={item.id}
                          className="relative z-0 bg-black/25 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 hover:border-[#d6b98c] transition"
                        >

                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

                            <div>

                              <h3 className="text-3xl mb-3 hover:text-[#f5e6c8] transition">

                                {item.name}

                              </h3>

                              <p className="text-gray-400 mb-4">

                                {item.description}

                              </p>

                              <p className="text-[#d6b98c] text-2xl">

                                ${item.price}

                              </p>

                            </div>

                            <CustomizeDrinkModal
                              item={item}
                              category={item.category}
                            />

                          </div>

                        </div>

                      )
                    )}

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </section>

      <Footer />

    </main>

  );

}