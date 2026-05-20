"use client";

import { useEffect, useState } from "react";

import { X } from "lucide-react";

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

useEffect(() => {

```
if (open) {

  document.body.style.overflow =
    "hidden";

} else {

  document.body.style.overflow =
    "auto";

}

return () => {

  document.body.style.overflow =
    "auto";

};
```

}, [open]);

function toggleExtra(extra: string) {

```
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
```

}

function handleAddToCart() {

```
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
```

}

const coffeeExtras = [
"Extra Espresso Shot",
"Caramel Syrup",
"Vanilla Syrup",
"Hazelnut Syrup",
"Whipped Cream",
"Caramel Drizzle",
];

const refresherExtras = [
"Lemonade",
"Coconut Milk",
"Extra Fruit",
"Light Ice",
"No Ice",
];

const entreeExtras = [
"Extra Cheese",
"Add Chicken",
"Add Bacon",
"Warm It Up",
];

const dessertExtras = [
"Add Ice Cream",
"Extra Drizzle",
];

function renderOptions() {

```
if (
  category === "Coffee" ||
  category === "Matcha"
) {

  return (
    <>

      {/* SIZE */}

      <div className="space-y-4">

        <h3 className="text-lg text-[#d6b98c]">
          Size
        </h3>

        <div className="flex flex-wrap gap-3">

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
                    : "border-white/10 bg-black/30"
                }`}
              >
                {option}
              </button>

            )
          )}

        </div>

      </div>

      {/* TEMPERATURE */}

      <div className="space-y-4">

        <h3 className="text-lg text-[#d6b98c]">
          Temperature
        </h3>

        <div className="flex gap-3">

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
                    : "border-white/10 bg-black/30"
                }`}
              >
                {option}
              </button>

            )
          )}

        </div>

      </div>

      {/* MILK */}

      <div className="space-y-4">

        <h3 className="text-lg text-[#d6b98c]">
          Milk
        </h3>

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
              className={`px-5 py-3 rounded-2xl border transition ${
                milk === option
                  ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                  : "border-white/10 bg-black/30"
              }`}
            >
              {option}
            </button>

          ))}

        </div>

      </div>

      {/* EXTRAS */}

      <div className="space-y-4">

        <h3 className="text-lg text-[#d6b98c]">
          Extras
        </h3>

        <div className="flex flex-wrap gap-3">

          {coffeeExtras.map(
            (extra) => (

              <button
                key={extra}
                onClick={() =>
                  toggleExtra(extra)
                }
                className={`px-5 py-3 rounded-2xl border transition ${
                  extras.includes(extra)
                    ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                    : "border-white/10 bg-black/30"
                }`}
              >
                {extra}
              </button>

            )
          )}

        </div>

      </div>

    </>
  );

}

if (category === "Refreshers") {

  return (
    <div className="space-y-4">

      <h3 className="text-lg text-[#d6b98c]">
        Customize
      </h3>

      <div className="flex flex-wrap gap-3">

        {refresherExtras.map(
          (extra) => (

            <button
              key={extra}
              onClick={() =>
                toggleExtra(extra)
              }
              className={`px-5 py-3 rounded-2xl border transition ${
                extras.includes(extra)
                  ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                  : "border-white/10 bg-black/30"
              }`}
            >
              {extra}
            </button>

          )
        )}

      </div>

    </div>
  );

}

if (category === "Pastries") {

  return (
    <div className="space-y-4">

      <h3 className="text-lg text-[#d6b98c]">
        Pastry Options
      </h3>

      <button
        onClick={() =>
          toggleExtra("Warm It Up")
        }
        className={`px-5 py-3 rounded-2xl border transition ${
          extras.includes(
            "Warm It Up"
          )
            ? "bg-[#d6b98c] text-black border-[#d6b98c]"
            : "border-white/10 bg-black/30"
        }`}
      >
        Warm It Up
      </button>

    </div>
  );

}

if (category === "Desserts") {

  return (
    <div className="space-y-4">

      <h3 className="text-lg text-[#d6b98c]">
        Dessert Extras
      </h3>

      <div className="flex flex-wrap gap-3">

        {dessertExtras.map(
          (extra) => (

            <button
              key={extra}
              onClick={() =>
                toggleExtra(extra)
              }
              className={`px-5 py-3 rounded-2xl border transition ${
                extras.includes(extra)
                  ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                  : "border-white/10 bg-black/30"
              }`}
            >
              {extra}
            </button>

          )
        )}

      </div>

    </div>
  );

}

if (category === "Entrees") {

  return (
    <div className="space-y-4">

      <h3 className="text-lg text-[#d6b98c]">
        Entree Options
      </h3>

      <div className="flex flex-wrap gap-3">

        {entreeExtras.map(
          (extra) => (

            <button
              key={extra}
              onClick={() =>
                toggleExtra(extra)
              }
              className={`px-5 py-3 rounded-2xl border transition ${
                extras.includes(extra)
                  ? "bg-[#d6b98c] text-black border-[#d6b98c]"
                  : "border-white/10 bg-black/30"
              }`}
            >
              {extra}
            </button>

          )
        )}

      </div>

    </div>
  );

}

return null;
```

}

return (

```
<>

  {/* ADD BUTTON */}

  <button
    onClick={() => setOpen(true)}
    className="w-14 h-14 rounded-full bg-[#d6b98c] text-black text-3xl hover:scale-105 transition"
  >
    +
  </button>

  {/* MODAL */}

  {open && (

    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-[#111] border border-white/10 shadow-2xl">

        {/* CLOSE */}

        <button
          onClick={() =>
            setOpen(false)
          }
          className="absolute top-6 right-6 z-50 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
        >
          <X size={30} />
        </button>

        {/* CONTENT */}

        <div className="p-8 md:p-12 space-y-10">

          <div>

            <h2 className="text-5xl font-semibold">
              {item.name}
            </h2>

            <p className="text-[#d6b98c] text-3xl mt-3">
              ${item.price}
            </p>

          </div>

          {renderOptions()}

          {/* NOTES */}

          <div className="space-y-4">

            <h3 className="text-lg text-[#d6b98c]">
              Notes
            </h3>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              placeholder="Special requests..."
              className="w-full h-32 rounded-2xl bg-black/30 border border-white/10 p-5 outline-none resize-none"
            />

          </div>

          {/* BUTTON */}

          <button
            onClick={
              handleAddToCart
            }
            className="w-full py-5 rounded-2xl bg-[#d6b98c] text-black text-xl font-semibold hover:opacity-90 transition"
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>

  )}

</>
```

);

}
