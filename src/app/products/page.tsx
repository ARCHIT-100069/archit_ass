import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import ProductsCatalogView from "@/components/products/ProductsCatalogView";

export const metadata: Metadata = {
    title: "All Products | Archit Associates",
    description:
        "Browse our complete range of industrial manufacturing solutions — railway inspection gauges, pre-casting equipment, lab testing instruments, safety gear, and more.",
};

export default function ProductsPage() {
    return (
        <div className="pt-32 min-h-screen pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-neutral-500 hover:text-black mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                {/* Page Hero */}
                <div className="mb-12 md:mb-16 mt-8">
                    <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] mb-4 leading-[1.1]">
                        Our Products
                    </h1>
                    <p className="text-neutral-500 max-w-2xl text-base leading-[1.65]">
                        Browse our complete range of industrial manufacturing solutions and
                        equipment, organized by category.
                    </p>
                </div>

                {/* Category-wise catalog */}
                <ProductsCatalogView />
            </div>
        </div>
    );
}
