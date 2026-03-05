import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://indian-creek-exchange.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Indian Creek Exchange | Cedar Lumber & Building Materials | Elgin, OR",
    template: "%s | Indian Creek Exchange",
  },
  description:
    "Eastern Oregon's cedar lumber source. Fencing, decking, siding, beams & cabin building supplies direct from the mill — no middlemen. Serving the Wallowas, La Grande & surrounding areas.",
  keywords: [
    "cedar lumber",
    "Elgin Oregon",
    "Wallowa lumber",
    "cedar fencing",
    "cedar decking",
    "cedar siding",
    "building materials",
    "cabin supplies",
    "La Grande lumber",
    "cedar fencing supply La Grande", // hyper-local long-tail
    "custom milling Wallowa Mountains", // hyper-local long-tail
    "lumber yard Elgin",
    "Western Red Cedar",
    "Incense Cedar",
    "lumber Eastern Oregon",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Indian Creek Exchange",
    title:
      "Indian Creek Exchange | Cedar Lumber & Building Materials | Elgin, OR",
    description:
      "Eastern Oregon's cedar lumber source. Fencing, decking, siding, beams & cabin supplies direct from the mill — no middlemen.",
    images: [
      {
        url: "/images/yard/aerial-yard.jpg",
        width: 1600,
        height: 1067,
        alt: "Indian Creek Exchange lumber yard in Elgin, Oregon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Creek Exchange | Cedar Lumber | Elgin, OR",
    description:
      "Cedar fencing, decking, siding, beams & cabin supplies direct from the mill. Serving Eastern Oregon.",
    images: ["/images/yard/aerial-yard.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LumberStore",
    name: "Indian Creek Exchange",
    description:
      "Cedar lumber yard in Elgin, Oregon. Fencing, decking, siding, beams, and cabin building supplies direct from the mill.",
    url: siteUrl,
    telephone: "+1-541-805-1190",
    address: {
      "@type": "PostalAddress",
      streetAddress: "185 N Inkwood St",
      addressLocality: "Elgin",
      addressRegion: "OR",
      postalCode: "97827",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.5651,
      longitude: -117.9174,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "08:00",
        closes: "15:30",
      },
    ],
    image: `${siteUrl}/images/yard/aerial-yard.jpg`,
    priceRange: "$$",
    areaServed: [
      "Elgin, OR",
      "La Grande, OR",
      "Wallowa, OR",
      "Enterprise, OR",
      "Joseph, OR",
      "Union, OR",
      "Pendleton, OR",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cedar Lumber & Building Materials",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cedar Fencing" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cedar Siding" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cedar Decking" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cedar Timbers & Beams" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cedar Paneling" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Douglas Fir Framing" } },
      ],
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-[family-name:var(--font-body)] text-charcoal bg-offwhite min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
