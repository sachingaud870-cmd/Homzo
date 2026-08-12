import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#211a16] text-white">

      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#E8C4B3]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#C9A961]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 md:px-10">

        {/* =====================================================
            TOP SECTION
        ====================================================== */}

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div className="lg:col-span-1">

            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-bold tracking-tight">
                Prop<span className="text-[#C9A961]">Verse</span>
              </h2>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-7 text-white/55">
              Your trusted destination for discovering premium properties,
              connecting with trusted builders, and finding a place you'll
              love to call home.
            </p>

            {/* Social */}

            <div className="mt-6 flex gap-3">

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#C9A961]/40 hover:bg-[#C9A961]/10"
              >
                ◎
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#C9A961]/40 hover:bg-[#C9A961]/10"
              >
                f
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#C9A961]/40 hover:bg-[#C9A961]/10"
              >
                in
              </a>

            </div>

          </div>

          {/* Explore */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#C9A961]">
              Explore
            </h3>

            <ul className="mt-5 space-y-3 text-sm">

              <li>
                <Link
                  href="/properties"
                  className="text-white/60 transition hover:text-white"
                >
                  All Properties
                </Link>
              </li>

              <li>
                <Link
                  href="/search"
                  className="text-white/60 transition hover:text-white"
                >
                  Search Properties
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-white/60 transition hover:text-white"
                >
                  About PropVerse
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-white/60 transition hover:text-white"
                >
                  Contact Us
                </Link>
              </li>

            </ul>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#C9A961]">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-sm">

              <li>
                <Link
                  href="/about"
                  className="text-white/60 transition hover:text-white"
                >
                  Our Mission
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-white/60 transition hover:text-white"
                >
                  Our Vision
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-white/60 transition hover:text-white"
                >
                  Support
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="text-white/60 transition hover:text-white"
                >
                  Broker Login
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#C9A961]">
              Get In Touch
            </h3>

            <div className="mt-5 space-y-4 text-sm">

              <div className="flex gap-3">
                <span>📍</span>
                <span className="text-white/60">
                  Mumbai, Maharashtra, India
                </span>
              </div>

              <div className="flex gap-3">
                <span>📞</span>
                <a
                  href="tel:+919876543210"
                  className="text-white/60 transition hover:text-white"
                >
                  +91 98765 43210
                </a>
              </div>

              <div className="flex gap-3">
                <span>✉️</span>
                <a
                  href="mailto:support@propverse.com"
                  className="text-white/60 transition hover:text-white"
                >
                  support@propverse.com
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            CTA
        ====================================================== */}

        <div className="my-12 h-px bg-white/10" />

        <div className="rounded-3xl border border-[#C9A961]/20 bg-gradient-to-r from-[#C9A961]/10 to-[#E8C4B3]/10 p-6 md:p-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A961]">
                Find Your Next Home
              </p>

              <h3 className="mt-2 text-xl font-bold md:text-2xl">
                Ready to find your dream property?
              </h3>

            </div>

            <Link
              href="/properties"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#C9A961] px-6 py-3 font-semibold text-[#211a16] transition hover:-translate-y-0.5 hover:bg-[#D4B776] hover:shadow-lg"
            >
              Explore Properties
              <span className="transition group-hover:translate-x-1">
                →
              </span>
            </Link>

          </div>

        </div>

        {/* =====================================================
            BOTTOM
        ====================================================== */}

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} PropVerse. All rights reserved.
          </p>

          <div className="flex gap-5">

            <Link
              href="#"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="#"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </Link>

          </div>

          <p className="flex items-center gap-1">
            Made with <span className="text-[#E8C4B3]">♥</span> for better living
          </p>

        </div>

      </div>

    </footer>
  );
}