import Link from "next/link";

const productLinks = [
  { name: "Cedar Lumber & Timbers", href: "/products#lumber" },
  { name: "Cedar Fencing", href: "/products#fencing" },
  { name: "Cedar Decking", href: "/products#decking" },
  { name: "Siding & Cladding", href: "/products#siding" },
  { name: "Framing & Structural", href: "/products#lumber" },
];

const resourceLinks = [
  { name: "Deck Estimator", href: "/estimators" },
  { name: "Fence Estimator", href: "/estimators" },
  { name: "Spec Sheets & Guides", href: "/resources" },
  { name: "Gallery", href: "/gallery" },
  { name: "About Us", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {/* Brand */}
        <div>
          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-wide mb-3">
            Indian Creek Exchange
          </h3>
          <p className="text-forest-300 text-sm leading-relaxed mb-4">
            Eastern Oregon&apos;s cedar lumber source. Mill-direct pricing
            &mdash; no middlemen, no markups.
          </p>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-wider uppercase mb-4 text-amber-400">
            Products
          </h4>
          <ul className="space-y-2">
            {productLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-forest-300 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-wider uppercase mb-4 text-amber-400">
            Resources
          </h4>
          <ul className="space-y-2">
            {resourceLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-forest-300 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-wider uppercase mb-4 mt-8 text-amber-400">
            Service Areas
          </h4>
          <ul className="space-y-2 text-forest-300 text-sm">
            {[
              "Elgin, OR",
              "La Grande, OR",
              "Enterprise, OR",
              "The Wallowas",
              "Tri-Cities, WA",
              "Eastern Oregon & Beyond",
            ].map((loc) => (
              <li key={loc}>{loc}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-wider uppercase mb-4 text-amber-400">
            Visit Us
          </h4>
          <address className="not-italic text-forest-300 text-sm space-y-1">
            <p>810 Inkwood St</p>
            <p>Elgin, OR 97827</p>
            <p className="pt-1">
              <a
                href="tel:+15418051190"
                className="text-white hover:text-amber-400 font-semibold transition-colors"
              >
                (541) 805-1190
              </a>
            </p>
          </address>
          <div className="mt-4">
            <h4 className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-wider uppercase mb-2 text-amber-400">
              Hours
            </h4>
            <div className="text-forest-300 text-sm space-y-0.5">
              <p>Mon&ndash;Fri: 8:00 AM &ndash; 5:00 PM</p>
              <p>Saturday: 9:00 AM &ndash; 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
          <Link
            href="/quote"
            className="inline-block mt-4 bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 sm:py-2 rounded text-sm font-bold tracking-wider uppercase transition-colors w-full sm:w-auto text-center"
          >
            Get a Quote
          </Link>
        </div>
      </div>

      <div className="border-t border-forest-800 py-4 px-4">
        <p className="text-center text-forest-400 text-xs">
          &copy; {new Date().getFullYear()} Indian Creek Exchange. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
