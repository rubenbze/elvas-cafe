"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import { motion } from "framer-motion";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  image: string;
  available: boolean;
}

export default function AdminPage() {

  const [items, setItems] = useState<MenuItem[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  async function fetchItems() {

    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("id", { ascending: false });

    if (!error && data) {
      setItems(data);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function addMenuItem() {

    if (!name || !price) return;

    await supabase
      .from("menu_items")
      .insert([
        {
          name,
          description,
          category,
          price,
          image,
          available: true,
        },
      ]);

    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
    setImage("");

    fetchItems();
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

    fetchItems();
  }

  async function deleteItem(id: number) {

    await supabase
      .from("menu_items")
      .delete()
      .eq("id", id);

    fetchItems();
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      <PageBackground />

      <Navbar />

      <section className="relative z-10 pt-44 px-6 pb-24">

        <div className="max-w-7xl mx-auto">

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl mb-16 text-center"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Admin Dashboard
          </motion.h1>

          {/* ADD ITEM FORM */}

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 mb-20">

            <h2 className="text-3xl mb-10">
              Add Menu Item
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Item Name"
                className="bg-black/40 border border-white/10 rounded-2xl px-6 py-4"
              />

              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="bg-black/40 border border-white/10 rounded-2xl px-6 py-4"
              />

              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                className="bg-black/40 border border-white/10 rounded-2xl px-6 py-4"
              />

              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL"
                className="bg-black/40 border border-white/10 rounded-2xl px-6 py-4"
              />

            </div>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="bg-black/40 border border-white/10 rounded-2xl px-6 py-4 mt-6 w-full min-h-[120px]"
            />

            <button
              onClick={addMenuItem}
              className="mt-8 bg-[#d6b98c] text-black px-10 py-4 rounded-full font-semibold hover:scale-105 transition"
            >
              Add Item
            </button>

          </div>

          {/* MENU ITEMS */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {items.map((item) => (

              <div
                key={item.id}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[35px] overflow-hidden"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[280px] object-cover"
                />

                <div className="p-8">

                  <div className="flex items-center justify-between mb-4">

                    <h3 className="text-2xl font-semibold">
                      {item.name}
                    </h3>

                    <span className="text-[#d6b98c]">
                      {item.price}
                    </span>

                  </div>

                  <p className="text-gray-300 leading-7 mb-6">
                    {item.description}
                  </p>

                  <div className="flex gap-4 flex-wrap">

                    <button
                      onClick={() =>
                        toggleAvailability(
                          item.id,
                          item.available
                        )
                      }
                      className="bg-[#d6b98c] text-black px-5 py-3 rounded-full"
                    >
                      {item.available
                        ? "Available"
                        : "Sold Out"}
                    </button>

                    <button
                      onClick={() => deleteItem(item.id)}
                      className="bg-red-500 px-5 py-3 rounded-full"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}