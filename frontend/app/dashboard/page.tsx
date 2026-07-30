import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>

      <h1 className="mb-2 text-4xl font-bold">
        Dashboard
      </h1>

      <p className="mb-8 text-gray-600">
        Welcome to your PropVerse Dashboard.
      </p>

      <div className="grid gap-6 md:grid-cols-2">

        <Link
          href="/dashboard/properties"
          className="rounded-xl bg-blue-600 p-6 text-white transition hover:bg-blue-700"
        >
          <h2 className="text-2xl font-bold">
            🏠 Manage Properties
          </h2>

          <p className="mt-2">
            Add, Edit and Delete Properties
          </p>
        </Link>


        <Link
          href="/dashboard/leads"
          className="rounded-xl bg-green-600 p-6 text-white transition hover:bg-green-700"
        >
          <h2 className="text-2xl font-bold">
            📩 Manage Leads
          </h2>

          <p className="mt-2">
            View and Manage Customer Leads
          </p>
        </Link>


        <Link
          href="/dashboard/profile"
          className="rounded-xl bg-purple-600 p-6 text-white transition hover:bg-purple-700"
        >
          <h2 className="text-2xl font-bold">
            👤 My Profile
          </h2>

          <p className="mt-2">
            View your account details
          </p>
        </Link>

      </div>

    </div>
  );
}