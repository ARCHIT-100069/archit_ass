import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Archit Associates",
    description: "Learn about Archit Associates, a leader in premium industrial spares and machinery equipment.",
};

export default function AboutPage() {
    return (
        <div className="pt-32 min-h-screen pb-20">
            <div className="container mx-auto px-6">
                <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] mb-12 leading-[1.1]">About Archit Associates</h1>

                <div className="max-w-3xl">
                    <p className="text-xl md:text-2xl leading-[1.6] text-neutral-900/70 mb-8 font-light">
                        We are dedicated to providing premium quality industrial spares and machinery equipment, ensuring operational efficiency for clients across the manufacturing sector.
                    </p>

                    <div className="space-y-6 text-neutral-900/60 leading-[1.7] max-w-2xl text-[15px]">
                        <p>
                            Established with a vision to streamline industrial procurement, Archit Associates specializes in a wide array of spares ranging from Sleeper & Precast types to complex Automation parts.
                        </p>
                        <p>
                            Our commitment to quality is unwavering. We source and manufacturer components that meet rigorous industrial standards, ensuring longevity and reliability in the most demanding environments.
                        </p>
                    </div>

                    <div className="mt-16 pt-16 border-t border-neutral-200">
                        <h3 className="font-heading text-3xl font-bold mb-6 tracking-[-0.02em]">Why Choose Us?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-lg font-semibold mb-2 tracking-[-0.01em]">Premium Quality</h4>
                                <p className="text-[15px] text-neutral-900/60 leading-[1.65]">Only the best materials and manufacturing processes are used for our spares.</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-2 tracking-[-0.01em]">Technical Expertise</h4>
                                <p className="text-[15px] text-neutral-900/60 leading-[1.65]">Decades of experience in the industrial machinery sector.</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-2 tracking-[-0.01em]">Reliable Support</h4>
                                <p className="text-[15px] text-neutral-900/60 leading-[1.65]">Dedicated customer service to assist with technical queries and orders.</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-2 tracking-[-0.01em]">Wide Inventory</h4>
                                <p className="text-[15px] text-neutral-900/60 leading-[1.65]">Comprehensive range of spares for diverse industrial applications.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16">
                        <Link href="/products" className="inline-flex items-center text-lg font-medium border-b border-black pb-1 hover:text-neutral-600 transition-colors">
                            Explore Our Products <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
