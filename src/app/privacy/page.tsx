import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Learn how Indian Creek Exchange handles and protects your data. Privacy policy for our cedar lumber yard in Elgin, Oregon.",
    alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-offwhite min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 prose prose-lg prose-forest bg-white p-8 md:p-12 shadow-sm rounded-lg border border-gray-100">
                <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-charcoal uppercase tracking-wide mb-6">
                    Privacy Policy
                </h1>
                <p className="text-sm text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

                <p className="mb-4">
                    At Indian Creek Exchange, we respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website indian-creek-exchange.com and our practices for collecting, using, maintaining, protecting, and disclosing that information.
                </p>

                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal uppercase tracking-wide mt-8 mb-4">
                    Information We Collect
                </h2>
                <p className="mb-4">We collect several types of information from and about users of our Website, including information:</p>
                <ul className="list-disc pl-6 mb-6">
                    <li className="mb-2"><strong>Personal Information:</strong> By which you may be personally identified, such as name, postal address, e-mail address, telephone number, and payment information when you request a quote or make a purchase.</li>
                    <li className="mb-2"><strong>Usage Data:</strong> About your internet connection, the equipment you use to access our Website, and usage details.</li>
                </ul>

                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal uppercase tracking-wide mt-8 mb-4">
                    How We Use Your Information
                </h2>
                <p className="mb-4">We use information that we collect about you or that you provide to us, including any personal information:</p>
                <ul className="list-disc pl-6 mb-6">
                    <li className="mb-2">To present our Website and its contents to you.</li>
                    <li className="mb-2">To provide you with information, products, or services that you request from us, including processing quotes for cedar lumber and materials.</li>
                    <li className="mb-2">To fulfill any other purpose for which you provide it.</li>
                    <li className="mb-2">To notify you about changes to our Website or any products or services we offer.</li>
                </ul>

                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal uppercase tracking-wide mt-8 mb-4">
                    Cookies and Tracking Technologies
                </h2>
                <p className="mb-4">
                    Our Website uses "cookies" and similar tracking technologies to track the activity on our Website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Website.
                </p>

                <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal uppercase tracking-wide mt-8 mb-4">
                    Contact Information
                </h2>
                <p className="mb-4">
                    To ask questions or comment about this privacy policy and our privacy practices, contact us at:
                </p>
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
