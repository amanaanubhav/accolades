'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, Globe, Shield } from 'lucide-react';

export default function HomePage() {
    return (
        <main className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Chrome Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                {/* HERO SECTION */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-xs font-bold mb-6"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        V1.0 NOW LIVE
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
                    >
                        DISCOVER THE <br />
                        <span className="bg-gradient-to-b from-zinc-100 to-zinc-600 bg-clip-text text-transparent">
                            NEXT FRONTIER.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        The industry-standard portal for elite hackathons, internships, and research programs.
                        Curated for the ambitious minds of the AI generation.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <Link
                            href="/explore"
                            className="group relative px-8 py-4 bg-white text-black font-bold rounded-2xl flex items-center gap-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
                        >
                            Explore Opportunities
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/about"
                            className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all"
                        >
                            How it Works
                        </Link>
                    </motion.div>
                </div>

                {/* FEATURE STRIP */}
                <div className="grid md:grid-cols-3 gap-8 border-t border-zinc-900 pt-20">
                    {[
                        { icon: Zap, title: "Real-time Data", desc: "Live updates from top-tier global organizations." },
                        { icon: Globe, title: "Global Reach", desc: "Access hybrid and remote opportunities worldwide." },
                        { icon: Shield, title: "Manual Verification", desc: "Zero spam. Every listing is verified for impact." }
                    ].map((feature, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-zinc-900/20 border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                            <feature.icon className="w-10 h-10 text-blue-500 mb-4" />
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
