"use client";

import Image from "next/image";
import * as motion from "framer-motion/client";
import { useScroll, useTransform, useInView, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";

const productCategories = [
  {
    name: "Cedar Lumber & Timbers",
    description: "1x boards through 8x8 timbers — the backbone of any build",
    image: "/images/yard/ICE.jpg",
    href: "/products#lumber",
  },
  {
    name: "Cedar Fencing",
    description: "Posts, rails, pickets, and lattice for ranch and privacy fencing",
    image: "/images/products/fence1.jpg",
    href: "/products#fencing",
  },
  {
    name: "Cedar Decking",
    description: "Incense Cedar and Redwood decking in multiple profiles",
    image: "/images/products/decking1.jpg",
    href: "/products#decking",
  },
  {
    name: "Siding & Cladding",
    description: "Bevel siding, board-and-batten, shiplap, log cabin, T&G",
    image: "/images/products/wrc1.jpg",
    href: "/products#siding",
  },
  {
    name: "Framing & Structural",
    description: "Douglas Fir dimensional framing and T1-11 siding",
    image: "/images/yard/ICE-8.jpg",
    href: "/products#framing",
  },
  {
    name: "Pine Pattern & Specialty",
    description: "WP4, WP11, ceiling profiles, and board & batten in pine",
    image: "/images/yard/ICE-5.jpg",
    href: "/products#specialty",
  },
];

const trustSignals = [
  { label: "Mill-Direct Pricing", detail: "From our own supplier" },
  { label: "Elgin, Oregon", detail: "Serving the Wallowas & beyond" },
  { label: "50+ Products", detail: "Cedar, redwood & more in stock" },
  { label: "No Middlemen", detail: "You save, every board" },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

// Custom Hook for precise Counting Stats
function useCountUp(end: number, duration: number = 2) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);

        // easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(ease * end));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return { count, nodeRef };
}

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]); // Slower background
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]); // Faster foreground

  // Kinetic Typography state
  const words = ["Lumber", "Timbers", "Siding", "Decking"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Stats counters
  const { count: productsCount, nodeRef: productsRef } = useCountUp(50, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <Image
            src="/images/yard/ICE.jpg"
            alt="Cedar lumber at Indian Creek Exchange"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/90 via-forest-900/70 to-transparent z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.div variants={fadeInUp} className="overflow-hidden">
              <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-wide uppercase">
                Premium Cedar
                <span className="block h-20 text-amber-400 overflow-hidden relative">
                  <motion.span
                    key={currentWord}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="absolute"
                  >
                    {words[currentWord]}
                  </motion.span>
                </span>
              </h1>
            </motion.div>
            <motion.p style={{ y: y2 }} variants={fadeInUp} className="mt-4 text-lg sm:text-xl text-white/90 leading-relaxed max-w-lg">
              Eastern Oregon&apos;s source for quality cedar. Fencing, decking,
              siding, beams &mdash; mill-direct to your job site. No
              middlemen, no markups.
            </motion.p>
            <motion.p variants={fadeInUp} className="mt-3 text-base text-amber-300 font-semibold max-w-lg">
              Subdivision builders &amp; large contractors: there is no order too large &mdash; all cedar available at volume.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row gap-4">
              <MagneticButton>
                <Link
                  href="/quote"
                  className="group relative overflow-hidden bg-amber-500 text-white px-8 py-4 rounded font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase text-center transition-all hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] block w-full sm:w-auto"
                >
                  <span className="relative z-10">Request a Quote</span>
                  <div className="absolute inset-0 h-full w-full bg-amber-400 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></div>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/specialty-orders"
                  className="border-2 border-amber-400/80 text-amber-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 px-8 py-4 rounded font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase text-center transition-colors block w-full sm:w-auto"
                >
                  Bulk &amp; Specialty Orders
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-forest-800 py-6 overflow-hidden relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {trustSignals.map((signal) => (
            <motion.div variants={fadeInUp} key={signal.label} className="text-center group">
              <p className="text-amber-400 font-[family-name:var(--font-heading)] font-bold text-lg tracking-wide uppercase transition-transform group-hover:-translate-y-1">
                {signal.label}
              </p>
              <p className="text-forest-200 text-sm mt-1">{signal.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Value Props */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="pt-6 md:pt-0">
              <div className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-amber-500 mb-2 uppercase tracking-wide">
                Mill-Direct
              </div>
              <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold">No Middlemen. No Markups.</p>
            </div>
            <div className="pt-6 md:pt-0" ref={productsRef}>
              <div className="text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] text-charcoal mb-2">
                {productsCount}<span className="text-amber-500">+</span>
              </div>
              <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold">Cedar Products In-Stock</p>
            </div>
            <div className="pt-6 md:pt-0">
              <div className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-amber-500 mb-2 uppercase tracking-wide">
                Bulk Pricing
              </div>
              <p className="text-gray-500 uppercase tracking-widest text-sm font-semibold">Special Rates for Contractors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Two audiences */}
      <section className="py-16 bg-offwhite overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-charcoal text-center uppercase tracking-wide mb-12"
          >
            What Are You Building?
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Ranchers / Local */}
            <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="relative h-64 shrink-0">
                <Image
                  src="/images/products/chicken-coop.jpg"
                  alt="Cedar chicken coop built with Indian Creek Exchange lumber"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-[family-name:var(--font-heading)] text-2xl font-bold uppercase transition-transform transform group-hover:-translate-y-1">
                    Ranch & Home Projects
                  </h3>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-charcoal leading-relaxed mb-4 flex-grow">
                  Fencing, chicken coops, raised garden beds, benches, decks
                  &mdash; whatever you&apos;re building on your property.
                  Mill-direct pricing means you get quality cedar without the
                  retail chain markup.
                </p>
                <p className="text-forest-700 font-semibold text-sm mb-4">
                  Special pricing on bulk orders for contractors and large projects.
                </p>
                <div>
                  <MagneticButton>
                    <Link
                      href="/quote"
                      className="inline-block bg-forest-700 hover:bg-forest-800 text-white px-6 py-2.5 rounded font-bold text-sm uppercase tracking-wider transition-colors"
                    >
                      Get Your Quote
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>

            {/* Cabin owners */}
            <motion.div variants={fadeInUp} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow flex flex-col h-full">
              <div className="relative h-64 shrink-0">
                <Image
                  src="/images/products/bluestain-pine-1.jpg"
                  alt="Western Red Cedar Blue Stain Pine flooring and wall cladding"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-[family-name:var(--font-heading)] text-2xl font-bold uppercase transition-transform transform group-hover:-translate-y-1">
                    Cabin Builds & Repairs
                  </h3>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-charcoal leading-relaxed mb-4 flex-grow">
                  Building or repairing a cabin in the Wallowas? We carry
                  beams, siding, framing, decking &mdash; everything you need.
                  Large orders welcome.
                </p>
                <p className="text-forest-700 font-semibold text-sm mb-4">
                  No need to drive to La Grande or beyond. The closest cedar
                  supplier to the Wallowa Mountains is right here.
                </p>
                <div>
                  <MagneticButton>
                    <Link
                      href="/quote"
                      className="inline-block bg-forest-700 hover:bg-forest-800 text-white px-6 py-2.5 rounded font-bold text-sm uppercase tracking-wider transition-colors"
                    >
                      Plan Your Build
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product categories */}
      <section className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-charcoal text-center uppercase tracking-wide mb-4"
            >
              Our Products
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
            >
              Quality cedar and building materials, mill-direct to our yard in
              Elgin, Oregon.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {productCategories.map((cat) => (
              <motion.div variants={fadeInUp} key={cat.name} className="h-full">
                <Link
                  href={cat.href}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="relative h-48 shrink-0 overflow-hidden">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-charcoal uppercase tracking-wide group-hover:text-forest-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 flex-grow">{cat.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Estimator CTA */}
      <section className="py-16 bg-forest-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('/images/yard/ICE-2.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10 max-w-7xl mx-auto px-4 text-center"
        >
          <motion.h2 variants={fadeInUp} className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide mb-4">
            Estimate Your Materials
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-forest-100 text-lg mb-8 max-w-2xl mx-auto">
            Use our free deck and fence calculators to figure out exactly what
            you need. Then request a quote with one click.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estimators"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase transition-colors hover:scale-105 active:scale-95 duration-200 block w-full sm:w-auto"
            >
              Deck Estimator
            </Link>
            <Link
              href="/estimators"
              className="bg-white hover:bg-gray-100 text-forest-800 px-8 py-3.5 rounded font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase transition-colors hover:scale-105 active:scale-95 duration-200 block w-full sm:w-auto"
            >
              Fence Estimator
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Supply chain story */}
      <section className="py-16 bg-offwhite overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeInUp} className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-charcoal uppercase tracking-wide mb-6">
                Why Our Prices Are Different
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-charcoal leading-relaxed mb-4">
                Indian Creek Exchange has partnered with Kennon Lumber right
                here in Elgin to build a direct mill supply chain. The cedar in
                our yard goes from the source to you &mdash; no distributors,
                no wholesalers, no retail markups stacked on top of each other.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-charcoal leading-relaxed mb-4">
                Mill-direct pricing means what you pay reflects actual lumber
                value &mdash; not a retail chain&apos;s margin. Special pricing
                available on bulk orders for contractors and large projects.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-charcoal leading-relaxed mb-6">
                Indian Creek Exchange is the closest cedar supplier to the
                Wallowa Mountains, and the most affordable one for hundreds of
                miles.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link
                  href="/about"
                  className="inline-block bg-forest-700 hover:bg-forest-800 text-white px-6 py-2.5 rounded font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  Our Story
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src="/images/yard/ICE-2.jpg"
                alt="Lumber yard at Indian Creek Exchange"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-wood-800 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0) 70%)" }} />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10 max-w-3xl mx-auto px-4"
        >
          <motion.h2 variants={fadeInUp} className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold uppercase tracking-wide mb-4">
            Ready to Build?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-wood-200 text-lg mb-8">
            Whether it&apos;s a fence, a deck, or an entire cabin &mdash; we
            have the cedar and the price. Get a free, no-obligation quote today.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase transition-all duration-200 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 block w-full sm:w-auto"
            >
              Request a Quote
            </Link>
            <a
              href="tel:+15418051190"
              className="border-2 border-white text-white hover:bg-white hover:text-wood-800 px-8 py-3.5 rounded font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase transition-all duration-200 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 block w-full sm:w-auto"
            >
              Call (541) 805-1190
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
