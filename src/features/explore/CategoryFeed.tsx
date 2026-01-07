'use client';

import { OpportunityCard } from '@/features/opportunities/components/OpportunityCard';
import { Opportunity } from '@/types';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

interface CategoryFeedProps {
    category: string;
    initialData: Opportunity[];
}

export default function CategoryFeed({ category, initialData }: CategoryFeedProps) {
    // Basic local filter state for demo - could be URL synced like CatalogView
    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-black">
            {/* Context-Aware Filter Sidebar (Desktop) */}
            <aside className="hidden md:block w-64 p-6 border-r border-white/5 h-[calc(100vh-80px)] sticky top-20">
                <div className="flex items-center gap-2 mb-8 text-white font-bold uppercase tracking-widest text-xs">
                    <SlidersHorizontal size={14} /> Failed Filters
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-zinc-500 text-xs font-bold uppercase mb-3">Status</h3>
                        <div className="space-y-2">
                            {['Open Now', 'Closing Soon', 'Remote'].map(option => (
                                <label key={option} className="flex items-center gap-2 text-zinc-400 text-sm hover:text-white cursor-pointer">
                                    <input type="checkbox" className="rounded border-zinc-700 bg-zinc-800" />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Feed */}
            <div className="flex-1 p-6 md:p-8">
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight capitalize mb-2">
                            {category}
                        </h1>
                        <p className="text-zinc-500">
                            {initialData.length} opportunities found
                        </p>
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="md:hidden p-2 text-zinc-400 border border-zinc-800 rounded-lg"
                    >
                        <Filter size={20} />
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initialData.map((opp) => (
                        <OpportunityCard key={opp.id} opportunity={opp} />
                    ))}
                </div>

                {initialData.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-zinc-500 text-lg">No {category} opportunities found at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
