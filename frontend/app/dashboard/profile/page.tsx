"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { BadgeCheck, Mail, UserRound } from "lucide-react";

type UserProfile = {
  username: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  date_joined: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem("access");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/profile/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load profile");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-125 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E8C4B3] border-t-[#C9A961]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="animate-fade-up rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-700">
          <UserRound size={25} aria-hidden="true" />
        </div>

        <h2 className="mt-4 text-xl font-bold text-red-800">
          Unable to load profile
        </h2>

        <p className="mt-2 text-sm text-red-600">
          Please login again to access your profile.
        </p>
      </div>
    );
  }

  const fullName =
    `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
    user.username;

  const initials = fullName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="animate-fade-up">

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C9A961]">
          Account
        </p>

        <h1 className="mt-2 text-4xl font-bold text-[#1A3A52]">
          My Profile
        </h1>

        <p className="mt-2 text-gray-500">
          Manage and view your Homzo account information.
        </p>
      </div>

      {/* Profile Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1A3A52] p-8 text-white shadow-xl">

        {/* Decorative circles */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#C9A961]/20" />
        <div className="absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-[#E8C4B3]/10" />

        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">

          {/* Avatar */}
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-[#C9A961] bg-[#E8C4B3] text-3xl font-bold text-[#1A3A52] shadow-lg">
            {initials}
          </div>

          <div>
            <p className="text-sm text-gray-300">
              Welcome back
            </p>

            <h2 className="mt-1 text-3xl font-bold">
              {fullName}
            </h2>

            <p className="mt-2 text-gray-300">
              @{user.username}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#C9A961]/20 px-4 py-2 text-sm font-semibold text-[#E8C4B3]">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Active Account
            </div>
          </div>

        </div>
      </div>

      {/* Information */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">

        {/* Personal Information */}
        <div className="premium-card p-6">

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8C4B3]/30 text-xl">
              <UserRound size={20} className="text-[#9B7E52]" aria-hidden="true" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1A3A52]">
                Personal Information
              </h2>

              <p className="text-sm text-gray-500">
                Your basic account details
              </p>
            </div>
          </div>

          <div className="space-y-4">

            <div className="rounded-xl bg-[#FAF6F0] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                First Name
              </p>

              <p className="mt-1 font-semibold text-[#2C2C2C]">
                {user.first_name || "-"}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAF6F0] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Last Name
              </p>

              <p className="mt-1 font-semibold text-[#2C2C2C]">
                {user.last_name || "-"}
              </p>
            </div>

          </div>
        </div>

        {/* Account Information */}
        <div className="premium-card p-6">

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C9A961]/20 text-xl">
              <BadgeCheck size={20} className="text-[#9B7E52]" aria-hidden="true" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1A3A52]">
                Account Information
              </h2>

              <p className="text-sm text-gray-500">
                Your Homzo account
              </p>
            </div>
          </div>

          <div className="space-y-4">

            <div className="rounded-xl bg-[#FAF6F0] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Username
              </p>

              <p className="mt-1 font-semibold text-[#2C2C2C]">
                {user.username}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAF6F0] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Email Address
              </p>

              <p className="mt-1 font-semibold text-[#2C2C2C]">
                {user.email || "-"}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAF6F0] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Member Since
              </p>

              <p className="mt-1 font-semibold text-[#2C2C2C]">
                {new Date(user.date_joined).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom message */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-[#C9A961]/30 bg-linear-to-r from-[#FAF6F0] to-[#F5D5C8]/30 p-6">

        <div className="flex items-start gap-4">

          <div className="shrink-0 text-[#9B7E52]">
            <Mail size={27} aria-hidden="true" />
          </div>

          <div>
            <h3 className="font-bold text-[#1A3A52]">
              Your Property Journey Starts Here
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              Manage your properties, track leads, and connect with buyers
              from your Homzo workspace.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
