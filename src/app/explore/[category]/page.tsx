import { createClient } from '@/utils/supabase/server';
import CategoryFeed from '@/features/explore/CategoryFeed';
import { notFound } from 'next/navigation';

interface Props {
    params: {
        category: string;
    };
}

export const dynamic = 'force-dynamic';

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Map URL slugs to DB category names if needed
const categoryMap: Record<string, string> = {
    'hackathons': 'Hackathon',
    'internships': 'Internship',
    'research': 'Research',
    'challenges': 'Coding Challenge', // Assuming this is the DB value or similar
};

export default async function CategoryPage({ params }: Props) {
    const { category } = params;

    // Determine DB category value
    // If exact match in map, use it. Else try capitalizing singular form as fallback
    const dbCategory = categoryMap[category.toLowerCase()] || capitalize(category.replace(/s$/, ''));

    const supabase = createClient();

    const { data: opportunities } = await supabase
        .from('opportunities')
        .select('*')
        .eq('is_verified', true)
        .eq('category', dbCategory)
        .gt('end_date', new Date().toISOString())
        .order('created_at', { ascending: false });

    return <CategoryFeed category={category} initialData={opportunities || []} />;
}
