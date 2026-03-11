'use client';

import { HeroCarousel } from './components/HeroCarousel';
import { CategorySwimlane } from './components/CategorySwimlane';
import { Opportunity } from '@/types';
import { SearchX } from 'lucide-react';
import Link from 'next/link';

interface ExploreHomeProps {
    initialData: Opportunity[];
    searchQuery?: string;
}

export default function ExploreHome({ initialData, searchQuery }: ExploreHomeProps) {
    // If search is active and no results, show empty state
    if (searchQuery && initialData.length === 0) {
        return (
            <div className="min-h-screen bg-black pb-20">
                <div className="h-8" />
                <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
                    <div className="p-6 rounded-full bg-zinc-900/50 border border-zinc-800 mb-6">
                        <SearchX size={48} className="text-zinc-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        No results found
                    </h2>
                    <p className="text-zinc-500 mb-6 max-w-md">
                        We couldn't find any opportunities matching "<span className="text-zinc-300">{searchQuery}</span>". Try a different search term or browse all opportunities.
                    </p>
                    <Link
                        href="/explore"
                        className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors"
                    >
                        Clear search
                    </Link>
                </div>
            </div>
        );
    }

    // Mock grouping logic - in a real app this would likely come pre-grouped from server or use separate queries
    const featured = initialData.slice(0, 1); // Top 1 for Hero
    const trending = initialData.slice(0, 5);
    const hackathons = initialData.filter(o => o.category === 'hackathon');
    const internships = initialData.filter(o => o.category === 'internship');
    const closingSoon = [...initialData].sort((a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime()).slice(0, 5);

    // If search is active, show search results view
    if (searchQuery) {
        return (
            <div className="min-h-screen bg-black pb-20">
                <div className="h-8" />
                <div className="px-6 mb-8">
                    <p className="text-zinc-500 text-sm">
                        Showing <span className="text-white font-medium">{initialData.length}</span> results for "<span className="text-zinc-300">{searchQuery}</span>"
                    </p>
                </div>
                <CategorySwimlane
                    title="Search Results"
                    link="/explore"
                    items={initialData}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pb-20">
            {/* Top spacer for fixed header */}
            <div className="h-8" />

            {/* Hero Section */}
            <HeroCarousel featured={featured} />

            {/* Discovery Swimlanes */}
            <div className="space-y-4">
                {hackathons.length > 0 && (
                    <CategorySwimlane
                        title="Trending Hackathons"
                        link="/explore/hackathons"
                        items={hackathons}
                    />
                )}

                {internships.length > 0 && (
                    <CategorySwimlane
                        title="High-Paying Internships"
                        link="/explore/internships"
                        items={internships}
                    />
                )}

                {closingSoon.length > 0 && (
                    <CategorySwimlane
                        title="Closing Soon"
                        link="/explore"
                        items={closingSoon}
                    />
                )}

                {/* Fallback if data is sparse, show generic list */}
                <CategorySwimlane
                    title="Recently Added"
                    link="/explore"
                    items={trending}
                />
            </div>
        </div>
    );
}
