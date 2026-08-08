import React from 'react';

export default function Chef() {
    return (
        <section className="relative py-24 bg-[#0a0a0f] overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    
                    {/* Left: Chef Image Area */}
                    <div className="relative order-2 lg:order-1">
                        <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-[2.5rem] opacity-20 blur-2xl animate-pulse" />
                        <div className="relative h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-800">
                            <img 
                                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                alt="Head Chef Mario" 
                                className="w-full h-full object-cover object-center"
                            />
                            {/* Signature overlay */}
                            <div className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-slate-700/50">
                                <p className="font-serif text-3xl text-white opacity-90 italic">Mario Rossi</p>
                                <p className="text-amber-500 text-[10px] font-black uppercase tracking-widest mt-1">Executive Chef</p>
                            </div>
                        </div>
                        
                        {/* Decorative floating element */}
                        <div className="absolute -top-6 -left-6 bg-[#0a0a0f] border border-amber-900/40 p-4 rounded-2xl shadow-xl">
                            <div className="w-16 h-16 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                <span className="text-3xl">👨‍🍳</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
                        <div className="space-y-4">
                            <div className="inline-flex items-center space-x-2 bg-amber-900/20 border border-amber-800/40 rounded-full px-5 py-2">
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                                <span className="text-amber-400 font-black text-[10px] uppercase tracking-[0.2em]">Meet Our Chef</span>
                            </div>
                            
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white leading-tight">
                                Passion In <br/>
                                <span className="text-amber-500 italic">Every Plate.</span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-slate-400 text-sm leading-relaxed">
                            <p>
                                "At Little Lemon, we believe that food is more than just sustenance; it's a language of love, culture, and community. Every dish we create tells a story of our heritage, crafted with the freshest local ingredients and a touch of modern innovation."
                            </p>
                            <p>
                                Born in a small Mediterranean village, Chef Mario brings decades of culinary expertise to your table. His philosophy is simple: let the ingredients speak for themselves. The vibrant flavors of our signature lemon-infused recipes are a testament to his dedication to authentic, spirited cooking.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div>
                                <h4 className="text-white font-bold text-3xl font-serif">15+</h4>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Years Experience</p>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-3xl font-serif">100%</h4>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Fresh Ingredients</p>
                            </div>
                        </div>
                        
                        <div className="pt-4">
                            <img src="/assets/logo1.png" alt="Little Lemon" className="h-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-300" />
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
}
