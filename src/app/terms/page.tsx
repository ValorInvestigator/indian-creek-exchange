import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Terms of service, sales conditions, and legal information for Indian Creek Exchange cedar lumber in Elgin, Oregon.",
    alternates: { canonical: "/terms" },
};

export default function TermsOfServicePage() {
    return (
        <div className="bg-offwhite min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 prose prose-lg prose-forest bg-white p-8 md:p-12 shadow-sm rounded-lg border border-gray-100">
                <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-charcoal uppercase tracking-wide mb-6">
                    Terms of Service
                </h1>
                <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                <p className="mb-4">
                    Welcome to Indian Creek Exchange. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
                </p>

                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal uppercase tracking-wide mt-8 mb-4">
                    1. Quotes and Pricing
                </h2>
                <p className="mb-4">
                    All quotes provided through our estimator tools, forms, or over the phone are estimates based on the information provided. While we make every effort to maintain accurate and up-to-date pricing, lumber is a commodity and prices are subject to change without notice. A quote does not constitute a binding contract until a final purchase order is generated and paid.
                </p>

                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal uppercase tracking-wide mt-8 mb-4">
                    2. Lumber Dimensions and Grading
                </h2>
                <p className="mb-4">
                    Lumber sizes provided (e.g., 2x4, 4x4) are &quot;nominal&quot; sizes, not actual dimensions, in accordance with industry standards. Surfaced lumber will have smaller actual dimensions. We grade our cedar based on standard western lumber grading rules. Due to the natural characteristics of wood, some variation in color, grain, and knots is to be expected and does not constitute a defect unless it falls beneath the designated grade threshold.
                </p>

                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal uppercase tracking-wide mt-8 mb-4">
                    3. Returns and Refunds
                </h2>
                <p className="mb-4">
                    Standard stock items may be returned within 14 days of purchase if they are in their original, uncut, and clean condition. Returns may be subject to a restocking fee. Custom milled orders, special orders, and clearance items are final sale and non-refundable.
                </p>

                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal uppercase tracking-wide mt-8 mb-4">
                    4. Delivery Services
                </h2>
                <p className="mb-4">
                    Delivery is available for qualifying orders based on a per-loaded-mile charge. Delivery times are estimates, and Indian Creek Exchange is not liable for delays caused by weather, equipment failure, or other unforeseen circumstances. It is the customer&apos;s responsibility to ensure a safe and accessible drop location.
                </p>

                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal uppercase tracking-wide mt-8 mb-4">
                    5. Limitation of Liability
                </h2>
                <p className="mb-4">
                    Indian Creek Exchange provides materials only. We are not contractors, and we do not guarantee that materials estimated by our tools or staff will exactly match your project&apos;s structural or legal requirements. Always consult local building codes and a licensed professional. In no event shall Indian Creek Exchange be liable for indirect, incidental, or consequential damages arising from the use of our products or website.
                </p>

                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal uppercase tracking-wide mt-8 mb-4">
                    6. Governing Law
                </h2>
                <p className="mb-4">
                    These Terms shall be governed by and construed in accordance with the laws of the State of Oregon, without regard to its conflict of law provisions. Any dispute arising from these terms shall be resolved in the appropriate courts located in Union County, Oregon.
                </p>

                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal uppercase tracking-wide mt-8 mb-4">
                    Contact Information
                </h2>
                <address className="not-italic bg-forest-50 p-6 rounded-md border border-forest-100">
                    <strong>Indian Creek Exchange</strong><br />
                    810 Inkwood St<br />
                    Elgin, OR 97827<br />
                    Phone: <a href="tel:+15418051190" className="text-forest-700 hover:text-amber-500 transition-colors">(541) 805-1190</a>
                </address>
            </div>
        </div>
    );
}
