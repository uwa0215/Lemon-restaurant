import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Nav from '@/Components/Lemon/Nav';
import Hero from '@/Components/Lemon/Hero';
import Menu from '@/Components/Lemon/Menu';
import About from '@/Components/Lemon/About';
import Specialty from '@/Components/Lemon/Specialty';
import Testimonials from '@/Components/Lemon/Testimonials';
import Contact from '@/Components/Lemon/Contact';
import Footer from '@/Components/Lemon/Footer';
import VideoPlayer from '@/Components/Lemon/VideoPlayer';
import Form from '@/Components/Lemon/Form';
import TrackOrder from '@/Components/Lemon/TrackOrder';
import ChatSupport from '@/Components/Lemon/ChatSupport';
import LoyaltyProgram from '@/Components/Lemon/LoyaltyProgram';
import GiftCard from '@/Components/Lemon/GiftCard';
import { ProductItem } from '@/Components/Lemon/products';

export interface CartItem extends ProductItem {
    qty: number;
}

interface WelcomeProps {
    auth: {
        user: any;
    };
}

export default function Welcome({ auth }: WelcomeProps) {
    const [playState, setPlayState] = useState(false);
    const [bookState, setBookState] = useState(false);

    // Global Shopping Cart & Product Modal State
    const [cart, setCart] = useState<CartItem[]>([]);
    const [showCart, setShowCart] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
    const [cartBounce, setCartBounce] = useState(false);
    const [showCartToast, setShowCartToast] = useState<string | null>(null);

    // New Functionality States
    const [showLoyalty, setShowLoyalty] = useState(false);
    const [showGiftCard, setShowGiftCard] = useState(false);

    const addToCart = (item: ProductItem, qty: number) => {
        setCart(prev => {
            const existing = prev.find(c => c.id === item.id);
            if (existing) {
                return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + qty } : c);
            }
            return [...prev, { ...item, qty }];
        });
        setCartBounce(true);
        setShowCartToast(item.name);
        setTimeout(() => setCartBounce(false), 600);
        setTimeout(() => setShowCartToast(null), 2500);
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(c => c.id !== id));
    };

    const updateQty = (id: number, qty: number) => {
        setCart(prev => prev.map(c => c.id === id ? { ...c, qty } : c));
    };

    const handleBuyNow = (item: ProductItem, qty: number) => {
        // Add to cart and immediately show the cart sidebar
        setCart(prev => {
            const existing = prev.find(c => c.id === item.id);
            if (existing) {
                return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + qty } : c);
            }
            return [...prev, { ...item, qty }];
        });
        setSelectedProduct(null);
        setShowCart(true);
    };

    return (
        <>
            <Head title="Little Lemon Restaurant - Philippines" />
            <div className="bg-[#0B0F19] text-slate-200 font-sans min-h-screen selection:bg-amber-400 selection:text-slate-950 relative">
                <Nav 
                    setBookState={setBookState} 
                    auth={auth} 
                    cart={cart}
                    setShowCart={setShowCart}
                    cartBounce={cartBounce}
                    setShowLoyalty={setShowLoyalty}
                    setShowGiftCard={setShowGiftCard}
                />
                
                <Hero 
                    setBookState={setBookState} 
                    setSelectedProduct={setSelectedProduct}
                />
                
                <Menu 
                    setSelectedProduct={setSelectedProduct}
                />
                
                <About setPlayState={setPlayState} />
                
                <Specialty 
                    setSelectedProduct={setSelectedProduct}
                />
                
                <TrackOrder />
                
                <Testimonials />
                <Contact />
                <Footer />
                
                <VideoPlayer playState={playState} setPlayState={setPlayState} />
                <Form bookState={bookState} setBookState={setBookState} />

                {/* Global Product Detail Modal Overlay */}
                {selectedProduct && (
                    <ProductModal 
                        item={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        onAddToCart={addToCart}
                        onBuyNow={handleBuyNow}
                    />
                )}

                {/* Global Cart Sidebar Drawer */}
                {showCart && (
                    <CartSidebar 
                        cart={cart}
                        onClose={() => setShowCart(false)}
                        onRemove={removeFromCart}
                        onUpdateQty={updateQty}
                    />
                )}

                {/* Global Floating Toast Alert */}
                {showCartToast && (
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-emerald-500 text-white text-sm font-black px-6 py-3.5 rounded-2xl shadow-2xl flex items-center space-x-2.5 animate-bounce">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{showCartToast} added to cart!</span>
                    </div>
                )}
                {/* Floating Chat Support Widget */}
                <ChatSupport />

                {/* Modals */}
                <LoyaltyProgram isOpen={showLoyalty} onClose={() => setShowLoyalty(false)} />
                <GiftCard isOpen={showGiftCard} onClose={() => setShowGiftCard(false)} />
                
            </div>
        </>
    );
}

