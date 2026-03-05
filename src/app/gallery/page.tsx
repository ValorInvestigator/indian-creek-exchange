"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import * as motion from "framer-motion/client";
import { AnimatePresence } from "framer-motion";

const images = [
  // Facebook gallery photos
  { src: "/images/gallery/fb-01.jpg", alt: "Cedar lumber at Indian Creek Exchange" },
  { src: "/images/gallery/fb-02.jpg", alt: "Cedar boards stacked in the yard" },
  { src: "/images/gallery/fb-03.jpg", alt: "Cedar products ready for pickup" },
  { src: "/images/gallery/fb-04.jpg", alt: "Lumber yard inventory" },
  { src: "/images/gallery/fb-05.jpg", alt: "Cedar building materials" },
  { src: "/images/gallery/fb-06.jpg", alt: "Cedar timbers and beams" },
  { src: "/images/gallery/fb-07.jpg", alt: "Fresh-cut cedar lumber" },
  { src: "/images/gallery/fb-08.jpg", alt: "Cedar fencing materials" },
  { src: "/images/gallery/fb-09.jpg", alt: "Lumber stacks in the yard" },
  { src: "/images/gallery/fb-10.jpg", alt: "Cedar siding and paneling" },
  { src: "/images/gallery/fb-11.jpg", alt: "Heavy timbers at Indian Creek Exchange" },
  { src: "/images/gallery/fb-12.jpg", alt: "Cedar lumber selection" },
  { src: "/images/gallery/fb-13.jpg", alt: "Building materials in stock" },
  { src: "/images/gallery/fb-14.jpg", alt: "Cedar products display" },
  { src: "/images/gallery/fb-15.jpg", alt: "Lumber yard operations" },
  { src: "/images/gallery/fb-16.jpg", alt: "Cedar beams and posts" },
  { src: "/images/gallery/fb-17.jpg", alt: "Indian Creek Exchange lumber yard" },
  { src: "/images/gallery/fb-18.jpg", alt: "Cedar inventory overview" },
  { src: "/images/gallery/fb-19.jpg", alt: "Cedar decking and boards" },
  { src: "/images/gallery/fb-20.jpg", alt: "Lumber products at ICE" },
  { src: "/images/gallery/fb-21.jpg", alt: "Cedar wood products" },
  { src: "/images/gallery/fb-22.jpg", alt: "Timber yard in Elgin, Oregon" },
  { src: "/images/gallery/fb-23.jpg", alt: "Cedar lumber yard overview" },
  // Original yard photos
  { src: "/images/yard/ICE.jpg", alt: "Cedar beams and timbers" },
  { src: "/images/yard/ICE-2.jpg", alt: "Lumber yard overview" },
  { src: "/images/yard/ICE-3.jpg", alt: "Cedar fence panel" },
  { src: "/images/yard/ICE-4.jpg", alt: "Cedar siding samples" },
  { src: "/images/yard/ICE-5.jpg", alt: "Cedar board detail" },
  { src: "/images/yard/ICE-7.jpg", alt: "Cedar board perspective" },
  { src: "/images/yard/ICE-8.jpg", alt: "Cedar lumber stock" },
  { src: "/images/yard/ICE-9.jpg", alt: "Cedar products" },
];

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);
  const prev = useCallback(
    () => setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : images.length - 1)),
    []
  );
  const next = useCallback(
    () => setSelectedIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : 0)),
    []
  );

  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, close, prev, next]);

  return (
    <div className="bg-offwhite">
      {/* Hero */}
      <section className="bg-forest-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-bold text-white uppercase tracking-wide">
            Photo Gallery
          </h1>
          <p className="mt-4 text-forest-200 text-lg max-w-2xl">
            Cedar lumber, timbers, fencing, decking, and more -- straight from our
            yard in Elgin, Oregon. Click any photo to view full size.
          </p>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {images.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setSelectedIndex(i)}
              >
                <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-forest-900/0 group-hover:bg-forest-900/20 transition-colors duration-300 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-700 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white uppercase tracking-wide mb-4">
            Like What You See?
          </h2>
          <p className="text-forest-100 text-lg mb-8">
            Come visit our yard in Elgin to see the full selection in person, or
            request a quote online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase transition-colors"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white/60 hover:border-white text-white px-8 py-3.5 rounded font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={close}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10 p-2"
              aria-label="Close lightbox"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 sm:left-6 text-white/70 hover:text-white z-10 p-2"
              aria-label="Previous image"
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 sm:right-6 text-white/70 hover:text-white z-10 p-2"
              aria-label="Next image"
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Counter */}
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-mono">
              {selectedIndex + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
