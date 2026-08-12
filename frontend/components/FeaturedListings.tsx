"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Square } from "lucide-react";

const properties = [
  {
    id: 1,
    name: "Modern Sea View Villa",
    location: "Vasai Beach, Mumbai",
    price: "₹2.5 Cr",
    image: "/images/property1.jpg",
    beds: 4,
    baths: 3,
    area: "5000 sqft",
    featured: true
  },
  {
    id: 2,
    name: "Luxury Apartment Complex",
    location: "Virar West, Mumbai",
    price: "₹85 Lac",
    image: "/images/property2.jpg",
    beds: 3,
    baths: 2,
    area: "2500 sqft",
    featured: true
  },
  {
    id: 3,
    name: "Premium Residential Plot",
    location: "Vasai East, Mumbai",
    price: "₹1.2 Cr",
    image: "/images/property3.jpg",
    beds: 5,
    baths: 4,
    area: "8000 sqft",
    featured: true
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function FeaturedListings() {
  return (
    <section className="py-20 px-6 sm:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#C9A961] font-semibold uppercase tracking-wider text-sm mb-3">Featured Properties</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2C2C2C] mb-4">
            Handpicked <span className="bg-gradient-to-r from-[#D4A574] to-[#C9A961] bg-clip-text text-transparent">Luxury Listings</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our curated collection of premium properties from across the region
          </p>
        </motion.div>

        {/* Property Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {properties.map((property) => (
            <motion.div
              key={property.id}
              variants={cardVariants}
              className="group"
            >
              <Link href={`/property/${property.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer">
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-80 bg-gray-200">
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {property.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#D4A574] to-[#C9A961] text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Location */}
                    <div className="flex items-center gap-2 text-[#666] text-sm mb-3">
                      <MapPin className="w-4 h-4 text-[#C9A961]" />
                      <span>{property.location}</span>
                    </div>

                    {/* Name and Price */}
                    <h3 className="text-xl font-bold text-[#2C2C2C] mb-2 group-hover:text-[#D4A574] transition">
                      {property.name}
                    </h3>
                    <p className="text-2xl font-bold bg-gradient-to-r from-[#D4A574] to-[#C9A961] bg-clip-text text-transparent mb-4">
                      {property.price}
                    </p>

                    {/* Features */}
                    <div className="flex items-center justify-between text-sm text-[#666] mb-6 pb-6 border-b border-gray-200">
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4 text-[#C9A961]" />
                        <span>{property.beds} Beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4 text-[#C9A961]" />
                        <span>{property.baths} Baths</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="w-4 h-4 text-[#C9A961]" />
                        <span>{property.area}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-gradient-to-r from-[#E8C4B3] to-[#D4A574] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            href="/properties"
            className="inline-block bg-white border-2 border-[#D4A574] text-[#D4A574] px-10 py-4 rounded-lg font-semibold hover:bg-[#F5D5C8] transition-all duration-300"
          >
            View All Properties
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