/* ── Stars Sub-Component ─────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex items-center space-x-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.floor(rating) ? 'text-amber-400' : 'text-slate-350 dark:text-slate-700'} fill-current`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1 font-bold">{rating}</span>
        </div>
    );
}

/* ── Product Detail Modal Component ─────────────────────── */
function ProductModal({
    item, onClose, onAddToCart, onBuyNow
}: {
    item: ProductItem;
    onClose: () => void;
    onAddToCart: (item: ProductItem, qty: number) => void;
    onBuyNow: (item: ProductItem, qty: number) => void;
}) {
    const [qty, setQty] = useState(1);
    const [buying, setBuying] = useState(false);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        onAddToCart(item, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleBuy = () => {
        setBuying(true);
        setTimeout(() => { 
            onBuyNow(item, qty); 
            setBuying(false); 
        }, 800);
    };

    return (
        <div
            className="fixed inset-0 z-[95] bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="w-full max-w-3xl bg-white dark:bg-[#0c0b11] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative border border-slate-200/30 dark:border-slate-800/40 max-h-[90vh]">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/10 dark:bg-white/10 hover:bg-slate-900/20 dark:hover:bg-white/20 flex items-center justify-center text-slate-800 dark:text-white transition-all duration-200 z-50 backdrop-blur-sm group"
                >
                    <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Left: Image Side */}
                <div className="md:w-2/5 relative flex-shrink-0 h-64 md:h-auto overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Tag badge */}
                    <div className={`absolute top-4 left-4 bg-gradient-to-r ${item.tagColor} text-white text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg`}>
                        {item.tag}
                    </div>
                    {/* Price Tag (Mobile) */}
                    <div className="absolute bottom-4 left-4 md:hidden">
                        <span className="text-white font-black text-2xl drop-shadow-md">{item.price}</span>
                    </div>
                </div>

                {/* Right: Info Details */}
                <div className="flex-1 p-8 overflow-y-auto flex flex-col space-y-6">
                    {/* Category + Stars */}
                    <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
                        <span className="text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-[0.2em] bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-full px-3 py-1">
                            {item.category}
                        </span>
                        <Stars rating={item.rating} />
                    </div>

                    {/* Name + Price */}
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold font-serif text-slate-900 dark:text-white leading-tight">{item.name}</h3>
                        <p className="text-3xl font-black text-amber-600 dark:text-amber-400 mt-1">{item.price}</p>
                    </div>

                    {/* Detailed description */}
                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item.fullDesc}</p>

                    {/* Performance / Details Stats Grid */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { label: 'Calories', value: item.calories, emoji: '🔥' },
                            { label: 'Prep Time', value: item.prepTime, emoji: '⏱' },
                            { label: 'Rating', value: `${item.rating}/5`, emoji: '⭐' },
                        ].map(s => (
                            <div key={s.label} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-center">
                                <p className="text-lg mb-1">{s.emoji}</p>
                                <p className="text-slate-900 dark:text-slate-100 font-bold text-sm">{s.value}</p>
                                <p className="text-slate-400 text-[9px] uppercase tracking-widest font-black mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Key Ingredients */}
                    <div className="space-y-2">
                        <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">Ingredients</p>
                        <div className="flex flex-wrap gap-1.5">
                            {item.ingredients.map(ing => (
                                <span key={ing} className="bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold px-3.5 py-1 rounded-full">
                                    {ing}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Quantity + Checkout Actions */}
                    <div className="space-y-4 pt-2 mt-auto border-t border-slate-100 dark:border-slate-900">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest">Quantity</span>
                                <div className="flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                                    <button
                                        type="button"
                                        onClick={() => setQty(q => Math.max(1, q - 1))}
                                        className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all font-black text-lg"
                                    >−</button>
                                    <span className="w-9 text-center text-slate-900 dark:text-slate-100 font-black text-sm">{qty}</span>
                                    <button
                                        type="button"
                                        onClick={() => setQty(q => Math.min(20, q + 1))}
                                        className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all font-black text-lg"
                                    >+</button>
                                </div>
                            </div>
                            
                            <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
                                Total: <span className="text-amber-600 dark:text-amber-400 font-black text-lg ml-1">₱{(item.priceNum * qty).toLocaleString()}</span>
                            </span>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleAdd}
                                className={`flex-1 relative group overflow-hidden font-bold py-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                                    added
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                        : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white shadow-md'
                                }`}
                            >
                                {added ? (
                                    <>
                                        <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Added!</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span>Add to Cart</span>
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={handleBuy}
                                className="flex-1 relative group overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-505 text-slate-950 font-black py-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                {buying ? (
                                    <svg className="w-5 h-5 animate-spin text-slate-950" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <span>Buy It Now</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Cart Sidebar Drawer Component ──────────────────────── */
function CartSidebar({
    cart, onClose, onRemove, onUpdateQty
}: {
    cart: CartItem[];
    onClose: () => void;
    onRemove: (id: number) => void;
    onUpdateQty: (id: number, qty: number) => void;
}) {
    const total = cart.reduce((sum, item) => sum + item.priceNum * item.qty, 0);
    const [ordered, setOrdered] = useState(false);

    const handleCheckout = () => {
        setOrdered(true);
        setTimeout(() => {
            setOrdered(false);
            onClose();
        }, 2500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop overlay */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
                onClick={onClose} 
            />
            
            {/* Drawer Container */}
            <div className="relative w-full max-w-md bg-white dark:bg-[#0c0b11] h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800/60 overflow-hidden z-10 transition-transform duration-300">
                {/* Sleek top ambient accent line */}
                <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500" />
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-900/60">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-white font-bold text-sm">Review Order</p>
                            <p className="text-slate-400 text-xs font-bold">{cart.reduce((s, i) => s + i.qty, 0)} item{cart.reduce((s, i) => s + i.qty, 0) !== 1 ? 's' : ''}</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors border border-slate-200/40 dark:border-slate-800"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-16">
                            <span className="text-6xl animate-pulse">🍋</span>
                            <div>
                                <p className="text-slate-900 dark:text-slate-150 font-black text-base">Your cart is dry!</p>
                                <p className="text-slate-450 dark:text-slate-500 text-xs max-w-[240px] mx-auto mt-1 leading-relaxed">Add any signature lemonade or delicious pastry to start checkout.</p>
                            </div>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div 
                                key={item.id} 
                                className="flex items-center space-x-3.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-3.5 hover:border-amber-500/20 dark:hover:border-amber-400/10 transition-colors"
                            >
                                <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-xl flex-shrink-0 border border-slate-200/60 dark:border-slate-800" />
                                
                                <div className="flex-1 min-w-0">
                                    <p className="text-slate-900 dark:text-slate-100 font-bold text-sm truncate">{item.name}</p>
                                    <p className="text-amber-600 dark:text-amber-400 font-black text-sm mt-0.5">₱{(item.priceNum * item.qty).toLocaleString()}</p>
                                    
                                    <div className="flex items-center space-x-2.5 mt-2">
                                        <button 
                                            onClick={() => onUpdateQty(item.id, Math.max(1, item.qty - 1))} 
                                            className="w-6 h-6 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-xs font-black hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-600 transition-colors flex items-center justify-center border border-slate-300/20"
                                        >−</button>
                                        <span className="text-slate-800 dark:text-slate-200 text-xs font-black w-4 text-center">{item.qty}</span>
                                        <button 
                                            onClick={() => onUpdateQty(item.id, item.qty + 1)} 
                                            className="w-6 h-6 rounded-lg bg-slate-200/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-xs font-black hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-600 transition-colors flex items-center justify-center border border-slate-300/20"
                                        >+</button>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => onRemove(item.id)} 
                                    className="text-slate-300 dark:text-slate-700 hover:text-rose-500 dark:hover:text-rose-400 transition-colors p-1.5 hover:bg-rose-500/5 rounded-xl"
                                    title="Remove item"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer and Checkout */}
                {cart.length > 0 && (
                    <div className="p-6 border-t border-slate-100 dark:border-slate-900/60 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest">Order Total</span>
                            <span className="text-slate-900 dark:text-white font-black text-2xl">₱{total.toLocaleString()}</span>
                        </div>
                        
                        <button
                            onClick={handleCheckout}
                            className={`w-full relative group overflow-hidden font-black py-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 ${
                                ordered
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                    : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-900 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5'
                            }`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            {ordered ? (
                                <>
                                    <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Booking Placed! 🎉</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Complete Booking</span>
                                </>
                            )}
                        </button>
                        <p className="text-center text-slate-400 dark:text-slate-500 text-[10px] font-bold">🔒 Contactless Safe Delivery & Pick-up Options Available</p>
                    </div>
                )}
            </div>
        </div>
    );
}
