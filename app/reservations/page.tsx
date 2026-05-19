"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL!;

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );

export default function ReservationsPage() {

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [guests, setGuests] =
    useState("");

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  async function handleReservation() {

    setLoading(true);

    const { error } = await supabase
      .from("reservations")
      .insert([
        {
          name,
          phone,
          guests,
          date,
          time,
          notes,
        },
      ]);

    setLoading(false);

    if (error) {

      console.log(error);

      alert("Reservation failed");

      return;

    }

    setSuccess(true);

    setName("");
    setPhone("");
    setGuests("");
    setDate("");
    setTime("");
    setNotes("");

  }

  return (

    <main className="relative min-h-screen overflow-hidden text-white">

      <PageBackground />

      <Navbar />

      <section className="relative z-10 pt-44 px-6 pb-24">

        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-16">

            <h1 className="text-6xl text-[#f5e6c8] mb-6">
              Reservations
            </h1>

            <p className="text-gray-300 text-lg">
              Reserve your luxury café experience.
            </p>

          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">

            <div className="grid md:grid-cols-2 gap-6">

              <input
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="bg-black/30 border border-white/10 rounded-2xl p-4 outline-none"
              />

              <input
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="bg-black/30 border border-white/10 rounded-2xl p-4 outline-none"
              />

              <input
                placeholder="Guests"
                value={guests}
                onChange={(e) =>
                  setGuests(e.target.value)
                }
                className="bg-black/30 border border-white/10 rounded-2xl p-4 outline-none"
              />

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                className="bg-black/30 border border-white/10 rounded-2xl p-4 outline-none"
              />

              <input
                type="time"
                value={time}
                onChange={(e) =>
                  setTime(e.target.value)
                }
                className="bg-black/30 border border-white/10 rounded-2xl p-4 outline-none md:col-span-2"
              />

            </div>

            <textarea
              placeholder="Special requests..."
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              className="w-full mt-6 h-32 bg-black/30 border border-white/10 rounded-2xl p-4 outline-none resize-none"
            />

            <button
              onClick={handleReservation}
              disabled={loading}
              className="w-full mt-8 bg-[#d6b98c] text-black py-4 rounded-2xl text-xl font-semibold hover:scale-[1.02] transition"
            >
              {loading
                ? "Submitting..."
                : "Reserve Table"}
            </button>

            {success && (

              <div className="mt-6 bg-green-500/20 border border-green-500 rounded-2xl p-4 text-green-300 text-center">

                Reservation submitted successfully.

              </div>

            )}

          </div>

        </div>

      </section>

      <Footer />

    </main>

  );

}