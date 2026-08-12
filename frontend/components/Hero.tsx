"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, Home } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF6F0] via-[#F5D5C8]/30 to-[#FAF6F0]"></div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute top-20 right-10 w-96 h-96 bg-[#C9A961] rounded-full blur-3xl"
      ></motion.div>

      <div className="relative px-6 sm:px-12 py-20 sm:py-32 max-w-7xl mx-auto">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-[#2C2C2C] mb-4 leading-tight">
            Find Your <span className="bg-gradient-to-r from-[#D4A574] to-[#C9A961] bg-clip-text text-transparent">Dream Property</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#666] mt-6 font-light">
            Discover premium homes, villas, and commercial properties curated just for you
          </p>
        </motion.div>

        {/* Premium Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl p-2 border border-[#E8C4B3]/20 backdrop-blur-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Location Input */}
              <div className="relative col-span-1 sm:col-span-2">
                <MapPin className="absolute left-4 top-4 w-5 h-5 text-[#C9A961]" />
                <input
                  type="text"
                  placeholder="Search location..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 outline-none transition font-medium text-[#2C2C2C]"
                />
              </div>

              {/* Property Type */}
              <div className="relative">
                <Home className="absolute left-4 top-4 w-5 h-5 text-[#C9A961]" />
                <select className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 outline-none transition font-medium text-[#2C2C2C] appearance-none cursor-pointer">
                  <option>Property Type</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Commercial</option>
                  <option>Studio</option>
                </select>
              </div>

              {/* Search Button */}
              <Link
                href="/search"
                className="bg-gradient-to-r from-[#E8C4B3] to-[#D4A574] hover:shadow-lg text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Search</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto"
        >
          {[
            { number: "2,500+", label: "Premium Properties" },
            { number: "15K+", label: "Happy Clients" },
            { number: "24/7", label: "Expert Support" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-[#D4A574]">{stat.number}</p>
              <p className="text-sm text-[#666] mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}