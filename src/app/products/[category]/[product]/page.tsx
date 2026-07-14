import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight, Phone } from "lucide-react";
import { Metadata } from "next";
import {
    findProductBySlug,
    getAllProducts,
    slugifyProduct,
} from "@/data/productCatalog";

const BASE_URL = "https://architassociates.com";

interface PageParams {
    category: string;
    product: string;
}

export async function generateStaticParams() {
    return getAllProducts().map(({ category, productSlug }) => ({
        category: category.id,
        product: productSlug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
    const { category: categoryId, product: productSlug } = await params;
    const result = findProductBySlug(categoryId, productSlug);
    if (!result) {
        return { title: "Product Not Found" };
    }
    const { product, category } = result;
    return {
        title: `${product.name} — Supplier in India`,
        description: `${product.name} supplied by Archit Associates, New Delhi. Part of our ${category.title} range. Request a quotation for pricing and availability across India.`,
        alternates: {
            canonical: `/products/${categoryId}/${productSlug}`,
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<PageParams> }) {
    const { category: categoryId, product: productSlug } = await params;
    const result = findProductBySlug(categoryId, productSlug);

    if (!result) {
        notFound();
    }

    const { product, category, subcategoryTitle } = result;

    // Other products from the same category (excluding this one)
    const relatedProducts = category.subcategories
        .flatMap((sub) => sub.products)
        .filter((p) => p.name !== product.name)
        .slice(0, 4);

    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        ...(product.image
            ? { image: product.image.startsWith("http") ? product.image : `${BASE_URL}${product.image}` }
            : {}),
        description: `${product.name} — part of the ${category.title} range supplied by Archit Associates, New Delhi.`,
        category: category.title,
        brand: { "@type": "Organization", name: "Archit Associates" },
        offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "INR",
            price: "0",
            description: "Price on request — submit an enquiry for a quotation.",
            seller: { "@id": `${BASE_URL}/#organization` },
        },
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Products", item: `${BASE_URL}/products` },
            { "@type": "ListItem", position: 2, name: category.title, item: `${BASE_URL}/products/${category.id}` },
            { "@type": "ListItem", position: 3, name: product.name, item: `${BASE_URL}/products/${category.id}/${productSlug}` },
        ],
    };

    return (
        <div className="pt-32 min-h-screen pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <div className="container mx-auto px-4 md:px-6">
                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-sm text-neutral-500 mb-10">
                    <Link href="/products" className="hover:text-black transition-colors">
                        Products
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                    <Link href={`/products/${category.id}`} className="hover:text-black transition-colors">
                        {category.title}
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
                    <span className="text-black">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
                    {/* Image */}
                    <div className="relative w-full aspect-square bg-[#f5f5f5] rounded-xl overflow-hidden border border-neutral-100">
                        {product.image ? (
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                quality={85}
                                priority
                                className="object-contain p-10 mix-blend-multiply"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-neutral-300 text-xs uppercase tracking-widest">
                                Image available on request
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-400 mb-3">
                            {subcategoryTitle === "Products" ? category.title : subcategoryTitle}
                        </p>
                        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.025em] leading-[1.1] mb-6">
                            {product.name}
                        </h1>
                        <div className="w-10 h-px bg-neutral-200 mb-6" />
                        <p className="text-neutral-900/60 text-[16px] leading-[1.7] mb-4">
                            {category.description}
                        </p>
                        <p className="text-neutral-900/60 text-[15px] leading-[1.7] mb-10">
                            Sourced from trusted manufacturers and supplied with reliability and precision across India.
                            Submit an enquiry for detailed specifications, pricing, and delivery timelines for your project.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Link
                                href={`/request-quote?product=${encodeURIComponent(product.name)}`}
                                className="inline-flex items-center justify-center px-8 py-4 bg-black text-white text-[13px] font-semibold uppercase tracking-[0.1em] hover:bg-neutral-800 transition-colors rounded-sm min-h-[48px]"
                            >
                                Request a Quote
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                            <a
                                href={`https://wa.me/918130973844?text=${encodeURIComponent(`Hi, I'd like a quotation for: ${product.name}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black border border-neutral-300 text-[13px] font-semibold uppercase tracking-[0.1em] hover:bg-neutral-50 transition-colors rounded-sm min-h-[48px]"
                            >
                                Enquire on WhatsApp
                            </a>
                        </div>

                        {/* Contact strip */}
                        <div className="flex items-center gap-3 text-sm text-neutral-500 border-t border-neutral-200 pt-6">
                            <Phone className="w-4 h-4" />
                            <span>
                                Prefer to call?{" "}
                                <a href="tel:+918130973844" className="text-black font-medium hover:underline">
                                    +91 81309 73844
                                </a>{" "}
                                · Mon–Sat, 9 AM–6 PM
                            </span>
                        </div>
                    </div>
                </div>

                {/* Related products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-8">
                            More from {category.title}
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
                            {relatedProducts.map((related) => (
                                <Link
                                    key={related.name}
                                    href={`/products/${category.id}/${slugifyProduct(related.name)}`}
                                    className="group bg-neutral-50 border border-neutral-100 hover:border-neutral-300 hover:bg-white rounded-lg p-5 transition-all duration-300 hover:shadow-md flex flex-col"
                                >
                                    {related.image && (
                                        <div className="relative w-full h-32 mb-4 rounded-md overflow-hidden bg-[#f5f5f5]">
                                            <Image
                                                src={related.image}
                                                alt={related.name}
                                                fill
                                                sizes="(max-width: 1024px) 50vw, 25vw"
                                                quality={80}
                                                loading="lazy"
                                                className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}
                                    <h3 className="text-[14px] font-medium text-neutral-700 group-hover:text-black transition-colors leading-snug">
                                        {related.name}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
