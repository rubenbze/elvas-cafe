"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [isCompact, setIsCompact] =
    useState(false);

  useEffect(() => {

    function handleScroll() {

      if (window.scrollY > 40) {

        setIsCompact(true);

      } else {

        setIsCompact(false);

      }

    }

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  return (

    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isCompact
          ? "py-3"
          : "py-6"
      }`}
    >

      <div className="max-w-7xl mx-auto px-4">

        <div
          className={`backdrop-blur-xl bg-black/70 border border-white/10 rounded-full transition-all duration-300 flex items-center justify-between ${
            isCompact
              ? "px-6 py-3"
              : "px-8 py-5"
          }`}
        >

          {/* LOGO */}

          <Link
            href="/"
            className={`text-[#f5e6c8] transition-all duration-300 ${
              isCompact
                ? "text-4xl"
                : "text-5xl"
            }`}
            style={{
              fontFamily:
                "Playfair Display",
            }}
          >
            Elva&apos;s Cafe
          </Link>

          {/* NAV LINKS */}

          <nav className="hidden md:flex items-center gap-10 text-sm tracking-[0.25em] uppercase">

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

        </div>

      </div>

    </header>

  );

}