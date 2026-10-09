import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[color:var(--background)] text-[color:var(--foreground)]">

      {/* Background */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#E8C4B3]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#C9A961]/20 blur-3xl" />

      <section className="relative mx-auto max-w-6xl px-6 py-20 md:px-10">

        {/* Header */}
        <div className="mb-14 text-center animate-fade-up">

          <span className="badge-premium">
            <MessageCircle size={14} aria-hidden="true" />
            Get In Touch
          </span>

          <h1 className="mt-5 text-5xl font-bold text-[color:var(--foreground)] md:text-6xl">
            Let&apos;s talk about
            <span className="text-gradient block">
              your property
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
            Have a question about Homzo? Our team would love to hear
            from you and help you with your property journey.
          </p>

        </div>

        {/* Main Card */}
        <div className="glass-card overflow-hidden p-2 animate-scale-in">

          <div className="grid md:grid-cols-2">

            {/* Left */}
            <div className="rounded-3xl bg-gradient-to-br from-[#2C2C2C] to-[#4A4038] p-8 text-white md:p-12">

              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4B776]">
                Contact Homzo
              </span>

              <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                We&apos;re here to
                <span className="text-[#E8C4B3]"> help.</span>
              </h2>

              <p className="mt-5 leading-7 text-gray-300">
                Whether you are looking for a property, managing leads,
                or exploring our platform, feel free to reach out.
              </p>

              <div className="mt-10 space-y-6">

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#E8C4B3]">
                    <MapPin size={21} aria-hidden="true" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Address
                    </h3>

                    <a href="https://maps.google.com/?q=Mumbai%2C+Maharashtra%2C+India" className="mt-1 block text-sm text-gray-300 transition hover:text-white">
                      Mumbai, Maharashtra, India
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#E8C4B3]">
                    <Phone size={20} aria-hidden="true" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Phone
                    </h3>

                    <a href="tel:+919370334624" className="mt-1 block text-sm text-gray-300 transition hover:text-white">
                      +91 9370334624
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#E8C4B3]">
                    <Mail size={20} aria-hidden="true" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Email
                    </h3>

                    <a href="mailto:sachingaud870@gmail.com" className="mt-1 block break-all text-sm text-gray-300 transition hover:text-white">
                      sachingaud870@gmail.com
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Right */}
            <div className="p-8 md:p-12">

              <h2 className="flex items-center gap-3 text-2xl font-bold text-[color:var(--foreground)]">
                <Mail size={21} className="text-[#9B7E52]" aria-hidden="true" />
                Send us a message
              </h2>

              <p className="mt-2 text-[color:var(--muted)]">
                We&apos;ll get back to you as soon as possible.
              </p>

              <form className="mt-8 space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Your Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="input-premium"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="input-premium"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Message
                  </label>

                  <textarea
                    rows={5}
                    placeholder="How can we help?"
                    className="input-premium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-accent inline-flex w-full items-center justify-center gap-2"
                >
                  Send Message
                  <Send size={16} aria-hidden="true" />
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>
    </main>
  );
}