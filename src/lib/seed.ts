import { createClient } from '@supabase/supabase-js';
import { productCatalog } from '../data/productCatalog';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

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

async function seed() {
    console.log("Starting database seed...");

    // 1. Seed Prime Customers
    console.log("Seeding prime_customers...");
    for (let i = 0; i < companies.length; i++) {
        const { error } = await supabase.from('prime_customers').insert({
            name: companies[i].name,
            logo_url: companies[i].logo,
            order_index: i + 1,
        });
        if (error) {
            console.error(`Failed to insert customer: ${companies[i].name}`, error);
        }
    }

    // 2. Seed Categories and Products
    console.log("Seeding categories and products...");
    for (const cat of productCatalog) {
        const { data: categoryData, error: catError } = await supabase
            .from('categories')
            .insert({
                number: cat.number,
                name: cat.title,
                description: cat.description,
                slug: cat.id
            })
            .select()
            .single();

        if (catError || !categoryData) {
            console.error(`Failed to insert category: ${cat.title}`, catError);
            continue;
        }

        let orderIndex = 1;
        for (const sub of cat.subcategories) {
            for (const prod of sub.products) {
                const { error: prodError } = await supabase.from('products').insert({
                    category_id: categoryData.id,
                    name: prod.name,
                    image_url: prod.image || null,
                    subcategory: sub.title === "Products" || sub.title === "General Equipment" ? null : sub.title,
                    order_index: orderIndex++
                });

                if (prodError) {
                    console.error(`Failed to insert product: ${prod.name}`, prodError);
                }
            }
        }
    }

    console.log("Seed completed successfully!");
}

seed().catch(console.error);
