import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Compass,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Zap,
} from "lucide-react";

const stats = [
  { value: "500+", label: "Curated homes" },
  { value: "100+", label: "Verified developers" },
  { value: "50+", label: "Prime locations" },
  { value: "24/7", label: "Property guidance" },
];

const pillars = [
  {
    icon: Compass,
    title: "Property Discovery",
    description:
      "Explore premium residences and emerging opportunities with clarity, confidence, and context.",
  },
  {
    icon: Sparkles,
    title: "AI Property Finder",
    description:
      "Get recommendations aligned with your lifestyle, budget and long-term investment goals.",
  },
  {
    icon: Building2,
    title: "Builder Intelligence",
    description:
      "Compare trusted developers, project quality and neighborhood performance at a glance.",
  },
  {
    icon: ShieldCheck,
    title: "Lead & CRM Tools",
    description:
      "Support buyers, agents and advisors with seamless workflows and smarter follow-ups.",
  },
];

const promisePoints = [
  "Premium property intelligence platform",
  "Curated for buyers, investors and developers",
  "Designed for confident decisions",
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[color:var(--background)] text-[color:var(--foreground)]">
      <div className="pointer-events-none absolute left-[-100px] top-16 h-72 w-72 rounded-full bg-[#D8C8AD]/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-150px] top-[450px] h-[420px] w-[420px] rounded-full bg-[#B69A72]/10 blur-3xl" />

      <section className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-16 sm:px-8 lg:px-16 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] xl:gap-16">
          <div className="homzo-reveal">
            <div className="inline-flex items-center gap-3 rounded-full border border-[color:var(--border)] bg-[color:var(--card)]/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)] backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[color:var(--primary)]" />
              Curated living
            </div>

            <h1 className="mt-7 max-w-xl text-5xl font-semibold tracking-[-0.065em] text-[color:var(--heading)] sm:text-6xl lg:text-[5.25rem]">
              Discover a home that feels
              <span className="font-editorial block italic text-[color:var(--primary-light)]">
                truly yours.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
              Discover premium residences, trusted developers and smart investment
              opportunities in the most coveted locations — all shaped around how
              modern buyers and investors actually decide.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {promisePoints.map((point) => (
                <span
                  key={point}
                  className="rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-3.5 py-2 text-sm text-[color:var(--muted-strong)]"
                >
                  {point}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/properties"
                className="btn btn-primary rounded-xl px-6 py-3.5"
              >
                Explore Properties
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="btn btn-secondary rounded-xl px-6 py-3.5"
              >
                Find My Property
              </Link>
            </div>

            <div className="mt-10 rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 p-3 shadow-[var(--shadow-md)] backdrop-blur-sm">
              <div className="grid gap-3 md:grid-cols-[1.2fr_1fr_1fr_auto]">
                <label className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/80 px-4 py-3 text-left">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Location
                  </span>
                  <span className="mt-2 flex items-center gap-2 text-sm font-medium text-[color:var(--heading)]">
                    <MapPin size={14} className="text-[color:var(--primary)]" />
                    Mumbai
                  </span>
                </label>

                <label className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/80 px-4 py-3 text-left">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    BHK
                  </span>
                  <span className="mt-2 block text-sm font-medium text-[color:var(--heading)]">
                    3 BHK
                  </span>
                </label>

                <label className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/80 px-4 py-3 text-left">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Budget
                  </span>
                  <span className="mt-2 block text-sm font-medium text-[color:var(--heading)]">
                    ₹1.8 Cr
                  </span>
                </label>

                <button
                  type="button"
                  className="btn btn-primary rounded-2xl px-5 py-3.5 text-sm"
                >
                  <Search size={16} />
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="relative homzo-reveal homzo-reveal-delay-1">
            <div className="absolute -inset-5 rounded-[2.2rem] bg-gradient-to-br from-[#D8C8AD]/30 via-transparent to-[#B69A72]/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)] p-3 shadow-[var(--shadow-lg)]">
              <div className="relative h-[520px] overflow-hidden rounded-[1.5rem] sm:h-[620px]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Contemporary luxury residence"
                  className="homzo-hero-image h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                <div className="absolute right-6 top-6 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm">
                  Premium residences
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="mb-3 flex items-center gap-2 text-sm text-white/80">
                    <Zap size={15} className="text-[#D8C8AD]" />
                    Smart property intelligence
                  </div>
                  <h2 className="max-w-xs text-3xl font-medium tracking-[-0.05em] text-white sm:text-4xl">
                    Technology that helps you choose better.
                  </h2>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 left-5 hidden w-[240px] rounded-[1.25rem] border border-[color:var(--border)] bg-[color:var(--panel-solid)]/90 p-4 shadow-[var(--shadow-md)] backdrop-blur-sm md:block">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D8C8AD]/20 text-[color:var(--primary)]">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
                    Intelligent
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[color:var(--heading)]">
                    AI Recommendations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1440px] px-5 pb-12 sm:px-8 lg:px-16">
        <div className="grid overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)]/80 shadow-[var(--shadow-md)] md:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={item.label}
              className={
                index !== 3
                  ? "border-b border-[color:var(--border)] p-7 md:border-b-0 md:border-r"
                  : "p-7"
              }
            >
              <div className="text-3xl font-semibold tracking-[-0.05em] text-[color:var(--heading)] sm:text-4xl">
                {item.value}
              </div>
              <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-16 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-12 bg-[color:var(--primary)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[color:var(--primary)]">
              What drives us
            </span>
          </div>
          <h2 className="text-4xl font-semibold tracking-[-0.06em] text-[color:var(--heading)] sm:text-5xl xl:text-6xl">
            Built around people,
            <span className="block font-editorial italic text-[color:var(--primary-light)]">
              powered by technology.
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            Property decisions can be complicated. Homzo is designed to simplify the
            journey with clear data, human guidance and the confidence to move faster.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map(({ icon: Icon, title, description }) => (
            <div key={title} className="premium-card group p-6 sm:p-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D8C8AD]/18 text-[color:var(--primary)] transition duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <Icon size={22} />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-[color:var(--heading)]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)] sm:text-[15px]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-16 lg:pb-28">
        <div className="overflow-hidden rounded-[2.2rem] bg-[#151515] p-6 text-white shadow-[var(--shadow-lg)] sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-full border border-[#D8C8AD]/20 bg-[#D8C8AD]/8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D8C8AD]">
                Intelligent property technology
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-[-0.06em] text-white sm:text-5xl xl:text-[4rem]">
                Property search,
                <span className="block text-[#D8C8AD]">reimagined.</span>
              </h2>
              <p className="mt-5 max-w-lg text-base leading-8 text-white/70 sm:text-lg">
                Homzo brings together a richer property view, performance-led insights
                and human expertise to support smarter decisions in a more complex market.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Search, title: "Smart Search" },
                { icon: UsersRound, title: "Buyer Guidance" },
                { icon: MapPin, title: "Neighborhood Intelligence" },
                { icon: ShieldCheck, title: "Trust & Transparency" },
              ].map(({ icon: Icon, title }) => (
                <div
                  key={title}
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D8C8AD]/12 text-[#D8C8AD]">
                    <Icon size={20} />
                  </div>
                  <p className="mt-4 text-lg font-semibold text-white">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[620px] px-5 pb-24 pt-4 text-center sm:px-8 lg:px-16 lg:pb-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[color:var(--primary)]">
          Start your journey
        </div>
        <h2 className="mt-6 text-4xl font-semibold tracking-[-0.06em] text-[color:var(--heading)] sm:text-5xl lg:text-[4rem]">
          Your next property
          <span className="font-editorial block italic text-[color:var(--primary-light)]">starts here.</span>
        </h2>
        <p className="mt-5 text-base leading-8 text-[color:var(--muted)] sm:text-lg">
          Explore properties, compare neighborhoods and connect with the right advisors
          to make a smarter real-estate decision with confidence.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/properties" className="btn btn-primary rounded-xl px-6 py-3.5">
            Explore Properties
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/contact"
            className="btn btn-secondary rounded-xl px-6 py-3.5"
          >
            Talk to Homzo
          </Link>
        </div>
      </section>
    </main>
  );
}
