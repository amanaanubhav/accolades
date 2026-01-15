'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Trophy, Briefcase, FlaskConical, Users, ArrowRight, Sparkles, Zap, Globe, Shield, Compass
} from 'lucide-react';

// --- Animation Variants ---
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 60, damping: 18 } }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 80 } }
};

// --- Main Component ---
export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#030303] text-gray-100 font-sans pt-20">

            {/* === HERO SECTION === */}
            <section className="relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#030303] to-[#030303]" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/15 rounded-full blur-[120px]" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-32 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                            The Gold Standard for
                            <br />
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                Opportunity Discovery
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeUp} className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            A high-performance, elite opportunity discovery portal for the next generation of developers and researchers.
                            Navigate the fragmented landscape of global technical frontiers with precision and speed.
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/explore" className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
                                Explore Opportunities
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/about" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-lg hover:bg-white/10 transition-colors">
                                Learn More
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* === WHAT WE OFFER === */}
            <section className="py-24 px-6 bg-gradient-to-b from-[#030303] to-zinc-950">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Discover What Awaits
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-gray-400 max-w-xl mx-auto">
                            Navigate through categories designed to match your ambitions.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        <CategoryCard icon={Trophy} title="Hackathons" desc="Compete, innovate, and win prizes at global tech events." href="/explore/hackathons" color="cyan" />
                        <CategoryCard icon={Briefcase} title="Internships" desc="Land high-impact roles at top-tier companies." href="/explore/internships" color="amber" />
                        <CategoryCard icon={FlaskConical} title="Research" desc="Join cutting-edge labs and academic programs." href="/explore/research" color="emerald" />
                        <CategoryCard icon={Users} title="Fellowships" desc="Access mentorship and funded opportunities." href="/explore/fellowships" color="purple" />
                    </motion.div>
                </div>
            </section>

            {/* === WHY ACCOLADES === */}
            <section className="py-24 px-6 bg-zinc-950">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Why Choose Accolades?
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-gray-400 max-w-xl mx-auto">
                            Built for the ambitious, designed for clarity.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        <FeatureCard icon={Zap} title="Real-Time Updates" desc="Stay ahead with live listings from verified sources." />
                        <FeatureCard icon={Globe} title="Global Reach" desc="Access opportunities from around the world, remote or on-site." />
                        <FeatureCard icon={Shield} title="Quality Curated" desc="Every listing is manually verified for authenticity and impact." />
                    </motion.div>
                </div>
            </section>

            {/* === CALL TO ACTION === */}
            <section className="py-24 px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={scaleIn}
                    className="max-w-3xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-blue-900/30 to-indigo-900/20 border border-white/10"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to Take the Next Step?</h2>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        Stop scrolling endlessly. Start exploring opportunities that truly matter.
                    </p>
                    <Link href="/explore" className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-bold text-lg shadow-xl hover:shadow-white/20 transition-all">
                        Start Exploring
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </section>

            {/* === FOOTER === */}
            <footer className="border-t border-white/5 bg-black/40">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8">

                        {/* Brand Column */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                    <Compass className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-lg font-bold text-white">ACCOLADES</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
                                The gold standard for opportunity discovery. Empowering the next generation of developers and researchers to find their path.
                            </p>
                            <div className="flex gap-3">
                                <a href="https://github.com/amananubhav" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                                </a>
                                <a href="https://linkedin.com/in/amananubhav" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h4>
                            <ul className="space-y-3">
                                <li><Link href="/explore/hackathons" className="text-gray-400 hover:text-white text-sm transition-colors">Hackathons</Link></li>
                                <li><Link href="/explore/internships" className="text-gray-400 hover:text-white text-sm transition-colors">Internships</Link></li>
                                <li><Link href="/explore/research" className="text-gray-400 hover:text-white text-sm transition-colors">Research</Link></li>
                                <li><Link href="/explore/fellowships" className="text-gray-400 hover:text-white text-sm transition-colors">Fellowships</Link></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
                            <ul className="space-y-3">
                                <li><Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
                            <ul className="space-y-3">
                                <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</Link></li>
                                <li><Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Disclaimer</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-xs">
                            © {new Date().getFullYear()} Accolades. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-xs text-gray-500">
                            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}


// --- Sub Components ---

function CategoryCard({ icon: Icon, title, desc, href, color }: { icon: any, title: string, desc: string, href: string, color: 'cyan' | 'amber' | 'emerald' | 'purple' }) {
    const colorClasses = {
        cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20 group-hover:border-cyan-500/50 group-hover:shadow-cyan-500/10',
        amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20 group-hover:border-amber-500/50 group-hover:shadow-amber-500/10',
        emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/10',
        purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20 group-hover:border-purple-500/50 group-hover:shadow-purple-500/10'
    };

    return (
        <motion.div variants={fadeUp}>
            <Link href={href} className={`group block p-6 rounded-2xl border bg-white/[0.02] transition-all hover:shadow-xl ${colorClasses[color]}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
            </Link>
        </motion.div>
    );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <motion.div variants={fadeUp} className="flex flex-col items-center text-center p-6">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
                <Icon className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
        </motion.div>
    );
}