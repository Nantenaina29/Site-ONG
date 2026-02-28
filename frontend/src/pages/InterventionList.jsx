import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, LogOut, LayoutList, Trash2, Edit3, Send, RefreshCcw, Settings, MapPin, X, Save } from 'lucide-react';

const InterventionList = () => {
    const [interventions, setInterventions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // --- STATES VAOVAO HO AN'NY FORMULAIRE ---
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        description: '',
        image: '',
        is_published: false
    });

    // 1. Chargement des données depuis Supabase
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
            console.error("Erreur de chargement:", error.message);
            Swal.fire('Erreur', 'Impossible de récupérer les données de la base de données', 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // 2. Déconnexion (Auth Supabase)
    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Votre session actuelle sera fermée.",
            icon: 'warning',
            showCancelButton: true,
            // Eto dia loko iray ihany no tazonina (ilay mena #d33 ohatra)
            confirmButtonColor: '#d33', 
            cancelButtonColor: '#4f46e5', // Azonao ampiasaina amin'ny bokotra "Annuler" ilay loko manga
            confirmButtonText: 'Oui, se déconnecter',
            cancelButtonText: 'Annuler'
        });

        if (result.isConfirmed) {
            await supabase.auth.signOut();
            navigate('/login');
        }
    };

    // 3. Suppression d'une intervention
    const deleteIntervention = async (id) => {
        const result = await Swal.fire({
            title: 'Confirmation de suppression',
            text: "Cette action est irréversible !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler'
        });

        if (result.isConfirmed) {
            try {
                const { error } = await supabase
                    .from('interventions')
                    .delete()
                    .eq('id', id);

                if (error) throw error;

                Swal.fire('Supprimé !', 'L\'intervention a été supprimée avec succès.', 'success');
                loadData(); 
            } catch (error) {
                Swal.fire('Erreur', error.message, 'error');
            }
        }
    };

    // 4. Gestion de la publication (is_published)
    const togglePublish = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('interventions')
                .update({ is_published: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            Swal.fire({
                title: !currentStatus ? 'Publié avec succès !' : 'Retiré de la page d\'accueil',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
            loadData();
        } catch (error) {
            Swal.fire('Erreur', error.message, 'error');
        }
    };

    // --- 5. FONCTIONS VAOVAO HO AN'NY FORMULAIRE (AJOUT / MODIF) ---
    
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({
            title: item.title,
            location: item.location,
            description: item.description,
            image: item.image || '',
            is_published: item.is_published
        });
        setIsFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setFormData({ title: '', location: '', description: '', image: '', is_published: false });
        setEditingId(null);
        setIsFormOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                // MODIFICATION
                const { error } = await supabase
                    .from('interventions')
                    .update(formData)
                    .eq('id', editingId);
                if (error) throw error;
                Swal.fire('Succès', 'Intervention modifiée !', 'success');
            } else {
                // AJOUT
                const { error } = await supabase
                    .from('interventions')
                    .insert([formData]);
                if (error) throw error;
                Swal.fire('Succès', 'Nouvelle intervention ajoutée !', 'success');
            }
            resetForm();
            loadData();
        } catch (error) {
            Swal.fire('Erreur', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen font-sans">
            {/* EN-TÊTE (HEADER) */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600">
                        <LayoutList size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
                            Gestion des Interventions
                        </h2>
                        <p className="text-sm text-gray-500">Gérez ici toutes les activités de l'ONG</p>
                    </div>
                </div>
        
                <div className="flex items-center gap-3">
                    <button 
                        onClick={loadData}
                        className="p-3 text-gray-500 hover:bg-gray-100 rounded-2xl transition-all"
                        title="Actualiser les données"
                    >
                        <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
                    </button>

                    <Link 
                        to="/settings" 
                        className="p-3 bg-white border border-slate-100 text-slate-600 rounded-2xl shadow-sm hover:shadow-md hover:bg-slate-50 transition-all duration-300 group"
                        title="Paramètres du compte"
                    >
                        <div className="group-hover:rotate-90 transition-transform duration-500">
                            <Settings size={22} /> 
                        </div>
                    </Link>

                    {/* Bouton Ajouter (Manokatra formulaire) */}
                    <button 
                        onClick={() => { resetForm(); setIsFormOpen(!isFormOpen); }}
                        className="p-3.5 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-2"
                        title="Ajouter une nouvelle intervention"
                    >
                        {isFormOpen ? <X size={22} /> : <PlusCircle size={22} />}
                        <span className="font-bold hidden md:inline">{isFormOpen ? 'Fermer' : 'Ajouter'}</span>
                    </button>

                    <button 
                        onClick={handleLogout}
                        className="p-3.5 bg-red-50 text-red-600 rounded-2xl border border-red-100 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm"
                        title="Se déconnecter"
                    >
                        <LogOut size={22} />
                    </button>
                </div>
            </div>

            {/* --- SECTION FORMULAIRE (VAOVAO) --- */}
            {isFormOpen && (
                <div className="mb-8 bg-white p-8 rounded-2xl shadow-xl border-2 border-indigo-100 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        {editingId ? 'Modifier l\'intervention' : 'Nouvelle Intervention'}
                    </h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Titre</label>
                                <input 
                                    required name="title" value={formData.title} onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Lieu</label>
                                <input 
                                    required name="location" value={formData.location} onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Lien de l'image (URL)</label>
                                <input 
                                    name="image" value={formData.image} onChange={handleInputChange}
                                    placeholder="https://..."
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                                <textarea 
                                    required name="description" value={formData.description} onChange={handleInputChange} rows="4"
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                ></textarea>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
                                <input 
                                    type="checkbox" name="is_published" checked={formData.is_published} onChange={handleInputChange}
                                    className="w-5 h-5 accent-indigo-600"
                                />
                                <label className="text-sm font-bold text-indigo-900">Publier sur l'accueil</label>
                            </div>
                            <button 
                                type="submit" disabled={loading}
                                className="w-full p-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                            >
                                <Save size={20} />
                                {editingId ? 'Mettre à jour' : 'Enregistrer l\'intervention'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* SECTION TABLEAU */}
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
                                <th className="px-6 py-4 border-b text-left">Aperçu</th>
                                <th className="px-6 py-4 border-b text-left">Titre & Lieu</th>
                                <th className="px-6 py-4 border-b text-left">Description</th>
                                <th className="px-6 py-4 border-b text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading && !isFormOpen ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3 text-gray-400">
                                            <RefreshCcw className="animate-spin" size={30} />
                                            <span>Chargement des interventions en cours...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : interventions.length > 0 ? (
                                interventions.map((item) => (
                                    <tr key={item.id} className="hover:bg-blue-50/20 transition-colors">
                                        <td className="px-6 py-5">
                                            {item.image ? (
                                                <img 
                                                    src={item.image} 
                                                    className="w-16 h-16 object-cover rounded-xl border border-gray-200 shadow-sm"
                                                    alt={item.title}
                                                    onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Aucune+Image"; }}
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-gray-300">
                                                    <LayoutList size={24} />
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-gray-900 font-bold text-lg">{item.title}</div>
                                            <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                                                <MapPin size={14} />
                                                {item.location || 'Lieu non spécifié'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-gray-600 text-sm line-clamp-2 max-w-xs">
                                                {item.description || 'Aucune description fournie.'}
                                            </p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center items-center gap-3">
                                                <button 
                                                    onClick={() => togglePublish(item.id, item.is_published)}
                                                    className={`p-2.5 rounded-xl transition-all ${
                                                        item.is_published 
                                                        ? 'bg-emerald-500 text-white shadow-md' 
                                                        : 'bg-gray-100 text-gray-400 hover:bg-emerald-100 hover:text-emerald-600'
                                                    }`}
                                                    title={item.is_published ? "Retirer de l'accueil" : "Publier sur l'accueil"}
                                                >
                                                    <Send size={18} />
                                                </button>

                                                {/* Modification (Miantso handleEdit) */}
                                                <button 
                                                    onClick={() => handleEdit(item)}
                                                    className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm"
                                                    title="Modifier cette intervention"
                                                >
                                                    <Edit3 size={18} />
                                                </button>

                                                <button 
                                                    onClick={() => deleteIntervention(item.id)}
                                                    className="p-2.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                                                    title="Supprimer définitivement"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-20 text-center text-gray-400">
                                        <p className="font-bold text-xl">Aucune intervention trouvée.</p>
                                        <p className="text-sm">Veuillez ajouter une nouvelle intervention pour commencer.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InterventionList;