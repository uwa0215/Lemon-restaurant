import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-[#030712] py-16 border-t border-slate-900 text-slate-500 text-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center space-x-3.5">
                        <div className="h-9 w-9 flex items-center justify-center bg-slate-900 border border-slate-800/80 rounded-xl p-1 shadow-inner">
                            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <path className="text-amber-500 dark:text-amber-400 fill-amber-500/20" d="M12 3a9 9 0 0 0-9 9c0 1.25.26 2.44.73 3.52L3 21l5.48-.73A9 9 0 1 0 12 3z" />
                                <path className="text-emerald-500 dark:text-emerald-400 fill-emerald-500/20" d="M14 3c1.5-1.5 3.5-2 5-2s1 2.5-.5 4c-1.5 1.5-3.5 2-5 2s-1-2.5.5-4z" />
                            </svg>
                        </div>
                        <span className="text-slate-300 font-serif font-black tracking-[0.2em] text-base uppercase">LITTLE<span className="text-amber-400 font-sans font-light">LEMON</span></span>
                    </div>
                    <p className="text-center md:text-left text-xs font-light tracking-wide text-slate-500">
                        &copy; 2026 Little Lemon Restaurant. All Rights Reserved. Crafted with care in Batangas, Philippines by <span className="text-amber-500 font-bold hover:text-amber-450 transition-colors">Joshua Macasadia</span>.
                    </p>
                </div>
            </div>
        </footer>
    );
}
