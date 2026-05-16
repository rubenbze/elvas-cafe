"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import { motion } from "framer-motion";

import "@fontsource/playfair-display";
import "@fontsource/inter";

const coffeeItems = [
  {
    name: "Classic Cappuccino",
    description: "Rich espresso with velvety steamed foam.",
    price: "$8",
  },

  {
    name: "Caramel Latte",
    description: "Silky espresso infused with caramel sweetness.",
    price: "$9",
  },

  {
    name: "Cold Brew Vanilla Cream",
    description: "Slow-steeped coffee topped with vanilla cream.",
    price: "$9",
  },

  {
    name: "Mocha Espresso",
    description: "Dark chocolate blended with premium espresso.",
    price: "$10",
  },

  {
    name: "Honey Cinnamon Latte",
    description: "Sweet honey and cinnamon layered into espresso.",
    price: "$9",
  },

  {
    name: "Brown Sugar Iced Latte",
    description: "Smooth iced espresso with brown sugar foam.",
    price: "$10",
  },
];

const addons = [
  {
    name: "Vanilla Syrup",
    price: "$1",
  },

  {
    name: "Caramel Syrup",
    price: "$1",
  },

  {
    name: "Hazelnut Syrup",
    price: "$1",
  },

  {
    name: "Cold Foam",
    price: "$2",
  },

  {
    name: "Oat Milk",
    price: "$2",
  },

  {
    name: "Extra Espresso Shot",
    price: "$3",
  },
];

const sections = [
  {
    title: "Matcha & Refreshers",
    subtitle: "Signature Creations",

    items: [
      {
        name: "Iced Matcha Latte",
        description: "Ceremonial-grade matcha over silky milk.",
        price: "$10",
      },

      {
        name: "Tres Leches Matcha Latte",
        description: "Creamy matcha infused with tres leches flavor.",
        price: "$11",
      },

      {
        name: "Strawberry Açaí Refresher",
        description: "Refreshing berries with tropical citrus notes.",
        price: "$9",
      },

      {
        name: "Vanilla Matcha Cloud",
        description: "Matcha topped with sweet vanilla cold foam.",
        price: "$11",
      },

      {
        name: "Mango Passion Refresher",
        description: "Bright tropical mango with passionfruit.",
        price: "$9",
      },
    ],
  },

  {
    title: "Pastries & Desserts",
    subtitle: "Freshly Baked Daily",

    items: [
      {
        name: "Signature Croissant",
        description: "Buttery artisan croissant baked fresh daily.",
        price: "$7",
      },

      {
        name: "Chocolate Croissant",
        description: "Flaky pastry filled with melted chocolate.",
        price: "$8",
      },

      {
        name: "Mini Donuts",
        description: "Warm sugar-dusted artisan mini donuts.",
        price: "$8",
      },

      {
        name: "Blueberry Muffin",
        description: "Moist blueberry muffin with vanilla glaze.",
        price: "$7",
      },

      {
        name: "Tres Leches Cake Slice",
        description: "Creamy tres leches topped with cinnamon.",
        price: "$9",
      },

      {
        name: "Macarons",
        description: "Elegant French macarons in assorted flavors.",
        price: "$10",
      },
    ],
  },

  {
    title: "Brunch & Entrées",
    subtitle: "Luxury Café Favorites",

    items: [
      {
        name: "Everything Bagel",
        description: "Toasted bagel with whipped cream cheese.",
        price: "$6",
      },

      {
        name: "Avocado Toast",
        description: "Artisan toast topped with avocado and herbs.",
        price: "$12",
      },

      {
        name: "French Toast Deluxe",
        description: "Brioche toast with berries and maple glaze.",
        price: "$14",
      },

      {
        name: "Breakfast Croissant Sandwich",
        description: "Egg, cheese, and smoked bacon croissant.",
        price: "$14",
      },

      {
        name: "Turkey Pesto Panini",
        description: "Pressed artisan sandwich with pesto aioli.",
        price: "$15",
      },

      {
        name: "Smoked Salmon Bagel",
        description: "Cream cheese, capers, and smoked salmon.",
        price: "$16",
      },
    ],
  },
];

