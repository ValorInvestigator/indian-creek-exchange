"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Full product catalog for search
const allProducts = [
  "1x6 WRC Outs S4S SE Dry", "1x10 IC STK Shim S1S2E Dry", "1x12 IC Shim S1S2E Dry",
  "1x4 WRC Dimensional", "1x6 WRC Dimensional", "1x8 WRC Dimensional",
  "2x4 IC Dimensional", "2x6 IC Dimensional", "2x8 IC Dimensional",
  "2x10 IC Dimensional", "2x12 IC Dimensional", "3x12 IC Dimensional",
  "6x6 Timbers", "6x8 Timbers", "6x10 Timbers", "6x12 Timbers",
  "1x4 WRC Cedar Bevel Siding (Clear VG)", "1x8 IC Cedar Bevel Siding (Stained, RBHB)",
  "1x12 IC Cedar Bevel Siding (Rough)", "1x4 Cedar WP4 Paneling", "1x6 Cedar WP4 Paneling",
  "1x8 Cedar WP4 Paneling", "1x4 Cedar WP11 Siding", "1x6 Cedar WP11 Siding",
  "1x8 Cedar WP11 Siding", "5/4x6 Pecky Cedar WP11 Siding", "5/4x8 Cedar WP11 Siding",
  "5/4x12 Pecky Cedar WP11 Siding", "5/4x6 Cedar Decking (S4S)", "2x6 Cedar Decking",
  "2x8 Cedar Decking", "2x6 Redwood Decking", "2x8 Redwood Decking",
  "2x3 IC Fencing Staves", "5/4x6 Fencing Pickets", "5/4x8 Fencing Pickets",
  "3/4x6 Fencing Pickets", "3/4x8 Fencing Pickets", "3x6 Fencing Rails", "3x8 Fencing Rails",
  "Western Red Blue Stain Pine", "4\" Pine Pattern", "6\" Pine Pattern", "8\" Pine Pattern",
  "10\" Pine Pattern", "12\" Pine Pattern", "4\" Pine Ceiling", "4\" Pine Moulding",
];

const projectTypes = [
  "Subdivision / Multi-Home Development",
  "Commercial Construction",
  "Contractor Bulk Order",
  "Specialty Species or Custom Dimension",
  "Large Fencing Project",
  "Large Decking / Siding Project",
  "Other",
];

