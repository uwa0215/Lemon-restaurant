import React from 'react';
import { ALL_PRODUCTS, ProductItem } from './products';

interface HeroProps {
    setBookState: (state: boolean) => void;
    setSelectedProduct: (product: ProductItem) => void;
}

export default function Hero({ setBookState, setSelectedProduct }: HeroProps) {
    return (
        <section id="hero" className="relative py-24 lg:py-36 overflow-hidden bg-slate-50 dark:bg-[#08070b] border-b border-slate-200/80 dark:border-slate-900/60 transition-colors duration-300 bg-grid-pattern">
            {/* Ambient Glowing Orbs */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-[600px] h-[600px] bg-amber-500/10 dark:bg-amber-400/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/5 dark:bg-amber-400/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-[400px] h-[400px] bg-yellow-500/5 dark:bg-yellow-400/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-6 text-left space-y-8">
                        <div className="inline-flex items-center space-x-2 bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 rounded-full px-5 py-2.5 shadow-sm">
                            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                            <span className="text-amber-600 dark:text-amber-450 font-black text-[10px] uppercase tracking-[0.25em]">Michelin-Starred Inspiration</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-light font-serif text-slate-900 dark:text-white leading-[1.1] transition-colors">
                            Experience <br />
                            <span className="font-serif font-bold text-slate-900 dark:text-white">Artisanal Citrus</span> <br />
                            <span className="text-amber-500 dark:text-amber-400 font-serif font-black italic">Gastronomy.</span>
                        </h1>
                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium dark:font-light max-w-xl transition-colors">
                            Little Lemon brings the refreshing, tangy-sweet culinary spirit of the Philippines straight to your palate. Established in 1995, our menu is a modern tribute to premium hand-picked tropical fruits and artisan techniques.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 pt-2">
                            <button 
                                onClick={() => setBookState(true)} 
                                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-yellow-450 to-amber-500 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-bold px-10 py-5 rounded-full shadow-xl shadow-amber-500/20 hover:shadow-amber-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 text-xs uppercase tracking-widest text-center"
                            >
                                Book A Table
                            </button>
                            <a 
                                href="#menu" 
                                className="w-full sm:w-auto border border-slate-300 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 text-slate-600 dark:text-slate-400 font-bold px-10 py-5 rounded-full hover:-translate-y-0.5 transition-all duration-300 text-xs uppercase tracking-widest flex items-center justify-center text-center"
                            >
                                Explore Menu
                            </a>
                        </div>

                        {/* Floating Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-200/60 dark:border-slate-900/60 max-w-lg">
                            {[
                                { label: 'Organic Sourcing', value: '100%' },
                                { label: 'Daily Fresh Squeezed', value: 'Fresh' },
                                { label: 'Michelin Guide Recs', value: 'A+' },
                            ].map(st => (
                                <div key={st.label} className="text-left space-y-1">
                                    <span className="block text-slate-900 dark:text-white font-bold text-2xl font-serif">{st.value}</span>
                                    <span className="block text-slate-400 text-[10px] tracking-widest uppercase font-bold">{st.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-6 relative flex justify-center items-center">
                        <div className="relative w-full max-w-lg aspect-square">
                            {/* Honey Lemon Brew (ID 101) */}
                            <div 
                                onClick={() => {
                                    const prod = ALL_PRODUCTS.find(p => p.id === 101);
                                    if (prod) setSelectedProduct(prod);
                                }}
                                className="absolute top-0 right-4 w-[75%] h-[75%] rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-3 shadow-2xl z-20 hover:scale-102 hover:border-amber-500/55 dark:hover:border-amber-400/55 transition-all duration-500 cursor-pointer overflow-hidden group/item1"
                            >
                                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                    <img src="/assets/lemon.jfif" alt="Lemon Juice" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-[#030712]/45 opacity-0 group-hover/item1:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white font-black text-[10px] tracking-widest uppercase py-2.5 px-5 rounded-full shadow-lg border border-white/20">View Recipe</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Classic Lemonade (ID 1) */}
                            <div 
                                onClick={() => {
                                    const prod = ALL_PRODUCTS.find(p => p.id === 1);
                                    if (prod) setSelectedProduct(prod);
                                }}
                                className="absolute bottom-4 left-4 w-[60%] h-[60%] rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-2 shadow-2xl z-10 hover:scale-105 hover:border-amber-500/55 dark:hover:border-amber-400/55 transition-all duration-500 cursor-pointer overflow-hidden group/item2"
                            >
                                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                    <img src="/assets/lemonade1.jpg" alt="Signature Drink" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-[#030712]/45 opacity-0 group-hover/item2:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white font-black text-[10px] tracking-widest uppercase py-2 px-4.5 rounded-full shadow-lg border border-white/20">View Details</span>
                                    </div>
                                </div>
                            </div>
                            {/* Floating Card */}
                            <div className="absolute bottom-10 right-[-10px] md:bottom-20 md:right-[-10px] bg-white/95 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-2xl z-30 flex items-center space-x-3 hover:translate-x-[-5px] transition-transform duration-300 scale-90 md:scale-100">
                                <div className="p-2.5 bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/20 rounded-xl">
                                    <span className="text-amber-600 dark:text-amber-400 text-lg">🍋</span>
                                </div>
                                <div>
                                    <span className="block text-slate-900 dark:text-slate-100 font-bold text-sm transition-colors">Best Citrus drink</span>
                                    <span className="text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold font-sans">Award Winner 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