export default function MenuPage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      <PageBackground />

      <Navbar />

      {/* HERO */}

      <section className="relative z-10 pt-44 pb-24 px-6 text-center">

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="uppercase tracking-[0.45em] text-[#d6b98c] text-sm mb-8"
        >
          Luxury Café Menu
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 55 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-6xl md:text-8xl"
          style={{
            fontFamily: "Playfair Display",
          }}
        >
          Signature Selections
        </motion.h1>

      </section>

      {/* COFFEE SECTION */}

      <section className="relative z-10 px-6 mb-20">

        <div className="max-w-6xl mx-auto backdrop-blur-2xl bg-black/30 border border-white/10 rounded-[40px] p-8 md:p-16 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">

          <div className="text-center mb-14">

            <h2
              className="text-5xl text-[#f5e6c8]"
              style={{
                fontFamily: "Playfair Display",
              }}
            >
              Coffee Bar
            </h2>

            <p className="uppercase tracking-[0.3em] text-[#d6b98c] text-sm mt-4">
              Hot & Iced
            </p>

          </div>

          <div className="space-y-10">

            {coffeeItems.map((item, index) => (

              <div
                key={index}
                className="border-b border-white/10 pb-8"
              >

                <div className="flex items-center justify-between gap-6">

                  <div>

                    <h3
                      className="text-2xl md:text-3xl text-[#f5e6c8]"
                      style={{
                        fontFamily: "Playfair Display",
                      }}
                    >
                      {item.name}
                    </h3>

                    <p className="mt-3 text-gray-300 leading-8">
                      {item.description}
                    </p>

                  </div>

                  <div
                    className="text-2xl text-[#d6b98c]"
                    style={{
                      fontFamily: "Playfair Display",
                    }}
                  >
                    {item.price}
                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* ADD-ONS */}

          <div className="mt-20">

            <div className="text-center mb-10">

              <h3
                className="text-3xl text-[#f5e6c8]"
                style={{
                  fontFamily: "Playfair Display",
                }}
              >
                Customize Your Drink
              </h3>

              <p className="uppercase tracking-[0.3em] text-[#d6b98c] text-sm mt-3">
                Syrups & Add-ons
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {addons.map((addon, index) => (

                <div
                  key={index}
                  className="flex justify-between border border-white/10 rounded-2xl px-6 py-5 bg-white/5"
                >

                  <span>{addon.name}</span>

                  <span className="text-[#d6b98c]">
                    {addon.price}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* OTHER SECTIONS */}

      <section className="relative z-10 pb-32 px-6">

        <div className="max-w-6xl mx-auto space-y-20">

          {sections.map((section, sectionIndex) => (

            <div
              key={sectionIndex}
              className="backdrop-blur-2xl bg-black/30 border border-white/10 rounded-[40px] p-8 md:p-16 shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
            >

              <div className="mb-14 text-center">

                <h2
                  className="text-5xl text-[#f5e6c8]"
                  style={{
                    fontFamily: "Playfair Display",
                  }}
                >
                  {section.title}
                </h2>

                <p className="uppercase tracking-[0.3em] text-[#d6b98c] text-sm mt-4">
                  {section.subtitle}
                </p>

              </div>

              <div className="space-y-10">

                {section.items.map((item, itemIndex) => (

                  <div
                    key={itemIndex}
                    className="border-b border-white/10 pb-8"
                  >

                    <div className="flex items-center justify-between gap-6">

                      <div>

                        <h3
                          className="text-2xl md:text-3xl text-[#f5e6c8]"
                          style={{
                            fontFamily: "Playfair Display",
                          }}
                        >
                          {item.name}
                        </h3>

                        <p className="mt-3 text-gray-300 leading-8">
                          {item.description}
                        </p>

                      </div>

                      <div
                        className="text-2xl text-[#d6b98c]"
                        style={{
                          fontFamily: "Playfair Display",
                        }}
                      >
                        {item.price}
                      </div>

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