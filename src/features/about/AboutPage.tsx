'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * AboutPage - Mission + Contact Section
 * 
 * Features:
 * - Project mission statement
 * - Contact form (Name, Email, Message)
 */
export default function AboutPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        setSubmitted(true);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <main className="min-h-screen bg-zinc-950">
            {/* Hero Section */}
            <section className="py-24 relative overflow-hidden">
                {/* Background */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 245, 255, 0.05) 0%, transparent 60%)',
                    }}
                />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 mb-8 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Home
                        </Link>

                        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-400 mb-6">
                            About Accolades
                        </h1>

                        <p className="text-lg text-zinc-400 leading-relaxed">
                            We believe every ambitious student deserves access to world-class opportunities—regardless of where they are or what connections they have.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 border-t border-zinc-800">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-zinc-100 mb-4">Our Mission</h2>
                            <p className="text-zinc-400 leading-relaxed mb-6">
                                Accolades is a curated platform that aggregates the best hackathons, internships, research programs,
                                and competitions from organizations like MIT, Google, Stanford, CERN, and more.
                            </p>
                            <p className="text-zinc-400 leading-relaxed mb-6">
                                We cut through the noise so you can focus on what matters: finding opportunities that align with your
                                passions and building the future you envision.
                            </p>
                            <p className="text-zinc-400 leading-relaxed">
                                Whether you're looking for your first hackathon, a funded summer research program, or a life-changing
                                internship—we've got you covered.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h2 className="text-2xl font-bold text-zinc-100 mb-4">What We Offer</h2>
                            <ul className="space-y-4">
                                {[
                                    { title: 'Curated Selection', desc: 'Hand-picked opportunities from trusted organizations' },
                                    { title: 'Real-Time Updates', desc: 'Stay ahead with the latest deadlines and new programs' },
                                    { title: 'Smart Filters', desc: 'Find opportunities by category, location, and cost' },
                                    { title: 'Direct Apply', desc: 'One click takes you to the official application page' },
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-zinc-200 font-medium">{item.title}</h3>
                                            <p className="text-zinc-500 text-sm">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-24 bg-zinc-900/30">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="max-w-xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-zinc-100 mb-4">Get in Touch</h2>
                            <p className="text-zinc-500">
                                Have a question, suggestion, or want to partner with us? We'd love to hear from you.
                            </p>
                        </div>

                        {submitted ? (
                            <motion.div
                                className="p-8 rounded-2xl border border-green-500/30 bg-green-500/10 text-center"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-green-300 mb-2">Message Sent!</h3>
                                <p className="text-green-400/70">Thank you for reaching out. We'll get back to you soon.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-6 py-4 rounded-xl font-semibold text-zinc-900 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        background: 'linear-gradient(135deg, #00f5ff 0%, #00d4ff 100%)',
                                    }}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </form>
                        )}

                        {/* Alternative Contact */}
                        <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
                            <p className="text-zinc-500 text-sm">
                                Or email us directly at{' '}
                                <a
                                    href="mailto:hello@accolades.app"
                                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                                >
                                    hello@accolades.app
                                </a>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
