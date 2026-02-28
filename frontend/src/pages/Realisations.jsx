import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, ArrowRight, CheckCircle2, X } from 'lucide-react';

const Realisations = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {

    axios.get('http://127.0.0.1:8000/api/interventions')
      .then(res => {
        const rawData = Array.isArray(res.data) ? res.data : (res.data.data || []);

        const finishedProjects = rawData.filter(item => item.is_published == 1 || item.is_published === true);
        setData(finishedProjects);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur Realisations:", err);
        setLoading(false);
      });
}, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fmfp-blue"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* --- HEADER --- */}
      <section className="bg-sky-400 py-10 text-center border-b border-white/10"> 
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-indigo-900 uppercase mb-2 tracking-tight"> 
            Nos <span className="text-white">Réalisations</span>
          </h1>
          <p className="text-indigo-950 text-base leading-relaxed font-medium"> 
            Découvrez les projets concrets menés à bien par l'ONG Tsinjo Aina. 
            Chaque réalisation témoigne de notre engagement envers le développement durable à Madagascar.
          </p>
        </div>
      </section>

      {/* --- LISTE DES RÉALISATIONS --- */}
      <section className="container mx-auto py-16 px-4 md:px-10 max-w-7xl">
        <div className="flex flex-col space-y-12">
          {data.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col md:flex-row items-stretch"        >

              <div className="md:w-1/2 lg:w-5/12 bg-gray-100 flex items-center justify-center relative min-h-87.5 overflow-hidden">
                <img 
                  src={item.image 
                    ? `http://localhost:8000/storage/${item.image}` 
                    : 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800'} 
                  className="max-w-full max-h-87.5 object-contain transition duration-700 group-hover:scale-110" 
                  alt={item.title} 
                />
                <div className="absolute top-6 left-6 bg-fmfp-blue text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-lg">
                  <CheckCircle2 size={14} className="text-[#28a745]" />
                  Projet Terminé
                </div>
              </div>

              {/* ---  DETAILS --- */}
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center text-left">
                <div className="flex items-center space-x-6 text-gray-400 text-[11px] uppercase font-bold mb-6 tracking-widest">
                  <span className="flex items-center">
                    <Calendar size={16} className="mr-2 text-fmfp-blue"/> 
                    {new Date(item.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
                  </span>
                  <span className="flex items-center">
                    <MapPin size={16} className="mr-2 text-fmfp-blue"/> 
                    {item.location || 'Madagascar'}
                  </span>
                </div>
                
                <h3 className="text-3xl font-black text-fmfp-blue mb-6 group-hover:text-[#28a745] transition-colors uppercase leading-tight tracking-tight">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-base leading-relaxed mb-10 border-l-4 border-gray-100 pl-6 italic line-clamp-3">
                  {item.description}
                </p>

                <div className="mt-auto">
                  <button 
                    onClick={() => { setSelectedProject(item); setIsModalOpen(true); }}
                    className="group/btn inline-flex items-center bg-transparent border-2 border-fmfp-blue text-fmfp-blue px-8 py-3 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-fmfp-blue hover:text-white transition-all duration-300"
                  >
                    Consulter l'impact
                    <ArrowRight size={18} className="ml-3 group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data.length === 0 && (
          <div className="text-center py-24 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium text-lg">Aucune réalisation répertoriée pour le moment.</p>
          </div>
        )}
      </section> 

      {/* --- MODAL DÉTAILS DU PROJET --- */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] rounded-4xl overflow-hidden relative shadow-2xl flex flex-col lg:flex-row">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 z-10 bg-black/20 hover:bg-red-600 text-white p-2 rounded-full transition-all"
            >
              <X size={24} />
            </button>
            <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center h-75 lg:h-auto overflow-hidden">
              <img 
                src={`http://localhost:8000/storage/${selectedProject.image}`} 
                className="w-full h-full object-contain p-4" 
                alt={selectedProject.title} 
              />
            </div>

            <div className="flex-1 p-8 md:p-12 overflow-y-auto">
              <span className="text-[#28a745] font-black uppercase text-xs tracking-[0.3em]">Impact & Résultat</span>
              <h2 className="text-4xl font-black text-fmfp-blue uppercase mt-4 mb-8 leading-tight">
                {selectedProject.title}
              </h2>
              
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>{selectedProject.description}</p>
                
                <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
                  <div className="border-l-4 border-[#28a745] pl-4">
                    <h4 className="font-bold text-fmfp-blue uppercase text-xs tracking-wider">Localisation</h4>
                    <p className="text-sm">{selectedProject.location}</p>
                  </div>
                  <div className="border-l-4 border-[#28a745] pl-4">
                    <h4 className="font-bold text-fmfp-blueuppercase text-xs tracking-wider">Date de fin</h4>
                    <p className="text-sm">{new Date(selectedProject.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(false)}
                className="mt-12 w-full py-4 bg-fmfp-blue text-white font-bold rounded-xl uppercase tracking-widest hover:bg-[#28a745] transition-all"
              >
                Fermer le rapport
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Realisations;