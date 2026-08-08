import React from 'react';

interface AboutProps {
    setPlayState: (state: boolean) => void;
}

export default function About({ setPlayState }: AboutProps) {
    return (
        <section id="about" className="py-16 md:py-24 bg-slate-50 dark:bg-[#030712] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
                    <div className="lg:col-span-6 relative flex justify-center items-center">
                        <div className="absolute w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -top-6 -left-6 pointer-events-none"></div>
                        <div className="relative group overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 p-3 shadow-2xl w-full max-w-md transition-all duration-300 animate-fade-in-up">
                            <div className="relative rounded-2xl overflow-hidden h-[500px]">
                                <img src="/assets/About.jpg" alt="About Little Lemon" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 dark:brightness-75" />
                                <div className="absolute inset-0 bg-[#030712]/30 dark:bg-[#030712]/40 flex items-center justify-center">
                                    <div className="relative flex items-center justify-center">
                                        <span className="absolute animate-ping inline-flex h-20 w-20 rounded-full bg-amber-500/30 dark:bg-amber-400/30 opacity-75 pointer-events-none"></span>
                                        <button 
                                            onClick={() => setPlayState(true)}
                                            className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-400 dark:hover:bg-amber-500 text-slate-950 p-6 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative z-10 flex items-center justify-center border border-white/20 group/btn"
                                            title="Play Heritage Video"
                                        >
                                            <svg className="w-6 h-6 text-slate-950 fill-current translate-x-0.5 group-hover/btn:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 text-left space-y-8">
                        <p className="text-amber-600 dark:text-amber-400 font-semibold tracking-widest uppercase text-xs">Our Heritage</p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-800 dark:text-slate-100 leading-tight transition-colors">
                            Fresh Sips and Decadent Bites.
                        </h2>
                        <div className="w-12 h-1 bg-amber-500 dark:bg-amber-400 rounded-full"></div>
                        
                        <div className="space-y-6 text-slate-700 dark:text-slate-400 font-semibold dark:font-light leading-relaxed transition-colors">
                            <p className="text-lg text-slate-800 dark:text-slate-300 transition-colors">
                                Welcome to our culinary sanctuary. Located in the heart of the Philippines, our menu celebrates the vibrant, sun-soaked zest of premium lemons.
                            </p>
                            <p>
                                Every beverage, salad, and cake is prepared with the utmost respect for fresh, high-quality ingredients, ensuring each bite delivers a balanced burst of flavor. We strive to create dishes that comfort the soul and refresh the senses.
                            </p>
                        </div>

                        {/* Chef Quote Section */}
                        <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 space-y-4">
                            <div className="border-l-4 border-amber-500 pl-4 py-1 italic text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                "Food is the ultimate canvas of nature, and citrus is its most vibrant paint. Every dish we serve is a tribute to the sun-soaked farms of Batangas and the rich culinary history of our islands."
                            </div>
                            <div className="flex items-center space-x-3 pl-4">
                                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                    <span className="text-amber-500 text-xs font-serif font-bold">MS</span>
                                </div>
                                <div>
                                    <p className="text-slate-900 dark:text-slate-100 font-bold text-xs">Chef Marco Santos</p>
                                    <p className="text-slate-400 text-[10px] uppercase tracking-widest font-semibold mt-0.5">Culinary Director & Founder</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
