import fs from 'fs';
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

function getBestMatch(name: string, filenames: string[]) {
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  let bestMatch = "";
  
  // Specific fallbacks for known issues
  if (normalizedName.includes('toegapgauge')) {
      const manualMatch = filenames.find(f => f.includes('toe gap gauge_final') || f.includes('toe_pin_gap'));
      if (manualMatch) return manualMatch;
  }
  if (normalizedName.includes('digitalmastergauge')) {
      const manualMatch = filenames.find(f => f.includes('Digital Master Gauge'));
      if (manualMatch) return manualMatch;
  }

  // General fallback
  for (const file of filenames) {
    const normalizedFile = file.toLowerCase().split('.')[0].replace(/[^a-z0-9]/g, '');
    if (normalizedFile.includes(normalizedName) || normalizedName.includes(normalizedFile)) {
        return file;
    }
  }

  // Levenshtein
  let minDistance = Infinity;
  for (const file of filenames) {
    const normalizedFile = file.toLowerCase().split('.')[0].replace(/[^a-z0-9]/g, '');
    const dist = levenshtein(normalizedName, normalizedFile);
    if (dist < minDistance) {
      minDistance = dist;
      bestMatch = file;
    }
  }
  return minDistance < 15 ? bestMatch : null;
}

function levenshtein(a: string, b: string): number {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
}

async function run() {
  console.log("Starting missing images correction...");

  const finalImagesDir = path.resolve(process.cwd(), 'public/final_images');
  const finalImageFiles = fs.readdirSync(finalImagesDir).filter(f => !f.startsWith('.'));
  
  console.log("Files in final_images:", finalImageFiles.length);

  const { data: products, error } = await supabase.from('products').select('id, name, image_url');
  if (error || !products) return;

  const unmatchedProducts = [];
  let updatedCount = 0;

  for (const prod of products) {
    let currentFilename = "";
    if (prod.image_url) {
        const decodedUrl = decodeURIComponent(prod.image_url);
        currentFilename = decodedUrl.split('/').pop() || "";
    }

    // Check if the current filename actually exists locally
    const existsLocally = currentFilename ? fs.existsSync(path.join(finalImagesDir, currentFilename)) : false;

    if (!existsLocally) {
        console.log(`[Fixing] ${prod.name} -> current file '${currentFilename}' does not exist locally.`);
        
        const match = getBestMatch(prod.name, finalImageFiles);
        if (match) {
            console.log(`  -> New match found: ${match}`);
            const filePath = path.join(finalImagesDir, match);
            const fileBuffer = fs.readFileSync(filePath);

            console.log(`  -> Uploading ${match}...`);
            const { error: uploadError } = await supabase.storage
              .from('product-images')
              .upload(match, fileBuffer, {
                upsert: false,
                contentType: 'image/' + match.split('.').pop()
              });

            if (uploadError && uploadError.message !== "The resource already exists") {
              console.error(`  -> Upload failed:`, uploadError);
              unmatchedProducts.push(prod.name);
              continue;
            }

            const url = `${supabaseUrl}/storage/v1/object/public/product-images/${encodeURIComponent(match)}`;
            await supabase.from('products').update({ image_url: url }).eq('id', prod.id);
            console.log(`  -> Database updated.`);
            updatedCount++;
        } else {
            console.log(`  -> NO MATCH FOUND for ${prod.name}`);
            unmatchedProducts.push(prod.name);
        }
    }
  }

  console.log(`\n--- Final Report ---`);
  console.log(`Products updated with new images: ${updatedCount}`);
  if (unmatchedProducts.length > 0) {
      console.log(`Products STILL missing images (no matching file found):`);
      unmatchedProducts.forEach(name => console.log(` - ${name}`));
  } else {
      console.log(`All products have valid images!`);
  }
}

run().catch(console.error);
