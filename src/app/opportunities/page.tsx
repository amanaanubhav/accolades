import { createClient } from '@supabase/supabase-js';
import { CatalogView } from '@/features/opportunities/CatalogView';
import type { Opportunity, OpportunityCategory } from '@/types';

export const metadata = {
    title: 'Explore Opportunities | Accolades',
    description: 'Discover competitions, internships, hackathons, and summer programs from top organizations worldwide.',
};

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
    };
}

export default async function Page() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: opportunities, error } = await supabase
        .from('opportunities')
        .select(`
            id,
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
        `)
        .order('end_date', { ascending: true });

    if (error) {
        console.error("Fetch Error:", error);
    }

    const transformedData = (opportunities || []).map(transformOpportunity);

    return <CatalogView initialData={transformedData} />;
}
