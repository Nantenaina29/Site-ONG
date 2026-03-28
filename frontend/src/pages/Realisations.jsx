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

            if (!error && result) {
                // ETO NO FANDALANANA NY SARY TSIRAIRAY:
                // Mamorona lisitra vaovao izay misy "object" iray isaky ny sary hita
                const saryTsirairay = [];
                
                result.forEach(intervention => {
                    let listSary = [];
                    if (Array.isArray(intervention.image)) {
                        listSary = intervention.image.filter(img => img !== "" && img !== null);
                    } else if (typeof intervention.image === 'string' && intervention.image.includes(',')) {
                        listSary = intervention.image.split(',').map(item => item.trim()).filter(img => img !== "");
                    } else if (intervention.image) {
                        listSary = [intervention.image];
                    }

                    // Isaky ny sary hita ao anatin'ny intervention iray, dia mamorona "item" vaovao
                    listSary.forEach(saryUrl => {
                        saryTsirairay.push({
                            url: saryUrl,
                            title: intervention.title,
                            location: intervention.location
                        });
                    });
                });

                // Averina in-telo mba ho seamless ny scroll
                setData([...saryTsirairay, ...saryTsirairay, ...saryTsirairay]);
            }
            setLoading(false);
        };
        fetchRealisations();
    }, []);

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">
            {/* --- 1. EN-TÊTE --- */}
            <div className="bg-slate-900 py-20 px-6 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-50">
                    <img src="/Real.jpg" alt="Background" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">NOS RÉALISATIONS</h1>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg font-medium">
                        Chaque image capturée ici est le témoin d'un engagement profond...
                    </p>
                </div>
            </div>

            {/* --- 2. ANIMATION SCROLL SECTION --- */}
            <div className="py-16 bg-white relative">
                {/* ... (Header kely: Galerie Panoramique) ... */}
                
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="relative w-full overflow-hidden group py-4">
                        <div className="absolute inset-y-0 left-0 w-32 md:w-64 z-10 bg-linear-to-r from-white to-transparent pointer-events-none"></div>
                        <div className="absolute inset-y-0 right-0 w-32 md:w-64 z-10 bg-linear-to-l from-white to-transparent pointer-events-none"></div>

                        <div className="flex w-max animate-scroll-slow group-hover:pause-animation">
                            {data.map((item, index) => (
                                <div key={index} className="shrink-0 w-72 md:w-96 px-3">
                                    <div className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 group/item bg-slate-50">
                                        <img 
                                            src={item.url} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                                        />
                                        
                                        {/* Tsy misy badge +11 intsony eto */}

                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
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

            <style>{`
                @keyframes scroll-slow {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-scroll-slow { animation: scroll-slow 80s linear infinite; }
                .pause-animation:hover { animation-play-state: paused; }
            `}</style>
        </div>
    );
};

export default Realisations;