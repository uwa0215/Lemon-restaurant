import React, { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';

interface FormProps {
    bookState: boolean;
    setBookState: (state: boolean) => void;
}

const TIME_SLOTS = [
    { label: '5:00 PM', value: '17:00' },
    { label: '5:30 PM', value: '17:30' },
    { label: '6:00 PM', value: '18:00' },
    { label: '6:30 PM', value: '18:30' },
    { label: '7:00 PM', value: '19:00' },
    { label: '7:30 PM', value: '19:30' },
    { label: '8:00 PM', value: '20:00' },
    { label: '8:30 PM', value: '20:30' },
    { label: '9:00 PM', value: '21:00' },
    { label: '9:30 PM', value: '21:30' },
    { label: '10:00 PM', value: '22:00' },
    { label: '10:30 PM', value: '22:30' },
];

export default function Form({ bookState, setBookState }: FormProps) {
    const booking = useRef<HTMLDivElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        date: '',
        time: '19:00',
        guests: 2,
        table: '', // New field for table selection
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [particles, setParticles] = useState<
        { id: number; x: number; y: number; color: string; delay: number; r: number }[]
    >([]);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const triggerConfetti = () => {
        const colors = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#ec4899', '#8b5cf6', '#fbbf24'];
        const tempParticles: typeof particles = [];
        for (let i = 0; i < 60; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 60 + Math.random() * 180;
            tempParticles.push({
                id: i,
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance - 30,
                color: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 300,
                r: 180 + Math.random() * 360,
            });
        }
        setParticles(tempParticles);
    };

    const closeBooking = (e: React.MouseEvent) => {
        if (e.target === booking.current) {
            setBookState(false);
            reset();
            setShowSuccess(false);
            setParticles([]);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('bookings.store'), {
            onSuccess: () => {
                setShowSuccess(true);
                triggerConfetti();
                reset();
                setTimeout(() => {
                    setBookState(false);
                    setShowSuccess(false);
                    setParticles([]);
                }, 5000);
            },
        });
    };

    const adjustGuests = (delta: number) => {
        const next = Math.min(20, Math.max(1, data.guests + delta));
        setData('guests', next);
    };

    if (!bookState) return null;

    return (
        <div
            ref={booking}
            onClick={closeBooking}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-lg flex items-center justify-center p-4 transition-all duration-300"
        >
            <div className="w-full max-w-4xl bg-white dark:bg-[#0a0a0f] rounded-[2rem] shadow-2xl overflow-hidden flex relative transition-all duration-300 border border-slate-200/40 dark:border-slate-800/40">

                {/* ── LEFT DECORATIVE PANEL ── */}
                <div className="hidden md:flex flex-col justify-between w-72 flex-shrink-0 bg-gradient-to-b from-amber-500 via-yellow-400 to-amber-600 p-8 relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full" />

                    {/* Top section */}
                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            </div>
                            <span className="text-white/80 text-xs font-bold tracking-widest uppercase">Premium Dining</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white font-serif leading-tight">
                            Reserve<br />Your<br />Table
                        </h2>
                        <div className="w-10 h-1 bg-white/50 rounded-full" />
                        <p className="text-white/70 text-xs leading-relaxed">
                            Experience an unforgettable evening with our world-class cuisine and ambiance.
                        </p>
                    </div>

                    {/* Info cards */}
                    <div className="relative z-10 space-y-3">
                        {[
                            { icon: '🕐', label: 'Hours', value: '5 PM – 11 PM' },
                            { icon: '📍', label: 'Location', value: 'Little Lemon, PH' },
                            { icon: '📞', label: 'Call Us', value: '+63 912 345 6789' },
                        ].map(info => (
                            <div key={info.label} className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center space-x-3">
                                <span className="text-lg">{info.icon}</span>
                                <div>
                                    <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold">{info.label}</p>
                                    <p className="text-white text-xs font-semibold">{info.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT FORM PANEL ── */}
                <div className="flex-1 p-8 md:p-10 overflow-y-auto max-h-[90vh] relative">
                    {/* Decorative glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

                    {/* Close button */}
                    <button
                        onClick={() => { setBookState(false); reset(); setShowSuccess(false); setParticles([]); }}
                        className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 z-10 group"
                    >
                        <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {showSuccess ? (
                        /* ── SUCCESS STATE ── */
                        <div className="text-center py-10 px-4 space-y-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                            {/* Particles */}
                            {particles.map(p => (
                                <div
                                    key={p.id}
                                    className="absolute w-3 h-3 rounded-sm animate-confetti pointer-events-none"
                                    style={{
                                        left: '50%', top: '40%',
                                        backgroundColor: p.color,
                                        '--tw-confetti-x': `${p.x}px`,
                                        '--tw-confetti-y': `${p.y}px`,
                                        '--tw-confetti-r': `${p.r}deg`,
                                        animationDelay: `${p.delay}ms`,
                                    } as React.CSSProperties}
                                />
                            ))}
                            {/* Animated rings */}
                            <div className="relative flex items-center justify-center">
                                <div className="absolute w-32 h-32 bg-amber-400/10 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                                <div className="absolute w-24 h-24 bg-amber-400/15 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
                                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/40">
                                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" className="animate-checkmark" />
                                    </svg>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">
                                    You're All Set! 🍋
                                </h4>
                                <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                                    Your table has been reserved. We can't wait to host you for an unforgettable dining experience!
                                </p>
                            </div>
                            <div className="flex items-center space-x-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl px-5 py-3">
                                <span className="text-amber-500">✨</span>
                                <span className="text-amber-700 dark:text-amber-400 text-xs font-bold">A confirmation has been noted</span>
                            </div>
                        </div>
                    ) : (
                        /* ── FORM STATE ── */
                        <>
                            {/* Header */}
                            <div className="mb-8 relative z-10">
                                <div className="flex items-center space-x-2 mb-2">
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                    </div>
                                    <span className="text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">Table Reservation</span>
                                </div>
                                <h3 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">Book Your Table</h3>
                                <p className="text-slate-500 dark:text-slate-500 text-sm mt-1">Fill in your details below to secure your spot.</p>
                            </div>

                            <form onSubmit={onSubmit} className="space-y-5 relative z-10">

                                {/* ── Full Name ── */}
                                <div className="space-y-1.5">
                                    <label className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-widest">
                                        <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>Full Name</span>
                                    </label>
                                    <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'scale-[1.01]' : ''}`}>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="e.g. Maria Santos"
                                            className="w-full bg-slate-50 dark:bg-slate-900/60 border-2 border-slate-200 dark:border-slate-800 focus:border-amber-400 dark:focus:border-amber-500 rounded-2xl py-3.5 px-4 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:ring-4 focus:ring-amber-400/10 outline-none transition-all duration-300 text-sm font-medium"
                                            required
                                        />
                                        {data.name && (
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                                <div className="w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                                                    <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {errors.name && <span className="text-rose-500 text-xs flex items-center space-x-1"><span>⚠</span><span>{errors.name}</span></span>}
                                </div>

                                {/* ── Date ── */}
                                <div className="space-y-1.5">
                                    <label className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-widest">
                                        <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>Reservation Date</span>
                                    </label>
                                    <div className={`relative transition-all duration-300 ${focusedField === 'date' ? 'scale-[1.01]' : ''}`}>
                                        <input
                                            type="date"
                                            value={data.date}
                                            onChange={e => setData('date', e.target.value)}
                                            onFocus={() => setFocusedField('date')}
                                            onBlur={() => setFocusedField(null)}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full bg-slate-50 dark:bg-slate-900/60 border-2 border-slate-200 dark:border-slate-800 focus:border-amber-400 dark:focus:border-amber-500 rounded-2xl py-3.5 px-4 text-slate-900 dark:text-slate-100 focus:ring-4 focus:ring-amber-400/10 outline-none transition-all duration-300 text-sm font-medium cursor-pointer"
                                            required
                                        />
                                    </div>
                                    {errors.date && <span className="text-rose-500 text-xs flex items-center space-x-1"><span>⚠</span><span>{errors.date}</span></span>}
                                </div>

                                {/* ── Time Slot Grid (AM/PM) ── */}
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-widest">
                                        <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>Preferred Time</span>
                                        <span className="ml-auto text-amber-500 normal-case font-normal tracking-normal text-[10px] bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/40">
                                            {TIME_SLOTS.find(s => s.value === data.time)?.label ?? 'Select'}
                                        </span>
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {TIME_SLOTS.map(slot => (
                                            <button
                                                key={slot.value}
                                                type="button"
                                                onClick={() => setData('time', slot.value)}
                                                className={`py-2.5 px-1 rounded-xl text-xs font-bold transition-all duration-200 border-2 ${
                                                    data.time === slot.value
                                                        ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105'
                                                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/10'
                                                }`}
                                            >
                                                {slot.label}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.time && <span className="text-rose-500 text-xs flex items-center space-x-1"><span>⚠</span><span>{errors.time}</span></span>}
                                </div>

                                {/* ── Guests Counter ── */}
                                <div className="space-y-1.5">
                                    <label className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-widest">
                                        <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20H22V18C22 15.79 20.21 14 18 14C17.07 14 16.22 14.32 15.54 14.85M17 20H7M17 20V14M7 20H2V18C2 15.79 3.79 14 6 14C6.93 14 7.78 14.32 8.46 14.85M7 20V14M12 10C14.21 10 16 8.21 16 6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6C8 8.21 9.79 10 12 10ZM6 10C7.66 10 9 8.66 9 7C9 5.34 7.66 4 6 4C4.34 4 3 5.34 3 7C3 8.66 4.34 10 6 10Z" />
                                        </svg>
                                        <span>Number of Guests</span>
                                    </label>
                                    <div className="flex items-center bg-slate-50 dark:bg-slate-900/60 border-2 border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                                        <button
                                            type="button"
                                            onClick={() => adjustGuests(-1)}
                                            disabled={data.guests <= 1}
                                            className="w-14 h-14 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-xl font-bold flex-shrink-0"
                                        >
                                            −
                                        </button>
                                        <div className="flex-1 flex flex-col items-center justify-center py-2">
                                            <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums leading-none">{data.guests}</span>
                                            <span className="text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest mt-0.5">
                                                {data.guests === 1 ? 'Guest' : 'Guests'}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => adjustGuests(1)}
                                            disabled={data.guests >= 20}
                                            className="w-14 h-14 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-xl font-bold flex-shrink-0"
                                        >
                                            +
                                        </button>
                                    </div>
                                    {/* Guest visual dots */}
                                    <div className="flex items-center space-x-1 pt-1 overflow-hidden">
                                        {Array.from({ length: Math.min(data.guests, 20) }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-3 h-3 rounded-full bg-amber-400 transition-all duration-300 flex-shrink-0"
                                                style={{ opacity: 0.4 + (i / Math.max(data.guests, 1)) * 0.6 }}
                                            />
                                        ))}
                                        {data.guests > 12 && (
                                            <span className="text-[10px] text-slate-400 dark:text-slate-600 font-bold ml-1">+{data.guests - 12} more</span>
                                        )}
                                    </div>
                                    {errors.guests && <span className="text-rose-500 text-xs flex items-center space-x-1"><span>⚠</span><span>{errors.guests}</span></span>}
                                </div>

                                {/* ── Interactive Table Map ── */}
                                <div className="space-y-3 pt-2">
                                    <label className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-widest">
                                        <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                        <span>Select Your Table</span>
                                    </label>
                                    
                                    <div className="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-3xl border-2 border-slate-200 dark:border-slate-800 relative overflow-hidden">
                                        <div className="flex justify-between items-center mb-4 px-2">
                                            <span className="text-[10px] font-black uppercase text-slate-500">Entrance</span>
                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center space-x-1"><div className="w-3 h-3 rounded bg-emerald-500"></div><span className="text-[9px] text-slate-500 uppercase font-bold">Available</span></div>
                                                <div className="flex items-center space-x-1"><div className="w-3 h-3 rounded bg-slate-300 dark:bg-slate-700"></div><span className="text-[9px] text-slate-500 uppercase font-bold">Taken</span></div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                                            {[
                                                { id: 'T1', label: 'Window 1', status: 'available', type: '2-4' },
                                                { id: 'T2', label: 'Window 2', status: 'taken', type: '2-4' },
                                                { id: 'T3', label: 'Patio', status: 'available', type: '4-6' },
                                                { id: 'B1', label: 'Booth 1', status: 'available', type: '4-6' },
                                                { id: 'B2', label: 'Booth 2', status: 'available', type: '4-6' },
                                                { id: 'B3', label: 'Booth 3', status: 'taken', type: '4-6' },
                                            ].map(table => {
                                                const isSelected = data.table === table.id;
                                                const isTaken = table.status === 'taken';
                                                
                                                return (
                                                    <button
                                                        key={table.id}
                                                        type="button"
                                                        disabled={isTaken}
                                                        onClick={() => setData('table', table.id)}
                                                        className={`relative h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border-2 ${
                                                            isSelected 
                                                                ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105 z-10' 
                                                                : isTaken
                                                                    ? 'bg-slate-200/50 dark:bg-slate-800/50 border-transparent text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60'
                                                                    : 'bg-white dark:bg-[#111018] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-500'
                                                        }`}
                                                    >
                                                        {isSelected && (
                                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-md">
                                                                <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                                            </div>
                                                        )}
                                                        <span className="font-black text-sm">{table.id}</span>
                                                        <span className="text-[9px] uppercase tracking-widest font-bold mt-1">{table.label}</span>
                                                        <span className={`text-[8px] mt-0.5 ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>{table.type} pax</span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    {errors.table && <span className="text-rose-500 text-xs flex items-center space-x-1"><span>⚠</span><span>{errors.table}</span></span>}
                                </div>

                                {/* ── Summary Card ── */}
                                {data.name && data.date && data.time && data.table && (
                                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10 border border-amber-200 dark:border-amber-800/30 rounded-2xl p-4 space-y-2">
                                        <p className="text-amber-700 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest">Booking Summary</p>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>
                                                <span className="text-slate-400 text-xs">Name</span>
                                                <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm truncate">{data.name}</p>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 text-xs">Date</span>
                                                <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm">{data.date}</p>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 text-xs">Time</span>
                                                <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm">{TIME_SLOTS.find(s => s.value === data.time)?.label}</p>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 text-xs">Guests</span>
                                                <p className="text-slate-800 dark:text-slate-200 font-semibold text-sm">{data.guests} {data.guests === 1 ? 'person' : 'people'}</p>
                                            </div>
                                            <div>
                                                <span className="text-slate-400 text-xs">Table</span>
                                                <p className="text-amber-600 dark:text-amber-400 font-black text-sm">{data.table}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ── Submit Button ── */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full relative group overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-size-200 hover:bg-pos-100 text-slate-900 font-black py-5 rounded-2xl shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm uppercase tracking-widest flex items-center justify-center space-x-3 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    {processing ? (
                                        <>
                                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            <span>Reserving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>Confirm Reservation</span>
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-slate-400 dark:text-slate-600 text-xs">
                                    By reserving, you agree to our <span className="text-amber-500 cursor-pointer hover:underline">reservation policy</span>
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
