import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const updates = [
  { product: 'Sieves, Sieve Shakers & Core Cutters', file: 'sieve shake_final.png', isLike: '%Sieve Shakers%' },
  { product: 'Flash Points, Tar Viscometer, Penetrometer', file: 'Flash Point Apparatus from Equipment_final.png', isLike: '%Flash Point%' }
];

async function run() {
  console.log("Updating specific products...");

  for (const item of updates) {
    const url = `${supabaseUrl}/storage/v1/object/public/product-images/${encodeURIComponent(item.file)}`;
    
    let matchCondition = { column: 'name', value: item.product };
    if (item.isLike) {
        matchCondition = { column: 'name', value: item.isLike };
    }

    const { data: products } = await supabase
        .from('products')
        .select('id, name')
        .ilike('name', item.isLike ? item.isLike : item.product);
    
    if (products && products.length > 0) {
        for (const p of products) {
            const { error } = await supabase
                .from('products')
                .update({ image_url: url })
                .eq('id', p.id);
                
            if (error) {
                console.error(`Failed to update ${p.name}:`, error.message);
            } else {
                console.log(`Updated ${p.name} with ${item.file}`);
            }
        }
    } else {
        console.log(`Could not find product matching ${item.isLike || item.product} in DB.`);
    }
  }

  console.log("Updates complete!");
}

run().catch(console.error);
