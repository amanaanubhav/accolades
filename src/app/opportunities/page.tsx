import { Suspense } from 'react';
import { createClient } from '@supabase/supabase-js';
import { CatalogView } from '@/features/opportunities/CatalogView';
import type { Opportunity, OpportunityCategory } from '@/types';

export const metadata = {
    title: 'Explore Opportunities | Accolades',
    description: 'Discover competitions, internships, hackathons, and summer programs from top organizations worldwide.',
};

// Force dynamic rendering to ensure searchParams are always fresh
export const dynamic = 'force-dynamic';

/**
 * Transform Supabase row to Opportunity interface
 */
function transformOpportunity(row: any): Opportunity {
    return {
        id: row.id,
        title: row.title || 'Untitled',
        organization: row.organizations?.name || 'Unknown Organization',
        category: row.category || 'Competition',
        deadline: row.end_date || new Date().toISOString(),
        description: row.brief_overview || '',
        url: row.apply_link || '#',
        tags: [],
        location: row.location || undefined,
        isPaid: row.cost_type === 'Paid',
        createdAt: row.created_at,
        mode: row.mode,
        slug: row.slug,
    };
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    // Await searchParams (Next.js 14+ requirement)
    const params = await searchParams;

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Parse Search Params
    const search = typeof params.search === 'string' ? params.search : undefined;
    const category = typeof params.category === 'string' ? params.category : undefined;
    const mode = typeof params.mode === 'string' ? params.mode : undefined;
    const cost = typeof params.cost === 'string' ? params.cost : undefined;

    let query = supabase
        .from('opportunities')
        .select(`
            id,
            slug,
            title,
            banner_url,
            end_date,
            mode,
            cost_type,
            apply_link,
            brief_overview,
            location,
            category,
            created_at,
            organizations (
                name,
                logo_url,
                website_url
            )
        `);

    // Apply Server-Side Filters
    if (search) {
        query = query.ilike('title', `%${search}%`);
    }

    if (category && category !== 'all') {
        query = query.eq('category', category);
    }

    if (mode && mode !== 'all') {
        query = query.eq('mode', mode);
    }

    if (cost && cost !== 'all') {
        query = query.eq('cost_type', cost);
    }

    // Execute Query
    const { data: opportunities, error } = await query.order('end_date', { ascending: true });

    if (error) {
        console.error("Fetch Error:", error);
    }

    const transformedData = (opportunities || []).map(transformOpportunity);

    return (
        <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">Loading opportunities...</div>}>
            <CatalogView initialData={transformedData} />
        </Suspense>
    );
}
