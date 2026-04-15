"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Veranstaltungen", href: "/veranstaltungen" },
    { name: "Kontakt", href: "/kontakt" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-ppt-blue/95 backdrop-blur-md shadow-md py-4"
        : "bg-[linear-gradient(135deg,rgba(240,24,213,0.12),rgba(0,50,91,0.08),rgba(255,255,255,0.85))] backdrop-blur-md border-b border-ppt-blue/10 py-6"
        }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {/* Logo Placeholder - originally it was an image, we use text with exact colors to represent it if image is not ready yet */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center h-10"
          >
            <img
              src="/ppt-logo.png"
              alt="PPT Events"
              className="h-20 w-auto origin-left"
            />
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={link.href}
                className={`text-base font-medium transition-colors relative group ${isScrolled ? "text-white/90 hover:text-ppt-pink" : "text-ppt-blue/90 hover:text-ppt-pink"
                  }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ppt-pink transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Social Icons (Desktop) & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <div className={`hidden md:flex items-center space-x-4 ${isScrolled ? "text-white" : "text-ppt-blue"}`}>
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              href="https://www.instagram.com/pptevents/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ppt-pink transition-transform hover:scale-110 duration-200"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <circle cx="10" cy="10" r="3.3" />
                  <path d="M14.2,0H5.8C2.6,0,0,2.6,0,5.8v8.3C0,17.4,2.6,20,5.8,20h8.3c3.2,0,5.8-2.6,5.8-5.8V5.8C20,2.6,17.4,0,14.2,0zM10,15c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S12.8,15,10,15z M15.8,5C15.4,5,15,4.6,15,4.2s0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8S16.3,5,15.8,5z" />
                </svg>
              </span>
            </motion.a>
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              href="mailto:support@ppt-events.de"
              className="hover:text-ppt-pink transition-transform hover:scale-110 duration-200"
            >
              <Mail size={20} />
            </motion.a>
          </div>

          <button
            className={`md:hidden ml-4 focus:outline-none ${isScrolled ? "text-white" : "text-ppt-blue"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-ppt-blue/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 pb-32">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold text-white hover:text-ppt-pink transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-6 mt-8 text-white">
                <a
                  href="https://www.instagram.com/pptevents/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ppt-pink"
                >
                  <span className="w-7 h-7 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <circle cx="10" cy="10" r="3.3" />
                      <path d="M14.2,0H5.8C2.6,0,0,2.6,0,5.8v8.3C0,17.4,2.6,20,5.8,20h8.3c3.2,0,5.8-2.6,5.8-5.8V5.8C20,2.6,17.4,0,14.2,0zM10,15c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S12.8,15,10,15z M15.8,5C15.4,5,15,4.6,15,4.2s0.4-0.8,0.8-0.8s0.8,0.4,0.8,0.8S16.3,5,15.8,5z" />
                    </svg>
                  </span>
                </a>
                <a
                  href="mailto:support@ppt-events.de"
                  className="hover:text-ppt-pink"
                >
                  <Mail size={28} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
