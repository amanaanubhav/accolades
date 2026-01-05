/**
 * Card Component
 * 
 * Metallic glass card with gradient border and hover effects.
 * Uses Framer Motion for smooth magnetic hover animations.
 */

'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLMotionProps<'div'> {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'elevated' | 'outlined';
    glow?: 'cyan' | 'gold' | 'magenta' | 'none';
    interactive?: boolean;
}

/**
 * Metallic Card Component
 * 
 * Features:
 * - Glassmorphic background with blur
 * - Gradient metallic border
 * - Magnetic hover effect via Framer Motion
 * - Optional glow effects
 */
export function Card({
    children,
    className,
    variant = 'default',
    glow = 'none',
    interactive = true,
    ...props
}: CardProps) {
    const variants = {
        default: 'glass metallic-border',
        elevated: 'glass metallic-border shadow-[0_8px_32px_rgba(0,0,0,0.5)]',
        outlined: 'bg-transparent border border-[var(--color-chrome)]',
    };

    const glowClasses = {
        none: '',
        cyan: 'hover:shadow-[0_0_30px_rgba(0,245,255,0.2)]',
        gold: 'hover:shadow-[0_0_30px_rgba(255,215,0,0.2)]',
        magenta: 'hover:shadow-[0_0_30px_rgba(255,0,255,0.2)]',
    };

    return (
        <motion.div
            className={cn(
                'rounded-xl p-6 transition-shadow duration-300',
                variants[variant],
                interactive && glowClasses[glow],
                className
            )}
            whileHover={
                interactive
                    ? {
                        y: -4,
                        transition: {
                            type: 'spring',
                            stiffness: 400,
                            damping: 20,
                        },
                    }
                    : undefined
            }
            whileTap={
                interactive
                    ? {
                        scale: 0.98,
                    }
                    : undefined
            }
            {...props}
        >
            {children}
        </motion.div>
    );
}

/**
 * Card Header component for consistent card layouts
 */
export function CardHeader({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('mb-4', className)}>
            {children}
        </div>
    );
}

/**
 * Card Content component
 */
export function CardContent({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('text-[var(--color-silver)]', className)}>
            {children}
        </div>
    );
}

/**
 * Card Footer component
 */
export function CardFooter({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('mt-4 pt-4 border-t border-[var(--color-chrome)]', className)}>
            {children}
        </div>
    );
}
