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
          onClick={() =>
            setOpen(false)
          }
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >

            {/* HEADER */}

            <div className="flex justify-between items-center mb-8">

              <div>

                <h2 className="text-4xl text-[#f5e6c8]">
                  {item.name}
                </h2>

                <p className="text-[#d6b98c] mt-2 text-xl">
                  ${item.price}
                </p>

              </div>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition text-2xl flex items-center justify-center"
              >
                ×
              </button>

            </div>

            {/* ALL YOUR EXISTING CATEGORY LOGIC STAYS EXACTLY THE SAME */}

            {/* KEEP EVERYTHING YOU ALREADY HAVE HERE */}

            {/* NOTES */}

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

            {/* BUTTON */}

            <button
              onClick={
                handleAddToCart
              }
              className="w-full mt-10 bg-[#d6b98c] text-black py-4 rounded-2xl text-xl font-semibold hover:scale-[1.02] transition"
            >
              Add To Order
            </button>

          </div>

        </div>

      )}

    </>

  );

}