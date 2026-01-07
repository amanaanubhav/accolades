/**
 * Opp-Portal Type Definitions
 * 
 * Core TypeScript interfaces for the opportunity platform.
 * Enforces strict typing throughout the application.
 */

/**
 * Category types for opportunities
 * Each category has an associated color scheme in the design system
 */
export type OpportunityCategory = 'hackathon' | 'internship' | 'challenge';

/**
 * Urgency status based on deadline proximity
 */
export type UrgencyStatus = 'critical' | 'closing-soon' | 'open';

/**
 * Urgency calculation result with visual properties
 */
export interface UrgencyInfo {
  status: UrgencyStatus;
  label: string;
  daysRemaining: number;
  color: string;
  bgColor: string;
  pulse: boolean;
}

/**
 * Core Opportunity interface
 * Represents a single opportunity (hackathon, internship, or challenge)
 */
export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: OpportunityCategory;
  deadline: string; // ISO date string
  end_date: string; // Supabase field
  description: string;
  brief_overview?: string;
  url: string;
  apply_link?: string;
  banner_url?: string;
  tags: string[];
  location?: string;
  isPaid?: boolean;
  createdAt?: string;
  mode?: string; // e.g., 'online', 'in-person', 'hybrid'
  slug?: string;
}

/**
 * Filter mode types
 */
export type FilterMode = 'all' | 'Virtual' | 'Hybrid' | 'On-site';

/**
 * Filter cost types
 */
export type FilterCost = 'all' | 'Free' | 'Paid';

/**
 * Filter state for the opportunity grid
 */
export interface FilterState {
  category: OpportunityCategory | 'all';
  search: string;
  showExpired: boolean;
  mode: FilterMode;
  cost: FilterCost;
}

/**
 * Category metadata with associated colors
 */
export interface CategoryMeta {
  id: OpportunityCategory;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}
