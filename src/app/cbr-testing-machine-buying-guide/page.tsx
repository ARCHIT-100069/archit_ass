import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

const BASE_URL = "https://architassociates.com";

export const metadata: Metadata = {
    title: "How to Choose a CBR Testing Machine in India (IS 2720 Part 16)",
    description:
        "A buyer's guide to California Bearing Ratio (CBR) testing machines for Indian labs — IS 2720 Part 16 & IS 9669 compliance, load frame capacity, mould and soaking requirements, and how to match a machine to NH / IRC 37 subgrade work. Request a quotation.",
    keywords: [
        "CBR testing machine",
        "CBR testing machine India",
        "CBR testing machine price",
        "California Bearing Ratio test machine",
        "IS 2720 Part 16 CBR machine",
        "soil CBR testing equipment",
        "CBR testing machine supplier India",
    ],
    alternates: {
        canonical: "/cbr-testing-machine-buying-guide",
    },
    openGraph: {
        type: "article",
        url: `${BASE_URL}/cbr-testing-machine-buying-guide`,
        title: "How to Choose a CBR Testing Machine in India | Archit Associates",
        description:
            "IS 2720 Part 16 & IS 9669 compliance, load frame capacity, mould and soaking accessories, and how to match a CBR machine to NH / IRC 37 subgrade work.",
    },
};

const faqs = [
    {
        question: "Which standard covers the laboratory CBR test in India?",
        answer: "The laboratory California Bearing Ratio test is governed by IS 2720 Part 16, and the moulds and accessories are covered by IS 9669:1980. A compliant machine should state both in writing.",
    },
    {
        question: "What load frame capacity do I need for a CBR testing machine?",
        answer: "The standard reference loads are about 13.44 kN at 2.5 mm and 20.13 kN at 5.0 mm penetration, but stiff soils go higher, so a motorised load frame of at least 50 kN is the sensible baseline. It should hold a constant penetration rate of 1.25 mm/min under load.",
    },
    {
        question: "What size is a standard CBR mould?",
        answer: "A compliant CBR mould is 150 mm internal diameter and 175 mm high (about 2250 cc) with a detachable base plate and a 50 mm collar. The penetration plunger is 50 mm in diameter.",
    },
    {
        question: "How long is the soaking period for a soaked CBR test?",
        answer: "Soaked CBR requires a 96-hour (4-day) soak with 2.5 kg annular surcharge discs on top of the sample — usually two discs, up to three for thicker pavements — and a swell measurement during soaking.",
    },
    {
        question: "What CBR value is needed for a National Highway subgrade?",
        answer: "Under IRC 37, a soaked CBR of at least 8% is a common design threshold for National Highway subgrade. Lower CBR values require substantially thicker pavement, which is why the soaked test is specified.",
    },
];