export default function SpecialtyOrdersPage() {
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const searchResults = useMemo(() => {
    if (!search.trim() || search.length < 2) return [];
    const q = search.toLowerCase();
    return allProducts.filter((p) => p.toLowerCase().includes(q));
  }, [search]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      projectType: (form.elements.namedItem("projectType") as HTMLSelectElement).value,
      species: (form.elements.namedItem("species") as HTMLInputElement).value,
      quantity: (form.elements.namedItem("quantity") as HTMLInputElement).value,
      delivery: (form.elements.namedItem("delivery") as HTMLInputElement).value,
      timeline: (form.elements.namedItem("timeline") as HTMLInputElement).value,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/specialty", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) { setSubmitted(true); } else { setError("Something went wrong. Call us at (541) 805-1190."); }
    } catch { setError("Something went wrong. Call us at (541) 805-1190."); }
    finally { setSending(false); }
  }

  return (
    <div className="bg-offwhite min-h-screen">

      {/* Hero */}
      <section className="bg-forest-900 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('/images/yard/aerial-yard.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/60 to-forest-900/95" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-amber-400 font-bold text-sm uppercase tracking-[4px] mb-4">For Builders & Contractors</p>
            <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl lg:text-7xl font-bold text-white uppercase tracking-wide mb-6 leading-none">
              All Cedar.<br />Any Volume.
            </h1>
            <p className="text-forest-100 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-4">
              The Elgin yard is the access point &mdash; not the limit.
              Indian Creek Exchange sources direct from the mill.
              There is no order too large.
            </p>
            <p className="text-forest-300 text-lg max-w-2xl mx-auto">
              Subdivision builders, commercial contractors, and large-scale buyers:
              if you need cedar by the truckload, we can make it happen.
              Search our inventory below or submit a specialty order and we will contact you directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Search */}
      <section className="bg-white border-b border-gray-200 py-10">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Search Our Inventory</p>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="e.g. 2x6 cedar, bevel siding, 6x6 timbers..."
                className="w-full border-2 border-gray-200 focus:border-forest-500 rounded-xl px-5 py-4 pl-12 text-charcoal text-lg outline-none transition-all shadow-sm"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <AnimatePresence>
              {search.length >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-3"
                >
                  {searchResults.length > 0 ? (
                    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                      {searchResults.map((product) => (
                        <div key={product} className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 last:border-b-0 hover:bg-forest-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-forest-500 shrink-0" />
                            <span className="text-charcoal font-medium">{product}</span>
                          </div>
                          <Link
                            href={`/quote?project=${encodeURIComponent(product)}`}
                            className="text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 whitespace-nowrap ml-4"
                          >
                            Get a Quote &rarr;
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex items-start gap-3">
                      <svg className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <div>
                        <p className="font-semibold text-amber-800">Not listed &mdash; that is what this page is for.</p>
                        <p className="text-amber-700 text-sm mt-1">We can source almost anything cedar. Fill out the form below and we will contact you directly.</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-12 bg-offwhite">
        <div className="max-w-5xl mx-auto px-4 grid sm:grid-cols-3 gap-6">
          {[
            { icon: "🏗️", title: "Subdivision Scale", body: "20 homes or 200 — we work with subdivision builders and can coordinate volume delivery schedules." },
            { icon: "🌲", title: "Full Mill Access", body: "The yard in Elgin is the storefront. The supply chain behind it has no volume ceiling. All cedar species available." },
            { icon: "📞", title: "Direct Contact", body: "No middlemen on your end either. Submit below and our wholesale team contacts you directly — fast." },
          ].map((item) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-charcoal text-lg uppercase tracking-wide mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Specialty Order Form */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-forest-50 text-forest-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl border border-forest-100">&#10003;</div>
                <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-charcoal uppercase tracking-wide mb-4">Order Inquiry Sent</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-lg mx-auto">
                  Our wholesale team will be in contact with you directly. For urgent requests, call us now.
                </p>
                <a href="tel:+15418051190" className="inline-block font-bold text-forest-700 text-xl hover:text-amber-500 transition-colors">(541) 805-1190</a>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <div className="text-center mb-10">
                  <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-charcoal uppercase tracking-wide mb-3">Specialty Order Form</h2>
                  <p className="text-gray-500 text-lg">For bulk orders, custom dimensions, and items not listed on the site. Our wholesale team responds directly.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10 space-y-6">

                  {/* Name + Company */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 group-focus-within:text-forest-700 transition-colors">
                        Contact Name <span className="text-red-400">*</span>
                      </label>
                      <input type="text" id="name" name="name" required placeholder="John Smith"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-charcoal focus:border-forest-500 outline-none transition-all bg-gray-50 focus:bg-white" />
                    </div>
                    <div className="relative group">
                      <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 group-focus-within:text-forest-700 transition-colors">
                        Company Name
                      </label>
                      <input type="text" id="company" name="company" placeholder="Smith Builders LLC"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-charcoal focus:border-forest-500 outline-none transition-all bg-gray-50 focus:bg-white" />
                    </div>
                  </div>

                  {/* Phone + Email */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 group-focus-within:text-forest-700 transition-colors">
                        Phone <span className="text-red-400">*</span>
                      </label>
                      <input type="tel" id="phone" name="phone" required placeholder="(555) 123-4567"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-charcoal focus:border-forest-500 outline-none transition-all bg-gray-50 focus:bg-white" />
                    </div>
                    <div className="relative group">
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 group-focus-within:text-forest-700 transition-colors">
                        Email
                      </label>
                      <input type="email" id="email" name="email" placeholder="john@smithbuilders.com"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-charcoal focus:border-forest-500 outline-none transition-all bg-gray-50 focus:bg-white" />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="relative group">
                    <label htmlFor="projectType" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 group-focus-within:text-forest-700 transition-colors">
                      Project Type <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select id="projectType" name="projectType" required
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-charcoal focus:border-forest-500 outline-none transition-all bg-gray-50 focus:bg-white appearance-none pr-10">
                        <option value="" disabled>Select project type</option>
                        {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Species + Quantity */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label htmlFor="species" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 group-focus-within:text-forest-700 transition-colors">
                        Species / Material Needed
                      </label>
                      <input type="text" id="species" name="species" placeholder="e.g. Western Red Cedar, 2x6"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-charcoal focus:border-forest-500 outline-none transition-all bg-gray-50 focus:bg-white" />
                    </div>
                    <div className="relative group">
                      <label htmlFor="quantity" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 group-focus-within:text-forest-700 transition-colors">
                        Estimated Quantity
                      </label>
                      <input type="text" id="quantity" name="quantity" placeholder="e.g. 10,000 BF, 3 truckloads"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-charcoal focus:border-forest-500 outline-none transition-all bg-gray-50 focus:bg-white" />
                    </div>
                  </div>

                  {/* Delivery + Timeline */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label htmlFor="delivery" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 group-focus-within:text-forest-700 transition-colors">
                        Delivery Location <span className="text-red-400">*</span>
                      </label>
                      <input type="text" id="delivery" name="delivery" required placeholder="City, State or ZIP"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-charcoal focus:border-forest-500 outline-none transition-all bg-gray-50 focus:bg-white" />
                    </div>
                    <div className="relative group">
                      <label htmlFor="timeline" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 group-focus-within:text-forest-700 transition-colors">
                        Timeline
                      </label>
                      <input type="text" id="timeline" name="timeline" placeholder="e.g. Q2 2025, ASAP, 6 months"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-charcoal focus:border-forest-500 outline-none transition-all bg-gray-50 focus:bg-white" />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="relative group">
                    <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 group-focus-within:text-forest-700 transition-colors">
                      Additional Details
                    </label>
                    <textarea id="notes" name="notes" rows={4}
                      placeholder="Specs, dimensions, grades, phasing schedule, or anything else we should know..."
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-charcoal focus:border-forest-500 outline-none transition-all bg-gray-50 focus:bg-white resize-y" />
                  </div>

                  {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={sending}
                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white py-4 rounded-lg font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase text-lg transition-colors flex justify-center items-center gap-2"
                  >
                    {sending ? "Sending..." : "Submit Specialty Order"}
                    {!sending && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                  </motion.button>

                  <p className="text-center text-xs text-gray-400">
                    Or call us directly: <a href="tel:+15418051190" className="font-bold text-forest-700 hover:text-amber-500 transition-colors">(541) 805-1190</a>
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
