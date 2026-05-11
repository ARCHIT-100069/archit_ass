"use client";

import { useState } from "react";
import { productCatalog } from "@/data/productCatalog";
import SubCategorySection from "./SubCategorySection";

export default function ProductsCatalogView() {
    const categories = productCatalog;
    const [selectedCategoryId, setSelectedCategoryId] = useState(
        categories.length > 0 ? categories[0].id : ''
    );

    if (!categories.length) {
        return <div className="p-8 text-center text-neutral-500">No products available.</div>;
    }

    const selectedCategory = categories.find(c => c.id === selectedCategoryId);
    
    if (!selectedCategory) return null;

    const isFlat = selectedCategory.subcategories.length === 1 && selectedCategory.subcategories[0].title === "Products";

    return (
        <div>
            {/* Category Tabs Selector */}
            <div className="flex flex-wrap gap-3 mb-12 pb-6 border-b border-neutral-200">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategoryId(category.id)}
                        className={`px-5 py-2.5 text-sm md:text-[15px] font-medium transition-all duration-300 rounded-full ${
                            selectedCategoryId === category.id
                                ? "bg-neutral-900 text-white shadow-md scale-105"
                                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black hover:scale-105"
                        }`}
                    >
                        {category.title}
                    </button>
                ))}
            </div>

            {/* Selected Category Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" key={selectedCategoryId}>
                <div className="mb-10">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-4 text-neutral-900">
                        {selectedCategory.title}
                    </h2>
                    <p className="text-neutral-500 text-lg max-w-3xl leading-relaxed">
                        {selectedCategory.description}
                    </p>
                </div>

                <div className="space-y-12">
                    {selectedCategory.subcategories.map((sub) => (
                        <SubCategorySection
                            key={sub.title}
                            title={sub.title}
                            products={sub.products}
                            isFlat={isFlat}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
