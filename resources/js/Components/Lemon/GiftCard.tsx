import React, { useState } from 'react';

interface GiftCardProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function GiftCard({ isOpen, onClose }: GiftCardProps) {
    const [step, setStep] = useState(1); // 1: Select Amount, 2: Details, 3: Success
    const [amount, setAmount] = useState<number>(50);
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('');
    const [design, setDesign] = useState<'classic' | 'birthday' | 'thankyou'>('classic');

    if (!isOpen) return null;

    const handlePurchase = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3);
    };

    const resetAndClose = () => {
        setStep(1);
        setAmount(50);
        setRecipient('');
        setMessage('');
        setDesign('classic');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-[#030712]/60 backdrop-blur-sm transition-opacity"
                onClick={resetAndClose}
            />
            
            {/* Modal */}
            <div className="relative bg-white dark:bg-[#08070b] w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-fade-in-up flex flex-col">
                
                {/* Header */}
                <div className="border-b border-slate-200 dark:border-slate-800 p-6 flex justify-between items-center bg-slate-50 dark:bg-[#030712]">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                        </div>
                        <h3 className="font-bold font-serif text-xl text-slate-900 dark:text-white">Send a Gift Card</h3>
                    </div>
                    <button onClick={resetAndClose} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[70vh]">
                    {step === 1 && (
                        <div className="space-y-8 animate-fade-in-up">
                            {/* Live Preview */}
                            <div className={`w-full aspect-[1.6/1] rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all duration-500 ${
                                design === 'classic' ? 'bg-gradient-to-br from-amber-500 to-yellow-600' : 
                                design === 'birthday' ? 'bg-gradient-to-br from-rose-400 to-pink-600' : 
                                'bg-gradient-to-br from-emerald-500 to-teal-600'
                            }`}>
                                <div className="flex justify-between items-start text-white">
                                    <span className="font-black font-serif text-2xl tracking-widest uppercase opacity-90">Little Lemon</span>
                                    <span className="font-bold text-3xl opacity-90">${amount}</span>
                                </div>
                                <div className="text-white space-y-1">
                                    <p className="font-bold opacity-80 text-sm tracking-wider uppercase">
                                        {design === 'classic' ? 'Gift Card' : design === 'birthday' ? 'Happy Birthday' : 'Thank You'}
                                    </p>
                                    <p className="font-mono text-xs opacity-60">**** **** **** 1234</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Select Amount</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[25, 50, 100].map(val => (
                                        <button
                                            key={val}
                                            onClick={() => setAmount(val)}
                                            className={`py-3 rounded-xl border-2 font-bold text-lg transition-all ${
                                                amount === val 
                                                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' 
                                                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-amber-500/50'
                                            }`}
                                        >
                                            ${val}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Select Design</label>
                                <div className="flex space-x-3">
                                    {[
                                        { id: 'classic', label: 'Classic', color: 'bg-amber-500' },
                                        { id: 'birthday', label: 'Birthday', color: 'bg-rose-500' },
                                        { id: 'thankyou', label: 'Thank You', color: 'bg-emerald-500' }
                                    ].map(d => (
                                        <button
                                            key={d.id}
                                            onClick={() => setDesign(d.id as any)}
                                            className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center space-x-2 transition-all ${
                                                design === d.id 
                                                    ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white' 
                                                    : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-400'
                                            }`}
                                        >
                                            <div className={`w-3 h-3 rounded-full ${d.color}`} />
                                            <span>{d.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={() => setStep(2)}
                                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-xl hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-slate-900 transition-colors uppercase tracking-widest text-sm"
                            >
                                Continue to Details
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <form onSubmit={handlePurchase} className="space-y-6 animate-fade-in-up">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-2">Recipient Email</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={recipient}
                                        onChange={e => setRecipient(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                                        placeholder="friend@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-2">Personal Message</label>
                                    <textarea 
                                        rows={4}
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                                        placeholder="Add a sweet note..."
                                    />
                                </div>
                            </div>
                            
                            <div className="flex space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                                <button 
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors uppercase tracking-widest text-sm"
                                >
                                    Back
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-4 rounded-xl transition-colors uppercase tracking-widest text-sm shadow-lg shadow-amber-500/20"
                                >
                                    Pay ${amount}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <div className="text-center space-y-6 py-8 animate-fade-in-up">
                            <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-12 h-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black font-serif text-slate-900 dark:text-white">Gift Card Sent!</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                Your ${amount} gift card has been successfully sent to <span className="font-bold text-slate-700 dark:text-slate-300">{recipient}</span>.
                            </p>
                            <button 
                                onClick={resetAndClose}
                                className="mt-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-10 py-4 rounded-full hover:scale-105 transition-all uppercase tracking-widest text-sm"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
