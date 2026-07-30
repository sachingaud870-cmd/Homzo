"use client";

import { useEffect, useState } from "react";
import { getDashboardStats, getLeads, Lead, PaginatedLeads, updateLeadStatus } from "@/lib/api";

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
};

const emptyStats: Stats = { total_properties: 0, total_leads: 0, new_leads: 0, contacted_leads: 0, interested_leads: 0, closed_leads: 0, leads_by_status: [], leads_by_location: [] };
const statuses: Status[] = ["NEW", "CONTACTED", "INTERESTED", "CLOSED"];

export default function LeadsPage() {
  const [leadPage, setLeadPage] = useState<PaginatedLeads>({ count: 0, next: null, previous: null, results: [] });
  const [stats, setStats] = useState<Stats>(emptyStats);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState({ search: "", status: "", location: "" });

  async function loadData(currentPage = page, currentFilters = filters, showLoading = true) {
    if (showLoading) setLoading(true);
    try {
      const [leads, dashboardStats] = await Promise.all([
        getLeads({ page: currentPage, search: currentFilters.search, status: currentFilters.status, location: currentFilters.location }),
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
    Promise.all([getLeads({ page: 1 }), getDashboardStats()])
      .then(([leads, dashboardStats]) => { setLeadPage(leads); setStats(dashboardStats); })
      .catch(() => alert("Unable to load the lead dashboard."))
      .finally(() => setLoading(false));
  }, []);

  function applyFilters(event: React.FormEvent) {
    event.preventDefault();
    setPage(1);
    const nextFilters = { search, status, location };
    setFilters(nextFilters);
    void loadData(1, nextFilters);
  }

  function clearFilters() {
    const nextFilters = { search: "", status: "", location: "" };
    setSearch(""); setStatus(""); setLocation(""); setPage(1); setFilters(nextFilters);
    void loadData(1, nextFilters);
  }

  function changePage(nextPage: number) {
    setPage(nextPage);
    loadData(nextPage, filters);
  }

  async function changeStatus(id: number, nextStatus: Status) {
    setUpdatingId(id);
    try {
      await updateLeadStatus(id, nextStatus);
      setLeadPage((current) => ({ ...current, results: current.results.map((lead) => lead.id === id ? { ...lead, status: nextStatus } : lead) }));
      const dashboardStats = await getDashboardStats();
      setStats(dashboardStats);
    } catch {
      alert("Failed to update lead status.");
    } finally {
      setUpdatingId(null);
    }
  }

  const totalPages = Math.max(1, Math.ceil(leadPage.count / 10));
  const cards = [["Properties", stats.total_properties, "bg-blue-100"], ["Total Leads", stats.total_leads, "bg-green-100"], ["New", stats.new_leads, "bg-yellow-100"], ["Contacted", stats.contacted_leads, "bg-orange-100"], ["Interested", stats.interested_leads, "bg-purple-100"], ["Closed", stats.closed_leads, "bg-red-100"]] as const;

  return <main className="min-h-screen bg-gray-100 p-6 md:p-10"><div className="mx-auto max-w-7xl rounded-xl bg-white p-6 shadow md:p-8">
    <h1 className="text-4xl font-bold">Lead Dashboard</h1><p className="mt-2 text-gray-600">Search, qualify, and track customer enquiries.</p>
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">{cards.map(([label, count, colour]) => <div key={label} className={`rounded-xl p-4 ${colour}`}><h3 className="text-sm text-gray-700">{label}</h3><p className="text-3xl font-bold">{count}</p></div>)}</div>
    <div className="mt-8 grid gap-5 lg:grid-cols-2"><section className="rounded-lg border p-5"><h2 className="font-bold">Lead status analytics</h2><div className="mt-4 space-y-3">{statuses.map((item) => { const count = stats.leads_by_status.find((entry) => entry.status === item)?.count ?? 0; const width = stats.total_leads ? (count / stats.total_leads) * 100 : 0; return <div key={item}><div className="flex justify-between text-sm"><span>{item}</span><span>{count}</span></div><div className="mt-1 h-2 rounded bg-gray-200"><div className="h-2 rounded bg-blue-600" style={{ width: `${width}%` }} /></div></div>; })}</div></section><section className="rounded-lg border p-5"><h2 className="font-bold">Top enquiry locations</h2><div className="mt-4 space-y-2">{stats.leads_by_location.length ? stats.leads_by_location.map((item) => <div className="flex justify-between" key={item.location}><span>{item.location}</span><span className="font-semibold">{item.count}</span></div>) : <p className="text-sm text-gray-500">No location data yet.</p>}</div></section></div>
    <form onSubmit={applyFilters} className="mt-8 grid gap-3 rounded-lg bg-gray-50 p-4 md:grid-cols-4"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, mobile, email..." className="rounded border p-3 md:col-span-2" /><select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded border p-3"><option value="">All statuses</option>{statuses.map((item) => <option value={item} key={item}>{item}</option>)}</select><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Filter by location" className="rounded border p-3" /><div className="flex gap-3 md:col-span-4"><button className="rounded bg-blue-600 px-5 py-2 text-white">Apply filters</button><button type="button" onClick={clearFilters} className="rounded border px-5 py-2">Clear</button></div></form>
    {loading ? <p className="mt-8">Loading leads...</p> : <div className="mt-6 overflow-x-auto"><table className="w-full border-collapse border"><thead><tr className="bg-gray-200"><th className="border p-3 text-left">Name</th><th className="border p-3">Mobile</th><th className="border p-3">Email</th><th className="border p-3">Location</th><th className="border p-3">Budget</th><th className="border p-3">Status</th><th className="border p-3">Date</th></tr></thead><tbody>{leadPage.results.map((lead) => <tr key={lead.id}><td className="border p-3">{lead.name}</td><td className="border p-3">{lead.mobile}</td><td className="border p-3">{lead.email || "—"}</td><td className="border p-3">{lead.location}</td><td className="border p-3">{lead.budget}</td><td className="border p-3"><select disabled={updatingId === lead.id} value={lead.status} onChange={(event) => changeStatus(lead.id, event.target.value as Status)} className="rounded border p-2 disabled:opacity-50">{statuses.map((item) => <option value={item} key={item}>{item}</option>)}</select></td><td className="border p-3">{new Date(lead.created_at).toLocaleDateString()}</td></tr>)}{!leadPage.results.length && <tr><td colSpan={7} className="p-6 text-center text-gray-500">No leads match these filters.</td></tr>}</tbody></table>
      <div className="mt-5 flex items-center justify-between"><p className="text-sm text-gray-600">{leadPage.count} lead{leadPage.count === 1 ? "" : "s"} · Page {page} of {totalPages}</p><div className="flex gap-2"><button disabled={!leadPage.previous} onClick={() => changePage(page - 1)} className="rounded border px-4 py-2 disabled:opacity-40">Previous</button><button disabled={!leadPage.next} onClick={() => changePage(page + 1)} className="rounded border px-4 py-2 disabled:opacity-40">Next</button></div></div>
    </div>}
  </div></main>;
}
