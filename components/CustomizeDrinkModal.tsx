"use client";

import { useState } from "react";

import { useCartStore } from "@/store/cartStore";

interface Props {
  item: {
    id: number;
    name: string;
    price: number;
  };

  type: string;
}

export default function CustomizeDrinkModal({
  item,
  type,
}: Props) {

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const [open, setOpen] = useState(false);

  const [size, setSize] = useState("16oz");
  const [temperature, setTemperature] = useState("Iced");
  const [milk, setMilk] = useState("Whole Milk");

  const [extras, setExtras] = useState<string[]>([]);

  const syrupOptions = [
    "Vanilla",
    "Caramel",
    "Hazelnut",
    "Brown Sugar",
  ];

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
      ...item,

      quantity: 1,

      customizations: {
        size,
        temperature,
        milk,
        extras,
      },
    });

    setOpen(false);
  }

  return (
    <>
      {/* PLUS BUTTON ONLY */}

      <button
        onClick={() => setOpen(true)}
        className="w-14 h-14 rounded-full border border-[#d6b98c] text-[#d6b98c] flex items-center justify-center text-3xl hover:bg-[#d6b98c] hover:text-black transition duration-300"
      >
        +
      </button>

      {/* MODAL */}

      {open && (

        <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">

          <div className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-[40px] p-8 max-h-[90vh] overflow-y-auto">

            <h2 className="text-4xl mb-2 text-[#f5e6c8]">
              {item.name}
            </h2>

            <p className="text-[#d6b98c] text-xl mb-10">
              ${item.price.toFixed(2)}
            </p>

            {/* DRINK OPTIONS */}

            {type === "drink" && (

              <div className="space-y-10">

                {/* SIZE */}

                <div>

                  <h3 className="text-xl mb-4">
                    Select Size
                  </h3>

                  <div className="flex gap-4 flex-wrap">

                    {["8oz", "16oz", "24oz"].map((option) => (

                      <button
                        key={option}
                        onClick={() => setSize(option)}
                        className={`px-6 py-3 rounded-full border transition ${
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

                {/* TEMP */}

                <div>

                  <h3 className="text-xl mb-4">
                    Temperature
                  </h3>

                  <div className="flex gap-4">

                    {["Hot", "Iced"].map((option) => (

                      <button
                        key={option}
                        onClick={() => setTemperature(option)}
                        className={`px-6 py-3 rounded-full border transition ${
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

                {/* MILK */}

                <div>

                  <h3 className="text-xl mb-4">
                    Milk Option
                  </h3>

                  <div className="flex gap-4 flex-wrap">

                    {[
                      "Whole Milk",
                      "Oat Milk",
                      "Almond Milk",
                    ].map((option) => (

                      <button
                        key={option}
                        onClick={() => setMilk(option)}
                        className={`px-6 py-3 rounded-full border transition ${
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

                {/* SYRUPS */}

                <div>

                  <h3 className="text-xl mb-4">
                    Syrups
                  </h3>

                  <div className="flex gap-4 flex-wrap">

                    {syrupOptions.map((option) => (

                      <button
                        key={option}
                        onClick={() =>
                          toggleExtra(option)
                        }
                        className={`px-6 py-3 rounded-full border transition ${
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

              </div>

            )}

            {/* FOOD OPTIONS */}

            {type === "food" && (

              <div className="space-y-8">

                <h3 className="text-xl">
                  Preparation
                </h3>

                <div className="flex gap-4">

                  {[
                    "Regular",
                    "Warm It",
                  ].map((option) => (

                    <button
                      key={option}
                      onClick={() =>
                        setTemperature(option)
                      }
                      className={`px-6 py-3 rounded-full border transition ${
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

            {/* ACTIONS */}

            <div className="flex gap-4 mt-12">

              <button
                onClick={() => setOpen(false)}
                className="flex-1 border border-white/10 py-4 rounded-full"
              >
                Cancel
              </button>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#d6b98c] text-black py-4 rounded-full font-semibold"
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