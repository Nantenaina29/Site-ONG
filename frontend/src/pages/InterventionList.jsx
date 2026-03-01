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

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        description: '',
        image: [], // Initialisé en tableau vide
        is_published: false
    });

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
            console.error("Erreur de chargement:", err.message);
            Swal.fire({
                title: 'Erreur de connexion',
                text: 'Impossible de récupérer les données',
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

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Déconnexion ?',
            text: "Votre session sera fermée.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non'
        });
        if (result.isConfirmed) {
            await supabase.auth.signOut();
            navigate('/login');
        }
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
    
        const allAreImages = files.every(file => file.type.startsWith('image/'));
        if (!allAreImages) {
            Swal.fire('Erreur', 'Veuillez sélectionner uniquement des images.', 'error');
            return;
        }
    
        setActionLoading(true);
        try {
            const uploadPromises = files.map(async (file) => {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
                const { error: uploadError } = await supabase.storage
                    .from('photos')
                    .upload(fileName, file);
    
                if (uploadError) throw uploadError;
    
                const { data: urlData } = supabase.storage
                    .from('photos')
                    .getPublicUrl(fileName);
    
                return urlData.publicUrl;
            });
    
            const publicUrls = await Promise.all(uploadPromises);
    
            setFormData(prev => ({
                ...prev,
                image: [...prev.image, ...publicUrls] // On ajoute les nouvelles aux anciennes
            }));
    
            Swal.fire({ title: 'Succès', text: `${files.length} image(s) ajoutée(s)`, icon: 'success', timer: 1500, showConfirmButton: false });
        } catch (error) {
            Swal.fire('Erreur', error.message, 'error');
        } finally {
            setActionLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToSubmit = { ...formData };

            if (editingId) {
                const { error } = await supabase.from('interventions').update(dataToSubmit).eq('id', editingId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('interventions').insert([dataToSubmit]);
                if (error) throw error;
            }

            Swal.fire('Succès !', 'L\'intervention a été enregistrée.', 'success');
            resetForm();
            loadData();
        } catch (err) {
            Swal.fire('Erreur technique', err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ title: '', location: '', description: '', image: [], is_published: false });
        setEditingId(null);
        setIsFormOpen(false);
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setFormData({
            title: item.title || '',
            location: item.location || '',
            description: item.description || '',
            image: Array.isArray(item.image) ? item.image : (item.image ? [item.image] : []),
            is_published: item.is_published || false
        });
        setIsFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ... Reste des fonctions (delete, togglePublish) identiques à ton code ...

    return (
        <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen font-sans">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-6 rounded-4xl shadow-xl gap-6">
                <div className="flex items-center gap-4">
                    <div className="bg-indigo-600 p-4 rounded-2xl text-white">
                        <LayoutList size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-800">DASHBOARD <span className="text-indigo-600">ONG</span></h2>
                        <p className="text-slate-500">Console de gestion</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-3xl border border-slate-100">
                    <button onClick={loadData} className="p-3 text-slate-400 hover:text-indigo-600"><RefreshCcw size={22} className={loading ? 'animate-spin' : ''}/></button>
                    <button 
                        onClick={() => isFormOpen ? resetForm() : setIsFormOpen(true)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${isFormOpen ? 'bg-slate-800 text-white' : 'bg-indigo-600 text-white'}`}
                    >
                        {isFormOpen ? <X size={20} /> : <PlusCircle size={20} />}
                        <span>{isFormOpen ? 'Fermer' : 'Ajouter'}</span>
                    </button>
                    <button onClick={handleLogout} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><LogOut size={22} /></button>
                </div>
            </div>

            {/* FORMULAIRE */}
            {isFormOpen && (
                <div className="mb-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-indigo-50">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold mb-2"><Type size={18}/> Titre</label>
                                <input required name="title" value={formData.title} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border-2 rounded-2xl focus:border-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold mb-2"><MapPin size={18}/> Localisation</label>
                                <input required name="location" value={formData.location} onChange={handleInputChange} className="w-full p-4 bg-slate-50 border-2 rounded-2xl focus:border-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold mb-2"><ImageIcon size={18}/> Images du projet</label>
                                <input type="file" id="file-upload" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                                <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full p-6 bg-slate-50 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-indigo-50 transition-all">
                                    {actionLoading ? <Loader2 className="animate-spin text-indigo-600" /> : <><ImageIcon className="text-slate-400 mb-2" size={30} /> <span className="font-bold text-slate-500">Cliquez pour ajouter des photos</span></>}
                                </label>
                                {/* Preview des images uploadées */}
                                <div className="grid grid-cols-4 gap-2 mt-4">
                                    {formData.image.map((url, i) => (
                                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden border">
                                            <img src={url} alt="preview" className="w-full h-full object-cover" />
                                            <button type="button" onClick={() => setFormData(p => ({...p, image: p.image.filter((_, idx) => idx !== i)}))} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"><X size={12}/></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold mb-2"><AlignLeft size={18}/> Description</label>
                                <textarea required name="description" value={formData.description} onChange={handleInputChange} rows="6" className="w-full p-4 bg-slate-50 border-2 rounded-2xl focus:border-indigo-500 outline-none resize-none"></textarea>
                            </div>
                            <div className="flex gap-4 items-center">
                                <label className="flex-1 flex items-center justify-between p-4 bg-slate-50 rounded-2xl border-2 cursor-pointer">
                                    <span className="font-bold text-slate-600">Publier l'intervention</span>
                                    <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleInputChange} className="w-6 h-6 accent-indigo-600" />
                                </label>
                                <button type="submit" className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg hover:bg-indigo-700 transition-all flex justify-center gap-2">
                                    <Save size={22} /> {editingId ? 'METTRE À JOUR' : 'ENREGISTRER'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* TABLEAU (Aperçu) */}
            <div className="bg-white shadow-2xl rounded-[2.5rem] overflow-hidden border border-slate-100">
                <table className="min-w-full">
                    <thead className="bg-slate-50/50">
                        <tr className="text-slate-400 text-[11px] font-black uppercase tracking-wider">
                            <th className="px-8 py-6 text-left">Aperçu</th>
                            <th className="px-8 py-6 text-left">Détails</th>
                            <th className="px-8 py-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {interventions.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/80 transition-all">
                                <td className="px-8 py-6">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm border">
                                        <img 
                                            src={Array.isArray(item.image) && item.image.length > 0 ? item.image[0] : "https://via.placeholder.com/150"} 
                                            className="w-full h-full object-cover" 
                                            alt="" 
                                        />
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="font-bold text-slate-800">{item.title}</div>
                                    <div className="text-xs text-indigo-500 flex items-center gap-1"><MapPin size={12}/> {item.location}</div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex justify-center gap-2">
                                        <button onClick={() => handleEdit(item)} className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={18}/></button>
                                        <button className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18}/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InterventionList;