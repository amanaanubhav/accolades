'use client';

import { motion } from 'framer-motion';

export function CardSkeleton() {
    return (
        <div className="animate-pulse rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden h-full">
            <div className="p-5 space-y-4">
                {/* Category badge */}
                <div className="h-5 w-20 bg-zinc-800 rounded-full" />

                {/* Title */}
                <div className="space-y-2">
                    <div className="h-6 w-3/4 bg-zinc-800 rounded" />
                    <div className="h-6 w-1/2 bg-zinc-800 rounded" />
                </div>

                {/* Organization */}
                <div className="h-4 w-1/3 bg-zinc-800 rounded" />

                {/* Description */}
                <div className="space-y-2 pt-2">
                    <div className="h-3 w-full bg-zinc-800 rounded" />
                    <div className="h-3 w-2/3 bg-zinc-800 rounded" />
                </div>

                {/* Meta tags */}
                <div className="flex gap-2 pt-4">
                    <div className="h-6 w-16 bg-zinc-800 rounded-md" />
                    <div className="h-6 w-20 bg-zinc-800 rounded-md" />
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                    <div className="h-4 w-24 bg-zinc-800 rounded" />
                    <div className="h-10 w-20 bg-zinc-800 rounded-lg" />
                </div>
            </div>
        </div>
    );
}

export function HeroSkeleton() {
    return (
        <section className="px-6 mb-12">
            <div className="animate-pulse w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
                    <div className="space-y-6">
                        <div className="h-6 w-40 bg-zinc-800 rounded-full" />
                        <div className="space-y-3">
                            <div className="h-12 w-full bg-zinc-800 rounded" />
                            <div className="h-12 w-3/4 bg-zinc-800 rounded" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-zinc-800 rounded" />
                            <div className="h-4 w-2/3 bg-zinc-800 rounded" />
                        </div>
                        <div className="flex gap-4">
                            <div className="h-6 w-24 bg-zinc-800 rounded" />
                            <div className="h-6 w-16 bg-zinc-800 rounded" />
                        </div>
                        <div className="h-14 w-40 bg-zinc-800 rounded-xl" />
                    </div>
                    <div className="h-64 md:h-80 bg-zinc-800 rounded-2xl" />
                </div>
            </div>
        </section>
    );
}

export function SwimlaneSkeletion() {
    return (
        <section className="py-8 border-b border-white/5">
            <div className="flex items-center justify-between px-6 mb-6">
                <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse" />
                <div className="h-5 w-20 bg-zinc-800 rounded animate-pulse" />
            </div>
            <div className="flex gap-6 overflow-x-auto pb-8 px-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="min-w-[320px] max-w-[320px]">
                        <CardSkeleton />
                    </div>
                ))}
            </div>
        </section>
    );
}
