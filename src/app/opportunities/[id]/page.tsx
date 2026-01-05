/**
 * Opportunity Details Page
 * 
 * Dynamic page for viewing individual opportunity details.
 */

import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { CategoryBadge } from '@/components/ui/Badge';
import { MOCK_OPPORTUNITIES, getCategoryMeta } from '@/lib/constants';
import { calculateUrgency } from '@/hooks/useUrgency';
import { formatDate } from '@/lib/utils';

interface PageProps {
    params: Promise<{ id: string }>;
}

/**
 * Generate static params for all opportunities
 */
export async function generateStaticParams() {
    return MOCK_OPPORTUNITIES.map((opp) => ({
        id: opp.id,
    }));
}

/**
 * Opportunity Details Page
 */
export default async function OpportunityDetailsPage({ params }: PageProps) {
    const { id } = await params;

    // Find opportunity (replace with Supabase fetch in production)
    const opportunity = MOCK_OPPORTUNITIES.find((opp) => opp.id === id);

    if (!opportunity) {
        notFound();
    }

    const categoryMeta = getCategoryMeta(opportunity.category);
    const urgency = calculateUrgency(opportunity.deadline);

    return (
        <div className="container mx-auto px-6 py-12">
            {/* Back link */}
            <a
                href="/"
                className="inline-flex items-center gap-2 text-[var(--color-silver)] hover:text-[var(--color-platinum)] mb-8 transition-colors"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to opportunities
            </a>

            <div className="max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <CategoryBadge category={opportunity.category} />
                        <span
                            className="px-3 py-1 text-sm rounded-full"
                            style={{
                                backgroundColor: urgency.bgColor,
                                color: urgency.color,
                            }}
                        >
                            {urgency.label} • {urgency.daysRemaining}d remaining
                        </span>
                    </div>

                    <h1 className="text-4xl font-bold text-[var(--color-platinum)] mb-2">
                        {opportunity.title}
                    </h1>

                    <p className="text-xl text-[var(--color-silver)]">
                        by {opportunity.organization}
                    </p>
                </div>

                {/* Card content */}
                <div className="glass metallic-border rounded-2xl p-8 mb-8">
                    {/* Meta info */}
                    <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-[var(--color-chrome)]">
                        {opportunity.location && (
                            <div>
                                <p className="text-xs text-[var(--color-silver)] mb-1">Location</p>
                                <p className="text-[var(--color-platinum)]">{opportunity.location}</p>
                            </div>
                        )}
                        <div>
                            <p className="text-xs text-[var(--color-silver)] mb-1">Deadline</p>
                            <p className="text-[var(--color-platinum)]">{formatDate(opportunity.deadline)}</p>
                        </div>
                        {opportunity.isPaid && (
                            <div>
                                <p className="text-xs text-[var(--color-silver)] mb-1">Compensation</p>
                                <p className="text-[var(--color-neon-gold)]">Paid Opportunity</p>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-[var(--color-platinum)] mb-4">
                            About this opportunity
                        </h2>
                        <p className="text-[var(--color-silver)] leading-relaxed">
                            {opportunity.description}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="mb-8">
                        <h3 className="text-sm font-medium text-[var(--color-silver)] mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {opportunity.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-sm rounded-full bg-[var(--color-chrome)] text-[var(--color-silver)]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div
                        className="p-6 rounded-xl -mx-2"
                        style={{
                            background: `linear-gradient(135deg, ${categoryMeta?.bgColor || 'var(--color-gunmetal)'}, transparent)`,
                            border: `1px solid ${categoryMeta?.borderColor || 'var(--color-chrome)'}`,
                        }}
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <p className="text-[var(--color-platinum)] font-medium">
                                    Ready to apply?
                                </p>
                                <p className="text-sm text-[var(--color-silver)]">
                                    Applications close on {formatDate(opportunity.deadline)}
                                </p>
                            </div>
                            <Button
                                size="lg"
                                onClick={() => window.open(opportunity.url, '_blank')}
                                rightIcon={
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                }
                            >
                                Apply Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
