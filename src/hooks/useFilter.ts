/**
 * useFilter Hook
 * 
 * Manages filter state synchronized with URL search parameters.
 * Enables shareable filtered views via URLs.
 */

'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { FilterState, OpportunityCategory } from '@/types';

/**
 * Default filter state
 */
const DEFAULT_FILTERS: FilterState = {
    category: 'all',
    search: '',
    showExpired: false,
};

/**
 * Hook for managing filter state via URL search parameters
 * 
 * @returns Filter state and update functions
 * 
 * @example
 * ```tsx
 * const { filters, setCategory, setSearch } = useFilter();
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

        return {
            category: category || 'all',
            search,
            showExpired,
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

            const queryString = params.toString();
            const url = queryString ? `${pathname}?${queryString}` : pathname;

            router.push(url, { scroll: false });
        },
        [searchParams, router, pathname]
    );

    /**
     * Set category filter
     */
    const setCategory = useCallback(
        (category: OpportunityCategory | 'all') => {
            updateParams({ category });
        },
        [updateParams]
    );

    /**
     * Set search filter
     */
    const setSearch = useCallback(
        (search: string) => {
            updateParams({ search });
        },
        [updateParams]
    );

    /**
     * Toggle show expired opportunities
     */
    const toggleExpired = useCallback(() => {
        updateParams({ showExpired: !filters.showExpired });
    }, [updateParams, filters.showExpired]);

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
        resetFilters,
        updateParams,
    };
}
