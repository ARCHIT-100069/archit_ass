import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";
import EnquiryFormClient from "@/components/enquiry/EnquiryFormClient";

export const metadata: Metadata = {
    title: "Request a Quote | Archit Associates",
    description:
        "Submit a Request for Quotation (RFQ) for industrial spares, testing equipment, safety gear, and more from Archit Associates.",
};

export default function EnquiryPage() {
    return (
        <div className="pt-24 md:pt-32 min-h-screen pb-12 md:pb-20">
            <div className="container mx-auto px-4 md:px-6">
                {/* Hero Section */}
                <div className="mb-14">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm text-neutral-400 mb-6">
                        <Link href="/" className="hover:text-black transition-colors">Home</Link>
                        <ChevronRight className="w-3.5 h-3.5 mx-2" />
                        <span className="text-neutral-900 font-medium">Request a Quote</span>
                    </nav>

                    <h1 className="font-heading text-5xl md:text-[64px] font-bold tracking-[-0.03em] leading-[1.1] mb-4">
                        Request a Quote
                    </h1>
                    <p className="text-neutral-900/60 max-w-2xl text-lg leading-[1.65]">
                        Submit your project requirements and our team will provide a detailed quotation.
                    </p>

                    <div className="w-full h-px bg-neutral-200 mt-10" />
                </div>

                {/* Premium Form Card */}
                <div className="max-w-5xl mx-auto">
                    <div className="bg-[#fafafa] border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 lg:p-14">
                        <Suspense fallback={<div>Loading form...</div>}>
                            <EnquiryFormClient />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
