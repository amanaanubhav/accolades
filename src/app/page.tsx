import HomePage from '@/features/home/HomePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Accolades | Discover Student Opportunities by Aman Anubhav',
    description: 'Accolades is a premier opportunity discovery portal created by Aman Anubhav. Find your next hackathon, internship, fellowship, or summer research program here.',
};

export default function Page() {
    return <HomePage />;
}
