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
        <div className="min-h-screen bg-white pt-[72px] md:pt-[80px]">
            {/* The catalog view handles the full layout (sidebar + main content) */}
            <ProductsCatalogView />
        </div>
    );
}
