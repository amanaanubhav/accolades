'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Cpu, Sparkles } from 'lucide-react';

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

    // 1. Scroll Logic: Hide on scroll down, show on scroll up
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
            setIsOpen(false); // Close mobile menu if scrolling
        } else {
            setHidden(false);
        }
    });

    // Hide on /explore routes (they have their own header)
    if (pathname.startsWith('/explore')) {
        return null;
    }

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -100, opacity: 0 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-6 inset-x-0 z-50 mx-auto w-[95%] max-w-5xl"
            >
                <div className="relative flex items-center justify-between px-6 py-3 rounded-full bg-black/60 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/50">

                    {/* LOGO: Metallic & Animated */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-zinc-800 to-black border border-white/10 rounded-xl overflow-hidden group-hover:border-white/30 transition-colors">
                            <Cpu className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors relative z-10" />
                            {/* Spinning glow effect behind logo */}
                            <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <span className="font-black tracking-tighter text-xl bg-gradient-to-r from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent group-hover:to-white transition-all">
                            ACCOLADES
                        </span>
                    </Link>

                    {/* DESKTOP LINKS: Liquid Motion */}
                    <nav className="hidden md:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative px-4 py-2 text-sm font-medium transition-colors"
                                onMouseEnter={() => setHoveredPath(link.href)}
                                onMouseLeave={() => setHoveredPath(null)}
                            >
                                <span className={`relative z-10 ${pathname === link.href ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                                    {link.name}
                                </span>

                                {/* The "Flow" Animation: Background Slide */}
                                {hoveredPath === link.href && (
                                    <motion.div
                                        layoutId="navbar-hover"
                                        className="absolute inset-0 bg-zinc-800/80 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}

                                {/* Active Indicator Dot */}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="navbar-active"
                                        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                                    />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* ACTION & MOBILE TOGGLE */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/submit"
                            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all active:scale-95"
                        >
                            <Sparkles className="w-4 h-4 fill-black" />
                            <span>Submit</span>
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-24 inset-x-4 z-40 p-6 bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl md:hidden"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-lg font-bold p-4 rounded-xl border border-transparent transition-all ${pathname === link.href
                                        ? 'bg-zinc-800 text-white border-zinc-700'
                                        : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-zinc-800 my-2" />
                            <Link
                                href="/submit"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-bold rounded-xl"
                            >
                                Submit Opportunity <Sparkles className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
