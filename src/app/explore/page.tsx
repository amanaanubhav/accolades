import { createClient } from '@/utils/supabase/server';
import ExploreHome from '@/features/explore/ExploreHome';
import { Opportunity } from '@/types';

export const dynamic = 'force-dynamic';

// Transform Supabase row to Opportunity type
function transformOpportunity(row: any): Opportunity {
    return {
        id: row.id,
        title: row.title,
        organization: row.organizations?.name || row.organization_name || 'Unknown',
        category: row.category,
        deadline: row.end_date,
        end_date: row.end_date,
        description: row.description || row.brief_overview || '',
        brief_overview: row.brief_overview,
        url: row.apply_link || '',
        apply_link: row.apply_link,
        banner_url: row.banner_url,
        tags: row.tags || [],
        location: row.location,
        isPaid: row.is_paid,
        mode: row.mode,
        slug: row.slug,
        createdAt: row.created_at,
    };
}

export default async function ExplorePage() {
    const supabase = await createClient();

    // Fetch active verified opportunities with organization join
    const { data: opportunities, error } = await supabase
        .from('opportunities')
        .select('*, organizations(name, logo_url)')
        .eq('is_verified', true)
        .gt('end_date', new Date().toISOString())
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching opportunities:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
    }

    const transformedData = (opportunities || []).map(transformOpportunity);

    return <ExploreHome initialData={transformedData} />;
}
