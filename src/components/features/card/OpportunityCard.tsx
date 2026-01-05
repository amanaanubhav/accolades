/**
 * OpportunityCard Component
 * 
 * Complete opportunity card assembly with metallic styling.
 * Displays organization, title, description, category, urgency, and apply button.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Opportunity } from '@/types';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CategoryBadge } from '@/components/ui/Badge';
import { UrgencyIndicator } from './UrgencyIndicator';
import { cn, truncateText, formatDate } from '@/lib/utils';
import { getCategoryMeta } from '@/lib/constants';

interface OpportunityCardProps {
    opportunity: Opportunity;
    className?: string;
}

/**
 * Opportunity Card Component
 * 
 * Features:
 * - Metallic glass card container
 * - Category-specific color accent (left border)
 * - Organization header with logo placeholder
 * - Title and description
 * - Tags display
 * - Urgency indicator
 * - Polished metallic "Apply" button
 */
export function OpportunityCard({ opportunity, className }: OpportunityCardProps) {
    // Safe destructuring with defaults
    const {
        id = '',
        title = 'Untitled Opportunity',
        organization = 'Unknown Organization',
        category = 'hackathon',
        deadline = new Date().toISOString(),
        description = '',
        url = '#',
        tags = [],
        location,
        isPaid
    } = opportunity || {};

    const categoryMeta = getCategoryMeta(category);

    // Glow color based on category
    const glowMap = {
        hackathon: 'cyan' as const,
        internship: 'gold' as const,
        challenge: 'magenta' as const,
    };

    return (
        <Card
            className={cn(
                'relative overflow-hidden group',
                className
            )}
            glow={glowMap[category]}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Category accent bar */}
            <div
                className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.5"
                style={{ backgroundColor: categoryMeta?.color || 'var(--color-silver)' }}
            />

            <CardHeader className="pl-4">
                {/* Top row: Organization + Badges */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                        {/* Organization icon placeholder (CSS-only) */}
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold"
                            style={{
                                background: `linear-gradient(135deg, ${categoryMeta?.bgColor || 'var(--color-chrome)'}, transparent)`,
                                border: `1px solid ${categoryMeta?.borderColor || 'var(--color-chrome)'}`,
                                color: categoryMeta?.color || 'var(--color-silver)',
                            }}
                        >
                            {(organization || "Unknown").slice(0, 2).toUpperCase()}
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs text-[var(--color-silver)] truncate">
                                {organization || "Unknown Organization"}
                            </p>
                            <h3 className="text-lg font-semibold text-[var(--color-platinum)] truncate">
                                {title}
                            </h3>
                        </div>
                    </div>

                    {/* Urgency indicator */}
                    <UrgencyIndicator deadline={deadline} />
                </div>
            </CardHeader>

            <CardContent className="pl-4">
                {/* Description */}
                <p className="text-sm text-[var(--color-silver)] mb-4 line-clamp-2">
                    {truncateText(description, 120)}
                </p>

                {/* Meta info row */}
                <div className="flex items-center gap-3 text-xs text-[var(--color-silver)] mb-4">
                    {location && (
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {location}
                        </span>
                    )}
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(deadline)}
                    </span>
                    {isPaid && (
                        <span className="flex items-center gap-1 text-[var(--color-neon-gold)]">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Paid
                        </span>
                    )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    <CategoryBadge category={category} />
                    {tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 text-xs rounded-full bg-[var(--color-chrome)] text-[var(--color-silver)]"
                        >
                            {tag}
                        </span>
                    ))}
                    {tags.length > 3 && (
                        <span className="px-2 py-0.5 text-xs text-[var(--color-silver)]/60">
                            +{tags.length - 3} more
                        </span>
                    )}
                </div>
            </CardContent>

            <CardFooter className="pl-4">
                <div className="flex items-center justify-between w-full">
                    {/* View details link */}
                    <a
                        href={`/opportunities/${id}`}
                        className="text-sm text-[var(--color-silver)] hover:text-[var(--color-platinum)] transition-colors"
                    >
                        View Details →
                    </a>

                    {/* Apply button - styled like a polished metal switch */}
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => window.open(url, '_blank')}
                        rightIcon={
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        }
                    >
                        Apply
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
