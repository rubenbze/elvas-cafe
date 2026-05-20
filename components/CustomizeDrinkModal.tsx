"use client";

import { useEffect, useState } from "react";

import { createPortal } from "react-dom";

import { X, Plus } from "lucide-react";

import { useCartStore } from "@/store/cartStore";

interface Props {
  item: any;
  category: string;
}

export default function CustomizeDrinkModal({
  item,
  category,
}: Props) {

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const [mounted, setMounted] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  const [size, setSize] =
    useState("16oz");

  const [temperature, setTemperature] =
    useState("Iced");

  const [milk, setMilk] =
    useState("");

  const [extras, setExtras] =
    useState<string[]>([]);

  const [notes, setNotes] =
    useState("");

  useEffect(() => {

    setMounted(true);

  }, []);

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

  const options: any = {

    Coffee: {
      sizes: true,
      temperature: true,

      milk: [
        "Whole Milk",
        "Oat Milk",
        "Almond Milk",
        "Soy Milk",
      ],

      extras: [
        "Extra Espresso Shot",
        "Vanilla Syrup",
        "Caramel Syrup",
        "Hazelnut Syrup",
        "Whipped Cream",
        "Caramel Drizzle",
      ],
    },

    Matcha: {
      sizes: true,
      temperature: true,

      milk: [
        "Whole Milk",
        "Oat Milk",
        "Almond Milk",
      ],

      extras: [
        "Cold Foam",
        "Vanilla Syrup",
        "Brown Sugar Syrup",
      ],
    },

    Refreshers: {
      sizes: true,

      extras: [
        "Lemonade",
        "Coconut Milk",
        "Extra Fruit",
        "Light Ice",
        "No Ice",
      ],
    },

    Pastries: {
      extras: [
        "Warm It Up",
      ],
    },

    Desserts: {
      extras: [
        "Add Ice Cream",
        "Extra Chocolate Drizzle",
        "Extra Caramel Drizzle",
      ],
    },

    Entrees: {
      extras: [
        "Extra Cheese",
        "Add Chicken",
        "Add Bacon",
        "Warm It Up",
        "Remove Tomatoes",
        "Remove Onion",
      ],
    },

  };

  const current =
    options[category] || {};

  const buttonBase =
    "px-4 py-3 rounded-2xl border transition duration-200";

  const activeButton =
    "bg-[#d6b98c] text-black border-[#d6b98c]";

  const inactiveButton =
    "bg-black/30 border-white/10 text-white hover:border-[#d6b98c]";

  function buttonStyle(active: boolean) {

    return `${buttonBase} ${
      active
        ? activeButton
        : inactiveButton
    }`;

  }

  return (

    <>

      <button
        onClick={() => setOpen(true)}
        className="w-16 h-16 rounded-full bg-[#d6b98c] text-black flex items-center justify-center hover:scale-105 transition"
      >

        <Plus size={28} />

      </button>

      {mounted &&
        open &&
        createPortal(

          <div className="fixed inset-0 z-[999999] bg-black/80 backdrop-blur-md overflow-y-auto">

            <div className="min-h-screen flex items-center justify-center p-4 md:p-8">

              <div className="relative w-full max-w-3xl bg-[#111] border border-white/10 rounded-[36px] p-6 md:p-10 shadow-2xl">

                {/* CLOSE */}

                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >

                  <X size={26} />

                </button>

                {/* TITLE */}

                <h2 className="text-4xl md:text-5xl text-[#f5e6c8] mb-4 pr-16">

                  {item.name}

                </h2>

                <p className="text-[#d6b98c] text-2xl mb-10">

                  ${item.price}

                </p>

                {/* SIZE */}

                {current.sizes && (

                  <div className="mb-10">

                    <h3 className="text-2xl mb-5">
                      Size
                    </h3>

                    <div className="flex flex-wrap gap-4">

                      {["8oz", "12oz", "16oz"].map(
                        (option: string) => (

                          <button
                            key={option}
                            onClick={() =>
                              setSize(option)
                            }
                            className={buttonStyle(
                              size === option
                            )}
                          >

                            {option}

                          </button>

                        )
                      )}

                    </div>

                  </div>

                )}

                {/* TEMP */}

                {current.temperature && (

                  <div className="mb-10">

                    <h3 className="text-2xl mb-5">
                      Temperature
                    </h3>

                    <div className="flex flex-wrap gap-4">

                      {["Hot", "Iced"].map(
                        (option: string) => (

                          <button
                            key={option}
                            onClick={() =>
                              setTemperature(option)
                            }
                            className={buttonStyle(
                              temperature === option
                            )}
                          >

                            {option}

                          </button>

                        )
                      )}

                    </div>

                  </div>

                )}

                {/* MILK */}

                {current.milk && (

                  <div className="mb-10">

                    <h3 className="text-2xl mb-5">
                      Milk
                    </h3>

                    <div className="flex flex-wrap gap-4">

                      {current.milk.map(
                        (option: string) => (

                          <button
                            key={option}
                            onClick={() =>
                              setMilk(option)
                            }
                            className={buttonStyle(
                              milk === option
                            )}
                          >

                            {option}

                          </button>

                        )
                      )}

                    </div>

                  </div>

                )}

                {/* EXTRAS */}

                {current.extras && (

                  <div className="mb-10">

                    <h3 className="text-2xl mb-5">
                      Add Ons
                    </h3>

                    <div className="flex flex-wrap gap-4">

                      {current.extras.map(
                        (extra: string) => (

                          <button
                            key={extra}
                            onClick={() =>
                              toggleExtra(extra)
                            }
                            className={buttonStyle(
                              extras.includes(extra)
                            )}
                          >

                            {extra}

                          </button>

                        )
                      )}

                    </div>

                  </div>

                )}

                {/* NOTES */}

                <div className="mb-12">

                  <h3 className="text-2xl mb-5">
                    Notes
                  </h3>

                  <textarea
                    value={notes}
                    onChange={(e) =>
                      setNotes(
                        e.target.value
                      )
                    }
                    placeholder="Special instructions..."
                    className="w-full h-36 rounded-2xl bg-black/30 border border-white/10 p-5 outline-none"
                  />

                </div>

                {/* BUTTON */}

                <button
                  onClick={handleAddToCart}
                  className="w-full py-5 rounded-2xl bg-[#d6b98c] text-black text-xl font-semibold hover:scale-[1.01] transition"
                >

                  Add To Cart

                </button>

              </div>

            </div>

          </div>,

          document.body

        )}

    </>

  );

}