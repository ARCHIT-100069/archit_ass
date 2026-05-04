import Link from "next/link";
import { MoveRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral-50 border-t border-neutral-200">
            <div className="container mx-auto px-4 md:px-6 py-10 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Image
                            src="/logo.jpg"
                            alt="Archit Associates"
                            width={60}
                            height={60}
                            style={{ objectFit: 'contain', marginBottom: 12, filter: 'brightness(0)' }}
                        />
                        <p className="text-neutral-900/55 text-[14px] leading-[1.7] max-w-xs">
                            Premium quality industrial spares and machinery equipment. Ensuring operational efficiency since inception.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-6 text-[13px] uppercase tracking-[0.12em]">Explore</h4>
                        <ul className="space-y-4 text-[14px] text-neutral-900/60">
                            <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
                            <li><Link href="/products" className="hover:text-black transition-colors">Products</Link></li>
                            <li><Link href="/about" className="hover:text-black transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-black transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold mb-6 text-[13px] uppercase tracking-[0.12em]">Contact</h4>
                        <ul className="space-y-4 text-[14px] text-neutral-900/60">
                            <li>123 Industrial Area, Phase 1</li>
                            <li>New Delhi, India</li>
                            <li>+91 98765 43210</li>
                            <li>architasst@gmail.com</li>
                        </ul>
                    </div>

                    {/* Newsletter / CTA */}
                    <div>
                        <h4 className="font-semibold mb-6 text-[13px] uppercase tracking-[0.12em]">Stay Connected</h4>
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/contact"
                                className="group flex items-center justify-between border-b border-black pb-2 text-sm font-medium hover:text-neutral-600 transition-colors"
                            >
                                Start an Enquiry
                                <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-20 border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
                    <p>&copy; {currentYear} Archit Associates. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-black transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
