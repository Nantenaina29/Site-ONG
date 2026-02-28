import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { MapPin, Search, LayoutGrid, Camera } from 'lucide-react';

const Realisations = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRealisations = async () => {
            setLoading(true);
            const { data: result, error } = await supabase
                .from('interventions')
                .select('*')
                .eq('is_published', true) // Ireo efa nekena ihany
                .order('created_at', { ascending: false });

            if (!error) setData(result);
            setLoading(false);
        };
        fetchRealisations();
    }, []);

    // Sivana (Filter) hitadiavana amin'ny alalan'ny anarana na toerana
    const filteredData = data.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white">
            {/* --- HERO SECTION --- */}
            <div className="bg-slate-900 py-24 px-6 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80" alt="bg" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-black mb-4 tracking-tighter">NOS RÉALISATIONS</h1>
                    <p className="text-slate-400 max-w-xl mx-auto text-lg">
                        Hitanareo eto ny dingana rehetra sy ny vokatry ny ezaka nataon'ny ONG teny an-kianja.
                    </p>
                </div>
            </div>

            {/* --- SEARCH & FILTERS --- */}
            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
                <div className="bg-white p-4 rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 relative w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Rechercher un projet ou un lieu..."
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4 px-4 text-slate-500 font-bold border-l border-slate-100 hidden md:flex">
                        <LayoutGrid size={20} />
                        <span>{filteredData.length} Projets</span>
                    </div>
                </div>
            </div>

            {/* --- GRID REALISATIONS --- */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                        {filteredData.map((item) => (
                            <div key={item.id} className="break-inside-avoid bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-500 group">
                                {/* Sary */}
                                <div className="relative cursor-pointer overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                        <div className="text-white">
                                            <div className="flex items-center gap-2 text-xs font-bold mb-2">
                                                <Camera size={14} /> GALERIE PHOTO
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Fanazavana */}
                                <div className="p-8">
                                    <div className="flex items-center gap-2 text-indigo-600 mb-3">
                                        <MapPin size={16} />
                                        <span className="text-xs font-black uppercase tracking-widest">{item.location}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-800 mb-4 leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed italic">
                                        "{item.description}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filteredData.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-400 font-bold">Tsy misy vokatra mifanaraka amin'ny fikarohanao.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Realisations;