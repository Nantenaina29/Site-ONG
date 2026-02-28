import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Settings, Save, X, Loader2, ArrowLeft, User, Mail, Lock, Camera } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Parametres = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null); 
    const [formData, setFormData] = useState({ name: '', role: '', image: null });
    
    // Logique ho an'ny Compte Admin
    const [adminData, setAdminData] = useState({ name: 'Admin Tsinjo Aina', email: 'admin@tsinjoaina.mg' });

    const navigate = useNavigate();
    const API_URL = 'http://localhost:8000/api/teams';

    const fetchTeam = useCallback(async () => {
        try {
            const response = await axios.get(API_URL);
            setTeam(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Erreur chargement:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');
        else fetchTeam();
    }, [navigate, fetchTeam]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const data = new FormData();
        data.append('name', formData.name);
        data.append('role', formData.role);
        if (formData.image) data.append('image', formData.image);

        try {
            if (editingItem) {
                await axios.post(`${API_URL}/${editingItem.id}?_method=PUT`, data, {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post(API_URL, data, {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
                });
            }
            Swal.fire('Succès !', 'Informations enregistrées.', 'success');
            setIsModalOpen(false);
            setEditingItem(null);
            setFormData({ name: '', role: '', image: null });
            fetchTeam();
        } catch (err) {
            console.error(err); // Mampiasa azy eto
            Swal.fire('Erreur', "Une erreur est survenue lors de l'enregistrement.", 'error');
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Supprimer ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Oui'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token');
                    await axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
                    fetchTeam();
                    Swal.fire('Supprimé !', '', 'success');
                } catch (err) {
                    console.error(err); // Mampiasa azy eto
                    Swal.fire('Erreur', "Impossible de supprimer un.", 'error');
                }
            }
        });
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            {/* HEADER */}
            <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black text-indigo-950 uppercase tracking-tight flex items-center gap-3">
                        <Settings className="text-indigo-600" /> Paramètres
                    </h1>
                    <p className="text-slate-500 text-sm font-medium ml-9">Gestion d'équipe (70%) et Compte (30%)</p>
                </div>
                <button onClick={() => navigate(-1)} className="p-2.5 bg-white text-slate-400 hover:text-indigo-600 rounded-xl border border-slate-100 shadow-sm transition-all">
                    <ArrowLeft size={20} />
                </button>
            </div>

            {/* GRID 70/30 */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
                
                {/* --- ANKAVIA: PARAMÈTRES ÉQUIPE (70%) --- */}
                <div className="lg:col-span-7 bg-white rounded-4xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                        <h2 className="text-sm font-black text-indigo-950 uppercase tracking-widest">Liste de l'Équipe</h2>
                        <button onClick={() => { setEditingItem(null); setFormData({name:'', role:'', image: null}); setIsModalOpen(true); }} className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 shadow-md active:scale-95 transition-all">
                            <Plus size={18} />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-indigo-600" size={30} /></div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50/50">
                                    <tr>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Membre</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rôle</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Image</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {team.map((member) => (
                                        <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 font-bold text-indigo-950 text-sm">{member.name}</td>
                                            <td className="px-6 py-4 text-slate-500 text-xs font-medium">{member.role}</td>
                                            <td className="px-6 py-4">
                                                {member.img ? (
                                                    <img src={`http://localhost:8000/storage/${member.img}`} alt="" className="w-10 h-10 object-cover rounded-full border border-slate-200" />
                                                ) : (
                                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-[8px] text-slate-300">SARY</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-1">
                                                <button onClick={() => { setEditingItem(member); setFormData({name: member.name, role: member.role, image: null}); setIsModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                                                <button onClick={() => handleDelete(member.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* --- ANKAVANANA: PARAMÈTRES DU COMPTE (30%) --- */}
                <div className="lg:col-span-3 bg-white rounded-4xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-50 bg-slate-50/30">
                        <h2 className="text-sm font-black text-indigo-950 uppercase tracking-widest">Mon Compte</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-col items-center mb-6">

                        </div>

                        <form className="space-y-4">
                            <div>
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    <input 
                                        type="text" 
                                        className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-indigo-950 outline-none focus:ring-2 focus:ring-indigo-600/20" 
                                        value={adminData.name} 
                                        onChange={(e) => setAdminData({...adminData, name: e.target.value})} // Ampiasaina eto
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    <input 
                                            type="email" 
                                            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-indigo-950 outline-none focus:ring-2 focus:ring-indigo-600/20" 
                                            value={adminData.email} 
                                            onChange={(e) => setAdminData({...adminData, email: e.target.value})} // Ampiasaina eto koa
                                        />
                                </div>
                            </div>
                            <div className="pt-2">
                                <label className="text-[9px] font-black text-orange-600 uppercase tracking-widest ml-1">Mot de passe</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                    <input type="password" placeholder="********" className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold outline-none" />
                                </div>
                            </div>
                            <button type="button" onClick={() => Swal.fire('Compte', 'Mise à jour activée', 'info')} className="w-full bg-indigo-950 text-white py-3 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-indigo-900 shadow-md transition-all flex items-center justify-center gap-2">
                                <Save size={14} /> Enregistrer
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* MODAL (Notazoniko ilay anao) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-indigo-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black text-indigo-950 uppercase tracking-tighter">
                                {editingItem ? 'Modifier' : 'Ajouter'} <span className="text-indigo-600">Membre</span>
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500"><X /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="Nom complet" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                            <input type="text" placeholder="Rôle / Poste" required className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-600" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} />
                            <input type="file" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} />
                            <button type="submit" className="w-full bg-indigo-950 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                                <Save size={18} /> Sauvegarder
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Parametres;