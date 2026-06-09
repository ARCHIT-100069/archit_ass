"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// --- Types ---
interface Product {
    id: string;
    category_id: string;
    name: string;
    image_url: string | null;
    subcategory: string | null;
    order_index: number;
}

interface Category {
    id: string;
    number: number;
    name: string;
    description: string;
    slug: string;
    products: Product[];
}

// --- Subcomponents for the Editorial Style ---

function ProductCard({ product, index }: { product: Product; index: number }) {
    const [imgSrc, setImgSrc] = useState(product.image_url ?? null);
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
                        priority={index < 6}
                        loading={index < 6 ? undefined : "lazy"}
                        placeholder="empty"
                        className="object-contain p-6 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
                        onError={() => setImgSrc(null)}
                    />
                ) : (
                    <div className="text-neutral-300 text-xs uppercase tracking-widest">Image Unavailable</div>
                )}

                {/* Circular Hover Button */}
                <button 
                    className="absolute bottom-4 right-4 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:scale-105"
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
                <h4 className="text-[14px] md:text-[12px] font-normal uppercase tracking-[0.06em] text-black leading-tight mb-2">
                    {product.name}
                </h4>
                <div className="text-[12px] md:text-[11px] text-neutral-400 uppercase tracking-widest mt-auto">
                    Request Quote
                </div>
            </div>
        </div>
    );
}

// --- Main Component ---

export default function ProductsCatalogView() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function loadData() {
            try {
                const { data, error } = await supabase
                    .from('categories')
                    .select('*, products(*)')
                    .order('number');
                
                if (error) throw error;

                if (data && data.length > 0) {
                    // Sort products within each category manually if nested ordering has issues
                    data.forEach(cat => {
                        if (cat.products) {
                            cat.products.sort((a: Product, b: Product) => a.order_index - b.order_index);
                        }
                    });
                    
                    setCategories(data);
                    setSelectedCategoryId(data[0].id);
                }
            } catch (err) {
                console.error('Error fetching categories:', err);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    // Reset filters and pagination when category changes
    const handleCategorySelect = (id: string) => {
        setSelectedCategoryId(id);
        setActiveFilter("ALL");
        setCurrentPage(1);
    };

    const selectedCategory = categories.find(c => c.id === selectedCategoryId);

    // Get all products to show based on the active filter
    const displayedProducts = useMemo(() => {
        if (!selectedCategory) return [];
        const prods = selectedCategory.products || [];
        if (activeFilter === "ALL") {
            return prods;
        } else {
            return prods.filter(p => p.subcategory === activeFilter);
        }
    }, [selectedCategory, activeFilter]);

    if (isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center w-full">
                <div className="text-neutral-400 uppercase tracking-widest text-xs animate-pulse">Loading products...</div>
            </div>
        );
    }

    if (!categories.length) {
        return <div className="p-8 text-center text-neutral-500 uppercase tracking-widest text-xs w-full">No products available.</div>;
    }

    if (!selectedCategory) return null;

    // Determine subcategories for filters based on the products
    const subcategorySet = new Set<string>();
    selectedCategory.products?.forEach(p => {
        if (p.subcategory) subcategorySet.add(p.subcategory);
    });
    const subcategories = Array.from(subcategorySet).sort();
    
    // If there are no specific subcategories, it is flat
    const isFlat = subcategories.length === 0;

    const ITEMS_PER_PAGE = 12;
    const totalPages = Math.ceil(displayedProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = displayedProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Format number to '01', '02', etc.
    const formatNumber = (num: number) => num.toString().padStart(2, '0');

    return (
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] w-full relative">
            
            {/* Mobile Category Selector */}
            <div className="md:hidden w-full border-b border-neutral-200 bg-white p-4 sticky top-[72px] z-30">
                <label htmlFor="mobile-category-select" className="block text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.12em] mb-2">
                    Select Category
                </label>
                <div className="relative">
                    <select
                        id="mobile-category-select"
                        value={selectedCategoryId}
                        onChange={(e) => handleCategorySelect(e.target.value)}
                        className="w-full h-14 border border-black rounded-none px-4 bg-white text-[12px] font-medium uppercase tracking-[0.06em] text-black appearance-none focus:outline-none focus:ring-1 focus:ring-black/20 pr-10"
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                |{formatNumber(category.number)}| {category.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
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
                                <span className="pt-[1px]">{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 flex flex-col w-full bg-white relative">
                
                {/* Filter Row Header */}
                <div className="bg-white border-b border-neutral-200/60 transition-all">
                    {/* Header info */}
                    <div className="px-6 md:px-10 pt-8 pb-4">
                        <h1 className="text-[14px] font-medium uppercase tracking-[0.06em] text-black mb-2">
                            {selectedCategory.name}
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
                                    key={sub}
                                    onClick={() => { setActiveFilter(sub); setCurrentPage(1); }}
                                    className={`px-4 py-2 text-[11px] uppercase tracking-[0.08em] whitespace-nowrap transition-colors border ${
                                        activeFilter === sub
                                            ? "bg-black text-white border-black"
                                            : "bg-transparent text-neutral-600 border-neutral-200 hover:border-black hover:text-black"
                                    }`}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Grid */}
                <div className="flex-1 bg-neutral-200">
                    {displayedProducts.length > 0 ? (
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1px]">
                            {paginatedProducts.map((product, index) => (
                                <ProductCard 
                                    key={`${product.id}-${index}`} 
                                    product={product} 
                                    index={index} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white h-64 flex items-center justify-center">
                            <span className="text-[11px] uppercase tracking-widest text-neutral-400">No products found.</span>
                        </div>
                    )}
                </div>

                {/* Visual Pagination */}
                {totalPages > 1 && (
                    <div className="bg-white border-t border-neutral-200/60 p-6 md:px-10 flex items-center justify-between mt-auto">
                        <div className="flex gap-4 text-[12px] font-medium tracking-widest">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button 
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`${currentPage === i + 1 ? "underline underline-offset-4 decoration-1" : "text-neutral-400 hover:text-black transition-colors"}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        {currentPage < totalPages && (
                            <button 
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="text-[11px] uppercase tracking-[0.08em] text-neutral-400 hover:text-black transition-colors flex items-center"
                            >
                                Next
                                <svg className="w-3 h-3 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
