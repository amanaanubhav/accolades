/**
 * Error Component
 * 
 * Global error boundary with retry functionality.
 * Displayed when an unhandled error occurs.
 */

'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="container mx-auto px-6 py-20">
            <div className="max-w-md mx-auto text-center">
                {/* Error icon */}
                <div className="w-24 h-24 rounded-full bg-[rgba(255,59,48,0.1)] flex items-center justify-center mx-auto mb-8">
                    <svg
                        className="w-12 h-12 text-[var(--color-neon-red)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                {/* Error message */}
                <h1 className="text-2xl font-bold text-[var(--color-platinum)] mb-4">
                    Something went wrong
                </h1>
                <p className="text-[var(--color-silver)] mb-8">
                    We encountered an unexpected error. Our team has been notified and is
                    working on a fix.
                </p>

                {/* Error details (development only) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mb-8 p-4 rounded-lg bg-[var(--color-gunmetal)] text-left overflow-auto">
                        <p className="text-sm text-[var(--color-neon-red)] font-mono">
                            {error.message}
                        </p>
                        {error.digest && (
                            <p className="text-xs text-[var(--color-silver)] mt-2">
                                Digest: {error.digest}
                            </p>
                        )}
                    </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={reset}>Try Again</Button>
                    <Button variant="secondary" onClick={() => (window.location.href = '/')}>
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    );
}
