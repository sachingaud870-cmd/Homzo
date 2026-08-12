"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/register/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);

        if (typeof data === "object") {
          const messages = Object.values(data)
            .flat()
            .join(" ");

          setError(messages || "Registration failed.");
        } else {
          setError("Registration failed. Please check your details.");
        }

        return;
      }

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.error(error);
      setError(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAF6F0] px-5 py-12">

      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#E8C4B3]/25 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#C9A961]/15 blur-3xl" />

      {/* =====================================================
          REGISTER CARD
      ====================================================== */}

      <div className="relative w-full max-w-lg">

        {/* Brand */}

        <div className="mb-8 text-center">

          <Link href="/" className="inline-block">

            <h1 className="text-4xl font-bold tracking-tight text-[#211a16]">
              Prop<span className="text-[#C9A961]">Verse</span>
            </h1>

          </Link>

          <p className="mt-3 text-sm text-gray-500">
            Create your account and start exploring properties
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="premium-card rounded-3xl bg-white p-7 shadow-xl md:p-9"
        >

          {/* Heading */}

          <div className="mb-7">

            <div className="mb-3 flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A961]" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B7E52]">
                Get Started
              </span>

            </div>

            <h2 className="text-3xl font-bold text-gray-900">
              Create Account
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Join PropVerse and discover your next property.
            </p>

          </div>

          {/* =================================================
              ERROR MESSAGE
          ================================================== */}

          {error && (
            <div className="mb-5 animate-fade-up rounded-2xl border border-red-200 bg-red-50 p-4">

              <div className="flex gap-3">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
                  !
                </div>

                <div>
                  <p className="font-semibold text-red-800">
                    Registration Failed
                  </p>

                  <p className="mt-1 text-sm leading-5 text-red-700">
                    {error}
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* =================================================
              SUCCESS MESSAGE
          ================================================== */}

          {success && (
            <div className="mb-5 animate-fade-up rounded-2xl border border-emerald-200 bg-emerald-50 p-4">

              <div className="flex gap-3">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-600">
                  ✓
                </div>

                <div>
                  <p className="font-semibold text-emerald-800">
                    Registration Successful
                  </p>

                  <p className="mt-1 text-sm text-emerald-700">
                    {success}
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* =================================================
              NAME
          ================================================== */}

          <div className="grid gap-4 sm:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                First Name
              </label>

              <input
                type="text"
                placeholder="Sachin"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input-premium"
                required
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Gaud"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-premium"
                required
              />

            </div>

          </div>

          {/* =================================================
              USERNAME
          ================================================== */}

          <div className="mt-5">

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Username
            </label>

            <div className="relative">

              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                @
              </span>

              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-premium pl-10"
                required
              />

            </div>

          </div>

          {/* =================================================
              EMAIL
          ================================================== */}

          <div className="mt-5">

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>

            <div className="relative">

              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                ✉
              </span>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-premium pl-10"
                required
              />

            </div>

          </div>

          {/* =================================================
              PASSWORD
          ================================================== */}

          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-premium"
                required
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-premium"
                required
              />

            </div>

          </div>

          <p className="mt-2 text-xs text-gray-400">
            Password should contain at least 8 characters.
          </p>

          {/* =================================================
              SUBMIT
          ================================================== */}

          <button
            type="submit"
            disabled={loading}
            className="btn-accent mt-7 w-full rounded-xl py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {loading ? (

              <span className="flex items-center justify-center gap-3">

                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                Creating Account...

              </span>

            ) : (

              <span className="flex items-center justify-center gap-2">
                Create Account
                <span>→</span>
              </span>

            )}

          </button>

          {/* =================================================
              LOGIN
          ================================================== */}

          <p className="mt-6 text-center text-sm text-gray-500">

            Already have an account?{" "}

            <Link
              href="/login"
              className="font-semibold text-[#9B7E52] transition hover:text-[#C9A961]"
            >
              Sign In
            </Link>

          </p>

        </form>

        {/* Footer */}

        <p className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} PropVerse. All rights reserved.
        </p>

      </div>

    </main>
  );
}