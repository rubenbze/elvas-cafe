"use client";

import { useState } from "react";

import { useCartStore } from "@/store/cartStore";

type Props = {
  item: any;
  category: string;
};

export default function CustomizeDrinkModal({
  item,
  category,
}: Props) {

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const [open, setOpen] =
    useState(false);

  const [size, setSize] =
    useState("16oz");

  const [temperature, setTemperature] =
    useState("Iced");

  const [milk, setMilk] =
    useState("Whole Milk");

  const [extras, setExtras] =
    useState<string[]>([]);

  const [notes, setNotes] =
    useState("");

  function toggleExtra(extra: string) {

    if (extras.includes(extra)) {

      setExtras(
        extras.filter(
          (e) => e !== extra
        )
      );

    } else {

      setExtras([
        ...extras,
        extra,
      ]);

    }

  }

  function handleAddToCart() {

    addToCart({
      ...item,

      quantity: 1,

      customizations: {
        size,
        temperature,
        milk,
        extras,
        notes,
      },
    });

    setOpen(false);

  }

  const isCoffee =
    category === "Coffee";

  const isMatcha =
    category === "Matcha";

  const isRefresher =
    category === "Refreshers";

  const isPastry =
    category === "Pastries";

  const isDessert =
    category === "Desserts";

  const isEntree =
    category === "Entrees";

  return (

    <>

      <button
        onClick={() =>
          setOpen(true)
        }
        className="w-12 h-12 rounded-full bg-[#d6b98c] text-black text-3xl flex items-center justify-center hover:scale-105 transition"
      >
        +
      </button>

      {open && (

        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >

          <div
            className="relative bg-[#111] border border-white/10 rounded-3xl w-full max-w-2xl h-[82vh] overflow-hidden flex flex-col"
          >

            {/* HEADER */}

            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#111] sticky top-0 z-50">

              <div>

                <h2 className="text-3xl text-[#f5e6c8]">
                  {item.name}
                </h2>

                <p className="text-[#d6b98c] mt-1">
                  ${item.price}
                </p>

              </div>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-2xl flex items-center justify-center transition flex-shrink-0"
              >
                ×
              </button>

            </div>

            {/* CONTENT */}

            <div className="flex-1 overflow-y-auto px-6 py-6">

              {(isCoffee || isMatcha) && (

                <div className="mb-8">

                  <p className="mb-4 text-[#d6b98c]">
                    Size
                  </p>

                  <div className="flex gap-3 flex-wrap">

                    {[
                      "8oz",
                      "12oz",
                      "16oz",
                    ].map((option) => (

                      <button
                        key={option}
                        onClick={() =>
                          setSize(option)
                        }
                        className={`px-5 py-3 rounded-2xl border transition ${
                          size === option
                            ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                            : "border-white/10"
                        }`}
                      >
                        {option}
                      </button>

                    ))}

                  </div>

                </div>

              )}

              {(isCoffee || isMatcha) && (

                <div className="mb-8">

                  <p className="mb-4 text-[#d6b98c]">
                    Temperature
                  </p>

                  <div className="flex gap-3">

                    {[
                      "Hot",
                      "Iced",
                    ].map((option) => (

                      <button
                        key={option}
                        onClick={() =>
                          setTemperature(
                            option
                          )
                        }
                        className={`px-5 py-3 rounded-2xl border transition ${
                          temperature === option
                            ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                            : "border-white/10"
                        }`}
                      >
                        {option}
                      </button>

                    ))}

                  </div>

                </div>

              )}

              {(isCoffee || isMatcha) && (

                <div className="mb-8">

                  <p className="mb-4 text-[#d6b98c]">
                    Milk
                  </p>

                  <div className="flex gap-3 flex-wrap">

                    {[
                      "Whole Milk",
                      "Oat Milk",
                      "Almond Milk",
                      "Soy Milk",
                    ].map((option) => (

                      <button
                        key={option}
                        onClick={() =>
                          setMilk(option)
                        }
                        className={`px-5 py-3 rounded-2xl border transition ${
                          milk === option
                            ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                            : "border-white/10"
                        }`}
                      >
                        {option}
                      </button>

                    ))}

                  </div>

                </div>

              )}

              {isCoffee && (

                <div className="mb-8">

                  <p className="mb-4 text-[#d6b98c]">
                    Extras
                  </p>

                  <div className="flex flex-wrap gap-3">

                    {[
                      "Extra Espresso Shot",
                      "Caramel Syrup",
                      "Vanilla Syrup",
                      "Hazelnut Syrup",
                      "Whipped Cream",
                      "Caramel Drizzle",
                    ].map((option) => (

                      <button
                        key={option}
                        onClick={() =>
                          toggleExtra(option)
                        }
                        className={`px-5 py-3 rounded-2xl border transition ${
                          extras.includes(option)
                            ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                            : "border-white/10"
                        }`}
                      >
                        {option}
                      </button>

                    ))}

                  </div>

                </div>

              )}

              {isMatcha && (

                <div className="mb-8">

                  <p className="mb-4 text-[#d6b98c]">
                    Extras
                  </p>

                  <div className="flex flex-wrap gap-3">

                    {[
                      "Cold Foam",
                      "Vanilla Syrup",
                      "Brown Sugar Syrup",
                    ].map((option) => (

                      <button
                        key={option}
                        onClick={() =>
                          toggleExtra(option)
                        }
                        className={`px-5 py-3 rounded-2xl border transition ${
                          extras.includes(option)
                            ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                            : "border-white/10"
                        }`}
                      >
                        {option}
                      </button>

                    ))}

                  </div>

                </div>

              )}

              {isRefresher && (

                <div className="mb-8">

                  <p className="mb-4 text-[#d6b98c]">
                    Customize
                  </p>

                  <div className="flex flex-wrap gap-3">

                    {[
                      "Add Lemonade",
                      "Coconut Milk",
                      "Extra Fruit Inclusions",
                      "Light Ice",
                      "No Ice",
                    ].map((option) => (

                      <button
                        key={option}
                        onClick={() =>
                          toggleExtra(option)
                        }
                        className={`px-5 py-3 rounded-2xl border transition ${
                          extras.includes(option)
                            ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                            : "border-white/10"
                        }`}
                      >
                        {option}
                      </button>

                    ))}

                  </div>

                </div>

              )}

              {isPastry && (

                <div className="mb-8">

                  <p className="mb-4 text-[#d6b98c]">
                    Pastry Options
                  </p>

                  <button
                    onClick={() =>
                      toggleExtra("Warm It Up")
                    }
                    className={`px-5 py-3 rounded-2xl border transition ${
                      extras.includes("Warm It Up")
                        ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                        : "border-white/10"
                    }`}
                  >
                    Warm It Up
                  </button>

                </div>

              )}

              {isDessert && (

                <div className="mb-8">

                  <p className="mb-4 text-[#d6b98c]">
                    Dessert Add Ons
                  </p>

                  <div className="flex flex-wrap gap-3">

                    {[
                      "Add Ice Cream",
                      "Extra Drizzle",
                    ].map((option) => (

                      <button
                        key={option}
                        onClick={() =>
                          toggleExtra(option)
                        }
                        className={`px-5 py-3 rounded-2xl border transition ${
                          extras.includes(option)
                            ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                            : "border-white/10"
                        }`}
                      >
                        {option}
                      </button>

                    ))}

                  </div>

                </div>

              )}

              {isEntree && (

                <div className="mb-8">

                  <p className="mb-4 text-[#d6b98c]">
                    Entree Options
                  </p>

                  <div className="flex flex-wrap gap-3">

                    {[
                      "Remove Ingredients",
                      "Extra Cheese",
                      "Add Protein",
                      "Warm It Up",
                    ].map((option) => (

                      <button
                        key={option}
                        onClick={() =>
                          toggleExtra(option)
                        }
                        className={`px-5 py-3 rounded-2xl border transition ${
                          extras.includes(option)
                            ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                            : "border-white/10"
                        }`}
                      >
                        {option}
                      </button>

                    ))}

                  </div>

                </div>

              )}

              <div className="mt-10">

                <p className="mb-3 text-[#d6b98c]">
                  Notes
                </p>

                <textarea
                  value={notes}
                  onChange={(e) =>
                    setNotes(e.target.value)
                  }
                  placeholder="Special instructions..."
                  className="w-full h-28 bg-black/30 border border-white/10 rounded-2xl p-4 outline-none resize-none"
                />

              </div>

              <button
                onClick={handleAddToCart}
                className="w-full mt-10 bg-[#d6b98c] text-black py-4 rounded-2xl text-xl font-semibold hover:scale-[1.02] transition"
              >
                Add To Order
              </button>

            </div>

          </div>

        </div>

      )}

    </>

  );

}