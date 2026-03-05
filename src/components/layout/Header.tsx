"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";

const navigation = [
  { name: "Products", href: "/products" },
  { name: "Estimators", href: "/estimators" },
  { name: "Resources", href: "/resources" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      scrolled ? "bg-forest-800/95 backdrop-blur-md shadow-lg" : "bg-forest-800 shadow-lg"
    )}>
      {/* Top bar */}
      <div className="bg-forest-900 text-white text-xs sm:text-sm py-2 px-4 relative z-10 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <span className="mb-1 sm:mb-0">810 Inkwood St, Elgin, OR 97827</span>
        <a href="tel:+15418051190" className="hover:text-amber-400 font-bold transition-colors">
          (541) 805-1190
        </a>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <Image
            src="/images/logo/logo-web.png"
            alt="Indian Creek Exchange"
            width={40}
            height={40}
            className="sm:w-[50px] sm:h-[50px] rounded bg-white p-0.5 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="text-white font-[family-name:var(--font-heading)] text-lg sm:text-xl font-bold tracking-wide leading-tight">
              Indian Creek Exchange
            </span>
            <span className="hidden sm:block text-amber-400 text-xs tracking-widest uppercase transition-colors duration-300 group-hover:text-white">
              Cedar Lumber & Building Materials
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white hover:text-amber-400 transition-colors text-sm font-medium tracking-wide uppercase relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300"
            >
              {item.name}
            </Link>
          ))}
          <MagneticButton>
            <Link
              href="/quote"
              className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded font-[family-name:var(--font-heading)] text-sm font-bold tracking-wider uppercase transition-colors hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0 ml-2"
            >
              Request a Quote
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-white p-2 rounded-md hover:bg-forest-700 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-forest-800/98 backdrop-blur-md border-t border-forest-600 overflow-y-auto absolute w-full top-full left-0 shadow-xl"
          >
            <div className="px-6 py-8 space-y-6 min-h-screen">
              {navigation.map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  key={item.name}
                >
                  <Link
                    href={item.href}
                    className="block text-white hover:text-amber-400 py-3 text-lg font-bold tracking-wider uppercase border-b border-forest-700/50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navigation.length * 0.05 + 0.1 }}
                className="pt-6 pb-20"
              >
                <MagneticButton className="w-full">
                  <Link
                    href="/quote"
                    className="block w-full bg-amber-500 hover:bg-amber-600 text-white text-center px-6 py-4 rounded font-[family-name:var(--font-heading)] text-lg font-bold tracking-wider uppercase shadow-md transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Request a Quote
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
