/**
 * Supabase Client Singleton
 * 
 * Initializes and exports a single Supabase client instance
 * for use throughout the application.
 * Gracefully handles missing environment variables.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables for Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Check if Supabase is properly configured
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Supabase client singleton (null if not configured)
 * Used for all database operations
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
    ? createClient(supabaseUrl!, supabaseAnonKey!, {
        auth: {
            persistSession: false, // Disable session persistence for SSR compatibility
        },
    })
    : null;

// Log warning if not configured (only in development)
if (!isSupabaseConfigured && typeof window !== 'undefined') {
    console.info(
        '📦 Supabase not configured. Using mock data. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to connect to your database.'
    );
}
