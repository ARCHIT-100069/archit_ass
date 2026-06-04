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

const newCustomers = [
  {
    name: "Parampara Group",
    logo_url: "https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/customer-logos/Parampara%20Group.jpeg"
  },
  {
    name: "Kayem Food Industries Pvt. Ltd.",
    logo_url: "https://kezzhxqzybukpgkijbnz.supabase.co/storage/v1/object/public/customer-logos/Kayem%20Food%20Industries%20Pvt.%20Ltd..jpeg"
  }
];

async function run() {
  console.log("Inserting new customers...");

  // Find max order_index to append properly
  const { data: maxOrder } = await supabase
    .from('prime_customers')
    .select('order_index')
    .order('order_index', { ascending: false })
    .limit(1);

  let nextIndex = (maxOrder && maxOrder.length > 0) ? maxOrder[0].order_index + 1 : 100;

  for (const customer of newCustomers) {
    const payload = {
      name: customer.name,
      logo_url: customer.logo_url,
      order_index: nextIndex
    };
    
    // Check if already exists just to avoid duplicates if run multiple times
    const { data: existing } = await supabase.from('prime_customers').select('id').eq('name', customer.name);
    
    if (existing && existing.length > 0) {
        console.log(`Skipping ${customer.name}, already exists in DB.`);
    } else {
        const { error } = await supabase.from('prime_customers').insert(payload);
        if (error) {
            console.error(`Failed to insert ${customer.name}:`, error.message);
        } else {
            console.log(`Successfully inserted ${customer.name} (order_index: ${nextIndex})`);
            nextIndex++;
        }
    }
  }

  console.log("Insertion complete!");
}

run().catch(console.error);
