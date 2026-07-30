export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-16">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-10 shadow-lg">
        <h1 className="mb-6 text-4xl font-bold text-blue-600">
          Contact Us
        </h1>

        <p className="mb-8 text-gray-600">
          We'd love to hear from you. Get in touch with the PropVerse team.
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="font-semibold text-gray-800">
              📍 Address
            </h2>
            <p className="text-gray-600">
              Mumbai, Maharashtra, India
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">
              📞 Phone
            </h2>
            <p className="text-gray-600">
              +91 98765 43210
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">
              📧 Email
            </h2>
            <p className="text-gray-600">
              support@propverse.com
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}