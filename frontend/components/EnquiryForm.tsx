"use client";

import { useState } from "react";
import { createLead } from "@/lib/api";

type FormData = {
  name: string;
  mobile: string;
  email: string;
  location: string;
  budget: string;
  message: string;
};

const initialForm: FormData = {
  name: "",
  mobile: "",
  email: "",
  location: "",
  budget: "",
  message: "",
};

export default function EnquiryForm({
  propertyId,
}: {
  propertyId: number;
}) {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function updateField(field: keyof FormData, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSuccess(false);
    setError("");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      await createLead({
        property: propertyId,
        ...form,
      });

      setSuccess(true);
      setForm(initialForm);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#C9A961]/15 bg-gradient-to-br from-white via-[#fffdfb] to-[#FAF6F0] p-6 shadow-xl md:p-8">

      {/* Decorative Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#E8C4B3]/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#C9A961]/10 blur-3xl" />

      <div className="relative">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-7">

          <div className="mb-3 flex items-center gap-2">

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C9A961]/15">
              ✦
            </span>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B7E52]">
              Property Enquiry
            </span>

          </div>

          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Interested in this property?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Share your details and our property consultant will get in touch
            with you shortly.
          </p>

        </div>

        {/* =====================================================
            SUCCESS MESSAGE
        ====================================================== */}

        {success && (
          <div className="mb-6 animate-fade-up rounded-2xl border border-emerald-200 bg-emerald-50 p-4">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-lg text-emerald-600">
                ✓
              </div>

              <div>

                <p className="font-bold text-emerald-800">
                  Enquiry Submitted Successfully
                </p>

                <p className="mt-1 text-sm leading-5 text-emerald-700">
                  Thank you for your interest. Our property consultant will
                  contact you shortly.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* =====================================================
            ERROR MESSAGE
        ====================================================== */}

        {error && (
          <div className="mb-6 animate-fade-up rounded-2xl border border-red-200 bg-red-50 p-4">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
                !
              </div>

              <div>

                <p className="font-bold text-red-800">
                  Submission Failed
                </p>

                <p className="mt-1 text-sm text-red-700">
                  {error}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* =====================================================
            FORM
        ====================================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div className="grid gap-5 md:grid-cols-2">

            {/* Name */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Full Name
              </label>

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                </span>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  className="input-premium pl-11"
                  required
                />

              </div>

            </div>

            {/* Mobile */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Mobile Number
              </label>

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                </span>

                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={form.mobile}
                  onChange={(event) =>
                    updateField("mobile", event.target.value)
                  }
                  className="input-premium pl-11"
                  required
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                </span>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  className="input-premium pl-11"
                />

              </div>

            </div>

            {/* Location */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Preferred Location
              </label>

              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                </span>

                <input
                  type="text"
                  placeholder="e.g. Kandivali, Mumbai"
                  value={form.location}
                  onChange={(event) =>
                    updateField("location", event.target.value)
                  }
                  className="input-premium pl-11"
                  required
                />

              </div>

            </div>

          </div>

          {/* Budget */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Your Budget
            </label>

            <div className="relative">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-[#9B7E52]">
                ₹
              </span>

              <input
                type="text"
                placeholder="e.g. 50 Lakh"
                value={form.budget}
                onChange={(event) =>
                  updateField("budget", event.target.value)
                }
                className="input-premium pl-11"
                required
              />

            </div>

          </div>

          {/* Message */}

          <div>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Message
            </label>

            <textarea
              rows={4}
              placeholder="Tell us what you're looking for..."
              value={form.message}
              onChange={(event) =>
                updateField("message", event.target.value)
              }
              className="input-premium resize-none"
            />

          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="group relative mt-2 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#C9A961] to-[#9B7E52] py-4 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >

            <span className="relative z-10 flex items-center justify-center gap-3">

              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Submitting Enquiry...
                </>
              ) : (
                <>
                  Send Enquiry
                  <span className="text-lg transition duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </>
              )}

            </span>

            {!loading && (
              <span className="absolute inset-0 -translate-x-full bg-white/15 transition duration-500 group-hover:translate-x-full" />
            )}

          </button>

          {/* Privacy */}

          <div className="flex items-start justify-center gap-2 text-center">

            <span className="mt-0.5 text-xs text-emerald-600">
            </span>

            <p className="max-w-lg text-xs leading-5 text-gray-400">
              Your information is secure. By submitting this form, you agree
              to be contacted by the Homzo property team.
            </p>

          </div>

        </form>

      </div>

    </div>
  );
}
