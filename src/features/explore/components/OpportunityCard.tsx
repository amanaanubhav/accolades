'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, MapPin, ExternalLink, Users, Sparkles, Clock, ArrowUpRight } from 'lucide-react';
import type { Opportunity } from '@/types';

interface OpportunityCardProps {
    opportunity: Opportunity;
    variant?: 'default' | 'compact';
}

/**
 * OpportunityCard - Premium glassmorphic card for opportunities
 */
export function OpportunityCard({ opportunity, variant = 'default' }: OpportunityCardProps) {
    const {
        id,
        title,
        organization,
        category,
        deadline,
        end_date,
        description,
        brief_overview,
        location,
        isPaid,
        mode,
        slug,
    } = opportunity;

    const displayDeadline = deadline || end_date;
    const displayDescription = description || brief_overview || '';

    // Calculate days remaining
    const daysRemaining = displayDeadline
        ? Math.max(0, Math.ceil((new Date(displayDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
        : null;

    // Urgency styling
    const getUrgencyStyles = () => {
        if (daysRemaining === null) return { text: 'text-zinc-400', bg: 'bg-zinc-800/50', label: 'Open' };
        if (daysRemaining <= 3) return { text: 'text-red-400', bg: 'bg-red-500/10', label: `${daysRemaining}d left`, pulse: true };
        if (daysRemaining <= 7) return { text: 'text-orange-400', bg: 'bg-orange-500/10', label: `${daysRemaining}d left` };
        if (daysRemaining <= 30) return { text: 'text-amber-400', bg: 'bg-amber-500/10', label: `${daysRemaining}d left` };
        return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', label: `${daysRemaining}d left` };
    };

    // Category styling
    const getCategoryStyles = () => {
        const cat = category?.toLowerCase() || '';
        if (cat.includes('hackathon')) return { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', glow: 'group-hover:shadow-cyan-500/20' };
        if (cat.includes('internship')) return { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', glow: 'group-hover:shadow-purple-500/20' };
        if (cat.includes('research')) return { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', glow: 'group-hover:shadow-blue-500/20' };
        if (cat.includes('challenge')) return { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', glow: 'group-hover:shadow-amber-500/20' };
        return { text: 'text-zinc-400', bg: 'bg-zinc-700/50', border: 'border-zinc-600/20', glow: 'group-hover:shadow-white/10' };
    };

    const urgency = getUrgencyStyles();
    const categoryStyle = getCategoryStyles();
    const linkHref = `/explore/opportunity/${slug || id}`;

    return (
        <motion.article
            className={`group relative rounded-2xl bg-gradient-to-b from-zinc-900/80 to-zinc-950 border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-300 h-full flex flex-col ${categoryStyle.glow} hover:shadow-xl`}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
        >
            {/* Glowing accent line */}
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${categoryStyle.text.replace('text-', 'via-')}/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

            {/* Category Badge - Floating */}
            <div className="absolute top-4 right-4 z-10">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border} border backdrop-blur-sm`}>
                    {category}
                </span>
            </div>

            <div className="p-5 flex flex-col h-full">
                {/* Header */}
                <div className="mb-4">
                    {/* Organization */}
                    <p className="text-xs font-medium text-zinc-500 mb-2 truncate uppercase tracking-wider">
                        {organization}
                    </p>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
                        {title}
                    </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-500 line-clamp-2 mb-4 flex-grow leading-relaxed">
                    {displayDescription}
                </p>

                {/* Meta Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    {/* Urgency Badge */}
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-lg ${urgency.bg} ${urgency.text}`}>
                        <Clock size={12} className={urgency.pulse ? 'animate-pulse' : ''} />
                        {urgency.label}
                    </span>

                    {/* Mode */}
                    {mode && (
                        <span className="px-2 py-1 text-xs bg-zinc-800/80 text-zinc-400 rounded-lg border border-zinc-700/50">
                            {mode}
                        </span>
                    )}

                    {/* Location */}
                    {location && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-zinc-800/80 text-zinc-400 rounded-lg border border-zinc-700/50 max-w-[120px] truncate">
                            <MapPin size={10} />
                            {location}
                        </span>
                    )}

                    {/* Paid Badge */}
                    {isPaid && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                            <Sparkles size={10} />
                            Paid
                        </span>
                    )}
                </div>

                {/* Deadline */}
                {displayDeadline && (
                    <div className="flex items-center gap-2 text-xs text-zinc-600 mb-4">
                        <Calendar size={12} />
                        <span>Deadline: {new Date(displayDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                )}

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800/50 mt-auto">
                    <Link
                        href={linkHref}
                        className="text-sm text-zinc-500 hover:text-white transition-colors group/link"
                    >
                        <span className="flex items-center gap-1">
                            View Details
                            <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </span>
                    </Link>

                    <Link
                        href={linkHref}
                        className="px-4 py-2 text-sm font-semibold rounded-lg bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-200"
                    >
                        Apply
                    </Link>
                </div>
            </div>

            {/* Hover glow overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl ${categoryStyle.bg}`} />
            </div>
        </motion.article>
    );
}
