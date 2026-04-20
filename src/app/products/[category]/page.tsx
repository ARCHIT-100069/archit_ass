import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { productCatalog } from "@/data/productCatalog";
import CategorySection from "@/components/products/CategorySection";

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category: categoryId } = await params;
    const category = productCatalog.find((c) => c.id === categoryId);
    return {
        title: category ? `${category.title} | Archit Associates` : "Products | Archit Associates",
        description: category ? category.description : "View our industrial product range.",
    };
}

export async function generateStaticParams() {
    return productCatalog.map((category) => ({
        category: category.id,
    }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category: categoryId } = await params;
    const category = productCatalog.find((c) => c.id === categoryId);

    if (!category) {
        notFound();
    }

    return (
        <div className="pt-32 min-h-screen pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <Link href="/products" className="inline-flex items-center text-sm text-neutral-500 hover:text-black mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    All Products
                </Link>

                <div className="mb-12">
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.025em] mb-4 leading-[1.1]">{category.title}</h1>
                    <p className="text-neutral-900/60 max-w-2xl text-lg leading-[1.65]">{category.description}</p>
                </div>

                {/* Render this category's subcategories expanded by default */}
                <CategorySection
                    number={category.number}
                    title={category.title}
                    subcategories={category.subcategories}
                    defaultOpen={true}
                />
            </div>
        </div>
    );
}
