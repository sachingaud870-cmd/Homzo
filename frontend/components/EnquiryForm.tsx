"use client";

import { useState } from "react";
import { createLead } from "@/lib/api";

export default function EnquiryForm({ propertyId }: { propertyId: number }) {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", location: "", budget: "", message: "" });

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      await createLead({ property: propertyId, ...form });
      alert("Enquiry submitted successfully.");
      setForm({ name: "", mobile: "", email: "", location: "", budget: "", message: "" });
    } catch {
      alert("Something went wrong. Please try again.");
    }
  }

  return <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-xl bg-gray-100 p-6">
    <input className="w-full rounded border p-3" placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
    <input className="w-full rounded border p-3" placeholder="Mobile" value={form.mobile} onChange={(event) => setForm({ ...form, mobile: event.target.value })} required />
    <input className="w-full rounded border p-3" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
    <input className="w-full rounded border p-3" placeholder="Location" value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} required />
    <input className="w-full rounded border p-3" placeholder="Budget" value={form.budget} onChange={(event) => setForm({ ...form, budget: event.target.value })} required />
    <textarea className="w-full rounded border p-3" placeholder="Message" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
    <button className="rounded-lg bg-blue-600 px-8 py-3 text-white">Submit Enquiry</button>
  </form>;
}
