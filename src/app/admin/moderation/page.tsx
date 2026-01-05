import { createClient } from '@/utils/supabase/server';
import ModerationView from '@/features/admin/ModerationView';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Moderation Dashboard | Accolades',
};

export default async function Page() {
    const supabase = await createClient();

    // 1. Fetch only unverified items
    const { data: pendingOpps, error } = await supabase
        .from('opportunities')
        .select('*, organizations(*)')
        .eq('is_verified', false)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Fetch Error:", error);
        return <div className="p-10 text-red-500">Error loading moderation queue.</div>;
    }

    return (
        <div className="min-h-screen bg-black">
            <ModerationView initialData={pendingOpps || []} />
        </div>
    );
}
