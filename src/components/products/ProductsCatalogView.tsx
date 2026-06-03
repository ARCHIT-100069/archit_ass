"use client";

import { useState, useMemo } from "react";
import { productCatalog, ProductItem } from "@/data/productCatalog";
import Image from "next/image";
import { useRouter } from "next/navigation";

// --- Subcomponents for the Editorial Style ---

function ProductCard({ product, index }: { product: ProductItem; index: number }) {
    const [imgSrc, setImgSrc] = useState(product.image ?? null);
    const router = useRouter();

    const handleQuotation = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/request-quote?product=${encodeURIComponent(product.name)}`);
    };

    return (
        <div 
            className="group relative bg-white cursor-pointer flex flex-col h-full"
            onClick={handleQuotation}
        >
            {/* Image Area */}
            <div className="relative w-full aspect-[3/4] bg-[#f5f5f5] overflow-hidden flex items-center justify-center p-8">
                {imgSrc ? (
                    <Image
                        src={imgSrc}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={85}
                        className="object-contain p-6 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
                        onError={() => setImgSrc(null)}
                    />
                ) : (
                    <div className="text-neutral-300 text-xs uppercase tracking-widest">Image Unavailable</div>
                )}

                {/* Circular Hover Button */}
                <button 
                    className="absolute bottom-4 right-4 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:scale-105"
                    onClick={handleQuotation}
                    aria-label="Request Quote"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 0V14H7.5V0H6.5Z" fill="currentColor"/>
                        <path d="M14 6.5L0 6.5V7.5L14 7.5V6.5Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-grow justify-between">
                <h4 className="text-[12px] font-normal uppercase tracking-[0.06em] text-black leading-tight mb-2">
                    {product.name}
                </h4>
                <div className="text-[11px] text-neutral-400 uppercase tracking-widest mt-auto">
                    Request Quote
                </div>
            </div>
        </div>
    );
}

// --- Main Component ---

export default function ProductsCatalogView() {
    const categories = productCatalog;
    const [selectedCategoryId, setSelectedCategoryId] = useState(
        categories.length > 0 ? categories[0].id : ''
    );
    // filter can be "ALL" or a specific subcategory title
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);

    if (!categories.length) {
        return <div className="p-8 text-center text-neutral-500 uppercase tracking-widest text-xs">No products available.</div>;
    }

    const selectedCategory = categories.find(c => c.id === selectedCategoryId);
    
    // Reset filters and pagination when category changes
    const handleCategorySelect = (id: string) => {
        setSelectedCategoryId(id);
        setActiveFilter("ALL");
        setCurrentPage(1);
    };

    if (!selectedCategory) return null;

    // Determine subcategories for filters
    const subcategories = selectedCategory.subcategories;
    const isFlat = subcategories.length === 1 && subcategories[0].title === "Products";
    
    // Get all products to show based on the active filter
    const displayedProducts = useMemo(() => {
        let products: ProductItem[] = [];
        if (activeFilter === "ALL") {
            subcategories.forEach(sub => products.push(...sub.products));
        } else {
            const sub = subcategories.find(s => s.title === activeFilter);
            if (sub) products = sub.products;
        }
        return products;
    }, [subcategories, activeFilter]);

    // Format number to '01', '02', etc.
    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    return (
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] w-full relative">
            
            {/* Mobile Category Selector (Dropdown or simple scroll) */}
            <div className="md:hidden w-full border-b border-neutral-200 bg-white sticky top-[72px] z-30">
                <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-4 gap-6">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategorySelect(category.id)}
                            className={`flex-shrink-0 snap-start text-[11px] uppercase tracking-[0.08em] whitespace-nowrap transition-colors ${
                                selectedCategoryId === category.id
                                    ? "text-black font-medium"
                                    : "text-neutral-400"
                            }`}
                        >
                            <span className="text-neutral-300 mr-1.5">|{formatNumber(category.number)}|</span> 
                            {category.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Left Sidebar (Desktop) */}
            <div className="hidden md:flex flex-col w-[280px] lg:w-[320px] flex-shrink-0 border-r border-neutral-200/60 sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto bg-white z-20">
                <div className="py-12 px-8 flex-grow">
                    <div className="flex flex-col gap-6">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategorySelect(category.id)}
                                className={`text-left text-[11px] uppercase tracking-[0.08em] leading-relaxed transition-colors group flex items-start ${
                                    selectedCategoryId === category.id
                                        ? "text-black font-medium"
                                        : "text-neutral-400 hover:text-black"
                                }`}
                            >
                                <span className={`mr-2.5 transition-colors ${
                                    selectedCategoryId === category.id ? "text-neutral-400" : "text-neutral-300 group-hover:text-neutral-400"
                                }`}>
                                    |{formatNumber(category.number)}|
                                </span> 
                                <span className="pt-[1px]">{category.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Fixed bottom area of sidebar */}
                <div className="p-8 border-t border-neutral-200/60 mt-auto bg-white">
                    <button className="text-[11px] uppercase tracking-[0.08em] text-black font-medium hover:text-neutral-500 transition-colors">
                        Filters +
                    </button>
                </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 flex flex-col w-full bg-white relative">
                
                {/* Sticky Filter Row */}
                <div className="sticky top-[125px] md:top-[80px] bg-white z-20 border-b border-neutral-200/60 transition-all">
                    {/* Header info (Optional - showing category desc) */}
                    <div className="px-6 md:px-10 pt-8 pb-4">
                        <h1 className="text-[14px] font-medium uppercase tracking-[0.06em] text-black mb-2">
                            {selectedCategory.title}
                        </h1>
                        <p className="text-[12px] text-neutral-500 tracking-wide max-w-2xl lowercase first-letter:uppercase">
                            {selectedCategory.description}
                        </p>
                    </div>

                    {/* Subcategory Filters */}
                    {!isFlat && (
                        <div className="px-6 md:px-10 pb-6 flex overflow-x-auto scrollbar-hide gap-2 pt-4">
                            <button
                                onClick={() => { setActiveFilter("ALL"); setCurrentPage(1); }}
                                className={`px-4 py-2 text-[11px] uppercase tracking-[0.08em] transition-colors border ${
                                    activeFilter === "ALL"
                                        ? "bg-black text-white border-black"
                                        : "bg-transparent text-neutral-600 border-neutral-200 hover:border-black hover:text-black"
                                }`}
                            >
                                All
                            </button>
                            {subcategories.map((sub) => (
                                <button
                                    key={sub.title}
                                    onClick={() => { setActiveFilter(sub.title); setCurrentPage(1); }}
                                    className={`px-4 py-2 text-[11px] uppercase tracking-[0.08em] whitespace-nowrap transition-colors border ${
                                        activeFilter === sub.title
                                            ? "bg-black text-white border-black"
                                            : "bg-transparent text-neutral-600 border-neutral-200 hover:border-black hover:text-black"
                                    }`}
                                >
                                    {sub.title}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Grid */}
                <div className="flex-1 bg-neutral-200">
                    {displayedProducts.length > 0 ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1px]">
                            {displayedProducts.map((product, index) => (
                                <ProductCard 
                                    key={`${product.name}-${index}`} 
                                    product={product} 
                                    index={index} 
                                />
                            ))}
                            
                            {/* Fill empty cells to maintain grid lines if needed */}
                            {Array.from({ length: (4 - (displayedProducts.length % 4)) % 4 }).map((_, i) => (
                                <div key={`empty-${i}`} className="bg-white hidden xl:block" />
                            ))}
                            {Array.from({ length: (3 - (displayedProducts.length % 3)) % 3 }).map((_, i) => (
                                <div key={`empty-lg-${i}`} className="bg-white hidden lg:block xl:hidden" />
                            ))}
                            {Array.from({ length: (2 - (displayedProducts.length % 2)) % 2 }).map((_, i) => (
                                <div key={`empty-sm-${i}`} className="bg-white block lg:hidden" />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white h-64 flex items-center justify-center">
                            <span className="text-[11px] uppercase tracking-widest text-neutral-400">No products found.</span>
                        </div>
                    )}
                </div>

                {/* Visual Pagination */}
                {displayedProducts.length > 0 && (
                    <div className="bg-white border-t border-neutral-200/60 p-6 md:px-10 flex items-center justify-between mt-auto">
                        <div className="flex gap-4 text-[12px] font-medium tracking-widest">
                            <button className="underline underline-offset-4 decoration-1">1</button>
                            <button className="text-neutral-400 hover:text-black transition-colors">2</button>
                            <button className="text-neutral-400 hover:text-black transition-colors">3</button>
                        </div>
                        <button className="text-[11px] uppercase tracking-[0.08em] text-neutral-400 hover:text-black transition-colors flex items-center">
                            Next
                            <svg className="w-3 h-3 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
