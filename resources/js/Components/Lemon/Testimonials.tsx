import React from 'react';

const REVIEWS = [
    {
        id: 1,
        name: 'Sofia Delgado',
        city: 'Manila, Philippines',
        img: '/assets/user1.jpg',
        rating: 5,
        title: 'Absolutely delicious!',
        text: 'The citrus cakes are incredibly moist and flavorful. Coupled with their signature cold-pressed lemon juice, it is an absolute treat! The presentation is beautiful too.'
    },
    {
        id: 2,
        name: 'Mateo Santos',
        city: 'Batangas, Philippines',
        img: '/assets/user2.jpg',
        rating: 5,
        title: 'Unbelievably fresh ingredients',
        text: 'Zesty lemon treats and fresh salads. The environment is extremely clean and welcoming, making every visit a memorable one. I love their booking service.'
    },
    {
        id: 3,
        name: 'Nathaniel Castro',
        city: 'Marikina, Philippines',
        img: '/assets/user3.jpg',
        rating: 5,
        title: 'Perfect balanced sweetness',
        text: 'Tangy and sweet, perfectly balanced. The recipe captures the bright essence of real tree-ripened lemons. Outstanding food quality and polite staff!'
    },
    {
        id: 4,
        name: 'Patricia Lim',
        city: 'Pasay, Philippines',
        img: '/assets/user4.jpg',
        rating: 5,
        title: 'Beat the tropical heat',
        text: 'The best place to beat the tropical heat. Their refreshing lemon juice and desserts are top tier. Highly recommended for couples and families alike!'
    }
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-24 bg-slate-50 dark:bg-[#030712] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-16">
                    <p className="text-amber-600 dark:text-amber-400 font-semibold tracking-widest uppercase text-xs">Guest Experiences</p>
                    <h2 className="text-4xl md:text-5xl font-bold font-serif text-slate-800 dark:text-slate-100 transition-colors">Wall of Praise</h2>
                    <div className="w-12 h-1 bg-amber-500 dark:bg-amber-400 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {REVIEWS.map(item => (
                        <div 
                            key={item.id} 
                            className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-3xl p-8 hover:border-amber-500/30 dark:hover:border-amber-400/20 transition-all duration-300 shadow-xl dark:shadow-2xl relative flex flex-col justify-between overflow-hidden group"
                        >
                            {/* Decorative quote mark */}
                            <div className="absolute top-2 right-6 text-amber-500/10 dark:text-amber-400/10 font-serif text-8xl select-none pointer-events-none group-hover:scale-110 transition-transform duration-500">
                                ”
                            </div>
                            
                            <div className="space-y-4 text-left relative z-10">
                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-1">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 text-amber-500 dark:text-amber-400 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest bg-amber-500/5 dark:bg-amber-400/5 px-2.5 py-1 rounded-full border border-amber-500/10 dark:border-amber-400/10">Verified Visit</span>
                                </div>
                                <h4 className="text-slate-800 dark:text-slate-200 font-bold text-lg font-serif transition-colors">"{item.title}"</h4>
                                <p className="text-slate-700 dark:text-slate-400 text-sm font-semibold dark:font-normal leading-relaxed transition-colors font-sans font-medium">
                                    {item.text}
                                </p>
                            </div>

                            <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-slate-200 dark:border-slate-900/60 transition-colors">
                                <img 
                                    src={item.img} 
                                    alt={item.name} 
                                    className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                                />
                                <div className="text-left">
                                    <span className="block text-slate-800 dark:text-slate-200 font-bold text-sm font-sans transition-colors">{item.name}</span>
                                    <span className="text-slate-600 dark:text-slate-400 text-xs font-semibold dark:font-normal transition-colors">{item.city}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
