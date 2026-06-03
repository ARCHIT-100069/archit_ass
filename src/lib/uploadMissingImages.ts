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

function levenshtein(a: string, b: string): number {
  const matrix = [];
  let i, j;
  for (i = 0; i <= b.length; i++) { matrix[i] = [i]; }
  for (j = 0; j <= a.length; j++) { matrix[0][j] = j; }
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
}

function getBestMatch(name: string, filenames: string[]) {
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  let bestMatch = "";
  let minDistance = Infinity;

  for (const file of filenames) {
    const normalizedFile = file.toLowerCase().split('.')[0].replace(/[^a-z0-9]/g, '');
    if (normalizedFile.includes(normalizedName) || normalizedName.includes(normalizedFile)) {
        return file;
    }
    const dist = levenshtein(normalizedName, normalizedFile);
    if (dist < minDistance) {
      minDistance = dist;
      bestMatch = file;
    }
  }
  return minDistance < 15 ? bestMatch : null;
}

async function run() {
  console.log("Starting full upload to Supabase storage...");

  const finalImagesDir = path.resolve(process.cwd(), 'public/final_images');
  const finalImageFiles = fs.readdirSync(finalImagesDir).filter(f => !f.startsWith('.'));

  const { data: products, error } = await supabase.from('products').select('id, name, image_url');
  if (error || !products) {
    console.error("Failed to fetch products", error);
    return;
  }

  let uploadedCount = 0;

  for (const prod of products) {
    // Determine the expected filename
    let filename = "";
    if (prod.image_url) {
        // e.g. https://.../product-images/Asphalt%20Furnace_final.png
        const decodedUrl = decodeURIComponent(prod.image_url);
        filename = decodedUrl.split('/').pop() || "";
    }
    
    // If we don't have a file, try to match it
    if (!filename || filename === "null" || filename === "undefined") {
        const match = getBestMatch(prod.name, finalImageFiles);
        if (match) filename = match;
    }

    if (!filename) {
        console.log(`Could not find a local file for "${prod.name}".`);
        continue;
    }

    const filePath = path.join(finalImagesDir, filename);
    if (!fs.existsSync(filePath)) {
        console.log(`File does not exist locally: ${filename}`);
        continue;
    }

    const fileBuffer = fs.readFileSync(filePath);

    // Upload to bucket
    console.log(`Uploading ${filename} to product-images...`);
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filename, fileBuffer, {
        upsert: false,
        contentType: 'image/' + filename.split('.').pop()
      });

    if (uploadError && uploadError.message !== "The resource already exists") {
      console.error(`  -> Upload failed for ${filename}:`, uploadError);
      continue;
    }

    // Ensure the DB is updated with this URL just in case it was null before
    const url = `${supabaseUrl}/storage/v1/object/public/product-images/${encodeURIComponent(filename)}`;
    if (prod.image_url !== url) {
        await supabase.from('products').update({ image_url: url }).eq('id', prod.id);
    }

    uploadedCount++;
  }

  console.log(`\nUpload complete. Sent ${uploadedCount} files to Supabase Storage.`);
}

run().catch(console.error);
