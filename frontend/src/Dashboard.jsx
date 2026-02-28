import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PlusCircle, LogOut, ArrowLeft, Save, Loader2, Image as ImageIcon, X } from 'lucide-react';

function Dashboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]); // State ho an'ny sary maro
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    location: '', 
    image: null 
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/interventions/${id}`);
          const { title, description, location } = response.data;
          setFormData({ title, description, location, image: null });
        } catch (error) {
          console.error("Erreur de chargement:", error);
          Swal.fire('Erreur', 'Impossible de charger les données.', 'error');
        }
      };
      fetchData();
    }
  }, [id]);

  // --- 1. FITANTANANA NY SARY MARO ---
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // Mitambatra amin'izay efa teo raha misy
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    
    if (!token) {
      Swal.fire('Erreur', 'Session expirée, veuillez vous reconnecter.', 'error');
      navigate('/login');
      return;
    }
  
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('location', formData.location);

    // --- 2. FAMERANA NY SARY MARO ANATY FORMDATA ---
    selectedImages.forEach((file) => {
      data.append('images[]', file); 
    });

    const url = id 
      ? `http://localhost:8000/api/interventions/${id}?_method=PUT` 
      : 'http://localhost:8000/api/interventions';
    
    try {
      await axios.post(url, data, {
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json' 
        }
      });
      
      Swal.fire({ 
        title: 'Succès !', 
        text: id ? 'L\'intervention a été mise à jour.' : 'L\'intervention a été enregistrée.', 
        icon: 'success',
        confirmButtonColor: '#10b981'
      });

      navigate('/interventions-list');
  
    } catch (error) {
      console.error("Détails de l'erreur:", error.response?.data);
      Swal.fire({ 
        title: 'Erreur !', 
        text: error.response?.data?.message || 'Une erreur est survenue.', 
        icon: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
             <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                <PlusCircle size={28} />
             </div>
             <h1 className="text-2xl font-black text-blue-900 uppercase tracking-tight">
               {id ? 'Modifier l\'intervention' : 'Nouvelle Intervention'}
             </h1>
          </div>

          <div className="flex gap-3">
            <Link 
              to="/interventions-list" 
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              <ArrowLeft size={20} />
              <span>Retour</span>
            </Link>

            <button 
              onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl border border-red-100 hover:bg-red-600 hover:text-white transition-all font-bold"
            >
              <LogOut size={20} />
              <span>Quitter</span>
            </button>
          </div>
        </div>
        
        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-extrabold text-black uppercase mb-3 tracking-wide">
                Titre de l'action
              </label>
              <input 
                type="text" 
                placeholder="Ex: Distribution de kits scolaires" 
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-sm" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-extrabold text-black uppercase mb-3 tracking-wide">
                Lieu / Ville
              </label>
              <input 
                type="text" 
                placeholder="Ex: Antsirabe" 
                className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-sm" 
                value={formData.location} 
                onChange={(e) => setFormData({...formData, location: e.target.value})} 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-extrabold text-black uppercase mb-3 tracking-wide">
              Description détaillée
            </label>
            <textarea 
              placeholder="Racontez ce qui a été fait..." 
              rows="5" 
              className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-sm" 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              required
            ></textarea>
          </div>

          {/* --- 3. SECTION SARY VAOADIO --- */}
          <div>
            <label className="block text-sm font-extrabold text-black uppercase mb-3 tracking-wide">
              Images d'illustration (Plusieurs possibles)
            </label>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
              {/* PREVIEW SARY */}
              {selectedImages.map((file, index) => (
                <div key={index} className="relative h-24 w-full bg-gray-100 rounded-xl overflow-hidden group border border-gray-200">
                  <img 
                    src={URL.createObjectURL(file)} 
                    className="h-full w-full object-cover" 
                    alt="preview" 
                  />
                  <button 
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              {/* BOKOTRA HIFIDY SARY */}
              <label 
                htmlFor="image-upload" 
                className="h-24 w-full border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-50 cursor-pointer transition-all"
              >
                <ImageIcon size={24} />
                <span className="text-[10px] font-bold uppercase mt-1">Ajouter</span>
              </label>
            </div>

            <input 
              type="file" 
              onChange={handleImageChange} 
              multiple 
              className="hidden" 
              id="image-upload"
              accept="image/*"
            />
            <p className="mt-3 text-xs text-gray-500 font-medium italic">Format supportés: JPG, PNG. Sélectionnez plusieurs fichiers si nécessaire.</p>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-600 text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest transition-all hover:bg-emerald-700 hover:shadow-2xl active:scale-95 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
              <span>{id ? 'Mettre à jour l\'intervention' : 'Enregistrer l\'intervention'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;