"use client";

import Link from "next/link";

import { useState } from "react";

import { Menu, X } from "lucide-react";

export default function Navbar() {

  const [open, setOpen] =
    useState(false);

  return (

    <header className="fixed top-0 left-0 w-full z-[9999] bg-black/40 backdrop-blur-xl border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        <Link
          href="/"
          className="text-3xl text-[#f5e6c8]"
        >
          ELVA'S
        </Link>

        {/* DESKTOP */}

        <nav className="hidden md:flex items-center gap-8 text-white">

          <Link href="/">
            Home
          </Link>

          <Link href="/menu">
            Menu
          </Link>

          <Link href="/order">
            Order Online
          </Link>

          <Link href="/reservations">
            Reservations
          </Link>

        </nav>

        {/* MOBILE BUTTON */}

        <button
          onClick={() =>
            setOpen(!open)
          }
          className="md:hidden text-white"
        >

          {open
            ? <X size={32} />
            : <Menu size={32} />}

        </button>

      </div>

      {/* MOBILE MENU */}

      {open && (

        <div className="md:hidden bg-black border-t border-white/10">

          <div className="flex flex-col p-6 gap-6 text-white text-lg">

            <Link
              href="/"
              onClick={() =>
                setOpen(false)
              }
            >
              Home
            </Link>

            <Link
              href="/menu"
              onClick={() =>
                setOpen(false)
              }
            >
              Menu
            </Link>

            <Link
              href="/order"
              onClick={() =>
                setOpen(false)
              }
            >
              Order Online
            </Link>

            <Link
              href="/reservations"
              onClick={() =>
                setOpen(false)
              }
            >
              Reservations
            </Link>

          </div>

        </div>

      )}

    </header>

  );

}