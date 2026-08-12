"use client";

import { Suspense } from "react";
import PropertiesDashboard from "../../properties/page";

export default function LeadsPropertiesPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#FAF6F0] p-6 md:p-10">
          <div className="mx-auto max-w-7xl">

            <div className="glass-card flex min-h-[300px] items-center justify-center">

              <div className="text-center">

                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E8C4B3] border-t-[#C9A961]" />

                <p className="mt-4 text-gray-600">
                  Loading properties...
                </p>

              </div>

            </div>

          </div>
        </main>
      }
    >
      <PropertiesDashboard />
    </Suspense>
  );
}