"use client";
import Footer from "@/components/Footer";

import Navbar from "@/components/Navbar";
import MarqueeBar from "@/components/MarqueeBar";

import Link from "next/link";

import { motion } from "framer-motion";

import "@fontsource/playfair-display";
import "@fontsource/inter";
import "@fontsource/great-vibes";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#120d0a] text-white">

      {/* BACKGROUND */}

      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1800&auto=format&fit=crop')",
        }}
      />

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-black/70" />

      {/* GOLD GLOW */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#120d0a]/40 to-[#120d0a]" />

      {/* NAVBAR */}

      <Navbar />

      {/* HERO */}

      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 text-center">

        {/* SMALL TEXT */}

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="uppercase tracking-[0.45em] text-[#d6b98c] text-sm mb-8"
        >
          Boutique Parisian Café Experience
        </motion.p>

        {/* LOGO */}

        <motion.h1
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3 }}
          className="text-7xl md:text-[10rem] leading-none"
          style={{
            fontFamily: "Great Vibes",
          }}
        >
          Elva&apos;s Cafe
        </motion.h1>

        {/* DESCRIPTION */}

        <motion.p
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="mt-10 max-w-3xl mx-auto text-lg md:text-2xl text-gray-300 leading-9"
          style={{
            fontFamily: "Inter",
          }}
        >
          Artisan coffee, handcrafted pastries,
          refined brunch cuisine, and cinematic interiors
          inspired by luxury European cafés.
        </motion.p>

        {/* BUTTONS */}

        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.7 }}
          className="flex flex-wrap justify-center gap-6 mt-14"
        >

          <Link
            href="/menu"
            className="bg-[#d6b98c] text-black px-10 py-5 rounded-2xl uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition duration-300 shadow-2xl"
          >
            View Menu
          </Link>

          <Link
            href="/reservations"
            className="border border-white/30 backdrop-blur-xl px-10 py-5 rounded-2xl uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:scale-105 transition duration-300"
          >
            Reservations
          </Link>

        </motion.div>

      </section>

      {/* MARQUEE */}

      <MarqueeBar />

      {/* FEATURE SECTION */}

      <section className="relative z-10 py-40 px-6">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          {/* IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[40px] shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
          >

            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1600&auto=format&fit=crop"
              alt="Luxury Cafe"
              className="w-full h-[750px] object-cover hover:scale-105 transition duration-700"
            />

          </motion.div>

          {/* CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >

            <p className="uppercase tracking-[0.45em] text-[#d6b98c] text-sm mb-6">
              About Elva&apos;s Cafe
            </p>

            <h2
              className="text-5xl md:text-7xl leading-tight"
              style={{
                fontFamily: "Playfair Display",
              }}
            >
              Luxury Coffee
              <br />
              Reimagined
            </h2>

            <p className="mt-10 text-gray-300 text-lg leading-9">
              Located along the Coastal Highway in La Democracia Village,
              Elva&apos;s Cafe blends artisan coffee culture with warm
              boutique hospitality and elevated culinary experiences.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                href="/about"
                className="bg-[#d6b98c] text-black px-8 py-4 rounded-2xl uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition duration-300"
              >
                About Us
              </Link>

              <Link
                href="/location"
                className="border border-white/20 px-8 py-4 rounded-2xl uppercase tracking-[0.2em] hover:bg-white hover:text-black transition duration-300"
              >
                Visit Us
              </Link>

            </div>

          </motion.div>

        </div>

      </section>
<Footer />
    </main>
  );
}