"use client";

import Link from "next/link";

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-forest-900/95 backdrop-blur-md border-t border-forest-700 px-4 py-3 flex gap-3">
      <a
        href="tel:+15418051190"
        className="flex-1 flex items-center justify-center gap-2 bg-white text-forest-900 py-3 rounded-lg font-[family-name:var(--font-heading)] font-bold text-sm uppercase tracking-wider transition-colors active:bg-gray-100"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
        Call Now
      </a>
      <Link
        href="/quote"
        className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-white py-3 rounded-lg font-[family-name:var(--font-heading)] font-bold text-sm uppercase tracking-wider transition-colors active:bg-amber-600"
      >
        Get Quote
      </Link>
    </div>
  );
}
