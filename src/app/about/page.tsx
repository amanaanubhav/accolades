import AboutPage from '@/features/about/AboutPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About | Accolades',
    description: 'Learn more about the mission behind the Accolades Opportunity Portal.',
};

export default function Page() {
    return <AboutPage />;
}
