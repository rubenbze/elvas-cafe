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

  const addToCart =
    useCartStore(
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

    if (
      extras.includes(extra)
    ) {

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

  function renderOptions() {

    // COFFEE + MATCHA

    if (
      category === "Coffee" ||
      category === "Matcha"
    ) {

      return (

        <>

          {/* SIZE */}

          <div>

            <p className="mb-3 text-[#d6b98c]">
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
                  className={`px-5 py-2 rounded-full border ${
                    size === option
                      ? "bg-[#d6b98c] text-black"
                      : "border-white/20"
                  }`}
                >
                  {option}
                </button>

              ))}

            </div>

          </div>

          {/* TEMP */}

          <div className="mt-8">

            <p className="mb-3 text-[#d6b98c]">
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
                  className={`px-5 py-2 rounded-full border ${
                    temperature === option
                      ? "bg-[#d6b98c] text-black"
                      : "border-white/20"
                  }`}
                >
                  {option}
                </button>

              ))}

            </div>

          </div>

          {/* MILK */}

          <div className="mt-8">

            <p className="mb-3 text-[#d6b98c]">
              Milk
            </p>

            <div className="flex flex-wrap gap-3">

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
                  className={`px-5 py-2 rounded-full border ${
                    milk === option
                      ? "bg-[#d6b98c] text-black"
                      : "border-white/20"
                  }`}
                >
                  {option}
                </button>

              ))}

            </div>

          </div>

          {/* EXTRAS */}

          <div className="mt-8">

            <p className="mb-3 text-[#d6b98c]">
              Extras
            </p>

            <div className="flex flex-wrap gap-3">

              {[
                "Vanilla Syrup",
                "Caramel Syrup",
                "Hazelnut Syrup",
                "Extra Espresso Shot",
                "Cold Foam",
                "Whipped Cream",
              ].map((extra) => (

                <button
                  key={extra}
                  onClick={() =>
                    toggleExtra(extra)
                  }
                  className={`px-5 py-2 rounded-full border ${
                    extras.includes(
                      extra
                    )
                      ? "bg-[#d6b98c] text-black"
                      : "border-white/20"
                  }`}
                >
                  {extra}
                </button>

              ))}

            </div>

          </div>

        </>

      );

    }

    // REFRESHERS

    if (
      category ===
      "Refreshers"
    ) {

      return (

        <>

          <div>

            <p className="mb-3 text-[#d6b98c]">
              Size
            </p>

            <div className="flex gap-3">

              {[
                "12oz",
                "16oz",
                "24oz",
              ].map((option) => (

                <button
                  key={option}
                  onClick={() =>
                    setSize(option)
                  }
                  className={`px-5 py-2 rounded-full border ${
                    size === option
                      ? "bg-[#d6b98c] text-black"
                      : "border-white/20"
                  }`}
                >
                  {option}
                </button>

              ))}

            </div>

          </div>

          <div className="mt-8">

            <p className="mb-3 text-[#d6b98c]">
              Extras
            </p>

            <div className="flex flex-wrap gap-3">

              {[
                "Light Ice",
                "No Ice",
                "Extra Fruit",
                "Lemonade",
                "Coconut Milk",
              ].map((extra) => (

                <button
                  key={extra}
                  onClick={() =>
                    toggleExtra(extra)
                  }
                  className={`px-5 py-2 rounded-full border ${
                    extras.includes(
                      extra
                    )
                      ? "bg-[#d6b98c] text-black"
                      : "border-white/20"
                  }`}
                >
                  {extra}
                </button>

              ))}

            </div>

          </div>

        </>

      );

    }

    // PASTRIES

    if (
      category ===
      "Pastries"
    ) {

      return (

        <div>

          <p className="mb-3 text-[#d6b98c]">
            Options
          </p>

          <button
            onClick={() =>
              toggleExtra(
                "Warm It Up"
              )
            }
            className={`px-5 py-2 rounded-full border ${
              extras.includes(
                "Warm It Up"
              )
                ? "bg-[#d6b98c] text-black"
                : "border-white/20"
            }`}
          >
            Warm It Up
          </button>

        </div>

      );

    }

    // ENTREES

    if (
      category ===
      "Entrees"
    ) {

      return (

        <div>

          <p className="mb-3 text-[#d6b98c]">
            Extras
          </p>

          <div className="flex flex-wrap gap-3">

            {[
              "Extra Cheese",
              "Extra Protein",
              "Warm It Up",
              "No Tomatoes",
              "No Onions",
            ].map((extra) => (

              <button
                key={extra}
                onClick={() =>
                  toggleExtra(extra)
                }
                className={`px-5 py-2 rounded-full border ${
                  extras.includes(
                    extra
                  )
                    ? "bg-[#d6b98c] text-black"
                    : "border-white/20"
                }`}
              >
                {extra}
              </button>

            ))}

          </div>

        </div>

      );

    }

    // DESSERTS

    return (

      <div>

        <p className="mb-3 text-[#d6b98c]">
          Dessert Add-ons
        </p>

        <div className="flex flex-wrap gap-3">

          {[
            "Extra Chocolate",
            "Add Ice Cream",
            "Extra Caramel Drizzle",
          ].map((extra) => (

            <button
              key={extra}
              onClick={() =>
                toggleExtra(extra)
              }
              className={`px-5 py-2 rounded-full border ${
                extras.includes(
                  extra
                )
                  ? "bg-[#d6b98c] text-black"
                  : "border-white/20"
              }`}
            >
              {extra}
            </button>

          ))}

        </div>

      </div>

    );

  }

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

        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-8">

              <div>

                <h2 className="text-4xl text-[#f5e6c8]">
                  {item.name}
                </h2>

                <p className="text-[#d6b98c] mt-2">
                  ${item.price}
                </p>

              </div>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="text-3xl"
              >
                ×
              </button>

            </div>

            {renderOptions()}

            <div className="mt-10">

              <p className="mb-3 text-[#d6b98c]">
                Notes
              </p>

              <textarea
                value={notes}
                onChange={(e) =>
                  setNotes(
                    e.target.value
                  )
                }
                placeholder="Special instructions..."
                className="w-full h-28 bg-black/30 border border-white/10 rounded-2xl p-4 outline-none resize-none"
              />

            </div>

            <button
              onClick={
                handleAddToCart
              }
              className="w-full mt-10 bg-[#d6b98c] text-black py-4 rounded-2xl text-xl font-semibold"
            >
              Add To Order
            </button>

          </div>

        </div>

      )}

    </>

  );

}