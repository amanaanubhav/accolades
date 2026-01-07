'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Opportunity } from '@/types';

interface HeroCarouselProps {
    featured: Opportunity[];
}

export function HeroCarousel({ featured }: HeroCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-rotate every 6 seconds
    useEffect(() => {
        if (featured.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % featured.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [featured.length]);

    if (!featured.length) return null;

    const heroItem = featured[currentIndex];

    const goTo = (index: number) => setCurrentIndex(index);
    const prev = () => setCurrentIndex((i) => (i === 0 ? featured.length - 1 : i - 1));
    const next = () => setCurrentIndex((i) => (i + 1) % featured.length);

    return (
        <section className="px-6 mb-12">
            <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 group hover:border-zinc-700 transition-all">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-2/3 h-full bg-blue-600/10 blur-3xl -z-10" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={heroItem.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center"
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                                <Sparkles size={12} /> Featured Opportunity
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                                {heroItem.title}
                            </h1>

                            <p className="text-zinc-400 text-lg line-clamp-2">
                                {heroItem.brief_overview}
                            </p>

                            <div className="flex items-center gap-6 text-sm font-medium text-zinc-500">
                                <span className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    {new Date(heroItem.end_date).toLocaleDateString()}
                                </span>
                                <span className="bg-zinc-800 text-zinc-300 px-2 py-1 rounded text-xs uppercase tracking-wider">
                                    {heroItem.mode}
                                </span>
                            </div>

                            <div className="pt-4">
                                <Link
                                    href={`/opportunities/${heroItem.slug || heroItem.id}`}
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
                                >
                                    View Details <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>

                        {/* Visual / Image Side */}
                        <div className="relative h-64 md:h-full min-h-[300px] rounded-2xl overflow-hidden bg-zinc-800/50 flex items-center justify-center border border-white/5">
                            {heroItem.banner_url ? (
                                <img
                                    src={heroItem.banner_url}
                                    alt={heroItem.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="text-zinc-700 font-black text-6xl uppercase tracking-tighter opacity-20">
                                    {heroItem.category}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-l" />
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                {featured.length > 1 && (
                    <>
                        {/* Arrows */}
                        <button
                            onClick={prev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-zinc-900/80 backdrop-blur rounded-full text-zinc-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-zinc-900/80 backdrop-blur rounded-full text-zinc-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <ChevronRight size={20} />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            {featured.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-blue-400 w-6' : 'bg-zinc-600 hover:bg-zinc-500'}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
