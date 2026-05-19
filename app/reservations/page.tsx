"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import { useState } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

export default function ReservationsPage() {

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [guests, setGuests] =
    useState("2");

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function submitReservation() {

    if (
      !name ||
      !phone ||
      !date ||
      !time
    ) {

      alert("Please complete all fields");

      return;

    }

    setLoading(true);

    const { error } =
      await supabase
        .from("reservations")
        .insert([
          {
            name,
            phone,
            guests,
            date,
            time,
          },
        ]);

    setLoading(false);

    if (error) {

      alert("Failed to submit reservation");

      return;

    }

    alert("Reservation submitted!");

    setName("");
    setPhone("");
    setGuests("2");
    setDate("");
    setTime("");

  }

  return (

    <main className="relative min-h-screen overflow-hidden text-white">

      <PageBackground />

      <Navbar />

      <section className="relative z-10 pt-44 px-6 pb-24">

        <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 md:p-16">

          <h1 className="text-5xl md:text-7xl text-center text-[#f5e6c8] mb-8">
            Reservations
          </h1>

          <p className="text-center text-gray-400 mb-14 leading-8">
            Reserve your luxury café experience at Elva’s Café.
          </p>

          <div className="space-y-6">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full bg-black/30 border border-white/10 rounded-2xl p-5 outline-none"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full bg-black/30 border border-white/10 rounded-2xl p-5 outline-none"
            />

            <select
              value={guests}
              onChange={(e) =>
                setGuests(e.target.value)
              }
              className="w-full bg-black/30 border border-white/10 rounded-2xl p-5 outline-none"
            >

              {[1,2,3,4,5,6,7,8,9,10].map((num) => (

                <option
                  key={num}
                  value={num}
                >
                  {num} Guests
                </option>

              ))}

            </select>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className="w-full bg-black/30 border border-white/10 rounded-2xl p-5 outline-none"
            />

            <select
              value={time}
              onChange={(e) =>
                setTime(e.target.value)
              }
              className="w-full bg-black/30 border border-white/10 rounded-2xl p-5 outline-none"
            >

              <option value="">
                Select Reservation Time
              </option>

              {timeSlots.map((slot) => (

                <option
                  key={slot}
                  value={slot}
                >
                  {slot}
                </option>

              ))}

            </select>

            <button
              onClick={submitReservation}
              disabled={loading}
              className="w-full bg-[#d6b98c] text-black py-5 rounded-2xl font-semibold text-lg hover:scale-[1.02] transition"
            >
              {loading
                ? "Submitting..."
                : "Reserve Table"}
            </button>

          </div>

        </div>

      </section>

      <Footer />

    </main>

  );

}