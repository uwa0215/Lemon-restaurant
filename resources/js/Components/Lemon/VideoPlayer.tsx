import React, { useState, useEffect, useRef } from 'react';

interface VideoPlayerProps {
    playState: boolean;
    setPlayState: (state: boolean) => void;
}

interface Slide {
    image: string;
    title: string;
    description: string;
    subtitles: string;
}

const INTRO_SLIDES: Slide[] = [
    {
        image: '/assets/About.jpg',
        title: 'Welcome to Little Lemon',
        description: 'A culinary sanctuary of premium citrus gastronomy.',
        subtitles: 'Welcome to Little Lemon. A heritage sanctuary celebrating Batangas citrus gastronomy.'
    },
    {
        image: '/assets/lemon.jfif',
        title: 'Artisanal Fresh Sips',
        description: 'Our signature cold-pressed lemonades, pressed fresh daily.',
        subtitles: 'Every beverage is cold-pressed daily from tree-ripened organic lemons with wild forest honey.'
    },
    {
        image: '/assets/lemonade1.jpg',
        title: 'Decadent Patisserie',
        description: 'Delicate, freshly baked pastries matching Belgian chocolate.',
        subtitles: 'Our pastry kitchen blends tropical fruits with premium Belgian chocolates for pure balance.'
    },
    {
        image: '/assets/menu2.jpg',
        title: 'Elegant Dining Vibe',
        description: 'A visual tribute to Philippines tropical flavors.',
        subtitles: 'Experience Michelin-starred inspiration, ambient gold lighting, and warm local hospitality.'
    },
    {
        image: '/assets/menu3.jpg',
        title: 'Reserve Your Experience',
        description: 'Secure your table today for an unforgettable culinary journey.',
        subtitles: 'We invite you to taste the sunshine. Book your reservation in just a few clicks.'
    }
];

export default function VideoPlayer({ playState, setPlayState }: VideoPlayerProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!playState) return;
        
        if (isPlaying) {
            const step = 2; // progress step %
            const speed = 100; // ms per step
            intervalRef.current = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        setCurrentSlide(s => (s + 1) % INTRO_SLIDES.length);
                        return 0;
                    }
                    return prev + step;
                });
            }, speed);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isPlaying, playState]);

    useEffect(() => {
        if (!playState) {
            setCurrentSlide(0);
            setProgress(0);
            setIsPlaying(true);
        }
    }, [playState]);

    if (!playState) return null;

    const activeSlide = INTRO_SLIDES[currentSlide];

    return (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 flex items-center justify-center p-4 backdrop-blur-md transition-opacity duration-300">
            <div className="relative w-full max-w-4xl border border-slate-800 bg-slate-950 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col aspect-video">
                
                {/* Video Viewport */}
                <div className="relative flex-1 w-full overflow-hidden bg-slate-900 group">
                    {/* Slide Image with Ken Burns effect */}
                    <div className="absolute inset-0 w-full h-full">
                        <img 
                            src={activeSlide.image} 
                            alt={activeSlide.title} 
                            className={`w-full h-full object-cover transition-transform duration-[5000ms] ease-out ${
                                isPlaying ? 'scale-110 translate-y-2' : 'scale-100 translate-y-0'
                            }`}
                        />
                        {/* Dark Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
                    </div>

                    {/* Top Controls Overlay */}
                    <div className="absolute top-0 inset-x-0 p-6 flex justify-between items-center z-10">
                        <div className="flex items-center space-x-2.5">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                                Featurette
                            </span>
                            <span className="text-white text-xs font-semibold font-serif">Little Lemon Heritage</span>
                        </div>
                        <button 
                            onClick={() => setPlayState(false)}
                            className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 flex items-center justify-center text-white text-lg transition-all"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Core Title and Subtitles Overlay */}
                    <div className="absolute bottom-16 inset-x-0 px-8 text-center space-y-4 z-10">
                        <div className="space-y-1">
                            <span className="text-amber-500 text-[10px] tracking-[0.25em] uppercase font-black">Presentation Video</span>
                            <h3 className="text-2xl md:text-3xl font-bold font-serif text-white">{activeSlide.title}</h3>
                            <p className="text-xs text-slate-350">{activeSlide.description}</p>
                        </div>
                        
                        {/* Elegant Subtitle Caption Box */}
                        <div className="bg-black/50 border border-white/10 rounded-xl px-5 py-3 max-w-xl mx-auto backdrop-blur-md">
                            <p className="text-slate-100 text-sm leading-relaxed font-sans">{activeSlide.subtitles}</p>
                        </div>
                    </div>

                    {/* Timeline Progress Bar */}
                    <div className="absolute bottom-0 inset-x-0 h-1.5 bg-white/10 z-20">
                        <div 
                            className="h-full bg-amber-500 transition-all duration-100 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Bottom Control Bar */}
                <div className="bg-slate-950 p-4 px-6 border-t border-slate-900 flex items-center justify-between z-10 text-slate-400">
                    <div className="flex items-center space-x-4">
                        {/* Play/Pause Button */}
                        <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="text-amber-500 hover:text-amber-400 transition-colors p-1"
                        >
                            {isPlaying ? (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>

                        {/* Navigation Buttons */}
                        <div className="flex items-center space-x-2">
                            <button 
                                onClick={() => {
                                    setCurrentSlide(s => (s - 1 + INTRO_SLIDES.length) % INTRO_SLIDES.length);
                                    setProgress(0);
                                }}
                                className="hover:text-white transition-colors text-xs font-bold"
                            >
                                Prev
                            </button>
                            <span className="text-[10px] text-slate-600">|</span>
                            <button 
                                onClick={() => {
                                    setCurrentSlide(s => (s + 1) % INTRO_SLIDES.length);
                                    setProgress(0);
                                }}
                                className="hover:text-white transition-colors text-xs font-bold"
                            >
                                Next
                            </button>
                        </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                        Slide {currentSlide + 1} of {INTRO_SLIDES.length}
                    </div>
                </div>

            </div>
        </div>
    );
}
