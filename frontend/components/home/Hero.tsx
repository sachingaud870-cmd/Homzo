"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BedDouble,
  ChevronDown,
  MapPin,
  Play,
  Ruler,
} from "lucide-react";

type FeaturedProperty = {
  id: number;
  project_name: string;
  location: string;
  price: string;
  bhk: string;
  carpet_area: number;
};

export default function Hero({
  featuredProperty,
}: {
  featuredProperty?: FeaturedProperty;
}) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [bhk, setBhk] = useState("");
  const [budget, setBudget] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (bhk) params.set("bhk", bhk);
    if (budget) params.set("max_price", budget);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <section className="relative isolate overflow-hidden bg-[#071321] text-white">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90"
          alt="Modern hillside home glowing at dusk"
          className="homzo-hero-image h-full min-h-[820px] w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,13,24,0.94)_0%,rgba(5,13,24,0.76)_38%,rgba(5,13,24,0.16)_78%,rgba(5,13,24,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#071321_0%,rgba(7,19,33,0.7)_15%,transparent_52%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[820px] w-full max-w-[1440px] flex-col justify-center px-5 pb-8 pt-32 sm:px-8 sm:pt-36 lg:px-16">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div className="max-w-2xl">
            <div className="homzo-reveal mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[color:var(--primary-light)] sm:text-xs">
              <span className="h-px w-7 bg-[color:var(--primary)]" />
              Find more than a home.
            </div>

            <h1 className="homzo-reveal homzo-reveal-delay-1 max-w-[680px] text-[clamp(3.3rem,7.2vw,6.8rem)] font-normal leading-[0.88] tracking-[-0.055em] text-[#f6f4f0]">
              Find your
              <span className="font-editorial block italic text-[color:var(--primary-light)]">
                place
              </span>
              to thrive.
            </h1>

            <p className="homzo-reveal homzo-reveal-delay-2 mt-6 max-w-md text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
              Curated homes. Expert guidance. A more considered way to find
              the place that feels like yours.
            </p>

            <div className="homzo-reveal homzo-reveal-delay-3 mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/properties"
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[color:var(--primary)] px-5 py-3 text-sm font-semibold text-[#101722] transition duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--primary-light)]"
              >
                Explore properties <ArrowRight size={16} />
              </Link>
              <a
                href="#why-homzo"
                className="inline-flex min-h-12 items-center gap-3 rounded-full px-3 py-3 text-sm font-medium text-white/90 transition hover:text-[color:var(--primary-light)]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40">
                  <Play size={12} fill="currentColor" />
                </span>
                Discover HOMZO
              </a>
            </div>
          </div>

          <div className="hidden lg:block" aria-hidden="true" />
        </div>

        <div className="relative z-10 mb-8 grid gap-4 lg:absolute lg:bottom-[118px] lg:right-16 lg:mb-0 lg:w-[330px]">
          <article className="rounded-2xl border border-white/20 bg-[#172437]/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-6">
            <div className="text-[9px] font-medium uppercase tracking-[0.2em] text-[color:var(--primary-light)]">
              {featuredProperty ? "Featured property" : "The HOMZO collection"}
            </div>
            <h2 className="mt-3 font-editorial text-2xl text-white sm:text-[1.8rem]">
              {featuredProperty?.project_name ?? "A place to call your own"}
            </h2>
            {featuredProperty ? (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-white/65">
                <MapPin size={13} />
                <span className="line-clamp-1">{featuredProperty.location}</span>
              </div>
            ) : (
              <p className="mt-2 text-xs text-white/65">
                Discover a home made for the way you live.
              </p>
            )}
            <div className="mt-5 grid grid-cols-3 gap-2 border-y border-white/10 py-4 text-xs text-white/80">
              <span className="flex items-center gap-1.5">
                <BedDouble size={14} className="text-[color:var(--primary-light)]" />
                {featuredProperty?.bhk ?? "Curated"}
              </span>
              <span className="flex items-center gap-1.5">
                <Ruler size={14} className="text-[color:var(--primary-light)]" />
                {featuredProperty ? `${featuredProperty.carpet_area} sq.ft` : "Distinctive"}
              </span>
              <span className="truncate text-right">
                {featuredProperty
                  ? `₹${Number(featuredProperty.price).toLocaleString("en-IN")}`
                  : "Exceptional"}
              </span>
            </div>
            <Link
              href={featuredProperty ? `/property/${featuredProperty.id}` : "/properties"}
              className="group mt-4 flex items-center justify-between text-xs font-medium text-white/90 transition hover:text-[color:var(--primary-light)]"
            >
              View property
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 transition group-hover:border-[color:var(--primary)]">
                <ArrowRight size={14} />
              </span>
            </Link>
          </article>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSearch();
          }}
          className="relative z-10 grid gap-1 rounded-2xl border border-white/10 bg-[#101d2d]/90 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl md:grid-cols-[1.25fr_0.9fr_1fr_auto] md:gap-0"
        >
          <label className="flex min-h-[62px] flex-col justify-center border-b border-white/10 px-4 md:border-b-0 md:border-r md:border-white/10 md:px-5">
            <span className="mb-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white/45">
              Location
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} className="shrink-0 text-[color:var(--primary-light)]" />
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Any location"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/60"
              />
            </span>
          </label>

          <label className="relative flex min-h-[62px] flex-col justify-center border-b border-white/10 px-4 md:border-b-0 md:border-r md:border-white/10 md:px-5">
            <span className="mb-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white/45">
              Property type
            </span>
            <select
              value={bhk}
              onChange={(event) => setBhk(event.target.value)}
              className="w-full appearance-none bg-transparent pr-5 text-sm text-white outline-none [&>option]:bg-[#101d2d]"
            >
              <option value="">Any type</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4 BHK</option>
            </select>
            <ChevronDown size={13} className="pointer-events-none absolute right-5 top-1/2 mt-1 text-white/55" />
          </label>

          <label className="flex min-h-[62px] flex-col justify-center px-4 md:px-5">
            <span className="mb-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white/45">
              Maximum budget
            </span>
            <span className="flex items-center gap-2 text-sm text-white">
              ₹
              <input
                type="number"
                min="0"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                placeholder="Any budget"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/60"
              />
            </span>
          </label>

          <button
            type="submit"
            className="m-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--primary)] px-6 text-sm font-semibold text-[#101722] transition duration-300 hover:-translate-y-0.5 hover:bg-[color:var(--primary-light)] md:min-h-[54px]"
          >
            Search properties <ArrowRight size={15} />
          </button>
        </form>
      </div>
    </section>
  );
}
