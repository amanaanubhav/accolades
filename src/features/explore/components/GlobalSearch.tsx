'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function GlobalSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get initial value from URL
    const initialSearch = searchParams.get('search') || '';
    const [query, setQuery] = useState(initialSearch);

    // Sync input with URL when searchParams change (e.g., back/forward navigation)
    useEffect(() => {
        const urlSearch = searchParams.get('search') || '';
        setQuery(urlSearch);
    }, [searchParams]);

    // Debounced search - updates URL after 300ms of no typing
    useEffect(() => {
        const trimmedQuery = query.trim();
        const currentSearch = searchParams.get('search') || '';

        // Don't update if the value is the same
        if (trimmedQuery === currentSearch) return;

        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (trimmedQuery) {
                params.set('search', trimmedQuery);
            } else {
                params.delete('search');
            }

            const newUrl = params.toString()
                ? `${pathname}?${params.toString()}`
                : pathname;

            router.push(newUrl, { scroll: false });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, pathname, router, searchParams]);

    // Clear search handler
    const handleClear = useCallback(() => {
        setQuery('');
        router.push(pathname, { scroll: false });
    }, [pathname, router]);

    const hasSearch = query.trim().length > 0;

    return (
        <div className="relative w-full max-w-md">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search opportunities..."
                    className="w-full pl-11 pr-10 py-2.5 bg-zinc-900/80 border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                />
                {hasSearch && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white transition-colors rounded-full hover:bg-zinc-700/50"
                        aria-label="Clear search"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>
        </div>
    );
}
