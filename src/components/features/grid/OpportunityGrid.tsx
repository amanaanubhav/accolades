/**
 * OpportunityGrid Component
 * 
 * Responsive grid layout for opportunity cards.
 * Uses Framer Motion for smooth layout animations.
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Opportunity } from '@/types';
import { OpportunityCard } from '@/components/features/card/OpportunityCard';
import { cn } from '@/lib/utils';

interface OpportunityGridProps {
    opportunities: Opportunity[];
    isLoading?: boolean;
    className?: string;
}

/**
 * Opportunity Grid Component
 * 
 * Features:
 * - Responsive grid (1-3 columns)
 * - AnimatePresence for enter/exit animations
 * - Empty state handling
 * - Staggered card animations
 */
export function OpportunityGrid({
    opportunities,
    isLoading = false,
    className,
}: OpportunityGridProps) {
    if (isLoading) {
        return <GridSkeleton />;
    }

    if (opportunities.length === 0) {
        return <EmptyState />;
    }

    return (
        <motion.div
            className={cn(
                'grid gap-6',
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
                className
            )}
            layout
        >
            <AnimatePresence mode="popLayout">
                {opportunities.map((opportunity, index) => (
                    <motion.div
                        key={opportunity.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: index * 0.05 }
                        }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <OpportunityCard opportunity={opportunity} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
}

/**
 * Grid skeleton for loading state
 */
function GridSkeleton() {
    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="rounded-xl p-6 glass metallic-border"
                >
                    {/* Header skeleton */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg shimmer" />
                            <div className="space-y-2">
                                <div className="w-20 h-3 rounded shimmer" />
                                <div className="w-32 h-5 rounded shimmer" />
                            </div>
                        </div>
                        <div className="w-16 h-5 rounded-full shimmer" />
                    </div>

                    {/* Content skeleton */}
                    <div className="space-y-2 mb-4">
                        <div className="w-full h-4 rounded shimmer" />
                        <div className="w-3/4 h-4 rounded shimmer" />
                    </div>

                    {/* Tags skeleton */}
                    <div className="flex gap-2 mb-4">
                        <div className="w-20 h-5 rounded-full shimmer" />
                        <div className="w-16 h-5 rounded-full shimmer" />
                        <div className="w-12 h-5 rounded-full shimmer" />
                    </div>

                    {/* Footer skeleton */}
                    <div className="flex justify-between items-center pt-4 border-t border-[var(--color-chrome)]">
                        <div className="w-24 h-4 rounded shimmer" />
                        <div className="w-20 h-8 rounded-lg shimmer" />
                    </div>
                </div>
            ))}
        </div>
    );
}

/**
 * Empty state when no opportunities match filters
 */
function EmptyState() {
    return (
        <motion.div
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Empty state icon */}
            <div className="w-24 h-24 rounded-full bg-[var(--color-gunmetal)] flex items-center justify-center mb-6">
                <svg
                    className="w-12 h-12 text-[var(--color-silver)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>

            <h3 className="text-xl font-semibold text-[var(--color-platinum)] mb-2">
                No opportunities found
            </h3>
            <p className="text-[var(--color-silver)] max-w-md">
                Try adjusting your filters or search query to discover more opportunities.
            </p>
        </motion.div>
    );
}
