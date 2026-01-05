import { Metadata } from 'next';
import SubmitForm from '@/features/submit/SubmitForm';

export const metadata: Metadata = {
    title: 'Submit Opportunity | Accolades',
    description: 'Submit a new hackathon, internship, or competition for verification.',
};

export default function Page() {
    return (
        <main className="min-h-screen bg-black text-zinc-100 py-20 px-6">
            <div className="max-w-3xl mx-auto mb-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent mb-4">
                    Submit an Opportunity
                </h1>
                <p className="text-zinc-400">
                    Know of a great opportunity? Share it with the community.
                    All submissions are reviewed within 24 hours.
                </p>
            </div>
            <SubmitForm />
        </main>
    );
}
