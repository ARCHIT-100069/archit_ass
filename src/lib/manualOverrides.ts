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

const overrides = [
  { product: "RT381 Insert Checking Gauge", file: "RT381 instert_checking gauge.png" },
  { product: "Compression Testing Machine (2000 KN), Cube Moulds", file: "compression testing machine.png" },
  { product: "Vicat Apparatus, Blaine Apparatus", file: "Vicat Apparatus from Equipment Email.jpg" },
  { product: "Slump Cone & Vee-Bee Apparatus", file: "Slump Test Apparatus from Equipment Email.jpg" },
  { product: "Direct Shear & Triaxial Apparatus", file: "Direct Shear Apparatus from Equipment Email_final.png" },
  { product: "DFT Coating Thickness Gauges", file: "DFT Coating Gauge from Equipment Email_final.png" },
  { product: "Adhesion Testers", file: "Adhension Tester from Equipment_final.png" },
  { product: "Turbidity Meters", file: "turbidy meter_final.png" },
  { product: "Conical Mandrel Bend Tester", file: "conical mandrel test_final.png" },
  { product: "Salt Spray Chamber", file: "salt_spray_chmaber_final.png" },
  { product: "High Visibility Reflective Jackets", file: "safety_jackets_final.png" },
  { product: "Safety Gloves (Heat / Nitrile / Cut Resistant)", file: "safety_gloves.png" },
  { product: "Full Body Harnesses", file: "Safety Harness from Other Equipment_final.png" },
  { product: "Respirators & N95 Masks", file: "Safety Masks from Other Equipment.jpg" },
  { product: "Auto Levels & Theodolites", file: "Autolevel from other equipment_final.png" },
  { product: "Measuring Tapes & Ranging Rods", file: "Measuring Tapes from Equipment Email.jpg" },
  { product: "Leveling Staff", file: "Levelling Staff_final.png" },
  { product: "Fluorescent Lighting Unit (FLU)", file: "FLU_final.png" },
  { product: "Digital Vernier Caliper", file: "Digital Vernier Calipper_final.png" }
];

async function run() {
  console.log("Applying manual image overrides based on user input...");

  let successCount = 0;
  let failCount = 0;

  for (const override of overrides) {
      const url = `${supabaseUrl}/storage/v1/object/public/product-images/${encodeURIComponent(override.file)}`;
      
      const { data, error } = await supabase
        .from('products')
        .update({ image_url: url })
        .eq('name', override.product)
        .select();

      if (error) {
          console.error(`[ERROR] Failed to update '${override.product}': ${error.message}`);
          failCount++;
      } else if (data && data.length === 0) {
          console.log(`[WARNING] Product not found in database: '${override.product}'`);
          failCount++;
      } else {
          console.log(`[SUCCESS] Assigned '${override.file}' to '${override.product}'`);
          successCount++;
      }
  }

  console.log(`\nFinished applying overrides.`);
  console.log(`Successfully updated: ${successCount}`);
  if (failCount > 0) console.log(`Failed to update: ${failCount}`);
}

run().catch(console.error);
