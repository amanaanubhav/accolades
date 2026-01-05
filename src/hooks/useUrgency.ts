/**
 * useUrgency Hook
 * 
 * Calculates urgency status based on deadline proximity.
 * Returns visual properties for the urgency indicator.
 */

import { useMemo } from 'react';
import type { UrgencyInfo, UrgencyStatus } from '@/types';
import { getDaysRemaining } from '@/lib/utils';

/**
 * Urgency thresholds and visual configurations
 */
const URGENCY_CONFIG: Record<UrgencyStatus, Omit<UrgencyInfo, 'daysRemaining'>> = {
    critical: {
        status: 'critical',
        label: 'Critical',
        color: '#FF3B30', // Bright red
        bgColor: 'rgba(255, 59, 48, 0.2)',
        pulse: true,
    },
    'closing-soon': {
        status: 'closing-soon',
        label: 'Closing Soon',
        color: '#FF9500', // Amber
        bgColor: 'rgba(255, 149, 0, 0.2)',
        pulse: false,
    },
    open: {
        status: 'open',
        label: 'Open',
        color: '#30D158', // Metallic green
        bgColor: 'rgba(48, 209, 88, 0.2)',
        pulse: false,
    },
};

/**
 * Determine urgency status based on days remaining
 * 
 * @param daysRemaining - Number of days until deadline
 * @returns UrgencyStatus
 */
function getUrgencyStatus(daysRemaining: number): UrgencyStatus {
    if (daysRemaining < 0) return 'critical'; // Expired
    if (daysRemaining < 3) return 'critical';
    if (daysRemaining < 7) return 'closing-soon';
    return 'open';
}

/**
 * Hook to calculate urgency information for a deadline
 * 
 * @param deadline - ISO date string of the deadline
 * @returns UrgencyInfo object with status, label, colors, and animation flag
 * 
 * @example
 * ```tsx
 * const urgency = useUrgency('2026-01-08');
 * // Returns: { status: 'critical', label: 'Critical', daysRemaining: 3, ... }
 * ```
 */
export function useUrgency(deadline: string): UrgencyInfo {
    return useMemo(() => {
        const daysRemaining = getDaysRemaining(deadline);
        const status = getUrgencyStatus(daysRemaining);
        const config = URGENCY_CONFIG[status];

        return {
            ...config,
            daysRemaining,
        };
    }, [deadline]);
}

/**
 * Standalone utility for urgency calculation (non-hook version)
 * Use this in server components or outside React context
 */
export function calculateUrgency(deadline: string): UrgencyInfo {
    const daysRemaining = getDaysRemaining(deadline);
    const status = getUrgencyStatus(daysRemaining);
    const config = URGENCY_CONFIG[status];

    return {
        ...config,
        daysRemaining,
    };
}
