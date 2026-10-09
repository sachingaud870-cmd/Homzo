"use client";

import { useEffect, useState } from "react";
import {
  getDashboardStats,
  getLeads,
  Lead,
  PaginatedLeads,
  triggerLeadAutomation,
  updateLeadStatus,
} from "@/lib/api";
import {
  AlertTriangle,
  CalendarClock,
  Check,
  Handshake,
  MessageSquareText,
  Search,
  UsersRound,
} from "lucide-react";

type Status = Lead["status"];

type Stats = {
  total_properties: number;
  total_leads: number;
  new_leads: number;
  contacted_leads: number;
  interested_leads: number;
  closed_leads: number;
  leads_by_status: { status: Status; count: number }[];
  leads_by_location: { location: string; count: number }[];
  follow_up_due_today: number;
  follow_up_overdue: number;
};

const emptyStats: Stats = {
  total_properties: 0,
  total_leads: 0,
  new_leads: 0,
  contacted_leads: 0,
  interested_leads: 0,
  closed_leads: 0,
  leads_by_status: [],
  leads_by_location: [],
  follow_up_due_today: 0,
  follow_up_overdue: 0,
};

const statuses: Status[] = [
  "NEW",
  "CONTACTED",
  "INTERESTED",
  "CLOSED",
];

