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
                            src="https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/customer-logos/ARCHIT_ASS_LOGO.jpg"
                            alt="Archit Associates"
                            width={200}
                            height={50}
                            className="h-[50px] w-auto object-contain mb-3"
                            style={{ filter: "brightness(0)" }}
                        />
                        <p className="text-neutral-900/55 text-[14px] leading-[1.7] max-w-xs mb-2">
                            Premium quality industrial spares and machinery equipment. Ensuring operational efficiency since inception.
                        </p>
                        <p className="text-neutral-900/55 text-[14px] leading-[1.7] max-w-xs font-medium">
                            Specialists in laboratory equipment supply and industrial testing instruments.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-6 text-[13px] uppercase tracking-[0.12em]">Explore</h4>
                        <ul className="space-y-4 text-[14px] text-neutral-900/60">
                            <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
                            <li><Link href="/products" className="hover:text-black transition-colors">Products</Link></li>
                            <li><Link href="/industries" className="hover:text-black transition-colors">Industries We Serve</Link></li>
                            <li><Link href="/about" className="hover:text-black transition-colors">About Us</Link></li>
                            <li><Link href="/faq" className="hover:text-black transition-colors">FAQ</Link></li>
                            <li><Link href="/contact" className="hover:text-black transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold mb-6 text-[13px] uppercase tracking-[0.12em]">Contact</h4>
                        <ul className="space-y-4 text-[14px] text-neutral-900/60">
                            <li>New Delhi - 110033</li>
                            <li>
                                <a href="tel:+918130973844" className="hover:text-black transition-colors">
                                    +91 81309 73844
                                </a>
                            </li>
                            <li>
                                <a href="mailto:architasst@gmail.com" className="hover:text-black transition-colors">
                                    architasst@gmail.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/918130973844?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20your%20products."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-black transition-colors"
                                >
                                    Chat on WhatsApp
                                </a>
                            </li>
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
                            <Link
                                href="/request-quote"
                                className="group flex items-center justify-between border-b border-neutral-300 pb-2 text-sm font-medium text-neutral-600 hover:text-black hover:border-black transition-colors"
                            >
                                Request a Quote
                                <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <a
                                href="/archit-associates-product-catalogue.pdf"
                                download
                                className="group flex items-center justify-between border-b border-neutral-300 pb-2 text-sm font-medium text-neutral-600 hover:text-black hover:border-black transition-colors"
                            >
                                Download Catalogue (PDF)
                                <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-20 border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
                    <p>&copy; {currentYear} Archit Associates. All rights reserved.</p>
                    <p className="mt-4 md:mt-0 text-neutral-400">New Delhi, India</p>
                </div>
            </div>
        </footer>
    );
}
