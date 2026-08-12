import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF6F0] text-[#2C2C2C]">

      {/* ================= BACKGROUND EFFECTS ================= */}

      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#E8C4B3]/30 blur-3xl animate-pulse" />

      <div className="pointer-events-none absolute right-[-180px] top-[500px] h-[500px] w-[500px] rounded-full bg-[#C9A961]/20 blur-3xl animate-pulse" />

      <div className="pointer-events-none absolute left-1/2 top-[900px] h-72 w-72 -translate-x-1/2 rounded-full bg-[#D4A574]/10 blur-3xl" />

      {/* ================= HERO ================= */}

      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* LEFT */}

          <div className="animate-fade-up">

            <span className="badge-premium inline-flex items-center gap-2">
              <span className="text-[#C9A961]">✦</span>
              About PropVerse
            </span>

            <h1 className="mt-7 text-5xl font-extrabold leading-[1.05] tracking-tight text-[#2C2C2C] md:text-7xl">

              A Smarter Way to

              <span className="text-gradient block">
                Find Your Place.
              </span>

            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600 md:text-xl">
              PropVerse brings property discovery, intelligent recommendations,
              and powerful CRM tools together in one modern real estate
              platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <span className="rounded-full border border-[#C9A961]/30 bg-white/70 px-4 py-2 text-sm font-medium text-[#9B7E52] shadow-sm backdrop-blur">
                ✨ AI Powered
              </span>

              <span className="rounded-full border border-[#C9A961]/30 bg-white/70 px-4 py-2 text-sm font-medium text-[#9B7E52] shadow-sm backdrop-blur">
                🔎 Smart Search
              </span>

              <span className="rounded-full border border-[#C9A961]/30 bg-white/70 px-4 py-2 text-sm font-medium text-[#9B7E52] shadow-sm backdrop-blur">
                📊 CRM
              </span>

            </div>

            <div className="mt-9 flex flex-wrap gap-4">

              <Link
                href="/properties"
                className="btn-accent inline-flex items-center gap-2 rounded-xl px-6 py-3.5"
              >
                Explore Properties
                <span>→</span>
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-[#C9A961]/40 bg-white/70 px-6 py-3.5 font-semibold text-[#2C2C2C] shadow-sm transition hover:-translate-y-1 hover:bg-white"
              >
                Contact Us
              </Link>

            </div>

          </div>


          {/* RIGHT VISUAL */}

          <div className="relative animate-fade-up">

            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-[#E8C4B3]/30 via-transparent to-[#C9A961]/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 p-3 shadow-2xl backdrop-blur">

              <div className="relative h-[420px] overflow-hidden rounded-[1.5rem]">

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  alt="Modern luxury property"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">

                  <p className="text-sm font-medium text-white/80">
                    The PropVerse Experience
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-white">
                    Technology Meets Real Estate
                  </h2>

                </div>

              </div>

            </div>

            {/* Floating Card */}

            <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur md:block animate-float">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C9A961]/15 text-xl">
                  🤖
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Intelligent
                  </p>

                  <p className="font-bold">
                    AI Recommendations
                  </p>
                </div>

              </div>

            </div>

            {/* Floating Badge */}

            <div className="absolute -right-4 top-10 hidden rounded-2xl bg-[#2C2C2C] px-5 py-4 text-white shadow-xl md:block animate-float">

              <p className="text-xs text-gray-400">
                Built for
              </p>

              <p className="font-bold text-[#D4B776]">
                Modern Property
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="relative mx-auto max-w-7xl px-6 md:px-10">

        <div className="grid overflow-hidden rounded-3xl border border-[#C9A961]/20 bg-white/70 shadow-xl backdrop-blur md:grid-cols-4">

          {[
            ["01", "Smart Discovery", "Find properties faster"],
            ["02", "AI Insights", "Make better decisions"],
            ["03", "CRM Tools", "Manage leads efficiently"],
            ["04", "Modern Experience", "Simple & intuitive"],
          ].map(([number, title, description], index) => (

            <div
              key={title}
              className={`group p-7 transition duration-300 hover:bg-[#FAF6F0] ${
                index !== 3 ? "border-b md:border-b-0 md:border-r border-gray-200" : ""
              }`}
            >

              <span className="text-sm font-bold text-[#C9A961]">
                {number}
              </span>

              <h3 className="mt-3 text-lg font-bold">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {description}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* ================= MISSION / VISION ================= */}

      <section className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">

        <div className="mb-14 max-w-2xl">

          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#C9A961]">
            What Drives Us
          </span>

          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">
            Built around people,
            <span className="text-gradient"> powered by technology.</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Property decisions can be complicated. PropVerse is designed to
            make the journey simpler, clearer, and more intelligent.
          </p>

        </div>


        <div className="grid gap-7 md:grid-cols-3">

          {/* Mission */}

          <div className="premium-card group p-8">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8C4B3]/30 text-3xl transition duration-300 group-hover:scale-110 group-hover:rotate-3">
              🎯
            </div>

            <h3 className="mt-7 text-2xl font-bold">
              Our Mission
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              To make buying, selling, and managing properties simple,
              transparent, and accessible for everyone.
            </p>

          </div>


          {/* Vision */}

          <div className="premium-card group p-8">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C9A961]/20 text-3xl transition duration-300 group-hover:scale-110 group-hover:-rotate-3">
              ✨
            </div>

            <h3 className="mt-7 text-2xl font-bold">
              Our Vision
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              To build a trusted AI-powered real estate ecosystem where
              technology helps people make confident property decisions.
            </p>

          </div>


          {/* Why */}

          <div className="premium-card group p-8">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4A574]/20 text-3xl transition duration-300 group-hover:scale-110 group-hover:rotate-3">
              🏡
            </div>

            <h3 className="mt-7 text-2xl font-bold">
              Why PropVerse?
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              Smart discovery, intelligent recommendations, lead management,
              and a modern dashboard — all connected in one platform.
            </p>

          </div>

        </div>

      </section>


      {/* ================= AI SECTION ================= */}

      <section className="relative mx-auto max-w-7xl px-6 md:px-10">

        <div className="relative overflow-hidden rounded-[2rem] bg-[#2C2C2C] p-8 text-white shadow-2xl md:p-14">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#C9A961]/20 blur-3xl" />

          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#E8C4B3]/10 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">

            <div>

              <span className="inline-flex rounded-full border border-[#D4B776]/30 bg-[#D4B776]/10 px-4 py-2 text-sm text-[#D4B776]">
                🤖 Intelligent Property Technology
              </span>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight md:text-5xl">

                Property search,
                <span className="text-[#E8C4B3]">
                  {" "}reimagined.
                </span>

              </h2>

              <p className="mt-5 max-w-xl leading-8 text-gray-300">
                PropVerse combines property discovery with intelligent tools
                that help buyers and consultants save time and work smarter.
              </p>

            </div>


            <div className="grid grid-cols-2 gap-4">

              {[
                ["🤖", "AI Recommendations"],
                ["🔎", "Smart Search"],
                ["📊", "Lead Analytics"],
                ["📅", "Follow-up Management"],
              ].map(([icon, title]) => (

                <div
                  key={title}
                  className="glass-card group rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-2 hover:bg-white/10"
                >

                  <span className="text-2xl">
                    {icon}
                  </span>

                  <p className="mt-4 font-semibold">
                    {title}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}

      <section className="mx-auto max-w-5xl px-6 py-24 text-center md:py-32">

        <span className="badge-premium">
          ✦ Start Your Property Journey
        </span>

        <h2 className="mt-6 text-4xl font-extrabold md:text-6xl">

          Your next property
          <span className="text-gradient block">
            starts here.
          </span>

        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
          Explore properties, discover smarter possibilities, and experience
          a better way to navigate real estate with PropVerse.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <Link
            href="/properties"
            className="btn-accent rounded-xl px-7 py-3.5"
          >
            Explore Properties →
          </Link>

          <Link
            href="/contact"
            className="rounded-xl border border-gray-300 bg-white px-7 py-3.5 font-semibold transition hover:-translate-y-1 hover:shadow-lg"
          >
            Talk to PropVerse
          </Link>

        </div>

      </section>

    </main>
  );
}