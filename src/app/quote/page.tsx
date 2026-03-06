"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const projectTypes = [
  "Fencing",
  "Decking",
  "Siding",
  "Cabin Build / Large Order",
  "Beams & Structural",
  "DIY Project (coop, bench, raised bed, etc.)",
  "Repair / Replacement",
  "Other",
];

export default function QuotePage() {
  return (
    <Suspense fallback={null}>
      <QuoteForm />
    </Suspense>
  );
}

function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  // Capture UTM params and gclid from URL for ad attribution
  const [utmData, setUtmData] = useState<Record<string, string>>({});
  useEffect(() => {
    const params: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"].forEach((key) => {
      const val = searchParams.get(key);
      if (val) params[key] = val;
    });
    if (Object.keys(params).length > 0) setUtmData(params);
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      projectType: (form.elements.namedItem("projectType") as HTMLSelectElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
      delivery: (form.elements.namedItem("delivery") as HTMLInputElement).value,
      ...utmData,
    };
    try {
      const res = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) {
          // Fire Google Ads conversion event
          if (typeof window !== 'undefined') {
            (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'conversion', {
              send_to: 'AW-17995024889/G9xiCI3Pm4McEPmT2YRD',
              value: 1.0,
              currency: 'USD',
            });
          }
          setSubmitted(true);
        } else { setError("Something went wrong. Call us at (541) 805-1190."); }
    } catch { setError("Something went wrong. Call us at (541) 805-1190."); }
    finally { setSending(false); }
  }

  return (
    <div className="bg-offwhite min-h-screen py-16 md:py-24 overflow-hidden">
      <div className="max-w-2xl mx-auto px-4 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-64 h-64 bg-forest-700/10 rounded-full blur-3xl" />

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 md:p-14 text-center relative z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                className="w-24 h-24 bg-forest-50 text-forest-600 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl border border-forest-100"
              >
                &#10003;
              </motion.div>
              <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-charcoal uppercase tracking-wide mb-4">
                Quote Request Sent
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Thanks! We&apos;ll get back to you within 24 hours. Because we source direct,
                mill-direct pricing means no middleman markup. Ask about bulk contractor rates.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 text-sm text-gray-500">
                <p>If you need an immediate answer or want to talk through your project right now, give us a call.</p>
                <a href="tel:+15418051190" className="inline-block mt-3 font-bold text-forest-700 text-lg hover:text-amber-500 transition-colors">
                  (541) 805-1190
                </a>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSubmitted(false)}
                className="mt-8 text-sm font-semibold uppercase tracking-wider text-gray-400 hover:text-gray-700 transition-colors"
              >
                Submit another quote
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className="text-center mb-10">
                <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-bold text-charcoal uppercase tracking-wide mb-4">
                  Request a Quote
                </h1>
                <p className="text-gray-600 text-lg max-w-xl mx-auto">
                  Tell us what you&apos;re building. We&apos;ll put together a
                  no-obligation quote &mdash; typically within 24 hours.
                </p>
              </div>

              <motion.div
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10"
                whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.05)" }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="relative group">
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 group-focus-within:text-forest-700 transition-colors">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3.5 text-charcoal focus:ring-0 focus:border-forest-500 outline-none transition-all shadow-sm bg-gray-50 focus:bg-white"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Phone & Email */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 group-focus-within:text-forest-700 transition-colors">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3.5 text-charcoal focus:ring-0 focus:border-forest-500 outline-none transition-all shadow-sm bg-gray-50 focus:bg-white"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="relative group">
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 group-focus-within:text-forest-700 transition-colors">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3.5 text-charcoal focus:ring-0 focus:border-forest-500 outline-none transition-all shadow-sm bg-gray-50 focus:bg-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Project type */}
                  <div className="relative group">
                    <label htmlFor="projectType" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 group-focus-within:text-forest-700 transition-colors">
                      What are you building? <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3.5 text-charcoal focus:ring-0 focus:border-forest-500 outline-none transition-all shadow-sm bg-gray-50 focus:bg-white appearance-none pr-10"
                      >
                        <option value="" disabled selected>Select a project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="relative group">
                    <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 group-focus-within:text-forest-700 transition-colors">
                      Tell us about your project <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={4}
                      placeholder="Dimensions, materials, quantities, or paste the list from our estimator..."
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3.5 text-charcoal focus:ring-0 focus:border-forest-500 outline-none transition-all shadow-sm bg-gray-50 focus:bg-white resize-y"
                    />
                  </div>

                  {/* Delivery */}
                  <div className="relative group">
                    <label htmlFor="delivery" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 group-focus-within:text-forest-700 transition-colors">
                      Delivery Location <span className="text-gray-400 font-normal lowercase tracking-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="delivery"
                      name="delivery"
                      placeholder="City or zip code for a freight estimate"
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3.5 text-charcoal focus:ring-0 focus:border-forest-500 outline-none transition-all shadow-sm bg-gray-50 focus:bg-white"
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={sending}
                      className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white py-4 rounded-lg font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase text-lg transition-colors flex justify-center items-center gap-2"
                    >
                      {sending ? "Sending..." : "Send Quote Request"}
                      {!sending && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
