import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery — Cedar Lumber, Projects & Yard Photos",
  description:
    "See our cedar lumber yard, inventory, and customer projects. Photos from Indian Creek Exchange in Elgin, Oregon — fencing, decking, siding, and more.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
