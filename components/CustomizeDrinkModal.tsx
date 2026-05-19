"use client";

import { useState } from "react";
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

export default function CustomizeDrinkModal({ item, category }: Props) {
const [open, setOpen] = useState(false);

const [size, setSize] = useState("16oz");
const [temperature, setTemperature] = useState("Iced");
const [milk, setMilk] = useState("Whole Milk");
const [extras, setExtras] = useState<string[]>([]);
const [notes, setNotes] = useState("");

const addToCart = useCartStore((state) => state.addToCart);

function toggleExtra(extra: string) {
if (extras.includes(extra)) {
setExtras(extras.filter((e) => e !== extra));
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

const coffeeExtras = [
"Extra Espresso Shot",
"Caramel Syrup",
"Vanilla Syrup",
"Hazelnut Syrup",
"Whipped Cream",
"Caramel Drizzle",
];

const matchaExtras = [
"Vanilla Syrup",
"Brown Sugar Syrup",
"Cold Foam",
"Strawberry Cold Foam",
];

const refresherExtras = [
"Lemonade",
"Coconut Milk",
"Extra Fruit",
"Light Ice",
"No Ice",
];

const pastryExtras = ["Warm It Up"];

const dessertExtras = ["Add Ice Cream", "Extra Chocolate Drizzle"];

const entreeExtras = [
"Extra Cheese",
"Add Chicken",
"Add Bacon",
"Warm It Up",
"No Tomatoes",
"No Onions",
];

function renderExtras() {
if (category === "Coffee") return coffeeExtras;
if (category === "Matcha") return matchaExtras;
if (category === "Refreshers") return refresherExtras;
if (category === "Pastries") return pastryExtras;
if (category === "Desserts") return dessertExtras;
if (category === "Entrees") return entreeExtras;

return [];
}
${item.price}
</p>
</div>

{category !== "Pastries" &&
category !== "Desserts" &&
category !== "Entrees" && (
<div className="mb-10">
<h3 className="text-xl mb-5 text-[#d6b98c]">Size</h3>

<div className="flex flex-wrap gap-4">
{["8oz", "12oz", "16oz"].map((option) => (
<button
key={option}
onClick={() => setSize(option)}
className={`px-6 py-4 rounded-2xl border transition ${
size === option
? "bg-[#d6b98c] text-black border-[#d6b98c]"
: "border-white/10 bg-black/20 text-white"
}`}
>
{option}
</button>
))}
</div>
</div>
)}

{(category === "Coffee" ||
category === "Matcha") && (
<div className="mb-10">
<h3 className="text-xl mb-5 text-[#d6b98c]">Temperature</h3>

<div className="flex gap-4">
{["Hot", "Iced"].map((option) => (
<button
key={option}
onClick={() => setTemperature(option)}
className={`px-6 py-4 rounded-2xl border transition ${
temperature === option
? "bg-[#d6b98c] text-black border-[#d6b98c]"
: "border-white/10 bg-black/20 text-white"
}`}
>
{option}
</button>
))}
</div>
</div>
)}
{(category === "Coffee" ||
category === "Matcha") && (
<div className="mb-10">
<h3 className="text-xl mb-5 text-[#d6b98c]">Milk</h3>

<div className="flex flex-wrap gap-4">
{[
"Whole Milk",
"Oat Milk",
"Almond Milk",
"Soy Milk",
].map((option) => (
<button
key={option}
onClick={() => setMilk(option)}
className={`px-6 py-4 rounded-2xl border transition ${
milk === option
? "bg-[#d6b98c] text-black border-[#d6b98c]"
: "border-white/10 bg-black/20 text-white"
}`}
>
{option}
</button>
))}
</div>
</div>
)}

{currentExtras.length > 0 && (
<div className="mb-10">
<h3 className="text-xl mb-5 text-[#d6b98c]">Add Ons</h3>

<div className="flex flex-wrap gap-4">
{currentExtras.map((extra) => (
<button
key={extra}
onClick={() => toggleExtra(extra)}
className={`px-5 py-4 rounded-2xl border transition ${
extras.includes(extra)
? "bg-[#d6b98c] text-black border-[#d6b98c]"
: "border-white/10 bg-black/20 text-white"
}`}
>
{extra}
</button>
))}
</div>
</div>
)}

<div className="mb-10">
<h3 className="text-xl mb-5 text-[#d6b98c]">
Special Request
</h3>

<textarea
value={notes}
onChange={(e) => setNotes(e.target.value)}
placeholder="Add any notes..."
className="w-full bg-black/30 border border-white/10 rounded-2xl p-5 text-white outline-none min-h-[120px]"
/>
</div>

<button
onClick={handleAddToCart}
className="w-full py-5 rounded-2xl bg-[#d6b98c] text-black text-xl font-semibold hover:opacity-90 transition"
>
Add To Cart
</button>
</div>
</div>
)}
</>
);
}
