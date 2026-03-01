import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Camera, LayoutGrid } from 'lucide-react';

const Realisations = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRealisations = async () => {
            setLoading(true);
            const { data: result, error } = await supabase
                .from('interventions')
                .select('image, title, location')
                .eq('is_published', true)
                .order('created_at', { ascending: false });

            if (!error) {
                // Ampitomboina in-telo ny data mba ho hita hoe tsy tapaka ny loop (Seamless)
                setData([...result, ...result, ...result]);
            }
            setLoading(false);
        };
        fetchRealisations();
    }, []);

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            {/* --- 1. EN-TÊTE (HERO SECTION) --- */}
            <div className="bg-slate-900 py-20 px-6 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img 
                        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80" 
                        alt="Background" 
                        className="w-full h-full object-cover" 
                    />
                </div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
                        NOS RÉALISATIONS
                    </h1>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg font-medium">
                        Découvrez nos actions sur le terrain à travers cette galerie animée.
                    </p>
                </div>
            </div>

            {/* --- 2. ANIMATION SCROLL SECTION --- */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-sm">
                        <Camera size={20} />
                        <span>Galerie Panoramique</span>
                    </div>
                    <div className="h-px flex-1 bg-slate-100 mx-6 hidden md:block"></div>
                    <div className="text-slate-400 text-xs font-bold uppercase">
                        Défilement Automatique
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    /* Ny Container lehibe an'ny Animation */
                    <div className="relative w-full overflow-hidden group py-4">
                        {/* Ny div mikisaka (Marquee effect) */}
                        <div className="flex w-max animate-scroll-slow group-hover:pause-animation">
                            {data.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="flex-shrink-0 w-72 md:w-96 px-3"
                                >
                                    <div className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 group/item">
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                                        />
                                        {/* Overlay rehefa ambonin'ny sary (Hover) */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                            <p className="text-green-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                                                {item.location}
                                            </p>
                                            <h3 className="text-white text-lg font-bold leading-tight">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* --- 3. CSS KEYFRAMES (Ho an'ny Animation) --- */}
            <style>{`
                @keyframes scroll-slow {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-33.33%);
                    }
                }

                .animate-scroll-slow {
                    animation: scroll-slow 50s linear infinite;
                }

                .pause-animation:hover {
                    animation-play-state: paused;
                }

                /* Mobile optimization: Haingana kely rehefa amin'ny finday */
                @media (max-width: 768px) {
                    .animate-scroll-slow {
                        animation-duration: 30s;
                    }
                }
            `}</style>
        </div>
    );
};

export default Realisations;