/**
 * Opp-Portal Landing Page
 * 
 * Main dashboard with hero, search, filters, and opportunity grid.
 * Uses URL parameters for filter state.
 */

'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { SearchInput } from '@/components/ui/Input';
import { CategoryFilter, QuickFilters } from '@/components/features/filters/CategoryFilter';
import { OpportunityGrid } from '@/components/features/grid/OpportunityGrid';
import { useFilter } from '@/hooks/useFilter';
import { useOpportunities } from '@/hooks/useOpportunities';

/**
 * Home Page Content (uses client hooks)
 */
function HomeContent() {
    const { filters, setCategory, setSearch } = useFilter();
    const { opportunities, isLoading } = useOpportunities(filters);

    return (
        <>
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                {/* Background gradient glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(ellipse at 50% 0%, rgba(0, 245, 255, 0.1) 0%, transparent 60%)',
                    }}
                />

                <div className="container mx-auto px-6 relative">
                    {/* Hero content */}
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass metallic-border mb-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-neon-cyan)] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-neon-cyan)]" />
                            </span>
                            <span className="text-sm text-[var(--color-silver)]">
                                {opportunities.length} opportunities available
                            </span>
                        </motion.div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            <span className="text-gradient-chrome">Discover Your Next</span>
                            <br />
                            <span
                                style={{
                                    background:
                                        'linear-gradient(90deg, var(--color-neon-cyan), var(--color-neon-magenta), var(--color-neon-gold))',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Opportunity
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg text-[var(--color-silver)] mb-8 max-w-xl mx-auto">
                            Hackathons, internships, and coding challenges—all in one place.
                            Never miss a deadline again.
                        </p>

                        {/* Search bar */}
                        <motion.div
                            className="max-w-xl mx-auto mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <SearchInput
                                value={filters.search}
                                onChange={setSearch}
                                placeholder="Search by name, organization, or tag..."
                            />
                        </motion.div>

                        {/* Quick filters */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <QuickFilters onSearch={setSearch} className="justify-center" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Main content */}
            <section className="container mx-auto px-6 pb-20">
                {/* Filter bar */}
                <motion.div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <CategoryFilter
                        selected={filters.category}
                        onChange={setCategory}
                    />

                    {/* Results count */}
                    <p className="text-sm text-[var(--color-silver)]">
                        Showing <span className="text-[var(--color-platinum)] font-medium">{opportunities.length}</span> opportunities
                    </p>
                </motion.div>

                {/* Opportunity grid */}
                <OpportunityGrid
                    opportunities={opportunities}
                    isLoading={isLoading}
                />
            </section>
        </>
    );
}

/**
 * Home Page with Suspense boundary
 */
export default function HomePage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <HomeContent />
        </Suspense>
    );
}

/**
 * Loading fallback for Suspense
 */
function LoadingFallback() {
    return (
        <div className="container mx-auto px-6 py-20">
            <div className="max-w-3xl mx-auto text-center mb-16">
                <div className="w-40 h-6 rounded-full shimmer mx-auto mb-6" />
                <div className="w-full h-16 rounded shimmer mb-4" />
                <div className="w-2/3 h-16 rounded shimmer mx-auto mb-8" />
                <div className="w-full max-w-xl h-12 rounded-xl shimmer mx-auto" />
            </div>
        </div>
    );
}
