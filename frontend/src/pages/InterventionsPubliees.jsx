import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { MapPin, Calendar, ArrowRight, X } from 'lucide-react';

const InterventionsPubliees = () => {
    const [interventions, setInterventions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null); // Ho an'ny Modal

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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header Section */}
            <div className="bg-indigo-700 text-white py-20 px-6 text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black mb-4">Nos Interventions</h1>
                <p className="text-indigo-100 max-w-2xl mx-auto font-medium">
                    Découvrez l'impact de nos actions sur le terrain et les projets réalisés pour les communautés.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {interventions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {interventions.map((item) => {
                            const images = Array.isArray(item.image) ? item.image : [item.image].filter(Boolean);
                            const mainImage = images[0] || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80";
                            const extraCount = images.length > 1 ? images.length - 1 : 0;

                            return (
                                <div 
                                    key={item.id} 
                                    className="bg-white rounded-4xl overflow-hidden shadow-lg shadow-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 group cursor-pointer"
                                    onClick={() => setSelectedItem(item)}
                                >
                                    {/* Image Section */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img 
                                            src={mainImage} 
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        
                                        {/* Badge Projet Réalisé */}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-black text-indigo-600 shadow-sm uppercase tracking-widest">
                                                Projet Réalisé
                                            </span>
                                        </div>

                                        {/* Badge +X raha misy sary maromaro */}
                                        {extraCount > 0 && (
                                            <div className="absolute bottom-4 right-4">
                                                <span className="bg-indigo-600/90 backdrop-blur px-3 py-1 rounded-lg text-sm font-bold text-white shadow-lg">
                                                    +{extraCount} sary hafa
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-8">
                                        <div className="flex items-center gap-2 text-indigo-500 mb-3">
                                            <MapPin size={16} />
                                            <span className="text-sm font-bold uppercase tracking-wide">{item.location}</span>
                                        </div>
                                        
                                        <h3 className="text-2xl font-black text-slate-800 mb-4 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                            {item.title}
                                        </h3>
                                        
                                        <p className="text-slate-500 font-medium leading-relaxed mb-6 line-clamp-3 italic">
                                            "{item.description}"
                                        </p>

                                        <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Calendar size={14} />
                                                <span className="text-xs font-bold">
                                                    {new Date(item.created_at).toLocaleDateString('fr-FR')}
                                                </span>
                                            </div>
                                            <button className="flex items-center gap-2 text-indigo-600 font-black text-sm group/btn">
                                                Détails <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[3rem] shadow-inner">
                        <p className="text-slate-400 font-bold text-xl">Aucune intervention publiée pour le moment.</p>
                    </div>
                )}
            </div>

            {/* MODAL "PREMIUM" - Miseho rehefa kitihina ny karatra */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col relative">
                        
                        {/* Bokotra hikatona */}
                        <button 
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-6 right-6 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-slate-100 transition-colors"
                        >
                            <X size={24} className="text-slate-800" />
                        </button>

                        <div className="overflow-y-auto p-6 md:p-10">
                            <div className="flex items-center gap-2 text-indigo-600 mb-4">
                                <MapPin size={20} />
                                <span className="font-bold uppercase tracking-wider">{selectedItem.location}</span>
                            </div>
                            
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">{selectedItem.title}</h2>
                            
                            {/* Grid ny sary rehetra */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {(Array.isArray(selectedItem.image) ? selectedItem.image : [selectedItem.image]).map((img, idx) => (
                                    <div key={idx} className="rounded-3xl overflow-hidden h-72">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>

                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                                <h4 className="text-lg font-black text-indigo-900 mb-4">Description du projet</h4>
                                <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">
                                    {selectedItem.description}
                                </p>
                            </div>

                            <div className="mt-8 flex items-center justify-between text-slate-400 font-medium">
                                <span>Publié le {new Date(selectedItem.created_at).toLocaleDateString('fr-FR')}</span>
                                <span className="text-indigo-600 font-bold italic">#{selectedItem.id.slice(0, 5)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InterventionsPubliees;