export default function CbrTestingMachineGuidePage() {
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: "How to Choose a CBR Testing Machine in India (IS 2720 Part 16)",
        description:
            "Buyer's guide to California Bearing Ratio (CBR) testing machines for Indian labs — IS 2720 Part 16 and IS 9669 compliance, load frame capacity, mould and soaking requirements, and matching a machine to NH / IRC 37 subgrade work.",
        author: { "@type": "Organization", name: "Archit Associates" },
        publisher: { "@type": "Organization", name: "Archit Associates" },
        mainEntityOfPage: `${BASE_URL}/cbr-testing-machine-buying-guide`,
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
            {
                "@type": "ListItem",
                position: 2,
                name: "Lab Equipment Buying Guide",
                item: `${BASE_URL}/best-lab-equipment-india`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: "CBR Testing Machine Buying Guide",
                item: `${BASE_URL}/cbr-testing-machine-buying-guide`,
            },
        ],
    };

    return (
        <div className="pt-32 min-h-screen pb-20 bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <p className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-4">
                    Buyer&apos;s Guide · Civil Material Testing · New Delhi, India
                </p>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.025em] mb-6 leading-[1.1]">
                    How to Choose a CBR Testing Machine in India
                </h1>
                <p className="text-neutral-900/60 text-lg leading-[1.65] mb-12 max-w-3xl">
                    The California Bearing Ratio (CBR) test is one of the most requested
                    soil-strength tests in Indian road and highway work — it is how a lab
                    tells a contractor whether a subgrade is strong enough to build on,
                    and how thick the pavement above it needs to be. If your lab tests
                    soils for road, embankment, or pavement projects, a CBR testing
                    machine is core equipment. This guide covers what actually matters
                    when you buy one: the standards it must meet, the load frame you need,
                    the mould and soaking accessories that are easy to overlook, and how
                    to match the machine to the kind of jobs you take on.
                </p>

                <section className="mb-14">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4">
                        What the CBR Test Measures (and Why Buyers Care)
                    </h2>
                    <div className="space-y-4 text-neutral-900/70 leading-[1.7]">
                        <p>
                            CBR expresses the strength of a soil subgrade as a percentage of
                            the strength of a standard crushed-stone material. A higher CBR
                            means a stronger subgrade and a thinner, cheaper pavement above
                            it; a low CBR means a much thicker, costlier pavement. That single
                            number drives real money on a project, which is why highway
                            authorities specify it and why the test has to be run on a machine
                            that holds the standard conditions precisely.
                        </p>
                        <p>
                            As a rough illustration of the stakes, guidance under IRC 37 shows
                            a subgrade at around 2% CBR needing on the order of 900 mm of
                            pavement, versus around 560 mm at 8% CBR — the same road, far more
                            material, decided by one lab result. For National Highway subgrade
                            work, IRC 37 sets a soaked CBR of at least 8% as a common design
                            threshold. A machine that cannot reproduce the standard test
                            conditions puts every one of those numbers in doubt.
                        </p>
                    </div>
                </section>

                <section className="mb-14">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4">
                        The Standards Your Machine Must Meet
                    </h2>
                    <div className="space-y-4 text-neutral-900/70 leading-[1.7]">
                        <p>
                            In India the laboratory CBR test is governed by IS 2720 Part 16,
                            and the moulds and accessories are covered by IS 9669:1980. Any
                            machine you buy should be built to hold the conditions those
                            standards define. The two that matter most for hardware selection
                            are the penetration rate and the load capacity. The plunger must
                            advance at a constant 1.25 ± 0.05 mm/min, which is why a motorised
                            load frame with a proper gearbox is preferred over anything
                            hand-cranked for consistent results.
                        </p>
                        <p>
                            The frame must also be able to develop the loads the test needs
                            without flexing — see the capacity section below. When a supplier
                            quotes you a CBR machine, ask them to state compliance with IS 2720
                            Part 16 (test) and IS 9669 (mould and accessories) in writing; a
                            serious manufacturer will.
                        </p>
                    </div>
                </section>

                <section className="mb-14">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4">
                        Load Frame Capacity: Don&apos;t Under-Buy
                    </h2>
                    <div className="space-y-4 text-neutral-900/70 leading-[1.7]">
                        <p>
                            The standard reference loads used to calculate CBR are 1370 kg
                            (about 13.44 kN) at 2.5 mm penetration and 2055 kg (about
                            20.13 kN) at 5.0 mm penetration. Because stiff or well-compacted
                            soils can push well past those reference points before the test is
                            complete, the load frame itself should be comfortably stronger than
                            the numbers you read off — a motorised frame of at least 50 kN
                            capacity is the sensible baseline so the machine holds a constant
                            penetration rate under load without straining.
                        </p>
                        <p>
                            Under-buying here is the most common regret: a light frame that
                            just meets the reference loads will struggle on dense granular
                            subgrades and drift off the required rate. If you test a range of
                            soils, size for the stiff ones.
                        </p>
                    </div>
                </section>

                <section className="mb-14">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4">
                        The Mould and Soaking Accessories Buyers Forget
                    </h2>
                    <div className="space-y-4 text-neutral-900/70 leading-[1.7]">
                        <p>
                            The test result is only as good as the mould and the soaking
                            setup, and these are where quotations quietly differ. A compliant
                            CBR mould is 150 mm internal diameter × 175 mm high (about
                            2250 cc) with a detachable base plate and a 50 mm collar, and the
                            penetration plunger is 50 mm diameter (about 19.35 cm²). For soaked
                            CBR — which is what highway specs usually call for — the sample is
                            submerged for a 96-hour (4-day) soak, with 2.5 kg annular surcharge
                            discs placed on top to simulate pavement weight (a minimum of two
                            discs, up to three for thicker pavements). A swell measurement
                            setup (tripod and dial gauge) is used during soaking.
                        </p>
                        <p>
                            When you compare prices, confirm how many moulds, how many
                            surcharge discs, and whether the soaking tank and swell gauges are
                            included — a &ldquo;cheaper&rdquo; machine that ships with one mould
                            and no soaking accessories is not actually cheaper once you kit it
                            out for real work.
                        </p>
                    </div>
                </section>

                <section className="mb-14">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4">
                        Matching the Machine to Your Work
                    </h2>
                    <div className="space-y-4 text-neutral-900/70 leading-[1.7]">
                        <p>
                            If most of your jobs are National Highway or major road subgrade
                            testing, buy for soaked CBR at volume: a 50 kN (or higher)
                            motorised frame, several moulds so samples can soak in parallel
                            over the four-day cycle, and a full set of surcharge discs and
                            swell gauges. If you also do field CBR, ask about field / in-situ
                            kits separately — this guide covers the laboratory machine.
                        </p>
                        <p>
                            Labs running occasional CBR alongside other soil tests can start
                            with a single frame and one or two moulds, but should still not
                            drop below the 50 kN / IS 2720 Part 16 baseline, because the
                            constraint is the standard, not your volume. Buying to the standard
                            the first time is cheaper than re-testing rejected results later.
                        </p>
                    </div>
                </section>

                <section className="mb-14">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-4">
                        The Pre-Purchase Checklist
                    </h2>
                    <div className="space-y-4 text-neutral-900/70 leading-[1.7]">
                        <p>
                            Before ordering, confirm: compliance stated in writing to IS 2720
                            Part 16 (test) and IS 9669 (mould and accessories); a motorised
                            load frame of at least 50 kN holding a constant 1.25 mm/min
                            penetration rate; a mould set of 150 mm × 175 mm with base plate,
                            50 mm collar, and 50 mm plunger; a soaking kit for the 96-hour soak
                            (tank, 2.5 kg annular surcharge discs — two to three — and a swell
                            tripod with dial gauge); enough moulds to run your typical batch
                            through a four-day soak in parallel; a proving ring or load cell
                            with penetration dial or readout, supplied with a calibration
                            certificate; and after-sales calibration, spares, and service
                            support in India.
                        </p>
                        <p>
                            We supply{" "}
                            <Link href="/products/civil-material-testing/cbr-testing-machine" className="underline underline-offset-2 hover:text-black">
                                CBR testing machines
                            </Link>{" "}
                            alongside the rest of the soil and geotechnical lab:{" "}
                            <Link href="/products/civil-material-testing/compaction-test-equipment" className="underline underline-offset-2 hover:text-black">
                                compaction test equipment
                            </Link>
                            ,{" "}
                            <Link href="/products/civil-material-testing/direct-shear-triaxial-apparatus" className="underline underline-offset-2 hover:text-black">
                                direct shear and triaxial apparatus
                            </Link>
                            , and{" "}
                            <Link href="/products/civil-material-testing/sieves-sieve-shakers-core-cutters" className="underline underline-offset-2 hover:text-black">
                                sieves, sieve shakers and core cutters
                            </Link>
                            . Browse the full{" "}
                            <Link href="/products/civil-material-testing" className="underline underline-offset-2 hover:text-black">
                                civil material testing range
                            </Link>
                            , compare our{" "}
                            <Link href="/compression-testing-machine-buying-guide" className="underline underline-offset-2 hover:text-black">
                                compression testing machine buying guide
                            </Link>{" "}
                            for concrete work, or read the wider{" "}
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
                        Tell us the kind of soils and project specs you work with and
                        we&apos;ll match a CBR machine and accessory set to it — frame,
                        moulds, soaking kit, and calibration.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/request-quote?product=CBR%20Testing%20Machine"
                            className="inline-flex items-center bg-black text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors"
                        >
                            Request a Quote
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                        <Link
                            href="/products/civil-material-testing"
                            className="inline-flex items-center border border-neutral-200 px-6 py-3 text-sm font-medium hover:border-black transition-colors"
                        >
                            Browse Civil Testing Equipment
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}
