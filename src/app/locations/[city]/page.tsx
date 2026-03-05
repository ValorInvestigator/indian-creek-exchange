import { Metadata } from 'next';
import Link from 'next/link';

// Use an array of supported locations to statically generate these pages at build time
const locations = [
    { slug: "la-grande", name: "La Grande", region: "the Grande Ronde Valley", keywords: "cedar fencing supply La Grande, cedar lumber La Grande, deck boards La Grande OR" },
    { slug: "elgin", name: "Elgin", region: "Eastern Oregon", keywords: "lumber yard Elgin OR, Elgin cedar lumber, local mill Elgin" },
    { slug: "enterprise", name: "Enterprise", region: "Wallowa County", keywords: "Enterprise OR lumber, cedar supply Enterprise, cabin materials Enterprise" },
    { slug: "wallowas", name: "The Wallowas", region: "the Wallowa Mountains", keywords: "custom milling Wallowa Mountains, cabin builds Wallowas, timber framing Wallowa Lake" },
    { slug: "pendleton", name: "Pendleton", region: "Umatilla County", keywords: "Pendleton OR lumber, cedar fencing Pendleton, deck packages Pendleton" },
];

export function generateStaticParams() {
    return locations.map((loc) => ({
        city: loc.slug,
    }));
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
    const location = locations.find(l => l.slug === params.city);

    if (!location) {
        return {
            title: "Local Cedar Lumber | Indian Creek Exchange",
        };
    }

    return {
        title: `Cedar Lumber & Fencing Supply in ${location.name}, OR | Indian Creek Exchange`,
        description: `Direct-from-mill cedar lumber, fencing, and decking delivered to ${location.name} and ${location.region}. Custom milling available for your next project.`,
        keywords: location.keywords,
    };
}

export default function LocationPage({ params }: { params: { city: string } }) {
    const location = locations.find(l => l.slug === params.city);

    if (!location) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Location Not Found</h1>
                    <Link href="/" className="text-amber-600 hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    // Region-specific content tailored to local building needs
    const getLocalContext = () => {
        switch (location.slug) {
            case "wallowas":
            case "enterprise":
                return "Whether you're building a new cabin near Wallowa Lake or repairing fencing before winter, our heavy timbers and custom milling services are designed to withstand heavy snow loads and harsh mountain weather.";
            case "la-grande":
            case "pendleton":
                return "From wind-resistant cedar privacy fencing to premium decking that handles the high desert sun, we supply contractors and DIYers across the valley with quality materials that last.";
            case "elgin":
                return "As your hometown mill direct supplier, we're proud to process and provide the finest locally-sourced cedar and pine right here in Elgin. Stop by the yard anytime.";
            default:
                return `We supply premium cedar products and building materials built to handle the unique weather of ${location.region}.`;
        }
    };

    return (
        <div className="bg-offwhite min-h-screen">
            {/* Localized Hero */}
            <section className="bg-forest-800 py-16 lg:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('/images/yard/ICE-2.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4">
                    <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide">
                        Cedar Lumber in <span className="text-amber-400">{location.name}</span>
                    </h1>
                    <p className="mt-6 text-forest-100 text-lg md:text-xl max-w-2xl leading-relaxed">
                        Premium cedar fencing, decking, siding, and timbers delivered directly from our mill to your job site in {location.region}.
                    </p>
                    <div className="mt-8">
                        <Link
                            href="/quote"
                            className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-all shadow-md hover:-translate-y-1"
                        >
                            Get a Quote for Delivery
                        </Link>
                    </div>
                </div>
            </section>

            {/* Local Context Section */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-charcoal mb-6">
                        Building in {location.name}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        {getLocalContext()}
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed mt-4">
                        Indian Creek Exchange cuts out the middleman. Mill-direct cedar means we provide <strong>{location.name}</strong> builders with superior quality lumber at highly competitive prices.
                    </p>
                </div>
            </section>

            {/* Top Local Products */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-charcoal uppercase tracking-wide">
                            Popular in {location.region}
                        </h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Cedar Fencing", desc: "Dog-ear pickets, flat-tops, posts, and rails for heavy-duty property lines.", link: "/products#fencing" },
                            { title: "Cedar Timbers & Beams", desc: "Massive rough-sawn timbers perfect for exposed framing and cabin accents.", link: "/products#lumber" },
                            { title: "Cedar Decking", desc: "Architectural knotty and clear cedar decking for beautiful outdoor living spaces.", link: "/products#decking" },
                        ].map(prod => (
                            <div key={prod.title} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-xl text-forest-800 mb-3">{prod.title}</h3>
                                <p className="text-gray-600 mb-6">{prod.desc}</p>
                                <Link href={prod.link} className="text-amber-600 font-bold text-sm uppercase tracking-wider hover:text-amber-700">Explore &rarr;</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Estimators CTA */}
            <section className="py-20 bg-forest-900 text-center relative overflow-hidden">
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide mb-6">
                        Plan Your {location.name} Project
                    </h2>
                    <p className="text-forest-200 text-lg mb-8 leading-relaxed">
                        Not sure how much material you need? Use our free estimators to calculate exact board footage or get a complete materials list for your next deck or fence.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/estimators"
                            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded-lg font-bold tracking-wider uppercase transition-all shadow-md hover:-translate-y-1"
                        >
                            Material Estimators
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
