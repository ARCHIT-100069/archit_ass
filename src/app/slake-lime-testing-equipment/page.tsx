import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

const BASE_URL = "https://architassociates.com";

export const metadata: Metadata = {
    title: "Slake Reactivity Apparatus & Lime Testing Equipment — Supplier in India",
    description:
        "Slake reactivity apparatus and lime testing equipment supplier in New Delhi, India. Digital quicklime reactivity testing, lime testing machines, and complete lime lab setups. Request a quotation.",
    keywords: [
        "slake reactivity apparatus",
        "slaking reactivity apparatus",
        "lime reactivity test apparatus",
        "lime testing equipment",
        "quicklime reactivity apparatus",
        "lime testing machine supplier India",
    ],
    alternates: {
        canonical: "/slake-lime-testing-equipment",
    },
    openGraph: {
        type: "website",
        url: `${BASE_URL}/slake-lime-testing-equipment`,
        title: "Slake Reactivity Apparatus & Lime Testing Equipment | Archit Associates",
        description:
            "Digital slake reactivity apparatus and lime testing equipment from a New Delhi-based supplier serving all India.",
    },
};

const faqs = [
    {
        question: "What does a slake reactivity apparatus measure?",
        answer: "A slake reactivity apparatus measures how vigorously quicklime (calcium oxide) reacts with water — the temperature rise of the lime-water slurry is recorded against time as the lime slakes. The reactivity result tells steel plants, chemical processors, and lime producers whether a batch of quicklime meets their process requirement. Digital models record the temperature curve automatically.",
    },
    {
        question: "Which industries need lime reactivity testing?",
        answer: "Steel and sponge iron plants (lime is a key flux), sugar mills, paper mills, chemical manufacturers, water treatment plants, and lime producers themselves. Any operation buying quicklime in bulk tests reactivity on incoming batches, because low-reactivity lime disrupts the process it feeds.",
    },
    {
        question: "What standards apply to lime testing in India?",
        answer: "Lime testing methods are covered by Indian Standards for building limes and by international practices such as ASTM C110 (physical testing of quicklime, hydrated lime, and limestone) and EN 459-2. Confirm the standard specified by your process or customer before selecting equipment — we supply apparatus configured to the method you need to run.",
    },
    {
        question: "Does Archit Associates supply slake reactivity apparatus across India?",
        answer: "Yes. We are a New Delhi-based supplier of laboratory testing equipment and supply slake reactivity apparatus, lime testing machines, and related lab instruments to plants and laboratories across India. Request a quotation on this website or contact us on WhatsApp for pricing and delivery time.",
    },
    {
        question: "What is the price of a slake reactivity apparatus?",
        answer: "Price depends on configuration — digital temperature recording, vessel capacity, stirrer arrangement, and accessories. Rather than a generic list price, request a quote with your required test method and you will receive a specification-matched quotation, typically the same working day.",
    },
];

export default function SlakeLimeTestingPage() {
    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Slake Reactivity Apparatus",
        description:
            "Slake reactivity apparatus for quicklime reactivity testing — digital temperature recording of the slaking curve. Supplied across India by Archit Associates, New Delhi.",
        brand: { "@type": "Brand", name: "Archit Associates" },
        offers: {
            "@type": "Offer",
            url: `${BASE_URL}/slake-lime-testing-equipment`,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: "Archit Associates" },
        },
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            { "@type": "ListItem", position: 2, name: "Products", item: `${BASE_URL}/products` },
            {
                "@type": "ListItem",
                position: 3,
                name: "Slake Reactivity Apparatus & Lime Testing Equipment",
                item: `${BASE_URL}/slake-lime-testing-equipment`,
            },
        ],
    };

    return (
        <div className="pt-32 min-h-screen pb-20 bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-4">
                    Laboratory Testing Equipment · New Delhi, India
                </p>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.025em] mb-6 leading-[1.1]">
                    Slake Reactivity Apparatus &amp; Lime Testing Equipment
                </h1>
                <p className="text-neutral-900/60 text-lg leading-[1.65] mb-12 max-w-3xl">
                    Archit Associates supplies slake reactivity apparatus and lime testing
                    equipment to steel plants, lime producers, and testing laboratories across
                    India — from single digital reactivity units to complete lime testing lab
                    setups, with specification-matched quotations and pan-India delivery.
                </p>

                <section className="mb-14">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4">
                        Slake Reactivity Apparatus (Quicklime Reactivity Testing)
                    </h2>
                    <div className="space-y-4 text-neutral-900/70 leading-[1.7]">
                        <p>
                            The slake reactivity apparatus determines the reactivity of quicklime
                            by recording the temperature rise of the lime–water slurry as slaking
                            proceeds. Our digital models feature an insulated slaking vessel,
                            motorised stirrer, and digital temperature indicator that captures the
                            slaking curve — giving your lab a repeatable, operator-independent
                            reactivity result on every incoming lime batch.
                        </p>
                        <p>
                            Typical configuration: insulated reaction vessel, stirrer with fixed
                            speed drive, digital temperature display with peak-hold, and
                            accessories (measuring cylinder, sample scoop). Units are supplied
                            configured to the test method your process specifies — Indian
                            Standards for building limes, ASTM C110 practice, or EN 459-2 style
                            reactivity (t-value) testing.
                        </p>
                    </div>
                </section>

                <section className="mb-14">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4">
                        Lime Testing Equipment We Supply
                    </h2>
                    <div className="space-y-3 text-neutral-900/70 leading-[1.7]">
                        <p>
                            Beyond reactivity, we equip complete lime quality-control labs:
                            lime testing machines for available lime determination, residue
                            sieves and sieve shakers, laboratory ovens, digital weighing
                            balances, pH meters, and general lab utility equipment. If your lab
                            also tests cement, soil, or aggregates, see our full{" "}
                            <Link href="/products/civil-material-testing" className="underline underline-offset-2 hover:text-black">
                                civil material testing equipment range
                            </Link>{" "}
                            or the{" "}
                            <Link href="/best-lab-equipment-india" className="underline underline-offset-2 hover:text-black">
                                lab equipment buyer&apos;s guide
                            </Link>
                            .
                        </p>
                    </div>
                </section>

                <section className="mb-14">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-8">
                        {faqs.map((faq) => (
                            <div key={faq.question}>
                                <h3 className="text-lg font-semibold mb-2 tracking-[-0.015em]">{faq.question}</h3>
                                <p className="text-[15px] text-neutral-900/60 leading-[1.65]">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="border-t border-neutral-100 pt-10">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-3">
                        Get a Quotation
                    </h2>
                    <p className="text-neutral-900/60 leading-[1.65] mb-6 max-w-2xl">
                        Tell us your test method and required configuration — we&apos;ll respond
                        with a specification-matched quotation for your slake reactivity
                        apparatus or complete lime testing lab.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/request-quote?product=Slake%20Reactivity%20Apparatus"
                            className="inline-flex items-center bg-black text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors"
                        >
                            Request a Quote
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                        <Link
                            href="/products"
                            className="inline-flex items-center border border-neutral-200 px-6 py-3 text-sm font-medium hover:border-black transition-colors"
                        >
                            Browse All Products
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
