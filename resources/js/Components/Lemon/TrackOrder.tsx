import React, { useState, useEffect } from 'react';

const TRACKING_STAGES = [
    { id: 1, label: 'Order Placed', icon: '📝' },
    { id: 2, label: 'Preparing', icon: '👨‍🍳' },
    { id: 3, label: 'Baking/Cooking', icon: '🔥' },
    { id: 4, label: 'Quality Check', icon: '✅' },
    { id: 5, label: 'Out for Delivery', icon: '🛵' },
    { id: 6, label: 'Delivered', icon: '🎉' }
];

export default function TrackOrder() {
    const [orderId, setOrderId] = useState('');
    const [isTracking, setIsTracking] = useState(false);
    const [currentStage, setCurrentStage] = useState(0);
    const [progress, setProgress] = useState(0);

    // Simulate tracking progression
    useEffect(() => {
        if (!isTracking) return;

        let interval: NodeJS.Timeout;
        
        // Rapidly simulate progress through stages for demo purposes
        interval = setInterval(() => {
            setCurrentStage(prev => {
                if (prev >= TRACKING_STAGES.length) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
            setProgress(prev => Math.min(100, prev + (100 / TRACKING_STAGES.length)));
        }, 3000); // Progress every 3 seconds

        return () => clearInterval(interval);
    }, [isTracking]);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (orderId.trim()) {
            setIsTracking(true);
            setCurrentStage(1);
            setProgress(100 / TRACKING_STAGES.length);
        }
    };

    const resetTracking = () => {
        setIsTracking(false);
        setOrderId('');
        setCurrentStage(0);
        setProgress(0);
    };

    return (
        <section id="tracker" className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-[#0c0b11] dark:to-[#08070d] overflow-hidden relative">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-full px-5 py-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-blue-600 dark:text-blue-400 font-black text-[10px] uppercase tracking-[0.2em]">Real-time Tracking</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 dark:text-white">Where's My Food?</h2>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">Enter your Order ID below to track your meal's journey from our kitchen to your table.</p>
                </div>

                <div className="bg-white dark:bg-[#111018] rounded-3xl shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-800 p-8 md:p-12">
                    
                    {!isTracking ? (
                        <form onSubmit={handleTrack} className="max-w-md mx-auto space-y-6">
                            <div className="space-y-2">
                                <label className="text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-widest">Order ID</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="text-amber-500 font-black">#</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        value={orderId}
                                        onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                                        placeholder="LL-12345" 
                                        className="w-full bg-slate-50 dark:bg-slate-900/60 border-2 border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-10 pr-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 font-bold tracking-widest transition-all"
                                        required
                                    />
                                </div>
                            </div>
                            <button 
                                type="submit"
                                className="w-full bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-900 font-black uppercase tracking-widest py-4 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform duration-300"
                            >
                                Track Order
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-12">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Order <span className="text-amber-500 font-serif">#{orderId}</span></h3>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Estimated Arrival: 15-20 Mins</p>
                                </div>
                                <button onClick={resetTracking} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-bold underline">
                                    Track Another
                                </button>
                            </div>

                            {/* Tracking Progress Bar */}
                            <div className="relative">
                                {/* Base track */}
                                <div className="absolute top-1/2 left-0 w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full -translate-y-1/2" />
                                
                                {/* Active progress track */}
                                <div 
                                    className="absolute top-1/2 left-0 h-2 bg-amber-500 rounded-full -translate-y-1/2 transition-all duration-700 ease-out"
                                    style={{ width: `${progress}%` }}
                                />

                                {/* Stages */}
                                <div className="relative flex justify-between">
                                    {TRACKING_STAGES.map((stage, index) => {
                                        const isActive = currentStage >= stage.id;
                                        const isCurrent = currentStage === stage.id;
                                        return (
                                            <div key={stage.id} className="flex flex-col items-center">
                                                <div 
                                                    className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-4 flex items-center justify-center text-lg md:text-2xl bg-white dark:bg-[#111018] z-10 transition-colors duration-500 ${
                                                        isActive 
                                                            ? 'border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
                                                            : 'border-slate-200 dark:border-slate-800 opacity-50 text-slate-300'
                                                    } ${isCurrent ? 'animate-bounce' : ''}`}
                                                >
                                                    {stage.icon}
                                                </div>
                                                <div className="absolute mt-16 md:mt-20 w-24 text-center -ml-12 md:-ml-5">
                                                    <p className={`text-[9px] md:text-xs font-black uppercase tracking-widest ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-600'}`}>
                                                        {stage.label}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            
                            {/* Spacing for absolute text labels */}
                            <div className="h-8"></div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
