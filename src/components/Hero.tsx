"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image & Gradient overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://ppt-events.de/wp-content/uploads/2022/08/AdobeStock_249512191-scaled.jpeg")' }}
      >
        <div 
          className="absolute inset-0 opacity-80"
          style={{ background: 'linear-gradient(50deg, #00325B 72%, #F018D5 100%)' }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-ppt-pink font-bold uppercase tracking-widest text-sm md:text-base mb-6"
        >
          Pars pro Toto
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8"
        >
          Gemeinsam Großes erreichen.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light"
        >
          Lass dich inspirieren und entfalte dein volles Potenzial.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="#naechste-events"
            className="inline-flex items-center space-x-2 bg-ppt-pink hover:bg-ppt-pink/90 text-white font-bold uppercase tracking-wider py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(240,24,213,0.4)] group"
          >
            <span>Events entdecken</span>
            <ArrowDown
              size={18}
              className="group-hover:translate-y-1 transition-transform duration-300"
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
