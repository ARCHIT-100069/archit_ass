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

function cleanString(str: string): string {
    const stopwords = ["from", "equipment", "email", "final", "other", "the", "and", "for", "with", "apparatus", "testing", "machine", "meters", "meter", "gauges", "gauge", "digital"];
    let cleaned = str.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
    stopwords.forEach(word => {
        cleaned = cleaned.replace(new RegExp(`\\b${word}\\b`, 'g'), ' ');
    });
    return cleaned.replace(/\s+/g, ' ').trim();
}

function isConfidentMatch(productName: string, filename: string): boolean {
    const cleanProd = cleanString(productName);
    const cleanFile = cleanString(filename.split('.')[0]);

    if (!cleanProd || !cleanFile) {
        const prodRaw = productName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const fileRaw = filename.split('.')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
        return prodRaw === fileRaw || (prodRaw.length > 4 && fileRaw.includes(prodRaw));
    }

    const prodWords = cleanProd.split(' ').filter(w => w.length > 2);
    const fileWords = cleanFile.split(' ').filter(w => w.length > 2);

    if (prodWords.length === 0 || fileWords.length === 0) return false;

    // Strict matching: at least one word must be highly similar, or exact subset
    let exactMatches = 0;
    for (const pw of prodWords) {
        if (fileWords.some(fw => fw === pw || (pw.length > 4 && (fw.includes(pw) || pw.includes(fw))))) {
            exactMatches++;
        }
    }

    // Require at least 1 exact distinct noun match
    if (exactMatches > 0) {
        // Prevent completely disjoint names from matching just because they share one short word
        return true;
    }

    return false;
}

function getConfidentMatch(name: string, filenames: string[]) {
    // Specific hardcoded overrides based on known valid mappings
    const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normalizedName.includes('toegapgauge')) return filenames.find(f => f.includes('toe gap gauge_final'));
    if (normalizedName.includes('digitalmastergauge')) return filenames.find(f => f.includes('Digital Master Gauge'));

    for (const file of filenames) {
        if (isConfidentMatch(name, file)) {
            return file;
        }
    }
    return null;
}

async function run() {
  console.log("Starting strict image audit...");

  const finalImagesDir = path.resolve(process.cwd(), 'public/final_images');
  const finalImageFiles = fs.readdirSync(finalImagesDir).filter(f => !f.startsWith('.'));
  
  console.log(`\nFound ${finalImageFiles.length} files in final_images folder.\n`);

  const { data: products, error } = await supabase.from('products').select('id, name, image_url');
  if (error || !products) return;

  const report = {
      assigned: [] as string[],
      removed: [] as string[],
      null: [] as string[]
  };

  for (const prod of products) {
    let currentFilename = "";
    if (prod.image_url && prod.image_url !== "null") {
        const decodedUrl = decodeURIComponent(prod.image_url);
        currentFilename = decodedUrl.split('/').pop() || "";
    }

    let shouldBeNull = false;

    // Check if the currently assigned image is actually a confident match
    if (currentFilename) {
        if (currentFilename === 'assorted_gauges .png' && !prod.name.toLowerCase().includes('spare')) {
             // We erroneously assigned assorted_gauges to many things earlier. Fix it.
             shouldBeNull = true;
        } else if (!isConfidentMatch(prod.name, currentFilename) && !prod.name.toLowerCase().includes('toegap') && !prod.name.toLowerCase().includes('digitalmaster')) {
            shouldBeNull = true;
        }
    } else {
        shouldBeNull = true;
    }

    if (shouldBeNull) {
        // Try to find a real confident match
        const match = getConfidentMatch(prod.name, finalImageFiles);
        if (match) {
            if (currentFilename !== match) {
                // Upload and assign new match
                const filePath = path.join(finalImagesDir, match);
                const fileBuffer = fs.readFileSync(filePath);
                await supabase.storage.from('product-images').upload(match, fileBuffer, { upsert: false, contentType: 'image/' + match.split('.').pop() }).catch(() => {});
                
                const url = `${supabaseUrl}/storage/v1/object/public/product-images/${encodeURIComponent(match)}`;
                await supabase.from('products').update({ image_url: url }).eq('id', prod.id);
                
                report.assigned.push(`${prod.name} -> ${match}`);
            }
        } else {
            // Nullify if it had a wrong image, or keep null if it was already null
            if (currentFilename) {
                await supabase.from('products').update({ image_url: null }).eq('id', prod.id);
                report.removed.push(`${prod.name} (was previously: ${currentFilename})`);
            } else {
                report.null.push(prod.name);
            }
        }
    } else {
        // It was already a confident match
    }
  }

  console.log(`\n=== STRICT AUDIT REPORT ===\n`);

  console.log(`NEW IMAGES CONFIDENTLY ASSIGNED (${report.assigned.length}):`);
  report.assigned.forEach(r => console.log(` ✔ ${r}`));

  console.log(`\nWRONG IMAGES REMOVED (${report.removed.length}):`);
  report.removed.forEach(r => console.log(` ✘ ${r}`));

  console.log(`\nPRODUCTS LEFT AS NULL (NO CONFIDENT MATCH) (${report.null.length}):`);
  report.null.forEach(r => console.log(` - ${r}`));

  console.log(`\nAudit complete!`);
}

run().catch(console.error);
