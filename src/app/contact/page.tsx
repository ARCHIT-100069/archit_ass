import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import ContactFormClient from "@/components/contact/ContactFormClient";

export const metadata: Metadata = {
    title: "Contact Us | Archit Associates",
    description:
        "Get in touch with Archit Associates for general inquiries about industrial machinery, spares, and equipment.",
};

export default function ContactPage() {
    return (
        <div className="pt-24 md:pt-32 min-h-screen pb-12 md:pb-20">
            <div className="container mx-auto px-4 md:px-6">
                {/* Hero Section */}
                <div className="mb-14">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm text-neutral-400 mb-6">
                        <Link href="/" className="hover:text-black transition-colors">Home</Link>
                        <ChevronRight className="w-3.5 h-3.5 mx-2" />
                        <span className="text-neutral-900 font-medium">Contact</span>
                    </nav>

                    <h1 className="font-heading text-5xl md:text-[64px] font-bold tracking-[-0.03em] leading-[1.1] mb-4">
                        Contact Us
                    </h1>
                    <p className="text-neutral-900/60 max-w-xl text-lg leading-[1.65]">
                        Get in touch with our team for general inquiries and support.
                    </p>

                    <div className="w-full h-px bg-neutral-200 mt-10" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left — Contact Details + Map */}
                    <div>
                        <div className="space-y-8">
                            <div className="flex items-start space-x-4">
                                <div className="p-2.5 rounded-lg bg-neutral-100">
                                    <MapPin className="w-5 h-5 text-neutral-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1 text-base tracking-tight">Address</h3>
                                    <p className="text-neutral-900/60 text-[14px] leading-relaxed">
                                        A 242, Jahangir Puri<br />
                                        Near Kali Mandir, Delhi - 110033
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-2.5 rounded-lg bg-neutral-100">
                                    <Phone className="w-5 h-5 text-neutral-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1 text-base tracking-tight">Phone</h3>
                                    <p className="text-neutral-900/60 text-[14px]">+91 81309 73844</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-2.5 rounded-lg bg-neutral-100">
                                    <Mail className="w-5 h-5 text-neutral-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1 text-base tracking-tight">Email</h3>
                                    <p className="text-neutral-900/60 text-[14px]">architasst@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-2.5 rounded-lg bg-neutral-100">
                                    <Clock className="w-5 h-5 text-neutral-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1 text-base tracking-tight">Business Hours</h3>
                                    <p className="text-neutral-900/60 text-[14px]">Mon – Sat: 9:00 AM – 6:00 PM</p>
                                    <p className="text-neutral-900/60 text-[14px]">Sun: Closed</p>
                                </div>
                            </div>
                        </div>

                        {/* Google Map */}
                        <div className="mt-12 w-full h-64 bg-neutral-100 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.075932594611!2d77.16444787522513!3d28.72451107561498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d013fc5eda597%3A0x4425d8eda8162d10!2sARCHIT%20ASSOCIATES%20-%20Experts%20in%20Laboratory%20Material%20Testing%20Equipment!5e0!3m2!1sen!2sin!4v1715243555234!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* Right — Contact Form */}
                    <div className="bg-[#fafafa] border border-neutral-200 p-8 md:p-12 rounded-2xl shadow-sm h-fit">
                        <h2 className="font-heading text-2xl font-bold mb-2 tracking-[-0.02em]">Send us a message</h2>
                        <p className="text-[14px] text-neutral-900/55 mb-8">
                            For general inquiries only. Need a product quote?{" "}
                            <Link href="/enquiry" className="text-black underline underline-offset-4 hover:text-neutral-600 transition-colors">
                                Request a Quote →
                            </Link>
                        </p>
                        <ContactFormClient />
                    </div>
                </div>
            </div>
        </div>
    );
}
