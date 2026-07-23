import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

const BASE_URL = "https://architassociates.com";

export const metadata: Metadata = {
    title: "Best Lab Equipment in India (2026 Buyer's Guide)",
    description:
        "Looking for the best lab equipment in India? Complete buyer's guide to laboratory testing equipment — cement, concrete, soil, bitumen & material testing instruments, IS/ASTM standards, and how to choose a reliable supplier.",
    keywords: [
        "best lab equipment in India",
        "best laboratory equipment suppliers India",
        "lab testing equipment India",
        "civil material testing equipment",
        "laboratory testing instruments Delhi",
        "CBR testing machine supplier",
        "compression testing machine India",
    ],
    alternates: {
        canonical: "/best-lab-equipment-india",
    },
    openGraph: {
        type: "article",
        url: `${BASE_URL}/best-lab-equipment-india`,
        title: "Best Lab Equipment in India — 2026 Buyer's Guide | Archit Associates",
        description:
            "How to choose the best laboratory testing equipment in India: standards, categories, calibration, and supplier checklist.",
    },
};

const faqs = [
    {
        question: "What lab equipment does a civil material testing laboratory need in India?",
        answer: "A typical civil testing lab requires compression testing machines for concrete cubes, CBR testing machines for soil, cement testing equipment (Vicat apparatus, Le Chatelier moulds, cube moulds), sieve shakers and IS sieves for aggregates, slump cones for workability, and bitumen testing equipment such as penetrometers and ductility machines. The exact list depends on whether the lab tests concrete, soil, aggregates, bitumen, or all of these.",
    },
    {
        question: "Which standards should laboratory testing equipment in India conform to?",
        answer: "For Indian projects, equipment should conform to the relevant IS codes published by the Bureau of Indian Standards — for example IS 516 for concrete strength testing, IS 4031 for cement testing, and IS 2720 for soil testing. Labs serving international projects may also need ASTM, BS, or EN compliant instruments. Always confirm the applicable standard with your project specification before purchasing.",
    },
    {
        question: "How do I choose between lab equipment suppliers in India?",
        answer: "Compare suppliers on five points: conformity of instruments to IS/ASTM standards, availability of calibration certificates, build quality and warranty, after-sales support and spares availability, and proven supply history with reputable clients. A supplier who serves large infrastructure companies has usually already passed demanding vendor-qualification processes.",
    },
    {
        question: "Does Archit Associates supply lab equipment across India?",
        answer: "Yes. Archit Associates is a New Delhi-based supplier of laboratory testing equipment, railway inspection gauges, civil material testing instruments, surveying equipment, and industrial safety gear, supplying to infrastructure and manufacturing companies across India. You can request a quotation for any product directly on this website.",
    },
    {
        question: "How do I get a price for lab testing equipment?",
        answer: "Prices vary with capacity, automation level, and standard conformity — a hand-operated machine and a fully automatic one can differ several times in cost. The fastest way to get an accurate price is to request a quote with your required specification and quantity; you will receive a tailored quotation rather than a generic list price.",
    },
];

const equipmentSections = [
    {
        title: "Concrete & Cement Testing Equipment",
        body: "The backbone of every civil lab. Compression testing machines (manual, semi-automatic, and fully automatic), cube and cylinder moulds, Vicat apparatus for setting time, Le Chatelier apparatus for soundness, flow tables, and curing tanks. For site work, slump cones and rebound hammers handle quick quality checks. Look for load frames calibrated against IS 516 requirements — our compression testing machine buying guide walks through capacity, automation level, and compliance in detail.",
        href: "/compression-testing-machine-buying-guide",
        linkText: "How to Choose a Compression Testing Machine",
    },
    {
        title: "Soil, Geotechnical & Road Testing Equipment",
        body: "CBR testing machines, Proctor compaction apparatus, direct shear machines, permeability equipment, sieve shakers with IS sieve sets, and field density kits. Road and bitumen labs add penetrometers, ductility testing machines, Marshall stability apparatus, and softening point equipment per IS 2720 and IS 1203 series.",
        href: "/products/civil-material-testing",
        linkText: "Soil & Road Testing Range",
    },
    {
        title: "Chemical, Paint & Coating Testing Instruments",
        body: "DFT coating thickness gauges, gloss meters, adhesion testers, salt spray chambers for corrosion testing, digital pH and TDS meters, turbidity meters, flow cups, and conical mandrel bend testers. Essential for paint shops, galvanizing units, and quality departments in manufacturing.",
        href: "/products",
        linkText: "Chemical & Paint Testing Instruments",
    },
    {
        title: "General Laboratory Utility Equipment",
        body: "The instruments every lab needs regardless of discipline: digital vernier calipers and micrometers, noise level meters, lux meters, anemometers, ultrasonic cleaners, flammable storage cabinets, and sample collection supplies.",
        href: "/products/general-lab-utility",
        linkText: "General Lab Utility Equipment",
    },
    {
        title: "Railway & Precision Inspection Gauges",
        body: "A specialised category where Archit Associates is particularly strong: toe gap gauges, digital master gauges, sleeper checking gauges, RT3705 inspection gauges, and RT381 insert checking gauges for PSC sleeper manufacturers and railway contractors.",
        href: "/toe-gap-gauge",
        linkText: "Railway Toe Gap Gauges & Inspection Gauges",
    },
    {
        title: "Surveying & Field Monitoring Instruments",
        body: "Total stations, auto levels and theodolites, laser distance meters, levelling staff, and weather stations — for labs and project teams that also handle field measurement and monitoring.",
        href: "/products/surveying-field-monitoring",
        linkText: "Surveying Instruments",
    },
];

