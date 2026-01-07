'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Github, Twitter, Mail, ExternalLink, Cpu } from 'lucide-react';

const footerLinks = {
    platform: [
        { name: 'Explore', href: '/explore' },
        { name: 'Submit', href: '/submit' },
        { name: 'About Us', href: '/about' },
    ],
    legal: [
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' },
    ],
    social: [
        { name: 'GitHub', href: 'https://github.com/DSAlgo-Code', icon: Github },
        { name: 'X', href: '#', icon: Twitter },
        { name: 'Contact', href: 'mailto:aman@example.com', icon: Mail },
    ]
};

export default function Footer() {
    const pathname = usePathname();

    // Hide on /explore routes (dashboard has its own layout)
    if (pathname.startsWith('/explore')) {
        return null;
    }

    return (
        <footer className="relative border-t border-zinc-900 bg-black pt-16 pb-8 overflow-hidden">
            {/* Subtle Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand Identity Section */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 bg-zinc-100 rounded rotate-45 flex items-center justify-center">
                                <Cpu className="text-black w-3 h-3 -rotate-45" />
                            </div>
                            <span className="font-black tracking-tighter text-xl bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent uppercase">
                                ACCOLADES
                            </span>
                        </Link>
                        <p className="text-zinc-500 text-sm max-w-sm leading-relaxed mb-6">
                            The industry-standard discovery engine for students and researchers.
                            Engineering the next generation of career trajectories through verified
                            global opportunities.
                        </p>
                        <div className="flex gap-4">
                            {footerLinks.social.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    target="_blank"
                                    className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all"
                                >
                                    <item.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Platform</h4>
                        <ul className="space-y-4">
                            {footerLinks.platform.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-zinc-500 text-sm hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal/Secondary Links */}
                    <div>
                        <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Legal</h4>
                        <ul className="space-y-4">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-zinc-500 text-sm hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
                    <p>&copy; {new Date().getFullYear()} Accolades. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <span>Designed & Engineered by</span>
                        <span className="text-zinc-400 font-bold uppercase tracking-tighter">Aman</span> {/* Your name */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
