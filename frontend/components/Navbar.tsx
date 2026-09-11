"use client";

import Link from "next/link";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { getUser, logout, type StoredUser } from "@/lib/auth";
import { useRouter } from "next/navigation";


type Theme = "dark" | "light";

const AUTH_CHANGE_EVENT = "auth-change";
const THEME_CHANGE_EVENT = "homzo-theme-change";

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

    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
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

  const user = useSyncExternalStore<StoredUser | null>(
    subscribeToAuth,
    getUser,
    () => null,
  );
  const theme = useSyncExternalStore<Theme>(
    subscribeToTheme,
    getTheme,
    () => "dark",
  );



  function handleLogout() {

    logout();

    window.dispatchEvent(
      new Event(AUTH_CHANGE_EVENT)
    );


    router.push("/");

  }



  const toggleTheme = () => {
    setThemePreference(theme === "dark" ? "light" : "dark");
  };

  return (

    <nav className="flex flex-col gap-3 border-b border-[color:var(--accent)]/40 bg-[color:var(--background-strong)] px-3 py-3 shadow-[0_0_24px_rgba(212,175,109,0.14)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-12">


      {/* Logo and Brand */}

      <Link
        href="/"
        className="group self-center rounded-xl border border-[color:var(--accent)]/70 bg-[color:var(--background)] p-2 shadow-[0_0_18px_rgba(212,175,109,0.18)] transition hover:shadow-[0_0_22px_rgba(212,175,109,0.24)] sm:self-auto"
      >
        <Image
          src="/images/logo.png"
          alt="Homzo Logo"
          width={220}
          height={90}
          priority
          style={{ height: "auto" }}
          className="h-auto w-[180px] object-contain transition-transform duration-300 group-hover:scale-[1.02] sm:w-[220px]"
        />
      </Link>



      {/* Menu */}

      <div className="hidden lg:flex gap-10 text-[color:var(--accent-light)]">

        <Link href="/" className="font-medium text-[color:var(--accent-light)] hover:text-[color:var(--primary-light)] transition relative group">
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[color:var(--primary-dark)] to-[color:var(--accent-light)] group-hover:w-full transition-all"></span>
        </Link>


        <Link href="/properties" className="font-medium text-[color:var(--accent-light)] hover:text-[color:var(--primary-light)] transition relative group">
          Properties
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[color:var(--primary-dark)] to-[color:var(--accent-light)] group-hover:w-full transition-all"></span>
        </Link>


        <Link href="/about" className="font-medium text-[color:var(--accent-light)] hover:text-[color:var(--primary-light)] transition relative group">
          About
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[color:var(--primary-dark)] to-[color:var(--accent-light)] group-hover:w-full transition-all"></span>
        </Link>


        <Link href="/contact" className="font-medium text-[color:var(--accent-light)] hover:text-[color:var(--primary-light)] transition relative group">
          Contact
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[color:var(--primary-dark)] to-[color:var(--accent-light)] group-hover:w-full transition-all"></span>
        </Link>

      </div>



      {/* Login / User */}

      <div className="w-full sm:w-auto">

        {
          user ? (

            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end sm:gap-3">

              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--accent)]/50 bg-[color:var(--background-strong)] text-lg text-[color:var(--accent-light)] shadow-[0_0_18px_rgba(212,175,109,0.14)] transition duration-300 hover:border-[color:var(--accent)] hover:text-[color:var(--primary-light)] hover:scale-105 hover:shadow-[0_0_18px_rgba(212,175,109,0.35)]"
                aria-label="Toggle day and night mode"
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
              </button>

              <span className="text-sm font-medium text-[color:var(--foreground)]">
                {user.username} <span className="text-[color:var(--accent-light)]">({user.role || "BROKER"})</span>
              </span>

              <Link href="/dashboard" className="rounded-lg bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] px-5 py-2 text-sm font-medium text-[#1b1b1b] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]">
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-[#ef4444] px-4 py-2 text-white text-sm font-medium transition hover:bg-[#dc2626]"
              >
                Logout
              </button>


            </div>


          ) : (

            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end sm:gap-3">

              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--accent)]/50 bg-[color:var(--background-strong)] text-lg text-[color:var(--accent-light)] shadow-[0_0_18px_rgba(212,175,109,0.14)] transition duration-300 hover:border-[color:var(--accent)] hover:text-[color:var(--primary-light)] hover:scale-105 hover:shadow-[0_0_18px_rgba(212,175,109,0.35)]"
                aria-label="Toggle day and night mode"
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
              </button>

              <Link
                href="/about"
                className="rounded-lg border-2 border-[color:var(--accent)] bg-[color:var(--background-strong)] px-5 py-2 text-sm font-medium text-[color:var(--accent-light)] transition hover:bg-[color:var(--primary-light)] hover:text-[#1b1b1b] hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
              >
                About
              </Link>

              <Link
                href="/login"
                className="rounded-lg border-2 border-[color:var(--accent)] bg-[color:var(--background-strong)] px-5 py-2 text-sm font-medium text-[color:var(--accent-light)] transition hover:bg-[color:var(--primary-light)] hover:text-[#1b1b1b] hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--accent)] px-5 py-2 text-sm font-medium text-[#1b1b1b] shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-hover)]"
              >
                Register
              </Link>

            </div>

          )

        }

      </div>


    </nav>

  );

}
