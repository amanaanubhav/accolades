/**
 * Badge Component
 * 
 * Solid color urgency tags with optional pulse animation.
 * High contrast color blocks for visual distinction.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'critical' | 'warning' | 'success' | 'hackathon' | 'internship' | 'challenge';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    pulse?: boolean;
    className?: string;
    size?: 'sm' | 'md';
}

/**
 * Badge styling configurations
 */
const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-[var(--color-chrome)] text-[var(--color-silver)] border-[var(--color-silver)]/30',
    critical: 'bg-[rgba(255,59,48,0.2)] text-[var(--color-neon-red)] border-[var(--color-neon-red)]/50',
    warning: 'bg-[rgba(255,149,0,0.2)] text-[var(--color-neon-amber)] border-[var(--color-neon-amber)]/50',
    success: 'bg-[rgba(48,209,88,0.2)] text-[var(--color-neon-green)] border-[var(--color-neon-green)]/50',
    hackathon: 'bg-[rgba(0,245,255,0.15)] text-[var(--color-neon-cyan)] border-[var(--color-neon-cyan)]/50',
    internship: 'bg-[rgba(255,215,0,0.15)] text-[var(--color-neon-gold)] border-[var(--color-neon-gold)]/50',
    challenge: 'bg-[rgba(255,0,255,0.15)] text-[var(--color-neon-magenta)] border-[var(--color-neon-magenta)]/50',
};

const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
};

/**
 * Badge Component
 * 
 * Features:
 * - Solid color blocks for high contrast
 * - Pulse animation for critical status
 * - Category-specific color schemes
 */
export function Badge({
    children,
    variant = 'default',
    pulse = false,
    className,
    size = 'sm',
}: BadgeProps) {
    return (
        <motion.span
            className={cn(
                'inline-flex items-center gap-1 rounded-full font-medium border',
                variantStyles[variant],
                sizeStyles[size],
                pulse && 'pulse-critical',
                className
            )}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        >
            {/* Pulse dot indicator for critical */}
            {pulse && (
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-neon-red)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-neon-red)]" />
                </span>
            )}
            {children}
        </motion.span>
    );
}

/**
 * Category Badge - specific styling for opportunity categories
 */
export function CategoryBadge({
    category,
    className,
}: {
    category: 'hackathon' | 'internship' | 'challenge';
    className?: string;
}) {
    const labels = {
        hackathon: 'Hackathon',
        internship: 'Internship',
        challenge: 'Challenge',
    };

    return (
        <Badge variant={category} className={className}>
            {labels[category]}
        </Badge>
    );
}

/**
 * Urgency Badge - displays deadline urgency status
 */
export function UrgencyBadge({
    status,
    daysRemaining,
    className,
}: {
    status: 'critical' | 'closing-soon' | 'open';
    daysRemaining: number;
    className?: string;
}) {
    const config = {
        critical: {
            variant: 'critical' as const,
            label: daysRemaining < 0 ? 'Expired' : `${daysRemaining}d left`,
            pulse: true,
        },
        'closing-soon': {
            variant: 'warning' as const,
            label: `${daysRemaining}d left`,
            pulse: false,
        },
        open: {
            variant: 'success' as const,
            label: `${daysRemaining}d left`,
            pulse: false,
        },
    };

    const { variant, label, pulse } = config[status];

    return (
        <Badge variant={variant} pulse={pulse} className={className}>
            {label}
        </Badge>
    );
}
