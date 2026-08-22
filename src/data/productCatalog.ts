export interface ProductItem {
    name: string;
    image?: string;
}

export interface SubCategory {
    title: string;
    products: ProductItem[];
}

export interface ProductCategory {
    id: string;
    number: number;
    title: string;
    description: string;
    subcategories: SubCategory[];
}

/** URL-safe slug for a product name, e.g. "PSC Sleeper Moulds (BG/MG)" → "psc-sleeper-moulds-bg-mg" */
export function slugifyProduct(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export interface ProductLookupResult {
    product: ProductItem;
    productSlug: string;
    subcategoryTitle: string;
    category: ProductCategory;
}

/** Find a product by its category id and product slug. */
export function findProductBySlug(categoryId: string, productSlug: string): ProductLookupResult | null {
    const category = productCatalog.find((c) => c.id === categoryId);
    if (!category) return null;
    for (const sub of category.subcategories) {
        for (const product of sub.products) {
            if (slugifyProduct(product.name) === productSlug) {
                return { product, productSlug, subcategoryTitle: sub.title, category };
            }
        }
    }
    return null;
}

/** All products across every category, with slugs and category context. */
export function getAllProducts(): ProductLookupResult[] {
    return productCatalog.flatMap((category) =>
        category.subcategories.flatMap((sub) =>
            sub.products.map((product) => ({
                product,
                productSlug: slugifyProduct(product.name),
                subcategoryTitle: sub.title,
                category,
            }))
        )
    );
}

export const productCatalog: ProductCategory[] = [
    {
        id: "railway-sleeper-inspection",
        number: 1,
        title: "Railway Sleeper Inspection & Precision Gauges",
        description: "Precision gauges for dimensional inspection, master references, and digital measurement of railway sleepers.",
        subcategories: [
            {
                title: "Dimensional Inspection Series",
                products: [
                    { name: "Toe Gap Gauges", image: "/products/toe-gap-gauge.png" },
                    { name: "Digital Master Gauges", image: "/products/digital-master-gauge.png" },
                    { name: "Toe Pin Gauge and Master Gauge", image: "/final_images/Toe pin gauge and master gauge _final.png" },
                    { name: "Toe Pin Gap Gauge", image: "/final_images/toe_pin_gap_gauge_final.png" },
                    { name: "Stencils as per Requirement", image: "/final_images/stencils as per requirement.png" },
                    { name: "Sleeper Checking Gauges", image: "/final_images/sleeper_checking_gauges_final.png" },
                    { name: "RT3705 Inspection Gauge", image: "/final_images/rt3705 inspection gauge.png" },
                    { name: "RT381 Insert Checking Gauge", image: "/final_images/RT381 instert_checking gauge.png" },
                    { name: "Bench Bolt and Nut", image: "/final_images/bench bolt and nut .png" },
                    { name: "Assorted Gauges", image: "/final_images/assorted_gauges .png" },
                ],
            },
        ],
    },
    {
        id: "pre-casting-production",
        number: 2,
        title: "Pre-Casting & Production Equipment (PSC & Precast)",
        description: "Moulds, stressing systems, and plant equipment for PSC sleeper and precast concrete production.",
        subcategories: [
            {
                title: "Mould & Formwork Systems",
                products: [
                    { name: "PSC Sleeper Moulds (BG/MG)", image: "https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/product-images/PSC%20Sleeper%20Mould.png" },
                    { name: "Modular Precast Moulds", image: "https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/product-images/Modular%20Precast%20Mould.png" },
                    { name: "High-Frequency Vibrators", image: "https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/product-images/High%20Frequency%20Vibrator.png" },
                ],
            },
            {
                title: "Stressing & Tensioning Systems",
                products: [
                    { name: "Hydraulic Jacking Units (500–1000 KN)", image: "https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/product-images/Hyadaulic%20Jacking%20uNIT.jpeg" },
                ],
            },
        ],
    },
    {
        id: "civil-material-testing",
        number: 3,
        title: "Civil Material Testing Laboratory Equipment",
        description: "Comprehensive lab equipment for cement, concrete, soil, geotechnical, bitumen, and road testing.",
        subcategories: [
            {
                title: "Cement & Concrete Testing",
                products: [
                    { name: "Compression Testing Machine (2000 KN), Cube Moulds", image: "/products/ctm-compression-testing-machine.png" },
                    { name: "Flexural Testing Machine, Beam Moulds", image: "/products/flexural-testing-machine.png" },
                    { name: "Vicat Apparatus, Blaine Apparatus", image: "/products/vicat-apparatus.jpg" },
                    { name: "Slump Cone & Vee-Bee Apparatus", image: "/products/slump-cone-apparatus.jpg" },
                    { name: "Rebound Hammer", image: "/products/rebound-hammer.png" },
                    { name: "UPV Tester", image: "/products/upv-tester.jpg" },
                    { name: "RCPT Apparatus", image: "/final_images/rcpt_final_2.png" },
                    { name: "Cement Autoclave", image: "/final_images/cement autoclave_final.png" },
                    { name: "Mortar Mixer", image: "/final_images/mortar_mixer_final.png" },
                    { name: "Flow Table", image: "/final_images/flow_table_final.png" },
                    { name: "Lechatlier Water Bath" },
                    { name: "Vibrating Machine" },
                ],
            },
            {
                title: "Soil & Geotechnical Testing",
                products: [
                    { name: "CBR Testing Machine", image: "/products/cbr-test-apparatus.png" },
                    { name: "Direct Shear & Triaxial Apparatus", image: "/products/direct-shear-apparatus.png" },
                    { name: "Sieves, Sieve Shakers & Core Cutters", image: "/products/sieve-shaker.png" },
                    { name: "Compaction Test Equipment", image: "/products/compaction-test-equipment.png" },
                    { name: "Silt Content Test Apparatus" },
                    { name: "Sand Equivalent Test Apparatus" },
                ],
            },
            {
                title: "Bitumen & Road Testing",
                products: [
                    { name: "Flash Points, Tar Viscometer, Penetrometer", image: "/products/flash-point-apparatus.png" },
                    { name: "Bitumen Penetrometer", image: "/products/bitumen-penetrometer.png" },
                    { name: "Softening Point Apparatus", image: "/products/softening-point-apparatus.png" },
                    { name: "Ductility Testing Machine", image: "/products/ductility-testing-machine.png" },
                    { name: "Marshall Stability Equipment", image: "/products/marshall-test-apparatus.png" },
                    { name: "Viscometer Tubes", image: "/final_images/Viscometer Tubes_final.png" },
                    { name: "Kinematic Viscometer Bath", image: "/final_images/Kinematic Viscometer Bath_final.png" },
                    { name: "Asphalt Furnace", image: "/final_images/Asphalt Furnace_final.png" },
                    { name: "Asphalt Content Tester" },
                    { name: "Bitumen Mixer with Heater" },
                    { name: "Kinematic Viscometer" },
                    { name: "Loss on Heating Oven" },
                    { name: "Ring and Ball" },
                    { name: "Rolling Thin Film" },
                    { name: "Rotational Viscometer" },
                ],
            },
        ],
    },
    {
        id: "chemical-paint-wood-testing",
        number: 4,
        title: "Chemical, Paint & Wood Testing",
        description: "Coating thickness, gloss, adhesion, pH, turbidity, and moisture testing instruments.",
        subcategories: [
            {
                title: "Products",
                products: [
                    { name: "DFT Coating Thickness Gauges", image: "/products/dft-coating-gauge.png" },
                    { name: "Gloss Meters", image: "/products/gloss-meter.png" },
                    { name: "Adhesion Testers", image: "/products/adhesion-tester.png" },
                    { name: "Digital pH & TDS Meters", image: "/products/ph-meter.png" },
                    { name: "Turbidity Meters", image: "/products/turbidity-meter.png" },
                    { name: "Wood Moisture Meters", image: "/products/wood-moisture-meter.png" },
                    { name: "Flow Cups", image: "/final_images/flow_cup_final.png" },
                    { name: "Conical Mandrel Bend Tester", image: "/final_images/conical mandrel test_final.png" },
                    { name: "Salt Spray Chamber", image: "/final_images/salt_spray_chmaber_final.png" },
                    { name: "Paint Digital Coating Gauge" },
                ],
            },
        ],
    },
    {
        id: "industrial-safety-ppe",
        number: 5,
        title: "Industrial Safety & PPE",
        description: "Personal protective equipment including helmets, gloves, harnesses, and respirators.",
        subcategories: [
            {
                title: "Products",
                products: [
                    { name: "Safety Helmets", image: "/products/safety-helmet.webp" },
                    { name: "High Visibility Reflective Jackets", image: "/products/safety-jackets.png" },
                    { name: "Safety Gloves (Heat / Nitrile / Cut Resistant)", image: "/products/safety-gloves.png" },
                    { name: "Safety Shoes", image: "/products/safety-shoes.jpg" },
                    { name: "Full Body Harnesses", image: "/products/safety-harness.png" },
                    { name: "Respirators & N95 Masks", image: "/products/safety-mask.png" },
                ],
            },
        ],
    },
    {
        id: "surveying-field-monitoring",
        number: 6,
        title: "Surveying & Field Monitoring",
        description: "Total stations, auto levels, laser distance meters, and field measurement accessories.",
        subcategories: [
            {
                title: "Products",
                products: [
                    { name: "Total Stations", image: "/products/total-station.jpg" },
                    { name: "Auto Levels & Theodolites", image: "/products/autolevel.png" },
                    { name: "Laser Distance Meters", image: "/products/laser-distance-meter.png" },
                    { name: "Measuring Tapes & Ranging Rods", image: "/products/measuring-tapes.jpg" },
                    { name: "Leveling Staff", image: "/final_images/Levelling Staff_final.png" },
                    { name: "Geological Compass", image: "/final_images/Geological Compass_final.png" },
                    { name: "Weather Station", image: "/final_images/weather_station_final.png" },
                ],
            },
        ],
    },
    {
        id: "general-lab-utility",
        number: 7,
        title: "General Lab Utility Equipment",
        description: "General purpose laboratory utility equipment and tools.",
        subcategories: [
            {
                title: "Products",
                products: [
                    { name: "Noise Level Meters", image: "/final_images/Noise Level Meter from Equipment.jpg" },
                    { name: "Lux Meters", image: "/final_images/Lux Meter from Equipment Email.png" },
                    { name: "Digital Anemometers", image: "/final_images/Anemometer from Equipment_final.png" },
                    { name: "Flammable Storage Cabinets", image: "/final_images/Flammable Storage Cabinet from Other Equipment_final.png" },
                    { name: "Fluorescent Lighting Unit (FLU)", image: "/final_images/FLU_final.png" },
                    { name: "Ultrasonic Cleaners", image: "/final_images/Ultrasonic Cleaner from Equipment Email.jpg" },
                    { name: "Sample Collection Bags", image: "/final_images/Sample Collection Bag from Equipment Email.jpg" },
                    { name: "Digital Vernier Caliper", image: "/final_images/Digital Vernier Calipper_final.png" },
                    { name: "Digital Micrometer", image: "/final_images/Digital Micrometer_final.png" },
                    { name: "Laser Digital Meter", image: "/final_images/Laser Distance Meter_final.png" },
                    { name: "General and Heavy Duty Drill Machine", image: "/final_images/General Heavy Duty Drill Machines_final.png" },
                    { name: "Moisture Balance" },
                ],
            },
        ],
    },
    {
        id: "tile-testing",
        number: 9,
        title: "Tile Testing",
        description: "Equipment for testing tiles including skid resistance, adhesion, modulus of rupture, abrasion, and autoclave testing.",
        subcategories: [
            {
                title: "Products",
                products: [
                    { name: "Skid Resistance Tester" },
                    { name: "Pull of Adhesion Tester" },
                    { name: "MOR Testing Machine" },
                    { name: "Tile Abrasion Machine" },
                    { name: "Tile Autoclave" },
                ],
            },
        ],
    },
    {
        id: "iron-rebar-metal-testing",
        number: 10,
        title: "Iron Rebar / Metal Testing Machine",
        description: "Machines and equipment for testing iron rebar and metals including polishing, hardness, and abrasion testing.",
        subcategories: [
            {
                title: "Products",
                products: [
                    { name: "Double Disc Polishing Machine" },
                    { name: "Rockwell Brinell Hardness Tester" },
                    { name: "Spectro Polishing Machine" },
                    { name: "Accelerated Polishing Machine" },
                    { name: "Deep Abrasion Testing Machine" },
                ],
            },
        ],
    },
    {
        id: "laboratory-testing-equipment-accessories",
        number: 8,
        title: "Laboratory Testing Instruments & Accessories",
        description: "Laboratory testing instruments and accessories.",
        subcategories: [
            {
                title: "Laboratory Testing Instruments & Accessories",
                products: [
                    { name: "Lime Testing Machine", image: "https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/product-images/Lime%20Testing%20Machine.jpeg" },
                    { name: "Reflectance Meter for Brightness and Whiteness", image: "https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/product-images/Reflectance%20Meter%20for%20Brightness%20and%20Whiteness.jpeg" },
                    { name: "Test Sieves", image: "https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/product-images/Test%20Sieves.jpeg" },
                    { name: "Weighing Balances", image: "https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/product-images/Weighing%20Balances.jpeg" },
                    { name: "Laboratory Spares", image: "https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/product-images/LABORATORY%20SPARES.jpeg" },
                    { name: "Lab Chemicals", image: "https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/product-images/lab%20chemicals.jpeg" },
                    { name: "Glassware / Plastic Labware", image: "https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/product-images/Glassware%20%3A%20Plastic%20Labware.jpeg" },
                ],
            },
        ],
    },
];
