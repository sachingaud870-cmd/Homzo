"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { deleteProperty, getProperties } from "@/lib/api";
import {
  Building2,
  Check,
  CircleCheck,
  MapPin,
  Plus,
  TrendingUp,
} from "lucide-react";

type Property = {
  id: number;
  project_name: string;
  builder_name: string;
  location: string;
  bhk: string;
  price: string;
  status: string;
};

function PropertiesDashboardContent() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const searchParams = useSearchParams();

  useEffect(() => {
    getProperties()
      .then(setProperties)
      .catch(() => alert("Unable to load properties."))
      .finally(() => setLoading(false));
  }, []);

  const success = searchParams.get("success");

  const successMessage =
    success === "created"
      ? "Property created successfully."
      : success === "updated"
      ? "Property updated successfully."
      : "";

  async function removeProperty(id: number) {
    if (!window.confirm("Delete this property? This cannot be undone.")) {
      return;
    }

    try {
      await deleteProperty(id);

      setProperties((items) =>
        items.filter((item) => item.id !== id)
      );

      setMessage("Property deleted successfully.");

      setTimeout(() => {
        setMessage("");
      }, 4000);
    } catch {
      alert("Failed to delete property.");
    }
  }

  function formatStatus(status: string) {
    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  return (
    <main className="animate-fade-up min-h-screen">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A961]">
            Portfolio
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#1A3A52]">
            Property Management
          </h1>

          <p className="mt-2 text-gray-500">
            Manage, update and organize your property listings.
          </p>
        </div>

        <Link
          href="/dashboard/properties/add"
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#1A3A52] px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#0F1F2E] hover:shadow-xl"
        >
          <Plus size={18} className="transition-transform duration-300 group-hover:rotate-90" aria-hidden="true" />
          Add Property
        </Link>

      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <div className="premium-card p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Properties
              </p>

              <p className="mt-2 text-3xl font-bold text-[#1A3A52]">
                {properties.length}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8C4B3]/30 text-2xl">
              <Building2 size={22} className="text-[#9B7E52]" aria-hidden="true" />
            </div>

          </div>
        </div>

        <div className="premium-card p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Active Listings
              </p>

              <p className="mt-2 text-3xl font-bold text-emerald-600">
                {
                  properties.filter(
                    (property) =>
                      property.status !== "SOLD"
                  ).length
                }
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
              <Check size={22} aria-hidden="true" />
            </div>

          </div>
        </div>

        <div className="premium-card p-5 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Portfolio Status
              </p>

              <p className="mt-2 text-lg font-bold text-[#C9A961]">
                Growing
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9A961]/20 text-2xl">
              <TrendingUp size={22} className="text-[#9B7E52]" aria-hidden="true" />
            </div>

          </div>
        </div>

      </div>

      {/* Success Message */}
      {(message || successMessage) && (
        <div className="animate-fade-up mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 shadow-sm">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
            <CircleCheck size={20} aria-hidden="true" />
          </div>

          <div>
            <p className="font-semibold">
              Success
            </p>

            <p className="text-sm">
              {message || successMessage}
            </p>
          </div>

        </div>
      )}

      {/* Main Card */}
      <div className="overflow-hidden rounded-3xl border border-[#E8C4B3]/30 bg-white shadow-xl">

        {/* Table Header */}
        <div className="flex flex-col justify-between gap-3 border-b border-gray-100 bg-gradient-to-r from-[#FAF6F0] to-white p-6 md:flex-row md:items-center">

          <div>
            <h2 className="text-xl font-bold text-[#1A3A52]">
              Your Properties
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View and manage all your listings.
            </p>
          </div>

          <div className="rounded-full bg-[#1A3A52]/5 px-4 py-2 text-sm font-semibold text-[#1A3A52]">
            {properties.length} Listing
            {properties.length !== 1 ? "s" : ""}
          </div>

        </div>

        {/* Loading */}
        {loading ? (

          <div className="flex min-h-[300px] items-center justify-center">

            <div className="text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E8C4B3] border-t-[#C9A961]" />

              <p className="mt-4 text-sm text-gray-500">
                Loading properties...
              </p>

            </div>

          </div>

        ) : properties.length === 0 ? (

          /* Empty State */
          <div className="flex min-h-[350px] flex-col items-center justify-center p-8 text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E8C4B3]/20 text-[#9B7E52]">
              <Building2 size={36} strokeWidth={1.5} aria-hidden="true" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#1A3A52]">
              No properties yet
            </h3>

            <p className="mt-2 max-w-md text-gray-500">
              Start building your portfolio by adding your first property
              listing.
            </p>

            <Link
              href="/dashboard/properties/add"
              className="btn-accent mt-6 rounded-xl px-6 py-3"
            >
              <span className="inline-flex items-center gap-2">
                <Plus size={17} aria-hidden="true" />
                Add Your First Property
              </span>
            </Link>

          </div>

        ) : (

          /* Desktop / Mobile Table */
          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px] border-collapse">

              <thead>
                <tr className="bg-[#1A3A52] text-left text-sm text-white">

                  <th className="px-5 py-4">
                    Property
                  </th>

                  <th className="px-5 py-4">
                    Builder
                  </th>

                  <th className="px-5 py-4">
                    Location
                  </th>

                  <th className="px-5 py-4">
                    BHK
                  </th>

                  <th className="px-5 py-4">
                    Price
                  </th>

                  <th className="px-5 py-4">
                    Status
                  </th>

                  <th className="px-5 py-4 text-center">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {properties.map((property) => (

                  <tr
                    key={property.id}
                    className="group border-b border-gray-100 transition duration-200 hover:bg-[#FAF6F0]"
                  >

                    {/* Property */}
                    <td className="px-5 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8C4B3]/30 text-xl">
                          <Building2 size={19} className="text-[#9B7E52]" aria-hidden="true" />
                        </div>

                        <div>
                          <p className="font-bold text-[#1A3A52]">
                            {property.project_name}
                          </p>

                          <p className="text-xs text-gray-400">
                            Property #{property.id}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Builder */}
                    <td className="px-5 py-5 text-sm text-gray-600">
                      {property.builder_name}
                    </td>

                    {/* Location */}
                    <td className="px-5 py-5">

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={14} className="text-[#C9A961]" aria-hidden="true" />
                        {property.location}
                      </div>

                    </td>

                    {/* BHK */}
                    <td className="px-5 py-5">

                      <span className="rounded-lg bg-[#1A3A52]/5 px-3 py-1.5 text-sm font-semibold text-[#1A3A52]">
                        {property.bhk}
                      </span>

                    </td>

                    {/* Price */}
                    <td className="px-5 py-5">

                      <p className="font-bold text-[#C9A961]">
                        ₹{" "}
                        {Number(property.price).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </td>

                    {/* Status */}
                    <td className="px-5 py-5">

                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                          property.status === "SOLD"
                            ? "bg-red-100 text-red-700"
                            : property.status ===
                              "UNDER_CONSTRUCTION"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {formatStatus(property.status)}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-5 py-5">

                      <div className="flex justify-center gap-2">

                        <Link
                          href={`/dashboard/properties/edit/${property.id}`}
                          className="rounded-lg border border-[#C9A961]/40 bg-[#C9A961]/10 px-4 py-2 text-sm font-semibold text-[#9B7E52] transition hover:bg-[#C9A961] hover:text-white"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            removeProperty(property.id)
                          }
                          className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </main>
  );
}

export default function PropertiesDashboard() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#E8C4B3] border-t-[#C9A961]" />
        </div>
      }
    >
      <PropertiesDashboardContent />
    </Suspense>
  );
}
