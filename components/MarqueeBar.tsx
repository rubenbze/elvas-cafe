"use client";

import Marquee from "react-fast-marquee";

export default function MarqueeBar() {
  return (
    <div className="relative z-20 border-y border-white/10 bg-black/40 backdrop-blur-xl py-5 overflow-hidden">

      <Marquee speed={45} gradient={false}>

        <div className="flex items-center gap-14 text-[#d6b98c] uppercase tracking-[0.4em] text-sm px-10">

          <span>Artisan Coffee</span>

          <span>Luxury Brunch</span>

          <span>Fresh Pastries</span>

          <span>Parisian Atmosphere</span>

          <span>Signature Matcha</span>

          <span>Coastal Highway Belize</span>

          <span>Handcrafted Desserts</span>

          <span>Premium Hospitality</span>

        </div>

      </Marquee>

    </div>
  );
}