import { Metadata, ResolvingMetadata } from 'next';
import { DetailView } from '@/features/opportunities/component/DetailView';
import { generateOpportunityMetadata } from '@/features/opportunities/utils/seo';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata(
    props: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    return generateOpportunityMetadata(props, parent);
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    return <DetailView id={id} />;
}
