"use client";

import { useEffect, useState } from "react";
import { getDashboardStats, getLeads, updateLeadStatus } from "@/lib/api";

type Lead = { id: number; name: string; mobile: string; email: string; location: string; budget: string; status: string; created_at: string };
type Stats = { total_properties: number; total_leads: number; new_leads: number; interested_leads: number; closed_leads: number };
const emptyStats: Stats = { total_properties: 0, total_leads: 0, new_leads: 0, interested_leads: 0, closed_leads: 0 };

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>(emptyStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try { const [leadData, statsData] = await Promise.all([getLeads(), getDashboardStats()]); setLeads(leadData); setStats(statsData); }
      catch { alert("Unable to load the lead dashboard."); }
      finally { setLoading(false); }
    }
    loadData();
  }, []);

  async function changeStatus(id: number, status: string) {
    try { await updateLeadStatus(id, status); setLeads((items) => items.map((lead) => lead.id === id ? { ...lead, status } : lead)); }
    catch { alert("Failed to update lead status."); }
  }

  if (loading) return <div className="p-10 text-xl">Loading Dashboard...</div>;
  const cards = [["Properties", stats.total_properties, "bg-blue-100"], ["Total Leads", stats.total_leads, "bg-green-100"], ["New Leads", stats.new_leads, "bg-yellow-100"], ["Interested", stats.interested_leads, "bg-purple-100"], ["Closed", stats.closed_leads, "bg-red-100"]] as const;
  return <main className="min-h-screen bg-gray-100 p-10"><div className="mx-auto max-w-7xl rounded-xl bg-white p-8 shadow"><h1 className="text-4xl font-bold">Lead Dashboard</h1><p className="mt-2 text-gray-600">Manage customer enquiries</p>
    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">{cards.map(([label, count, colour]) => <div key={label} className={`rounded-xl p-5 ${colour}`}><h3 className="text-gray-600">{label}</h3><p className="text-3xl font-bold">{count}</p></div>)}</div>
    <div className="mt-10 overflow-x-auto"><table className="w-full border-collapse border"><thead><tr className="bg-gray-200"><th className="border p-3 text-left">Name</th><th className="border p-3">Mobile</th><th className="border p-3">Email</th><th className="border p-3">Location</th><th className="border p-3">Budget</th><th className="border p-3">Status</th><th className="border p-3">Date</th></tr></thead><tbody>{leads.map((lead) => <tr key={lead.id} className="border-t"><td className="border p-3">{lead.name}</td><td className="border p-3">{lead.mobile}</td><td className="border p-3">{lead.email}</td><td className="border p-3">{lead.location}</td><td className="border p-3">{lead.budget}</td><td className="border p-3"><select value={lead.status} onChange={(event) => changeStatus(lead.id, event.target.value)} className="rounded border p-2"><option value="NEW">NEW</option><option value="CONTACTED">CONTACTED</option><option value="INTERESTED">INTERESTED</option><option value="CLOSED">CLOSED</option></select></td><td className="border p-3">{new Date(lead.created_at).toLocaleDateString()}</td></tr>)}{!leads.length && <tr><td colSpan={7} className="p-6 text-center text-gray-500">No enquiries yet.</td></tr>}</tbody></table></div>
  </div></main>;
}
