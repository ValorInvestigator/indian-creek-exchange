import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Material Estimators — Fence, Deck & Siding Calculators",
  description:
    "Free lumber estimators for fence, deck, and siding projects. Calculate boards, posts, hardware, concrete, and more. Plan your build before you buy.",
  alternates: { canonical: "/estimators" },
};

export default function EstimatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
