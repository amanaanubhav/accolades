'use client';

import { OpportunityCard } from './components/OpportunityCard';
import { Opportunity } from '@/types';
import { Filter, SlidersHorizontal, MapPin, Clock, DollarSign, Users, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CategoryFeedProps {
    category: string;
    initialData: Opportunity[];
}

// Category-specific filter configurations
const categoryFilters: Record<string, { label: string; options: string[] }[]> = {
    hackathons: [
        { label: 'Mode', options: ['Virtual', 'On-site', 'Hybrid'] },
        { label: 'Team Size', options: ['Solo', '2-4 Members', '5+ Members'] },
        { label: 'Duration', options: ['1 Day', 'Weekend', '1 Week+'] },
    ],
    internships: [
        { label: 'Type', options: ['Summer', 'Fall', 'Spring', 'Year-round'] },
        { label: 'Compensation', options: ['Paid', 'Unpaid', 'Stipend'] },
        { label: 'Location', options: ['Remote', 'On-site', 'Hybrid'] },
    ],
    research: [
        { label: 'Field', options: ['AI/ML', 'Systems', 'HCI', 'Other'] },
        { label: 'Duration', options: ['2-3 Months', '6 Months', '1 Year+'] },
        { label: 'Funding', options: ['Funded', 'Unfunded'] },
    ],
    challenges: [
        { label: 'Type', options: ['Algorithmic', 'CTF', 'Design', 'Open-ended'] },
        { label: 'Difficulty', options: ['Beginner', 'Intermediate', 'Advanced'] },
        { label: 'Format', options: ['Individual', 'Team'] },
    ],
};

export default function CategoryFeed({ category, initialData }: CategoryFeedProps) {
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

    const filters = categoryFilters[category.toLowerCase()] || categoryFilters.hackathons;

    const toggleFilter = (label: string, option: string) => {
        setSelectedFilters(prev => {
            const current = prev[label] || [];
            if (current.includes(option)) {
                return { ...prev, [label]: current.filter(o => o !== option) };
            }
            return { ...prev, [label]: [...current, option] };
        });
    };

    const clearFilters = () => setSelectedFilters({});

    const activeFilterCount = Object.values(selectedFilters).flat().length;

    // Filter sidebar component
    const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
        <div className={`${isMobile ? 'p-6' : 'p-6 h-full'} space-y-8`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs">
                    <SlidersHorizontal size={14} /> Filters
                    {activeFilterCount > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-blue-500 text-white text-[10px] rounded-full">
                            {activeFilterCount}
                        </span>
                    )}
                </div>
                {activeFilterCount > 0 && (
                    <button onClick={clearFilters} className="text-xs text-zinc-500 hover:text-white">
                        Clear all
                    </button>
                )}
            </div>

            {filters.map((filterGroup) => (
                <div key={filterGroup.label}>
                    <h3 className="text-zinc-500 text-xs font-bold uppercase mb-3">{filterGroup.label}</h3>
                    <div className="space-y-2">
                        {filterGroup.options.map(option => {
                            const isSelected = (selectedFilters[filterGroup.label] || []).includes(option);
                            return (
                                <label
                                    key={option}
                                    className={`flex items-center gap-2 text-sm cursor-pointer transition-colors ${isSelected ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => toggleFilter(filterGroup.label, option)}
                                        className="rounded border-zinc-700 bg-zinc-800 text-blue-500 focus:ring-blue-500/20"
                                    />
                                    {option}
                                </label>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-black">
            {/* Desktop Filter Sidebar */}
            <aside className="hidden md:block w-64 border-r border-white/5 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
                <FilterSidebar />
            </aside>

            {/* Mobile Filter Overlay */}
            <AnimatePresence>
                {mobileFilterOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur md:hidden"
                        onClick={() => setMobileFilterOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="absolute right-0 top-0 h-full w-80 bg-zinc-900 border-l border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-4 border-b border-white/5">
                                <span className="text-white font-bold">Filters</span>
                                <button onClick={() => setMobileFilterOpen(false)} className="p-2 text-zinc-400">
                                    <X size={20} />
                                </button>
                            </div>
                            <FilterSidebar isMobile />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                        onClick={() => setMobileFilterOpen(true)}
                        className="md:hidden flex items-center gap-2 px-4 py-2 text-zinc-400 border border-zinc-800 rounded-lg hover:border-zinc-700 hover:text-white transition-colors"
                    >
                        <Filter size={18} />
                        <span className="text-sm">Filters</span>
                        {activeFilterCount > 0 && (
                            <span className="px-1.5 py-0.5 bg-blue-500 text-white text-[10px] rounded-full">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {initialData.map((opp) => (
                        <OpportunityCard key={opp.id} opportunity={opp} />
                    ))}
                </div>

                {initialData.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 mb-6">
                            <Filter className="w-8 h-8 text-zinc-600" />
                        </div>
                        <p className="text-zinc-400 text-lg mb-2">No {category} found</p>
                        <p className="text-zinc-600 text-sm">Try adjusting your filters or check back later.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
