import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 
import { Plus, Edit, Trash2, Settings, Save, X, Loader2, ArrowLeft, User, Mail, Lock, Camera, ShieldCheck } from 'lucide-react';
import Swal from 'sweetalert2';

// 1. COMPONENT MITOKANA HO AN'NY ADMIN PROFILE (MBA HADIO NY CODE)
const AdminProfile = ({ adminUser }) => {
    const [newEmail, setNewEmail] = useState(adminUser?.email || '');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Mba hanavaozana ny email rehefa miova ny adminUser avy any amin'ny parent
    useEffect(() => {
        if (adminUser?.email) setNewEmail(adminUser.email);
    }, [adminUser]);

    const handleUpdateProfile = async () => {
        setLoading(true);
        try {
            const updates = {};
            if (newEmail !== adminUser.email) updates.email = newEmail;
            if (newPassword.length > 0) {
                if (newPassword.length < 6) throw new Error("Le mot de passe doit faire au moins 6 caractères.");
                updates.password = newPassword;
            }

            if (Object.keys(updates).length === 0) {
                Swal.fire('Info', 'Aucune modification détectée.', 'info');
                return;
            }

            const { error } = await supabase.auth.updateUser(updates);
            if (error) throw error;

            Swal.fire({
                title: 'Profil mis à jour !',
                text: updates.email ? 'Un email de confirmation a été envoyé à la nouvelle adresse.' : 'Mot de passe modifié avec succès.',
                icon: 'success',
                confirmButtonColor: '#059669'
            });
            setNewPassword(''); 
        } catch (error) {
            Swal.fire('Erreur', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-emerald-950 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden border border-emerald-900/50">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-emerald-400">
                <ShieldCheck size={120} />
            </div>

            <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-emerald-400">
                Compte Administrateur
            </h2>
            
            <div className="space-y-6 relative z-10">
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black text-emerald-500/70 uppercase tracking-widest ml-1">Nom d'affichage</label>
                    <div className="flex items-center gap-3 bg-emerald-900/20 p-4 rounded-2xl border border-emerald-800/30 backdrop-blur-sm">
                        <User size={16} className="text-emerald-500" />
                        <span className="text-sm font-bold text-emerald-100">
                            {adminUser?.email?.split('@')[0] || 'Admin'}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black text-emerald-500/70 uppercase tracking-widest ml-1">Nouvel Email</label>
                    <div className="flex items-center gap-3 bg-emerald-900/30 p-1 rounded-2xl border border-emerald-700/50 focus-within:border-emerald-500 transition-all">
                        <div className="pl-4"><Mail size={16} className="text-emerald-500" /></div>
                        <input 
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="bg-transparent border-none text-sm p-3 w-full outline-none text-white font-medium"
                            placeholder="Nouvel email"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black text-emerald-500/70 uppercase tracking-widest ml-1">Nouveau Mot de passe</label>
                    <div className="flex items-center gap-3 bg-emerald-900/30 p-1 rounded-2xl border border-emerald-700/50 focus-within:border-emerald-500 transition-all">
                        <div className="pl-4"><Lock size={16} className="text-emerald-500" /></div>
                        <input 
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="bg-transparent border-none text-sm p-3 w-full outline-none text-white font-medium"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button 
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                    Mettre à jour les accès
                </button>
            </div>
        </div>
    );
};

// 2. MAIN COMPONENT: PARAMETRES
const Parametres = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null); 
    const [formData, setFormData] = useState({ name: '', role: '', image: null });
    const [uploading, setUploading] = useState(false);
    const [adminUser, setAdminUser] = useState(null);

    const navigate = useNavigate();

    const fetchTeam = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('teams')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setTeam(data || []);
        } catch (err) {
            console.error("Error:", err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAdmin = useCallback(async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) setAdminUser(user);
    }, []);

    useEffect(() => {
        fetchAdmin();
        fetchTeam();
    }, [fetchAdmin, fetchTeam]);

    const uploadImage = async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        let { error: uploadError } = await supabase.storage
            .from('teams')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('teams').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        try {
            let imageUrl = editingItem?.img;

            if (formData.image) {
                imageUrl = await uploadImage(formData.image);
            }

            const payload = {
                name: formData.name,
                role: formData.role,
                img: imageUrl
            };

            if (editingItem) {
                const { error } = await supabase.from('teams').update(payload).eq('id', editingItem.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('teams').insert([payload]);
                if (error) throw error;
            }

            Swal.fire({ icon: 'success', title: 'Action réussie !', showConfirmButton: false, timer: 1500 });
            setIsModalOpen(false);
            setEditingItem(null);
            setFormData({ name: '', role: '', image: null });
            fetchTeam();
        } catch (err) {
            Swal.fire('Erreur', err.message, 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Supprimer ce membre ?',
            text: "Cette action est irréversible !!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Oui'
        });

        if (result.isConfirmed) {
            const { error } = await supabase.from('teams').delete().eq('id', id);
            if (!error) {
                fetchTeam();
                Swal.fire('Supprimé!', '', 'success');
            }
        }
    };

    return (
        <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen">
            <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 text-white">
                        <Settings size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Configuration</h1>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Gestion d'équipe & Sécurité</p>
                    </div>
                </div>
                <button onClick={() => navigate(-1)} className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Retour
                </button>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* SEZINA EKIPA (70%) */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                <User size={16} className="text-indigo-600" /> Membres de l'organisation
                            </h2>
                            <button 
                                onClick={() => { setEditingItem(null); setFormData({name:'', role:'', image: null}); setIsModalOpen(true); }}
                                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 shadow-md transition-all text-xs font-bold"
                            >
                                <Plus size={16} /> AJOUTER
                            </button>
                        </div>

                        <div className="p-2 overflow-x-auto">
                            {loading ? (
                                <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-indigo-600" size={40} /></div>
                            ) : (
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                            <th className="px-6 py-4 text-left">Profil</th>
                                            <th className="px-6 py-4 text-left">Poste / Rôle</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {team.map((member) => (
                                            <tr key={member.id} className="group hover:bg-indigo-50/30 transition-all">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                                                            <img src={member.img || "https://ui-avatars.com/api/?name="+member.name} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                        <span className="font-bold text-slate-800 text-sm">{member.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-wide">
                                                        {member.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => { setEditingItem(member); setFormData({name: member.name, role: member.role, image: null}); setIsModalOpen(true); }} className="p-2 bg-white text-blue-600 rounded-lg shadow-sm border border-slate-100 hover:scale-110 transition-transform"><Edit size={16} /></button>
                                                        <button onClick={() => handleDelete(member.id)} className="p-2 bg-white text-red-500 rounded-lg shadow-sm border border-slate-100 hover:scale-110 transition-transform"><Trash2 size={16} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>

                {/* SEZINA ADMIN (30%) */}
                <div className="lg:col-span-4">
                    <AdminProfile adminUser={adminUser} />
                </div>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                                    {editingItem ? 'Modifier' : 'Nouveau'} <span className="text-indigo-600">Membre</span>
                                </h3>
                                <div className="h-1 w-12 bg-indigo-600 rounded-full mt-1"></div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} className="text-slate-400" /></button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Nom & Prénom</label>
                                <input type="text" placeholder="Ex: Jean Ralambo" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all font-bold text-slate-700" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Poste occupé</label>
                                <input type="text" placeholder="Ex: Directeur Technique" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all font-bold text-slate-700" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Photo de profil</label>
                                <div className="relative group">
                                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} />
                                    <div className="w-full p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-3 text-slate-400 font-bold group-hover:border-indigo-400 group-hover:text-indigo-600 transition-all">
                                        <Camera size={20} />
                                        <span>{formData.image ? formData.image.name : "Choisir une photo"}</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                disabled={uploading}
                                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all disabled:opacity-50"
                            >
                                {uploading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> CONFIRMER</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Parametres;