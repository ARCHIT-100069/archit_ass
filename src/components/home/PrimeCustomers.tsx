import React from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // Revalidate cache occasionally

export default async function PrimeCustomers() {
  const { data: companies, error } = await supabase
    .from("prime_customers")
    .select("*")
    .order("order_index");

  if (error) {
    console.error("Error fetching prime customers:", error);
  }

  const displayCompanies = companies || [];
  // Duplicate array for seamless infinite scrolling
  const marqueeCompanies = [...displayCompanies, ...displayCompanies];

  if (displayCompanies.length === 0) {
    return null; // or a loading/empty state
  }

  return (
    <section className="pt-8 pb-16 md:py-32 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 mb-12 md:mb-16 text-center">
        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.15em] block mb-3">
          Trusted By Industry Leaders
        </span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-6">
          Prime Customers
        </h2>
        <p className="text-neutral-900/60 max-w-2xl mx-auto text-lg leading-[1.65]">
          We are proud to have supplied laboratory and industrial testing equipment to some of India's most respected companies.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        
        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div 
          className="flex overflow-x-auto gap-6 px-4 md:px-12 py-4 scrollbar-hide snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayCompanies.map((company, index) => (
            <div
              key={`${company.id || index}-${index}`}
              className="flex-shrink-0 snap-start w-64 md:w-72 bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group h-48 md:h-56"
            >
              {company.logo_url ? (
                <div className="relative w-full h-24 md:h-28 mb-4 transition-all duration-300 filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100">
                  <Image
                    src={company.logo_url}
                    alt={company.name}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 16rem, 18rem"
                  />
                </div>
              ) : (
                <div className="w-full h-24 md:h-28 mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-2">
                    <span className="text-neutral-400 font-semibold text-lg">{company.name.charAt(0)}</span>
                  </div>
                </div>
              )}
              <h3 className="font-semibold text-neutral-800 text-sm md:text-[15px] leading-snug line-clamp-2">
                {company.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
