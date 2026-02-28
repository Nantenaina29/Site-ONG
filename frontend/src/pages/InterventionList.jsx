import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut, LayoutList, Trash2, Edit3, Send, RefreshCcw, Settings } from 'lucide-react';

const InterventionList = () => {
    const [interventions, setInterventions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/interventions', {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            console.log("Data azo:", response.data);

            const rawData = response.data.data || response.data;

            setInterventions(Array.isArray(rawData) ? rawData : []);
        } catch (error) {
            console.error("Fahadisoana:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleLogout = () => {
        Swal.fire({
          title: 'Êtes-vous sûr ?',
          text: "Vous allez être déconnecté.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4f46e5', 
          cancelButtonColor: '#d33',     
          confirmButtonText: 'Oui',
          cancelButtonText: 'Non',
          reverseButtons: true 
        }).then((result) => {
          if (result.isConfirmed) {
            // 1. Fafana ny token
            localStorage.removeItem('token');
            
            Swal.fire({
              title: 'Déconnecté !',
              text: 'À bientôt.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
      
            // 3. Mandefa any amin'ny login
            setTimeout(() => {
              navigate('/login');
            }, 1500);
          }
        });
      };

    const deleteIntervention = async (id) => {
        const result = await Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Cette action est irréversible !",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            cancelButtonText: 'Non',
            confirmButtonText: 'Oui'
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://127.0.0.1:8000/api/interventions/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                Swal.fire('Supprimé !', 'L\'intervention a été supprimée.', 'success');
                loadData(); 
            } catch (error) {
                console.error("Détails de l'erreur:", error);
                Swal.fire('Erreur', 'Impossible de supprimer.', 'error');
            }
        }
    };

    const togglePublish = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(`http://127.0.0.1:8000/api/interventions/${id}/publish`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            Swal.fire({
                title: 'Succès !',
                text: response.data.message,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });
    
            loadData(); // Refresh ny lisitra mba hahitana ny fiovana
        } catch (error) {
            console.error("Erreur de publication:", error);
            Swal.fire('Erreur', 'Impossible de modifier le statut.', 'error');
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