/**
 * Opportunity Details Page
 * 
 * Dynamic page for viewing individual opportunity details.
 */

import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/Button';
import { CategoryBadge } from '@/components/ui/Badge';
import { getCategoryMeta } from '@/lib/constants';
import { calculateUrgency } from '@/hooks/useUrgency';
import { formatDate } from '@/lib/utils';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { id } = await params;

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: opportunity } = await supabase
        .from('opportunities')
        .select(`
            title,
            brief_overview,
            banner_url,
            organizations (
                name,
                logo_url
            )
        `)
        .eq('id', id)
        .single();

    if (!opportunity) {
        return {
            title: 'Opportunity Not Found',
        };
    }

    // Smart Asset Fallback
    // banner_url -> logo_url -> /default-og.png
    // Note: organizations is an object (single join) or array depending on schema, usually object if singular.
    // Based on previous data fetching, it seemed to return an object.
    const org = Array.isArray(opportunity.organizations)
        ? opportunity.organizations[0]
        : opportunity.organizations;

    const ogImage = opportunity.banner_url
        || (org as any)?.logo_url
        || '/default-og.png';

    const title = `${opportunity.title} | ${(org as any)?.name || 'Accolades'}`;

    return {
        title: title,
        description: opportunity.brief_overview,
        openGraph: {
            title: title,
            description: opportunity.brief_overview,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: opportunity.title,
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: opportunity.brief_overview,
            images: [ogImage],
        },
    };
}


// Opportunity Details Page
export default async function OpportunityDetailsPage({ params }: PageProps) {
    const { id } = await params;

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: opportunity, error } = await supabase
        .from('opportunities')
        .select(`
            *,
            organizations (
                name,
                logo_url,
                website_url
            ),
            opportunity_tags (
                tags (
                    name
                )
            )
        `)
        .eq('id', id)
        .single();

    if (error || !opportunity) {
        notFound();
    }

    // Process Tags
    const tags = opportunity.opportunity_tags?.map((ot: any) => ot.tags?.name).filter(Boolean) || [];

    // Derive Meta
    const urgency = calculateUrgency(opportunity.end_date);
    const categoryMeta = getCategoryMeta(opportunity.category);

    // JSON-LD Construction
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: opportunity.title,
        startDate: opportunity.end_date || new Date().toISOString(),
        endDate: opportunity.end_date || new Date().toISOString(),
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: opportunity.mode === 'Virtual'
            ? 'https://schema.org/OnlineEventAttendanceMode'
            : 'https://schema.org/OfflineEventAttendanceMode',
        location: opportunity.mode === 'Virtual'
            ? { '@type': 'VirtualLocation', url: opportunity.apply_link }
            : { '@type': 'Place', name: opportunity.location || 'TBD', address: opportunity.location || 'TBD' },
        image: [opportunity.banner_url || (opportunity.organizations as any)?.logo_url],
        description: opportunity.brief_overview,
        organizer: {
            '@type': 'Organization',
            name: (opportunity.organizations as any)?.name,
            url: (opportunity.organizations as any)?.website_url
        }
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

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
                        by {(opportunity.organizations as any)?.name}
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
                            <p className="text-[var(--color-platinum)]">{formatDate(opportunity.end_date)}</p>
                        </div>
                        {opportunity.cost_type !== 'Free' && (
                            <div>
                                <p className="text-xs text-[var(--color-silver)] mb-1">Compensation</p>
                                <p className="text-[var(--color-neon-gold)]">{opportunity.stipend_prize}</p>
                            </div>
                        )}
                        {opportunity.cost_type === 'Free' && (
                            <div>
                                <p className="text-xs text-[var(--color-silver)] mb-1">Compensation</p>
                                <p className="text-[var(--color-neon-gold)]">{opportunity.stipend_prize}</p>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-[var(--color-platinum)] mb-4">
                            About this opportunity
                        </h2>
                        <p className="text-[var(--color-silver)] leading-relaxed">
                            {opportunity.brief_overview}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="mb-8">
                        <h3 className="text-sm font-medium text-[var(--color-silver)] mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag: string) => (
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
                                    Applications close on {formatDate(opportunity.end_date)}
                                </p>
                            </div>
                            <Button
                                size="lg"
                            // Note: Button is a server/client component? Assuming client or using wrapper. 
                            // Actually Button is imported from components/ui/Button. 
                            // It probably needs 'use client' if it has onClick inside.
                            // But here we are passing onClick prop. 
                            // If Button component is client, this is fine. If not, we might need a client wrapper.
                            // The previous code had onClick={() => window.open...} which implies Button handles it or it's a client component.
                            // I'll keep the logic but we need to ensure Button is client-side or use a Link.
                            // To be safe and SEO friendly, let's use an <a> tag styled as button or update Button to accept href.
                            // For now, creating a client wrapper or using the onClick prop assuming Button is client component (as per "src/components/ui/Button" usually).
                            // But onClick with window.open in server component prop is invalid?
                            // WAIT. Server components cannot pass functions like () => window... to client components.
                            // I should wrap the CTA in a client component or use a simple <a> tag.
                            // The previous code was: onClick={() => window.open(opportunity.url, '_blank')}
                            // If OpportunityDetailsPage was 'use client' previously? No, it was async default export.
                            // So the previous code was likely broken or Button was a client component handling it?
                            // No, you can't pass a function from server to client component props unless it's a server action.
                            // Solution: Change to <a href={...} ... > inside Button or make Button accept href.
                            // I will assume Button accepts href or use an anchor tag.
                            // Changing to anchor tag for robust functionality.
                            >
                                <a href={opportunity.apply_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-inherit no-underline">
                                    Apply Now
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
