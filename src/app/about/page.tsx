import AboutPage from '@/features/about/AboutPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Accolades | The Vision of Aman Anubhav',
    description: 'Learn more about the mission behind the Accolades Opportunity Portal. Founded by Aman Anubhav, our goal is to connect students with life-changing opportunities like hackathons, internships, and research programs.',
};

export default function Page() {
    return <AboutPage />;
}
