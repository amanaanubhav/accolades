'use client';

import { HeroCarousel } from './components/HeroCarousel';
import { CategorySwimlane } from './components/CategorySwimlane';
import { Opportunity } from '@/types';

interface ExploreHomeProps {
    initialData: Opportunity[];
}

export default function ExploreHome({ initialData }: ExploreHomeProps) {
    // Mock grouping logic - in a real app this would likely come pre-grouped from server or use separate queries
    const featured = initialData.slice(0, 1); // Top 1 for Hero
    const trending = initialData.slice(0, 5);
    const hackathons = initialData.filter(o => o.category === 'hackathon');
    const internships = initialData.filter(o => o.category === 'internship');
    const closingSoon = [...initialData].sort((a, b) => new Date(a.end_date).getTime() - new Date(b.end_date).getTime()).slice(0, 5);

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
