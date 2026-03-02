import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Get a free quote on cedar lumber, fencing, decking, siding, and building materials from Indian Creek Exchange in Elgin, Oregon.",
  alternates: { canonical: "/quote" },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
