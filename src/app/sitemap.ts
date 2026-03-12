import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://accolades.vercel.app';

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // 1. Define Static Routes
    const routes = [
        '',
        '/about',
        '/explore',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1.0 : 0.9,
    }));

    // 2. Fetch Dynamic Opportunity Routes
    const { data: opportunities } = await supabase
        .from('opportunities')
        .select('slug, created_at')
        .eq('is_verified', true);

    const dynamicRoutes = (opportunities || []).map((opp) => ({
        url: `${baseUrl}/explore/opportunity/${opp.slug}`,
        lastModified: opp.created_at || new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 3. Merge and Return
    return [...routes, ...dynamicRoutes];
}
