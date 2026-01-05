/**
 * Application Constants
 * 
 * Static data for categories, filter options, and design tokens.
 */

import type { CategoryMeta, Opportunity } from '@/types';

/**
 * Category definitions with metallic color schemes
 * Each category has distinct neon accent colors
 */
export const CATEGORIES: CategoryMeta[] = [
    {
        id: 'hackathon',
        label: 'Hackathon',
        color: '#00F5FF', // Cyan neon
        bgColor: 'rgba(0, 245, 255, 0.15)',
        borderColor: 'rgba(0, 245, 255, 0.5)',
    },
    {
        id: 'internship',
        label: 'Internship',
        color: '#FFD700', // Gold
        bgColor: 'rgba(255, 215, 0, 0.15)',
        borderColor: 'rgba(255, 215, 0, 0.5)',
    },
    {
        id: 'challenge',
        label: 'Challenge',
        color: '#FF00FF', // Magenta
        bgColor: 'rgba(255, 0, 255, 0.15)',
        borderColor: 'rgba(255, 0, 255, 0.5)',
    },
];

/**
 * Get category metadata by ID
 */
export function getCategoryMeta(categoryId: string): CategoryMeta | undefined {
    return CATEGORIES.find((cat) => cat.id === categoryId);
}

/**
 * Mock opportunities for development and fallback
 */
export const MOCK_OPPORTUNITIES: Opportunity[] = [
    {
        id: '1',
        title: 'HackMIT 2026',
        organization: 'MIT',
        category: 'hackathon',
        deadline: '2026-01-08', // 3 days from now - Critical
        description: 'Join 1000+ hackers for a weekend of innovation at MIT. Build something amazing!',
        url: 'https://hackmit.org',
        tags: ['AI', 'Web3', 'Hardware'],
        location: 'Cambridge, MA',
    },
    {
        id: '2',
        title: 'Google STEP Internship',
        organization: 'Google',
        category: 'internship',
        deadline: '2026-01-10', // 5 days - Closing Soon
        description: 'Summer internship for first and second year CS students. Work on impactful projects.',
        url: 'https://careers.google.com',
        tags: ['Software Engineering', 'Paid', 'Remote'],
        location: 'Mountain View, CA',
        isPaid: true,
    },
    {
        id: '3',
        title: 'Meta Hacker Cup',
        organization: 'Meta',
        category: 'challenge',
        deadline: '2026-01-20', // 15 days - Open
        description: 'Annual competitive programming competition with prizes up to $20,000.',
        url: 'https://www.facebook.com/codingcompetitions/hacker-cup',
        tags: ['Algorithms', 'Competitive Programming', 'Prizes'],
    },
    {
        id: '4',
        title: 'TreeHacks 2026',
        organization: 'Stanford University',
        category: 'hackathon',
        deadline: '2026-01-12', // 7 days - Closing Soon
        description: 'Stanford\'s flagship hackathon. 36 hours of building and hacking.',
        url: 'https://treehacks.com',
        tags: ['Health', 'Sustainability', 'Education'],
        location: 'Stanford, CA',
    },
    {
        id: '5',
        title: 'Microsoft Explore Program',
        organization: 'Microsoft',
        category: 'internship',
        deadline: '2026-02-01', // 27 days - Open
        description: 'Rotational program for freshmen and sophomores interested in PM, Design, or Engineering.',
        url: 'https://careers.microsoft.com',
        tags: ['Product Management', 'Design', 'Engineering'],
        location: 'Redmond, WA',
        isPaid: true,
    },
    {
        id: '6',
        title: 'AWS DeepRacer Challenge',
        organization: 'Amazon Web Services',
        category: 'challenge',
        deadline: '2026-01-07', // 2 days - Critical
        description: 'Build and race autonomous 1/18th scale cars using reinforcement learning.',
        url: 'https://aws.amazon.com/deepracer',
        tags: ['Machine Learning', 'Autonomous Vehicles', 'AWS'],
    },
];
