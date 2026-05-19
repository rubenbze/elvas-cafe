"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface Item {
  id: number;
  name: string;
  price: number;
}

interface Props {
  item: Item;
  category: string;
}

export default function CustomizeDrinkModal({
  item,
  category,
}: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  const [open, setOpen] = useState(false);

  const [size, setSize] = useState("16oz");
  const [temperature, setTemperature] = useState("Iced");
  const [milk, setMilk] = useState("Whole Milk");

  const [extras, setExtras] = useState<string[]>([]);

  const [notes, setNotes] = useState("");

  const toggleExtra = (extra: string) => {
    if (extras.includes(extra)) {
      setExtras(extras.filter((e) => e !== extra));
    } else {
      setExtras([...extras, extra]);
    }
  };

  const addItem = () => {
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
  };

  const renderOptions = () => {
    if (category === "Coffee") {
      return (
        <>
          <Section title="Size">
            {["8oz", "12oz", "16oz"].map((option) => (
              <OptionButton
                key={option}
                active={size === option}
                onClick={() => setSize(option)}
              >
                {option}
              </OptionButton>
            ))}
          </Section>

          <Section title="Temperature">
            {["Hot", "Iced"].map((option) => (
              <OptionButton
                key={option}
                active={temperature === option}
                onClick={() => setTemperature(option)}
              >
                {option}
              </OptionButton>
            ))}
          </Section>

          <Section title="Milk">
            {[
              "Whole Milk",
              "Oat Milk",
              "Almond Milk",
              "Soy Milk",
            ].map((option) => (
              <OptionButton
                key={option}
                active={milk === option}
                onClick={() => setMilk(option)}
              >
                {option}
              </OptionButton>
            ))}
          </Section>

          <Section title="Extras">
            {[
              "Extra Espresso Shot",
              "Caramel Syrup",
              "Vanilla Syrup",
              "Hazelnut Syrup",
              "Whipped Cream",
              "Caramel Drizzle",
            ].map((option) => (
              <OptionButton
                key={option}
                active={extras.includes(option)}
                onClick={() => toggleExtra(option)}
              >
                {option}
              </OptionButton>
            ))}
          </Section>
        </>
      );
    }

    if (category === "Matcha") {
      return (
        <>
          <Section title="Size">
            {["8oz", "12oz", "16oz"].map((option) => (
              <OptionButton
                key={option}
                active={size === option}
                onClick={() => setSize(option)}
              >
                {option}
              </OptionButton>
            ))}
          </Section>

          <Section title="Milk">
            {[
              "Whole Milk",
              "Oat Milk",
              "Almond Milk",
              "Coconut Milk",
            ].map((option) => (
              <OptionButton
                key={option}
                active={milk === option}
                onClick={() => setMilk(option)}
              >
                {option}
              </OptionButton>
            ))}
          </Section>

          <Section title="Extras">
            {[
              "Vanilla Cold Foam",
              "Strawberry Cold Foam",
              "Brown Sugar Syrup",
              "Vanilla Syrup",
            ].map((option) => (
              <OptionButton
                key={option}
                active={extras.includes(option)}
                onClick={() => toggleExtra(option)}
              >
                {option}
              </OptionButton>
            ))}
          </Section>
        </>
      );
    }

    if (category === "Refreshers") {
      return (
        <>
          <Section title="Size">
            {["12oz", "16oz"].map((option) => (
              <OptionButton
                key={option}
                active={size === option}
                onClick={() => setSize(option)}
              >
                {option}
              </OptionButton>
            ))}
          </Section>

          <Section title="Customize">
            {[
              "With Lemonade",
              "With Coconut Milk",
              "Extra Fruit Inclusions",
              "Light Ice",
              "No Ice",
            ].map((option) => (
              <OptionButton
                key={option}
                active={extras.includes(option)}
                onClick={() => toggleExtra(option)}
              >
                {option}
              </OptionButton>
            ))}
          </Section>
        </>
      );
    }

    if (category === "Pastries") {
      return (
        <Section title="Customize">
          <OptionButton
            active={extras.includes("Warm It Up")}
            onClick={() => toggleExtra("Warm It Up")}
          >
            Warm It Up
          </OptionButton>
        </Section>
      );
    }

    if (category === "Desserts") {
      return (
        <Section title="Extras">
          {["Add Ice Cream", "Extra Chocolate Drizzle"].map(
            (option) => (
              <OptionButton
                key={option}
                active={extras.includes(option)}
                onClick={() => toggleExtra(option)}
              >
                {option}
              </OptionButton>
            )
          )}
        </Section>
      );
    }

    if (category === "Entrees") {
      return (
        <Section title="Customize">
          {[
            "Remove Cheese",
            "Extra Cheese",
            "Add Chicken",
            "Warm It Up",
          ].map((option) => (
            <OptionButton
              key={option}
              active={extras.includes(option)}
              onClick={() => toggleExtra(option)}
            >
              {option}
            </OptionButton>
          ))}
        </Section>
      );
    }

    return null;
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-14 h-14 rounded-full bg-[#d6b98c] text-black flex items-center justify-center hover:scale-105 transition"
      >
        <Plus size={24} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111] border border-white/10 rounded-3xl p-8">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            >
              <X />
            </button>

            <h2 className="text-4xl mb-2 text-[#f5e6c8]">
              {item.name}
            </h2>

            <p className="text-[#d6b98c] text-xl mb-8">
              ${item.price}
            </p>

            <div className="space-y-8">
              {renderOptions()}

              <div>
                <h3 className="mb-3 text-[#d6b98c] text-lg">
                  Special Request
                </h3>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Extra notes..."
                  className="w-full h-28 rounded-2xl bg-black/40 border border-white/10 p-4 outline-none"
                />
              </div>

              <button
                onClick={addItem}
                className="w-full py-4 rounded-2xl bg-[#d6b98c] text-black text-lg font-semibold hover:scale-[1.01] transition"
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-4 text-[#d6b98c] text-xl">
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">
        {children}
      </div>
    </div>
  );
}

function OptionButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-2xl border transition ${
        active
          ? "bg-[#d6b98c] text-black border-[#d6b98c]"
          : "border-white/10 hover:border-[#d6b98c]"
      }`}
    >
      {children}
    </button>
  );
}