'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Opportunity } from '@/types';
import { OpportunityCard } from './components/OpportunityCard';

interface CatalogViewProps {
    initialData: Opportunity[];
}

type FilterMode = 'all' | 'Virtual' | 'Hybrid' | 'On-site';
type FilterCost = 'all' | 'Free' | 'Paid';
type FilterCategory = 'all' | 'Competition' | 'Hackathon' | 'Summer Program' | 'Internship' | 'Hiring Challenge';

/**
 * CatalogView - Opportunities Grid with Search & Filters
 * 
 * Props:
 * - initialData: Server-fetched opportunities array
 */
export function CatalogView({ initialData }: CatalogViewProps) {
    const [search, setSearch] = useState('');
    const [modeFilter, setModeFilter] = useState<FilterMode>('all');
    const [costFilter, setCostFilter] = useState<FilterCost>('all');
    const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
    const [showFilters, setShowFilters] = useState(false);

    // Filter opportunities
    const filteredOpportunities = useMemo(() => {
        return initialData.filter((opp) => {
            // Search
            const searchLower = search.toLowerCase();
            const matchesSearch =
                search === '' ||
                opp.title.toLowerCase().includes(searchLower) ||
                opp.organization.toLowerCase().includes(searchLower) ||
                opp.description?.toLowerCase().includes(searchLower);

            // Mode filter
            const matchesMode = modeFilter === 'all' || opp.mode === modeFilter;

            // Cost filter
            const matchesCost =
                costFilter === 'all' ||
                (costFilter === 'Free' && !opp.isPaid) ||
                (costFilter === 'Paid' && opp.isPaid);

            // Category filter
            const matchesCategory =
                categoryFilter === 'all' ||
                opp.category.toLowerCase() === categoryFilter.toLowerCase();

            return matchesSearch && matchesMode && matchesCost && matchesCategory;
        });
    }, [initialData, search, modeFilter, costFilter, categoryFilter]);

    const clearFilters = () => {
        setSearch('');
        setModeFilter('all');
        setCostFilter('all');
        setCategoryFilter('all');
    };

    const hasActiveFilters = search || modeFilter !== 'all' || costFilter !== 'all' || categoryFilter !== 'all';

    return (
        <main className="min-h-screen bg-zinc-950 py-12">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-300 mb-4">
                        Explore Opportunities
                    </h1>
                    <p className="text-lg text-zinc-500 max-w-2xl">
                        Discover {initialData.length}+ curated opportunities from top organizations worldwide.
                    </p>
                </motion.div>

                {/* Search & Filter Bar */}
                <motion.div
                    className="mb-8 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {/* Search Input */}
                    <div className="relative">
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title, organization, or keyword..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Filter Toggle & Quick Filters */}
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${showFilters
                                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-600'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filters
                        </button>

                        {/* Results Count */}
                        <span className="text-zinc-500 text-sm">
                            {filteredOpportunities.length} of {initialData.length} opportunities
                        </span>

                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="ml-auto text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                            >
                                Clear all
                            </button>
                        )}
                    </div>

                    {/* Expanded Filters */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="grid sm:grid-cols-3 gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                                    {/* Mode Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Mode</label>
                                        <select
                                            value={modeFilter}
                                            onChange={(e) => setModeFilter(e.target.value as FilterMode)}
                                            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 focus:outline-none focus:border-cyan-500"
                                        >
                                            <option value="all">All Modes</option>
                                            <option value="Virtual">Virtual</option>
                                            <option value="Hybrid">Hybrid</option>
                                            <option value="On-site">On-site</option>
                                        </select>
                                    </div>

                                    {/* Cost Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Cost</label>
                                        <select
                                            value={costFilter}
                                            onChange={(e) => setCostFilter(e.target.value as FilterCost)}
                                            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 focus:outline-none focus:border-cyan-500"
                                        >
                                            <option value="all">All</option>
                                            <option value="Free">Free</option>
                                            <option value="Paid">Paid</option>
                                        </select>
                                    </div>

                                    {/* Category Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">Category</label>
                                        <select
                                            value={categoryFilter}
                                            onChange={(e) => setCategoryFilter(e.target.value as FilterCategory)}
                                            className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 focus:outline-none focus:border-cyan-500"
                                        >
                                            <option value="all">All Categories</option>
                                            <option value="Competition">Competition</option>
                                            <option value="Hackathon">Hackathon</option>
                                            <option value="Summer Program">Summer Program</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Hiring Challenge">Hiring Challenge</option>
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Results Grid */}
                {filteredOpportunities.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        layout
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredOpportunities.map((opp, index) => (
                                <motion.div
                                    key={opp.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.03 } }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                >
                                    <OpportunityCard opportunity={opp} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    /* Empty State */
                    <motion.div
                        className="flex flex-col items-center justify-center py-20 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-300 mb-2">No opportunities found</h3>
                        <p className="text-zinc-500 max-w-md mb-6">
                            Try adjusting your search or filters to discover more opportunities.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
