"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Invalid username or password.");
        return;
      }

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      localStorage.setItem(
        "user",
        JSON.stringify({
          username,
          role: data.role || "BROKER",
        })
      );

      window.dispatchEvent(new Event("auth-change"));

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[color:var(--background)] px-6 py-12 text-[color:var(--foreground)]">

      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#E8C4B3]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#C9A961]/20 blur-3xl" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-up">

        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold tracking-tight text-[color:var(--foreground)]">
              Hom<span className="text-[#C9A961]">zo</span>
            </h1>
          </Link>

          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Luxury homes. Smarter decisions.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)]/85 p-8 shadow-2xl backdrop-blur-xl md:p-10">

          <div className="mb-8">
            <span className="badge-premium">
               Welcome Back
            </span>

            <h2 className="mt-5 text-3xl font-bold text-[color:var(--foreground)]">
              Sign in to Homzo
            </h2>

            <p className="mt-2 text-[color:var(--muted)]">
              Access your listings, leads, and premium property dashboard.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <div className="flex gap-3">
                <span className="font-bold">!</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Username */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Username
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                </span>

                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="input-premium pl-11"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
              </div>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">

                </span>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="input-premium pl-11"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-accent mt-2 w-full rounded-xl py-3.5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In
                  <span>→</span>
                </span>
              )}
            </button>

          </form>

          {/* Register */}
          <div className="mt-8 border-t border-[color:var(--border)] pt-6 text-center">
            <p className="text-sm text-[color:var(--muted)]">
              Don&apos;t have an account?
            </p>

            <Link
              href="/register"
              className="mt-2 inline-block font-semibold text-[#9B7E52] transition hover:text-[#C9A961]"
            >
              Create an account →
            </Link>
          </div>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Copyright {new Date().getFullYear()} Homzo. All rights reserved.
        </p>

      </div>
    </main>
  );
}
