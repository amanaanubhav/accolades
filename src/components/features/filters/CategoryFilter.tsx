/**
 * CategoryFilter Component
 * 
 * Toggle buttons for filtering opportunities by category.
 * Synced with URL search parameters for shareable links.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { OpportunityCategory } from '@/types';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
    selected: OpportunityCategory | 'all';
    onChange: (category: OpportunityCategory | 'all') => void;
    className?: string;
}

/**
 * Category Filter Component
 * 
 * Features:
 * - "All" option plus individual categories
 * - Color-coded buttons matching category accents
 * - Active state with glow effect
 * - Framer Motion layout animations
 */
export function CategoryFilter({ selected, onChange, className }: CategoryFilterProps) {
    return (
        <div className={cn('flex flex-wrap gap-2', className)}>
            {/* All filter option */}
            <FilterButton
                isActive={selected === 'all'}
                onClick={() => onChange('all')}
                color="var(--color-platinum)"
            >
                All
            </FilterButton>

            {/* Category filters */}
            {CATEGORIES.map((category) => (
                <FilterButton
                    key={category.id}
                    isActive={selected === category.id}
                    onClick={() => onChange(category.id)}
                    color={category.color}
                >
                    {category.label}
                </FilterButton>
            ))}
        </div>
    );
}

/**
 * Individual filter button component
 */
function FilterButton({
    children,
    isActive,
    onClick,
    color,
}: {
    children: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
    color: string;
}) {
    return (
        <motion.button
            onClick={onClick}
            className={cn(
                'relative px-4 py-2 rounded-lg text-sm font-medium',
                'transition-all duration-200',
                'focus-ring',
                isActive
                    ? 'text-[var(--color-void)]'
                    : 'bg-[var(--color-gunmetal)] text-[var(--color-silver)] hover:text-[var(--color-platinum)]'
            )}
            style={{
                backgroundColor: isActive ? color : undefined,
                boxShadow: isActive ? `0 0 20px ${color}40` : undefined,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
            {/* Active indicator */}
            {isActive && (
                <motion.span
                    className="absolute inset-0 rounded-lg"
                    layoutId="activeFilter"
                    style={{ backgroundColor: color }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
            )}

            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}

/**
 * Quick filter chips for common searches
 */
export function QuickFilters({
    onSearch,
    className,
}: {
    onSearch: (query: string) => void;
    className?: string;
}) {
    const quickFilters = ['Remote', 'Paid', 'AI/ML', 'Web3', 'Open Source'];

    return (
        <div className={cn('flex flex-wrap gap-2', className)}>
            <span className="text-xs text-[var(--color-silver)] self-center mr-1">Quick:</span>
            {quickFilters.map((filter) => (
                <button
                    key={filter}
                    onClick={() => onSearch(filter)}
                    className="px-3 py-1 text-xs rounded-full bg-[var(--color-chrome)] text-[var(--color-silver)] hover:bg-[var(--color-steel)] hover:text-[var(--color-platinum)] transition-colors"
                >
                    {filter}
                </button>
            ))}
        </div>
    );
}
