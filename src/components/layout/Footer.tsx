/**
 * Footer Component
 * 
 * Minimal metallic footer with essential links.
 */

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Footer Component
 * 
 * Features:
 * - Metallic border top
 * - Gradient text branding
 * - Minimal essential links
 */
export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={cn(
                'relative mt-20 py-12',
                'border-t border-[var(--color-chrome)]',
                'bg-[var(--color-void)]'
            )}
        >
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Branding */}
                    <div className="flex items-center gap-2">
                        <div className="relative w-6 h-6">
                            <div
                                className="absolute inset-0 rounded rotate-45"
                                style={{
                                    background: 'linear-gradient(135deg, var(--color-neon-cyan), var(--color-neon-magenta))',
                                }}
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-[var(--color-void)] font-bold text-xs">
                                O
                            </span>
                        </div>
                        <span className="text-lg font-bold text-gradient-chrome">
                            Opp-Portal
                        </span>
                    </div>

                    {/* Links */}
                    <nav className="flex items-center gap-6 text-sm">
                        <FooterLink href="#">Privacy</FooterLink>
                        <FooterLink href="#">Terms</FooterLink>
                        <FooterLink href="#">Contact</FooterLink>
                        <FooterLink href="https://github.com" external>
                            GitHub
                        </FooterLink>
                    </nav>

                    {/* Copyright */}
                    <p className="text-sm text-[var(--color-silver)]">
                        © {currentYear} Opp-Portal. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

/**
 * Footer link component
 */
function FooterLink({
    href,
    children,
    external = false,
}: {
    href: string;
    children: React.ReactNode;
    external?: boolean;
}) {
    return (
        <a
            href={href}
            className="text-[var(--color-silver)] hover:text-[var(--color-platinum)] transition-colors"
            {...(external && {
                target: '_blank',
                rel: 'noopener noreferrer',
            })}
        >
            {children}
        </a>
    );
}
