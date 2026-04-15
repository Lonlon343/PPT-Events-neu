"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    // In a real app, integrate an API call here.
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative blurred circle */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ppt-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-ppt-pink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="bg-[#FBFCFC] rounded-3xl border border-black/5 p-8 md:p-12 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
            className="w-16 h-16 bg-ppt-pink/10 text-ppt-pink rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Mail size={32} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-ppt-pink font-bold uppercase tracking-widest text-sm md:text-base mb-4"
          >
            Newsletter
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl font-extrabold text-ppt-blue mb-8 leading-tight"
          >
            Verpasse keine Events und bleibe immer auf dem Laufenden
          </motion.h2>

          {subscribed ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-6 bg-[#E6F0EE] text-ppt-blue font-medium rounded-xl border border-ppt-blue/10"
            >
              Danke, dass du dich eingetragen hast. Du wirst in Kürze von uns hören.
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 max-w-lg mx-auto flex flex-col sm:flex-row gap-4"
            >
              <div className="flex-1 relative">
                <input 
                  type="email" 
                  required
                  placeholder="Deine E-Mail-Adresse"
                  className="w-full bg-white border border-black/10 rounded-full px-6 py-4 outline-none focus:border-ppt-pink focus:ring-2 focus:ring-ppt-pink/20 transition-all font-medium text-ppt-blue placeholder:text-zinc-400"
                />
              </div>
              <button 
                type="submit"
                className="bg-ppt-pink hover:bg-ppt-pink/90 text-white font-bold uppercase tracking-wider py-4 px-8 rounded-full transition-transform transform hover:scale-105 shadow-md hover:shadow-lg shrink-0 whitespace-nowrap"
              >
                Anmelden
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
