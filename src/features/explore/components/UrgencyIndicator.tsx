/**
 * UrgencyIndicator Component
 * 
 * Visual urgency badge using the useUrgency hook.
 * Displays days remaining with color-coded status.
 */

'use client';

import React from 'react';
import { useUrgency } from '@/hooks/useUrgency';
import { UrgencyBadge } from '@/components/ui/Badge';

interface UrgencyIndicatorProps {
    deadline: string;
    className?: string;
}

/**
 * Urgency Indicator Component
 * 
 * Calculates and displays urgency status based on deadline:
 * - Critical (< 3 days): Red with pulse animation
 * - Closing Soon (< 7 days): Amber
 * - Open (≥ 7 days): Green
 */
export function UrgencyIndicator({ deadline, className }: UrgencyIndicatorProps) {
    const urgency = useUrgency(deadline);

    return (
        <UrgencyBadge
            status={urgency.status}
            daysRemaining={urgency.daysRemaining}
            className={className}
        />
    );
}
