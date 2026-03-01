import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { MapPin, Calendar, ArrowRight, X, Image as ImageIcon } from 'lucide-react';

const InterventionsPubliees = () => {
    const [interventions, setInterventions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchPublishedData = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('interventions')
                    .select('*')
                    .eq('is_published', true)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setInterventions(data || []);
            } catch (err) {
                console.error("Erreur:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPublishedData();
    }, []);

    // Fiarovana raha mikatona ny modal (Esc key)
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setSelectedItem(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 font-bold text-[10px]">Loading</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20 font-sans">
            {/* Header Section */}
            <div className="bg-indigo-700 text-white py-24 px-6 text-center mb-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                </div>
                <h1 className="relative text-4xl md:text-6xl font-black mb-6 tracking-tight">Nos Interventions</h1>
                <p className="relative text-indigo-100 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                    Découvrez l'impact de nos actions sur le terrain et les projets réalisés pour les communautés.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {interventions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {interventions.map((item) => {
                            // Fiarovana ny sary
                            let images = [];
                            try {
                                if (Array.isArray(item.image)) {
                                    images = item.image;
                                } else if (typeof item.image === 'string') {
                                    if (item.image.startsWith('[')) {
                                        images = JSON.parse(item.image);
                                    } else {
                                        images = [item.image];
                                    }
                                }
                            } catch  {
                                images = [];
                            }
                            images = images.filter(Boolean);
                            
                            const mainImage = images[0] || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80";
                            const extraCount = images.length > 1 ? images.length - 1 : 0;

                            return (
                                <div 
                                    key={item.id} 
                                    className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 group cursor-pointer flex flex-col h-full"
                                    onClick={() => setSelectedItem(item)}
                                >
                                    {/* Image Container */}
                                    <div className="relative h-72 overflow-hidden">
                                        <img 
                                            src={mainImage} 
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        <div className="absolute top-5 left-5">
                                            <span className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-indigo-700 shadow-xl uppercase tracking-[0.2em]">
                                                Projet Réalisé
                                            </span>
                                        </div>

                                        {extraCount > 0 && (
                                            <div className="absolute bottom-5 right-5">
                                                <div className="flex items-center gap-2 bg-indigo-600/90 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-bold text-white shadow-2xl border border-white/20">
                                                    <ImageIcon size={14} />
                                                    <span>+{extraCount} sary hafa</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 text-indigo-500 mb-4">
                                            <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                                                <MapPin size={14} strokeWidth={3} />
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-widest">{item.location}</span>
                                        </div>
                                        
                                        <h3 className="text-2xl font-black text-slate-800 mb-4 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        
                                        <p className="text-slate-500 font-medium leading-relaxed mb-8 line-clamp-3 italic">
                                            "{item.description}"
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Calendar size={14} />
                                                <span className="text-[11px] font-bold">
                                                    {new Date(item.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-indigo-600 font-black text-sm group-hover:gap-3 transition-all">
                                                Détails <ArrowRight size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-[4rem] shadow-inner border-2 border-dashed border-slate-100 px-6">
                        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ImageIcon className="text-slate-300" size={32} />
                        </div>
                        <p className="text-slate-400 font-bold text-xl">Aucune intervention publiée pour le moment.</p>
                    </div>
                )}
            </div>

            {/* MODAL - FIXED SECTION */}
            {selectedItem && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/95 backdrop-blur-md animate-in fade-in zoom-in duration-300"
                    onClick={() => setSelectedItem(null)}
                >
                    <div 
                        className="bg-white w-full max-w-6xl max-h-[95vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button 
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-6 right-6 z-50 p-3 bg-slate-100 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all duration-300 shadow-lg group"
                        >
                            <X size={24} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        <div className="overflow-y-auto p-8 md:p-14">
                            <div className="flex items-center gap-2 text-indigo-600 mb-4">
                                <MapPin size={22} strokeWidth={3} />
                                <span className="font-black uppercase tracking-[0.2em] text-sm">{selectedItem.location}</span>
                            </div>
                            
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-10 leading-tight">
                                {selectedItem.title}
                            </h2>
                            
                            {/* Grid Photos - Corrected Parsing for Modal */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                {(Array.isArray(selectedItem.image) 
                                    ? selectedItem.image 
                                    : (typeof selectedItem.image === 'string' && selectedItem.image.startsWith('[') 
                                        ? JSON.parse(selectedItem.image) 
                                        : [selectedItem.image])
                                ).filter(Boolean).map((img, idx) => (
                                    <div key={idx} className="group relative rounded-[2rem] overflow-hidden h-80 shadow-lg border border-slate-100">
                                        <img 
                                            src={img} 
                                            alt="" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="bg-indigo-50/50 p-8 md:p-12 rounded-[2.5rem] border border-indigo-100 mb-8">
                                <h4 className="text-xl font-black text-indigo-900 mb-6 flex items-center gap-3">
                                    <div className="w-8 h-1 bg-indigo-600 rounded-full"></div>
                                    Description du projet
                                </h4>
                                <p className="text-slate-700 leading-[1.8] text-lg font-medium whitespace-pre-wrap">
                                    {selectedItem.description}
                                </p>
                            </div>

                            <div className="mt-4 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-slate-400 font-bold text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} />
                                    <span>Publié le {new Date(selectedItem.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                                <span className="bg-slate-100 px-4 py-2 rounded-xl text-slate-500 italic">
                                    ID: #{String(selectedItem.id).slice(0, 8)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterventionsPubliees;