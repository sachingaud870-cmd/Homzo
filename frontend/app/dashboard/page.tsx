"use client";

import Link from "next/link";
import { getUser } from "@/lib/auth";
import { useHydrated } from "@/lib/useHydrated";

export default function DashboardPage() {
  const isHydrated = useHydrated();
  const user = isHydrated ? getUser() : null;
  const role = user?.role || "BROKER";
  const isAdmin = role === "ADMIN";

  const cards = [
    {
      title: "Manage Properties",
      description:
        "Add, edit, and organize listings for your property portfolio.",
      href: "/dashboard/properties",
      icon: "",
      label: "Properties",
      accent: "rose",
    },
    {
      title: "Manage Leads",
      description:
        "Track enquiries, update lead status, and follow up with buyers.",
      href: "/dashboard/leads",
      icon: "",
      label: "CRM & Leads",
      accent: "gold",
    },
    {
      title: "My Profile",
      description:
        "Manage your account details and workspace preferences.",
      href: "/dashboard/profile",
      icon: "",
      label: "Account",
      accent: "peach",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[color:var(--background)] text-[color:var(--foreground)]">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#E8C4B3]/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-80 h-[450px] w-[450px] rounded-full bg-[#C9A961]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <section className="animate-fade-up">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-2">

                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B7E52]">
                  Workspace
                </span>

              </div>

              <h1 className="text-4xl font-bold tracking-tight text-[color:var(--foreground)] md:text-5xl">
                Welcome back,
                <span className="text-gradient">
                  {" "}
                  {user?.username || "Broker"}
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-[color:var(--muted)]">
                Manage your properties, leads, enquiries, and real estate
                operations from one powerful workspace.
              </p>

            </div>

            {/* Role Badge */}
            <div className="flex items-center gap-3 rounded-2xl border border-[#C9A961]/15 bg-[color:var(--card)]/80 px-5 py-4 shadow-sm backdrop-blur-xl">

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${
                  isAdmin
                    ? "bg-[#C9A961]/15"
                    : "bg-[#E8C4B3]/25"
                }`}
              >
                {isAdmin ? "" : ""}
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Access Level
                </p>

                <p className="mt-1 font-bold text-[color:var(--foreground)]">
                  {isAdmin ? "Administrator" : "Property Broker"}
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            QUICK STATS
        ====================================================== */}

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="glass-card animate-fade-up delay-100 p-5">

            <div className="flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8C4B3]/25 text-xl">

              </div>

              <span className="text-xs font-semibold text-emerald-600">
                Active
              </span>

            </div>

            <p className="mt-5 text-sm text-[color:var(--muted)]">
              Property Portfolio
            </p>

            <p className="mt-1 text-2xl font-bold text-[color:var(--foreground)]">
              Manage
            </p>

          </div>

          <div className="glass-card animate-fade-up delay-200 p-5">

            <div className="flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C9A961]/15 text-xl">

              </div>

              <span className="text-xs font-semibold text-[#9B7E52]">
                CRM
              </span>

            </div>

            <p className="mt-5 text-sm text-[color:var(--muted)]">
              Lead Management
            </p>

            <p className="mt-1 text-2xl font-bold text-[color:var(--foreground)]">
              Track
            </p>

          </div>

          <div className="glass-card animate-fade-up delay-300 p-5">

            <div className="flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4A574]/15 text-xl">

              </div>

              <span className="text-xs font-semibold text-blue-600">
                Follow-up
              </span>

            </div>

            <p className="mt-5 text-sm text-[color:var(--muted)]">
              Client Activities
            </p>

            <p className="mt-1 text-2xl font-bold text-[color:var(--foreground)]">
              Stay Organized
            </p>

          </div>

          <div className="glass-card animate-fade-up delay-400 p-5">

            <div className="flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-xl">

              </div>

              <span className="text-xs font-semibold text-emerald-600">
                Growth
              </span>

            </div>

            <p className="mt-5 text-sm text-[color:var(--muted)]">
              Workspace
            </p>

            <p className="mt-1 text-2xl font-bold text-[color:var(--foreground)]">
              Performance
            </p>

          </div>

        </section>

        {/* =====================================================
            MAIN ACTIONS
        ====================================================== */}

        <section className="mt-10">

          <div className="mb-5">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B7E52]">
              Quick Access
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[color:var(--foreground)]">
              Manage Your Workspace
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {cards.map((card, index) => (
              <Link
                key={card.href}
                href={card.href}
                className={`premium-card group animate-fade-up p-6 ${
                  index === 0
                    ? "delay-100"
                    : index === 1
                      ? "delay-200"
                      : "delay-300"
                }`}
              >

                {/* Icon */}
                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                      card.accent === "rose"
                        ? "bg-[#E8C4B3]/30"
                        : card.accent === "gold"
                          ? "bg-[#C9A961]/15"
                          : "bg-[#D4A574]/15"
                    }`}
                  >
                    {card.icon}
                  </div>

                  <span className="text-xl text-gray-300 transition duration-300 group-hover:translate-x-1 group-hover:text-[#C9A961]">
                    →
                  </span>

                </div>

                {/* Content */}
                <div className="mt-7">

                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#9B7E52]">
                    {card.label}
                  </span>

                  <h3 className="mt-2 text-2xl font-bold text-gray-900">
                    {card.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-500">
                    {card.description}
                  </p>

                </div>

                {/* Bottom line */}
                <div className="mt-6 h-px w-full bg-gray-100" />

                <div className="mt-4 flex items-center justify-between">

                  <span className="text-sm font-semibold text-gray-500 transition group-hover:text-[#9B7E52]">
                    Open workspace
                  </span>

                  <span className="text-[#C9A961] transition duration-300 group-hover:translate-x-2">
                    →
                  </span>

                </div>

              </Link>
            ))}

          </div>

        </section>

        {/* =====================================================
            ADMIN / BROKER SECTION
        ====================================================== */}

        <section className="mt-8 animate-fade-up delay-400">

          {isAdmin ? (

            <Link
              href="/dashboard/admin"
              className="group relative block overflow-hidden rounded-3xl border border-[#C9A961]/20 bg-gradient-to-br from-[#fffaf2] to-[#f5e8d7] p-7 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl md:p-8"
            >

              {/* Decorative circle */}
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#C9A961]/10 blur-2xl transition duration-500 group-hover:scale-125" />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div className="flex items-start gap-5">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#C9A961]/15 text-2xl">

                  </div>

                  <div>

                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B7E52]">
                      Administrator
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-gray-900">
                      Admin Control Center
                    </h2>

                    <p className="mt-2 max-w-2xl text-gray-500">
                      Monitor CRM activity, lead performance, properties,
                      and overall platform operations.
                    </p>

                  </div>

                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl text-[#C9A961] shadow-sm transition duration-300 group-hover:translate-x-2">
                  →
                </div>

              </div>

            </Link>

          ) : (

            <div className="relative overflow-hidden rounded-3xl border border-[#E8C4B3]/30 bg-gradient-to-br from-[#fffaf7] to-[#f8eee9] p-7 shadow-sm md:p-8">

              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#E8C4B3]/20 blur-3xl" />

              <div className="relative flex items-start gap-5">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E8C4B3]/30 text-2xl">

                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B7E52]">
                    Broker Workspace
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    Everything You Need in One Place
                  </h2>

                  <p className="mt-2 max-w-2xl leading-7 text-gray-500">
                    Focus on property performance, client enquiries,
                    lead management, and follow-ups from your personalized
                    Homzo workspace.
                  </p>

                </div>

              </div>

            </div>

          )}

        </section>

        {/* =====================================================
            FOOTER TIP
        ====================================================== */}

        <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-gray-400">

          <span></span>

          <span>
            Homzo — Smart Property Management
          </span>

          <span></span>

        </div>

      </div>

    </main>
  );
}
