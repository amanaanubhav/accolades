/**
 * Supabase Client Singleton
 *
 * Initializes and exports a single Supabase client instance
 * for use throughout the application.
 * Gracefully handles missing environment variables.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/supabase/types'; // We will generate this next

// Environment variables for Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Check if Supabase is properly configured
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

// Typed client for auto-completion and error checking
// Note: using ! asserts these are defined, aligning with user request.
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// Log warning if not configured (only in development)
if (!isSupabaseConfigured && typeof window !== 'undefined') {
    console.info(
        '📦 Supabase not configured. Using mock data. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to connect to your database.'
    );
}
