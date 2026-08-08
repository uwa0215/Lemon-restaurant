import React, { useState } from 'react';

const GALLERY_IMAGES = [
    {
        id: 1,
        src: '/assets/menu2.jpg',
        title: 'Signature Dish',
        span: 'col-span-1 md:col-span-2 row-span-2'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Cozy Atmosphere',
        span: 'col-span-1 row-span-1'
    },
    {
        id: 3,
        src: '/assets/lemonade3.jpg',
        title: 'Fresh Lemonade',
        span: 'col-span-1 row-span-1'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Our Dining Room',
        span: 'col-span-1 md:col-span-2 row-span-1'
    },
    {
        id: 5,
        src: '/assets/About.jpg',
        title: 'Fresh Ingredients',
        span: 'col-span-1 row-span-2'
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1414235077428-33898b120f5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Culinary Art',
        span: 'col-span-1 md:col-span-1 row-span-1'
    },
    {
        id: 7,
        src: '/assets/menu3.jpg',
        title: 'Delicious Desserts',
        span: 'col-span-1 md:col-span-1 row-span-1'
    }
];

export default function Gallery() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section id="gallery" className="relative py-24 bg-white dark:bg-[#08070d] overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-100/50 dark:bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/50 dark:bg-emerald-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-full px-5 py-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                        <span className="text-amber-600 dark:text-amber-400 font-black text-[10px] uppercase tracking-[0.2em]">Our Atmosphere</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
                        A Glimpse of <span className="text-amber-500 italic">Little Lemon</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
                        Experience the warmth and vibrancy of our restaurant before you even step through the doors. From our fresh ingredients to our cozy dining spaces.
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 md:gap-6 auto-rows-[250px] md:h-[800px]">
                    {GALLERY_IMAGES.map((img) => (
                        <div 
                            key={img.id}
                            className={`relative overflow-hidden rounded-3xl group ${img.span}`}
                            onMouseEnter={() => setHoveredId(img.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <img 
                                src={img.src} 
                                alt={img.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div 
                                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 flex flex-col justify-end p-6 ${
                                    hoveredId === img.id ? 'opacity-100' : 'opacity-0 md:opacity-0 opacity-100'
                                }`}
                            >
                                <h3 className="text-white font-bold font-serif text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    {img.title}
                                </h3>
                                <div className="w-10 h-1 bg-amber-500 mt-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
