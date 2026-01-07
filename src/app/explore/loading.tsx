import { HeroSkeleton, SwimlaneSkeletion } from '@/features/explore/components/Skeletons';

export default function ExploreLoading() {
    return (
        <div className="min-h-screen bg-black pb-20">
            <div className="h-8" />
            <HeroSkeleton />
            <div className="space-y-4">
                <SwimlaneSkeletion />
                <SwimlaneSkeletion />
                <SwimlaneSkeletion />
            </div>
        </div>
    );
}
