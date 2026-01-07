import { NavRail } from '@/features/explore/components/NavRail';
import { GlobalSearch } from '@/features/explore/components/GlobalSearch';
import { Bell, User } from 'lucide-react';
import Link from 'next/link';

export default function ExploreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-black">
            {/* Top Utility Bar */}
            <header className="sticky top-0 z-50 flex items-center justify-between gap-4 px-6 py-4 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
                {/* Logo */}
                <Link href="/" className="text-white font-black tracking-tighter text-xl hidden md:block">
                    ACCOLADES
                </Link>

                {/* Search */}
                <GlobalSearch />

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="p-2 text-zinc-500 hover:text-white transition-colors">
                        <Bell size={20} />
                    </button>
                    <Link href="/submit" className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-500 transition-colors">
                        + Submit
                    </Link>
                    <button className="p-2 bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
                        <User size={20} />
                    </button>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sticky Navigation Rail */}
                <NavRail />

                {/* Main Scrollable Canvas */}
                <main className="flex-1 min-w-0 pb-20 md:pb-0">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
