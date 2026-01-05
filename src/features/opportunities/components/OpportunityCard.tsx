'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Opportunity } from '@/types';

interface OpportunityCardProps {
    opportunity: Opportunity;
}

/**
 * OpportunityCard - Grid card for opportunities
 */
export function OpportunityCard({ opportunity }: OpportunityCardProps) {
    const {
        id,
        title,
        organization,
        category,
        deadline,
        description,
        location,
        isPaid,
        mode,
    } = opportunity;

    // Calculate days remaining
    const daysRemaining = deadline
        ? Math.max(0, Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
        : null;

    // Urgency color
    const getUrgencyColor = () => {
        if (daysRemaining === null) return 'text-zinc-400 bg-zinc-800';
        if (daysRemaining <= 7) return 'text-red-400 bg-red-500/20';
        if (daysRemaining <= 30) return 'text-amber-400 bg-amber-500/20';
        return 'text-green-400 bg-green-500/20';
    };

    // Category color
    const getCategoryColor = () => {
        const cat = category?.toLowerCase() || '';
        if (cat.includes('hackathon')) return 'text-cyan-400 bg-cyan-500/20';
        if (cat.includes('internship')) return 'text-purple-400 bg-purple-500/20';
        if (cat.includes('competition')) return 'text-amber-400 bg-amber-500/20';
        if (cat.includes('summer')) return 'text-emerald-400 bg-emerald-500/20';
        return 'text-zinc-400 bg-zinc-700';
    };

    return (
        <motion.div
            className="group relative rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-colors h-full flex flex-col"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
        >
            {/* Category Accent */}
            <div
                className="absolute top-0 left-0 w-1 h-full"
                style={{
                    background: category?.toLowerCase().includes('hackathon')
                        ? 'linear-gradient(180deg, #00f5ff 0%, #00d4ff 100%)'
                        : category?.toLowerCase().includes('internship')
                            ? 'linear-gradient(180deg, #a855f7 0%, #7c3aed 100%)'
                            : category?.toLowerCase().includes('competition')
                                ? 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)'
                                : 'linear-gradient(180deg, #10b981 0%, #059669 100%)',
                }}
            />

            <div className="p-5 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getCategoryColor()} mb-2`}>
                            {category}
                        </span>
                        <h3 className="text-lg font-semibold text-zinc-100 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                            {title}
                        </h3>
                    </div>
                    {daysRemaining !== null && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-lg whitespace-nowrap ${getUrgencyColor()}`}>
                            {daysRemaining}d
                        </span>
                    )}
                </div>

                {/* Organization */}
                <p className="text-sm text-zinc-500 mb-3 truncate">
                    {organization}
                </p>

                {/* Description */}
                <p className="text-sm text-zinc-400 line-clamp-2 mb-4 flex-grow">
                    {description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {mode && (
                        <span className="px-2 py-1 text-xs bg-zinc-800 text-zinc-400 rounded-md">
                            {mode}
                        </span>
                    )}
                    {location && (
                        <span className="px-2 py-1 text-xs bg-zinc-800 text-zinc-400 rounded-md truncate max-w-[120px]">
                            {location}
                        </span>
                    )}
                    {isPaid && (
                        <span className="px-2 py-1 text-xs bg-amber-500/20 text-amber-400 rounded-md">
                            Paid
                        </span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                    <Link
                        href={`/opportunities/${id}`}
                        className="text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
                    >
                        View Details →
                    </Link>
                    <Link
                        href={`/opportunities/${id}`}
                        className="px-4 py-2 text-sm font-medium rounded-lg bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors"
                    >
                        Apply
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
