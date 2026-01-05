/**
 * useFilter Hook
 * 
 * Manages filter state synchronized with URL search parameters.
 * Enables shareable filtered views via URLs.
 */

'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { FilterState, OpportunityCategory, FilterMode, FilterCost } from '@/types';

/**
 * Default filter state
 */
const DEFAULT_FILTERS: FilterState = {
    category: 'all',
    search: '',
    showExpired: false,
    mode: 'all',
    cost: 'all'
};

/**
 * Hook for managing filter state via URL search parameters
 * 
 * @returns Filter state and update functions
 * 
 * @example
 * ```tsx
 * const { filters, setCategory, setSearch, setMode, setCost, resetFilters } = useFilter();
 * ```
 */
export function useFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    /**
     * Parse current filter state from URL
     */
    const filters: FilterState = useMemo(() => {
        const category = searchParams.get('category') as OpportunityCategory | 'all' | null;
        const search = searchParams.get('search') || '';
        const showExpired = searchParams.get('expired') === 'true';
        const mode = searchParams.get('mode') as FilterMode | null;
        const cost = searchParams.get('cost') as FilterCost | null;

        return {
            category: category || 'all',
            search,
            showExpired,
            mode: mode || 'all',
            cost: cost || 'all'
        };
    }, [searchParams]);

    /**
     * Update URL with new filter parameters
     */
    const updateParams = useCallback(
        (updates: Partial<FilterState>) => {
            const params = new URLSearchParams(searchParams.toString());

            // Update category
            if (updates.category !== undefined) {
                if (updates.category === 'all') {
                    params.delete('category');
                } else {
                    params.set('category', updates.category);
                }
            }

            // Update search
            if (updates.search !== undefined) {
                if (updates.search === '') {
                    params.delete('search');
                } else {
                    params.set('search', updates.search);
                }
            }

            // Update showExpired
            if (updates.showExpired !== undefined) {
                if (updates.showExpired) {
                    params.set('expired', 'true');
                } else {
                    params.delete('expired');
                }
            }

            // Update mode
            if (updates.mode !== undefined) {
                if (updates.mode === 'all') {
                    params.delete('mode');
                } else {
                    params.set('mode', updates.mode);
                }
            }

            // Update cost
            if (updates.cost !== undefined) {
                if (updates.cost === 'all') {
                    params.delete('cost');
                } else {
                    params.set('cost', updates.cost);
                }
            }

            const queryString = params.toString();
            // Reset page if needed (not implementing paging yet but good practice)

            const url = queryString ? `${pathname}?${queryString}` : pathname;

            router.push(url, { scroll: false });
        },
        [searchParams, router, pathname]
    );

    /**
     * Helper setters
     */
    const setCategory = useCallback((category: OpportunityCategory | 'all') => updateParams({ category }), [updateParams]);
    const setSearch = useCallback((search: string) => updateParams({ search }), [updateParams]);
    const toggleExpired = useCallback(() => updateParams({ showExpired: !filters.showExpired }), [updateParams, filters.showExpired]);
    const setMode = useCallback((mode: FilterMode) => updateParams({ mode }), [updateParams]);
    const setCost = useCallback((cost: FilterCost) => updateParams({ cost }), [updateParams]);

    /**
     * Reset all filters to default
     */
    const resetFilters = useCallback(() => {
        router.push(pathname, { scroll: false });
    }, [router, pathname]);

    return {
        filters,
        setCategory,
        setSearch,
        toggleExpired,
        setMode,
        setCost,
        resetFilters,
        updateParams,
    };
}
