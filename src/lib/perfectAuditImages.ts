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

const STOP_WORDS = new Set([
    "from", "equipment", "email", "final", "other", "apparatus", "testing", 
    "machine", "machines", "meters", "meter", "gauges", "gauge", "digital", 
    "and", "the", "for", "with", "spares", "accessories", "units", "system", "systems"
]);

function getKeywords(name: string): string[] {
    const words = name.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/);
    return words.filter(w => w.length > 2 && !STOP_WORDS.has(w));
}

function isPerfectMatch(productName: string, filename: string): boolean {
    const prodKeywords = getKeywords(productName);
    const normalizedFile = filename.toLowerCase().replace(/[^a-z0-9]/g, '');

    // If there are no distinct keywords left after stop words, use the whole name minus non-alphanumeric
    if (prodKeywords.length === 0) {
        const fallbackWord = productName.toLowerCase().replace(/[^a-z0-9]/g, '');
        return fallbackWord.length > 3 && normalizedFile.includes(fallbackWord);
    }

    // ALL key words MUST be present in the filename
    // Example: "Toe Gap Gauges" -> keywords: ["toe", "gap"] -> file must contain "toe" and "gap"
    for (const kw of prodKeywords) {
        if (!normalizedFile.includes(kw)) {
            // Also tolerate minor pluralization differences (e.g. glove vs gloves)
            if (kw.endsWith('s') && normalizedFile.includes(kw.slice(0, -1))) {
                continue;
            }
            if (!kw.endsWith('s') && normalizedFile.includes(kw + 's')) {
                continue;
            }
            return false;
        }
    }

    return true;
}

function getPerfectMatchFile(productName: string, filenames: string[]): string | null {
    // Hardcoded absolute overrides if needed, but the prompt says "exact word match only".
    for (const file of filenames) {
        if (isPerfectMatch(productName, file)) {
            return file;
        }
    }
    return null;
}

async function run() {
  console.log("Starting PERFECT strict image audit...");

  const finalImagesDir = path.resolve(process.cwd(), 'public/final_images');
  const finalImageFiles = fs.readdirSync(finalImagesDir).filter(f => !f.startsWith('.'));
  
  const { data: products, error } = await supabase.from('products').select('id, name, image_url');
  if (error || !products) return;

  const report = [];

  for (const prod of products) {
    let currentFilename = "";
    if (prod.image_url && prod.image_url !== "null") {
        const decodedUrl = decodeURIComponent(prod.image_url);
        currentFilename = decodedUrl.split('/').pop() || "";
    }

    // Is the current assigned image a perfect match?
    let currentIsPerfect = false;
    if (currentFilename) {
        currentIsPerfect = isPerfectMatch(prod.name, currentFilename);
    }

    if (currentFilename && currentIsPerfect) {
        report.push({ name: prod.name, status: "KEPT", file: currentFilename, reason: "Already perfect match" });
        continue;
    }

    // If it's not perfect or it's null, we need to find a perfect match
    const newMatch = getPerfectMatchFile(prod.name, finalImageFiles);

    if (newMatch) {
        if (currentFilename !== newMatch) {
            // Upload just in case
            const filePath = path.join(finalImagesDir, newMatch);
            const fileBuffer = fs.readFileSync(filePath);
            await supabase.storage.from('product-images').upload(newMatch, fileBuffer, { upsert: false, contentType: 'image/' + newMatch.split('.').pop() }).catch(() => {});
            
            const url = `${supabaseUrl}/storage/v1/object/public/product-images/${encodeURIComponent(newMatch)}`;
            await supabase.from('products').update({ image_url: url }).eq('id', prod.id);
            
            report.push({ name: prod.name, status: "NEWLY ASSIGNED", file: newMatch, reason: `Found perfect match (was: ${currentFilename || 'null'})` });
        } else {
            // This case shouldn't hit because if it was the same, currentIsPerfect would be true
            report.push({ name: prod.name, status: "KEPT", file: newMatch, reason: "Already perfect match" });
        }
    } else {
        // No perfect match found. If it had something, remove it.
        if (currentFilename) {
            await supabase.from('products').update({ image_url: null }).eq('id', prod.id);
            report.push({ name: prod.name, status: "REMOVED", file: 'null', reason: `'${currentFilename}' is NOT a perfect match. Removed.` });
        } else {
            report.push({ name: prod.name, status: "LEFT NULL", file: 'null', reason: "No matching file found" });
        }
    }
  }

  console.log(`\n=== FINAL PERFECT AUDIT REPORT ===\n`);
  report.forEach(r => {
      console.log(`[${r.status}] ${r.name}`);
      console.log(`     File: ${r.file}`);
      console.log(`     Reason: ${r.reason}\n`);
  });

  console.log(`Audit complete!`);
}

run().catch(console.error);
