'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * HomePage - Main Landing UI
 * 
 * Features:
 * - Metallic Hero Section with gradient text
 * - "Explore Opportunities" CTA
 * - "How it Works" section
 */
export default function HomePage() {
    return (
        <main className="min-h-screen bg-zinc-950">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Gradient */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `
                            radial-gradient(ellipse at 30% 20%, rgba(0, 245, 255, 0.08) 0%, transparent 50%),
                            radial-gradient(ellipse at 70% 80%, rgba(255, 0, 255, 0.06) 0%, transparent 50%),
                            radial-gradient(ellipse at 50% 50%, rgba(255, 215, 0, 0.04) 0%, transparent 60%)
                        `,
                    }}
                />

                {/* Metallic Grid Lines */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                    }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700/50 bg-zinc-900/50 backdrop-blur-sm mb-8"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                            </span>
                            <span className="text-sm text-zinc-400">
                                Curated opportunities for ambitious students
                            </span>
                        </motion.div>

                        {/* Main Heading */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-300">
                                Unlock Your
                            </span>
                            <span
                                className="block text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: 'linear-gradient(135deg, #00f5ff 0%, #ff00ff 50%, #ffd700 100%)',
                                }}
                            >
                                Potential
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Discover world-class hackathons, internships, research programs, and competitions.
                            All in one place, curated for ambitious minds.
                        </p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <Link
                                href="/opportunities"
                                className="group relative px-8 py-4 rounded-xl font-semibold text-zinc-900 overflow-hidden transition-transform hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, #00f5ff 0%, #00d4ff 100%)',
                                    boxShadow: '0 0 40px rgba(0, 245, 255, 0.3)',
                                }}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Explore Opportunities
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </Link>

                            <Link
                                href="/about"
                                className="px-8 py-4 rounded-xl font-semibold text-zinc-300 border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/50 transition-all"
                            >
                                Learn More
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1, duration: 2, repeat: Infinity }}
                >
                    <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </section>

            {/* How it Works Section */}
            <section className="py-24 bg-zinc-900/50">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-400 mb-4">
                            How It Works
                        </h2>
                        <p className="text-zinc-500 max-w-xl mx-auto">
                            Three simple steps to discover your next big opportunity
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                step: '01',
                                title: 'Browse',
                                description: 'Explore curated opportunities from top organizations like MIT, Google, and Stanford.',
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                ),
                            },
                            {
                                step: '02',
                                title: 'Filter',
                                description: 'Use smart filters to find hackathons, internships, or research programs that match your goals.',
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                ),
                            },
                            {
                                step: '03',
                                title: 'Apply',
                                description: 'Click "Apply Now" and get redirected directly to the official application page.',
                                icon: (
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ),
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={item.step}
                                className="relative p-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                {/* Step Number */}
                                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-sm font-bold text-zinc-900">
                                    {item.step}
                                </div>

                                {/* Icon */}
                                <div className="mb-6 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                                    {item.icon}
                                </div>

                                <h3 className="text-xl font-semibold text-zinc-100 mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-zinc-500 leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-y border-zinc-800">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: '50+', label: 'Opportunities' },
                            { value: '30+', label: 'Organizations' },
                            { value: '$10M+', label: 'Total Prizes' },
                            { value: '∞', label: 'Potential' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-zinc-500 text-sm uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-6">
                            Ready to take the next step?
                        </h2>
                        <p className="text-zinc-500 mb-8 max-w-xl mx-auto">
                            Don't miss out on life-changing opportunities. Start exploring now.
                        </p>
                        <Link
                            href="/opportunities"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-zinc-900 transition-transform hover:scale-105"
                            style={{
                                background: 'linear-gradient(135deg, #ffd700 0%, #ffb700 100%)',
                                boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
                            }}
                        >
                            Get Started
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
