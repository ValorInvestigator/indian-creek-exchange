"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: "lumber",
    name: "Cedar Lumber & Timbers",
    items: [
      { name: "1x6 WRC Outs S4S SE Dry", description: "Western Red Cedar surfaced board, economy grade" },
      { name: "1x10 IC STK Shim S1S2E Dry", description: "Incense Cedar select tight knot shim" },
      { name: "1x12 IC Shim S1S2E Dry", description: "Incense Cedar shim, surfaced" },
      { name: "1x4 WRC Dimensional", description: "Western Red Cedar 1x4 dimensional lumber" },
      { name: "1x6 WRC Dimensional", description: "Western Red Cedar 1x6 dimensional lumber" },
      { name: "1x8 WRC Dimensional", description: "Western Red Cedar 1x8 dimensional lumber" },
      { name: "2x4 IC Dimensional", description: "Incense Cedar 2x4 framing lumber" },
      { name: "2x6 IC Dimensional", description: "Incense Cedar 2x6 framing lumber" },
      { name: "2x8 IC Dimensional", description: "Incense Cedar 2x8 framing lumber" },
      { name: "2x10 IC Dimensional", description: "Incense Cedar 2x10 heavy framing" },
      { name: "2x12 IC Dimensional", description: "Incense Cedar 2x12 heavy framing" },
      { name: "3x12 IC Dimensional", description: "Heavy Incense Cedar 3x12 planking" },
      { name: "6x6 Timbers", description: "Heavy cedar 6x6 timbers for structural posts" },
      { name: "6x8 Timbers", description: "Cedar 6x8 timbers for beams and heavy framing" },
      { name: "6x10 Timbers", description: "Massive cedar 6x10 exposed structural beams" },
      { name: "6x12 Timbers", description: "Our largest cedar 6x12 feature beams" },
    ],
    gallery: [
      "/images/products/wrc-boards.jpg",
      "/images/yard/ICE-2.jpg",
      "/images/products/cedar-beams.jpg",
      "/images/products/tg-paneling.jpg",
    ],
    description: "Rough-sawn and surfaced Western Red Cedar and Incense Cedar in every dimension. Posts, beams, planking, and trim from 1x4 through 6x12.",
  },
  {
    id: "siding",
    name: "Cedar Siding & Paneling",
    items: [
      { name: "1x4 WRC Cedar Bevel Siding (Clear VG)", description: "Premium Western Red Cedar clear vertical grain bevel siding" },
      { name: "1x8 IC Cedar Bevel Siding (Stained, RBHB)", description: "Incense Cedar bevel siding in stained or rabbit bevel profiles" },
      { name: "1x12 IC Cedar Bevel Siding (Rough)", description: "Wide rough-sawn Incense Cedar bevel siding for rustic exteriors" },
      { name: "1x4 Cedar WP4 Paneling", description: "Cedar WP4 in Clear, Clear VG, Outs, Stained, and 1/2\" Match STK" },
      { name: "1x6 Cedar WP4 Paneling", description: "Cedar WP4 in Clear, Clear VG, STK, and Wormy grades" },
      { name: "1x8 Cedar WP4 Paneling", description: "Cedar WP4 economy Outs grade" },
      { name: "1x4 Cedar WP11 Siding", description: "Incense Cedar and Western Red Cedar WP11" },
      { name: "1x6 Cedar WP11 Siding", description: "Incense Cedar and Western Red Cedar WP11" },
      { name: "1x8 Cedar WP11 Siding", description: "Incense Cedar WP11 for bold exterior shadow lines" },
      { name: "5/4x6 Pecky Cedar WP11 Siding", description: "Thick pecky cedar siding with natural character marks" },
      { name: "5/4x8 Cedar WP11 Siding", description: "Thick wide channel siding" },
      { name: "5/4x12 Pecky Cedar WP11 Siding", description: "Extra-wide dramatic pecky cedar siding" },
    ],
    gallery: [
      "/images/products/wrc1.jpg",
      "/images/products/bevel-siding.jpg",
      "/images/products/logcabin-siding.jpg",
      "/images/products/board-batten.jpg",
    ],
    description: "Multiple cedar siding profiles: Bevel, WP4, WP11. Available in premium clears, knotty, or rustic pecky grades.",
  },
  {
    id: "decking",
    name: "Cedar & Redwood Decking",
    items: [
      { name: "5/4x6 Cedar Decking (S4S)", description: "Surfaced cedar decking for smooth, classic outdoor spaces" },
      { name: "2x6 Cedar Decking", description: "Heavy-duty decking available in V-Back, K/B, and Premium grades" },
      { name: "2x8 Cedar Decking", description: "Wide cedar deck boards available in S4S and Premium grades" },
      { name: "2x6 Redwood Decking", description: "Premium redwood in V-Back profile (Premium & Merch grades)" },
      { name: "2x8 Redwood Decking", description: "Wide redwood decking, S4S (Premium & Merch grades)" },
    ],
    gallery: [
      "/images/products/decking1.jpg",
      "/images/products/cedar-decking.jpg",
      "/images/products/deck-boards.jpg",
      "/images/products/adirondack-chair.jpg",
    ],
    description: "From budget-friendly Cedar to premium Redwood. Surfaced, dried, and ready to install.",
  },
  {
    id: "fencing",
    name: "Cedar Fencing",
    items: [
      { name: "2x3 IC Fencing Staves", description: "Incense Cedar staves for fence infill and detailing" },
      { name: "5/4x6 Fencing Pickets", description: "Available in Dog Ear & Straight Top (Standard, Premium, Pecky grades)" },
      { name: "5/4x8 Fencing Pickets", description: "Wide cedar fence pickets in Dog Ear & Straight Top (Standard, Premium)" },
      { name: "3/4x6 Fencing Pickets", description: "Rough-sawn traditional fencing pickets (Dog Ear & Straight Top)" },
      { name: "3/4x8 Fencing Pickets", description: "Wide rough-sawn fencing pickets (Dog Ear & Straight Top)" },
      { name: "3x6 Fencing Rails", description: "Heavy horizontal fence rails (Standard, Rough)" },
      { name: "3x8 Fencing Rails", description: "Extra-heavy horizontal fence rails (Standard)" },
    ],
    gallery: [
      "/images/products/fence1.jpg",
      "/images/yard/ICE-3.jpg",
      "/images/products/fence-posts.jpg",
      "/images/products/lattice-panel.jpg",
    ],
    description: "Complete fencing systems: thick pickets, horizontal rails, and heavy posts in standard and premium grades.",
  },
  {
    id: "specialty",
    name: "Pine Pattern & Specialty",
    items: [
      { name: "Western Red Blue Stain Pine", description: "Blue stain pine with natural mineral streaking -- stunning as flooring, paneling, or accent walls. Pairs beautifully with cedar." },
      { name: "4\" Pine Pattern", description: "Available in WP4-2COM, WP11-2COM, WP4-CLR, and WP11-CLR profiles" },
      { name: "6\" Pine Pattern", description: "Available in WP4-2COM, WP11-2COM, and WP11-CLR profiles" },
      { name: "8\" Pine Pattern", description: "WP11-2COM profile pine pattern" },
      { name: "10\" Pine Pattern", description: "WP4-2COM profile pine pattern" },
      { name: "12\" Pine Pattern", description: "WP11-2COM and Board & Batten profiles" },
      { name: "4\" Pine Ceiling", description: "Dedicated pine ceiling pattern" },
      { name: "4\" Pine Moulding", description: "Pine edge detail and trim moulding" },
    ],
    gallery: [
      "/images/products/bluestain-pine-2.jpg",
      "/images/products/bluestain-pine-1.jpg",
      "/images/products/bluestain-pine.jpg",
      "/images/products/cedar-knot-detail.jpg",
    ],
    description: "Blue Stain Pine and Pine Pattern boards including WP4, WP11, Ceiling profiles, and Board & Batten. The blue stain pine flooring and paneling is especially popular -- see the gallery.",
  },
  {
    id: "other",
    name: "Other Items & Delivery",
    items: [
      { name: "1 Truckload Scrap", description: "By the truckload" },
      { name: "Delivery Service", description: "Per loaded mile delivery charge" },
      { name: "Restock / CC Return Fee", description: "Applicable on certain returns" },
    ],
    gallery: [
      "/images/yard/aerial-yard.jpg",
      "/images/products/logcabin-siding.jpg",
      "/images/products/garden-bed.jpg",
    ],
    description: "Scrap wood, delivery services, and administrative fees.",
  }
];

import { Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ProductsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeDimFilter, setActiveDimFilter] = useState<string>("All");
  const [activeGradeFilter, setActiveGradeFilter] = useState<string>("All");

  // Extract unique dimensions from product names (e.g., 1x6, 5/4x6, 8x8)
  const availableDimensions = useMemo(() => {
    const dims = new Set<string>();
    products.forEach(cat => {
      cat.items.forEach(item => {
        const match = item.name.match(/^(\d+(?:\/\d+)?x\d+(?:(?:\.\d+)?\+?)?)/);
        if (match) dims.add(match[1]);
        if (item.name.includes("4\" Pine")) dims.add("4\"");
        if (item.name.includes("6\" Pine")) dims.add("6\"");
        if (item.name.includes("8\" Pine")) dims.add("8\"");
        if (item.name.includes("10\" Pine")) dims.add("10\"");
        if (item.name.includes("12\" Pine")) dims.add("12\"");
      });
    });
    return ["All", ...Array.from(dims).sort()];
  }, []);

  // Define common grades we want to filter by
  const commonGrades = ["All", "Clear", "STK", "Pecky", "Standard", "Premium", "Outs"];

  // Filter products based on active filters
  const filteredProducts = useMemo(() => {
    if (activeDimFilter === "All" && activeGradeFilter === "All") return products;

    return products.map(cat => ({
      ...cat,
      items: cat.items.filter(item => {
        let matchDim = true;
        let matchGrade = true;

        if (activeDimFilter !== "All") {
          const startsWithDim = item.name.startsWith(activeDimFilter);
          const includesQuotes = (item.name.includes(`${activeDimFilter} Pine`) || item.name.includes(`${activeDimFilter}x`));
          matchDim = startsWithDim || includesQuotes || item.name.includes(activeDimFilter);
        }

        if (activeGradeFilter !== "All") {
          const searchStr = (item.name + " " + item.description).toLowerCase();
          matchGrade = searchStr.includes(activeGradeFilter.toLowerCase());

          if (activeGradeFilter === "STK") {
            matchGrade = matchGrade || searchStr.includes("select tight knot");
          }
          if (activeGradeFilter === "Clear") {
            matchGrade = matchGrade || searchStr.includes("clr");
          }
        }

        return matchDim && matchGrade;
      })
    })).filter(cat => cat.items.length > 0); // Hide empty categories
  }, [activeDimFilter, activeGradeFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxIsIntersecting = false;
        entries.forEach((entry) => {
          // If this section is crossing the threshold
          if (entry.isIntersecting) {
            maxIsIntersecting = true;
            setActiveCategory(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px", // adjust when the active category changes
        threshold: 0,
      }
    );

    products.forEach((product) => {
      const el = document.getElementById(product.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Handle smooth scrolling to fix next/link behavior overriding the offset
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100, // offset for sticky header
        behavior: "smooth"
      });
      setActiveCategory(id);
    }
  };

  return (
    <div className="bg-offwhite">
      {/* Hero */}
      <section className="bg-forest-800 py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('/images/yard/ICE.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-7xl mx-auto px-4"
        >
          <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide">
            Our Products
          </h1>
          <p className="mt-4 text-forest-200 text-lg md:text-xl max-w-2xl leading-relaxed">
            50+ cedar and lumber products on site, mill-direct pricing.
            From rough-sawn timbers to precision-milled siding profiles
            &mdash; if it&apos;s cedar, we stock it.
          </p>
        </motion.div>
      </section>

      {/* Quick nav */}
      <section className="bg-forest-900 py-4 sticky top-14 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <ul className="flex flex-row overflow-x-auto pb-2 -mx-4 px-4 md:px-0 md:mx-0 md:pb-0 gap-2 md:flex-wrap md:justify-start hide-scrollbar whitespace-nowrap lg:max-w-xl xl:max-w-2xl">
            {filteredProducts.map((cat) => (
              <li key={cat.id} className="shrink-0">
                <a
                  href={`#${cat.id}`}
                  onClick={(e) => handleScroll(e, cat.id)}
                  className={`block text-xs sm:text-sm font-semibold uppercase tracking-wider px-4 py-2 rounded transition-all duration-300 ${activeCategory === cat.id
                    ? "bg-amber-500 text-white shadow-sm"
                    : "text-forest-200 hover:text-white hover:bg-forest-700/50"
                    }`}
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center justify-center lg:justify-end">
            <div className="flex items-center gap-2">
              <label htmlFor="dimFilter" className="text-xs uppercase font-bold text-forest-300 tracking-wider">Size:</label>
              <select
                id="dimFilter"
                value={activeDimFilter}
                onChange={(e) => setActiveDimFilter(e.target.value)}
                className="bg-forest-800 text-white text-sm border-none rounded py-1 pl-2 pr-6 outline-none focus:ring-1 focus:ring-amber-500 appearance-none cursor-pointer"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23A4B8A8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .5rem top 50%', backgroundSize: '.65em auto' }}
              >
                {availableDimensions.map(dim => (
                  <option key={dim} value={dim}>{dim}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="gradeFilter" className="text-xs uppercase font-bold text-forest-300 tracking-wider">Grade:</label>
              <select
                id="gradeFilter"
                value={activeGradeFilter}
                onChange={(e) => setActiveGradeFilter(e.target.value)}
                className="bg-forest-800 text-white text-sm border-none rounded py-1 pl-2 pr-6 outline-none focus:ring-1 focus:ring-amber-500 appearance-none cursor-pointer"
                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23A4B8A8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .5rem top 50%', backgroundSize: '.65em auto' }}
              >
                {commonGrades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Product sections */}
      <AnimatePresence>
        {filteredProducts.map((category) => (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={category.id}
            id={category.id}
            className="py-16 md:py-24 border-b border-gray-200 last:border-b-0 scroll-mt-32"
          >
            <div className="max-w-7xl mx-auto px-4">
              {/* Section banner — visible on all screen sizes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg mb-10 cursor-pointer group"
                onClick={() => setSelectedImage(category.gallery[0])}
              >
                <Image
                  src={category.gallery[0]}
                  alt={`${category.name} — Indian Creek Exchange`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/50 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">Click to enlarge</span>
                </div>
              </motion.div>

              <div className="grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-start">
                {/* Left column — product list */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                  }}
                >
                  <motion.h2 variants={fadeInUp} className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-charcoal uppercase tracking-wide mb-4">
                    {category.name}
                  </motion.h2>
                  <motion.p variants={fadeInUp} className="text-gray-600 leading-relaxed text-lg mb-8 max-w-3xl">
                    {category.description}
                  </motion.p>
                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <motion.div
                        variants={fadeInUp}
                        key={item.name}
                        className="bg-white rounded-xl p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-forest-200 transition-all group"
                      >
                        <h3 className="font-bold text-charcoal text-base md:text-lg mb-1 sm:mb-2 group-hover:text-forest-700 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div variants={fadeInUp}>
                    <Link
                      href={`/quote?project=${encodeURIComponent(category.name)}`}
                      className="inline-block mt-8 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-1 active:translate-y-0 w-full sm:w-auto text-center"
                    >
                      Get a Quote for {category.name}
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Right column — sticky photo gallery (skip index 0, shown in banner above) */}
                <div className="hidden lg:block sticky top-36 space-y-4">
                  {category.gallery.slice(1).map((src, i) => (
                    <motion.div
                      key={src}
                      layoutId={`gallery-image-${src}`}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
                      className={`relative rounded-xl overflow-hidden shadow-md border border-gray-100 cursor-pointer ${i === 0 ? "h-64 sm:h-72" : "h-40 sm:h-48"
                        }`}
                      onClick={() => setSelectedImage(src)}
                      data-gallery-image="true"
                    >
                      <Image
                        src={src}
                        alt={`${category.name} product photo ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </AnimatePresence>

      {filteredProducts.length === 0 && (
        <section className="py-24 text-center">
          <div className="max-w-md mx-auto px-4">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal mb-4">No matching products found.</h2>
            <p className="text-gray-600 mb-8">Try adjusting your filters to see more results, or contact us for special orders.</p>
            <button
              onClick={() => { setActiveDimFilter("All"); setActiveGradeFilter("All"); }}
              className="bg-forest-700 hover:bg-forest-800 text-white px-6 py-2 rounded font-bold text-sm tracking-wider uppercase transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-20 bg-forest-700 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 70%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide mb-6"
          >
            Don&apos;t See What You Need?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-forest-100 text-lg mb-8 leading-relaxed"
          >
            Most of what you see here is on site and ready to load. Anything
            we don&apos;t have in the yard, we can special-order &mdash;
            usually on the next delivery. Just ask.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/quote"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded-lg font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase transition-all duration-200 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 block w-full sm:w-auto text-center"
            >
              Request a Custom Quote
            </Link>
            <Link
              href="/resources"
              className="bg-forest-800 hover:bg-forest-900 border-2 border-forest-600 text-white px-8 py-3.5 rounded-lg font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase transition-all duration-200 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 block w-full sm:w-auto text-center"
            >
              Product Guides &amp; Specs
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Liquid Image Expansion Overlay */}
      <AnimatePresence>
        {
          selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-900/90 backdrop-blur-md p-4 lg:p-12 cursor-zoom-out"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                layoutId={`gallery-image-${selectedImage}`}
                className="relative w-full max-w-6xl aspect-auto min-h-[50vh] max-h-[90vh] rounded-xl overflow-hidden shadow-2xl bg-black"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage || ""}
                  alt="Expanded product photo"
                  fill
                  className="object-contain"
                  priority
                />
                <button
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors z-10"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close fullscreen image"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </div >
  );
}
