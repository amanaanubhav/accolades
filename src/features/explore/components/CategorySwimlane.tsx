'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { OpportunityCard } from '@/features/opportunities/components/OpportunityCard';
import { Opportunity } from '@/types';

interface SwimlaneProps {
    title: string;
    link: string;
    items: Opportunity[];
}

export function CategorySwimlane({ title, link, items }: SwimlaneProps) {
    return (
        <section className="py-8 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center justify-between px-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
                <Link href={link} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium group">
                    View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex gap-6 overflow-x-auto pb-8 px-6 scrollbar-hide snap-x">
                {items.map((item) => (
                    <div key={item.id} className="min-w-[320px] max-w-[320px] snap-center">
                        <OpportunityCard opportunity={item} />
                    </div>
                ))}
                {items.length === 0 && (
                    <div className="text-zinc-500 italic px-6">No opportunities found in this category yet.</div>
                )}
            </div>
        </section>
    );
}
