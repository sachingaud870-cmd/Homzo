import Image from "next/image";
import { getProperties } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";
import Hero from "@/components/home/Hero";
import AIRecommendations from "@/components/home/AIRecommendations";
import Link from "next/link";
import { Suspense } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CarFront,
  ChartNoAxesCombined,
  ChevronRight,
  CircleCheck,
  Dumbbell,
  House,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Waves,
  Wifi,
} from "lucide-react";

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

const benefits = [
  {
    icon: Search,
    number: "01",
    title: "Smart Discovery",
    description:
      "Search properties by location, configuration, budget and lifestyle preferences.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Verified Listings",
    description:
      "Explore professionally managed property information designed for confident decisions.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "AI Recommendations",
    description:
      "Discover property options intelligently matched to your requirements.",
  },
  {
    icon: UsersRound,
    number: "04",
    title: "Expert Assistance",
    description:
      "Get connected with experienced real-estate professionals when you need them.",
  },
];

const amenities = [
  {
    icon: Dumbbell,
    title: "Fitness Centre",
    description: "Dedicated wellness spaces for an active lifestyle.",
  },
  {
    icon: Waves,
    title: "Swimming Pool",
    description: "Relax and recharge in beautifully designed spaces.",
  },
  {
    icon: CarFront,
    title: "Smart Parking",
    description: "Convenient parking solutions for modern residences.",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Security",
    description: "A secure environment for residents and families.",
  },
  {
    icon: Wifi,
    title: "Smart Living",
    description: "Modern connectivity and technology-ready homes.",
  },
  {
    icon: House,
    title: "Premium Homes",
    description: "Thoughtfully designed residences for elevated living.",
  },
];

