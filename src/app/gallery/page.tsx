import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Photos of Indian Creek Exchange lumber yard in Elgin, Oregon — cedar beams, timbers, fencing, siding, and more in stock.",
  alternates: { canonical: "/gallery" },
};

const images = [
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
  return (
    <div className="bg-offwhite">
      <section className="bg-forest-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-bold text-white uppercase tracking-wide">
            Gallery
          </h1>
          <p className="mt-4 text-forest-200 text-lg">
            See our cedar products and lumber up close.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img.src} className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-forest-700 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white uppercase tracking-wide mb-4">
            Like What You See?
          </h2>
          <p className="text-forest-100 text-lg mb-8">
            Come visit our yard in Elgin to see the full selection in person.
          </p>
          <Link
            href="/quote"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
