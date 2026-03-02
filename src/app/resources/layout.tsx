import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources — Guides, PDFs & How-To References",
  description:
    "Free downloadable guides for cedar fencing, decking, siding installation, and wood care. Industry PDFs from WRCLA, Simpson Strong-Tie, and more.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
