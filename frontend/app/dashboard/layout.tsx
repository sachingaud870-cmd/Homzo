"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getToken, logout } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  useEffect(() => {

    const token = getToken();

    if (!token) {
      router.push("/login");
    }

  }, [router]);



  function handleLogout() {

    logout();

    router.push("/");

  }



  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}

      <aside className="w-72 bg-slate-900 text-white p-6">

        <h1 className="mb-10 text-3xl font-bold">
          PropVerse
        </h1>


        <nav className="flex flex-col gap-3">

          <Link
            href="/dashboard"
            className="rounded-lg p-3 hover:bg-slate-700"
          >
            📊 Dashboard
          </Link>


          <Link
            href="/dashboard/profile"
            className="rounded-lg p-3 hover:bg-slate-700"
          >
            👤 My Profile
          </Link>


          <Link
            href="/dashboard/properties"
            className="rounded-lg p-3 hover:bg-slate-700"
          >
            🏠 My Properties
          </Link>


          <Link
            href="/dashboard/leads"
            className="rounded-lg p-3 hover:bg-slate-700"
          >
            📩 My Leads
          </Link>


          <button
            onClick={handleLogout}
            className="mt-8 rounded-lg bg-red-600 p-3 text-left hover:bg-red-700"
          >
            🚪 Logout
          </button>

        </nav>

      </aside>



      {/* Main Content */}

      <main className="flex-1 p-8">

        {children}

      </main>

    </div>

  );

}