'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Code2, BrainCircuit, Terminal, Rocket, Linkedin } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-zinc-100 selection:bg-blue-500/30 pt-32 pb-20">
            <main className="max-w-6xl mx-auto px-6">

                {/* SECTION 1: THE MISSION */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-32"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent uppercase">
                        The Vision
                    </h1>
                    <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Accolades was built to solve a single problem: the fragmentation of world-class opportunities.
                        We provide a high-performance, verified gateway for students to discover elite hackathons,
                        internships, and research programs.
                    </p>
                </motion.section>

                {/* SECTION 2: MEET THE BUILDER (AMAN) */}
                <section className="mb-32">
                    <div className="relative p-1 rounded-3xl bg-gradient-to-br from-zinc-700 via-zinc-900 to-black">
                        <div className="bg-black rounded-[22px] p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">

                            {/* Founder Image/Avatar Placeholder */}
                            <div className="relative group">
                                <div className="w-48 h-48 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden transition-all group-hover:border-zinc-500">
                                    <Terminal className="w-16 h-16 text-zinc-700 group-hover:text-zinc-100 transition-colors" />
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-blue-600 p-3 rounded-xl shadow-lg shadow-blue-500/20">
                                    <Code2 className="w-6 h-6 text-white" />
                                </div>
                            </div>

                            {/* Founder Text */}
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-4xl font-black tracking-tighter mb-2 uppercase italic text-white">
                                    Aman
                                </h2>
                                <p className="text-blue-500 font-bold text-sm tracking-widest uppercase mb-6">
                                    Founder & Lead Architect
                                </p>
                                <p className="text-zinc-400 leading-relaxed mb-8">
                                    I am a Machine Learning Engineer and full-stack developer passionate about building
                                    intelligent systems. As the sole builder of Accolades, I combined my background in
                                    AI-NLP and competitive programming to create a platform that prioritizes speed,
                                    data integrity, and user experience.
                                </p>

                                {/* Technical Tags based on your profile */}
                                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                    {['AI/ML', 'Python', 'C++', 'DSA', 'Next.js'].map((tech) => (
                                        <span key={tech} className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-zinc-900 border border-zinc-800 rounded-md text-zinc-500">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: CORE PILLARS */}
                <div className="grid md:grid-cols-2 gap-8 mb-32">
                    <div className="group p-8 rounded-3xl border border-zinc-900 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all">
                        <BrainCircuit className="w-10 h-10 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold mb-2">Automated Extraction</h3>
                        <p className="text-zinc-500 text-sm">Utilizing advanced LLM logic to ensure every opportunity parameter is extracted with 100% accuracy.</p>
                    </div>
                    <div className="group p-8 rounded-3xl border border-zinc-900 bg-zinc-900/20 hover:bg-zinc-900/40 transition-all">
                        <Rocket className="w-10 h-10 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold mb-2">Performance First</h3>
                        <p className="text-zinc-500 text-sm">Engineered with Next.js 14 Server Components for lightning-fast deep linking and SEO.</p>
                    </div>
                </div>

                {/* SECTION 4: GET IN TOUCH */}
                <section className="text-center bg-zinc-900/30 border border-zinc-800 rounded-[40px] p-12 md:p-20">
                    <h2 className="text-4xl font-black tracking-tighter mb-8 uppercase text-white">
                        Connect with the Builder
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a
                            href="mailto:contact@yourdomain.com"
                            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-bold hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
                        >
                            <Mail size={20} /> Email Aman
                        </a>
                        <a
                            href="https://github.com/DSAlgo-Code"
                            target="_blank"
                            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-zinc-800 border border-zinc-700 text-white font-bold hover:bg-zinc-700 transition-all"
                        >
                            <Github size={20} /> GitHub Profile
                        </a>
                    </div>
                </section>

            </main>
        </div>
    );
}
