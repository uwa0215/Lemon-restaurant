import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const TOPICS = ['General Inquiry', 'Reservation', 'Feedback', 'Catering', 'Partnership', 'Other'];

const CONTACT_INFO = [
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        label: 'Email Us',
        value: 'littlelemon@gmail.com',
        sub: 'We reply within 24 hours',
        color: 'from-blue-500 to-indigo-500',
        bg: 'bg-blue-50 dark:bg-blue-900/10',
        border: 'border-blue-100 dark:border-blue-900/30',
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
        label: 'Call Us',
        value: '+63 975 236 3469',
        sub: 'Mon–Sun, 5 PM – 11 PM',
        color: 'from-emerald-500 to-teal-500',
        bg: 'bg-emerald-50 dark:bg-emerald-900/10',
        border: 'border-emerald-100 dark:border-emerald-900/30',
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        label: 'Find Us',
        value: 'City of Santo Tomas',
        sub: 'Maharlika Highway, Batangas',
        color: 'from-amber-500 to-orange-500',
        bg: 'bg-amber-50 dark:bg-amber-900/10',
        border: 'border-amber-100 dark:border-amber-900/30',
    },
];

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        message: '',
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [particles, setParticles] = useState<
        { id: number; x: number; y: number; color: string; delay: number; r: number }[]
    >([]);
    const [selectedTopic, setSelectedTopic] = useState('General Inquiry');
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const triggerConfetti = () => {
        const colors = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#ec4899', '#8b5cf6'];
        const tempParticles: typeof particles = [];
        for (let i = 0; i < 55; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 180;
            tempParticles.push({
                id: i,
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance - 20,
                color: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 300,
                r: 180 + Math.random() * 360,
            });
        }
        setParticles(tempParticles);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => {
                setShowSuccess(true);
                triggerConfetti();
                reset();
                setTimeout(() => {
                    setShowSuccess(false);
                    setParticles([]);
                }, 5000);
            },
        });
    };

    return (
        <section id="contact" className="relative py-28 overflow-hidden transition-colors duration-300 bg-slate-50 dark:bg-[#06050a]">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-amber-400/5 dark:bg-amber-400/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-400/5 dark:bg-blue-400/5 rounded-full blur-3xl" />
                {/* Decorative grid dots */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.015] dark:opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="contact-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-slate-900 dark:text-white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#contact-dots)" />
                </svg>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Section Header ── */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-full px-5 py-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                        <span className="text-amber-600 dark:text-amber-400 font-black text-[10px] uppercase tracking-[0.2em]">Get In Touch</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
                        Drop Us <span className="text-amber-500">A Line</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                        Have a question, feedback, or want to make a reservation? We'd love to hear from you!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* ── LEFT: Contact Info Cards ── */}
                    <div className="lg:col-span-4 space-y-4">
                        {/* Info Cards */}
                        {CONTACT_INFO.map((info) => (
                            <div
                                key={info.label}
                                className={`group flex items-start space-x-4 ${info.bg} border ${info.border} rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-default`}
                            >
                                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                                    {info.icon}
                                </div>
                                <div>
                                    <p className="text-slate-500 dark:text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-0.5">{info.label}</p>
                                    <p className="text-slate-900 dark:text-slate-100 font-bold text-sm">{info.value}</p>
                                    <p className="text-slate-400 dark:text-slate-600 text-xs mt-0.5">{info.sub}</p>
                                </div>
                            </div>
                        ))}

                        {/* Opening Hours card */}
                        <div className="bg-gradient-to-br from-amber-500 to-yellow-400 rounded-2xl p-6 relative overflow-hidden shadow-xl shadow-amber-500/20">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-6 -translate-x-6" />
                            <div className="relative z-10 space-y-3">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-white/80 text-[10px] uppercase tracking-widest font-black">Opening Hours</span>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { day: 'Mon – Fri', time: '5:00 PM – 11:00 PM' },
                                        { day: 'Sat – Sun', time: '4:00 PM – 11:30 PM' },
                                    ].map(h => (
                                        <div key={h.day} className="flex justify-between items-center">
                                            <span className="text-white/70 text-xs font-medium">{h.day}</span>
                                            <span className="text-white text-xs font-bold bg-white/20 rounded-full px-3 py-0.5">{h.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: Contact Form ── */}
                    <div className="lg:col-span-8">
                        <div className="bg-white dark:bg-[#0c0b11] border border-slate-200/60 dark:border-slate-800/60 rounded-3xl shadow-2xl dark:shadow-slate-950/60 overflow-hidden relative">

                            {/* Top accent bar */}
                            <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />

                            <div className="p-8 md:p-10">
                                {/* Form header */}
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">Send a Message</h3>
                                        <p className="text-slate-400 dark:text-slate-600 text-xs mt-1">All fields are required</p>
                                    </div>
                                    <div className="hidden sm:flex items-center space-x-1.5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 rounded-full px-4 py-2">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">Online</span>
                                    </div>
                                </div>

                                {showSuccess ? (
                                    /* ── SUCCESS ── */
                                    <div className="text-center py-16 px-4 space-y-6 relative overflow-hidden flex flex-col items-center">
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
                                        <div className="relative flex items-center justify-center">
                                            <div className="absolute w-28 h-28 bg-amber-400/10 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                                            <div className="absolute w-20 h-20 bg-amber-400/15 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
                                            <div className="w-18 h-18 w-[72px] h-[72px] bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/40">
                                                <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-3xl font-bold font-serif text-slate-900 dark:text-white">Message Sent! 🎉</h4>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
                                                Thank you for reaching out! We'll get back to you within 24 hours.
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl px-6 py-3">
                                            <span className="text-amber-500 text-lg">✨</span>
                                            <span className="text-amber-700 dark:text-amber-400 text-xs font-bold">We appreciate you contacting Little Lemon!</span>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={onSubmit} className="space-y-6">

                                        {/* Topic Chips */}
                                        <div className="space-y-2">
                                            <label className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-widest">
                                                <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a2 2 0 012-2z" />
                                                </svg>
                                                <span>Topic</span>
                                            </label>
                                            <div className="flex flex-wrap gap-2">
                                                {TOPICS.map(topic => (
                                                    <button
                                                        key={topic}
                                                        type="button"
                                                        onClick={() => setSelectedTopic(topic)}
                                                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border-2 ${
                                                            selectedTopic === topic
                                                                ? 'bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-500/25 scale-105'
                                                                : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400'
                                                        }`}
                                                    >
                                                        {topic}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Name + Phone row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            {/* Name */}
                                            <div className="space-y-1.5">
                                                <label className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-widest">
                                                    <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <span>Your Name</span>
                                                </label>
                                                <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'scale-[1.01]' : ''}`}>
                                                    <input
                                                        type="text"
                                                        value={data.name}
                                                        onChange={e => setData('name', e.target.value)}
                                                        onFocus={() => setFocusedField('name')}
                                                        onBlur={() => setFocusedField(null)}
                                                        placeholder="Maria Santos"
                                                        className="w-full bg-slate-50 dark:bg-slate-900/60 border-2 border-slate-200 dark:border-slate-800 focus:border-amber-400 dark:focus:border-amber-500 rounded-2xl py-3.5 px-4 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:ring-4 focus:ring-amber-400/10 outline-none transition-all duration-300 text-sm font-medium"
                                                        required
                                                    />
                                                    {data.name && (
                                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                                                            <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                {errors.name && <p className="text-rose-500 text-xs flex items-center space-x-1"><span>⚠</span><span>{errors.name}</span></p>}
                                            </div>

                                            {/* Phone */}
                                            <div className="space-y-1.5">
                                                <label className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-widest">
                                                    <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span>Phone</span>
                                                </label>
                                                <div className={`relative flex transition-all duration-300 ${focusedField === 'phone' ? 'scale-[1.01]' : ''}`}>
                                                    <div className="flex-shrink-0 flex items-center bg-slate-100 dark:bg-slate-800 border-2 border-r-0 border-slate-200 dark:border-slate-800 rounded-l-2xl px-3">
                                                        <span className="text-slate-500 dark:text-slate-400 text-sm font-bold">🇵🇭</span>
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        value={data.phone}
                                                        onChange={e => setData('phone', e.target.value)}
                                                        onFocus={() => setFocusedField('phone')}
                                                        onBlur={() => setFocusedField(null)}
                                                        placeholder="0917-123-4567"
                                                        className="flex-1 bg-slate-50 dark:bg-slate-900/60 border-2 border-slate-200 dark:border-slate-800 focus:border-amber-400 dark:focus:border-amber-500 rounded-r-2xl py-3.5 px-4 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:ring-4 focus:ring-amber-400/10 outline-none transition-all duration-300 text-sm font-medium"
                                                        required
                                                    />
                                                </div>
                                                {errors.phone && <p className="text-rose-500 text-xs flex items-center space-x-1"><span>⚠</span><span>{errors.phone}</span></p>}
                                            </div>
                                        </div>

                                        {/* Message */}
                                        <div className="space-y-1.5">
                                            <label className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-bold text-xs uppercase tracking-widest">
                                                <span className="flex items-center space-x-2">
                                                    <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                    </svg>
                                                    <span>Message</span>
                                                </span>
                                                <span className={`normal-case font-normal tracking-normal text-[10px] ${data.message.length > 450 ? 'text-rose-400' : 'text-slate-400 dark:text-slate-600'}`}>
                                                    {data.message.length} / 500
                                                </span>
                                            </label>
                                            <div className={`relative transition-all duration-300 ${focusedField === 'message' ? 'scale-[1.005]' : ''}`}>
                                                <textarea
                                                    value={data.message}
                                                    onChange={e => setData('message', e.target.value.slice(0, 500))}
                                                    onFocus={() => setFocusedField('message')}
                                                    onBlur={() => setFocusedField(null)}
                                                    rows={5}
                                                    placeholder={`Tell us about your ${selectedTopic.toLowerCase()}...`}
                                                    className="w-full bg-slate-50 dark:bg-slate-900/60 border-2 border-slate-200 dark:border-slate-800 focus:border-amber-400 dark:focus:border-amber-500 rounded-2xl py-4 px-4 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:ring-4 focus:ring-amber-400/10 outline-none transition-all duration-300 resize-none text-sm font-medium"
                                                    required
                                                />
                                                {/* Character bar */}
                                                <div className="absolute bottom-3 right-3 w-24 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-300 ${data.message.length > 450 ? 'bg-rose-400' : 'bg-amber-400'}`}
                                                        style={{ width: `${(data.message.length / 500) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                            {errors.message && <p className="text-rose-500 text-xs flex items-center space-x-1"><span>⚠</span><span>{errors.message}</span></p>}
                                        </div>

                                        {/* Submit */}
                                        <div className="flex flex-col sm:flex-row gap-3 pt-1">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="flex-1 relative group overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-900 font-black py-4 rounded-2xl shadow-xl shadow-amber-500/25 hover:shadow-amber-500/45 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm uppercase tracking-widest flex items-center justify-center space-x-3 disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                {/* shimmer */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                                {processing ? (
                                                    <>
                                                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                        </svg>
                                                        <span>Sending…</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                        </svg>
                                                        <span>Send Message</span>
                                                    </>
                                                )}
                                            </button>

                                            {/* Quick call button */}
                                            <a
                                                href="tel:+639752363469"
                                                className="sm:w-auto flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-all duration-200 text-sm font-bold"
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <span>Quick Call</span>
                                            </a>
                                        </div>

                                        <p className="text-center text-slate-400 dark:text-slate-600 text-xs pt-1">
                                            🔒 Your information is kept private and never shared.
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
