"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import "@fontsource/playfair-display";

export default function ReservationsPage() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleReservation() {

    if (
      !name ||
      !phone ||
      !guests ||
      !date ||
      !time
    ) {

      setError(
        "Please complete all reservation details."
      );

      return;
    }

    setError("");
    setSuccess(true);
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      <PageBackground />

      <Navbar />

      <section className="relative z-10 pt-44 px-6 pb-24">

        <div className="max-w-3xl mx-auto bg-black/50 border border-white/10 rounded-[40px] p-12 backdrop-blur-xl shadow-2xl">

          <h1
            className="text-6xl text-center mb-10"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Reservations
          </h1>

          {!success ? (

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full bg-white/10 border border-white/10 rounded-full px-6 py-4 outline-none"
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="w-full bg-white/10 border border-white/10 rounded-full px-6 py-4 outline-none"
              />

              <input
                type="number"
                placeholder="Number of Guests"
                value={guests}
                onChange={(e) =>
                  setGuests(e.target.value)
                }
                className="w-full bg-white/10 border border-white/10 rounded-full px-6 py-4 outline-none"
              />

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                className="w-full bg-white/10 border border-white/10 rounded-full px-6 py-4 outline-none"
              />

              <input
                type="time"
                value={time}
                onChange={(e) =>
                  setTime(e.target.value)
                }
                className="w-full bg-white/10 border border-white/10 rounded-full px-6 py-4 outline-none"
              />

              {error && (

                <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-6 py-4 rounded-2xl">

                  {error}

                </div>

              )}

              <button
                onClick={handleReservation}
                className="w-full bg-[#d6b98c] text-black py-5 rounded-full text-lg font-semibold hover:scale-105 transition"
              >
                Reserve Table
              </button>

            </div>

          ) : (

            <div className="text-center space-y-6">

              <h2 className="text-5xl text-[#d6b98c]">
                Reservation Confirmed
              </h2>

              <p className="text-xl text-gray-300">
                We look forward to hosting you at
                Elva&apos;s Cafe.
              </p>

            </div>

          )}

        </div>

      </section>

      <Footer />

    </main>
  );
}