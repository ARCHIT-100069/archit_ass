import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// ── Helper: get the current max order_index for a category ──────────────────
async function getMaxOrderIndex(categoryId: string): Promise<number> {
    const { data } = await supabase
        .from('products')
        .select('order_index')
        .eq('category_id', categoryId)
        .order('order_index', { ascending: false })
        .limit(1);
    return data?.[0]?.order_index ?? 0;
}

// ── Helper: insert products into an existing category by slug ────────────────
async function addProductsToCategory(slug: string, products: { name: string; subcategory?: string | null }[]) {
    const { data: cat, error } = await supabase
        .from('categories')
        .select('id, name')
        .eq('slug', slug)
        .single();

    if (error || !cat) {
        console.error(`❌  Category not found for slug: "${slug}"`, error);
        return;
    }

    let orderIndex = (await getMaxOrderIndex(cat.id)) + 1;

    for (const prod of products) {
        const { error: prodError } = await supabase.from('products').insert({
            category_id: cat.id,
            name: prod.name,
            image_url: null,
            subcategory: prod.subcategory ?? null,
            order_index: orderIndex++,
        });
        if (prodError) {
            console.error(`  ❌  Failed to insert "${prod.name}":`, prodError.message);
        } else {
            console.log(`  ✅  "${prod.name}" → ${cat.name}`);
        }
    }
}

// ── Helper: create a brand-new category and insert its products ──────────────
async function createCategoryWithProducts(
    number: number,
    name: string,
    description: string,
    slug: string,
    products: { name: string }[]
) {
    // Check if the category already exists
    const { data: existing } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', slug)
        .single();

    if (existing) {
        console.log(`ℹ️   Category "${name}" already exists — skipping creation, adding products only.`);
        await addProductsToCategory(slug, products);
        return;
    }

    const { data: newCat, error: catError } = await supabase
        .from('categories')
        .insert({ number, name, description, slug })
        .select()
        .single();

    if (catError || !newCat) {
        console.error(`❌  Failed to create category "${name}":`, catError?.message);
        return;
    }
    console.log(`🆕  Created category: "${name}"`);

    let orderIndex = 1;
    for (const prod of products) {
        const { error: prodError } = await supabase.from('products').insert({
            category_id: newCat.id,
            name: prod.name,
            image_url: null,
            subcategory: null,
            order_index: orderIndex++,
        });
        if (prodError) {
            console.error(`  ❌  Failed to insert "${prod.name}":`, prodError.message);
        } else {
            console.log(`  ✅  "${prod.name}" → ${name}`);
        }
    }
}

async function main() {
    console.log('\n🚀  Inserting new products into Supabase...\n');

    // ── 1. Bitumen & Road Testing (existing: civil-material-testing) ─────────
    // subcategory label must match what's already in the DB for that category
    console.log('📂  Bitumen & Road Testing (civil-material-testing)');
    await addProductsToCategory('civil-material-testing', [
        { name: 'Asphalt Content Tester',   subcategory: 'Bitumen & Road Testing' },
        { name: 'Bitumen Mixer with Heater', subcategory: 'Bitumen & Road Testing' },
        { name: 'Kinematic Viscometer',      subcategory: 'Bitumen & Road Testing' },
        { name: 'Loss on Heating Oven',      subcategory: 'Bitumen & Road Testing' },
        { name: 'Ring and Ball',             subcategory: 'Bitumen & Road Testing' },
        { name: 'Rolling Thin Film',         subcategory: 'Bitumen & Road Testing' },
        { name: 'Rotational Viscometer',     subcategory: 'Bitumen & Road Testing' },
    ]);

    // ── 2. Cement & Concrete Testing (existing: civil-material-testing) ──────
    console.log('\n📂  Cement & Concrete Testing (civil-material-testing)');
    await addProductsToCategory('civil-material-testing', [
        { name: 'Lechatlier Water Bath', subcategory: 'Cement & Concrete Testing' },
        { name: 'Vibrating Machine',     subcategory: 'Cement & Concrete Testing' },
    ]);

    // ── 3. Soil & Geotechnical Testing (existing: civil-material-testing) ────
    console.log('\n📂  Soil & Geotechnical Testing (civil-material-testing)');
    await addProductsToCategory('civil-material-testing', [
        { name: 'Silt Content Test Apparatus',    subcategory: 'Soil & Geotechnical Testing' },
        { name: 'Sand Equivalent Test Apparatus', subcategory: 'Soil & Geotechnical Testing' },
    ]);

    // ── 4. Paint / Powder Coating (existing: chemical-paint-wood-testing) ────
    console.log('\n📂  Paint / Powder Coating (chemical-paint-wood-testing)');
    await addProductsToCategory('chemical-paint-wood-testing', [
        { name: 'Paint Digital Coating Gauge', subcategory: null },
    ]);

    // ── 5. General Lab Utility Equipment (existing: general-lab-utility) ─────
    console.log('\n📂  General Lab Utility Equipment (general-lab-utility)');
    await addProductsToCategory('general-lab-utility', [
        { name: 'Moisture Balance', subcategory: null },
    ]);

    // ── 6. NEW: Tile Testing ─────────────────────────────────────────────────
    console.log('\n📂  NEW category: Tile Testing');
    await createCategoryWithProducts(
        9,
        'Tile Testing',
        'Equipment for testing tiles including skid resistance, adhesion, modulus of rupture, abrasion, and autoclave testing.',
        'tile-testing',
        [
            { name: 'Skid Resistance Tester' },
            { name: 'Pull of Adhesion Tester' },
            { name: 'MOR Testing Machine' },
            { name: 'Tile Abrasion Machine' },
            { name: 'Tile Autoclave' },
        ]
    );

    // ── 7. NEW: Iron Rebar / Metal Testing Machine ───────────────────────────
    console.log('\n📂  NEW category: Iron Rebar / Metal Testing Machine');
    await createCategoryWithProducts(
        10,
        'Iron Rebar / Metal Testing Machine',
        'Machines and equipment for testing iron rebar and metals including polishing, hardness, and abrasion testing.',
        'iron-rebar-metal-testing',
        [
            { name: 'Double Disc Polishing Machine' },
            { name: 'Rockwell Brinell Hardness Tester' },
            { name: 'Spectro Polishing Machine' },
            { name: 'Accelerated Polishing Machine' },
            { name: 'Deep Abrasion Testing Machine' },
        ]
    );

    console.log('\n✅  All done!\n');
}

main().catch(console.error);
