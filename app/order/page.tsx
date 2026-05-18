"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import FloatingCart from "@/components/FloatingCart";
import CustomizeDrinkModal from "@/components/CustomizeDrinkModal";

import "@fontsource/playfair-display";

const menuSections = [
  {
    title: "Coffee",
    type: "drink",

    items: [
      { id: 1, name: "Caramel Latte", price: 8 },
      { id: 2, name: "Vanilla Latte", price: 8 },
      { id: 3, name: "Mocha Latte", price: 9 },
      { id: 4, name: "Cold Brew", price: 7 },
      { id: 5, name: "Espresso", price: 5 },
    ],
  },

  {
    title: "Matcha",
    type: "drink",

    items: [
      { id: 6, name: "Tres Leches Matcha Latte", price: 10 },
      { id: 7, name: "Iced Strawberry Matcha", price: 11 },
      { id: 8, name: "Brown Sugar Matcha", price: 10 },
    ],
  },

  {
    title: "Refreshers",
    type: "drink",

    items: [
      { id: 9, name: "Strawberry Açaí Refresher", price: 9 },
      { id: 10, name: "Mango Dragonfruit Refresher", price: 9 },
      { id: 11, name: "Peach Paradise Refresher", price: 10 },
    ],
  },

  {
    title: "Pastries",
    type: "pastry",

    items: [
      { id: 12, name: "Butter Croissant", price: 6 },
      { id: 13, name: "Chocolate Croissant", price: 7 },
      { id: 14, name: "Mini Donuts", price: 7 },
      { id: 15, name: "Blueberry Muffin", price: 6 },
    ],
  },

  {
    title: "Entrees",
    type: "food",

    items: [
      { id: 16, name: "Everything Bagel", price: 9 },
      { id: 17, name: "Turkey Croissant Sandwich", price: 14 },
      { id: 18, name: "Caprese Panini", price: 13 },
      { id: 19, name: "Smoked Salmon Toast", price: 16 },
    ],
  },

  {
    title: "Desserts",
    type: "dessert",

    items: [
      { id: 20, name: "Tiramisu", price: 11 },
      { id: 21, name: "Tres Leches Cake", price: 10 },
      { id: 22, name: "Chocolate Lava Cake", price: 12 },
    ],
  },
];

export default function OrderPage() {

  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      <PageBackground />

      <Navbar />

      <FloatingCart />

      {/* HERO */}

      <section className="relative z-10 pt-44 px-6 pb-10">

        <div className="max-w-7xl mx-auto text-center">

          <h1
            className="text-5xl md:text-7xl mb-8"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Order Online
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto leading-8 text-lg">
            Experience handcrafted luxury café ordering.
          </p>

        </div>

      </section>

      {/* CATEGORY NAV */}

      <section className="relative z-10 px-6 mb-20">

        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">

          {menuSections.map((section) => (

            <a
              key={section.title}
              href={`#${section.title}`}
              className="px-6 py-3 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 hover:bg-[#d6b98c] hover:text-black transition duration-300"
            >
              {section.title}
            </a>

          ))}

        </div>

      </section>

      {/* MENU */}

      <section className="relative z-10 px-6 pb-24">

        <div className="max-w-7xl mx-auto space-y-28">

          {menuSections.map((section) => (

            <div
              key={section.title}
              id={section.title}
            >

              <h2
                className="text-5xl mb-14 text-[#f5e6c8]"
                style={{
                  fontFamily: "Playfair Display",
                }}
              >
                {section.title}
              </h2>

              <div className="space-y-10">

                {section.items.map((item) => (

                  <div
                    key={item.id}
                    className="group flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-8 hover:border-[#d6b98c] transition duration-300"
                  >

                    {/* LEFT */}

                    <div>

                      <h3 className="text-3xl mb-3 group-hover:text-[#f5e6c8] transition">

                        {item.name}

                      </h3>

                      <p className="text-gray-400">
                        Handcrafted premium café selection
                      </p>

                    </div>

                    {/* RIGHT */}

                    <div className="flex items-center gap-8 mt-6 md:mt-0">

                      <p className="text-[#d6b98c] text-2xl">
                        ${item.price}
                      </p>

                      <CustomizeDrinkModal
                        item={item}
                        type={section.type}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      </section>

      <Footer />

    </main>
  );
}