import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Cedar Lumber, Fencing, Siding, Decking & More",
  description:
    "Browse 50+ cedar and lumber products: fencing, siding, decking, paneling, timbers, framing, trim, and specialty items. Most in stock and ready to load in Elgin, OR.",
  alternates: { canonical: "/products" },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
