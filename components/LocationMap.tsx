"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";

import "@fontsource/playfair-display";

export default function LocationPage() {

  return (
    <main className="relative min-h-screen overflow-hidden text-white">

      <PageBackground />

      <Navbar />

      <section className="relative z-10 pt-44 px-6 pb-24">

        <div className="max-w-7xl mx-auto">

          <h1
            className="text-5xl md:text-7xl text-center mb-8"
            style={{
              fontFamily: "Playfair Display",
            }}
          >
            Find Us
          </h1>

          <p className="text-center text-gray-300 max-w-2xl mx-auto leading-8 mb-20">
            A luxury café experience in the heart of Belize.
          </p>

          <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-black/30 backdrop-blur-xl">

            {/* MAP */}

            <iframe
              src="https://www.google.com/maps?q=La+Democracia+Village+Belize&output=embed"
              width="100%"
              height="650"
              loading="lazy"
              className="opacity-80"
            />

            {/* OVERLAY */}

            <div className="absolute bottom-8 left-8 right-8 md:right-auto md:w-[420px] backdrop-blur-2xl bg-black/60 border border-white/10 rounded-[30px] p-8">

              <h2
                className="text-4xl mb-4 text-[#f5e6c8]"
                style={{
                  fontFamily: "Playfair Display",
                }}
              >
                Elva&apos;s Cafe
              </h2>

              <p className="text-gray-300 leading-8 mb-8">
                Luxury coffee, handcrafted pastries,
                elevated hospitality, and unforgettable ambiance.
              </p>

              <a
                href="https://maps.google.com/?q=La+Democracia+Village+Belize"
                target="_blank"
                className="inline-block w-full text-center bg-[#d6b98c] text-black py-4 rounded-full text-lg font-semibold hover:scale-[1.02] transition"
              >
                Open In Google Maps
              </a>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}