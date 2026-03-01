import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Camera } from 'lucide-react';

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
                // In-4 averina mba ho seamless tsara ny scroll
                setData([...result, ...result, ...result, ...result]);
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
                       src="/img/Real.jpg"
                        alt="Background" 
                        className="w-full h-full object-cover" 
                    />
                </div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
                        Nos Réalisations
                    </h1>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg font-medium">
                        Découvrez nos actions sur le terrain à travers cette galerie animée.
                    </p>
                </div>
            </div>

            {/* --- 2. ANIMATION SCROLL SECTION --- */}
            <div className="py-24 bg-white relative">
                
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    /* NY CONTAINER LEHIBE MISY GRADIENT SISINY */
                    <div className="relative w-full overflow-hidden py-10">
                        
                        {/* --- GRADIENT EFFECT (Sisiny roa mampanjavona) --- */}
                        <div className="absolute inset-y-0 left-0 w-32 md:w-64 z-20 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none"></div>
                        <div className="absolute inset-y-0 right-0 w-32 md:w-64 z-20 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none"></div>

                        {/* NY DIV MIKISAKA */}
                        <div className="flex w-max animate-scroll-slow hover:pause-animation">
                            {data.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="flex-shrink-0 w-80 md:w-[450px] px-4 transition-all duration-1000"
                                >
                                    <div className="relative h-72 md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-50 group">
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                                        />
                                        
                                        {/* Overlay rehefa mipoitra (Hover) */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                                            <p className="text-green-400 text-xs font-black uppercase tracking-widest mb-2">
                                                {item.location}
                                            </p>
                                            <h3 className="text-white text-2xl font-bold leading-tight">
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

            {/* --- 3. CSS KEYFRAMES --- */}
            <style>{`
                @keyframes scroll-slow {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .animate-scroll-slow {
                    animation: scroll-slow 70s linear infinite;
                }

                .pause-animation:hover {
                    animation-play-state: paused;
                }

                @media (max-width: 768px) {
                    .animate-scroll-slow {
                        animation-duration: 40s;
                    }
                }
            `}</style>
        </div>
    );
};

export default Realisations;