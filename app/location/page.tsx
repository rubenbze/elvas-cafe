"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import "@fontsource/playfair-display";

import { motion } from "framer-motion";

export default function LocationPage() {

  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      <PageBackground />

      <Navbar />

      {/* HERO */}

      <section className="relative z-10 pt-44 pb-20 px-6">

        <div className="max-w-7xl mx-auto text-center">

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="uppercase tracking-[0.45em] text-[#d6b98c] text-sm mb-8"
          >
            Visit Us
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="text-5xl md:text-8xl leading-tight mb-10"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Experience
            <br />
            Elva&apos;s Cafe
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.3 }}
            className="max-w-3xl mx-auto text-gray-300 leading-8 text-lg"
          >
            Discover artisan coffee, handcrafted pastries,
            elevated brunch selections, and boutique café
            ambiance in the heart of Belize.
          </motion.p>

        </div>

      </section>

      {/* LOCATION SECTION */}

      <section className="relative z-10 px-6 pb-28">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-stretch">

          {/* INFO CARD */}

          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="backdrop-blur-2xl bg-black/30 border border-white/10 rounded-[40px] p-10 flex flex-col justify-between"
          >

            <div>

              <p className="uppercase tracking-[0.35em] text-[#d6b98c] text-sm mb-5">
                Our Location
              </p>

              <h2
                className="text-5xl mb-8"
                style={{
                  fontFamily: "Playfair Display",
                }}
              >
                Belize Luxury
                <br />
                Café Experience
              </h2>

              <p className="text-gray-300 leading-8 text-lg mb-10">
                Located in La Democracia Village, Belize,
                Elva&apos;s Cafe blends artisan café culture
                with elevated hospitality, handcrafted drinks,
                refined pastries, and unforgettable ambiance.
              </p>

              <div className="space-y-8">

                <div>

                  <p className="text-[#d6b98c] uppercase tracking-[0.25em] text-sm mb-2">
                    Address
                  </p>

                  <p className="text-2xl">
                    La Democracia Village,
                    Belize
                  </p>

                </div>

                <div>

                  <p className="text-[#d6b98c] uppercase tracking-[0.25em] text-sm mb-2">
                    Hours
                  </p>

                  <p className="text-2xl">
                    Monday — Sunday
                  </p>

                  <p className="text-gray-400">
                    7:00 AM — 9:00 PM
                  </p>

                </div>

              </div>

            </div>

            {/* GOOGLE MAPS BUTTON */}

            <a
              href="https://maps.google.com/?q=17.3411358,-88.5513154"
              target="_blank"
              className="mt-12 inline-flex items-center justify-center bg-[#d6b98c] text-black px-8 py-5 rounded-full font-semibold hover:scale-105 transition duration-300"
            >
              Open In Google Maps
            </a>

          </motion.div>

          {/* LIVE MAP */}

          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-[40px] border border-white/10 shadow-2xl bg-black/20 backdrop-blur-xl"
          >

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d7545847.201234226!2d-98.30717477499995!3d17.34113580000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDIwJzI4LjEiTiA4OMKwMzMnMDQuNyJX!5e1!3m2!1sen!2sbz!4v1779137913909!5m2!1sen!2sbz"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[700px] w-full"
            />

          </motion.div>

        </div>

      </section>

      <Footer />

    </main>
  );
}