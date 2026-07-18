import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

const BASE_URL = "https://architassociates.com";

export const metadata: Metadata = {
    title: "Toe Gap Gauge for Railway Sleepers — Manufacturer & Supplier in India",
    description:
        "Toe gap gauges, toe pin gap gauges, and master gauges for PSC railway sleeper inspection. New Delhi-based supplier serving sleeper plants and railway contractors across India. Request a quotation.",
    keywords: [
        "toe gap gauge",
        "toe gap gauge railway",
        "toe pin gap gauge",
        "railway sleeper inspection gauges",
        "PSC sleeper checking gauges",
        "insert checking gauge",
        "railway gauge supplier India",
    ],
    alternates: {
        canonical: "/toe-gap-gauge",
    },
    openGraph: {
        type: "website",
        url: `${BASE_URL}/toe-gap-gauge`,
        title: "Toe Gap Gauges for Railway Sleeper Inspection | Archit Associates",
        description:
            "Precision toe gap gauges and PSC sleeper inspection gauges from a New Delhi-based supplier serving sleeper plants across India.",
    },
};

const faqs = [
    {
        question: "What is a toe gap gauge used for?",
        answer: "A toe gap gauge is a precision inspection gauge used in PSC (pre-stressed concrete) railway sleeper manufacturing and inspection. It verifies the toe gap at the rail seat — the critical clearance that determines whether the elastic rail clip (ERC) will grip the rail foot with the correct toe load once the track is assembled. Sleepers with an out-of-tolerance toe gap can cause loose or over-stressed clips in service, so the dimension is checked as part of routine sleeper inspection.",
    },
    {
        question: "Who uses toe gap gauges in India?",
        answer: "PSC sleeper manufacturing plants, railway track contractors, and inspection agencies working on Indian Railways and metro projects. Sleeper plants use them on the production line and during final inspection; contractors and inspecting engineers use them to verify sleepers before acceptance and laying.",
    },
    {
        question: "Are the gauges made to RDSO drawings?",
        answer: "Railway sleeper inspection gauges in India are governed by RDSO-approved drawings and specifications. We supply toe gap gauges, toe pin gap gauges, master gauges, and insert checking gauges (including RT3705 inspection gauges and RT381 insert checking gauges) manufactured to the applicable drawing — share the drawing number or specification your inspection scheme requires and the gauge is supplied to match it.",
    },
    {
        question: "What other sleeper inspection gauges do you supply?",
        answer: "Alongside toe gap gauges we supply digital master gauges, toe pin gauge and master gauge sets, sleeper checking gauges, RT3705 inspection gauges, RT381 insert checking gauges, bench bolts and nuts, stencils made to requirement, and assorted precision gauges — effectively the full gauge kit a PSC sleeper plant or inspection wing needs.",
    },
    {
        question: "What is the price of a toe gap gauge?",
        answer: "Price depends on the drawing, material, and whether you need a single gauge or a set with master gauges for calibration checks. Request a quote with your drawing number or application and you will receive a specification-matched quotation, typically the same working day.",
    },
];

export default function ToeGapGaugePage() {
    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Toe Gap Gauge",
        description:
            "Precision toe gap gauge for PSC railway sleeper inspection — verifies the rail-seat toe gap that controls elastic rail clip toe load. Supplied across India by Archit Associates, New Delhi.",
        brand: { "@type": "Brand", name: "Archit Associates" },
        offers: {
            "@type": "Offer",
            url: `${BASE_URL}/toe-gap-gauge`,
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
                name: "Toe Gap Gauges for Railway Sleepers",
                item: `${BASE_URL}/toe-gap-gauge`,
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
                    Railway Sleeper Inspection Gauges · New Delhi, India
                </p>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.025em] mb-6 leading-[1.1]">
                    Toe Gap Gauges for Railway Sleeper Inspection
                </h1>
                <p className="text-neutral-900/60 text-lg leading-[1.65] mb-12 max-w-3xl">
                    Archit Associates supplies precision toe gap gauges, toe pin gap gauges,
                    master gauges, and complete PSC sleeper inspection gauge kits to sleeper
                    manufacturing plants, railway contractors, and inspection agencies across
                    India — with specification-matched quotations and pan-India delivery.
                </p>

                <section className="mb-14">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4">
                        What a Toe Gap Gauge Checks
                    </h2>
                    <div className="space-y-4 text-neutral-900/70 leading-[1.7]">
                        <p>
                            On a PSC sleeper, the rail is held down by elastic rail clips seated in
                            inserts cast into the concrete. For the clip to grip the rail foot with
                            the intended toe load, the geometry at the rail seat — the toe gap —
                            must sit within tight tolerance on every sleeper that leaves the plant.
                            A toe gap gauge is the go/no-go instrument that verifies this dimension
                            quickly and repeatably, on the production line and at final inspection.
                        </p>
                        <p>
                            Because the gauge itself is the reference, it must be manufactured to
                            the applicable inspection drawing and periodically verified against a
                            master gauge. We supply working gauges and master gauge sets together,
                            so your inspection scheme stays traceable.
                        </p>
                    </div>
                </section>

                <section className="mb-14">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4">
                        Sleeper Inspection Gauges We Supply
                    </h2>
                    <div className="space-y-3 text-neutral-900/70 leading-[1.7]">
                        <p>
                            Our railway range covers the full gauge kit for PSC sleeper
                            manufacturing and acceptance inspection:{" "}
                            <Link href="/products/railway-sleeper-inspection/toe-gap-gauges" className="underline underline-offset-2 hover:text-black">
                                toe gap gauges
                            </Link>
                            ,{" "}
                            <Link href="/products/railway-sleeper-inspection/toe-pin-gap-gauge" className="underline underline-offset-2 hover:text-black">
                                toe pin gap gauges
                            </Link>
                            ,{" "}
                            <Link href="/products/railway-sleeper-inspection/digital-master-gauges" className="underline underline-offset-2 hover:text-black">
                                digital master gauges
                            </Link>
                            ,{" "}
                            <Link href="/products/railway-sleeper-inspection/sleeper-checking-gauges" className="underline underline-offset-2 hover:text-black">
                                sleeper checking gauges
                            </Link>
                            ,{" "}
                            <Link href="/products/railway-sleeper-inspection/rt3705-inspection-gauge" className="underline underline-offset-2 hover:text-black">
                                RT3705 inspection gauges
                            </Link>
                            , and{" "}
                            <Link href="/products/railway-sleeper-inspection/rt381-insert-checking-gauge" className="underline underline-offset-2 hover:text-black">
                                RT381 insert checking gauges
                            </Link>
                            , plus stencils and bench hardware made to requirement. Browse the{" "}
                            <Link href="/products/railway-sleeper-inspection" className="underline underline-offset-2 hover:text-black">
                                complete railway sleeper inspection range
                            </Link>{" "}
                            or, if your plant also runs a materials lab, see the{" "}
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
                        Share your drawing number or inspection requirement — we&apos;ll respond
                        with a specification-matched quotation for single gauges or complete
                        sleeper inspection gauge kits.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/request-quote?product=Toe%20Gap%20Gauge"
                            className="inline-flex items-center bg-black text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors"
                        >
                            Request a Quote
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                        <Link
                            href="/products/railway-sleeper-inspection"
                            className="inline-flex items-center border border-neutral-200 px-6 py-3 text-sm font-medium hover:border-black transition-colors"
                        >
                            Browse Railway Gauges
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
