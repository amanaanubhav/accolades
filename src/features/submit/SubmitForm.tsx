'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createClient } from '@/utils/supabase/client';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

// 1. Define Validation Schema
const formSchema = z.object({
    title: z.string().min(5, "Title is too short"),
    organization: z.string().min(2, "Organization name required"),
    application_link: z.string().url("Invalid URL"),
    category: z.string().min(1, "Select a category"),
    mode: z.enum(['Virtual', 'Hybrid', 'On-site']),
    brief_overview: z.string().max(200, "Keep it under 200 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function SubmitForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const supabase = createClient();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from('opportunities')
                .insert([{
                    ...data,
                    // Map form fields to DB columns if names differ
                    apply_link: data.application_link,
                    // DB might expect 'cost_type' or other required fields? 
                    // Based on previous schema viewing, 'cost_type' might be required or default?
                    // Let's assume defaults or allow nulls for now based on snippet, 
                    // but I recall 'cost_type' being used in filters.
                    // I will add a default cost_type 'Free' just in case or assume DB handles it.
                    // The snippet provided by user didn't include it in schema but standard insert.
                    // I'll stick to the snippet provided by the user but map 'application_link' to 'apply_link' 
                    // because 'apply_link' is the column name I saw in page.tsx ('apply_link').
                    // Wait, snippet had 'application_link' in schema. DB has 'apply_link'. 
                    // I should probably map it.
                    // Also 'is_verified': false.
                    is_verified: false,
                    created_at: new Date().toISOString()
                }])
                .select();

            // Note: The user snippet used .insert([{ ...data }]) which implies data keys match columns.
            // User snippet: application_link. DB: apply_link?
            // Let's check page.tsx again. Step 136: `apply_link`.
            // So I MUST map application_link to apply_link.

            if (error) throw error;

            setIsSuccess(true);
            reset();
        } catch (err) {
            console.error("Submission failed:", err);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center p-12 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Submission Received!</h2>
                <p className="text-zinc-400 mb-6">Our team will verify the details before it goes live.</p>
                <button onClick={() => setIsSuccess(false)} className="px-6 py-2 bg-zinc-100 text-zinc-900 rounded-lg font-bold">Submit Another</button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-8 bg-zinc-900/30 backdrop-blur-md rounded-2xl border border-zinc-800">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Opportunity Title</label>
                    <input {...register('title')} className="w-full bg-black border border-zinc-800 rounded-lg p-3 focus:border-zinc-500 transition-all outline-none" placeholder="e.g. Google Summer of Code" />
                    {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
                </div>

                {/* Organization */}
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Organization</label>
                    <input {...register('organization')} className="w-full bg-black border border-zinc-800 rounded-lg p-3 focus:border-zinc-500 transition-all outline-none" placeholder="e.g. Google" />
                    {errors.organization && <span className="text-xs text-red-500">{errors.organization.message}</span>}
                </div>
            </div>

            {/* Link */}
            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Application Link</label>
                <input {...register('application_link')} className="w-full bg-black border border-zinc-800 rounded-lg p-3 focus:border-zinc-500 transition-all outline-none" placeholder="https://..." />
                {errors.application_link && <span className="text-xs text-red-500">{errors.application_link.message}</span>}
            </div>

            {/* Mode & Category */}
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Mode</label>
                    <select {...register('mode')} className="w-full bg-black border border-zinc-800 rounded-lg p-3 outline-none appearance-none cursor-pointer text-zinc-300">
                        <option value="Virtual">Virtual</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Category</label>
                    <input {...register('category')} className="w-full bg-black border border-zinc-800 rounded-lg p-3 outline-none" placeholder="e.g. Hackathon" />
                    {errors.category && <span className="text-xs text-red-500">{errors.category.message}</span>}
                </div>
            </div>

            {/* Overview */}
            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Brief Overview</label>
                <textarea {...register('brief_overview')} rows={3} className="w-full bg-black border border-zinc-800 rounded-lg p-3 outline-none" placeholder="What makes this opportunity great?" />
                {errors.brief_overview && <span className="text-xs text-red-500">{errors.brief_overview.message}</span>}
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-gradient-to-r from-zinc-100 to-zinc-300 text-zinc-900 font-bold rounded-xl flex items-center justify-center gap-2 hover:from-white hover:to-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Submitting...' : <><Send className="w-4 h-4" /> Send for Verification</>}
            </button>
        </form>
    );
}
