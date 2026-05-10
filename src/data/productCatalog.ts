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
                    { name: "PSC Sleeper Moulds (BG/MG)" },
                    { name: "Modular Precast Moulds" },
                    { name: "High-Frequency Vibrators" },
                ],
            },
            {
                title: "Stressing & Tensioning Systems",
                products: [
                    { name: "Hydraulic Jacking Units (500–1000 KN)" },
                    { name: "Digital Stress Recording Systems" },
                    { name: "Anchorage & Wedges" },
                    { name: "HTS Wire Straightening & Cutting Machines" },
                ],
            },
            {
                title: "Plant & Handling Equipment",
                products: [
                    { name: "Spares for Steam Boilers & Curing Systems" },
                    { name: "Spares for Gantry Cranes (4T/5T)" },
                    { name: "Vacuum Lifters" },
                    { name: "Spares for De-moulding Hoists" },
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
                ],
            },
            {
                title: "Soil & Geotechnical Testing",
                products: [
                    { name: "CBR Testing Machine", image: "/products/cbr-test-apparatus.png" },
                    { name: "Direct Shear & Triaxial Apparatus", image: "/products/direct-shear-apparatus.png" },
                    { name: "Sieves, Sieve Shakers & Core Cutters", image: "/products/sieve-shaker.png" },
                    { name: "Compaction Test Equipment", image: "/products/compaction-test-equipment.png" },
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
        description: "Environmental monitoring instruments, storage solutions, cleaning equipment, and lab utilities.",
        subcategories: [
            {
                title: "Products",
                products: [
                    { name: "Noise Level Meters", image: "/products/noise-level-meter.jpg" },
                    { name: "Lux Meters", image: "/products/lux-meter.png" },
                    { name: "Digital Anemometers", image: "/products/anemometer.png" },
                    { name: "Flammable Storage Cabinets", image: "/products/flammable-storage-cabinet.png" },
                    { name: "Fluorescent Lighting Unit (FLU)", image: "/products/flu.png" },
                    { name: "Ultrasonic Cleaners", image: "/products/ultrasonic-cleaner.jpg" },
                    { name: "Sample Collection Bags", image: "/products/sample-collection-bag.jpg" },
                    { name: "Digital Vernier Caliper", image: "/final_images/Digital Vernier Calipper_final.png" },
                    { name: "Digital Micrometer", image: "/final_images/Digital Micrometer_final.png" },
                    { name: "Laser Digital Meter", image: "/final_images/Laser Distance Meter_final.png" },
                    { name: "General and Heavy Duty Drill Machine", image: "/final_images/General Heavy Duty Drill Machines_final.png" },
                ],
            },
        ],
    },
];
