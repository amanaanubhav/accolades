/**
 * Navbar Component
 * 
 * Floating glassmorphic navigation bar with metallic styling.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Navbar Component
 * 
 * Features:
 * - Glassmorphic floating design
 * - Hide on scroll down, show on scroll up
 * - Metallic border and glow effects
 */
export function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.header
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <nav
                        className={cn(
                            'flex items-center justify-between px-6 py-3',
                            'glass metallic-border rounded-2xl',
                            'shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                        )}
                    >
                        {/* Logo */}
                        <a href="/" className="flex items-center gap-2 group">
                            {/* CSS-only logo */}
                            <div className="relative w-8 h-8">
                                <div
                                    className="absolute inset-0 rounded-lg rotate-45 transition-transform group-hover:rotate-[60deg]"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-magenta))',
                                    }}
                                />
                                <span className="absolute inset-0 flex items-center justify-center text-[var(--color-void)] font-bold text-sm">
                                    O
                                </span>
                            </div>
                            <span className="text-xl font-bold text-gradient-chrome">
                                Opp-Portal
                            </span>
                        </a>

                        {/* Navigation links */}
                        <div className="hidden md:flex items-center gap-6">
                            <NavLink href="/" active>Home</NavLink>
                            <NavLink href="/opportunities">Explore</NavLink>
                            <NavLink href="#">About</NavLink>
                        </div>

                        {/* CTA */}
                        <a
                            href="#"
                            className={cn(
                                'px-4 py-2 rounded-lg text-sm font-medium',
                                'bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-magenta)]',
                                'text-[var(--color-void)]',
                                'transition-all duration-300',
                                'hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]'
                            )}
                        >
                            Submit Opportunity
                        </a>
                    </nav>
                </motion.header>
            )}
        </AnimatePresence>
    );
}

/**
 * Navigation link component
 */
function NavLink({
    href,
    children,
    active = false,
}: {
    href: string;
    children: React.ReactNode;
    active?: boolean;
}) {
    return (
        <a
            href={href}
            className={cn(
                'text-sm font-medium transition-colors',
                active
                    ? 'text-[var(--color-platinum)]'
                    : 'text-[var(--color-silver)] hover:text-[var(--color-platinum)]'
            )}
        >
            {children}
        </a>
    );
}
