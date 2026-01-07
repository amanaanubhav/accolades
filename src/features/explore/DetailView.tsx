'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import type { Opportunity } from '@/types';

interface DetailViewProps {
    opportunity: Opportunity & {
        organizations?: {
            name: string;
            logo_url?: string;
            website_url?: string;
        };
        stipend_prize?: string;
        prerequisites?: string[];
        duration?: string;
        brief_overview?: string;
        banner_url?: string;
        apply_link?: string;
        end_date?: string;
        mode?: string;
        cost_type?: string;
    };
}

/**
 * DetailView - Rich Opportunity Details Page
 * 
 * Props:
 * - opportunity: Server-fetched opportunity with joined org data
 */
export function DetailView({ opportunity }: DetailViewProps) {
    const org = opportunity.organizations;
    const deadline = opportunity.end_date || opportunity.deadline;

    // Calculate days remaining
    const daysRemaining = deadline
        ? Math.max(0, Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
        : null;

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <main className="min-h-screen bg-zinc-950">
            {/* Banner */}
            <div className="relative w-full aspect-[21/9] bg-zinc-900 overflow-hidden">
                {opportunity.banner_url ? (
                    <Image
                        src={opportunity.banner_url}
                        alt={opportunity.title}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `
                                linear-gradient(135deg, rgba(0, 245, 255, 0.1) 0%, transparent 50%),
                                linear-gradient(225deg, rgba(255, 0, 255, 0.1) 0%, transparent 50%)
                            `,
                        }}
                    />
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

                {/* Back Button */}
                <Link
                    href="/explore"
                    className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/80 backdrop-blur-sm text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-600 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </Link>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 -mt-24 relative z-10 pb-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Header */}
                        <div className="mb-8">
                            {/* Category Badge */}
                            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-cyan-500/20 text-cyan-400 mb-4">
                                {opportunity.category}
                            </span>

                            <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
                                {opportunity.title}
                            </h1>

                            <div className="flex items-center gap-3">
                                {org?.logo_url && (
                                    <Image
                                        src={org.logo_url}
                                        alt={org.name}
                                        width={40}
                                        height={40}
                                        className="rounded-lg bg-zinc-800"
                                    />
                                )}
                                <div>
                                    <p className="text-zinc-300 font-medium">
                                        {org?.name || opportunity.organization}
                                    </p>
                                    {org?.website_url && (
                                        <a
                                            href={org.website_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-zinc-500 hover:text-cyan-400 transition-colors"
                                        >
                                            Visit website →
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description Card */}
                        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 md:p-8 mb-6">
                            <h2 className="text-xl font-semibold text-zinc-100 mb-4">About this Opportunity</h2>
                            <p className="text-zinc-400 leading-relaxed whitespace-pre-line">
                                {opportunity.brief_overview || opportunity.description}
                            </p>
                        </div>

                        {/* Prerequisites */}
                        {opportunity.prerequisites && opportunity.prerequisites.length > 0 && (
                            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 md:p-8">
                                <h2 className="text-xl font-semibold text-zinc-100 mb-4">Prerequisites</h2>
                                <ul className="space-y-3">
                                    {opportunity.prerequisites.map((prereq, index) => (
                                        <li key={index} className="flex items-start gap-3 text-zinc-400">
                                            <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {prereq}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </motion.div>

                    {/* Sticky Sidebar */}
                    <motion.div
                        className="lg:col-span-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="sticky top-6 rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
                            {/* Urgency Banner */}
                            {daysRemaining !== null && (
                                <div
                                    className={`p-4 rounded-xl text-center ${daysRemaining <= 7
                                        ? 'bg-red-500/20 text-red-400'
                                        : daysRemaining <= 30
                                            ? 'bg-amber-500/20 text-amber-400'
                                            : 'bg-green-500/20 text-green-400'
                                        }`}
                                >
                                    <span className="text-2xl font-bold">{daysRemaining}</span>
                                    <span className="block text-sm">days remaining</span>
                                </div>
                            )}

                            {/* Quick Details */}
                            <div className="space-y-4">
                                {deadline && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500">Deadline</p>
                                            <p className="text-zinc-200">{formatDate(deadline)}</p>
                                        </div>
                                    </div>
                                )}

                                {opportunity.location && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500">Location</p>
                                            <p className="text-zinc-200">{opportunity.location}</p>
                                        </div>
                                    </div>
                                )}

                                {opportunity.mode && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500">Mode</p>
                                            <p className="text-zinc-200">{opportunity.mode}</p>
                                        </div>
                                    </div>
                                )}

                                {opportunity.cost_type && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500">Cost</p>
                                            <p className="text-zinc-200">{opportunity.cost_type}</p>
                                        </div>
                                    </div>
                                )}

                                {opportunity.stipend_prize && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500">Prize/Stipend</p>
                                            <p className="text-amber-400 font-medium">{opportunity.stipend_prize}</p>
                                        </div>
                                    </div>
                                )}

                                {opportunity.duration && (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500">Duration</p>
                                            <p className="text-zinc-200">{opportunity.duration}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Apply Button */}
                            <a
                                href={opportunity.apply_link || opportunity.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl font-semibold text-zinc-900 transition-transform hover:scale-[1.02]"
                                style={{
                                    background: 'linear-gradient(135deg, #00f5ff 0%, #00d4ff 100%)',
                                    boxShadow: '0 0 30px rgba(0, 245, 255, 0.3)',
                                }}
                            >
                                Apply Now
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
