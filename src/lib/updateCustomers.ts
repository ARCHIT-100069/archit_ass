import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.PNG', '.JPG', '.JPEG', '.WEBP', ''];

async function checkUrlExists(url: string): Promise<boolean> {
    return new Promise((resolve) => {
        fetch(url, { method: 'HEAD' })
            .then(res => {
                resolve(res.ok);
            })
            .catch(() => {
                resolve(false);
            });
    });
}

async function findFileUrl(baseName: string): Promise<string | null> {
    for (const ext of extensions) {
        // Handle names with spaces by encoding them
        const url = `${supabaseUrl}/storage/v1/object/public/customer-logos/${encodeURIComponent(baseName + ext)}`;
        const exists = await checkUrlExists(url);
        if (exists) return url;
    }
    return null;
}

async function run() {
  console.log("Searching for valid logo URLs in customer-logos bucket...");

  const hilLogoUrl = await findFileUrl("HIL_logo") || await findFileUrl("HIL logo") || await findFileUrl("hil_logo") || await findFileUrl("HIL") || await findFileUrl("HIL_Limited_logo") || await findFileUrl("HIL Limited_logo") || await findFileUrl("hil") || await findFileUrl("HIL Limited logo") || await findFileUrl("HIL Limited");
  const birlaLogoUrl = await findFileUrl("BirlaNu_logo");
  const ahluwaliaLogoUrl = await findFileUrl("Ahluwalia Contracts_logo");

  console.log("\nFound URLs:");
  console.log("HIL:", hilLogoUrl);
  console.log("Birla:", birlaLogoUrl);
  console.log("Ahluwalia:", ahluwaliaLogoUrl);

  // 1. Update HIL Limited
  if (hilLogoUrl) {
      await supabase.from('prime_customers').update({ logo_url: hilLogoUrl }).eq('name', 'HIL Limited');
      console.log("Updated HIL Limited.");
  } else {
      const fallbackUrl = `${supabaseUrl}/storage/v1/object/public/customer-logos/HIL_logo.png`;
      await supabase.from('prime_customers').update({ logo_url: fallbackUrl }).eq('name', 'HIL Limited');
      console.log("Forced update of HIL Limited with fallback URL: HIL_logo.png");
  }

  // 2. Update BirlaNU
  if (birlaLogoUrl) {
      const { data: birlaMatch } = await supabase.from('prime_customers').select('name').ilike('name', '%Birla%');
      if (birlaMatch && birlaMatch.length > 0) {
          await supabase.from('prime_customers').update({ logo_url: birlaLogoUrl }).eq('name', birlaMatch[0].name);
          console.log(`Updated ${birlaMatch[0].name}.`);
      } else {
          console.log("Warning: Could not find Birla in DB");
      }
  } else {
      console.log("Warning: Could not find BirlaNu_logo");
  }

  // 3. Remove Raghvendra Rail Infrastructure
  const { data: raghvendraMatch } = await supabase.from('prime_customers').select('name').ilike('name', '%Raghvendra%');
  if (raghvendraMatch && raghvendraMatch.length > 0) {
      await supabase.from('prime_customers').update({ logo_url: null }).eq('name', raghvendraMatch[0].name);
      console.log(`Removed logo from ${raghvendraMatch[0].name}.`);
  } else {
      console.log("Warning: Could not find Raghvendra in DB");
  }

  // 4. Add Ahluwalia Contracts (India) ltd. | ACIL
  if (ahluwaliaLogoUrl) {
      // Find max order_index to append
      const { data: maxOrder } = await supabase.from('prime_customers').select('order_index').order('order_index', { ascending: false }).limit(1);
      const nextIndex = (maxOrder && maxOrder.length > 0) ? maxOrder[0].order_index + 1 : 100;
      
      const newCustomer = {
          name: "Ahluwalia Contracts (India) ltd. | ACIL",
          logo_url: ahluwaliaLogoUrl,
          order_index: nextIndex
      };
      
      const { error: insertError } = await supabase.from('prime_customers').insert(newCustomer);
      if (insertError) {
          console.error("Failed to insert Ahluwalia:", insertError);
      } else {
          console.log("Inserted Ahluwalia Contracts.");
      }
  } else {
      console.log("Warning: Could not find Ahluwalia Contracts_logo");
  }

  console.log("Updates complete!");
}

run().catch(console.error);
