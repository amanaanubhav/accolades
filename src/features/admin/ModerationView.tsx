'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Check, Trash2, ExternalLink, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModerationView({ initialData }: { initialData: any[] }) {
    const [items, setItems] = useState(initialData);
    const supabase = createClient();

    const handleApprove = async (id: string) => {
        const { error } = await supabase
            .from('opportunities')
            .update({ is_verified: true })
            .eq('id', id);

        if (!error) setItems(items.filter(item => item.id !== id));
    };

    const handleReject = async (id: string) => {
        const { error } = await supabase
            .from('opportunities')
            .delete()
            .eq('id', id);

        if (!error) setItems(items.filter(item => item.id !== id));
    };

    return (
        <main className="max-w-6xl mx-auto px-6 py-12">
            <header className="mb-12 border-b border-zinc-800 pb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Moderation Queue</h1>
                <p className="text-zinc-500">There are {items.length} opportunities pending verification.</p>
            </header>

            <div className="space-y-4">
                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center gap-6 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md"
                        >
                            {/* Info Column */}
                            <div className="flex-grow min-w-0">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="text-xl font-bold text-zinc-100 truncate">{item.title}</h3>
                                    <span className="px-2 py-0.5 rounded text-[10px] bg-zinc-800 text-zinc-400 uppercase font-bold tracking-widest">
                                        {item.category}
                                    </span>
                                </div>
                                <p className="text-sm text-zinc-500 mb-2">{item.organizations?.name}</p>
                                <div className="flex items-center gap-4 text-xs text-zinc-600">
                                    <span className="flex items-center gap-1"><Clock size={12} /> {new Date(item.created_at).toLocaleDateString()}</span>
                                    <a href={item.apply_link} target="_blank" className="flex items-center gap-1 text-blue-500 hover:underline"><ExternalLink size={12} /> View Link</a>
                                </div>
                            </div>

                            {/* Actions Column */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleReject(item.id)}
                                    className="p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                    title="Reject and Delete"
                                >
                                    <Trash2 size={20} />
                                </button>
                                <button
                                    onClick={() => handleApprove(item.id)}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
                                >
                                    <Check size={20} /> Approve
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {items.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-zinc-900 rounded-3xl">
                        <p className="text-zinc-600">The queue is empty. Good work, Aman!</p>
                    </div>
                )}
            </div>
        </main>
    );
}
