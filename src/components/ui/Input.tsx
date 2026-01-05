/**
 * Input Component
 * 
 * Metallic-bordered search input with focus glow effect.
 * Styled for the futuristic aesthetic.
 */

'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    error?: string;
}

/**
 * Input Component
 * 
 * Features:
 * - Metallic border with gradient effect
 * - Cyan glow on focus
 * - Support for left/right icons
 * - Error state styling
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, leftIcon, rightIcon, error, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <div
                    className={cn(
                        'relative flex items-center rounded-xl overflow-hidden',
                        'bg-[var(--color-gunmetal)] metallic-border',
                        'transition-all duration-300',
                        'focus-within:shadow-[0_0_20px_rgba(0,245,255,0.2)]',
                        error && 'border-[var(--color-neon-red)]/50',
                        className
                    )}
                >
                    {/* Left icon */}
                    {leftIcon && (
                        <span className="pl-4 text-[var(--color-silver)]">
                            {leftIcon}
                        </span>
                    )}

                    {/* Input field */}
                    <input
                        ref={ref}
                        className={cn(
                            'flex-1 bg-transparent px-4 py-3',
                            'text-[var(--color-platinum)] placeholder:text-[var(--color-silver)]/50',
                            'focus:outline-none',
                            leftIcon && 'pl-2',
                            rightIcon && 'pr-2'
                        )}
                        {...props}
                    />

                    {/* Right icon */}
                    {rightIcon && (
                        <span className="pr-4 text-[var(--color-silver)]">
                            {rightIcon}
                        </span>
                    )}
                </div>

                {/* Error message */}
                {error && (
                    <p className="mt-1.5 text-sm text-[var(--color-neon-red)]">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

/**
 * Search Input - pre-styled for search functionality
 */
export function SearchInput({
    value,
    onChange,
    placeholder = 'Search opportunities...',
    className,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}) {
    return (
        <Input
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={className}
            leftIcon={
                <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            }
            rightIcon={
                value && (
                    <button
                        onClick={() => onChange('')}
                        className="p-1 rounded-full hover:bg-[var(--color-chrome)] transition-colors"
                        aria-label="Clear search"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )
            }
        />
    );
}
