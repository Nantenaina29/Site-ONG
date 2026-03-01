import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { 
    PlusCircle, LogOut, LayoutList, Trash2, Edit3, Send, 
    RefreshCcw, Settings, MapPin, X, Save, Type, 
    Image as ImageIcon, AlignLeft, Eye, EyeOff, Loader2,
    CheckCircle2, AlertCircle, Info
} from 'lucide-react';

const InterventionList = () => {
    const [interventions, setInterventions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const navigate = useNavigate();

    // --- STATES POUR LE FORMULAIRE ---
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        description: '',
        image: '',
        is_published: false
    });

    // 1. Chargement des données depuis Supabase (Correction du warning error)
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error: supabaseError } = await supabase
                .from('interventions')
                .select('*')
                .order('created_at', { ascending: false });

            if (supabaseError) throw supabaseError;
            setInterventions(data || []);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Une erreur inconnue est survenue';
            console.error("Erreur de chargement:", errorMessage);
            Swal.fire({
                title: 'Erreur de connexion',
                text: 'Impossible de récupérer les données : ' + errorMessage,
                icon: 'error',
                confirmButtonColor: '#ef4444'
            });
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
            title: 'Etes-vous déconnecter ?',
            text: "Votre session actuelle sera fermée et vous devrez vous reconnecter.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#4f46e5',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
            background: '#ffffff',
            borderRadius: '1.25rem'
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
            text: "Attention, cette action est définitive et irréversible !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Oui, supprimer définitivement',
            cancelButtonText: 'Annuler',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            setActionLoading(true);
            try {
                const { error: deleteError } = await supabase
                    .from('interventions')
                    .delete()
                    .eq('id', id);

                if (deleteError) throw deleteError;

                Swal.fire({
                    title: 'Supprimé !',
                    text: "L'intervention a été retirée avec succès.",
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
                loadData(); 
            } catch (err) {
                const msg = err instanceof Error ? err.message : 'Erreur lors de la suppression';
                Swal.fire('Erreur', msg, 'error');
            } finally {
                setActionLoading(false);
            }
        }
    };

    // 4. Gestion de la publication (is_published)
    const togglePublish = async (id, currentStatus) => {
        try {
            const { error: updateError } = await supabase
                .from('interventions')
                .update({ is_published: !currentStatus })
                .eq('id', id);

            if (updateError) throw updateError;

            Swal.fire({
                title: !currentStatus ? 'Publication réussie !' : 'Retiré de la page d\'accueil',
                text: !currentStatus ? 'L\'intervention est maintenant visible par tous.' : 'L\'intervention est désormais en brouillon.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
            loadData();
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Erreur de mise à jour';
            Swal.fire('Erreur', msg, 'error');
        }
    };

    // 5. Gestion des entrées du formulaire
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        
        // Hamarinina raha efa array ny sary avy any amin'ny DB
        // Raha string izy (data taloha), dia avadika [string]
        const imageArray = Array.isArray(item.image) 
            ? item.image 
            : (item.image ? [item.image] : []);

        setFormData({
            title: item.title || '',
            location: item.location || '',
            description: item.description || '',
            image: imageArray, // Array foana eto
            is_published: item.is_published || false
        });
        
        setIsFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        // Image dia atao [] (Empty Array) fa tsy '' (Empty String) intsony
        setFormData({ 
            title: '', 
            location: '', 
            description: '', 
            image: [], 
            is_published: false 
        });
        setEditingId(null);
        setIsFormOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Fanomanana ny data halefa any amin'ny Supabase
            // Manery ny 'image' ho lasa Array [url1, url2...]
            const dataToSubmit = {
                ...formData,
                image: Array.isArray(formData.image) ? formData.image : [formData.image]
            };

            if (editingId) {
                // MODIFICATION (UPDATE)
                const { error: updateError } = await supabase
                    .from('interventions')
                    .update(dataToSubmit)
                    .eq('id', editingId);
                
                if (updateError) throw updateError;
                
                Swal.fire({
                    title: 'Modification réussie',
                    text: 'Les informations ont été mises à jour avec succès.',
                    icon: 'success',
                    confirmButtonColor: '#4f46e5'
                });
            } else {
                // AJOUT (INSERT)
                const { error: insertError } = await supabase
                    .from('interventions')
                    .insert([dataToSubmit]); // Insert dia mila array ny zavatra ampidirina
                
                if (insertError) throw insertError;
                
                Swal.fire({
                    title: 'Enregistré !',
                    text: 'La nouvelle intervention a été ajoutée à la base de données.',
                    icon: 'success',
                    confirmButtonColor: '#4f46e5'
                });
            }

            resetForm();
            loadData(); // Mamerina ny lisitra vaovao avy any amin'ny DB

        } catch (err) {
            // Asehoy ny hafatra mazava avy amin'ny Supabase raha misy error
            const errorMsg = err.message || 'Une erreur est survenue lors de l\'enregistrement';
            console.error("Supabase Error Details:", err);
            
            Swal.fire({
                title: 'Erreur technique',
                text: errorMsg,
                icon: 'error',
                confirmButtonColor: '#ef4444'
            });
        } finally {
            setLoading(false);
        } 
    };

    // --- FOFAOY NY TALOHA ARY ADIKAO ITY ---
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files || []); // Récupérer tous les fichiers choisis
        if (files.length === 0) return;
    
        // 1. Vérification : Est-ce que ce sont bien des images ?
        const allAreImages = files.every(file => file.type.startsWith('image/'));
        if (!allAreImages) {
            Swal.fire('Erreur', 'Veuillez sélectionner uniquement des fichiers images (JPG, PNG...).', 'error');
            return;
        }
    
        setActionLoading(true);
    
        try {
            // 2. Utilisation de Promise.all pour gérer plusieurs uploads simultanément
            const uploadPromises = files.map(async (file) => {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
                const filePath = `${fileName}`;
    
                // Upload vers Supabase (Bucket "photos")
                const { error: uploadError } = await supabase.storage
                    .from('photos')
                    .upload(filePath, file);
    
                if (uploadError) throw uploadError;
    
                // Récupération de l'URL publique
                const { data: urlData } = supabase.storage
                    .from('photos')
                    .getPublicUrl(filePath);
    
                return urlData.publicUrl;
            });
    
            // Attendre que tous les fichiers soient uploadés
            const publicUrls = await Promise.all(uploadPromises);
    
            // 3. Mise à jour du formData (Ajout des nouveaux URLs au tableau existant)
            setFormData(prev => ({
                ...prev,
                images: prev.images ? [...prev.images, ...publicUrls] : publicUrls
            }));
    
            Swal.fire({
                title: 'Succès',
                text: `${files.length} image(s) téléchargée(s) avec succès !`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
    
        } catch (error) {
            console.error("Erreur d'upload:", error);
            Swal.fire('Erreur', "Une erreur est survenue lors de l'envoi des images : " + error.message, 'error');
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen font-sans text-slate-900 animate-in fade-in duration-700">
            {/* EN-TÊTE (HEADER) - DESIGN PREMIUM */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-6 rounded-4xl shadow-xl shadow-blue-900/5 border border-white gap-6">
                <div className="flex items-center gap-4">
                    <div className="bg-linear-to-br from-indigo-500 to-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-200 rotate-3 hover:rotate-0 transition-transform duration-300">
                        <LayoutList size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tighter">
                            DASHBOARD <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-4">ONG</span>
                        </h2>
                        <p className="text-slate-500 font-medium flex items-center gap-2">
                            <Info size={14} className="text-indigo-400" />
                            Console de gestion des interventions
                        </p>
                    </div>
                </div>
        
                <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-3xl border border-slate-100">
                    <button 
                        onClick={loadData}
                        className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-2xl transition-all duration-300 hover:shadow-sm"
                        title="Actualiser les données"
                    >
                        <RefreshCcw size={22} className={loading ? 'animate-spin' : 'hover:rotate-180 transition-transform duration-500'} />
                    </button>

                    <Link 
                        to="/settings" 
                        className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-2xl transition-all duration-300 hover:shadow-sm group"
                        title="Paramètres système"
                    >
                        <Settings size={22} className="group-hover:rotate-90 transition-transform duration-500" /> 
                    </Link>

                    <button 
                        onClick={() => { if(isFormOpen) resetForm(); else setIsFormOpen(true); }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg ${
                            isFormOpen 
                            ? 'bg-slate-800 text-white hover:bg-slate-900 shadow-slate-200' 
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1 shadow-indigo-200'
                        }`}
                    >
                        {isFormOpen ? <X size={20} /> : <PlusCircle size={20} />}
                        <span>{isFormOpen ? 'Fermer' : 'Ajouter'}</span>
                    </button>

                    <div className="w-px h-8 bg-slate-200 mx-1"></div>

                    <button 
                        onClick={handleLogout}
                        className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-200"
                        title="Déconnexion sécurisée"
                    >
                        <LogOut size={22} />
                    </button>
                </div>
            </div>

            {/* --- SECTION FORMULAIRE --- */}
            {isFormOpen && (
                <div className="mb-10 bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-900/10 border border-indigo-50 animate-in zoom-in-95 slide-in-from-top-10 duration-500">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                        <h3 className="text-2xl font-black text-slate-800">
                            {editingId ? 'Modifier l\'Intervention' : 'Créer une Nouvelle Intervention'}
                        </h3>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Colonne Gauche */}
                        <div className="space-y-6">
                            <div className="group">
                                <label className="flex items-center gap-2 text-sm font-bold text-black mb-2 transition-colors group-focus-within:text-indigo-600">
                                    <Type size={18} className="text-indigo-500" /> Titre du projet
                                </label>
                                <input 
                                    required name="title" value={formData.title} onChange={handleInputChange}
                                    placeholder="Ex: Construction d'un puit..."
                                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                                />
                            </div>

                            <div className="group">
                                <label className="flex items-center gap-2 text-sm font-bold text-black mb-2 group-focus-within:text-indigo-600">
                                    <MapPin size={18} className="text-indigo-500" /> Localisation précise
                                </label>
                                <input 
                                    required name="location" value={formData.location} onChange={handleInputChange}
                                    placeholder="Ex: District de Menabe, Madagascar"
                                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                                />
                            </div>

                            <div className="group">
                            <label className="flex items-center gap-2 text-sm font-bold text-black mb-2 group-focus-within:text-indigo-600">
                                <ImageIcon size={18} className="text-indigo-500" /> URL des images de couverture
                            </label>
                            <div className="relative group">
                                <input 
                                    type="file"
                                    accept="image/*"
                                    id="file-upload"
                                    multiple // <--- Eto no mampisy an'ilay safidy maromaro
                                    onChange={handleImageUpload} 
                                    className="hidden" 
                                />
                                <label 
                                    htmlFor="file-upload"
                                    className="flex items-center justify-center gap-3 w-full p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer group-hover:border-indigo-500 group-hover:bg-indigo-50/30 transition-all duration-300"
                                >
                                    {actionLoading ? (
                                        <Loader2 className="animate-spin text-indigo-600" size={24} />
                                    ) : (
                                        <div className="flex items-center gap-3 text-slate-500 group-hover:text-indigo-600">
                                            <ImageIcon size={24} />
                                            <span className="font-bold">
                                                {/* Ovaina ny soratra raha efa misy sary voafidy */}
                                                {formData.images && formData.images.length > 0 
                                                    ? `${formData.images.length} sary voafidy` 
                                                    : "Choisir des photos depuis l'appareil"}
                                            </span>
                                        </div>
                                    )}
                                </label>
                                
                                {/* Preview ho an'ny sary maromaro */}
                                {formData.images && formData.images.length > 0 && (
                                    <div className="mt-3 grid grid-cols-4 gap-2">
                                        {/* Ohatra fotsiny ity raha te hanao preview kely ianao */}
                                        <p className="col-span-4 text-xs text-emerald-600 font-bold flex items-center gap-1">
                                            <CheckCircle2 size={12} /> {formData.images.length} images prêtes à être enregistrées
                                        </p>
                                    </div>
                                )}
                            </div>

                            </div>
                        </div>

                        {/* Colonne Droite */}
                        <div className="space-y-6">
                            <div className="group">
                                <label className="flex items-center gap-2 text-sm font-bold text-black mb-2 group-focus-within:text-indigo-600">
                                    <AlignLeft size={18} className="text-indigo-500" /> Description détaillée
                                </label>
                                <textarea 
                                    required name="description" value={formData.description} onChange={handleInputChange} rows="5"
                                    placeholder="Décrivez les objectifs et les résultats de l'intervention..."
                                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none"
                                ></textarea>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className={`flex-1 flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${formData.is_published ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-100'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${formData.is_published ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                            {formData.is_published ? <Eye size={20} /> : <EyeOff size={20} />}
                                        </div>
                                        <span className={`font-bold ${formData.is_published ? 'text-emerald-700' : 'text-slate-500'}`}>
                                            {formData.is_published ? 'Visible publiquement' : 'Mode Brouillon'}
                                        </span>
                                    </div>
                                    <input 
                                        type="checkbox" name="is_published" checked={formData.is_published} onChange={handleInputChange}
                                        className="w-6 h-6 accent-emerald-500 cursor-pointer"
                                    />
                                </div>

                                <button type="submit" disabled={actionLoading} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">
                                {actionLoading ? <Loader2 className="animate-spin" /> : <Save size={22} />}
                                {editingId ? 'METTRE À JOUR' : 'ENREGISTRER L\'INTERVENTION'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* SECTION TABLEAU - DESIGN MODERNE */}
            <div className="bg-white shadow-2xl shadow-slate-200 rounded-[2.5rem] overflow-hidden border border-slate-100 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-slate-50/50 text-black uppercase text-[11px] font-black tracking-[0.15em]">
                                <th className="px-8 py-6 text-left">Aperçu Visuel</th>
                                <th className="px-8 py-6 text-left">Détails de l'intervention</th>
                                <th className="px-8 py-6 text-left">Description</th>
                                <th className="px-8 py-6 text-center">Actions de contrôle</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading && !isFormOpen ? (
                                <tr>
                                    <td colSpan="4" className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="relative">
                                                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                                                <RefreshCcw className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={20} />
                                            </div>
                                            <span className="font-bold text-slate-400 tracking-widest uppercase text-xs">Synchronisation...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : interventions.length > 0 ? (
                                interventions.map((item, index) => (
                                    <tr 
                                        key={item.id} 
                                        className="group hover:bg-slate-50/80 transition-all duration-300 animate-in fade-in slide-in-from-left duration-500"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <td className="px-8 py-6">
                                            <div className="relative w-20 h-20 overflow-hidden rounded-2xl shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-500">
                                                <img 
                                                    /* 1. Ampiasaina ny sary voalohany raha array ny item.images, raha tsy izany dia ilay sary default */
                                                    src={(item.images && item.images.length > 0) 
                                                        ? item.images[0] 
                                                        : "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=300&h=300&fit=crop"} 
                                                    className="w-full h-full object-cover"
                                                    alt={item.title}
                                                />

                                                {/* 2. Overlay ho an'ny sary maromaro (+X) */}
                                                {item.images && item.images.length > 1 && (
                                                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center backdrop-blur-[1px]">
                                                        <span className="text-white font-black text-lg drop-shadow-md">
                                                            +{item.images.length - 1}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* 3. Overlay ho an'ny EyeOff (raha tsy published) */}
                                                {!item.is_published && (
                                                    <div className={`absolute inset-0 bg-slate-900/60 flex items-center justify-center ${item.images && item.images.length > 1 ? 'pt-8' : ''}`}>
                                                        <EyeOff size={16} className="text-white opacity-80" />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-slate-900 font-black text-lg group-hover:text-indigo-600 transition-colors">{item.title}</div>
                                            <div className="flex items-center gap-1.5 text-indigo-500 text-sm font-bold mt-1 bg-indigo-50 w-fit px-3 py-1 rounded-full">
                                                <MapPin size={14} />
                                                {item.location || 'Localisation non définie'}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-slate-500 text-sm line-clamp-2 max-w-sm font-medium leading-relaxed">
                                                {item.description || 'Aucun détail supplémentaire disponible.'}
                                            </p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-center items-center gap-3">
                                                <button 
                                                    onClick={() => togglePublish(item.id, item.is_published)}
                                                    className={`p-3 rounded-2xl transition-all duration-300 shadow-sm ${
                                                        item.is_published 
                                                        ? 'bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-emerald-200' 
                                                        : 'bg-slate-100 text-slate-400 hover:bg-white hover:text-emerald-500 hover:shadow-md'
                                                    }`}
                                                    title={item.is_published ? "Mettre hors ligne" : "Publier maintenant"}
                                                >
                                                    <Send size={18} />
                                                </button>

                                                <button 
                                                    onClick={() => handleEdit(item)}
                                                    className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-2xl transition-all duration-300 shadow-sm hover:shadow-blue-200"
                                                    title="Modifier l'entrée"
                                                >
                                                    <Edit3 size={18} />
                                                </button>

                                                <button 
                                                    onClick={() => deleteIntervention(item.id)}
                                                    className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all duration-300 shadow-sm hover:shadow-red-200"
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
                                    <td colSpan="4" className="px-8 py-32 text-center">
                                        <div className="flex flex-col items-center gap-4 grayscale">
                                            <LayoutList size={64} className="text-slate-200" />
                                            <div>
                                                <p className="font-black text-2xl text-slate-400">Base de données vide</p>
                                                <p className="text-slate-400 font-medium">Commencez par ajouter votre première intervention.</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Footer du tableau */}
                <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex justify-between items-center">
                    <p className="text-xs font-bold text-slate-400">
                        TOTAL: {interventions.length} INTERVENTION(S) RÉPERTORIÉE(S)
                    </p>
                    <div className="flex items-center gap-2">
                         <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Système Live</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterventionList;