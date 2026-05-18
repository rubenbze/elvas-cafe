"use client";

import { motion } from "framer-motion";

import { useCartStore } from "@/store/cartStore";

interface Props {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export default function OrderCard({
  item,
}: Props) {

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      className="bg-black/40 border border-white/10 rounded-[35px] overflow-hidden backdrop-blur-xl"
    >

      <img
        src={item.image}
        alt={item.name}
        className="w-full h-[280px] object-cover"
      />

      <div className="p-8">

        <div className="flex items-center justify-between mb-4">

          <h3 className="text-2xl font-semibold">
            {item.name}
          </h3>

          <span className="text-[#d6b98c]">
            ${item.price}
          </span>

        </div>

        <button
          onClick={() =>
            addToCart({
              ...item,
              quantity: 1,
            })
          }
          className="w-full bg-[#d6b98c] text-black py-4 rounded-full font-semibold hover:scale-105 transition"
        >
          Add To Cart
        </button>

      </div>

    </motion.div>
  );
}