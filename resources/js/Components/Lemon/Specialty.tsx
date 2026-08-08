import React from 'react';
import { SPECIALTIES, ProductItem } from './products';

/* ── Stars Sub-Component (Read Only) ─────────────────────── */
function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex items-center space-x-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.floor(rating) ? 'text-amber-405' : 'text-slate-300 dark:text-slate-700'} fill-current`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
            ))}
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1 font-bold">{rating}</span>
        </div>
    );
}

function getDietaryBadges(id: number): string[] {
    const map: Record<number, string[]> = {
        6: ['Local Catch', 'Seafood'],
        7: ['Chef Special', 'Spicy'],
        8: ['Keto', 'Seafood'],
        9: ['Superfood', 'Vegan'],
    };
    return map[id] || ['House Special'];
}

function getBadgeColor(badge: string): string {
    if (badge === 'Vegan') return 'bg-emerald-500';
    if (badge === 'Chef Special') return 'bg-amber-500';
    if (badge === 'Spicy') return 'bg-rose-500';
    if (badge === 'Seafood' || badge === 'Local Catch') return 'bg-blue-500';
    return 'bg-amber-400';
}

interface SpecialtyProps {
    setSelectedProduct: (product: ProductItem) => void;
}

export default function Specialty({ setSelectedProduct }: SpecialtyProps) {
    const handleScrollToMenu = () => {
        const el = document.getElementById('menu');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section id="specialty" className="py-16 md:py-24 bg-white dark:bg-[#08070b] border-t border-slate-200/80 dark:border-slate-900/60 transition-colors duration-300 bg-grid-pattern">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center space-x-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-full px-5 py-2.5">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                        <span className="text-amber-600 dark:text-amber-400 font-black text-[10px] uppercase tracking-[0.2em]">Artisan Culinary</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-slate-100 transition-colors">House Specialties</h2>
                    <div className="w-12 h-1 bg-amber-500 dark:bg-amber-400 mx-auto rounded-full" />
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto leading-relaxed">Click any card to explore the full culinary story, ingredients, and order options.</p>
                </div>

                {/* Specialties Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {SPECIALTIES.map(item => (
                        <div 
                            key={item.id}
                            onClick={() => setSelectedProduct(item)}
                            className="group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 hover:border-amber-500/40 dark:hover:border-amber-400/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 shadow-lg dark:shadow-2xl flex flex-col h-full cursor-pointer animate-fade-in-up"
                        >
                            {/* Image side with hover overlay */}
                            <div className="relative overflow-hidden rounded-t-3xl h-56 w-full">
                                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95 dark:brightness-90" />
                                <div className="absolute inset-0 bg-[#030712]/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-slate-900 dark:text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-full shadow-xl border border-white/20 flex items-center space-x-1.5 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span>View Details</span>
                                    </div>
                                </div>
                                <div className="absolute top-3 left-3 bg-[#030712]/60 backdrop-blur-md border border-white/10 text-white font-black px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider shadow-lg">
                                    {item.tag}
                                </div>
                            </div>
                            
                            {/* Title & description */}
                            <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                                <div className="space-y-3">
                                    {/* Dietary indicators */}
                                    <div className="flex flex-wrap gap-1">
                                        {getDietaryBadges(item.id).map(badge => (
                                            <span key={badge} className="inline-flex items-center text-[8px] tracking-wider uppercase font-black text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 px-2 py-0.5 rounded-full">
                                                <span className={`w-1 h-1 rounded-full mr-1 ${getBadgeColor(badge)}`} />
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-start justify-between">
                                        <h4 className="text-slate-800 dark:text-slate-200 font-serif font-bold text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300 flex-1 pr-2 leading-tight">{item.name}</h4>
                                        <span className="text-amber-500 dark:text-amber-400 font-black text-sm flex-shrink-0">{item.price}</span>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">{item.desc}</p>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-slate-200/40 dark:border-slate-900/60">
                                    <Stars rating={item.rating} />
                                    <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-300">Details →</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View Full Collection redirected button */}
                <div className="text-center">
                    <button 
                        onClick={handleScrollToMenu}
                        className="bg-transparent border-2 border-slate-300 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 text-slate-700 dark:text-slate-350 font-bold px-10 py-5 rounded-full hover:scale-105 transition-all duration-300 text-xs uppercase tracking-widest inline-flex items-center space-x-3 hover:shadow-lg hover:shadow-amber-500/10"
                    >
                        <span>View Full Collection</span>
                        <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
