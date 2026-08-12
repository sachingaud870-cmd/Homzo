import Link from "next/link";
import { searchProperties } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";

type Property = {
  id: number;
  project_name: string;
  builder_name: string;
  location: string;
  status: string;
  price: string;
  bhk: string;
  carpet_area: number;

  images: {
    id: number;
    image: string;
    is_main: boolean;
  }[];
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    location?: string;
    bhk?: string;
  }>;
}) {
  const params = await searchParams;

  const location = params.location || "";
  const bhk = params.bhk || "";

  const properties: Property[] = await searchProperties(
    location,
    bhk
  );

  return (
    <main className="min-h-screen bg-[#FAF6F0]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#211a16]">

        {/* Decorative background */}

        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#E8C4B3]/10 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#C9A961]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 md:px-10">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
          >
            ← Back to Home
          </Link>

          <div className="mt-8">

            <div className="flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A961]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A961]">
                Property Search
              </span>

            </div>

            <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
              Find Your Perfect Property
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-white/55">
              Explore properties matching your preferred location and
              requirements.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          SEARCH SUMMARY
      ====================================================== */}

      <section className="border-b border-[#C9A961]/10 bg-white">

        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-10">

          <div>

            <p className="text-sm text-gray-400">
              Search criteria
            </p>

            <div className="mt-2 flex flex-wrap gap-2">

              {location && (
                <span className="rounded-full bg-[#E8C4B3]/20 px-4 py-2 text-sm font-medium text-[#9B7E52]">
                  📍 {location}
                </span>
              )}

              {bhk && (
                <span className="rounded-full bg-[#C9A961]/15 px-4 py-2 text-sm font-medium text-[#9B7E52]">
                  🏠 {bhk}
                </span>
              )}

              {!location && !bhk && (
                <span className="text-sm text-gray-500">
                  Showing all available properties
                </span>
              )}

            </div>

          </div>

          <Link
            href="/properties"
            className="rounded-xl border border-[#C9A961]/20 px-5 py-2.5 text-sm font-semibold text-[#9B7E52] transition hover:border-[#C9A961]/40 hover:bg-[#FAF6F0]"
          >
            Browse All Properties
          </Link>

        </div>

      </section>

      {/* =====================================================
          RESULTS
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">

        <div className="mb-8">

          <h2 className="text-2xl font-bold text-gray-900">
            Search Results
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {properties.length > 0
              ? `${properties.length} ${properties.length === 1 ? "property" : "properties"} found`
              : "No properties found matching your search"}
          </p>

        </div>

        {properties.length > 0 ? (

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">

            {properties.map((property) => (

              <div
                key={property.id}
                className="animate-fade-up"
              >
                <PropertyCard property={property} />
              </div>

            ))}

          </div>

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================== */

          <div className="rounded-3xl border border-dashed border-[#C9A961]/30 bg-white px-6 py-16 text-center shadow-sm">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E8C4B3]/20 text-3xl">
              🔎
            </div>

            <h3 className="mt-6 text-2xl font-bold text-gray-900">
              No properties found
            </h3>

            <p className="mx-auto mt-3 max-w-md leading-7 text-gray-500">
              We couldn't find properties matching your current search.
              Try another location or BHK.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/properties"
                className="rounded-xl bg-[#C9A961] px-6 py-3 font-semibold text-[#211a16] transition hover:-translate-y-0.5 hover:bg-[#D4B776] hover:shadow-lg"
              >
                View All Properties
              </Link>

              <Link
                href="/"
                className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Back Home
              </Link>

            </div>

          </div>

        )}

      </section>

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">

        <div className="relative overflow-hidden rounded-3xl bg-[#211a16] px-6 py-10 text-center md:px-10">

          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#C9A961]/10 blur-3xl" />

          <div className="relative">

            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Can't find what you're looking for?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/50">
              Tell our property team what you need and we'll help you
              discover suitable options.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-xl bg-[#C9A961] px-6 py-3 font-semibold text-[#211a16] transition hover:-translate-y-0.5 hover:bg-[#D4B776] hover:shadow-lg"
            >
              Contact PropVerse
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}