export default function BestLabEquipmentIndiaPage() {
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
            {
                "@type": "ListItem",
                position: 2,
                name: "Best Lab Equipment in India",
                item: `${BASE_URL}/best-lab-equipment-india`,
            },
        ],
    };

    return (
        <div className="pt-32 min-h-screen pb-20 bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                {/* Hero */}
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-4">
                    Buyer&apos;s Guide · Updated July 2026
                </p>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.025em] mb-6 leading-[1.1]">
                    Best Lab Equipment in India: The Complete Buyer&apos;s Guide
                </h1>
                <p className="text-neutral-900/60 text-lg leading-[1.65] mb-12 max-w-3xl">
                    Choosing the best laboratory testing equipment in India comes down to three
                    things: conformity to IS/ASTM standards, dependable build quality with
                    calibration support, and a supplier who stands behind the instrument after
                    delivery. This guide covers the major equipment categories, the standards
                    that matter, and a practical checklist for evaluating suppliers.
                </p>

                {/* What "best" actually means */}
                <section className="mb-14">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4">
                        What Makes Lab Equipment the &ldquo;Best&rdquo;?
                    </h2>
                    <div className="space-y-4 text-neutral-900/70 leading-[1.7]">
                        <p>
                            In industrial and civil testing, &ldquo;best&rdquo; is not about brand
                            names — it is about whether an instrument produces results your client,
                            auditor, or government inspector will accept. That means the equipment
                            must conform to the standard your test method specifies (IS 516 for
                            concrete compression, IS 2720 for soil, IS 4031 for cement, or the
                            ASTM/BS equivalents on international projects), and it must hold its
                            calibration between verification cycles.
                        </p>
                        <p>
                            Beyond compliance, the practical differentiators are build quality
                            (load frames that stay rigid, gauges that survive site conditions),
                            spares and service availability in India, and the supplier&apos;s track
                            record. Equipment that fails mid-project costs far more in delays than
                            the price difference between a good instrument and a cheap one.
                        </p>
                    </div>
                </section>

                {/* Equipment categories */}
                <section className="mb-14">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-8">
                        Lab Equipment Categories: What Indian Labs Buy
                    </h2>
                    <div className="space-y-10">
                        {equipmentSections.map((section) => (
                            <div key={section.title} className="border-l-2 border-neutral-200 pl-6">
                                <h3 className="text-xl font-semibold mb-2 tracking-[-0.015em]">
                                    {section.title}
                                </h3>
                                <p className="text-[15px] text-neutral-900/60 leading-[1.65] mb-3">
                                    {section.body}
                                </p>
                                <Link
                                    href={section.href}
                                    className="inline-flex items-center text-xs font-medium uppercase tracking-wider text-neutral-500 hover:text-black transition-colors"
                                >
                                    {section.linkText}
                                    <ArrowRight className="ml-2 w-3.5 h-3.5" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Supplier checklist */}
                <section className="mb-14">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4">
                        How to Evaluate a Lab Equipment Supplier in India
                    </h2>
                    <div className="space-y-4 text-neutral-900/70 leading-[1.7]">
                        <p>
                            Before placing an order, confirm five things with any supplier:
                            written confirmation of the IS/ASTM standard each instrument conforms
                            to; whether calibration certificates are provided or arranged;
                            warranty terms and who services the equipment in your region;
                            realistic delivery timelines for your location; and references from
                            clients in your industry. A supplier already approved as a vendor by
                            major infrastructure companies has typically been vetted on exactly
                            these points.
                        </p>
                        <p>
                            Archit Associates supplies laboratory testing equipment, railway
                            inspection gauges, civil material testing instruments, and industrial
                            safety equipment from New Delhi to clients across India&apos;s
                            infrastructure and manufacturing sectors. Every enquiry receives a
                            specification-matched quotation rather than a one-size-fits-all price
                            list.
                        </p>
                    </div>
                </section>

                {/* FAQ */}
                <section className="mb-14">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-8">
                        {faqs.map((faq) => (
                            <div key={faq.question}>
                                <h3 className="text-lg font-semibold mb-2 tracking-[-0.015em]">
                                    {faq.question}
                                </h3>
                                <p className="text-[15px] text-neutral-900/60 leading-[1.65]">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="border-t border-neutral-100 pt-10">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-3">
                        Get a Quotation for Your Lab
                    </h2>
                    <p className="text-neutral-900/60 leading-[1.65] mb-6 max-w-2xl">
                        Tell us which tests your laboratory needs to perform and we&apos;ll
                        respond with a specification-matched quotation — single instruments or
                        complete lab setups.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/request-quote"
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
