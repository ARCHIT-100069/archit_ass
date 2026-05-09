import React from "react";
import Image from "next/image";

const companies = [
  { name: "Daya Engineering Works Pvt Limited", logo: "/clients/Daya Engg.png" },
  { name: "HIL Limited", logo: "/clients/Screenshot 2026-05-09 at 8.06.44 PM.png" },
  { name: "BirlaNU", logo: "/clients/Screenshot 2026-05-09 at 8.08.16 PM.png" },
  { name: "Icon Sleepers Track Pvt Limited", logo: "/clients/icon sleeper.png" },
  { name: "Kajaria Ceramics", logo: "/clients/kajaria.png" },
  { name: "Kamboj Infrastructure Pvt Limited", logo: "/clients/kamboj .png" },
  { name: "Patil Rail Infrastructure Pvt Limited", logo: "/clients/patil group pg.png" },
  { name: "Samridhi Build Mart Pvt Limited", logo: "/clients/Samridhi.png" },
  { name: "Ooms Polymer", logo: "/clients/ooms.png" },
  { name: "Raghvendra Rail Infrastructure", logo: "/clients/crri.png" },
  { name: "Tinna Rubber", logo: "/clients/Tinna Rubber.png" },
  { name: "Coromandel Concrete Product", logo: "/clients/Coromondal.png" },
  { name: "NCCBM", logo: "/clients/NCCBM.png" },
  { name: "Tiki Tar and Shell India Pvt Limited", logo: "/clients/Tikitar.png" },
  { name: "TP Build Tech", logo: "/clients/tpbuildtech 1617553563873.jfif" },
  { name: "KEC International", logo: "/clients/kec.png" }
];

export default function PrimeCustomers() {
  // Duplicate array for seamless infinite scrolling
  const marqueeCompanies = [...companies, ...companies];

  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 mb-16 text-center">
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

      <div className="relative w-full overflow-hidden marquee-container flex">
        {/* We use a custom CSS animation block for the marquee */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              display: flex;
              width: max-content;
              animation: marquee 40s linear infinite;
            }
            .marquee-container:hover .animate-marquee {
              animation-play-state: paused;
            }
          `
        }} />

        <div className="animate-marquee gap-6 px-3">
          {marqueeCompanies.map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 md:w-72 bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 group cursor-default h-48 md:h-56"
            >
              {company.logo ? (
                <div className="relative w-full h-24 md:h-28 mb-4 transition-all duration-300 filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100">
                  <Image
                    src={company.logo}
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
