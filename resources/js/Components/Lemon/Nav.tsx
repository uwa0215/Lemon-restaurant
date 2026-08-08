import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

interface NavProps {
    setBookState: (state: boolean) => void;
    auth: {
        user: any;
    };
    cart: any[];
    setShowCart: (state: boolean) => void;
    cartBounce: boolean;
    setShowLoyalty?: (state: boolean) => void;
    setShowGiftCard?: (state: boolean) => void;
}

export default function Nav({ setBookState, auth, cart, setShowCart, cartBounce, setShowLoyalty, setShowGiftCard }: NavProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'dark' | 'light'>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
        }
        return 'dark';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const handleScroll = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setMobileMenuOpen(false); // Close menu on mobile after click
    };

    const navLinks = [
        { id: 'hero', label: 'Home' },
        { id: 'menu', label: 'Menu' },
        { id: 'about', label: 'Our Story' },
        { id: 'specialty', label: 'Specialties' },
        { id: 'testimonials', label: 'Reviews' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <>
            <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/95 dark:bg-[#030712]/80 border-b border-slate-200 dark:border-slate-900/60 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-24">
                        <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => handleScroll('hero')}>
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                                <div className="relative h-10 w-10 flex items-center justify-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1.5 shadow-inner">
                                    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path className="text-amber-500 dark:text-amber-400 fill-amber-500/20" d="M12 3a9 9 0 0 0-9 9c0 1.25.26 2.44.73 3.52L3 21l5.48-.73A9 9 0 1 0 12 3z" />
                                        <path className="text-emerald-500 dark:text-emerald-400 fill-emerald-500/20" d="M14 3c1.5-1.5 3.5-2 5-2s1 2.5-.5 4c-1.5 1.5-3.5 2-5 2s-1-2.5.5-4z" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-slate-900 dark:text-slate-100 font-black text-xl tracking-[0.2em] font-serif transition-colors uppercase">
                                LITTLE<span className="text-amber-500 font-sans font-light">LEMON</span>
                            </span>
                        </div>

                        <div className="hidden lg:flex items-center space-x-8 text-slate-700 dark:text-slate-400">
                            {navLinks.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => handleScroll(item.id)}
                                    className="relative group/nav-item py-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100 transition-colors duration-300 text-xs tracking-widest uppercase font-bold"
                                >
                                    <span>{item.label}</span>
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 dark:bg-amber-400 scale-x-0 group-hover/nav-item:scale-x-100 transition-transform duration-300 origin-left" />
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center space-x-2 sm:space-x-4">
                            {auth.user ? (
                                <Link href={route('dashboard')} className="text-xs text-slate-700 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors border border-slate-200 dark:border-slate-800 rounded-full px-4 py-2 bg-slate-50 dark:bg-slate-950/60 font-bold uppercase tracking-wider">
                                    Portal
                                </Link>
                            ) : (
                                <Link href={route('login')} className="text-xs text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 font-bold transition-colors uppercase tracking-widest pl-2">
                                    Sign In
                                </Link>
                            )}

                            {/* Global Cart Button */}
                            <button
                                onClick={() => setShowCart(true)}
                                className={`relative flex items-center justify-center p-3.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-355 hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-500/50 dark:hover:border-amber-400/40 transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 ${
                                    cartBounce ? 'scale-115 rotate-6 text-amber-500' : 'scale-100'
                                }`}
                                title="View Cart"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {cart.length > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 bg-amber-500 text-slate-950 text-[10px] font-black rounded-full flex items-center justify-center px-1 shadow-md border-2 border-white dark:border-[#030712] animate-pulse">
                                        {cart.reduce((s, i) => s + i.qty, 0)}
                                    </span>
                                )}
                            </button>

                            {/* Loyalty Button */}
                            {setShowLoyalty && (
                                <button
                                    onClick={() => setShowLoyalty(true)}
                                    className="hidden sm:flex relative items-center justify-center p-3.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-355 hover:text-amber-500 hover:border-amber-500/50 transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
                                    title="Lemon Club"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </button>
                            )}

                            {/* Gift Card Button */}
                            {setShowGiftCard && (
                                <button
                                    onClick={() => setShowGiftCard(true)}
                                    className="hidden sm:flex relative items-center justify-center p-3.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-355 hover:text-amber-500 hover:border-amber-500/50 transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
                                    title="Send Gift Card"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                    </svg>
                                </button>
                            )}
                            
                            <button 
                                onClick={() => setBookState(true)} 
                                className="hidden sm:flex relative group overflow-hidden bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 font-extrabold px-5 sm:px-7 py-3 sm:py-5 rounded-full shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all duration-300 text-[10px] sm:text-xs uppercase tracking-widest"
                            >
                                <span className="relative z-10 flex items-center space-x-2">
                                    <span>Reserve</span>
                                    <img src="/assets/cart.png" alt="cart" className="w-3.5 h-3.5 invert filter brightness-0 hidden sm:block" />
                                </span>
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Dropdown Menu */}
                    <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100 border-t border-slate-200 dark:border-slate-800' : 'max-h-0 opacity-0'}`}>
                        <div className="py-4 space-y-2 flex flex-col items-center">
                            {navLinks.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => handleScroll(item.id)}
                                    className="w-full py-3 text-center text-sm font-bold tracking-widest uppercase text-slate-700 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                                >
                                    {item.label}
                                </button>
                            ))}
                            {setShowLoyalty && (
                                <button 
                                    onClick={() => { setShowLoyalty(true); setMobileMenuOpen(false); }} 
                                    className="w-full py-3 text-center text-sm font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400 transition-colors"
                                >
                                    Lemon Club
                                </button>
                            )}
                            {setShowGiftCard && (
                                <button 
                                    onClick={() => { setShowGiftCard(true); setMobileMenuOpen(false); }} 
                                    className="w-full py-3 text-center text-sm font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400 transition-colors"
                                >
                                    Send Gift Card
                                </button>
                            )}
                            <button 
                                onClick={() => { setBookState(true); setMobileMenuOpen(false); }} 
                                className="w-full sm:hidden py-3 text-center text-sm font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400 transition-colors"
                            >
                                Reserve a Table
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Cute, Floating animated Theme toggler in the bottom right corner */}
            <div className="fixed bottom-8 right-8 z-[999] group">
                {/* Tooltip */}
                <div className="absolute bottom-16 right-0 bg-slate-950/95 dark:bg-white border border-slate-850 dark:border-slate-200 text-slate-105 dark:text-slate-900 text-[10px] tracking-widest uppercase font-bold py-2.5 px-4 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0 shadow-2xl">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </div>
                
                {/* Cute Floating Toggle Button */}
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="relative w-14 h-14 rounded-full flex items-center justify-center bg-white dark:bg-slate-900 border-2 border-amber-500 dark:border-amber-400 text-amber-500 dark:text-amber-400 transition-all duration-500 shadow-2xl hover:shadow-amber-500/35 hover:-translate-y-1 hover:rotate-45 active:scale-95"
                    title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                >
                    {theme === 'dark' ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                </button>
            </div>
        </>
    );
}
