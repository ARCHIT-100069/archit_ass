import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">
                404 — Page Not Found
            </p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-[-0.03em] text-neutral-900 mb-6">
                This page doesn&apos;t exist.
            </h1>
            <p className="text-neutral-900/60 max-w-md text-lg leading-[1.65] mb-10">
                The page you&apos;re looking for may have been moved or doesn&apos;t exist. Let&apos;s get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-8 py-4 bg-black text-white text-[13px] font-semibold uppercase tracking-[0.1em] hover:bg-neutral-800 transition-colors rounded-sm min-h-[48px]"
                >
                    Go to Homepage
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
    );
}
