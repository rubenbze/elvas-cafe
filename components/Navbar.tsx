"use client";

import Link from "next/link";

import { useState } from "react";

import {
  Menu,
  X,
} from "lucide-react";

import "@fontsource/great-vibes";

export default function Navbar() {

  const [open, setOpen] =
    useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-6">

      <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-2xl bg-black/30 border border-white/10 rounded-full px-6 md:px-8 py-4 shadow-2xl">

        {/* LOGO */}

        <Link
          href="/"
          className="text-4xl md:text-5xl text-[#f5e6c8]"
          style={{
            fontFamily: "Great Vibes",
          }}
        >
          Elva&apos;s Cafe
        </Link>

        {/* DESKTOP NAV */}

        <nav className="hidden md:flex items-center gap-8 uppercase tracking-[0.2em] text-sm text-white">

          <Link
            href="/"
            className="hover:text-[#d6b98c] transition"
          >
            Home
          </Link>

          <Link
            href="/menu"
            className="hover:text-[#d6b98c] transition"
          >
            Menu
          </Link>

          <Link
            href="/about"
            className="hover:text-[#d6b98c] transition"
          >
            About
          </Link>

          <Link
            href="/order"
            className="hover:text-[#d6b98c] transition"
          >
            Order Online
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

        {/* MOBILE BUTTON */}

        <button
          onClick={() =>
            setOpen(!open)
          }
          className="md:hidden text-white"
        >
          {open ? (
            <X size={30} />
          ) : (
            <Menu size={30} />
          )}
        </button>

      </div>

      {/* MOBILE MENU */}

      {open && (

        <div className="md:hidden mt-4 backdrop-blur-2xl bg-black/90 border border-white/10 rounded-[30px] p-8 flex flex-col gap-6 text-center uppercase tracking-[0.2em] text-sm text-white">

          <Link
            href="/"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/menu"
            onClick={() => setOpen(false)}
          >
            Menu
          </Link>

          <Link
            href="/about"
            onClick={() => setOpen(false)}
          >
            About
          </Link>

          <Link
            href="/order"
            onClick={() => setOpen(false)}
          >
            Order Online
          </Link>

          <Link
            href="/reservations"
            onClick={() => setOpen(false)}
          >
            Reservations
          </Link>

          <Link
            href="/location"
            onClick={() => setOpen(false)}
          >
            Location
          </Link>

        </div>

      )}

    </header>
  );
}