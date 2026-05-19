"use client";

import { useState, useEffect } from "react";

import { X } from "lucide-react";

import { useCartStore } from "@/store/cartStore";

export default function CustomizeDrinkModal({
  item,
  category,
}: any) {

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const [open, setOpen] = useState(false);

  const [size, setSize] = useState("16oz");

  const [temperature, setTemperature] =
    useState("Iced");

  const [milk, setMilk] =
    useState("Whole Milk");

  const [extras, setExtras] =
    useState<string[]>([]);

  const [notes, setNotes] =
    useState("");

  useEffect(() => {

    if (open) {

      document.body.style.overflow = "hidden";

    } else {

      document.body.style.overflow = "auto";

    }

    return () => {

      document.body.style.overflow = "auto";

    };

  }, [open]);

  function toggleExtra(extra: string) {

    if (extras.includes(extra)) {

      setExtras(
        extras.filter((e) => e !== extra)
      );

    } else {

      setExtras([...extras, extra]);

    }

  }

  const coffeeExtras = [
    "Extra Espresso Shot",
    "Caramel Syrup",
    "Vanilla Syrup",
    "Hazelnut Syrup",
    "Whipped Cream",
    "Caramel Drizzle",
  ];

  const matchaExtras = [
    "Cold Foam",
    "Vanilla Syrup",
    "Brown Sugar",
  ];

  const refresherExtras = [
    "Lemonade",
    "Coconut Milk",
    "Extra Fruit",
    "Light Ice",
    "No Ice",
  ];

  const pastryExtras = [
    "Warm It Up",
  ];

  const entreeExtras = [
    "Extra Cheese",
    "Add Chicken",
    "Add Bacon",
    "Warm It Up",
    "No Tomatoes",
    "No Onions",
  ];

  const dessertExtras = [
    "Add Ice Cream",
    "Chocolate Drizzle",
    "Caramel Drizzle",
  ];

  function getExtras() {

    switch (category) {

      case "Coffee":
        return coffeeExtras;

      case "Matcha":
        return matchaExtras;

      case "Refreshers":
        return refresherExtras;

      case "Pastries":
        return pastryExtras;

      case "Entrees":
        return entreeExtras;

      case "Desserts":
        return dessertExtras;

      default:
        return [];

    }

  }

  return (

    <>

      <button
        onClick={() => setOpen(true)}
        className="w-14 h-14 rounded-full bg-[#d6b98c] text-black text-3xl hover:scale-105 transition"
      >
        +
      </button>

      {open && (

        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">

          <div className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-[32px] p-8 max-h-[90vh] overflow-y-auto">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >

              <X size={24} />

            </button>

            <h2 className="text-4xl text-[#f5e6c8] mb-2">

              {item.name}

            </h2>

            <p className="text-[#d6b98c] text-2xl mb-10">

              ${item.price}

            </p>

            {(category === "Coffee" ||
              category === "Matcha" ||
              category === "Refreshers") && (

              <div className="mb-10">

                <h3 className="text-xl mb-4">
                  Size
                </h3>

                <div className="flex flex-wrap gap-4">

                  {["8oz", "12oz", "16oz"].map(
                    (option) => (

                      <button
                        key={option}
                        onClick={() =>
                          setSize(option)
                        }
                        className={`px-6 py-3 rounded-2xl border transition ${
                          size === option
                            ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                            : "border-white/10"
                        }`}
                      >
                        {option}
                      </button>

                    )
                  )}

                </div>

              </div>

            )}

            {(category === "Coffee" ||
              category === "Matcha") && (

              <div className="mb-10">

                <h3 className="text-xl mb-4">
                  Temperature
                </h3>

                <div className="flex gap-4">

                  {["Hot", "Iced"].map(
                    (option) => (

                      <button
                        key={option}
                        onClick={() =>
                          setTemperature(option)
                        }
                        className={`px-6 py-3 rounded-2xl border transition ${
                          temperature === option
                            ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                            : "border-white/10"
                        }`}
                      >
                        {option}
                      </button>

                    )
                  )}

                </div>

              </div>

            )}

            {(category === "Coffee" ||
              category === "Matcha") && (

              <div className="mb-10">

                <h3 className="text-xl mb-4">
                  Milk
                </h3>

                <div className="flex flex-wrap gap-4">

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
                      className={`px-6 py-3 rounded-2xl border transition ${
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

            {getExtras().length > 0 && (

              <div className="mb-10">

                <h3 className="text-xl mb-4">
                  Add Ons
                </h3>

                <div className="flex flex-wrap gap-4">

                  {getExtras().map((extra) => (

                    <button
                      key={extra}
                      onClick={() =>
                        toggleExtra(extra)
                      }
                      className={`px-5 py-3 rounded-2xl border transition ${
                        extras.includes(extra)
                          ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                          : "border-white/10"
                      }`}
                    >
                      {extra}
                    </button>

                  ))}

                </div>

              </div>

            )}

            <div className="mb-10">

              <h3 className="text-xl mb-4">
                Special Request
              </h3>

              <textarea
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
                placeholder="Extra sweet, light ice, allergy note..."
                className="w-full bg-black/30 border border-white/10 rounded-2xl p-5 outline-none"
              />

            </div>

            <button
              onClick={() => {

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

              }}
              className="w-full bg-[#d6b98c] text-black py-5 rounded-2xl text-xl font-semibold hover:scale-[1.02] transition"
            >

              Add To Cart

            </button>

          </div>

        </div>

      )}

    </>

  );

}