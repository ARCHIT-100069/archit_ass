import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Archit Associates",
    description:
        "Learn about Archit Associates — a New Delhi-based supplier of premium industrial spares, laboratory testing equipment, and precision instruments. Established in 2018, backed by 28+ years of industry experience, serving infrastructure and manufacturing companies across India.",
};


export default function AboutPage() {
    return (
        <div className="pt-32 min-h-screen pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Hero / Header */}
                <div className="mb-20">
                    <h1 className="font-heading text-5xl md:text-6xl lg:text-[72px] font-bold tracking-[-0.03em] mb-6 leading-[1.05]">
                        About Archit Associates
                    </h1>
                    <p className="text-xl md:text-2xl leading-[1.6] text-neutral-900/70 font-light max-w-2xl">
                        Engineering Excellence. Premium Industrial Solutions.
                    </p>
                </div>

                <div className="space-y-24">
                    {/* Section 1: Who We Are */}
                    <section>
                        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.15em] block mb-4">
                            WHO WE ARE
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                            A Trusted Name in Industrial Equipment
                        </h2>
                        <p className="text-neutral-900/70 leading-[1.7] text-[16px] md:text-[17px]">
                            Archit Associates is a New Delhi-based supplier of premium industrial spares, laboratory testing equipment, and precision instruments. Established in 2018 and backed by 28 years of industry experience, we serve infrastructure, construction, and manufacturing industries across India, delivering equipment that meets the highest standards of quality and performance.
                        </p>

                        {/* Stats strip */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-neutral-200 mt-12 rounded-lg overflow-hidden">
                            <div className="bg-white px-8 py-7">
                                <p className="font-heading text-3xl font-bold tracking-[-0.03em] mb-1">28+</p>
                                <p className="text-[13px] text-neutral-900/55 leading-snug">Years of Industry Experience</p>
                            </div>
                            <div className="bg-white px-8 py-7">
                                <p className="font-heading text-3xl font-bold tracking-[-0.03em] mb-1">2018</p>
                                <p className="text-[13px] text-neutral-900/55 leading-snug">Established</p>
                            </div>
                            <div className="bg-white px-8 py-7">
                                <p className="font-heading text-3xl font-bold tracking-[-0.03em] mb-1">20+</p>
                                <p className="text-[13px] text-neutral-900/55 leading-snug">Trusted Leading Companies</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: What We Do */}
                    <section>
                        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.15em] block mb-4">
                            WHAT WE DO
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                            Eight Specialized Categories
                        </h2>
                        <p className="text-neutral-900/70 leading-[1.7] text-[16px] md:text-[17px]">
                            We supply a comprehensive range of products across eight specialized categories — from Railway Sleeper Inspection Gauges and Civil Material Testing Equipment to Industrial Safety & PPE, Surveying Instruments, Pre-Casting Equipment, Chemical & Paint Testing, and General Lab Utility Equipment. Whether you are running a quality control lab, a construction site, or a rail infrastructure project, we have the right equipment for you. We also provide sourcing and supply services for a wide range of laboratory equipment and testing instruments tailored to your specific industry requirements.
                        </p>
                    </section>

                    {/* Section 3: Our Commitment */}
                    <section>
                        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.15em] block mb-4">
                            OUR COMMITMENT
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                            Quality You Can Rely On
                        </h2>
                        <p className="text-neutral-900/70 leading-[1.7] text-[16px] md:text-[17px]">
                            At Archit Associates, we believe that the right equipment drives operational excellence. Every product we supply is sourced from trusted manufacturers and delivered with reliability and precision. We are committed to building long-term partnerships with our clients by offering dependable equipment, prompt service, and expert guidance. From precision gauges to complete laboratory setups, we help our clients find the right equipment for their exact needs.
                        </p>
                    </section>

                    {/* Section 4: Why Choose Us */}
                    <section>
                        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.15em] block mb-4">
                            WHY CHOOSE US
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-8">
                            What Sets Us Apart
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-200 rounded-lg overflow-hidden">
                            {[
                                { title: "Premium Quality", desc: "Every product is sourced from trusted manufacturers and held to the highest standards before delivery." },
                                { title: "Technical Expertise", desc: "28+ years of hands-on experience across industrial, laboratory, and infrastructure equipment segments." },
                                { title: "Reliable Support", desc: "Prompt service, expert guidance, and long-term partnership — from enquiry to after-sales support." },
                                { title: "Wide Inventory", desc: "Eight specialized categories covering testing, safety, surveying, gauging, and production equipment." },
                            ].map((item) => (
                                <div key={item.title} className="bg-white px-8 py-7">
                                    <h3 className="font-heading text-[17px] font-bold tracking-[-0.015em] mb-2">{item.title}</h3>
                                    <p className="text-[14px] text-neutral-900/55 leading-[1.65]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 5: Our Reach */}
                    <section>
                        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.15em] block mb-4">
                            OUR REACH
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                            Trusted by Industry Leaders
                        </h2>
                        <p className="text-neutral-900/70 leading-[1.7] text-[16px] md:text-[17px] mb-8">
                            We are proud to have supplied equipment to some of India&apos;s most respected companies including HIL Limited, KEC International, Kajaria Ceramics, Ahluwalia Contracts, Coromandel Concrete Products, Tinna Rubber, Icon Sleepers Track, and many more across India.
                        </p>
                        <p className="text-neutral-900/55 leading-[1.7] text-[15px] border-l-2 border-neutral-200 pl-5">
                            Our team comprises dedicated technical and marketing professionals, backed by reputed vendors with decades of hands-on experience in industrial and laboratory equipment supply.
                        </p>
                    </section>

                    {/* Section 6: CTA */}
                    <section className="pt-12 border-t border-neutral-200">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-6">
                            Let&apos;s Work Together
                        </h2>
                        <p className="text-neutral-900/70 leading-[1.7] text-[16px] md:text-[17px] mb-8">
                            Based in New Delhi, we cater to clients across India. Reach us at <a href="mailto:architasst@gmail.com" className="text-black font-medium hover:underline">architasst@gmail.com</a> or call <a href="tel:+918130973844" className="text-black font-medium hover:underline">+91 81309 73844</a> to discuss your requirements.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link 
                                href="/request-quote" 
                                className="inline-flex items-center justify-center px-8 py-4 bg-black text-white text-[13px] font-semibold uppercase tracking-[0.1em] hover:bg-neutral-800 transition-colors rounded-sm min-h-[48px]"
                            >
                                Request a Quote <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                            <Link 
                                href="/contact" 
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black border border-neutral-300 text-[13px] font-semibold uppercase tracking-[0.1em] hover:bg-neutral-50 transition-colors rounded-sm min-h-[48px]"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
