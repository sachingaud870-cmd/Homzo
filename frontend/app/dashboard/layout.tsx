"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getToken, getUser, logout } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const user = getUser();
  const role = user?.role || "BROKER";
  const isAdmin = role === "ADMIN";

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  function handleLogout() {
    logout();
    router.push("/");
  }

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: "📊",
    },
    {
      href: "/dashboard/properties",
      label: "My Properties",
      icon: "🏠",
    },
    {
      href: "/dashboard/leads",
      label: "My Leads",
      icon: "📩",
    },
    {
      href: "/dashboard/profile",
      label: "My Profile",
      icon: "👤",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0]">

      {/* =====================================================
          MOBILE TOP BAR
      ====================================================== */}

      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#C9A961]/10 bg-white/85 px-5 shadow-sm backdrop-blur-xl lg:hidden">

        <Link
          href="/dashboard"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          Prop<span className="text-[#C9A961]">Verse</span>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl transition hover:border-[#C9A961]/40 hover:bg-[#FAF6F0]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

      </header>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 z-30 border-b border-[#C9A961]/10 bg-white/95 p-4 shadow-xl backdrop-blur-xl lg:hidden">

          <nav className="space-y-2">

            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/dashboard" &&
                  pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                    active
                      ? "bg-[#E8C4B3]/20 text-[#9B7E52]"
                      : "text-gray-600 hover:bg-[#FAF6F0]"
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                href="/dashboard/admin"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                  pathname.startsWith("/dashboard/admin")
                    ? "bg-[#C9A961]/15 text-[#9B7E52]"
                    : "text-gray-600 hover:bg-[#FAF6F0]"
                }`}
              >
                <span>🛡️</span>
                Admin Panel
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="mt-3 flex w-full items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-left font-medium text-red-600 transition hover:bg-red-100"
            >
              🚪 Logout
            </button>

          </nav>

        </div>
      )}

      {/* =====================================================
          DESKTOP LAYOUT
      ====================================================== */}

      <div className="flex min-h-screen">

        {/* ===================================================
            SIDEBAR
        ==================================================== */}

        <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 border-r border-[#C9A961]/10 bg-white lg:block">

          <div className="flex h-full flex-col px-5 py-6">

            {/* Logo */}

            <Link
              href="/dashboard"
              className="group mb-10 block px-3"
            >

              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Prop<span className="text-[#C9A961]">Verse</span>
              </h1>

              <div className="mt-2 flex items-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A961]" />

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  {isAdmin ? "Admin CRM" : "Broker CRM"}
                </p>

              </div>

            </Link>

            {/* Workspace Card */}

            <div className="mb-6 rounded-2xl border border-[#E8C4B3]/20 bg-gradient-to-br from-[#fffaf7] to-[#f7eee9] p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8C4B3]/30 text-lg">
                  {isAdmin ? "🛡️" : "🤝"}
                </div>

                <div className="min-w-0">

                  <p className="truncate text-sm font-bold text-gray-800">
                    {user?.username || "Broker"}
                  </p>

                  <p className="mt-0.5 text-xs text-gray-500">
                    {isAdmin ? "Administrator" : "Property Broker"}
                  </p>

                </div>

              </div>

            </div>

            {/* Navigation Label */}

            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Workspace
            </p>

            {/* Navigation */}

            <nav className="space-y-1.5">

              {navItems.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 ${
                      active
                        ? "bg-gradient-to-r from-[#E8C4B3]/25 to-[#C9A961]/5 text-[#9B7E52] shadow-sm"
                        : "text-gray-500 hover:bg-[#FAF6F0] hover:text-gray-800"
                    }`}
                  >

                    {/* Active indicator */}

                    {active && (
                      <span className="absolute left-0 h-6 w-1 rounded-r-full bg-[#C9A961]" />
                    )}

                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg text-base transition duration-300 ${
                        active
                          ? "bg-white shadow-sm"
                          : "bg-gray-50 group-hover:bg-white"
                      }`}
                    >
                      {item.icon}
                    </span>

                    <span>{item.label}</span>

                    {active && (
                      <span className="ml-auto text-[#C9A961]">
                        →
                      </span>
                    )}

                  </Link>
                );
              })}

            </nav>

            {/* Admin */}

            {isAdmin && (
              <div className="mt-7">

                <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Administration
                </p>

                <Link
                  href="/dashboard/admin"
                  className={`group flex items-center gap-3 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                    pathname.startsWith("/dashboard/admin")
                      ? "border-[#C9A961]/30 bg-[#C9A961]/10 text-[#9B7E52]"
                      : "border-[#C9A961]/10 bg-[#C9A961]/5 text-[#9B7E52] hover:border-[#C9A961]/25 hover:bg-[#C9A961]/10"
                  }`}
                >

                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                    🛡️
                  </span>

                  <span>Admin Panel</span>

                  <span className="ml-auto text-xs">
                    →
                  </span>

                </Link>

              </div>
            )}

            {/* Spacer */}

            <div className="flex-1" />

            {/* Premium Info */}

            <div className="mb-4 rounded-2xl bg-gradient-to-br from-[#2f2722] to-[#4a3a2d] p-4 text-white shadow-lg">

              <div className="flex items-center gap-2">

                <span className="text-lg">✦</span>

                <span className="text-sm font-bold">
                  PropVerse
                </span>

              </div>

              <p className="mt-2 text-xs leading-5 text-white/60">
                Smart property management for modern real estate professionals.
              </p>

            </div>

            {/* Logout */}

            <button
              onClick={handleLogout}
              className="group flex w-full items-center gap-3 rounded-xl border border-red-100 bg-red-50 px-3 py-3 text-left text-sm font-semibold text-red-600 transition duration-300 hover:border-red-200 hover:bg-red-100"
            >

              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm transition group-hover:scale-105">
                🚪
              </span>

              <span>Logout</span>

              <span className="ml-auto opacity-50 transition group-hover:translate-x-1">
                →
              </span>

            </button>

          </div>

        </aside>

        {/* ===================================================
            MAIN CONTENT
        ==================================================== */}

        <main className="min-w-0 flex-1">

          {/* Desktop Top Bar */}

          <div className="hidden h-16 items-center justify-between border-b border-[#C9A961]/10 bg-white/60 px-8 backdrop-blur-xl lg:flex">

            <div>

              <p className="text-xs font-medium text-gray-400">
                PropVerse Workspace
              </p>

            </div>

            <div className="flex items-center gap-3">

              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

              <span className="text-xs font-medium text-gray-500">
                System Online
              </span>

            </div>

          </div>

          {/* Page */}

          <div className="p-5 md:p-8 lg:p-10">
            {children}
          </div>

        </main>

      </div>
    </div>
  );
}