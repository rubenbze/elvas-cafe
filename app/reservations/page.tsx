"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import { createClient } from "@supabase/supabase-js";

import "@fontsource/playfair-display";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ReservationsPage() {

  const [fullName, setFullName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [partySize, setPartySize] =
    useState("");

  const [date, setDate] =
    useState("");

  const [time, setTime] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  async function handleReservation() {

    setError("");

    if (
      !fullName ||
      !phone ||
      !partySize ||
      !date ||
      !time
    ) {

      setError(
        "Please complete all required fields."
      );

      return;
    }

    const { error } =
      await supabase
        .from("reservations")
        .insert([
          {
            full_name: fullName,
            phone,
            reservation_date: date,
            reservation_time: time,
            party_size: partySize,
            notes,
          },
        ]);

    if (error) {

      setError(
        "Failed to submit reservation."
      );

      return;
    }

    setSuccess(true);

    setFullName("");
    setPhone("");
    setPartySize("");
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

            <h1
              className="text-5xl md:text-7xl mb-8"
              style={{
                fontFamily:
                  "Playfair Display",
              }}
            >
              Reservations
            </h1>

            <p className="text-gray-300 leading-8 text-lg">
              Reserve your luxury café experience.
            </p>

          </div>

          <div className="bg-black/30 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12">

            <div className="space-y-8">

              {/* NAME */}

              <div>

                <label className="block mb-3 text-[#d6b98c]">

                  Full Name

                </label>

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                  placeholder="Your full name"
                  className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              {/* PHONE */}

              <div>

                <label className="block mb-3 text-[#d6b98c]">

                  Phone Number

                </label>

                <input
                  type="text"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                  placeholder="Your phone number"
                  className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                />

              </div>

              {/* PARTY SIZE */}

              <div>

                <label className="block mb-3 text-[#d6b98c]">

                  Party Size

                </label>

                <select
                  value={partySize}
                  onChange={(e) =>
                    setPartySize(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                >

                  <option value="">
                    Select party size
                  </option>

                  <option>
                    1 Person
                  </option>

                  <option>
                    2 People
                  </option>

                  <option>
                    3-4 People
                  </option>

                  <option>
                    5-6 People
                  </option>

                  <option>
                    7+ People
                  </option>

                </select>

              </div>

              {/* DATE + TIME */}

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label className="block mb-3 text-[#d6b98c]">

                    Reservation Date

                  </label>

                  <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                      setDate(
                        e.target.value
                      )
                    }
                    className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                  />

                </div>

                <div>

                  <label className="block mb-3 text-[#d6b98c]">

                    Reservation Time

                  </label>

                  <input
                    type="time"
                    value={time}
                    onChange={(e) =>
                      setTime(
                        e.target.value
                      )
                    }
                    className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                  />

                </div>

              </div>

              {/* NOTES */}

              <div>

                <label className="block mb-3 text-[#d6b98c]">

                  Notes

                </label>

                <textarea
                  value={notes}
                  onChange={(e) =>
                    setNotes(
                      e.target.value
                    )
                  }
                  placeholder="Special requests..."
                  className="w-full h-32 bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none resize-none"
                />

              </div>

              {/* ERROR */}

              {error && (

                <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-2xl p-4">

                  {error}

                </div>

              )}

              {/* SUCCESS */}

              {success && (

                <div className="bg-green-500/20 border border-green-500 text-green-300 rounded-2xl p-4">

                  Reservation submitted successfully.

                </div>

              )}

              {/* BUTTON */}

              <button
                onClick={
                  handleReservation
                }
                className="w-full bg-[#d6b98c] text-black py-5 rounded-2xl text-xl font-semibold hover:scale-[1.02] transition"
              >
                Reserve Table
              </button>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>

  );

}