"use client";

import Link from "next/link";

import "@fontsource/great-vibes";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-6">

      <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-2xl bg-black/30 border border-white/10 rounded-full px-8 py-4 shadow-2xl">

        {/* LOGO */}

        <Link
          href="/"
          className="text-5xl text-[#f5e6c8]"
          style={{
            fontFamily: "Great Vibes",
          }}
        >
          Elva&apos;s Cafe
        </Link>

        {/* NAVIGATION */}

        <nav className="hidden md:flex items-center gap-8 uppercase tracking-[0.2em] text-sm text-white">

          <Link href="/" className="hover:text-[#d6b98c] transition">
            Home
          </Link>

          <Link href="/menu" className="hover:text-[#d6b98c] transition">
            Menu
          </Link>

          <Link href="/about" className="hover:text-[#d6b98c] transition">
            About
          </Link>

          <Link
            href="/reservations"
            className="hover:text-[#d6b98c] transition"
          >
            Reservations
          </Link>

          <Link
            href="/location"
            className="hover:text-[#d6b98c] transition"
          >
            Location
          </Link>

        </nav>

      </div>

    </header>
  );
}