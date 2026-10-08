"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSyncExternalStore } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { getUser, logout, type StoredUser } from "@/lib/auth";
import { usePathname, useRouter } from "next/navigation";

type Theme = "dark" | "light";

const AUTH_CHANGE_EVENT = "auth-change";
const THEME_CHANGE_EVENT = "homzo-theme-change";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/properties", label: "Properties" },
  { href: "/#ai-finder", label: "AI Finder" },
  { href: "/contact", label: "Contact" },
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
          <span className="font-editorial text-3xl leading-none text-[color:var(--primary-light)]">H</span>
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
              className={`group relative py-2 text-sm font-medium transition-colors ${
                overHero ? "text-white/85 hover:text-white" : "text-[color:var(--muted)] hover:text-[color:var(--heading)]"
              }`}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[color:var(--primary)] transition-transform duration-300 group-hover:scale-x-100" />
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
                className="rounded-full bg-[color:var(--primary)] px-5 py-2.5 text-sm font-semibold text-[#101722] transition hover:-translate-y-0.5 hover:bg-[color:var(--primary-light)]"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition hover:border-[color:var(--primary)] ${
                  overHero ? "border-white/30 bg-white/10 text-white" : "border-[color:var(--border)] bg-[color:var(--background-strong)] text-[color:var(--foreground)]"
                }`}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition hover:border-[color:var(--primary)] ${
                  overHero ? "border-white/30 bg-white/10 text-white" : "border-[color:var(--border)] bg-[color:var(--background-strong)] text-[color:var(--foreground)]"
                }`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[color:var(--primary)] px-5 py-2.5 text-sm font-semibold text-[#101722] transition hover:-translate-y-0.5 hover:bg-[color:var(--primary-light)]"
              >
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
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-[color:var(--border)] bg-[color:var(--background)]/95 backdrop-blur-xl sm:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-[color:var(--foreground)] transition hover:bg-[color:var(--background-soft)]"
              >
                {item.label}
              </Link>
            ))}

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
                    className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full bg-[color:var(--primary)] px-4 py-2 text-sm font-semibold text-[#101722]"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="rounded-full bg-[#ef4444] px-4 py-2 text-sm font-semibold text-white"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
