/**
 * Loading Component
 * 
 * Global loading state with metallic shimmer effect.
 * Displayed during page transitions.
 */

export default function Loading() {
    return (
        <div className="container mx-auto px-6 py-20">
            {/* Hero skeleton */}
            <div className="max-w-3xl mx-auto text-center mb-16">
                <div className="w-40 h-6 rounded-full shimmer mx-auto mb-6" />
                <div className="w-full h-16 rounded shimmer mb-4" />
                <div className="w-2/3 h-16 rounded shimmer mx-auto mb-8" />
                <div className="w-full max-w-xl h-12 rounded-xl shimmer mx-auto" />
            </div>

            {/* Filter bar skeleton */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="w-24 h-10 rounded-lg shimmer" />
                    ))}
                </div>
                <div className="w-32 h-5 rounded shimmer" />
            </div>

            {/* Grid skeleton */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-xl p-6 glass metallic-border"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg shimmer" />
                                <div className="space-y-2">
                                    <div className="w-20 h-3 rounded shimmer" />
                                    <div className="w-32 h-5 rounded shimmer" />
                                </div>
                            </div>
                            <div className="w-16 h-5 rounded-full shimmer" />
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="w-full h-4 rounded shimmer" />
                            <div className="w-3/4 h-4 rounded shimmer" />
                        </div>

                        <div className="flex gap-2 mb-4">
                            <div className="w-20 h-5 rounded-full shimmer" />
                            <div className="w-16 h-5 rounded-full shimmer" />
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-[var(--color-chrome)]">
                            <div className="w-24 h-4 rounded shimmer" />
                            <div className="w-20 h-8 rounded-lg shimmer" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
