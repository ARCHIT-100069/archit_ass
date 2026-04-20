"use client";

import { useState } from "react";
import { productCatalog } from "@/data/productCatalog";
import CategorySection from "./CategorySection";

export default function ProductsCatalogView() {
    const [expandAll, setExpandAll] = useState(false);
    // Increment version to force remount all CategorySections when toggling
    const [version, setVersion] = useState(0);

    const handleToggleAll = () => {
        setExpandAll((prev) => !prev);
        setVersion((v) => v + 1);
    };

    return (
        <div>
            {/* Expand / Collapse All toggle */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={handleToggleAll}
                    className="text-sm font-medium text-neutral-500 hover:text-black transition-colors underline underline-offset-4 cursor-pointer"
                >
                    {expandAll ? "Collapse All" : "Expand All"}
                </button>
            </div>

            {/* Category sections */}
            <div className="space-y-2">
                {productCatalog.map((category) => (
                    <CategorySection
                        key={`${category.id}-${version}`}
                        number={category.number}
                        title={category.title}
                        subcategories={category.subcategories}
                        defaultOpen={expandAll}
                    />
                ))}
            </div>
        </div>
    );
}
