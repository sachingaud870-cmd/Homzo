"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteProperty, getProperties } from "@/lib/api";

type Property = { id: number; project_name: string; builder_name: string; location: string; bhk: string; price: string; status: string };

export default function PropertiesDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getProperties().then(setProperties).catch(() => alert("Unable to load properties.")).finally(() => setLoading(false)); }, []);
  async function removeProperty(id: number) {
    if (!window.confirm("Delete this property? This cannot be undone.")) return;
    try { await deleteProperty(id); setProperties((items) => items.filter((item) => item.id !== id)); }
    catch { alert("Failed to delete property."); }
  }

  return <main className="min-h-screen bg-gray-100 p-10"><div className="mx-auto max-w-7xl rounded-xl bg-white p-8 shadow">
    <div className="flex items-center justify-between"><div><h1 className="text-4xl font-bold">Property Management</h1><p className="mt-2 text-gray-600">Manage all properties</p></div><Link href="/dashboard/properties/add" className="rounded-lg bg-blue-600 px-5 py-2 text-white">+ Add Property</Link></div>
    {loading ? <p className="mt-8">Loading properties...</p> : <div className="mt-8 overflow-x-auto"><table className="w-full border-collapse border"><thead><tr className="bg-gray-200"><th className="border p-3 text-left">Project</th><th className="border p-3 text-left">Builder</th><th className="border p-3 text-left">Location</th><th className="border p-3">BHK</th><th className="border p-3">Price</th><th className="border p-3">Status</th><th className="border p-3">Action</th></tr></thead><tbody>{properties.map((property) => <tr key={property.id}><td className="border p-3">{property.project_name}</td><td className="border p-3">{property.builder_name}</td><td className="border p-3">{property.location}</td><td className="border p-3">{property.bhk}</td><td className="border p-3">₹ {Number(property.price).toLocaleString("en-IN")}</td><td className="border p-3">{property.status.replace("_", " ")}</td><td className="border p-3 whitespace-nowrap"><Link href={`/dashboard/properties/edit/${property.id}`} className="rounded bg-yellow-500 px-3 py-1 text-white">Edit</Link><button onClick={() => removeProperty(property.id)} className="ml-2 rounded bg-red-600 px-3 py-1 text-white">Delete</button></td></tr>)}{!properties.length && <tr><td colSpan={7} className="p-6 text-center text-gray-500">No properties yet.</td></tr>}</tbody></table></div>}
  </div></main>;
}
