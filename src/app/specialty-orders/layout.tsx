import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bulk & Specialty Orders — Custom Milling & Volume Pricing",
  description:
    "Need bulk cedar lumber, custom milling, or specialty cuts? Indian Creek Exchange offers contractor-grade volume pricing on fencing, decking, siding, and timbers. Serving Eastern Oregon and beyond.",
  alternates: { canonical: "/specialty-orders" },
};

export default function SpecialtyOrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