const locations = [
  {
    name: "Mumbai",
    description: "Premium residences across Mumbai.",
    image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Thane",
    description: "Modern communities in Thane.",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Navi Mumbai",
    description: "Emerging destinations for modern living.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Pune",
    description: "Homes across Pune's growing neighbourhoods.",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[color:var(--background)] text-[color:var(--foreground)]">

      {/* =========================================================
          HERO
      ========================================================= */}

      <Hero />

      {/* =========================================================
          FEATURED PROPERTIES
      ========================================================= */}

      <section id="featured-properties" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-16">

        <ScrollReveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

          <div className="max-w-3xl">

            <div className="mb-5 flex items-center gap-3">

              <span className="h-px w-12 bg-[color:var(--primary)]" />

              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--primary)]">
                Signature Collection
              </span>

            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.045em] text-[color:var(--heading)] sm:text-5xl lg:text-6xl">

              Discover spaces

              <span className="block font-normal italic text-[color:var(--accent-light)] [font-family:var(--font-display)]">
                Worth Coming Home To.
              </span>

            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              Explore handpicked residences, premium developments and
              investment opportunities in some of the most sought-after
              locations.
            </p>

          </div>

          <Link
            href="/properties"
            className="group inline-flex w-fit items-center gap-2 border-b border-[color:var(--border-strong)] py-3 text-sm font-semibold text-[color:var(--heading)] transition-all duration-300 hover:border-[color:var(--accent)]"
          >

            View All Properties

            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </Link>

        </ScrollReveal>

        <Suspense fallback={<FeaturedPropertiesFallback />}>
          <FeaturedProperties />
        </Suspense>

      </section>

      {/* =========================================================
          WHY HOMZO
      ========================================================= */}

      <section id="why-homzo" className="relative overflow-hidden bg-[color:var(--background-soft)] py-20 md:py-28">

        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[color:var(--primary)]/5 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[color:var(--accent)]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <ScrollReveal className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

            <div>

              <div className="mb-5 flex items-center gap-3">

                <span className="h-px w-12 bg-[color:var(--primary)]" />

                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--primary)]">
                  Why HOMZO
                </span>

              </div>

              <h2 className="text-4xl font-bold tracking-tight text-[color:var(--heading)] sm:text-5xl">

                Real Estate,

                <span className="block text-[color:var(--primary)]">
                  Reimagined.
                </span>

              </h2>

            </div>

            <p className="max-w-2xl text-base leading-8 text-[color:var(--muted)]">
              HOMZO brings property discovery, intelligent recommendations
              and expert assistance together in one refined experience.
            </p>

          </ScrollReveal>

          <div className="mt-14 grid border-t border-[color:var(--border)] sm:grid-cols-2 lg:grid-cols-4">

            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <ScrollReveal
                  key={item.title}
                  className="group relative border-b border-[color:var(--border)] px-2 py-7 transition-colors duration-300 hover:bg-[color:var(--surface-hover)] sm:px-5 lg:border-r lg:last:border-r-0"
                  delay={(Number(item.number) - 1) * 0.06}
                >

                  {/* Decorative glow */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[color:var(--primary)]/5 blur-2xl transition-all duration-500 group-hover:bg-[color:var(--primary)]/15" />

                  <div className="relative">

                    <div className="flex items-center justify-between">

                      <div className="flex h-11 w-11 items-center justify-center text-[color:var(--primary)] transition-colors duration-300 group-hover:text-[color:var(--accent-light)]">

                        <Icon
                          size={24}
                          strokeWidth={1.6}
                        />

                      </div>

                      <span className="text-xs font-bold tracking-widest text-[color:var(--muted)]">
                        {item.number}
                      </span>

                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-[color:var(--heading)] transition-transform duration-300 group-hover:translate-x-1">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                      {item.description}
                    </p>

                    <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-[color:var(--primary)]">

                      Explore

                      <ChevronRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />

                    </div>

                  </div>

                </ScrollReveal>
              );
            })}

          </div>

        </div>

      </section>

      <section className="mx-auto max-w-[1440px] px-5 pt-12 sm:px-8 lg:px-16">
        <AIRecommendations />
      </section>

      {/* =========================================================
          LIFESTYLE / AMENITIES
      ========================================================= */}

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 md:py-28 lg:px-16">

        <ScrollReveal className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

        <ScrollReveal>

            <div className="mb-5 flex items-center gap-3">

              <span className="h-px w-12 bg-[color:var(--primary)]" />

              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--primary)]">
                Elevated Lifestyle
              </span>

            </div>

            <h2 className="text-4xl font-bold tracking-tight text-[color:var(--heading)] sm:text-5xl">

              Designed Around

              <span className="block text-[color:var(--primary)]">
                The Way You Live.
              </span>

            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[color:var(--muted)]">
              Discover residences and communities where thoughtful design,
              modern amenities and everyday convenience come together.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <div className="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm text-[color:var(--muted)]">
                <CircleCheck
                  size={16}
                  className="text-[color:var(--primary)]"
                />
                Premium Communities
              </div>

              <div className="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm text-[color:var(--muted)]">
                <CircleCheck
                  size={16}
                  className="text-[color:var(--primary)]"
                />
                Modern Amenities
              </div>

            </div>

          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-2">

            {amenities.map((item) => {
              const Icon = item.icon;

              return (
                <ScrollReveal
                  key={item.title}
                  className="group rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--border-hover)] hover:shadow-[var(--shadow-md)]"
                  delay={amenities.indexOf(item) * 0.05}
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--primary)]/10 text-[color:var(--primary)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[color:var(--primary)] group-hover:text-[color:var(--on-primary)]">

                    <Icon
                      size={22}
                      strokeWidth={1.6}
                    />

                  </div>

                  <h3 className="mt-6 text-lg font-bold text-[color:var(--heading)]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    {item.description}
                  </p>

                </ScrollReveal>
              );
            })}

          </div>

          </ScrollReveal>

      </section>

      {/* =========================================================
          AI PROPERTY MATCH
      ========================================================= */}

      <section className="px-4 py-10 sm:px-6 lg:px-8">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-[color:var(--border)] bg-[color:var(--panel-solid)] shadow-[var(--shadow-lg)]">

          <div className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[color:var(--primary)]/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[30rem] w-[30rem] rounded-full bg-[color:var(--accent)]/10 blur-3xl" />

          <div className="relative grid items-center gap-14 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">

            <div>

              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--primary)]">

                <Sparkles size={15} />

                AI Powered

              </span>

              <h2 className="mt-7 text-4xl font-bold leading-tight text-[color:var(--heading)] sm:text-5xl">

                Your Requirements.

                <span className="block text-[color:var(--primary)]">
                  Your Perfect Match.
                </span>

              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-[color:var(--muted)]">
                Tell HOMZO about your preferred location, budget and
                configuration. Discover properties that align with what
                actually matters to you.
              </p>

              <Link
                href="/properties"
                className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-[color:var(--primary)] px-7 py-4 font-bold text-[color:var(--on-primary)] shadow-[var(--shadow-gold)] transition-all duration-300 hover:-translate-y-1"
              >

                Explore Properties

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />

              </Link>

            </div>

            {/* AI CARD */}

            <div className="relative">

              <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-4 backdrop-blur-xl sm:p-6">

                <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-[var(--shadow-md)]">

                  <div className="flex items-center gap-4">

                    <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[color:var(--primary)]/10 text-[color:var(--primary)]">

                      <ChartNoAxesCombined size={24} />

                    </div>

                    <div>

                      <p className="font-bold text-[color:var(--heading)]">
                        Property Match
                      </p>

                      <p className="text-sm text-[color:var(--muted)]">
                        Personalized recommendation
                      </p>

                    </div>

                  </div>

                  <div className="mt-7 space-y-3">

                    {[
                      {
                        icon: MapPin,
                        label: "Preferred Location",
                        value: "Mumbai",
                      },
                      {
                        icon: House,
                        label: "Configuration",
                        value: "2 BHK",
                      },
                      {
                        icon: ChartNoAxesCombined,
                        label: "Budget",
                        value: "₹50L - ₹80L",
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className="flex items-center justify-between gap-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4"
                        >

                          <div className="flex items-center gap-3">

                            <Icon
                              size={17}
                              className="text-[color:var(--primary)]"
                            />

                            <span className="text-sm text-[color:var(--muted)]">
                              {item.label}
                            </span>

                          </div>

                          <span className="text-sm font-bold text-[color:var(--heading)]">
                            {item.value}
                          </span>

                        </div>
                      );
                    })}

                  </div>

                  <div className="mt-5 flex items-center gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--primary)]/10 p-4">

                    <CircleCheck
                      size={20}
                      className="shrink-0 text-[color:var(--primary)]"
                    />

                    <div>

                      <p className="text-sm font-bold text-[color:var(--heading)]">
                        Strong Match Found
                      </p>

                      <p className="mt-1 text-xs text-[color:var(--muted)]">
                        Based on your selected requirements.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          LOCATIONS
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">

          <ScrollReveal className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">

              <span className="h-px w-12 bg-[color:var(--primary)]" />

              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[color:var(--primary)]">
                Destinations
              </span>

            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.045em] text-[color:var(--heading)] sm:text-5xl">
              Find your place.
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-[color:var(--muted)]">
              Explore homes across established neighbourhoods and emerging
              destinations.
            </p>

          </ScrollReveal>

          <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">

          {locations.map((location, index) => (

            <ScrollReveal
              key={location.name}
              className={`min-w-[78vw] snap-start sm:min-w-0 ${index === 0 ? "lg:col-span-2" : ""}`}
              delay={index * 0.07}
            >
            <Link
              href={`/properties?location=${encodeURIComponent(location.name)}`}
              className="group relative isolate flex min-h-[340px] h-full items-end overflow-hidden rounded-lg bg-[#222] p-6 text-white transition-transform duration-500 hover:-translate-y-1 sm:p-7"
            >
              <Image
                src={location.image}
                alt={`${location.name} city and residential architecture`}
                fill
                sizes={index === 0 ? "(min-width: 1024px) 50vw, 80vw" : "(min-width: 640px) 40vw, 80vw"}
                className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-colors group-hover:from-black/85" />
              <div className="relative">
                <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  0{index + 1} / 04
                </span>
                <h3 className="text-2xl font-semibold text-white">
                  {location.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/80">
                  {location.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-white">
                  Explore

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </div>

              </div>

            </Link>
            </ScrollReveal>

          ))}

        </div>

      </section>

      {/* =========================================================
          CONTACT STRIP
      ========================================================= */}

      <section className="border-y border-[color:var(--border)] bg-[color:var(--background-soft)]">

        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">

          <div className="flex items-center gap-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
              <Phone size={21} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-[color:var(--muted)]">
                Need Assistance?
              </p>

              <p className="mt-1 font-bold text-[color:var(--heading)]">
                Talk to an Expert
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
              <MessageCircle size={21} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-[color:var(--muted)]">
                Have a Requirement?
              </p>

              <p className="mt-1 font-bold text-[color:var(--heading)]">
                Send an Enquiry
              </p>
            </div>

          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[color:var(--primary)]/10 text-[color:var(--primary)]">
              <BadgeCheck size={21} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-[color:var(--muted)]">
                Looking for Quality?
              </p>

              <p className="mt-1 font-bold text-[color:var(--heading)]">
                Explore Verified Homes
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="relative isolate overflow-hidden bg-[#111] px-5 py-24 sm:px-8 md:py-32 lg:px-16">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=75"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,10,10,0.84),rgba(10,10,10,0.48)),linear-gradient(0deg,rgba(10,10,10,0.55),transparent)]" />

        <ScrollReveal className="relative mx-auto max-w-4xl text-center text-white">

          <div className="mb-6 flex items-center justify-center gap-3">

            <span className="h-px w-12 bg-[#c5a981]" />

            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#ead8bd]">
              Your Next Chapter
            </span>

            <span className="h-px w-12 bg-[#c5a981]" />

          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">

            Your Next Home

            <span className="block font-normal italic text-[#ead8bd] [font-family:var(--font-display)]">
              Starts Here.
            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/85">
            Explore premium properties, discover new possibilities and connect
            with the right people to make your real-estate journey simpler.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/properties"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-semibold text-[#111] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f2eee7]"
            >

              Browse Properties

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />

            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/50 bg-white/5 px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >

              <MessageCircle size={18} />

              Contact HOMZO

            </Link>

          </div>

        </ScrollReveal>

      </section>

    </main>
  );
}

async function FeaturedProperties() {
  const properties: Property[] = await getProperties();
  const featuredProperties = properties.slice(0, 4);

  if (featuredProperties.length === 0) {
    return (
      <div className="mt-14 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)] p-14 text-center shadow-[var(--shadow-md)] sm:p-20">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--primary)]">
          <Building2 size={30} aria-hidden="true" />
        </div>
        <h3 className="mt-6 text-2xl font-bold text-[color:var(--heading)]">
          Properties Coming Soon
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[color:var(--muted)]">
          We are preparing a collection of premium properties for you.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">
      {featuredProperties.map((property, index) => (
        <ScrollReveal key={property.id} delay={index * 0.06}>
          <PropertyCard property={property} />
        </ScrollReveal>
      ))}
    </div>
  );
}

function FeaturedPropertiesFallback() {
  return (
    <div
      aria-label="Loading featured properties"
      aria-busy="true"
      className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6"
    >
      {[0, 1, 2, 3].map((item) => (
        <div
          key={item}
          className="h-72 animate-pulse rounded-2xl bg-[color:var(--background-soft)]"
        />
      ))}
    </div>
  );
}