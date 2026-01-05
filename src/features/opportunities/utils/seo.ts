
import { Metadata, ResolvingMetadata } from 'next';
import { createClient } from '@supabase/supabase-js';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateOpportunityMetadata(
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
