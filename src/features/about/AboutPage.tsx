'use client';

import { motion } from 'framer-motion';
import {
    ShieldCheck,
    Zap,
    Target,
    Globe,
    Github,
    Linkedin,
    ExternalLink,
    Terminal,
    Layers
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-zinc-100 pt-32 selection:bg-blue-500/30">
            <main className="max-w-6xl mx-auto px-6 pb-20">

                {/* --- SECTION 1: THE MISSION --- */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col justify-center items-center min-h-[calc(100vh-8rem)] text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent uppercase">
                        Beyond the <br /> Fragmented Web.
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Opportunities are everywhere, but they are buried under noise.
                        <strong> Accolades</strong> was engineered to solve the fragmentation of elite
                        hackathons, internships, and research programs—providing a single,
                        high-performance gateway for the ambitious.
                    </p>
                </motion.section>

                {/* --- SECTION 2: HOW TO USE EFFECTIVELY --- */}
                <section className="grid md:grid-cols-3 gap-8 mb-40">
                    <div className="p-8 rounded-3xl border border-zinc-900 bg-zinc-900/20 backdrop-blur-sm">
                        <Zap className="text-blue-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Deep-Link Search</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            Every filter and search query updates the URL in real-time. Save your
                            custom views or share specific results instantly with your peers.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl border border-zinc-900 bg-zinc-900/20 backdrop-blur-sm">
                        <Layers className="text-purple-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Relational Data</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            We don't just list titles. Our system links opportunities to verified
                            organizations, ensuring you have the direct logo, website, and application links.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl border border-zinc-900 bg-zinc-900/20 backdrop-blur-sm">
                        <ShieldCheck className="text-emerald-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Verified Only</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            Stop wasting time on expired links. Every opportunity is manually
                            vetted and verified before appearing in the catalog.
                        </p>
                    </div>
                </section>

                {/* --- SECTION 3: THE FOUNDER (AMAN ANUBHAV) --- */}
                <section className="relative mb-40">
                    <div className="absolute inset-0 bg-blue-500/5 blur-[120px] -z-10 rounded-full" />
                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-[40px] p-8 md:p-16 overflow-hidden">
                        <div className="flex flex-col md:flex-row gap-16 items-center">

                            {/* Profile Card Styling */}
                            <div className="w-full md:w-1/3 flex flex-col items-center">
                                <div className="relative group mb-6">
                                    <div className="w-48 h-48 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center transition-all group-hover:border-zinc-500 overflow-hidden">
                                        {/* Founder Icon / Placeholder */}
                                        <Terminal className="w-12 h-12 text-zinc-700 group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="absolute -bottom-3 -right-3 bg-zinc-100 p-2 rounded-lg text-black font-black text-xs uppercase tracking-tighter">
                                        Founder
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <a href="https://github.com/amanaanubhav" target="_blank" className="p-3 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors"><Github size={20} /></a>
                                    <a href="https://www.linkedin.com/in/amananubhav/" target="_blank" className="p-3 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors"><Linkedin size={20} /></a>
                                    <a href="https://amananubhav.com" target="_blank" className="p-3 bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors"><Globe size={20} /></a>
                                </div>
                            </div>

                            {/* Founder Content */}
                            <div className="flex-1">
                                <h2 className="text-4xl font-black tracking-tighter mb-4 uppercase text-white">
                                    Aman Anubhav
                                </h2>
                                <p className="text-blue-400 font-bold tracking-[0.2em] uppercase text-xs mb-8">
                                    Machine Learning Engineer | AI Architect
                                </p>
                                <div className="space-y-6 text-zinc-400 leading-relaxed">
                                    <p>
                                        I am a developer focused on the intersection of AI, Machine Learning, and
                                        high-performance web architecture. My work revolves around making complex
                                        data accessible through clean, intelligent interfaces.
                                    </p>
                                    <p>
                                        Accolades is a personal mission to empower fellow students. Having
                                        navigated the competitive landscape of hackathons and technical internships
                                        myself, I built this portal to serve as the "Gold Standard" for discovery.
                                    </p>
                                </div>

                                <div className="mt-10 flex flex-wrap gap-3">
                                    {['Python', 'C/C++', 'DSA', 'Next.js', 'PyTorch'].map((skill) => (
                                        <span key={skill} className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-zinc-800 border border-zinc-700 text-zinc-500 rounded">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* --- SECTION 4: FINAL CTA --- */}
                <section className="text-center">
                    <h2 className="text-2xl font-bold mb-0">Ready to start?</h2>
                    <Link
                        href="/opportunities"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all"
                    >
                        Explore the Catalog <Zap size={18} fill="black" />
                    </Link>
                </section>

            </main>
        </div>
    );
}