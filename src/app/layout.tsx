/**
 * Opp-Portal Root Layout
 * 
 * Global layout with metallic theme, fonts, and navigation.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Opp-Portal | Student Opportunities Dashboard',
    description:
        'Discover hackathons, internships, and hiring challenges. A unified platform for student opportunities.',
    keywords: ['hackathons', 'internships', 'coding challenges', 'student opportunities'],
    authors: [{ name: 'Opp-Portal' }],
    openGraph: {
        title: 'Opp-Portal | Student Opportunities Dashboard',
        description:
            'Discover hackathons, internships, and hiring challenges. A unified platform for student opportunities.',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${inter.variable} font-sans antialiased bg-[var(--color-void)] text-[var(--color-platinum)] min-h-screen`}
            >
                {/* Navigation */}
                <Navbar />

                {/* Main content with top padding for fixed navbar */}
                <main className="pt-24">{children}</main>

                {/* Footer */}
                <Footer />
            </body>
        </html>
    );
}
