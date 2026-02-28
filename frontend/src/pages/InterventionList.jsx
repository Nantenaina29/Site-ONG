import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut, LayoutList, Trash2, Edit3, Send, RefreshCcw, Settings } from 'lucide-react';

const InterventionList = () => {
    const [interventions, setInterventions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1. Fanalana ny data avy amin'ny Supabase
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('interventions')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            setInterventions(data || []);
        } catch (error) {
            console.error("Fahadisoana:", error.message);
            Swal.fire('Erreur', 'Tsy azo ny data avy amin\'ny database', 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // 2. Logout mampiasa Supabase
    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Vous allez être déconnecté.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non'
        });

        if (result.isConfirmed) {
            await supabase.auth.signOut(); // Miala amin'ny Supabase session
            navigate('/login');
        }
    };

    // 3. Fafana ny intervention
    const deleteIntervention = async (id) => {
        const result = await Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Cette action est irréversible !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer'
        });

        if (result.isConfirmed) {
            try {
                const { error } = await supabase
                    .from('interventions')
                    .delete()
                    .eq('id', id);

                if (error) throw error;

                Swal.fire('Supprimé !', 'L\'intervention a été supprimée.', 'success');
                loadData(); 
            } catch (error) {
                Swal.fire('Erreur', error.message, 'error');
            }
        }
    };

    // 4. Hanovana ny statut (Publish)
    const togglePublish = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('interventions')
                .update({ is_published: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            Swal.fire({
                title: 'Succès !',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
            loadData();
        } catch (error) {
            console.error("Détails de l'erreur :", error); // Miseho menamena ao amin'ny console
        
            Swal.fire({
                title: 'Erreur !',
                text: `Impossible de modifier le statut : ${error.message || 'Une erreur est survenue'}`,
                icon: 'error',
                confirmButtonColor: '#ef4444', // Loko mena ho an'ny bokotra
                confirmButtonText: 'Fermer'
            });
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen font-sans">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <LayoutList size={28} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
                        Toutes les Interventions
                    </h2>
                </div>
        
                <div className="flex items-center gap-3">
                    <button 
                        onClick={loadData}
                        className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-all"
                        title="Actualiser"
                    >
                        <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
                    </button>

                    <Link 
                            to="/settings" 
                            className="p-3 bg-white border border-slate-100 text-slate-600 rounded-2xl shadow-sm hover:shadow-md hover:bg-slate-50 transition-all duration-300 group"
                            title="Paramètres"
                        >
                            <div className="group-hover:rotate-90 transition-transform duration-500">
                                {/* Importeo ny Settings avy amin'ny lucide-react */}
                                <Settings size={22} /> 
                            </div>
                        </Link>

                        <Link 
        to="/dashboard" 
        className="p-3.5 bg-linear-to-br from-indigo-600 to-blue-700 text-white rounded-2xl shadow-[0_8px_15px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_12px_20px_-5px_rgba(79,70,229,0.6)] hover:-translate-y-1 active:scale-95 transition-all duration-300 group"
        title="Ajouter Nouveau"
    >
        <PlusCircle size={22} className="group-hover:scale-110 transition-transform duration-300" />
    </Link>

    {/* DECONNEXION - Red Soft Glow Style */}
    <button 
        onClick={handleLogout}
        className="p-3.5 bg-red-50 text-red-600 rounded-2xl border border-red-100 hover:bg-red-600 hover:text-white hover:shadow-[0_8px_15px_-5px_rgba(220,38,38,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-300 group"
        title="Déconnexion"
    >
        <LogOut size={22} className="group-hover:-translate-x-1 transition-transform duration-300" />
    </button>
                </div>
            </div>

            {/* TABLEAU */}
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider">
                            <th className="px-5 py-4 border-b text-left">Aperçu</th>
                            <th className="px-5 py-4 border-b text-left">Titre & Lieu</th>
                            <th className="px-5 py-4 border-b text-left">Description</th>
                            <th className="px-5 py-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-5 py-20 text-center">
                                    <div className="flex justify-center items-center gap-3 text-gray-400">
                                        <RefreshCcw className="animate-spin" />
                                        <span>Chargement des interventions...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : interventions.length > 0 ? (
                            interventions.map((item) => (
                                <tr key={item.id} className="hover:bg-blue-50/30 transition border-b border-gray-50">
                                    <td className="px-5 py-5">
                                        {item.image ? (
                                            <img 
                                                src={`http://localhost:8000/storage/${item.image}`} 
                                                className="w-20 h-20 object-cover rounded-xl border shadow-sm"
                                                alt={item.title}
                                                onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Image+Dispo"; }}
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-gray-300">
                                                <LayoutList size={24} />
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-5 py-5">
                                        <p className="text-gray-900 font-bold text-lg">{item.title}</p>
                                        <p className="text-sm text-blue-600 font-semibold">{item.location}</p>
                                    </td>
                                    <td className="px-5 py-5 text-sm text-gray-600 max-w-xs">
                                        <p className="line-clamp-2">{item.description}</p>
                                    </td>
                                    <td className="px-5 py-5 text-center">
                                        <div className="flex justify-center items-center gap-2">
                                        <button 
                                            onClick={() => togglePublish(item.id)}
                                            className={`p-2 rounded-lg transition-all ${
                                                item.is_published 
                                                ? 'bg-emerald-600 text-white shadow-lg' 
                                                : 'text-emerald-600 hover:bg-emerald-50'
                                            }`}
                                            title={item.is_published ? "Retirer de l'accueil" : "Publier sur l'accueil"}
                                        >
                                            <Send size={18} />
                                        </button>

                                            <Link 
                                                to={`/dashboard/${item.id}`} 
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                title="Modifier"
                                            >
                                                <Edit3 size={18} />
                                            </Link>

                                            <button 
                                                onClick={() => deleteIntervention(item.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                title="Supprimer"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-5 py-20 text-center">
                                    <p className="text-gray-400 font-bold text-xl">Aucune donnée trouvée</p>
                                    <p className="text-gray-300">Vérifiez la connexion au serveur.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InterventionList;