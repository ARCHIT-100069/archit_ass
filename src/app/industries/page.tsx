import Link from "next/link";
import { ArrowRight, TrainFront, Factory, FlaskConical, HardHat, Building2, Paintbrush } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Industries We Serve",
    description:
        "Archit Associates supplies testing equipment and industrial supplies to railways, PSC sleeper plants, construction QC labs, cement and concrete producers, paint shops, and manufacturing industries across India.",
    alternates: {
        canonical: "/industries",
    },
};

const industries = [
    {
        icon: TrainFront,
        title: "Railways & Track Infrastructure",
        description:
            "Precision inspection gauges, toe gap and toe pin gauges, sleeper checking gauges, and master references for railway sleeper manufacturers and track infrastructure projects.",
        link: "/products/railway-sleeper-inspection",
        linkLabel: "Railway Inspection Gauges",
    },
    {
        icon: Factory,
        title: "PSC Sleeper & Precast Plants",
        description:
            "Sleeper moulds, modular precast moulds, high-frequency vibrators, and hydraulic jacking and stressing systems for PSC sleeper and precast concrete production lines.",
        link: "/products/pre-casting-production",
        linkLabel: "Pre-Casting Equipment",
    },
    {
        icon: FlaskConical,
        title: "Material Testing Laboratories",
        description:
            "Complete lab setups for cement, concrete, soil, geotechnical, bitumen, and road testing — compression testing machines, CBR apparatus, sieves, and everything in between.",
        link: "/products/civil-material-testing",
        linkLabel: "Civil Material Testing",
    },
    {
        icon: Building2,
        title: "Construction & Infrastructure",
        description:
            "Surveying instruments, total stations, auto levels, field monitoring equipment, and on-site quality control tools for construction and infrastructure companies.",
        link: "/products/surveying-field-monitoring",
        linkLabel: "Surveying & Monitoring",
    },
    {
        icon: Paintbrush,
        title: "Paint, Coating & Wood Industries",
        description:
            "Coating thickness gauges, gloss meters, adhesion testers, salt spray chambers, and moisture meters for paint shops, coating lines, and wood processing units.",
        link: "/products/chemical-paint-wood-testing",
        linkLabel: "Chemical & Paint Testing",
    },
    {
        icon: HardHat,
        title: "Manufacturing & Industrial Safety",
        description:
            "Personal protective equipment — helmets, harnesses, respirators, safety shoes — plus general lab utility equipment for manufacturing plants and industrial facilities.",
        link: "/products/industrial-safety-ppe",
        linkLabel: "Safety & PPE",
    },
];

export default function IndustriesPage() {
    return (
        <div className="pt-32 min-h-screen pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mb-16">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">
                        Who We Work With
                    </p>
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.025em] mb-6 leading-[1.1]">
                        Industries We Serve
                    </h1>
                    <p className="text-neutral-900/60 text-lg leading-[1.65]">
                        From railway sleeper plants to construction QC labs, we supply the testing
                        equipment and industrial supplies that keep India&apos;s infrastructure and
                        manufacturing sectors running — backed by 28+ years of industry experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                    {industries.map((industry) => (
                        <div
                            key={industry.title}
                            className="relative h-full bg-white border border-neutral-200/80 rounded-[14px] p-8 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] hover:border-neutral-300 transition-all duration-300"
                        >
                            <div className="w-11 h-11 rounded-lg bg-neutral-100 flex items-center justify-center mb-5">
                                <industry.icon className="w-5 h-5 text-neutral-700" />
                            </div>
                            <h2 className="font-heading text-[20px] font-bold text-neutral-900 mb-3 leading-[1.25] tracking-[-0.02em]">
                                {industry.title}
                            </h2>
                            <p className="text-neutral-900/55 text-[15px] leading-[1.7] mb-6">
                                {industry.description}
                            </p>
                            <Link
                                href={industry.link}
                                className="inline-flex items-center text-[12px] font-semibold uppercase tracking-[0.1em] text-neutral-500 hover:text-black transition-colors group"
                            >
                                {industry.linkLabel}
                                <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-neutral-50 border border-neutral-200 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-[-0.02em] mb-2">
                            Don&apos;t see your industry?
                        </h2>
                        <p className="text-neutral-900/60 text-[15px] leading-[1.65] max-w-xl">
                            We source and supply laboratory equipment and testing instruments tailored
                            to specific industry requirements. Tell us what you need.
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="shrink-0 inline-flex items-center justify-center px-8 py-4 bg-black text-white text-[13px] font-semibold uppercase tracking-[0.1em] hover:bg-neutral-800 transition-colors rounded-sm min-h-[48px]"
                    >
                        Contact Us
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
