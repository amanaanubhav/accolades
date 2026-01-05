import { createClient } from '@supabase/supabase-js';
import { OpportunityCard } from '@/components/features/card/OpportunityCard';
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
        category: (row.category?.toLowerCase() === 'hackathons' ? 'hackathon' : row.category?.toLowerCase()) as OpportunityCategory || 'hackathon',
        deadline: row.end_date || new Date().toISOString(),
        description: row.brief_overview || '',
        url: row.apply_link || '#',
        tags: [], // Raw fetch here doesn't join tags yet, or we need to add it to query
        location: row.location || undefined,
        isPaid: row.cost_type === 'Paid',
        createdAt: row.created_at,
    };
}

export default async function OpportunitiesPage() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // FETCH QUERY - Joining organizations table
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
      organizations (
        name,
        logo_url,
        website_url
      )
    `)
        .order('end_date', { ascending: true });

    if (error) {
        console.error("Fetch Error:", error);
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-red-500 text-xl">Failed to load opportunities. Please try again.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600 mb-4 tracking-tighter">
                        Explore Opportunities
                    </h1>
                    <p className="text-lg text-zinc-500 max-w-2xl">
                        Discover world-class competitions, internships, hackathons, and summer programs. Your next big opportunity awaits.
                    </p>
                </div>

                {/* THE GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {opportunities?.map((opp: any) => (
                        <OpportunityCard key={opp.id} opportunity={transformOpportunity(opp)} />
                    ))}
                </div>

                {/* Empty State */}
                {(!opportunities || opportunities.length === 0) && (
                    <div className="text-center py-20">
                        <p className="text-zinc-500 text-xl">No opportunities available at the moment.</p>
                        <p className="text-zinc-600 mt-2">Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
