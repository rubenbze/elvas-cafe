"use client";

import * as Dialog from "@radix-ui/react-dialog";

import { useState } from "react";

import { useCartStore } from "@/store/cartStore";

type Props = {
  item: {
    id: number;
    name: string;
    price: number;
  };
};

export default function CustomizeDrinkModal({
  item,
}: Props) {

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const [open, setOpen] = useState(false);

  const [temperature, setTemperature] =
    useState("Iced");

  const [milk, setMilk] =
    useState("Whole Milk");

  const [notes, setNotes] =
    useState("");

  const [extras, setExtras] = useState<string[]>([]);

  const syrupOptions = [
    "Vanilla",
    "Caramel",
    "Hazelnut",
    "Brown Sugar",
  ];

  const extraOptions = [
    "Extra Espresso Shot",
    "Whipped Cream",
    "Cold Foam",
  ];

  const toggleExtra = (value: string) => {

    if (extras.includes(value)) {

      setExtras(
        extras.filter((e) => e !== value)
      );

    } else {

      setExtras([...extras, value]);

    }

  };

  const totalPrice =
    item.price + extras.length * 1.5;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
    >

      <Dialog.Trigger asChild>

        <button
          className="bg-[#d6b98c] text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
        >
          Customize
        </button>

      </Dialog.Trigger>

      <Dialog.Portal>

        <Dialog.Overlay className="fixed inset-0 bg-black/70 z-50" />

        <Dialog.Content className="fixed top-1/2 left-1/2 w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-[40px] bg-[#111] border border-white/10 p-10 z-50 overflow-y-auto max-h-[90vh]">

          <Dialog.Title className="text-4xl mb-8 text-[#f5e6c8]">
            {item.name}
          </Dialog.Title>

          {/* TEMPERATURE */}

          <div className="mb-8">

            <h3 className="mb-4 text-xl">
              Temperature
            </h3>

            <div className="flex gap-4">

              {["Hot", "Iced"].map((temp) => (

                <button
                  key={temp}
                  onClick={() =>
                    setTemperature(temp)
                  }
                  className={`px-6 py-3 rounded-full border ${
                    temperature === temp
                      ? "bg-[#d6b98c] text-black"
                      : "border-white/20"
                  }`}
                >
                  {temp}
                </button>

              ))}

            </div>

          </div>

          {/* MILK */}

          <div className="mb-8">

            <h3 className="mb-4 text-xl">
              Milk
            </h3>

            <select
              value={milk}
              onChange={(e) =>
                setMilk(e.target.value)
              }
              className="w-full bg-black border border-white/10 rounded-2xl p-4"
            >
              <option>Whole Milk</option>
              <option>Oat Milk</option>
              <option>Almond Milk</option>
              <option>Soy Milk</option>
            </select>

          </div>

          {/* SYRUPS */}

          <div className="mb-8">

            <h3 className="mb-4 text-xl">
              Syrups
            </h3>

            <div className="flex flex-wrap gap-4">

              {syrupOptions.map((syrup) => (

                <button
                  key={syrup}
                  onClick={() =>
                    toggleExtra(syrup)
                  }
                  className={`px-5 py-3 rounded-full border ${
                    extras.includes(syrup)
                      ? "bg-[#d6b98c] text-black"
                      : "border-white/20"
                  }`}
                >
                  {syrup}
                </button>

              ))}

            </div>

          </div>

          {/* EXTRAS */}

          <div className="mb-8">

            <h3 className="mb-4 text-xl">
              Extras
            </h3>

            <div className="flex flex-wrap gap-4">

              {extraOptions.map((extra) => (

                <button
                  key={extra}
                  onClick={() =>
                    toggleExtra(extra)
                  }
                  className={`px-5 py-3 rounded-full border ${
                    extras.includes(extra)
                      ? "bg-[#d6b98c] text-black"
                      : "border-white/20"
                  }`}
                >
                  {extra}
                </button>

              ))}

            </div>

          </div>

          {/* NOTES */}

          <div className="mb-10">

            <h3 className="mb-4 text-xl">
              Notes
            </h3>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder="Any custom requests?"
              className="w-full bg-black border border-white/10 rounded-2xl p-4 h-32"
            />

          </div>

          {/* FOOTER */}

          <div className="flex items-center justify-between">

            <p className="text-3xl text-[#d6b98c]">
              ${totalPrice.toFixed(2)}
            </p>

            <button
              onClick={() => {

                addToCart({
                  ...item,
                  quantity: 1,
                  customizations: {
                    temperature,
                    milk,
                    extras,
                    notes,
                  },
                });

                setOpen(false);

              }}
              className="bg-[#d6b98c] text-black px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition"
            >
              Add To Cart
            </button>

          </div>

        </Dialog.Content>

      </Dialog.Portal>

    </Dialog.Root>
  );
}