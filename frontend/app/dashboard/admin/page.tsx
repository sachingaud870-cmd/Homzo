"use client";

import { getDashboardStats } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { useHydrated } from "@/lib/useHydrated";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const isHydrated = useHydrated();
  const user = isHydrated ? getUser() : null;
  const isAdmin = user?.role === "ADMIN";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (!isAdmin) return;

    getDashboardStats()
      .then(setStats)
      .catch(() => setStats(null));
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-[#FAF6F0] p-6 md:p-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-red-200 bg-red-50 p-10 text-red-700 shadow-xl">
          <div className="text-5xl"></div>

          <h1 className="mt-5 text-3xl font-bold">
            Access Denied
          </h1>

          <p className="mt-2">
            Only admin users can view this section.
          </p>
        </div>
      </main>
    );
  }

  const cards = [
    {
      label: "Total Properties",
      value: stats?.total_properties ?? 0,
      icon: "",
    },
    {
      label: "Total Leads",
      value: stats?.total_leads ?? 0,
      icon: "",
    },
    {
      label: "Conversion Rate",
      value: `${stats?.conversion_rate ?? 0}%`,
      icon: "",
    },
    {
      label: "Follow-ups Due",
      value: stats?.follow_up_due_today ?? 0,
      icon: "",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF6F0] p-6 md:p-10">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 animate-fade-up">

          <span className="badge-premium">
             Administration
          </span>

          <h1 className="mt-5 text-4xl font-bold text-gray-900 md:text-5xl">
            Admin
            <span className="text-gradient"> Dashboard</span>
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Monitor CRM activity, lead performance, and portfolio growth
            from one centralized dashboard.
          </p>

        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {cards.map((card, index) => (
            <div
              key={card.label}
              className={`premium-card p-6 animate-fade-up delay-${(index + 1) * 100}`}
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {card.label}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8C4B3]/30 text-xl">
                  {card.icon}
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* Analytics */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Lead Performance */}
          <div className="glass-card p-6 md:p-8">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Lead Performance
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Current lead distribution
                </p>
              </div>

              <span className="rounded-xl bg-[#C9A961]/15 px-3 py-2 text-sm font-semibold text-[#9B7E52]">
                Analytics
              </span>
            </div>

            <div className="mt-7 space-y-5">

              {stats?.leads_by_status?.length ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                stats.leads_by_status.map((item: any) => {

                  const percentage =
                    (item.count /
                      Math.max(stats.total_leads, 1)) *
                    100;

                  return (
                    <div key={item.status}>

                      <div className="mb-2 flex justify-between text-sm">
                        <span className="font-medium text-gray-700">
                          {item.status}
                        </span>

                        <span className="font-bold text-[#9B7E52]">
                          {item.count}
                        </span>
                      </div>

                      <div className="h-2.5 overflow-hidden rounded-full bg-[#F0E9E2]">

                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#E8C4B3] to-[#C9A961] transition-all duration-1000"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500">
                  No lead performance data yet.
                </p>
              )}

            </div>
          </div>

          {/* Popular Properties */}
          <div className="glass-card p-6 md:p-8">

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Popular Properties
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Properties generating the most enquiries
              </p>
            </div>

            <div className="mt-6 space-y-3">

              {stats?.top_properties?.length ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                stats.top_properties.map((item: any) => (
                  <div
                    key={`${item.project_name}-${item.location}`}
                    className="group flex items-center justify-between rounded-2xl border border-transparent bg-white/60 p-4 transition-all duration-300 hover:border-[#C9A961]/20 hover:bg-white hover:shadow-lg"
                  >

                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.project_name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                         {item.location}
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                      {item.lead_count} leads
                    </span>

                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No property performance data yet.
                </p>
              )}

            </div>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-[#2C2C2C] to-[#4A4038] p-7 text-white shadow-2xl md:p-9">

          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#C9A961]/20 blur-3xl" />

          <div className="relative">

            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4B776]">
              Quick Actions
            </span>

            <h2 className="mt-3 text-2xl font-bold">
              Manage your platform
            </h2>

            <div className="mt-6 flex flex-wrap gap-3">

              <Link
                href="/dashboard/leads"
                className="btn-primary bg-white text-[#2C2C2C] hover:bg-[#F5D5C8]"
              >
                Open Lead Dashboard →
              </Link>

              <Link
                href="/dashboard/properties"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 font-medium backdrop-blur transition-all duration-300 hover:bg-white/20"
              >
                Review Properties
              </Link>

            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
