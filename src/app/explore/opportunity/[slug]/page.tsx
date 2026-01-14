import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import { DetailView } from '@/features/explore/DetailView';

interface PageProps {
    params: Promise<{ slug: string }>;
}

/**
 * Generate dynamic metadata for SEO
 */
export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

    let query = supabase
        .from('opportunities')
        .select(`title, brief_overview, banner_url, organizations (name, logo_url)`);

    if (isUuid) {
        query = query.eq('id', slug);
    } else {
        query = query.eq('slug', slug);
    }

    const { data: opportunity } = await query.single();

    if (!opportunity) {
        return { title: 'Opportunity Not Found' };
    }

    const org = Array.isArray(opportunity.organizations)
        ? opportunity.organizations[0]
        : opportunity.organizations;

    const ogImage = opportunity.banner_url || (org as any)?.logo_url || '/default-og.png';
    const title = `${opportunity.title} | ${(org as any)?.name || 'Accolades'}`;

    return {
        title,
        description: opportunity.brief_overview,
        openGraph: {
            title,
            description: opportunity.brief_overview,
            images: [{ url: ogImage, width: 1200, height: 630, alt: opportunity.title }],
        },
    };
}

/**
 * Detail Page - Server Component
 */
export default async function Page({ params }: PageProps) {
    const { slug } = await params;

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

    let query = supabase
        .from('opportunities')
        .select(`*, organizations (name, logo_url, website_url), opportunity_tags (tags (name))`);

    if (isUuid) {
        query = query.eq('id', slug);
    } else {
        query = query.eq('slug', slug);
    }

    const { data: opportunity, error } = await query.single();

    if (error || !opportunity) {
        notFound();
    }

    const transformedOpportunity = {
        id: opportunity.id,
        title: opportunity.title,
        organization: (opportunity.organizations as any)?.name || 'Unknown',
        category: opportunity.category || 'Competition',
        deadline: opportunity.end_date,
        description: opportunity.brief_overview,
        url: opportunity.apply_link,
        tags: opportunity.opportunity_tags?.map((ot: any) => ot.tags?.name).filter(Boolean) || [],
        location: opportunity.location,
        isPaid: opportunity.cost_type === 'Paid',
        createdAt: opportunity.created_at,
        mode: opportunity.mode,
        slug: opportunity.slug,
        organizations: opportunity.organizations,
        stipend_prize: opportunity.stipend_prize,
        prerequisites: opportunity.prerequisites,
        duration: opportunity.duration,
        brief_overview: opportunity.brief_overview,
        banner_url: opportunity.banner_url,
        apply_link: opportunity.apply_link,
        end_date: opportunity.end_date,
        cost_type: opportunity.cost_type,
    };

    return <DetailView opportunity={transformedOpportunity} />;
}
