"use client";
import "@fontsource/great-vibes";
import {
  FaCcVisa,
  FaCcMastercard,
  FaInstagram,
  FaTripadvisor,
} from "react-icons/fa";

import { SiMastercard } from "react-icons/si";

import { MdEmail, MdPhone } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-2xl mt-32">

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* TOP */}

        <div className="flex flex-col md:flex-row justify-between gap-14">

          {/* BRAND */}

          <div>

            <h2
              className="text-5xl text-[#f5e6c8]"
              style={{
                fontFamily: "Great Vibes",
              }}
            >
              Elva&apos;s Cafe
            </h2>

            <p className="mt-5 text-gray-400 max-w-md leading-8">
              Luxury artisan coffee, handcrafted pastries,
              elevated brunch cuisine, and boutique hospitality
              in La Democracia Village, Belize.
            </p>

          </div>

          {/* CONTACT */}

          <div>

            <p className="uppercase tracking-[0.3em] text-[#d6b98c] text-sm mb-6">
              Connect
            </p>

            <div className="flex gap-5">

              <a
                href="tel:6261182"
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#d6b98c] hover:text-black transition duration-300"
              >
                <MdPhone size={22} />
              </a>

              <a
                href="mailto:rdonis83@gmail.com"
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#d6b98c] hover:text-black transition duration-300"
              >
                <MdEmail size={22} />
              </a>

              <a
                href="https://instagram.com/itzrubenbze"
                target="_blank"
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#d6b98c] hover:text-black transition duration-300"
              >
                <FaInstagram size={22} />
              </a>

            </div>

          </div>

        </div>

        {/* PAYMENT + TRUST */}

        <div className="mt-16 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">

          {/* PAYMENTS */}

          <div className="flex items-center gap-6 text-4xl text-[#f5e6c8]">

            <FaCcVisa />

            <FaCcMastercard />

            <SiMastercard />

            <span className="text-sm tracking-[0.2em] uppercase text-gray-400">
              DigiWallet Accepted
            </span>

          </div>

          {/* TRUST */}

          <div className="flex items-center gap-4 text-[#34E0A1]">

            <FaTripadvisor size={32} />

            <div>
              <p className="uppercase tracking-[0.2em] text-xs text-gray-400">
                TripAdvisor
              </p>

              <p className="text-sm">
                Luxury Café Experience • Belize
              </p>
            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}