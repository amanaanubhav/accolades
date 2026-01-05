import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// 1. Core Config for ES Modules (Fixes __dirname issues)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Load .env.local explicitly from the root
dotenv.config({ path: '.env' });

// 3. Credentials Check
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Critical Error: Supabase credentials missing from .env.local');
    console.error('   Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 4. Interfaces matching your EXACT Data Structure
interface OpportunityInput {
    id: string;
    title: string;
    organization: string;
    category: string;
    mode: 'Virtual' | 'Hybrid' | 'On-site';
    location: string | null;
    cost_type: 'Free' | 'Paid';
    stipend_prize: string;
    application_link: string;
    application_deadline: string | null; // JSON Field
    duration: string;
    prerequisites: string[];
    brief_overview: string;
    tags: string[];
    website_url?: string; // Org Field
    logo_url?: string;    // Org Field
    banner_url?: string;  // Opp Field
    is_verified?: boolean;
}

interface DataFileStructure {
    opportunities: OpportunityInput[];
}

async function seed() {
    console.log('🌱 Starting Master Seed Process...');

    // 5. Read & Parse JSON
    const dataPath = path.resolve(__dirname, '../../data.json');
    if (!fs.existsSync(dataPath)) {
        console.error('❌ data.json not found in root directory!');
        process.exit(1);
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8');
    let opportunities: OpportunityInput[] = [];

    try {
        const parsed: DataFileStructure = JSON.parse(rawData);
        if (parsed.opportunities && Array.isArray(parsed.opportunities)) {
            opportunities = parsed.opportunities;
        } else {
            throw new Error('JSON root is missing the "opportunities" array.');
        }
    } catch (e: any) {
        console.error('❌ Error parsing data.json:', e.message);
        process.exit(1);
    }

    console.log(`📦 Found ${opportunities.length} opportunities to process.`);

    // 6. Execution Loop
    for (const item of opportunities) {
        try {
            // --- STEP A: RESOLVE ORGANIZATION ---
            // We upsert the Org first to get its ID. We also update logo/website here.
            const { data: org, error: orgError } = await supabase
                .from('organizations')
                .upsert({
                    name: item.organization,
                    website_url: item.website_url || null,
                    logo_url: item.logo_url || null,
                    verified: item.is_verified ?? true // Default to true if missing
                }, { onConflict: 'name' })
                .select('id')
                .single();

            if (orgError) throw new Error(`Org Upsert Failed: ${orgError.message}`);

            // --- STEP B: INJECT OPPORTUNITY ---
            // Mapping 'application_deadline' (JSON) -> 'end_date' (DB)
            const { data: newOpp, error: oppError } = await supabase
                .from('opportunities')
                .upsert({
                    id: item.id, // Uses the UUID from JSON
                    org_id: org.id,
                    title: item.title,
                    category: item.category,
                    mode: item.mode,
                    location: item.location,
                    cost_type: item.cost_type,
                    stipend_prize: item.stipend_prize,
                    apply_link: item.application_link,
                    end_date: item.application_deadline, // <--- CRITICAL MAPPING
                    duration: item.duration,
                    prerequisites: item.prerequisites,
                    brief_overview: item.brief_overview,
                    banner_url: item.banner_url || null,
                    is_verified: item.is_verified ?? true
                }, { onConflict: 'id' })
                .select('id')
                .single();

            if (oppError) throw new Error(`Opp Upsert Failed: ${oppError.message}`);

            // --- STEP C: RESOLVE TAGS ---
            if (item.tags && item.tags.length > 0) {
                for (const tagName of item.tags) {
                    // 1. Get/Create Tag
                    const { data: tag, error: tagError } = await supabase
                        .from('tags')
                        .upsert({ name: tagName }, { onConflict: 'name' })
                        .select('id')
                        .single();

                    if (tag && !tagError) {
                        // 2. Link Tag to Opportunity
                        await supabase
                            .from('opportunity_tags')
                            .upsert({
                                opportunity_id: newOpp.id,
                                tag_id: tag.id
                            }, { onConflict: 'opportunity_id,tag_id' });
                    }
                }
            }

            console.log(`✅ Synced: ${item.title}`);

        } catch (err: any) {
            console.error(`💥 Failed to process ${item.title}:`, err.message);
        }
    }

    console.log('\n🏁 ACCCOLADES SYSTEM INITIALIZED: Database is 100% Ready.');
}

seed().catch((err) => {
    console.error('Unexpected error:', err);
    process.exit(1);
});