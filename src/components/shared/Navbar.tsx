'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Compass, Sparkles, ChevronRight } from 'lucide-react';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'About', href: '/about' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

    const pathname = usePathname();
    const { scrollY } = useScroll();

    // Scroll Logic: Hide on scroll down, show on scroll up
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
            setIsOpen(false);
        } else {
            setHidden(false);
        }
    });

    // Navbar is now shown on ALL pages for consistency

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -100, opacity: 0 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-4 inset-x-0 z-50 mx-auto w-[95%] max-w-4xl"
            >
                <div className="relative flex items-center justify-between px-4 py-2.5 rounded-2xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-2xl shadow-2xl shadow-black/30">

                    {/* Subtle gradient border effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-2.5 group relative z-10">
                        <div className="relative flex items-center justify-center w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl overflow-hidden group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-shadow">
                            <Compass className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-black tracking-tight text-lg text-white">
                            ACCOLADES
                        </span>
                    </Link>

                    {/* DESKTOP LINKS */}
                    <nav className="hidden md:flex items-center gap-1 relative z-10">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative px-4 py-2 text-sm font-medium transition-colors"
                                    onMouseEnter={() => setHoveredPath(link.href)}
                                    onMouseLeave={() => setHoveredPath(null)}
                                >
                                    <span className={`relative z-10 transition-colors ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`}>
                                        {link.name}
                                    </span>

                                    {/* Hover Background */}
                                    {hoveredPath === link.href && (
                                        <motion.div
                                            layoutId="navbar-hover"
                                            className="absolute inset-0 bg-white/[0.08] rounded-lg"
                                            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                        />
                                    )}

                                    {/* Active Indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-active"
                                            className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* CTA & MOBILE TOGGLE */}
                    <div className="flex items-center gap-3 relative z-10">
                        <Link
                            href="/submit"
                            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all active:scale-95"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Submit</span>
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                        >
                            {isOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="fixed top-20 inset-x-4 z-50 p-5 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl md:hidden"
                        >
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center justify-between p-4 rounded-xl transition-all ${isActive
                                                ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-white/10'
                                                : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                                                }`}
                                        >
                                            <span className="text-base font-semibold">{link.name}</span>
                                            <ChevronRight size={18} className="text-zinc-600" />
                                        </Link>
                                    );
                                })}

                                <div className="h-px bg-zinc-800 my-3" />

                                <Link
                                    href="/submit"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Submit Opportunity
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
