import { createClient } from '@/utils/supabase/server';
import CategoryFeed from '@/features/explore/CategoryFeed';
import { Opportunity } from '@/types';

interface Props {
    params: Promise<{
        category: string;
    }>;
}

export const dynamic = 'force-dynamic';

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Map URL slugs to DB category names
const categoryMap: Record<string, string> = {
    'hackathons': 'Hackathon',
    'internships': 'Internship',
    'research': 'Research',
    'challenges': 'Coding Challenge',
};

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

export default async function CategoryPage({ params }: Props) {
    const resolvedParams = await params;
    const category = resolvedParams?.category || 'all';

    // Determine DB category value
    const dbCategory = categoryMap[category.toLowerCase()] || capitalize(category.replace(/s$/, ''));

    const supabase = await createClient();

    const { data: opportunities, error } = await supabase
        .from('opportunities')
        .select('*, organizations(name, logo_url)')
        .eq('is_verified', true)
        .eq('category', dbCategory)
        .gt('end_date', new Date().toISOString())
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching opportunities:', error);
    }

    const transformedData = (opportunities || []).map(transformOpportunity);

    return <CategoryFeed category={category} initialData={transformedData} />;
}
