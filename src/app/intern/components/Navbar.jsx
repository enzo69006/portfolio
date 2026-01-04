"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Manage visibility (Hide on scroll down, Show on scroll up)
    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    // Manage style (Glassmorphism effect)
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const menuItems = [
    { label: "Accueil", href: "/" },
    { label: "Mobile", href: "/creation/mobile" },
    { label: "Web", href: "/creation/web" },
    { label: "Projets", href: "/work" },
    { label: "À propos", href: "/about" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
            y: isVisible || isMobileMenuOpen ? 0 : "-100%", 
            opacity: isVisible || isMobileMenuOpen ? 1 : 0 
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${
          isScrolled ? "pt-4" : "pt-8"
        }`}
      >
        <div
          className={`
            relative flex items-center justify-between transition-all duration-500
            ${
              isScrolled
                ? "w-[90%] md:w-[60%] bg-white/80 backdrop-blur-xl rounded-full shadow-lg border border-white/20 py-3 px-6"
                : "w-full bg-transparent py-4 px-8 md:px-12"
            }
          `}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs">
              SX
            </div>
            <span className={`font-bold tracking-tighter text-xl ${isScrolled ? "text-black" : "text-black"}`}>
              SYNTAAX
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative px-5 py-2 group"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-gray-100 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative text-sm font-medium text-gray-800 group-hover:text-black transition-colors">
                    {item.label}
                  </span>
                  {!isActive && (
                    <span className="absolute bottom-2 left-5 right-5 h-px bg-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA / Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link 
                href="/contact"
                className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    isScrolled 
                    ? "bg-black text-white hover:bg-gray-800" 
                    : "bg-black text-white hover:bg-purple-600 shadow-xl hover:shadow-purple-500/20"
                }`}
            >
                <span>Démarrer</span>
                <ArrowUpRight size={16} />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors z-50"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-white z-40 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-5xl font-bold tracking-tighter text-black hover:text-purple-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                 initial={{ opacity: 0, y: 40 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
                 className="mt-8"
              >
                  <Link 
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-8 py-4 bg-black text-white rounded-full font-bold text-xl inline-flex items-center gap-2"
                  >
                    Lancer un projet <ArrowUpRight />
                  </Link>
              </motion.div>
            </div>
            
            <div className="absolute bottom-10 left-0 w-full text-center">
                <p className="text-gray-400 uppercase tracking-widest text-xs">Syntaax Agency</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
