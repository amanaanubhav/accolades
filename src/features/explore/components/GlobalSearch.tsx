'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function GlobalSearch() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/explore?search=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search opportunities..."
                    className="w-full pl-11 pr-4 py-2.5 bg-zinc-900/80 border border-zinc-800 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all"
                />
            </div>
        </form>
    );
}
