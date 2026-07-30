"use client";

import { useState } from "react";
import { createLead } from "@/lib/api";

const initialForm = { name: "", mobile: "", email: "", location: "", budget: "", message: "" };

export default function LeadForm() {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createLead(formData);
      setSubmitted(true);
      setFormData(initialForm);
    } catch {
      alert("We couldn't submit your enquiry. Please try again.");
    }
  }

  return <section className="px-10 py-16"><div className="mx-auto max-w-2xl rounded-xl p-8 shadow-lg">
    <h2 className="text-3xl font-bold">Get Property Details</h2><p className="mt-2 text-gray-600">Share your details and our property expert will contact you.</p>
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <input value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className="w-full rounded-lg border p-3" placeholder="Your Name" required />
      <input type="tel" value={formData.mobile} onChange={(event) => setFormData({ ...formData, mobile: event.target.value })} className="w-full rounded-lg border p-3" placeholder="Mobile Number" required />
      <input type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className="w-full rounded-lg border p-3" placeholder="Email Address" />
      <select value={formData.location} onChange={(event) => setFormData({ ...formData, location: event.target.value })} className="w-full rounded-lg border p-3" required><option value="" disabled>Select Location</option><option value="Vasai">Vasai</option><option value="Virar">Virar</option><option value="Nalasopara">Nalasopara</option></select>
      <select value={formData.budget} onChange={(event) => setFormData({ ...formData, budget: event.target.value })} className="w-full rounded-lg border p-3" required><option value="" disabled>Budget</option><option value="Under ₹50 Lakhs">Under ₹50 Lakhs</option><option value="₹50 Lakhs - ₹1 Crore">₹50 Lakhs - ₹1 Crore</option><option value="Above ₹1 Crore">Above ₹1 Crore</option></select>
      <textarea value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} className="w-full rounded-lg border p-3" placeholder="Your Requirement" />
      <button type="submit" className="w-full rounded-lg bg-blue-600 py-3 text-white">Submit Enquiry</button>
      {submitted && <p className="mt-4 text-green-600">Thank you! Our property expert will contact you soon.</p>}
    </form>
  </div></section>;
}
