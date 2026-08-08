import React, { useState } from 'react';

interface LoyaltyProgramProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoyaltyProgram({ isOpen, onClose }: LoyaltyProgramProps) {
    const points = 450;
    const nextTier = 500;
    const progress = (points / nextTier) * 100;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#030712]/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-white dark:bg-[#08070b] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-fade-in-up">
                
                {/* Header */}
                <div className="bg-gradient-to-br from-amber-400 to-yellow-500 p-8 text-center relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                    
                    <button onClick={onClose} className="absolute top-4 right-4 text-slate-900 hover:text-white transition-colors bg-white/20 p-2 rounded-full">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                    <div className="relative z-10 space-y-2">
                        <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center mx-auto shadow-xl border border-white/20 mb-4">
                            <span className="text-3xl">🍋</span>
                        </div>
                        <h3 className="text-2xl font-black font-serif text-slate-900 uppercase tracking-widest">Lemon Club</h3>
                        <p className="text-slate-800 font-medium text-sm">Gold Member</p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    
                    {/* Points Balance */}
                    <div className="text-center space-y-1">
                        <span className="text-5xl font-black text-slate-900 dark:text-white">{points}</span>
                        <span className="block text-amber-500 font-bold uppercase tracking-widest text-[10px]">Total Points</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                            <span>Current</span>
                            <span>{nextTier - points} pts to Free Dessert</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-3 border border-slate-200 dark:border-slate-800 p-0.5">
                            <div 
                                className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-1000 shadow-lg shadow-amber-500/20 relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1.5 bg-white/50 rounded-full mr-1" />
                            </div>
                        </div>
                    </div>

                    {/* Digital Card / QR (Mocked) */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center justify-center space-y-4">
                        <div className="text-center space-y-1">
                            <p className="text-slate-900 dark:text-white font-bold text-sm">Scan in-store to earn points</p>
                            <p className="text-slate-500 text-xs">Present this QR code to your server</p>
                        </div>
                        <div className="w-40 h-40 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                            {/* Mock QR Code Pattern */}
                            <div className="w-full h-full border-4 border-slate-900 grid grid-cols-4 grid-rows-4 gap-1 p-2">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className={`bg-slate-900 ${i % 3 === 0 || i % 7 === 0 ? 'opacity-0' : 'opacity-100'}`} />
                                ))}
                            </div>
                        </div>
                        <span className="font-mono text-slate-400 text-xs tracking-widest">ID: LEMON-4829-1X</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
