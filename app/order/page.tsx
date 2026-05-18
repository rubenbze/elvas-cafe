"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import { useCartStore } from "@/store/cartStore";

import "@fontsource/playfair-display";

import FloatingCart from "@/components/FloatingCart";


const menuSections = [

  {
    title: "Coffee",

    items: [
      {
        id: 1,
        name: "Caramel Latte",
        price: 8,
      },

      {
        id: 2,
        name: "Vanilla Latte",
        price: 8,
      },

      {
        id: 3,
        name: "Mocha Latte",
        price: 9,
      },

      {
        id: 4,
        name: "Cold Brew",
        price: 7,
      },

      {
        id: 5,
        name: "Espresso",
        price: 5,
      },
    ],
  },

  {
    title: "Matcha",

    items: [
      {
        id: 6,
        name: "Tres Leches Matcha Latte",
        price: 10,
      },

      {
        id: 7,
        name: "Iced Strawberry Matcha",
        price: 11,
      },

      {
        id: 8,
        name: "Brown Sugar Matcha",
        price: 10,
      },
    ],
  },

  {
    title: "Refreshers",

    items: [
      {
        id: 9,
        name: "Strawberry Açaí Refresher",
        price: 9,
      },

      {
        id: 10,
        name: "Mango Dragonfruit Refresher",
        price: 9,
      },

      {
        id: 11,
        name: "Peach Paradise Refresher",
        price: 10,
      },
    ],
  },

  {
    title: "Pastries",

    items: [
      {
        id: 12,
        name: "Butter Croissant",
        price: 6,
      },

      {
        id: 13,
        name: "Chocolate Croissant",
        price: 7,
      },

      {
        id: 14,
        name: "Mini Donuts",
        price: 7,
      },

      {
        id: 15,
        name: "Blueberry Muffin",
        price: 6,
      },
    ],
  },

  {
    title: "Entrees",

    items: [
      {
        id: 16,
        name: "Everything Bagel",
        price: 9,
      },

      {
        id: 17,
        name: "Turkey Croissant Sandwich",
        price: 14,
      },

      {
        id: 18,
        name: "Caprese Panini",
        price: 13,
      },

      {
        id: 19,
        name: "Smoked Salmon Toast",
        price: 16,
      },
    ],
  },

  {
    title: "Desserts",

    items: [
      {
        id: 20,
        name: "Tiramisu",
        price: 11,
      },

      {
        id: 21,
        name: "Tres Leches Cake",
        price: 10,
      },

      {
        id: 22,
        name: "Chocolate Lava Cake",
        price: 12,
      },
    ],
  },

];

export default function OrderPage() {

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      <PageBackground />

      <Navbar />
      <FloatingCart />

      <section className="relative z-10 pt-44 px-6 pb-20">

        <div className="max-w-7xl mx-auto">

          <h1
            className="text-7xl text-center mb-8"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Order Online
          </h1>

          <p className="text-center text-gray-300 mb-16 max-w-2xl mx-auto leading-8">
            Experience luxury café ordering with handcrafted beverages,
            artisan pastries, elevated entrées, and signature desserts.
          </p>

          {/* CATEGORY NAV */}

          <div className="flex flex-wrap justify-center gap-4 mb-20">

            {menuSections.map((section) => (

              <a
                key={section.title}
                href={`#${section.title}`}
                className="px-6 py-3 rounded-full bg-white/10 border border-white/10 hover:bg-[#d6b98c] hover:text-black transition"
              >
                {section.title}
              </a>

            ))}

          </div>

          {/* MENU SECTIONS */}

          <div className="space-y-28">

            {menuSections.map((section) => (

              <div
                key={section.title}
                id={section.title}
              >

                <h2
                  className="text-5xl mb-12 text-[#f5e6c8]"
                  style={{
                    fontFamily: "Playfair Display",
                  }}
                >
                  {section.title}
                </h2>

                <div className="space-y-8">

                  {section.items.map((item) => (

                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b border-white/10 pb-6"
                    >

                      <div>

                        <h3 className="text-2xl mb-2">
                          {item.name}
                        </h3>

                      </div>

                      <div className="flex items-center gap-8">

                        <p className="text-[#d6b98c] text-xl">
                          ${item.price}
                        </p>

                        <button
                          onClick={() =>
                            addToCart({
                              ...item,
                              quantity: 1,
                            })
                          }
                          className="bg-[#d6b98c] text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
                        >
                          Add
                        </button>

                      </div>

                    </div>

                  ))}

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