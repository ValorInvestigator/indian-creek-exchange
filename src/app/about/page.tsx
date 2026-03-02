import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Our Story & Supply Chain",
  description:
    "How Indian Creek Exchange brings mill-direct cedar to Eastern Oregon at wholesale prices. Located in Elgin, OR.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="bg-offwhite">
      {/* Hero */}
      <section className="bg-forest-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-bold text-white uppercase tracking-wide">
            Our Story
          </h1>
          <p className="mt-4 text-forest-200 text-lg max-w-2xl">
            How a direct supply chain brings quality cedar to Eastern Oregon at
            prices that don&apos;t make sense — until you know why.
          </p>
        </div>
      </section>

      {/* The story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-charcoal uppercase tracking-wide mb-6">
              The Supply Chain That Changed Everything
            </h2>
            <p className="text-charcoal leading-relaxed mb-4">
              Indian Creek Exchange is a small-town lumber yard on Inkwood
              Street in Elgin, Oregon &mdash; right at the edge of the Wallowa
              Mountains. Getting building materials out here used to mean a long
              drive to La Grande or paying big-box prices with three or four
              middlemen baked in.
            </p>
            <p className="text-charcoal leading-relaxed mb-4">
              That changed when Indian Creek Exchange partnered with Kennon
              Lumber right here in Elgin to build a direct mill supply chain.
              The cedar that arrives at our yard comes straight from the source.
              No distributors. No wholesalers. No retail chain taking their cut.
            </p>
            <p className="text-charcoal leading-relaxed mb-4">
              The result? A 6&times;8 cedar timber beam that runs $400 or more
              at a big-box store sells here for under $50. A 4&times;4 post
              that&apos;s $50 at a retail yard? About $11. Not because
              it&apos;s lower quality — because every middleman between the
              mill and your property has been removed.
            </p>
          </div>

          {/* Aerial photo of the yard */}
          <div className="mt-10 relative h-80 lg:h-[450px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/yard/aerial-yard.jpg"
              alt="Aerial view of Indian Creek Exchange lumber yard in Elgin, Oregon"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest-900/70 to-transparent p-4">
              <p className="text-white text-sm">
                Our yard on Inkwood Street in Elgin, Oregon
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Three entities */}
      <section className="py-16 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-charcoal text-center uppercase tracking-wide mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-forest-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-[family-name:var(--font-heading)] text-2xl font-bold">1</span>
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-charcoal uppercase mb-2">
                Mill Direct
              </h3>
              <p className="text-sm text-amber-600 font-semibold mb-2">No Middlemen</p>
              <p className="text-gray-600">
                Cedar is sourced and shipped direct to our yard — no
                distributors, no wholesalers, no retail markups stacked on top.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-forest-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-[family-name:var(--font-heading)] text-2xl font-bold">2</span>
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-charcoal uppercase mb-2">
                Indian Creek Exchange
              </h3>
              <p className="text-sm text-amber-600 font-semibold mb-2">Elgin, Oregon</p>
              <p className="text-gray-600">
                Our yard and storefront. This is where you come to pick up your
                cedar, get advice, and plan your project.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-forest-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-[family-name:var(--font-heading)] text-2xl font-bold">3</span>
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-charcoal uppercase mb-2">
                Kennon Lumber
              </h3>
              <p className="text-sm text-amber-600 font-semibold mb-2">Partner — Elgin, Oregon</p>
              <p className="text-gray-600">
                Our local partner with decades of lumber expertise, working
                alongside ICE to bring you the best cedar in Eastern Oregon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-charcoal uppercase tracking-wide mb-6">
            Service Area
          </h2>
          <p className="text-charcoal leading-relaxed mb-4">
            We&apos;re located at 810 Inkwood St in Elgin, Oregon — the closest
            cedar lumber supplier to the Wallowa Mountains. We serve:
          </p>
          <ul className="grid sm:grid-cols-2 gap-2 mb-8">
            {[
              "Elgin & Indian Creek",
              "Wallowa County & the Wallowas",
              "La Grande & Union County",
              "Enterprise & Joseph",
              "Imbler & Summerville",
              "Cove & Island City",
              "Tri-Cities (Kennewick, Richland, Pasco)",
            ].map((area) => (
              <li key={area} className="flex items-center gap-2 text-charcoal">
                <span className="text-forest-600">&#10003;</span> {area}
              </li>
            ))}
          </ul>
          <p className="text-charcoal leading-relaxed mb-8">
            For large orders, we can arrange delivery. Building a cabin in the
            Wallowas? We&apos;ll truck the materials to Elgin for pickup, or
            coordinate delivery to your build site.
          </p>
          <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/yard/ICE-2.jpg"
              alt="Indian Creek Exchange yard"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-700 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white uppercase tracking-wide mb-4">
            Come See the Difference
          </h2>
          <p className="text-forest-100 text-lg mb-8">
            Visit our yard in Elgin, or give us a call. We&apos;ll show you
            what mill-direct pricing looks like.
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
              className="border-2 border-white text-white hover:bg-white hover:text-forest-800 px-8 py-3.5 rounded font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase transition-colors"
            >
              Contact & Directions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
