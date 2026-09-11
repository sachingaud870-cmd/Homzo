"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PropertyFilter() {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [bhk, setBhk] = useState("");
  const [status, setStatus] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  function handleFilter() {
    const params = new URLSearchParams();

    if (location) {
      params.append("location", location);
    }

    if (bhk) {
      params.append("bhk", bhk);
    }

    if (status) {
      params.append("status", status);
    }

    if (minPrice) {
      params.append("min_price", minPrice);
    }

    if (maxPrice) {
      params.append("max_price", maxPrice);
    }

    router.push(`/properties?${params.toString()}`);
  }

  function clearFilters() {
    setLocation("");
    setBhk("");
    setStatus("");
    setMinPrice("");
    setMaxPrice("");

    router.push("/properties");
  }

  return (
    <div className="space-y-5">

      {/* Location */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Location
        </label>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A961]">

          </span>

          <input
            placeholder="Search location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-premium pl-10"
          />
        </div>
      </div>

      {/* BHK */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Property Type
        </label>

        <select
          value={bhk}
          onChange={(e) => setBhk(e.target.value)}
          className="input-premium cursor-pointer"
        >
          <option value="">
            Select BHK
          </option>

          <option value="1BHK">
            1 BHK
          </option>

          <option value="2BHK">
            2 BHK
          </option>

          <option value="3BHK">
            3 BHK
          </option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Property Status
        </label>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="input-premium cursor-pointer"
        >
          <option value="">
            Select Status
          </option>

          <option value="READY_TO_MOVE">
            Ready To Move
          </option>

          <option value="UNDER_CONSTRUCTION">
            Under Construction
          </option>
        </select>
      </div>

      {/* Price */}
      <div>

        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Price Range
        </label>

        <div className="grid grid-cols-2 gap-3">

          <input
            placeholder="Min ₹"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="input-premium"
          />

          <input
            placeholder="Max ₹"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="input-premium"
          />

        </div>

      </div>

      {/* Actions */}
      <div className="space-y-3 pt-2">

        <button
          onClick={handleFilter}
          className="btn-accent w-full rounded-xl py-3"
        >
          <span className="flex items-center justify-center gap-2">
            <span></span>
            Apply Filters
          </span>
        </button>

        <button
          onClick={clearFilters}
          className="btn-secondary w-full rounded-xl py-3"
        >
          Clear All Filters
        </button>

      </div>

      {/* Bottom Hint */}
      <div className="rounded-2xl border border-[#C9A961]/15 bg-gradient-to-br from-[#F5D5C8]/30 to-[#C9A961]/10 p-4">

        <div className="flex gap-3">

          <div className="text-xl">

          </div>

          <div>
            <p className="text-sm font-semibold text-[#9B7E52]">
              Smart Property Search
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Use multiple filters together to find properties
              that match your requirements.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}