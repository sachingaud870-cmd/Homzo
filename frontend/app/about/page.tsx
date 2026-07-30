export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="mb-6 text-5xl font-bold text-gray-900">
          About PropVerse
        </h1>

        <p className="text-lg leading-8 text-gray-600">
          PropVerse is a modern real estate platform designed to help buyers,
          sellers, and property consultants manage and discover properties with
          ease. Our goal is to simplify property search through technology,
          clean design, and intelligent recommendations.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-3 text-2xl font-semibold">
              Our Mission
            </h2>

            <p className="text-gray-600">
              To make buying and selling properties simple, transparent,
              and accessible for everyone.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-3 text-2xl font-semibold">
              Our Vision
            </h2>

            <p className="text-gray-600">
              Build India's most trusted AI-powered real estate platform.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-3 text-2xl font-semibold">
              Why PropVerse?
            </h2>

            <p className="text-gray-600">
              Smart search, verified properties, AI recommendations,
              and an easy-to-use dashboard.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}