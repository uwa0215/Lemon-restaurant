import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, ProductItem } from './products';

/* ── Stars Sub-Component (Read Only) ─────────────────────── */
function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex items-center space-x-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.floor(rating) ? 'text-amber-400' : 'text-slate-300 dark:text-slate-700'} fill-current`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
            ))}
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1 font-bold">{rating}</span>
        </div>
    );
}

function getDietaryBadges(id: number): string[] {
    const map: Record<number, string[]> = {
        1: ['Organic', 'Gluten-Free'],
        2: ['Chef Special', 'Organic'],
        3: ['Organic', 'Vegan'],
        4: ['Baked Fresh', 'Best Seller'],
        5: ['Baked Fresh', 'Staff Pick'],
        6: ['Local Catch', 'Seafood'],
        7: ['Chef Special', 'Spicy'],
        8: ['Keto', 'Seafood'],
        9: ['Superfood', 'Vegan'],
    };
    return map[id] || ['House Special'];
}

function getBadgeColor(badge: string): string {
    if (badge === 'Organic' || badge === 'Vegan') return 'bg-emerald-500';
    if (badge === 'Chef Special' || badge === 'Best Seller') return 'bg-amber-500';
    if (badge === 'Spicy') return 'bg-rose-500';
    if (badge === 'Seafood' || badge === 'Local Catch') return 'bg-blue-500';
    return 'bg-amber-400';
}

interface MenuProps {
    setSelectedProduct: (product: ProductItem) => void;
}

export default function Menu({ setSelectedProduct }: MenuProps) {
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('Featured');
    
    const categories = ['All', 'Beverages', 'Pastries', 'Appetizers'];

    const filteredAndSortedItems = useMemo(() => {
        let items = [...MENU_ITEMS];

        // Filter by category
        if (activeFilter !== 'All') {
            items = items.filter(item => item.category === activeFilter);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            items = items.filter(item => 
                item.name.toLowerCase().includes(query) || 
                item.desc.toLowerCase().includes(query)
            );
        }

        // Sort items
        switch (sortOption) {
            case 'Price: Low to High':
                items.sort((a, b) => a.priceNum - b.priceNum);
                break;
            case 'Price: High to Low':
                items.sort((a, b) => b.priceNum - a.priceNum);
                break;
            case 'Highest Rated':
                items.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Featured/Default order
                break;
        }

        return items;
    }, [activeFilter, searchQuery, sortOption]);

    return (
        <section id="menu" className="py-24 bg-white dark:bg-[#08070b] border-t border-slate-200/80 dark:border-slate-900/60 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header row */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
                    <div className="space-y-4 text-left">
                        <p className="text-amber-600 dark:text-amber-400 font-semibold tracking-widest uppercase text-xs">Curated Selections</p>
                        <h2 className="text-4xl md:text-5xl font-bold font-serif text-slate-950 dark:text-slate-100 transition-colors">Signature Creations</h2>
                        <div className="w-12 h-1 bg-amber-500 dark:bg-amber-400 rounded-full"></div>
                    </div>

                    <div className="flex flex-col space-y-4 lg:w-1/2">
                        {/* Search and Sort Row */}
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                            <div className="relative flex-1">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input 
                                    type="text" 
                                    placeholder="Search for dishes, ingredients..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                                />
                            </div>
                            <select 
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-4 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 cursor-pointer appearance-none"
                            >
                                <option>Featured</option>
                                <option>Highest Rated</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                        
                        {/* Category Tabs */}
                        <div className="flex space-x-2 md:space-x-3 flex-wrap gap-y-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 border ${
                                        activeFilter === cat
                                            ? 'bg-amber-500 dark:bg-amber-400 border-amber-500 dark:border-amber-400 text-slate-950 shadow-xl shadow-amber-500/20'
                                            : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedItems.length === 0 ? (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4">
                            <span className="text-6xl animate-bounce">🔍</span>
                            <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white">No dishes found</h3>
                            <p className="text-slate-500 text-sm max-w-sm">We couldn't find any dishes matching "{searchQuery}". Try adjusting your search or filters.</p>
                            <button onClick={() => { setSearchQuery(''); setActiveFilter('All'); }} className="mt-4 text-amber-500 font-bold text-sm hover:underline">Clear all filters</button>
                        </div>
                    ) : (
                        filteredAndSortedItems.map(item => (
                        <div 
                            key={`${activeFilter}-${item.id}`} 
                            onClick={() => setSelectedProduct(item)}
                            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-3xl overflow-hidden group hover:border-amber-500/40 dark:hover:border-amber-400/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col h-full shadow-lg dark:shadow-2xl cursor-pointer relative animate-fade-in-up"
                        >
                            {/* Image side */}
                            <div className="relative overflow-hidden h-64">
                                <img 
                                    src={item.img} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 dark:brightness-90 group-hover:brightness-100" 
                                />
                                <div className="absolute inset-0 bg-[#030712]/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest px-5 py-2.5 rounded-full shadow-xl border border-white/20 flex items-center space-x-2 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span>View Details</span>
                                    </div>
                                </div>
                                <div className="absolute top-4 left-4 bg-[#030712]/60 backdrop-blur-md border border-white/10 text-white font-black px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider shadow-lg">
                                    {item.tag}
                                </div>
                            </div>
                            
                            {/* Card text and info */}
                            <div className="p-6 flex flex-col justify-between flex-grow space-y-6">
                                <div className="space-y-3">
                                    {/* Dietary indicators */}
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {getDietaryBadges(item.id).map(badge => (
                                            <span key={badge} className="inline-flex items-center text-[9px] tracking-wider uppercase font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 px-2 py-0.5 rounded-full">
                                                <span className={`w-1 h-1 rounded-full mr-1.5 ${getBadgeColor(badge)}`} />
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300 font-serif leading-tight flex-1 pr-3">{item.name}</h3>
                                        <span className="text-lg font-black text-amber-600 dark:text-amber-400 font-sans flex-shrink-0">{item.price}</span>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">{item.desc}</p>
                                </div>
                                <div className="flex items-center justify-between pt-1 border-t border-slate-200/40 dark:border-slate-900/60">
                                    <Stars rating={item.rating} />
                                    <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-300">Order Now →</span>
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
            </div>
        </section>
    );
}
