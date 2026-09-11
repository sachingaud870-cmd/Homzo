"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Property Buyer",
    rating: 5,
    content: "Homzo made finding my dream villa incredibly easy. The entire process was transparent and professional.",
    avatar: "RK"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Real Estate Investor",
    rating: 5,
    content: "Outstanding service! The team provided expert guidance at every step. Highly recommend for serious investors.",
    avatar: "PS"
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "First-time Homebuyer",
    rating: 5,
    content: "Professional, courteous, and efficient. They simplified the complex real estate market for me.",
    avatar: "AP"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
};

export default function Testimonials() {
  return (
    <section className="py-20 px-6 sm:px-12 bg-gradient-to-br from-[#FAF6F0] to-[#F5D5C8]/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#C9A961] font-semibold uppercase tracking-wider text-sm mb-3">What Our Clients Say</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#2C2C2C] mb-4">
            Trusted by <span className="bg-gradient-to-r from-[#D4A574] to-[#C9A961] bg-clip-text text-transparent">Thousands</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real stories from real clients who found their perfect property with Homzo
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#C9A961] text-[#C9A961]"
                  />
                ))}
              </div>

              {/* Quote */}
              <q className="text-gray-700 mb-6 font-light leading-relaxed">
                {testimonial.content}
              </q>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#E8C4B3] to-[#D4A574] flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-[#2C2C2C]">{testimonial.name}</p>
                  <p className="text-sm text-[#C9A961]">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-[#E8C4B3] to-[#D4A574] rounded-2xl p-12 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Dream Property?
          </h3>
          <p className="text-white/90 mb-6 text-lg">
            Join thousands of satisfied clients. Start your journey with Homzo today.
          </p>
          <button className="bg-white text-[#D4A574] px-8 py-4 rounded-lg font-bold hover:shadow-lg transition-all duration-300">
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  );
}
