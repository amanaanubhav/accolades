'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Globe, Rocket, Shield, Target } from 'lucide-react';

const stats = [
    { label: 'Opportunities Tracked', value: '50+' },
    { label: 'Verified Orgs', value: '25+' },
    { label: 'Update Frequency', value: 'Daily' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-zinc-100 selection:bg-blue-500/30">
            <main className="max-w-5xl mx-auto px-6 py-20">

                {/* HERO SECTION */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24"
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                        Elevating Your <br /> Career Trajectory.
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Accolades is a high-performance opportunity portal designed to bridge the gap between
                        ambitious students and world-class organizations.
                    </p>
                </motion.section>

                {/* MISSION GRID */}
                <section className="grid md:grid-cols-3 gap-8 mb-32">
                    <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
                        <Rocket className="w-10 h-10 text-blue-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                        <p className="text-zinc-400 text-sm">To democratize access to elite hackathons, internships, and research programs worldwide.</p>
                    </div>
                    <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
                        <Shield className="w-10 h-10 text-emerald-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Verified Only</h3>
                        <p className="text-zinc-400 text-sm">Every listing on our platform is manually verified to ensure authenticity and impact.</p>
                    </div>
                    <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
                        <Target className="w-10 h-10 text-amber-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Tech Driven</h3>
                        <p className="text-zinc-400 text-sm">Built with Next.js 14 and Supabase to provide lightning-fast, real-time opportunity tracking.</p>
                    </div>
                </section>

                {/* STATS STRIP */}
                <div className="flex flex-wrap justify-center gap-12 mb-32 border-y border-zinc-800 py-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* CONTACT SECTION */}
                <section className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <a
                            href="mailto:contact@accolades.com"
                            className="flex items-center justify-center gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
                        >
                            <Mail className="w-5 h-5 text-zinc-500 group-hover:text-white" />
                            <span>Email Us</span>
                        </a>
                        <a
                            href="https://github.com/DSAlgo-Code"
                            target="_blank"
                            className="flex items-center justify-center gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
                        >
                            <Github className="w-5 h-5 text-zinc-500 group-hover:text-white" />
                            <span>GitHub</span>
                        </a>
                    </div>

                    <p className="mt-12 text-zinc-500 text-sm">
                        Developed with precision by <strong>Aman</strong>. <br />
                        &copy; {new Date().getFullYear()} Accolades Portal. All rights reserved.
                    </p>
                </section>

            </main>
        </div>
    );
}
