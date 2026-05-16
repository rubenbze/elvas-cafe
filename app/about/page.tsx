"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";

import { motion } from "framer-motion";

import "@fontsource/playfair-display";
import "@fontsource/inter";

export default function AboutPage() {
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
          Our Story
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
          Crafted With
          <br />
          Passion
        </motion.h1>

      </section>

      {/* STORY */}

      <section className="relative z-10 pb-32 px-6">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          {/* IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[40px]"
          >

            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop"
              alt="Coffee"
              className="w-full h-[700px] object-cover"
            />

          </motion.div>

          {/* CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >

            <h2
              className="text-5xl mb-10"
              style={{
                fontFamily: "Playfair Display",
              }}
            >
              The Elva&apos;s Experience
            </h2>

            <p className="text-gray-300 leading-9 text-lg mb-8">
              Elva&apos;s Cafe was created to bring luxury café culture
              to Belize through artisan coffee, handcrafted pastries,
              elevated hospitality, and immersive ambiance.
            </p>

            <p className="text-gray-300 leading-9 text-lg mb-8">
              Inspired by Parisian cafés and boutique hospitality,
              every detail was designed to create warmth,
              elegance, and unforgettable moments.
            </p>

            <p className="text-gray-300 leading-9 text-lg">
              From specialty coffee beans to refined desserts,
              Elva&apos;s Cafe exists to create a world-class café
              experience in La Democracia Village.
            </p>

          </motion.div>

        </div>

      </section>
<Footer />
    </main>
  );
}