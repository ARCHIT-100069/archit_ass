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

// Simple Levenshtein distance for string matching
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
  // Try direct subset match first (ignoring case and extensions)
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  let bestMatch = filenames[0];
  let minDistance = Infinity;

  for (const file of filenames) {
    const normalizedFile = file.toLowerCase().split('.')[0].replace(/[^a-z0-9]/g, '');
    
    // If the file contains the product name or vice-versa
    if (normalizedFile.includes(normalizedName) || normalizedName.includes(normalizedFile)) {
        return file;
    }

    const dist = levenshtein(normalizedName, normalizedFile);
    if (dist < minDistance) {
      minDistance = dist;
      bestMatch = file;
    }
  }
  return bestMatch;
}

async function updateUrls() {
  console.log("Starting URL update script...");

  // 1. Read directories
  const finalImagesDir = path.resolve(process.cwd(), 'public/final_images');
  const clientsDir = path.resolve(process.cwd(), 'public/clients');
  
  const finalImageFiles = fs.readdirSync(finalImagesDir).filter(f => !f.startsWith('.'));
  const clientFiles = fs.readdirSync(clientsDir).filter(f => !f.startsWith('.'));

  // 2. Update prime_customers
  console.log("Updating prime_customers...");
  const { data: customers } = await supabase.from('prime_customers').select('id, name');
  
  if (customers) {
    for (const cust of customers) {
      const match = getBestMatch(cust.name, clientFiles);
      const url = `${supabaseUrl}/storage/v1/object/public/customer-logos/${encodeURIComponent(match)}`;
      
      const { error } = await supabase.from('prime_customers').update({ logo_url: url }).eq('id', cust.id);
      if (error) {
        console.error(`Error updating customer ${cust.name}:`, error);
      } else {
        console.log(`Updated customer ${cust.name} -> ${match}`);
      }
    }
  }

  // 3. Update products
  console.log("Updating products...");
  // Some products may also come from public/products. We'll read both or rely on the old image_url logic.
  // The prompt says "Read all filenames from the final_images folder in the project".
  const { data: products } = await supabase.from('products').select('id, name, image_url');
  
  if (products) {
    for (const prod of products) {
      // If the product already has an image_url like /final_images/X or /products/Y, we can just extract the filename
      // because we already mapped it perfectly in seed.ts!
      let filenameToUse = "";
      
      if (prod.image_url) {
        // e.g. "/final_images/Laser Distance Meter_final.png" -> "Laser Distance Meter_final.png"
        filenameToUse = prod.image_url.split('/').pop() || "";
      } else {
        // Fallback to fuzzy matching if null
        filenameToUse = getBestMatch(prod.name, finalImageFiles);
      }

      const url = `${supabaseUrl}/storage/v1/object/public/product-images/${encodeURIComponent(filenameToUse)}`;
      
      const { error } = await supabase.from('products').update({ image_url: url }).eq('id', prod.id);
      if (error) {
        console.error(`Error updating product ${prod.name}:`, error);
      } else {
        console.log(`Updated product ${prod.name} -> ${filenameToUse}`);
      }
    }
  }

  console.log("Update completed successfully!");
}

updateUrls().catch(console.error);
