"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSyncExternalStore } from "react";
import {
  Building2,
  House,
  LogIn,
  LogOut,
  Mail,
  Menu,
  Moon,
  Plus,
  Sparkles,
  Sun,
  UserPlus,
  X,
  LayoutDashboard,
} from "lucide-react";
import { getUser, logout, type StoredUser } from "@/lib/auth";
import { usePathname, useRouter } from "next/navigation";

type Theme = "dark" | "light";

const AUTH_CHANGE_EVENT = "auth-change";
const THEME_CHANGE_EVENT = "homzo-theme-change";

const navItems = [
  { href: "/about", label: "About", icon: House },
  { href: "/properties", label: "Properties", icon: Building2 },
  { href: "/#ai-finder", label: "AI Finder", icon: Sparkles },
  { href: "/contact", label: "Contact", icon: Mail },
];

function subscribeToAuth(onStoreChange: () => void) {
  window.addEventListener(AUTH_CHANGE_EVENT, onStoreChange);

  return () => window.removeEventListener(AUTH_CHANGE_EVENT, onStoreChange);
}

function getTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  try {
    const savedTheme = localStorage.getItem("homzo-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return "dark";
  } catch {
    return "dark";
  }
}

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
  };
}

function setThemePreference(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);

  try {
    localStorage.setItem("homzo-theme", theme);
  } catch {
    // Keep the in-memory page theme when storage is unavailable.
  }

  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const user = useSyncExternalStore<StoredUser | null>(subscribeToAuth, getUser, () => null);
  const theme = useSyncExternalStore<Theme>(subscribeToTheme, getTheme, () => "dark");
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  function handleLogout() {
    logout();
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
    router.push("/");
    setMobileOpen(false);
  }

  const toggleTheme = () => {
    setThemePreference(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`z-50 transition-all duration-500 [transition-timing-function:var(--ease-premium)] ${
        pathname === "/" ? "fixed inset-x-0 top-0" : "sticky top-0"
      } ${
        overHero
          ? "border-b border-transparent bg-transparent"
          : "border-b border-[color:var(--border)] bg-[color:var(--background)]/90 shadow-[var(--shadow-sm)] backdrop-blur-xl"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="HOMZO home"
          className={`inline-flex items-center gap-2 py-2 transition-colors ${
            overHero ? "text-white" : "text-[color:var(--heading)]"
          }`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--primary)]/40 bg-[color:var(--primary)]/10 text-[color:var(--primary-light)]">
            <House size={20} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <span className="flex flex-col text-[11px] font-medium leading-tight tracking-[0.24em]">
            HOMZO
            <span className="mt-0.5 text-[7px] tracking-[0.32em] opacity-65">REAL ESTATE</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                (item.href === "/#ai-finder"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`))
                  ? "page"
                  : undefined
              }
              className={`group relative py-2 text-sm font-medium transition-colors ${
                overHero ? "text-white/85 hover:text-white" : "text-[color:var(--muted)] hover:text-[color:var(--heading)]"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <item.icon size={15} strokeWidth={1.8} aria-hidden="true" />
                {item.label}
              </span>
              <span
                className={`absolute bottom-0 left-0 h-px w-full origin-left bg-[color:var(--primary)] transition-transform duration-300 ${
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition hover:border-[color:var(--primary)] ${
              overHero
                ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
                : "border-[color:var(--border)] bg-[color:var(--background-strong)] text-[color:var(--foreground)] hover:text-[color:var(--primary)]"
            }`}
            aria-label="Toggle day and night mode"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <>
              <span className="hidden text-sm font-medium text-[color:var(--muted)] md:inline-flex">
                {user.username}
                <span className="ml-1 text-[color:var(--primary)]">({user.role || "BROKER"})</span>
              </span>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] px-5 py-2.5 text-sm font-semibold text-[#101722] transition hover:-translate-y-0.5 hover:bg-[color:var(--primary-light)]"
              >
                <LayoutDashboard size={16} aria-hidden="true" />
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition hover:border-[color:var(--primary)] ${
                  overHero ? "border-white/30 bg-white/10 text-white" : "border-[color:var(--border)] bg-[color:var(--background-strong)] text-[color:var(--foreground)]"
                }`}
              >
                <LogOut className="mr-1 inline" size={15} aria-hidden="true" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition hover:border-[color:var(--primary)] ${
                  overHero ? "border-white/30 bg-white/10 text-white" : "border-[color:var(--border)] bg-[color:var(--background-strong)] text-[color:var(--foreground)]"
                }`}
              >
                <LogIn size={15} aria-hidden="true" />
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] px-5 py-2.5 text-sm font-semibold text-[#101722] transition hover:-translate-y-0.5 hover:bg-[color:var(--primary-light)]"
              >
                <UserPlus size={15} aria-hidden="true" />
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full border sm:hidden ${
            overHero ? "border-white/30 bg-white/10 text-white" : "border-[color:var(--border)] bg-[color:var(--background-strong)] text-[color:var(--foreground)]"
          }`}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={`grid overflow-hidden bg-[color:var(--background)]/95 backdrop-blur-xl transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-premium)] sm:hidden ${
          mobileOpen
            ? "grid-rows-[1fr] border-t border-[color:var(--border)] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={
                  (item.href === "/#ai-finder"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(`${item.href}/`))
                    ? "page"
                    : undefined
                }
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[color:var(--foreground)] transition hover:bg-[color:var(--background-soft)]"
              >
                <item.icon size={17} strokeWidth={1.8} aria-hidden="true" />
                {item.label}
              </Link>
            ))}

            {user && (
              <div className="space-y-1 border-t border-[color:var(--border)] pt-3">
                <p className="px-3 pb-1 text-xs font-medium text-[color:var(--muted)]">
                  Signed in as {user.username}
                </p>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-[color:var(--background-soft)]"
                >
                  <LayoutDashboard size={17} aria-hidden="true" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/properties"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[color:var(--foreground)] transition hover:bg-[color:var(--background-soft)]"
                >
                  <Building2 size={17} aria-hidden="true" />
                  My Properties
                </Link>
                <Link
                  href="/dashboard/properties/add"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[color:var(--foreground)] transition hover:bg-[color:var(--background-soft)]"
                >
                  <Plus size={17} aria-hidden="true" />
                  Add Property
                </Link>
                <Link
                  href="/dashboard/leads"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[color:var(--foreground)] transition hover:bg-[color:var(--background-soft)]"
                >
                  <Mail size={17} aria-hidden="true" />
                  My Leads
                </Link>
                <Link
                  href="/dashboard/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[color:var(--foreground)] transition hover:bg-[color:var(--background-soft)]"
                >
                  <House size={17} aria-hidden="true" />
                  My Profile
                </Link>
              </div>
            )}

            <div className="mt-2 flex items-center justify-between gap-2 border-t border-[color:var(--border)] pt-4">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--foreground)]"
                aria-label="Toggle day and night mode"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {!user ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-4 py-2 text-sm font-semibold"
                  >
                    <LogIn size={15} aria-hidden="true" />
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center gap-2 rounded-full bg-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-[#101722]"
                  >
                    <UserPlus size={15} aria-hidden="true" />
                    Register
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-full bg-[#ef4444] px-4 py-2 text-sm font-semibold text-white"
                >
                  <LogOut size={15} aria-hidden="true" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
