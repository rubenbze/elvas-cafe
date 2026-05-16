"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import dynamic from "next/dynamic";

import { motion } from "framer-motion";

import "@fontsource/playfair-display";
import "@fontsource/inter";

const LocationMap = dynamic(
  () => import("@/components/LocationMap"),
  {
    ssr: false,
  }
);

export default function LocationPage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      <PageBackground />

      <Navbar />

      {/* HERO */}

      <section className="relative z-10 pt-44 pb-24 px-6 text-center">

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="uppercase tracking-[0.45em] text-[#d6b98c] text-sm mb-8"
        >
          Visit Us
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 55 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-6xl md:text-8xl leading-tight"
          style={{
            fontFamily: "Playfair Display",
          }}
        >
          Experience
          <br />
          Elva&apos;s Cafe
        </motion.h1>

      </section>

      {/* LOCATION SECTION */}

      <section className="relative z-10 px-6 pb-32">

        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-black/30 border border-white/10 rounded-[40px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
          >

            {/* TEXT */}

            <div className="p-10 md:p-16 text-center">

              <h2
                className="text-5xl text-[#f5e6c8]"
                style={{
                  fontFamily: "Playfair Display",
                }}
              >
                Coastal Highway
              </h2>

              <p className="uppercase tracking-[0.3em] text-[#d6b98c] text-sm mt-5">
                La Democracia Village, Belize
              </p>

              <p className="max-w-3xl mx-auto mt-10 text-gray-300 leading-9 text-lg">
                Discover a luxury café experience inspired by
                Parisian elegance and Belizean warmth. From artisan
                coffee to handcrafted brunch selections, Elva&apos;s Cafe
                was designed to create unforgettable moments for both
                locals and travelers alike.
              </p>

            </div>

            {/* MAP */}

            <div className="h-[600px] border-t border-white/10">

              <LocationMap />

            </div>

          </motion.div>

        </div>

      </section>

      <Footer />

    </main>
  );
}