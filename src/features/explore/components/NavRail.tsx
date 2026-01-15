'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, Trophy, Code2, GraduationCap, LayoutGrid, Home, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Main navigation items (cross-site)
const mainNavItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'About', icon: Info, href: '/about' },
];

// Explore category items
const categoryItems = [
    { label: 'Overview', icon: LayoutGrid, href: '/explore' },
    { label: 'Internships', icon: Briefcase, href: '/explore/internships' },
    { label: 'Hackathons', icon: Trophy, href: '/explore/hackathons' },
    { label: 'Research', icon: GraduationCap, href: '/explore/research' },
    { label: 'Challenges', icon: Code2, href: '/explore/challenges' },
];

export function NavRail() {
    const pathname = usePathname();

    const renderNavItem = (item: typeof mainNavItems[0], isMobile = false) => {
        const isActive = pathname === item.href;

        if (isMobile) {
            return (
                <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1">
                    <div className={`p-2 rounded-lg transition-all ${isActive ? 'text-blue-400' : 'text-zinc-500'}`}>
                        <item.icon size={20} />
                    </div>
                    <span className={`text-[10px] font-medium ${isActive ? 'text-blue-400' : 'text-zinc-600'}`}>
                        {item.label}
                    </span>
                </Link>
            );
        }

        return (
            <Tooltip key={item.href} delayDuration={0}>
                <TooltipTrigger asChild>
                    <Link href={item.href} className="relative group outline-none">
                        <div className={`p-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]' : 'text-zinc-500 hover:bg-zinc-800 hover:text-white'}`}>
                            <item.icon size={24} />
                        </div>
                    </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10} className="bg-zinc-800 text-white border-zinc-700">
                    <p>{item.label}</p>
                </TooltipContent>
            </Tooltip>
        );
    };

    return (
        <TooltipProvider>
            {/* DESKTOP: Vertical Rail (Left Side) */}
            <nav className="hidden md:flex flex-col items-center gap-4 w-20 py-6 h-[calc(100vh-80px)] sticky top-20 border-r border-white/5 bg-zinc-950/50 backdrop-blur-xl z-40">
                {/* Main Navigation */}
                {mainNavItems.map((item) => renderNavItem(item))}

                {/* Separator */}
                <div className="w-10 h-px bg-white/10 my-2" />

                {/* Category Navigation */}
                {categoryItems.map((item) => renderNavItem(item))}
            </nav>

            {/* MOBILE: Bottom Tab Bar */}
            <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 flex items-center justify-around py-3 bg-zinc-950/90 backdrop-blur-xl border-t border-white/10 safe-area-inset-bottom">
                {mainNavItems.map((item) => renderNavItem(item, true))}
                {categoryItems.slice(0, 3).map((item) => renderNavItem(item, true))}
            </nav>
        </TooltipProvider>
    );
}
