import { getProperties } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";
import Hero from "@/components/home/Hero";
import AIRecommendations from "@/components/home/AIRecommendations";
import Link from "next/link";

type Property = {
  id: number;
  project_name: string;
  builder_name: string;
  location: string;
  bhk: string;
  price: string;
  status: string;
  carpet_area: number;
  images: {
    id: number;
    image: string;
    is_main: boolean;
  }[];
};

export default async function Home() {
  const properties: Property[] = await getProperties();

  const featuredProperties = properties.slice(0, 6);

  return (
    <main className="min-h-screen overflow-hidden bg-[color:var(--background)] text-[color:var(--foreground)]">

      {/* ================= HERO ================= */}
      <Hero />

      {/* ================= TRUST STATS ================= */}
      <section className="relative z-20 mx-auto -mt-10 max-w-6xl px-6">
        <div className="grid overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)] shadow-[var(--shadow-premium)] backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4">

          {[
            ["500+", "Properties Listed", ""],
            ["100+", "Verified Builders", ""],
            ["50+", "Locations Covered", ""],
            ["1000+", "Happy Clients", ""],
          ].map(([number, label, icon]) => (
            <div
              key={label}
              className="group border-b border-[color:var(--border)] p-6 text-center transition duration-300 hover:bg-[color:var(--background-soft)]/40 lg:border-b-0 lg:border-r last:border-r-0"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--primary)]/20 text-2xl text-[color:var(--accent-light)] transition duration-300 group-hover:scale-110">
                {icon}
              </div>

              <p className="mt-3 text-2xl font-bold text-[color:var(--heading)]">
                {number}
              </p>

              <p className="mt-1 text-sm text-[color:var(--muted)]">
                {label}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= AI RECOMMENDATIONS ================= */}
      <section className="mx-auto max-w-7xl px-6 pt-20 md:px-10">
        <AIRecommendations />
      </section>

      {/* ================= FEATURED PROPERTIES ================= */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[color:var(--accent)]">
              Signature Listings
            </p>

            <h2 className="mt-3 text-4xl font-bold text-[color:var(--heading)] md:text-5xl">
              Handpicked For Elevated Living
            </h2>

            <p className="mt-4 max-w-xl text-[color:var(--muted)]">
              Discover standout homes and modern investment opportunities in
              prime, lifestyle-rich locations.
            </p>
          </div>

          <Link
            href="/properties"
            className="font-semibold text-[color:var(--accent-light)] transition hover:text-[color:var(--accent)]"
          >
            View All Properties →
          </Link>

        </div>

        {featuredProperties.length > 0 ? (

          <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}

          </div>

        ) : (

          <div className="mt-10 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)] p-16 text-center shadow-[var(--shadow-soft)]">

            <div className="text-5xl text-[color:var(--accent)]">

            </div>

            <h3 className="mt-5 text-2xl font-bold text-[color:var(--heading)]">
              Properties Coming Soon
            </h3>

            <p className="mt-2 text-[color:var(--muted)]">
              We are adding amazing properties to our platform.
            </p>

          </div>

        )}

      </section>

      {/* ================= WHY HOMZO ================= */}
      <section className="bg-[color:var(--background-soft)] py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[color:var(--accent)]">
              Why Homzo
            </p>

            <h2 className="mt-3 text-4xl font-bold text-[color:var(--heading)] md:text-5xl">
              Real Estate, Reimagined
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-[color:var(--muted)]">
              A refined property experience built to help you discover better
              locations, smarter investments, and more confident decisions.
            </p>

          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: "",
                title: "Smart Search",
                description:
                  "Find properties based on your preferred location, BHK and budget.",
              },
              {
                icon: "",
                title: "Verified Properties",
                description:
                  "Explore carefully managed listings with reliable property information.",
              },
              {
                icon: "",
                title: "AI Recommendations",
                description:
                  "Get intelligent property suggestions based on your requirements.",
              },
              {
                icon: "",
                title: "Expert Consultants",
                description:
                  "Connect with property consultants who can guide you through the process.",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="group rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)] p-7 shadow-[var(--shadow-soft)] transition duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-hover)]"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--background-strong)] text-2xl text-[color:var(--accent-light)] shadow-lg transition duration-300 group-hover:scale-110">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold text-[color:var(--heading)]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= AI SECTION ================= */}
      <section className="px-6 py-24">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--background-strong)] shadow-[var(--shadow-premium)]">

          <div className="relative p-8 md:p-14">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C9A961]/20" />

            <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-[#E8C4B3]/10" />

            <div className="relative grid items-center gap-10 lg:grid-cols-2">

              {/* LEFT */}
              <div>

                <span className="inline-flex rounded-full bg-[#C9A961]/20 px-4 py-2 text-sm font-semibold text-[#E8C4B3]">
                   Powered by AI
                </span>

                <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl">
                  Find a Property
                  <span className="text-[#C9A961]">
                    {" "}That Fits You
                  </span>
                </h2>

                <p className="mt-5 max-w-xl leading-7 text-gray-300">
                  Tell us your budget, preferred location and requirements.
                  Homzo helps you discover properties that match your
                  needs.
                </p>

                <Link
                  href="/properties"
                  className="mt-8 inline-flex rounded-xl bg-[#C9A961] px-7 py-3.5 font-bold text-[#1A3A52] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#D4B776]"
                >
                  Explore Properties →
                </Link>

              </div>

              {/* RIGHT AI CARD */}
              <div className="relative">

                <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">

                  <div className="rounded-2xl bg-white p-6 shadow-xl">

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8C4B3]/30 text-2xl">

                      </div>

                      <div>
                        <p className="font-bold text-[#1A3A52]">
                          Property Match
                        </p>

                        <p className="text-sm text-gray-500">
                          AI Recommendation
                        </p>
                      </div>

                    </div>

                    <div className="mt-6 space-y-3">

                      {[
                        ["", "Preferred Location", "Mumbai"],
                        ["", "Property Type", "2 BHK"],
                        ["", "Budget", "₹50L - ₹80L"],
                      ].map(([icon, label, value]) => (

                        <div
                          key={label}
                          className="flex items-center justify-between rounded-xl bg-[#FAF6F0] p-3"
                        >

                          <div className="flex items-center gap-3">

                            <span>{icon}</span>

                            <span className="text-sm text-gray-500">
                              {label}
                            </span>

                          </div>

                          <span className="text-sm font-bold text-[#1A3A52]">
                            {value}
                          </span>

                        </div>

                      ))}

                    </div>

                    <div className="mt-5 rounded-xl bg-[#C9A961]/15 p-4 text-center">

                      <p className="text-sm font-semibold text-[#9B7E52]">
                         Great matches found for you
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= LOCATIONS ================= */}
      <section className="mx-auto max-w-7xl px-6 pb-24">

        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#C9A961]">
            Explore Locations
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#1A3A52]">
            Popular Locations
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Discover properties across some of the most popular cities.
          </p>

        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {[
            ["Mumbai", ""],
            ["Thane", ""],
            ["Navi Mumbai", ""],
            ["Pune", ""],
          ].map(([location, icon]) => (

            <Link
              key={location}
              href={`/properties?location=${encodeURIComponent(location)}`}
              className="group relative overflow-hidden rounded-3xl bg-[#1A3A52] p-7 text-white shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#C9A961]/20 transition duration-500 group-hover:scale-150" />

              <div className="relative">

                <span className="text-4xl">
                  {icon}
                </span>

                <h3 className="mt-5 text-2xl font-bold">
                  {location}
                </h3>

                <p className="mt-2 text-sm text-gray-300">
                  Explore properties →
                </p>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-[#E8C4B3]/30 px-6 py-20">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#9B7E52]">
            Start Your Journey
          </p>

          <h2 className="mt-4 text-4xl font-bold text-[#1A3A52] md:text-5xl">
            Ready to Find Your Dream Home?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            Explore premium properties, connect with experts and take the
            next step toward your perfect home.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <Link
              href="/properties"
              className="rounded-xl bg-[#1A3A52] px-8 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#0F1F2E]"
            >
              Browse Properties
            </Link>

            <Link
              href="/contact"
              className="rounded-xl border border-[#C9A961] bg-white px-8 py-3.5 font-semibold text-[#9B7E52] transition hover:bg-[#C9A961] hover:text-white"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}