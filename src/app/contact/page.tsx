import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description:
    "Visit Indian Creek Exchange at 185 N Inkwood St, Elgin, OR 97827. Get directions, hours, and phone number for Eastern Oregon's cedar lumber source.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="bg-offwhite">
      <section className="bg-forest-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-bold text-white uppercase tracking-wide">
            Contact Us
          </h1>
          <p className="mt-4 text-forest-200 text-lg">
            Stop by the yard, give us a call, or send a quote request.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal uppercase tracking-wide mb-6">
              Indian Creek Exchange
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-charcoal mb-1">Address</h3>
                <p className="text-gray-600">
                  810 Inkwood St<br />
                  Elgin, OR 97827
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-charcoal mb-1">Phone</h3>
                <a
                  href="tel:+15418051190"
                  className="text-forest-700 font-semibold text-lg hover:text-forest-800 transition-colors"
                >
                  (541) 805-1190
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-charcoal mb-1">Hours</h3>
                <p className="text-gray-600">
                  Monday &ndash; Friday: 8:00 AM &ndash; 5:00 PM<br />
                  Saturday: 9:00 AM &ndash; 2:00 PM<br />
                  Sunday: Closed
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-charcoal mb-1">Partners</h3>
                <p className="text-gray-600">
                  Kennon Lumber &mdash; operating on site
                </p>
              </div>
            </div>

            <Link
              href="/quote"
              className="inline-block mt-8 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase transition-colors"
            >
              Request a Quote
            </Link>
          </div>

          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-lg h-96 lg:h-auto">
            <iframe
              title="Indian Creek Exchange Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.5!2d-117.9131!3d45.5647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54a0f0e0e0e0e0e0%3A0x0!2s810+Inkwood+St%2C+Elgin%2C+OR+97827!5e0!3m2!1sen!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