const statusStyle: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700 border-blue-200",
  CONTACTED: "bg-amber-50 text-amber-700 border-amber-200",
  INTERESTED: "bg-purple-50 text-purple-700 border-purple-200",
  CLOSED: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function LeadsPage() {
  const [leadPage, setLeadPage] = useState<PaginatedLeads>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  const [stats, setStats] = useState<Stats>(emptyStats);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const [automationMessage, setAutomationMessage] =
    useState<string | null>(null);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    location: "",
  });

  const [followUpDrafts, setFollowUpDrafts] =
    useState<
      Record<
        number,
        {
          follow_up_date: string;
          follow_up_note: string;
          preferred_channel: string;
        }
      >
    >({});

  async function loadData(
    currentPage = page,
    currentFilters = filters,
    showLoading = true
  ) {
    if (showLoading) setLoading(true);

    try {
      const [leads, dashboardStats] = await Promise.all([
        getLeads({
          page: currentPage,
          search: currentFilters.search,
          status: currentFilters.status,
          location: currentFilters.location,
        }),
        getDashboardStats(),
      ]);

      setLeadPage(leads);
      setStats(dashboardStats);
    } catch {
      alert("Unable to load the lead dashboard.");
    } finally {
      if (showLoading) setLoading(false);
    }
  }

  useEffect(() => {
    const init = async () => {
      await loadData(1, {
        search: "",
        status: "",
        location: "",
      });
    };

    void init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyFilters(event: React.FormEvent) {
    event.preventDefault();

    const nextFilters = {
      search,
      status,
      location,
    };

    setPage(1);
    setFilters(nextFilters);

    void loadData(1, nextFilters);
  }

  function clearFilters() {
    const nextFilters = {
      search: "",
      status: "",
      location: "",
    };

    setSearch("");
    setStatus("");
    setLocation("");
    setPage(1);
    setFilters(nextFilters);

    void loadData(1, nextFilters);
  }

  function changePage(nextPage: number) {
    setPage(nextPage);
    void loadData(nextPage, filters);
  }

  async function sendAutomation(id: number, channel: string) {
    try {
      const result = await triggerLeadAutomation(id, channel);

      setAutomationMessage(
        `${channel} follow-up ready: ${result.body}`
      );

      if (result.link) {
        window.open(
          result.link,
          "_blank",
          "noopener,noreferrer"
        );
      }
    } catch {
      alert("Unable to prepare follow-up message.");
    }
  }

  async function changeStatus(
    id: number,
    nextStatus: Status
  ) {
    setUpdatingId(id);

    try {
      const followUp = followUpDrafts[id];

      await updateLeadStatus(
        id,
        nextStatus,
        followUp
      );

      setLeadPage((current) => ({
        ...current,
        results: current.results.map((lead) =>
          lead.id === id
            ? {
                ...lead,
                status: nextStatus,
                follow_up_date:
                  followUp?.follow_up_date ||
                  lead.follow_up_date ||
                  null,
                follow_up_note:
                  followUp?.follow_up_note ||
                  lead.follow_up_note ||
                  "",
                preferred_channel:
                  (followUp?.preferred_channel ||
                    lead.preferred_channel ||
                    "CALL") as Lead["preferred_channel"],
              }
            : lead
        ),
      }));

      const dashboardStats =
        await getDashboardStats();

      setStats(dashboardStats);
    } catch {
      alert("Failed to update lead status.");
    } finally {
      setUpdatingId(null);
    }
  }

  const totalPages = Math.max(
    1,
    Math.ceil(leadPage.count / 10)
  );

  const analyticsCards = [
    {
      label: "Total Leads",
      value: stats.total_leads,
      icon: UsersRound,
      className: "from-[#1a3a52] to-[#2d5a7b]",
    },
    {
      label: "New Leads",
      value: stats.new_leads,
      icon: MessageSquareText,
      className: "from-[#c9a961] to-[#d4b776]",
    },
    {
      label: "Interested",
      value: stats.interested_leads,
      icon: Handshake,
      className: "from-[#76558d] to-[#9b73b5]",
    },
    {
      label: "Closed",
      value: stats.closed_leads,
      icon: Check,
      className: "from-[#28745c] to-[#3c9a78]",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF6F0]">

      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl bg-[#1a3a52] p-8 text-white shadow-xl md:p-10">

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#c9a961]/20 blur-3xl" />

        <div className="absolute -bottom-20 left-20 h-56 w-56 rounded-full bg-[#2d5a7b]/50 blur-3xl" />

        <div className="relative">

          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full bg-[#c9a961]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#e5c982]">
              CRM Workspace
            </span>
          </div>

          <h1 className="text-4xl font-bold md:text-5xl">
            Lead Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-gray-300">
            Manage enquiries, track prospects, schedule follow-ups
            and convert leads into successful property deals.
          </p>

        </div>
      </section>

      {/* Analytics Cards */}
      <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {analyticsCards.map((card, index) => (
          <div
            key={card.label}
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.className} p-6 text-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl`}
            style={{
              animation: `fadeUp 0.5s ease ${index * 0.1}s both`,
            }}
          >

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 transition group-hover:scale-150" />

            <div className="relative flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-white/75">
                  {card.label}
                </p>

                <p className="mt-2 text-4xl font-bold">
                  {card.value}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-2xl backdrop-blur">
                <card.icon size={23} strokeWidth={1.8} aria-hidden="true" />
              </div>

            </div>
          </div>
        ))}

      </section>

      {/* Follow Up Cards */}
      <section className="mt-5 grid gap-5 md:grid-cols-2">

        <div className="rounded-2xl border border-[#c9a961]/30 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Follow-ups Due Today
              </p>

              <p className="mt-2 text-4xl font-bold text-[#1a3a52]">
                {stats.follow_up_due_today}
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c9a961]/15 text-2xl">
              <CalendarClock size={25} className="text-[#9b7e52]" aria-hidden="true" />
            </div>

          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-2/3 rounded-full bg-[#c9a961]" />
          </div>

        </div>

        <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Overdue Follow-ups
              </p>

              <p className="mt-2 text-4xl font-bold text-red-600">
                {stats.follow_up_overdue}
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-2xl">
              <AlertTriangle size={25} className="text-red-600" aria-hidden="true" />
            </div>

          </div>

          <p className="mt-4 text-sm text-gray-500">
            Follow up with these prospects as soon as possible.
          </p>

        </div>

      </section>

      {/* Analytics */}
      <section className="mt-8 grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#1a3a52]">
                Lead Performance
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Current lead conversion pipeline
              </p>
            </div>

            <span className="rounded-full bg-[#1a3a52]/10 px-3 py-1 text-xs font-semibold text-[#1a3a52]">
              LIVE
            </span>
          </div>

          <div className="mt-6 space-y-5">

            {statuses.map((item) => {

              const count =
                stats.leads_by_status.find(
                  (entry) => entry.status === item
                )?.count ?? 0;

              const width =
                stats.total_leads
                  ? (count / stats.total_leads) * 100
                  : 0;

              return (
                <div key={item}>

                  <div className="mb-2 flex justify-between text-sm">

                    <span className="font-medium text-gray-700">
                      {item}
                    </span>

                    <span className="font-bold text-[#1a3a52]">
                      {count}
                    </span>

                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#1a3a52] to-[#c9a961] transition-all duration-700"
                      style={{
                        width: `${width}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-[#1a3a52]">
            Top Enquiry Locations
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Areas generating the most enquiries
          </p>

          <div className="mt-6 space-y-3">

            {stats.leads_by_location.length ? (
              stats.leads_by_location.map((item, index) => (
                <div
                  key={item.location}
                  className="flex items-center justify-between rounded-xl bg-[#FAF6F0] p-4 transition hover:translate-x-1 hover:bg-[#f5eadf]"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9a961]/20 text-sm font-bold text-[#9b7e52]">
                      {index + 1}
                    </div>

                    <span className="font-medium text-gray-700">
                      {item.location}
                    </span>

                  </div>

                  <span className="rounded-full bg-[#1a3a52] px-3 py-1 text-sm font-bold text-white">
                    {item.count}
                  </span>

                </div>
              ))
            ) : (
              <p className="py-8 text-center text-sm text-gray-500">
                No location data yet.
              </p>
            )}

          </div>

        </div>

      </section>

      {/* Filters */}
      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="mb-5">
          <h2 className="text-xl font-bold text-[#1a3a52]">
            Search & Filter Leads
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Quickly find the right prospect.
          </p>
        </div>

        <form
          onSubmit={applyFilters}
          className="grid gap-3 md:grid-cols-4"
        >

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search name, mobile, email..."
            className="input-premium md:col-span-2"
          />

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="input-premium"
          >
            <option value="">All statuses</option>

            {statuses.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>

          <input
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
            placeholder="Filter by location"
            className="input-premium"
          />

          <div className="flex gap-3 md:col-span-4">

            <button
              type="submit"
              className="btn-accent rounded-xl px-6 py-3"
            >
              Apply Filters
            </button>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-gray-200 px-6 py-3 font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Reset
            </button>

          </div>

        </form>

      </section>

      {/* Automation */}
      {automationMessage && (
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 shadow-sm">
          ✓ {automationMessage}
        </div>
      )}

      {/* Leads Table */}
      <section className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-100 p-6">

          <div className="flex flex-wrap items-center justify-between gap-3">

            <div>
              <h2 className="text-xl font-bold text-[#1a3a52]">
                Lead Management
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {leadPage.count} total enquiries
              </p>
            </div>

            <span className="rounded-full bg-[#1a3a52]/10 px-4 py-2 text-sm font-semibold text-[#1a3a52]">
              Page {page} / {totalPages}
            </span>

          </div>

        </div>

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">

            <div className="text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#c9a961]" />

              <p className="mt-4 text-sm text-gray-500">
                Loading leads...
              </p>

            </div>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[1200px]">

              <thead>
                <tr className="bg-[#FAF6F0] text-left text-xs uppercase tracking-wider text-gray-500">

                  <th className="px-5 py-4">Lead</th>
                  <th className="px-5 py-4">Contact</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Budget</th>
                  <th className="px-5 py-4">Follow-up</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {leadPage.results.map((lead) => (

                  <tr
                    key={lead.id}
                    className="group transition hover:bg-[#FAF6F0]/70"
                  >

                    <td className="px-5 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1a3a52] font-bold text-white">
                          {lead.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-[#1a3a52]">
                            {lead.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            Lead #{lead.id}
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="px-5 py-5">

                      <p className="font-medium text-gray-700">
                        {lead.mobile}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {lead.email || "No email"}
                      </p>

                    </td>

                    <td className="px-5 py-5 text-sm text-gray-600">
                      {lead.location}
                    </td>

                    <td className="px-5 py-5">

                      <span className="font-semibold text-[#9b7e52]">
                        ₹ {lead.budget}
                      </span>

                    </td>

                    <td className="px-5 py-5">

                      <div className="w-48 space-y-2">

                        <input
                          value={
                            followUpDrafts[lead.id]
                              ?.follow_up_date ??
                            lead.follow_up_date ??
                            ""
                          }
                          onChange={(event) =>
                            setFollowUpDrafts(
                              (current) => ({
                                ...current,
                                [lead.id]: {
                                  ...current[lead.id],
                                  follow_up_date:
                                    event.target.value,
                                  follow_up_note:
                                    current[lead.id]
                                      ?.follow_up_note ??
                                    lead.follow_up_note ??
                                    "",
                                  preferred_channel:
                                    current[lead.id]
                                      ?.preferred_channel ??
                                    lead.preferred_channel ??
                                    "CALL",
                                },
                              })
                            )
                          }
                          type="date"
                          className="w-full rounded-lg border border-gray-200 p-2 text-sm outline-none focus:border-[#c9a961]"
                        />

                        <input
                          value={
                            followUpDrafts[lead.id]
                              ?.follow_up_note ??
                            lead.follow_up_note ??
                            ""
                          }
                          onChange={(event) =>
                            setFollowUpDrafts(
                              (current) => ({
                                ...current,
                                [lead.id]: {
                                  ...current[lead.id],
                                  follow_up_date:
                                    current[lead.id]
                                      ?.follow_up_date ??
                                    lead.follow_up_date ??
                                    "",
                                  follow_up_note:
                                    event.target.value,
                                  preferred_channel:
                                    current[lead.id]
                                      ?.preferred_channel ??
                                    lead.preferred_channel ??
                                    "CALL",
                                },
                              })
                            )
                          }
                          placeholder="Reminder note"
                          className="w-full rounded-lg border border-gray-200 p-2 text-sm outline-none focus:border-[#c9a961]"
                        />

                        <select
                          value={
                            followUpDrafts[lead.id]
                              ?.preferred_channel ??
                            lead.preferred_channel ??
                            "CALL"
                          }
                          onChange={(event) =>
                            setFollowUpDrafts(
                              (current) => ({
                                ...current,
                                [lead.id]: {
                                  ...current[lead.id],
                                  follow_up_date:
                                    current[lead.id]
                                      ?.follow_up_date ??
                                    lead.follow_up_date ??
                                    "",
                                  follow_up_note:
                                    current[lead.id]
                                      ?.follow_up_note ??
                                    lead.follow_up_note ??
                                    "",
                                  preferred_channel:
                                    event.target.value,
                                },
                              })
                            )
                          }
                          className="w-full rounded-lg border border-gray-200 p-2 text-sm"
                        >
                          <option value="CALL">
                            Call
                          </option>
                          <option value="WHATSAPP">
                            WhatsApp
                          </option>
                          <option value="EMAIL">
                            Email
                          </option>
                        </select>

                      </div>

                    </td>

                    <td className="px-5 py-5">

                      <div className="w-40 space-y-2">

                        <select
                          disabled={
                            updatingId === lead.id
                          }
                          value={lead.status}
                          onChange={(event) =>
                            changeStatus(
                              lead.id,
                              event.target.value as Status
                            )
                          }
                          className={`w-full rounded-full border px-3 py-2 text-xs font-bold outline-none ${
                            statusStyle[lead.status]
                          }`}
                        >

                          {statuses.map((item) => (
                            <option
                              value={item}
                              key={item}
                            >
                              {item}
                            </option>
                          ))}

                        </select>

                        <button
                          type="button"
                          onClick={() =>
                            sendAutomation(
                              lead.id,
                              followUpDrafts[
                                lead.id
                              ]
                                ?.preferred_channel ??
                                lead.preferred_channel ??
                                "WHATSAPP"
                            )
                          }
                          className="w-full rounded-lg bg-[#1a3a52] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#c9a961] hover:text-[#1a3a52]"
                        >
                          Send Follow-up →
                        </button>

                      </div>

                    </td>

                    <td className="px-5 py-5 text-sm text-gray-500">
                      {new Date(
                        lead.created_at
                      ).toLocaleDateString("en-IN")}
                    </td>

                  </tr>

                ))}

                {!leadPage.results.length && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-16 text-center"
                    >
                      <div className="flex justify-center text-[#9b7e52]">
                        <Search size={36} strokeWidth={1.5} aria-hidden="true" />
                      </div>

                      <p className="mt-4 font-semibold text-gray-700">
                        No leads found
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        Try changing your search filters.
                      </p>
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 p-5">

          <p className="text-sm text-gray-500">
            Showing page{" "}
            <strong className="text-[#1a3a52]">
              {page}
            </strong>{" "}
            of{" "}
            <strong className="text-[#1a3a52]">
              {totalPages}
            </strong>
          </p>

          <div className="flex gap-2">

            <button
              disabled={!leadPage.previous}
              onClick={() =>
                changePage(page - 1)
              }
              className="rounded-xl border border-gray-200 px-5 py-2 text-sm font-medium transition hover:bg-[#FAF6F0] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>

            <button
              disabled={!leadPage.next}
              onClick={() =>
                changePage(page + 1)
              }
              className="rounded-xl bg-[#1a3a52] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#c9a961] hover:text-[#1a3a52] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>

          </div>

        </div>

      </section>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </main>
  );
}
