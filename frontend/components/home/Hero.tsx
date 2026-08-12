"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [bhk, setBhk] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();

    if (location) {
      params.set("location", location);
    }

    if (bhk) {
      params.set("bhk", bhk);
    }

    router.push(`/search?${params.toString()}`);
  }

  return (
    <section className="relative flex min-h-[680px] items-center overflow-hidden">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0">

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Luxury modern home"
          className="h-full w-full object-cover scale-105 transition-transform duration-[10s] hover:scale-110"
        />

        {/* Luxury overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#17120f]/90 via-[#2c211b]/65 to-[#2c211b]/30" />

        <div className="absolute inset-0 bg-black/10" />

      </div>

      {/* Decorative glow */}

      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#E8C4B3]/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#C9A961]/15 blur-3xl" />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-10">

        <div className="max-w-4xl animate-fade-up">

          {/* Small badge */}

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">

            <span className="h-2 w-2 animate-pulse rounded-full bg-[#C9A961]" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
              Premium Real Estate
            </span>

          </div>

          {/* Heading */}

          <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl">

            Find a Home
            <br />

            <span className="text-[#E8C4B3]">
              You'll Love.
            </span>

          </h1>

          {/* Description */}

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 md:text-xl md:leading-8">
            Discover premium properties, trusted builders and beautiful
            homes in locations that match your lifestyle.
          </p>

          {/* =================================================
              SEARCH BOX
          ================================================== */}

          <div className="mt-10 max-w-4xl rounded-3xl border border-white/20 bg-white/95 p-3 shadow-2xl backdrop-blur-xl md:p-4">

            <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_auto]">

              {/* Location */}

              <div className="relative">

                <label className="absolute left-4 top-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Location
                </label>

                <span className="absolute bottom-3.5 left-4 text-lg">
                  📍
                </span>

                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="Search city or location"
                  className="h-16 w-full rounded-2xl border border-gray-200 bg-[#FAF6F0] pb-2 pl-11 pr-4 pt-5 text-sm text-gray-800 outline-none transition focus:border-[#C9A961] focus:bg-white focus:ring-4 focus:ring-[#C9A961]/10"
                />

              </div>

              {/* BHK */}

              <div className="relative">

                <label className="absolute left-4 top-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Property Type
                </label>

                <span className="absolute bottom-3.5 left-4 text-lg">
                  🏠
                </span>

                <select
                  value={bhk}
                  onChange={(e) => setBhk(e.target.value)}
                  className="h-16 w-full appearance-none rounded-2xl border border-gray-200 bg-[#FAF6F0] pb-2 pl-11 pr-8 pt-5 text-sm text-gray-800 outline-none transition focus:border-[#C9A961] focus:bg-white focus:ring-4 focus:ring-[#C9A961]/10"
                >
                  <option value="">Select BHK</option>
                  <option value="1BHK">1 BHK</option>
                  <option value="2BHK">2 BHK</option>
                  <option value="3BHK">3 BHK</option>
                </select>

                <span className="pointer-events-none absolute bottom-4 right-4 text-gray-400">
                  ▾
                </span>

              </div>

              {/* Search Button */}

              <button
                onClick={handleSearch}
                className="group relative h-16 overflow-hidden rounded-2xl bg-gradient-to-r from-[#C9A961] to-[#9B7E52] px-8 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
              >

                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Search</span>
                  <span className="transition duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>

                <span className="absolute inset-0 -translate-x-full bg-white/20 transition duration-500 group-hover:translate-x-full" />

              </button>

            </div>

          </div>

          {/* =================================================
              TRUST POINTS
          ================================================== */}

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">

            <div className="flex items-center gap-2">
              <span className="text-[#C9A961]">✓</span>
              Verified Properties
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#C9A961]">✓</span>
              Trusted Builders
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#C9A961]">✓</span>
              Smart Property Search
            </div>

          </div>

        </div>

      </div>

      {/* Bottom fade */}

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF6F0] to-transparent" />

    </section>
  );
}