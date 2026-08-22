import { Metadata } from "next";
import ProductsCatalogView, { Category } from "@/components/products/ProductsCatalogView";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
    title: "All Products — Laboratory Testing Equipment & Industrial Supplies",
    description:
        "Browse the complete Archit Associates range — railway inspection gauges, civil material and laboratory testing instruments, pre-casting equipment, safety gear, and more. New Delhi supplier, delivery across India.",
    alternates: {
        canonical: "/products",
    },
};

// Re-generate this page at most once per 60 seconds (ISR) so product data
// stays fresh without a client-side fetch — this keeps product names visible
// to search engines in the server-rendered HTML.
export const revalidate = 60;

async function getCategories(): Promise<Category[]> {
    try {
        const { data, error } = await supabase
            .from("categories")
            .select("*, products(*)")
            .order("number");

        if (error || !data) return [];

        data.forEach((cat: Category) => {
            if (cat.products) {
                cat.products.sort((a, b) => a.order_index - b.order_index);
            }
        });

        return data;
    } catch {
        // On any server-side failure, fall back to the client-side fetch
        // inside ProductsCatalogView (it still runs when no data is passed).
        return [];
    }
}

export default async function ProductsPage() {
    const categories = await getCategories();

    return (
        <div className="min-h-screen bg-white pt-[72px] md:pt-[80px]">
            {/* The catalog view handles the full layout (sidebar + main content) */}
            <ProductsCatalogView initialCategories={categories} />
        </div>
    );
}
