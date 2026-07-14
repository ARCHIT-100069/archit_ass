import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Frequently Asked Questions",
    description:
        "Answers to common questions about ordering laboratory testing equipment, railway gauges, and industrial supplies from Archit Associates — delivery, quotations, and how to enquire.",
    alternates: {
        canonical: "/faq",
    },
};

// Answers use only facts already published on this site — location, hours,
// contact channels, quote turnaround, and the product range.
const faqs = [
    {
        question: "Where is Archit Associates located, and do you deliver across India?",
        answer:
            "We are based in New Delhi (110033) and supply equipment to clients across India, including infrastructure, construction, and manufacturing companies in every region.",
    },
    {
        question: "How do I get a price for a product?",
        answer:
            "All pricing is provided through quotations. Submit the Request a Quote form with the product name and quantity, or reach us on WhatsApp or phone at +91 81309 73844, and our team will respond with a detailed quotation — typically within 24–48 business hours.",
    },
    {
        question: "What kinds of equipment do you supply?",
        answer:
            "We supply products across eight specialized categories: railway sleeper inspection and precision gauges, pre-casting and production equipment (PSC and precast), civil material testing laboratory equipment, chemical, paint and wood testing instruments, industrial safety and PPE, surveying and field monitoring instruments, general lab utility equipment, and laboratory testing instruments and accessories.",
    },
    {
        question: "Can you source equipment that is not listed on the website?",
        answer:
            "Yes. We also provide sourcing and supply services for a wide range of laboratory equipment and testing instruments tailored to your specific industry requirements. Send us your requirement through the enquiry form and we will get back to you.",
    },
    {
        question: "How do I place a bulk or project order?",
        answer:
            "Use the Request a Quote form and mention your project type (railway, PSC plant, laboratory, or industrial), quantity, and delivery location. For multi-product requirements, list the items in the requirement description and we will prepare a consolidated quotation.",
    },
    {
        question: "What are your business hours?",
        answer:
            "Monday to Saturday, 9:00 AM to 6:00 PM (IST). We are closed on Sundays. Enquiries submitted through the website or WhatsApp outside these hours are answered on the next business day.",
    },
];

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
};

export default function FaqPage() {
    return (
        <div className="pt-32 min-h-screen pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">
                    Support
                </p>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.025em] mb-6 leading-[1.1]">
                    Frequently Asked Questions
                </h1>
                <p className="text-neutral-900/60 text-lg leading-[1.65] mb-16">
                    Common questions about ordering, delivery, and our product range. Can&apos;t find
                    what you need? <Link href="/contact" className="text-black underline underline-offset-4 hover:no-underline">Contact us</Link> directly.
                </p>

                <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
                    {faqs.map((faq) => (
                        <details key={faq.question} className="group py-6">
                            <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                                <h2 className="font-heading text-lg md:text-xl font-semibold tracking-[-0.015em] text-neutral-900">
                                    {faq.question}
                                </h2>
                                <span className="mt-1 shrink-0 text-neutral-400 transition-transform duration-300 group-open:rotate-45">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                    </svg>
                                </span>
                            </summary>
                            <p className="text-neutral-900/60 text-[15px] leading-[1.7] mt-4 pr-8">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>

                <div className="mt-16 flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/request-quote"
                        className="inline-flex items-center justify-center px-8 py-4 bg-black text-white text-[13px] font-semibold uppercase tracking-[0.1em] hover:bg-neutral-800 transition-colors rounded-sm min-h-[48px]"
                    >
                        Request a Quote
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-black border border-neutral-300 text-[13px] font-semibold uppercase tracking-[0.1em] hover:bg-neutral-50 transition-colors rounded-sm min-h-[48px]"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        </div>
    );
}
