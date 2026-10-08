"use client";

import { useState } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";

type Property = {
  id: number;
  project_name: string;
  builder_name: string;
  location: string;
  bhk: string;
  price: string;
  status: string;
  carpet_area: number;
  images?: {
    id: number;
    image: string;
    is_main: boolean;
  }[];
};

export default function AIRecommendations() {
  const [location, setLocation] = useState("");
  const [bhk, setBhk] = useState("");
  const [budget, setBudget] = useState("");

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function getRecommendations(e: React.FormEvent) {
    e.preventDefault();

    if (!location && !bhk && !budget) {
      setError("Please enter at least one preference.");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const params = new URLSearchParams();

      if (location.trim()) {
        params.append("location", location.trim());
      }

      if (bhk) {
        params.append("bhk", bhk);
      }

      if (budget) {
        params.append("budget", budget);
      }

      const response = await fetch(
        `${API_URL}/api/properties/recommendations/?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const data = await response.json();

      setProperties(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to get recommendations. Please make sure the backend server is running."
      );

      setProperties([]);
    } finally {
      setLoading(false);
    }
  }

  function clearRecommendations() {
    setLocation("");
    setBhk("");
    setBudget("");
    setProperties([]);
    setSearched(false);
    setError("");
  }

  return (
    <section id="ai-finder" className="relative scroll-mt-24 px-5 py-20 sm:px-8 md:py-28 lg:px-16">
      <div className="mx-auto max-w-[1440px]">

        {/* HEADER */}
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent-light)]">
            <span className="h-px w-7 bg-[color:var(--accent)]" />
            Intelligent discovery
          </span>

          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-[color:var(--heading)] sm:text-5xl md:text-6xl">
            Find Properties That{" "}
            <span className="font-normal italic text-[color:var(--accent-light)] [font-family:var(--font-display)]">Match You</span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--muted)]">
            Tell HOMZO your preferred location, configuration and budget. Our
            intelligent recommendation system finds homes aligned with your
            requirements.
          </p>
        </div>

        {/* SEARCH BOX */}
        <div className="mx-auto mt-10 max-w-5xl border-y border-[color:var(--border)] bg-[color:var(--background-strong)] px-5 py-7 sm:px-8 md:py-9">
          <form
            onSubmit={getRecommendations}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_auto] lg:items-end"
          >

            {/* LOCATION */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--muted-strong)]">
                 Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Mumbai"
                className="w-full rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--background)] px-4 py-3.5 text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20"
              />
            </div>

            {/* BHK */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--muted-strong)]">
                 BHK
              </label>

              <select
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className="w-full rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--background)] px-4 py-3.5 text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20"
              >
                <option value="">Any BHK</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
                <option value="5 BHK">5 BHK</option>
              </select>
            </div>

            {/* BUDGET */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--muted-strong)]">
                 Budget
              </label>

              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 8000000"
                className="w-full rounded-lg border border-[color:var(--border-strong)] bg-[color:var(--background)] px-4 py-3.5 text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/20"
              />

              <p className="mt-1 text-xs text-[color:var(--muted)]">
                Enter maximum budget in ₹
              </p>
            </div>

            {/* BUTTON */}
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#111] px-5 py-3.5 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#292929] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Finding..." : " Find My Properties"}
              </button>
            </div>
          </form>

          {/* ERROR */}
          {error && (
            <div className="mt-5 rounded-lg border border-[color:var(--error)]/30 bg-[color:var(--error)]/10 px-4 py-3 text-sm text-[color:var(--error)]">
              {error}
            </div>
          )}

          {/* CLEAR */}
          {searched && !loading && (
            <div className="mt-4 text-right">
              <button
                type="button"
                onClick={clearRecommendations}
                className="text-sm font-semibold text-[color:var(--muted)] transition hover:text-[color:var(--accent-light)]"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-12 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#C9A961]" />

            <p className="mt-4 font-semibold text-[color:var(--heading)]">
              Finding your best property matches...
            </p>

            <p className="mt-1 text-sm text-[color:var(--muted)]">
              Our recommendation engine is analysing your preferences.
            </p>
          </div>
        )}

        {/* RESULTS */}
        {!loading && searched && properties.length > 0 && (
          <div className="mt-14">

            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#C9A961]">
                  AI Results
                </span>

                <h3 className="mt-2 text-3xl font-semibold tracking-tight text-[color:var(--heading)]">
                  Recommended For You
                </h3>

                <p className="mt-2 text-gray-500">
                  {properties.length} property
                  {properties.length === 1 ? "" : "ies"} matched your
                  preferences.
                </p>
              </div>

              <div className="rounded-full bg-[color:var(--accent)]/10 px-4 py-2 text-sm font-semibold text-[color:var(--accent-light)]">
                 Smart Match
              </div>
            </div>

            {/* PROPERTY CARDS */}
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => {
                const mainImage =
                  property.images?.find((image) => image.is_main)?.image ||
                  property.images?.[0]?.image;

                return (
                  <div
                    key={property.id}
                    className="group overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] transition duration-500 hover:-translate-y-1 hover:border-[color:var(--border-hover)]"
                  >

                    {/* IMAGE */}
                    <div className="relative h-52 overflow-hidden bg-[color:var(--background-soft)]">
                      {mainImage ? (
                        <img
                          src={mainImage}
                          alt={property.project_name}
                          className="h-full w-full object-cover transition duration-900 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-5xl">

                        </div>
                      )}

                      {/* AI BADGE */}
                      <div className="absolute left-4 top-4 rounded-full bg-[color:var(--panel-solid)]/95 px-3 py-1.5 text-xs font-bold text-[color:var(--accent-light)]">
                         AI Recommended
                      </div>

                      {/* STATUS */}
                      <div className="absolute right-4 top-4 rounded-full bg-[#111]/85 px-3 py-1.5 text-xs font-semibold text-white">
                        {property.status?.replace("_", " ")}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">

                      <h4 className="truncate text-xl font-semibold text-[color:var(--heading)]">
                        {property.project_name}
                      </h4>

                      <p className="mt-1 text-sm text-[color:var(--muted)]">
                        By {property.builder_name}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-sm text-[color:var(--muted-strong)]">
                        <span></span>

                        <span className="truncate">
                          {property.location}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">

                        <div className="rounded-lg bg-[color:var(--background-soft)] p-3">
                          <p className="text-xs text-[color:var(--muted)]">
                            Configuration
                          </p>

                          <p className="mt-1 font-bold text-[color:var(--heading)]">
                            {property.bhk}
                          </p>
                        </div>

                        <div className="rounded-lg bg-[color:var(--background-soft)] p-3">
                          <p className="text-xs text-[color:var(--muted)]">
                            Carpet Area
                          </p>

                          <p className="mt-1 font-bold text-[color:var(--heading)]">
                            {property.carpet_area
                              ? `${property.carpet_area} sq.ft`
                              : "N/A"}
                          </p>
                        </div>

                      </div>

                      {/* PRICE */}
                      <div className="mt-5 flex items-end justify-between">

                        <div>
                          <p className="text-xs text-[color:var(--muted)]">
                            Starting Price
                          </p>

                          <p className="mt-1 text-xl font-bold text-[color:var(--accent-light)]">
                            ₹{" "}
                            {Number(property.price).toLocaleString("en-IN")}
                          </p>
                        </div>

                        {/* FIXED ROUTE */}
                        <Link
                          href={`/property/${property.id}`}
                          className="rounded-lg bg-[#111] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#292929]"
                        >
                          View Property
                        </Link>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* NO RESULTS */}
        {!loading && searched && properties.length === 0 && !error && (
          <div className="mx-auto mt-12 max-w-xl border-y border-[color:var(--border)] bg-[color:var(--card)] p-8 text-center sm:p-10">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E8C4B3]/30 text-4xl">

            </div>

            <h3 className="mt-6 text-2xl font-bold text-[color:var(--heading)]">
              No Matching Properties
            </h3>

            <p className="mt-3 text-[color:var(--muted)]">
              We couldn&apos;t find properties matching your preferences.
              Try increasing your budget or choosing another location.
            </p>

            <button
              onClick={clearRecommendations}
              className="mt-6 rounded-lg bg-[#111] px-6 py-3 font-semibold text-white transition hover:bg-[#292929]"
            >
              Try Again
            </button>

          </div>
        )}
      </div>
    </section>
  );
}
