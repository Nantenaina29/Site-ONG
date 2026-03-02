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
                // Averina in-telo ny data mba ho seamless ny loop
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
            <div className="absolute inset-0 opacity-50"> {/* Ovay eto ny opacity */}
                <img 
                    src="/Real.jpg" 
                    alt="Background" 
                    className="w-full h-full object-cover" 
                />
            </div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
                        NOS RÉALISATIONS
                    </h1>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg font-medium">
                         Chaque image capturée ici est le témoin d'un engagement profond et d'une volonté inébranlable d'apporter un changement durable. 
                        À travers nos interventions stratégiques et nos projets de proximité, nous transformons des défis complexes en opportunités concrètes 
                        pour les communautés locales.
                    </p>
                </div>
            </div>

            {/* --- 2. ANIMATION SCROLL SECTION --- */}
            <div className="py-16 bg-white relative">
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
                    /* Ny Container lehibe miaraka amin'ny fading effect (Gradient) */
                    <div className="relative w-full overflow-hidden group py-4">
                        
                        {/* Gradient Overlay Ankavia (Mampanjavona) */}
                        <div className="absolute inset-y-0 left-0 w-32 md:w-64 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
                        
                        {/* Gradient Overlay Ankavanana (Mampanjavona) */}
                        <div className="absolute inset-y-0 right-0 w-32 md:w-64 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

                        {/* Ny div mikisaka (Marquee effect) */}
                        <div className="flex w-max animate-scroll-slow group-hover:pause-animation">
                        {data.flatMap((intervention, interventionIndex) => 
                            // Raha misy array "images" ao anatin'ny intervention tsirairay
                            intervention.images.map((imgUrl, imgIndex) => (
                                <div 
                                    key={`${interventionIndex}-${imgIndex}`} 
                                    className="flex-shrink-0 w-72 md:w-96 px-3"
                                >
                                    <div className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 group/item">
                                        <img 
                                            src={imgUrl} 
                                            alt={intervention.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                                        />
                                        
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                            <p className="text-green-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                                                {intervention.location} {/* Ohatra: "Sary {imgIndex + 1}" */}
                                            </p>
                                            <h3 className="text-white text-lg font-bold leading-tight">
                                                {intervention.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    </div>
                )}
            </div>

            {/* --- 3. CSS KEYFRAMES --- */}
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
                    animation: scroll-slow 60s linear infinite;
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