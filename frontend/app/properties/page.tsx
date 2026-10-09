import { getProperties } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilter from "@/components/PropertyFilter";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  House,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const params = await searchParams;
  const properties = await getProperties(params);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[color:var(--background)] text-[color:var(--foreground)]">

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#E8C4B3]/25 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-[500px] h-[500px] w-[500px] rounded-full bg-[#C9A961]/15 blur-3xl" />

      <div className="pointer-events-none absolute left-1/3 top-[900px] h-72 w-72 rounded-full bg-[#D4A574]/10 blur-3xl" />


      <div className="relative mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-16">

        {/* ================= HEADER ================= */}

        <section className="animate-fade-up">

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div className="max-w-3xl">

              <span className="badge-premium">
                <Building2 size={14} aria-hidden="true" />
                 Homzo Collection
              </span>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[color:var(--foreground)] md:text-6xl">

                Curated spaces
                <span className="text-gradient block">
                  for exceptional living.
                </span>

              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
                Explore premium residential choices, compare your options, and
                discover a lifestyle-first home that reflects your goals.
              </p>

            </div>


            {/* COUNT CARD */}

            <div className="glass-card min-w-[190px] p-5 text-center">

              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#C9A961]/15 text-[#9B7E52]">
                <Building2 size={21} aria-hidden="true" />
              </div>

              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-[color:var(--muted)]">
                Properties Found
              </p>

              <p className="mt-1 text-4xl font-extrabold text-[#9B7E52]">
                {properties.length}
              </p>

            </div>

          </div>

        </section>


        {/* ================= QUICK FEATURES ================= */}

        <section className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">

          {[
            { icon: BadgeCheck, title: "Verified Listings" },
            { icon: Sparkles, title: "Smart Discovery" },
            { icon: Search, title: "Budget Friendly" },
            { icon: ShieldCheck, title: "Trusted Platform" },
          ].map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="group rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)]/70 p-4 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-[color:var(--background-strong)] hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8C4B3]/25 text-[#9B7E52]">
                  <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-[color:var(--foreground)]">
                  {title}
                </span>
              </div>
            </div>
          ))}

        </section>


        {/* ================= CONTENT ================= */}

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-4">

          {/* FILTER */}

          <aside className="lg:col-span-1">

            <div className="sticky top-24 overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)]/80 p-5 shadow-xl backdrop-blur">

              <div className="mb-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E8C4B3]/30 text-[#9B7E52]">
                    <Search size={20} aria-hidden="true" />
                  </div>

                  <div>

                    <h2 className="font-bold text-[color:var(--foreground)]">
                      Find Your Property
                    </h2>

                    <p className="text-xs text-[color:var(--muted)]">
                      Refine your search
                    </p>

                  </div>

                </div>

              </div>

              <PropertyFilter />

            </div>

          </aside>


          {/* PROPERTY GRID */}

          <section className="lg:col-span-3">

            {properties.length > 0 ? (

              <>

                <div className="mb-5 flex items-center justify-between">

                  <div>

                    <h2 className="text-xl font-bold text-[color:var(--foreground)]">
                      Featured Properties
                    </h2>

                    <p className="mt-1 text-sm text-[color:var(--muted)]">
                      Showing {properties.length} available properties
                    </p>

                  </div>

                  <div className="hidden rounded-full bg-[color:var(--background-strong)] px-4 py-2 text-sm text-[color:var(--muted)] shadow-sm md:block">
                    Latest Listings
                  </div>

                </div>


                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                  {properties.map(
                    (property: Property, index: number) => (

                      <div
                        key={property.id}
                        className={`animate-fade-up delay-${
                          ((index % 5) + 1) * 100
                        }`}
                      >

                        <PropertyCard property={property} />

                      </div>

                    )
                  )}

                </div>

              </>

            ) : (

              /* ================= EMPTY STATE ================= */

              <div className="flex min-h-[500px] items-center justify-center rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-10 text-center shadow-xl backdrop-blur">

                <div className="max-w-md">

                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-[#E8C4B3]/25 text-[#9B7E52]">
                    <House size={38} strokeWidth={1.5} aria-hidden="true" />
                  </div>

                  <h2 className="mt-7 text-3xl font-bold text-[color:var(--foreground)]">
                    No Properties Found
                  </h2>

                    <p className="mt-4 leading-7 text-[color:var(--muted)]">
                    We couldn&apos;t find properties matching your current search.
                    Try changing your location, BHK, status, or price range.
                  </p>

                  <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#C9A961]/10 px-5 py-2.5 text-sm font-semibold text-[#9B7E52]">
                    <Search size={15} aria-hidden="true" />
                    Try adjusting your filters
                  </div>

                </div>

              </div>

            )}

          </section>

        </div>


        {/* ================= BOTTOM CTA ================= */}

        <section className="mt-20 overflow-hidden rounded-[2rem] bg-[#2C2C2C] p-8 text-white shadow-2xl md:p-12">

          <div className="relative grid items-center gap-8 md:grid-cols-2">

            <div>

              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4B776]">
                Can&apos;t find what you&apos;re looking for?
              </span>

              <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
                Let Homzo help you
                <span className="text-[#E8C4B3]">
                  {" "}find it.
                </span>
              </h2>

                <p className="mt-4 max-w-xl leading-7 text-gray-300">
                Tell us your preferred location, budget, and requirements.
                Our property team can help you discover suitable options.
              </p>

            </div>


            <div className="flex justify-start md:justify-end">

              <a
                href="/contact"
                className="btn-accent inline-flex items-center gap-2 rounded-xl px-7 py-3.5"
              >
                Contact Homzo
                <ArrowRight size={17} aria-hidden="true" />
              </a>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}