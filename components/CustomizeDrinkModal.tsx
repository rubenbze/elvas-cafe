"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

interface Props {
  item: {
    id: number;
    name: string;
    price: number;
  };
  category: string;
}

export default function CustomizeDrinkModal({
  item,
  category,
}: Props) {
  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const [open, setOpen] = useState(false);

  const [size, setSize] = useState("16oz");
  const [temperature, setTemperature] =
    useState("Iced");
  const [milk, setMilk] =
    useState("Whole Milk");

  const [extras, setExtras] = useState<
    string[]
  >([]);

  const [notes, setNotes] = useState("");

  function toggleExtra(extra: string) {
    if (extras.includes(extra)) {
      setExtras(
        extras.filter((e) => e !== extra)
      );
    } else {
      setExtras([...extras, extra]);
    }
  }

  function handleAddToCart() {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
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
        onClick={() => setOpen(true)}
        className="w-14 h-14 rounded-full bg-[#d6b98c] text-black text-3xl hover:scale-105 transition"
      >
        +
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm overflow-y-auto">

          <div className="min-h-screen flex items-start justify-center px-4 py-24">

            <div className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-3xl p-8">

              {/* CLOSE BUTTON */}

              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-3xl flex items-center justify-center transition z-50"
              >
                ×
              </button>

              <h2 className="text-4xl text-[#f5e6c8] mb-2">
                {item.name}
              </h2>

              <p className="text-[#d6b98c] text-2xl mb-8">
                ${item.price}
              </p>

              {/* SIZE */}

              {[
                "Coffee",
                "Matcha",
                "Refreshers",
              ].includes(category) && (
                <div className="mb-8">
                  <h3 className="text-xl mb-4">
                    Size
                  </h3>

                  <div className="flex flex-wrap gap-4">
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
                        className={`px-6 py-3 rounded-2xl border transition ${
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

              {/* TEMPERATURE */}

              {[
                "Coffee",
                "Matcha",
              ].includes(category) && (
                <div className="mb-8">
                  <h3 className="text-xl mb-4">
                    Temperature
                  </h3>

                  <div className="flex gap-4">
                    {["Hot", "Iced"].map(
                      (option) => (
                        <button
                          key={option}
                          onClick={() =>
                            setTemperature(
                              option
                            )
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

              {/* MILK */}

              {[
                "Coffee",
                "Matcha",
              ].includes(category) && (
                <div className="mb-8">
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

              {/* EXTRAS */}

              <div className="mb-8">
                <h3 className="text-xl mb-4">
                  Extras
                </h3>

                <div className="flex flex-wrap gap-4">

                  {category === "Coffee" &&
                    [
                      "Extra Espresso Shot",
                      "Caramel Syrup",
                      "Vanilla Syrup",
                      "Whipped Cream",
                    ].map((extra) => (
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

                  {category === "Refreshers" &&
                    [
                      "Lemonade",
                      "Coconut Milk",
                      "Extra Fruit",
                      "Light Ice",
                      "No Ice",
                    ].map((extra) => (
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

              {/* NOTES */}

              <div className="mb-8">
                <h3 className="text-xl mb-4">
                  Notes
                </h3>

                <textarea
                  value={notes}
                  onChange={(e) =>
                    setNotes(e.target.value)
                  }
                  placeholder="Special instructions..."
                  className="w-full h-32 rounded-2xl bg-black border border-white/10 p-4 outline-none"
                />
              </div>

              {/* BUTTON */}

              <button
                onClick={handleAddToCart}
                className="w-full bg-[#d6b98c] text-black py-5 rounded-2xl text-xl font-semibold hover:scale-[1.01] transition"
              >
                Add To Cart
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}