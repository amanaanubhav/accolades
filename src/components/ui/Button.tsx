/**
 * Button Component
 * 
 * Polished metallic button with hydraulic press animation.
 * Styled like a physical machine switch.
 */

'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

/**
 * Metallic Button Component
 * 
 * Features:
 * - Chrome gradient background
 * - Hydraulic press animation on click
 * - Multiple variants and sizes
 * - Loading state with spinner
 */
export function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    className,
    disabled,
    ...props
}: ButtonProps) {
    const isDisabled = disabled || loading;

    const variantStyles: Record<ButtonVariant, string> = {
        primary: `
      bg-gradient-to-b from-[var(--color-chrome)] to-[var(--color-gunmetal)]
      text-[var(--color-platinum)]
      border border-[var(--color-silver)]/30
      shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.4)]
      hover:from-[var(--color-silver)]/30 hover:to-[var(--color-chrome)]
      hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_20px_rgba(0,245,255,0.3)]
      hover:border-[var(--color-neon-cyan)]/50
    `,
        secondary: `
      bg-[var(--color-gunmetal)]
      text-[var(--color-silver)]
      border border-[var(--color-chrome)]
      hover:bg-[var(--color-chrome)]
      hover:text-[var(--color-platinum)]
      hover:border-[var(--color-silver)]/50
    `,
        ghost: `
      bg-transparent
      text-[var(--color-silver)]
      hover:bg-[var(--color-gunmetal)]
      hover:text-[var(--color-platinum)]
    `,
        danger: `
      bg-gradient-to-b from-[#4a1a1a] to-[#2a0a0a]
      text-[var(--color-neon-red)]
      border border-[var(--color-neon-red)]/30
      hover:border-[var(--color-neon-red)]/60
      hover:shadow-[0_0_20px_rgba(255,59,48,0.3)]
    `,
    };

    const sizeStyles: Record<ButtonSize, string> = {
        sm: 'px-3 py-1.5 text-sm rounded-md',
        md: 'px-5 py-2.5 text-sm rounded-lg',
        lg: 'px-6 py-3 text-base rounded-xl',
    };

    return (
        <motion.button
            className={cn(
                'relative inline-flex items-center justify-center gap-2',
                'font-medium tracking-wide',
                'transition-all duration-200',
                'focus-ring',
                variantStyles[variant],
                sizeStyles[size],
                fullWidth && 'w-full',
                isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
                className
            )}
            disabled={isDisabled}
            whileHover={!isDisabled ? { y: -2, scale: 1.02 } : undefined}
            whileTap={!isDisabled ? { y: 1, scale: 0.98 } : undefined}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            {...props}
        >
            {/* Metallic shine overlay */}
            <span className="absolute inset-0 rounded-inherit overflow-hidden pointer-events-none">
                <span className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50" />
            </span>

            {/* Content */}
            <span className="relative flex items-center gap-2">
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {leftIcon}
                        {children}
                        {rightIcon}
                    </>
                )}
            </span>
        </motion.button>
    );
}

/**
 * Loading spinner component
 */
function LoadingSpinner() {
    return (
        <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
}

/**
 * Icon Button variant for compact icon-only buttons
 */
export function IconButton({
    children,
    className,
    size = 'md',
    ...props
}: Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'loading'>) {
    const sizeStyles: Record<ButtonSize, string> = {
        sm: 'p-1.5',
        md: 'p-2',
        lg: 'p-3',
    };

    return (
        <Button
            className={cn(sizeStyles[size], className)}
            size={size}
            {...props}
        >
            {children}
        </Button>
    );
}
