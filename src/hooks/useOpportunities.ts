/**
 * useOpportunities Hook
 * 
 * Fetches opportunities from Supabase with mock data fallback.
 * Applies filters and returns filtered results.
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Opportunity, FilterState } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { MOCK_OPPORTUNITIES } from '@/lib/constants';
import { getDaysRemaining } from '@/lib/utils';

interface UseOpportunitiesResult {
    opportunities: Opportunity[];
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

/**
 * Hook to fetch and filter opportunities
 * 
 * @param filters - Current filter state
 * @returns Filtered opportunities, loading state, and error
 */
export function useOpportunities(filters: FilterState): UseOpportunitiesResult {
    const [allOpportunities, setAllOpportunities] = useState<Opportunity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetch opportunities from Supabase or use mock data
     */
    const fetchOpportunities = async () => {
        setIsLoading(true);
        setError(null);

        try {
            if (!isSupabaseConfigured || !supabase) {
                // Use mock data if Supabase is not configured
                console.info('📦 Using mock data (Supabase not configured)');
                setAllOpportunities(MOCK_OPPORTUNITIES);
                return;
            }

            const { data, error: supabaseError } = await supabase
                .from('opportunities')
                .select('*')
                .order('deadline', { ascending: true });

            if (supabaseError) {
                throw new Error(supabaseError.message);
            }

            setAllOpportunities(data || []);
        } catch (err) {
            console.warn('⚠️ Failed to fetch from Supabase, using mock data:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch opportunities');
            // Fallback to mock data on error
            setAllOpportunities(MOCK_OPPORTUNITIES);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOpportunities();
    }, []);

    /**
     * Apply filters to opportunities
     */
    const filteredOpportunities = useMemo(() => {
        return allOpportunities.filter((opp) => {
            // Category filter
            if (filters.category !== 'all' && opp.category !== filters.category) {
                return false;
            }

            // Search filter (title, organization, description, tags)
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch =
                    opp.title.toLowerCase().includes(searchLower) ||
                    opp.organization.toLowerCase().includes(searchLower) ||
                    opp.description.toLowerCase().includes(searchLower) ||
                    opp.tags.some((tag) => tag.toLowerCase().includes(searchLower));

                if (!matchesSearch) return false;
            }

            // Expired filter
            if (!filters.showExpired) {
                const daysRemaining = getDaysRemaining(opp.deadline);
                if (daysRemaining < 0) return false;
            }

            return true;
        });
    }, [allOpportunities, filters]);

    return {
        opportunities: filteredOpportunities,
        isLoading,
        error,
        refetch: fetchOpportunities,
    };
}
