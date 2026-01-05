import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Opportunity, FilterState, OpportunityCategory } from '@/types';

/**
 * Transform Supabase row to Opportunity interface
 */
function transformOpportunity(row: any): Opportunity {
    return {
        id: row.id,
        title: row.title || 'Untitled',
        organization: row.organizations?.name || 'Unknown Organization',
        category: mapCategory(row.category),
        deadline: row.end_date || new Date().toISOString(),
        description: row.brief_overview || '',
        url: row.apply_link || '#',
        tags: row.opportunity_tags?.map((ot: any) => ot.tags?.name).filter(Boolean) || [],
        location: row.location || undefined,
        isPaid: row.cost_type === 'Paid',
        createdAt: row.created_at,
    };
}

/**
 * Map category string to OpportunityCategory type
 */
function mapCategory(category: string | null): OpportunityCategory {
    const normalized = category?.toLowerCase();
    if (normalized === 'hackathon' || normalized === 'hackathons') return 'hackathon';
    if (normalized === 'internship' || normalized === 'internships') return 'internship';
    if (normalized === 'challenge' || normalized === 'challenges' || normalized === 'competition' || normalized === 'competitions') return 'challenge';
    return 'hackathon'; // Default fallback
}

export const useOpportunities = (filters?: FilterState) => {
    const [rawData, setRawData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOpportunities = async () => {
            try {
                setLoading(true);

                if (!supabase) {
                    throw new Error('Supabase client not configured');
                }

                const { data, error } = await supabase
                    .from('opportunities')
                    .select(`
                        *,
                        organizations (name, logo_url, website_url),
                        opportunity_tags (
                            tags (name)
                        )
                    `)
                    .order('end_date', { ascending: true });

                if (error) throw error;
                setRawData(data || []);
            } catch (err: any) {
                console.error('Error fetching opportunities:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOpportunities();
    }, []);

    // Transform and filter data
    const opportunities = useMemo(() => {
        let transformed = rawData.map(transformOpportunity);

        // Apply filters if provided
        if (filters) {
            // Category filter
            if (filters.category && filters.category !== 'all') {
                transformed = transformed.filter(opp => opp.category === filters.category);
            }

            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                transformed = transformed.filter(opp =>
                    opp.title.toLowerCase().includes(searchLower) ||
                    opp.organization.toLowerCase().includes(searchLower) ||
                    opp.tags.some(tag => tag.toLowerCase().includes(searchLower))
                );
            }

            // Expired filter
            if (!filters.showExpired) {
                const now = new Date().toISOString();
                transformed = transformed.filter(opp => opp.deadline >= now);
            }
        }

        return transformed;
    }, [rawData, filters]);

    return { opportunities, loading, error, isLoading: loading };
};
