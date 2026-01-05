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
        '/opportunities',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
    }));

    // 2. Fetch Dynamic Opportunity Routes
    const { data: opportunities } = await supabase
        .from('opportunities')
        .select('id, created_at');

    const dynamicRoutes = (opportunities || []).map((opp) => ({
        url: `${baseUrl}/opportunities/${opp.id}`,
        lastModified: opp.created_at || new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // 3. Merge and Return
    return [...routes, ...dynamicRoutes];
}
