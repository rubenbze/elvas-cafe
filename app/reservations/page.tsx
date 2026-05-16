"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ReservationsPage() {
  return (
    <main className="relative min-h-screen bg-[#120d0a] overflow-hidden text-white">

      {/* BACKGROUND IMAGE */}

      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1800&auto=format&fit=crop')",
        }}
      />

      {/* DARK OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#120d0a]/95 via-[#120d0a]/90 to-[#120d0a]" />

      {/* NAVBAR */}

      <Navbar />

      {/* CONTENT */}

      <div className="relative z-10 flex justify-center">

        <div className="w-full max-w-6xl px-6 md:px-10">

          {/* HERO SECTION */}

          <section className="pt-44 pb-24 text-center">

            <p className="uppercase tracking-[0.45em] text-[#d6b98c] text-sm mb-6">
              Luxury Reservations
            </p>

            <h1 className="text-6xl md:text-8xl leading-tight font-light">
              Reserve
              <br />
              Your Table
            </h1>

            <p className="mt-10 text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-9">
              Experience artisan coffee, handcrafted pastries,
              cinematic interiors, and refined hospitality
              inspired by boutique Parisian cafés.
            </p>

          </section>

          {/* RESERVATION CARD */}

          <section className="pb-32 flex justify-center">

            <div className="w-full max-w-5xl bg-[#1b1511]/80 backdrop-blur-2xl border border-[#2d211a] rounded-[50px] p-10 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.55)]">

              <div className="grid md:grid-cols-2 gap-8">

                {/* FIRST NAME */}

                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full bg-[#120d0a] border border-[#3a2a21] rounded-2xl px-6 py-5 text-lg outline-none focus:border-[#d6b98c] transition"
                />

                {/* LAST NAME */}

                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full bg-[#120d0a] border border-[#3a2a21] rounded-2xl px-6 py-5 text-lg outline-none focus:border-[#d6b98c] transition"
                />

                {/* EMAIL */}

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-[#120d0a] border border-[#3a2a21] rounded-2xl px-6 py-5 text-lg outline-none focus:border-[#d6b98c] transition"
                />

                {/* PHONE */}

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-[#120d0a] border border-[#3a2a21] rounded-2xl px-6 py-5 text-lg outline-none focus:border-[#d6b98c] transition"
                />

                {/* DATE */}

                <input
                  type="date"
                  className="w-full bg-[#120d0a] border border-[#3a2a21] rounded-2xl px-6 py-5 text-lg outline-none focus:border-[#d6b98c] transition"
                />

                {/* TIME */}

                <input
                  type="time"
                  className="w-full bg-[#120d0a] border border-[#3a2a21] rounded-2xl px-6 py-5 text-lg outline-none focus:border-[#d6b98c] transition"
                />

                {/* PARTY SIZE */}

                <select
                  className="w-full bg-[#120d0a] border border-[#3a2a21] rounded-2xl px-6 py-5 text-lg outline-none focus:border-[#d6b98c] transition"
                >
                  <option>Party Size</option>
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                  <option>5+ Guests</option>
                </select>

                {/* SEATING */}

                <select
                  className="w-full bg-[#120d0a] border border-[#3a2a21] rounded-2xl px-6 py-5 text-lg outline-none focus:border-[#d6b98c] transition"
                >
                  <option>Seating Preference</option>
                  <option>Indoor Seating</option>
                  <option>Outdoor Seating</option>
                  <option>Private Experience</option>
                </select>

              </div>

              {/* SPECIAL REQUESTS */}

              <div className="mt-8">

                <textarea
                  rows={6}
                  placeholder="Special Requests"
                  className="w-full bg-[#120d0a] border border-[#3a2a21] rounded-2xl px-6 py-5 text-lg outline-none focus:border-[#d6b98c] transition resize-none"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex flex-wrap justify-center gap-6 mt-10">

                <button
                  className="bg-[#d6b98c] text-black px-10 py-5 rounded-2xl uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition duration-300"
                >
                  Submit Reservation
                </button>

                <a
                  href="tel:+5016261182"
                  className="bg-[#1b1511] border border-[#2d211a] px-10 py-5 rounded-2xl hover:border-[#d6b98c] hover:scale-105 transition duration-300"
                >
                  📞 Call Us
                </a>

                <a
                  href="mailto:rdonis83@gmail.com"
                  className="bg-[#1b1511] border border-[#2d211a] px-10 py-5 rounded-2xl hover:border-[#d6b98c] hover:scale-105 transition duration-300"
                >
                  ✉️ Send Email
                </a>

              </div>

            </div>

          </section>

        </div>

      </div>
<Footer />
    </main>
  );
}