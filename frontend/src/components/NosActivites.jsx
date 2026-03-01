import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, Sprout, Users, 
  Landmark, Coins, Network, ArrowRight 
} from 'lucide-react';

const NosActivites = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activites = [
    {
      id: "01",
      title: "Groupes de Solidarité (GS)",
      subtitle: "L'Humain au cœur du système",
      icon: <Users size={24} />,
      img: "/GS.jpg",
      desc: "La base de l'Action Tsinjo Aina repose sur la constitution de groupes informels.",
      details: "Chaque groupe se structure avec un bureau permanent (Président, Trésorier, Secrétaire) élu de manière ouverte et transparente[cite: 8, 9]. C'est une cellule d'apprentissage des vertus de la démocratie directe[cite: 12].",
      points: [
        "Solidarité et confiance mutuelle [cite: 3]",
        "Décisions prises par consensus [cite: 14]",
        "Rapport hommes/femmes équilibré [cite: 6]",
        "Règlement intérieur évolutif [cite: 18]"
      ],
      color: "bg-indigo-900"
    },
    {
      id: "02",
      title: "Épargne et Crédit Interne",
      subtitle: "Autodéfense économique",
      icon: <Coins size={24} />,
      img: "/Epargne.jpg",
      desc: "L'épargne commune est l'arme principale de libération et d'autodéfense des membres.",
      details: "Elle permet d'octroyer des crédits pour des besoins vitaux comme la nourriture en période de soudure, les médicaments ou l'écolage[cite: 55, 58]. Le taux d'intérêt est maintenu très modeste pour aider les plus vulnérables[cite: 86].",
      points: [
        "Épargne en riz ou monétaire [cite: 23]",
        "Lutte contre les usuriers [cite: 54]",
        "Principe 'On suit le plus faible' [cite: 33]",
        "Gestion rigoureuse et transparente "
      ],
      color: "bg-emerald-600"
    },
    {
      id: "03",
      title: "Agroécologie et Souveraineté",
      subtitle: "Produire pour nourrir sainement",
      icon: <Sprout size={24} />,
      img: "/Formation.jpg",
      desc: "Nous formons les membres aux bases de l'agroécologie pour diminuer les charges familiales[cite: 131, 133].",
      details: "L'accent est mis sur la fabrication de compost, l'installation de haies vives et la création de banques de semences communautaires[cite: 132, 135]. L'objectif est une alimentation saine issue de la production locale[cite: 133, 136].",
      points: [
        "Compostage et haies vives [cite: 132]",
        "Banques de semences locales [cite: 134]",
        "Éducation nutritionnelle [cite: 142]",
        "Adaptation au climat [cite: 139]"
      ],
      color: "bg-green-700"
    },
    {
      id: "04",
      title: "Réseautage et Plaidoyer",
      subtitle: "Une voix pour les exclus",
      icon: <Network size={24} />,
      img: "/Dvpmt.JPG",
      desc: "Le Réseau Tsinjo Aina regroupe les groupements de proximité pour des échanges réguliers[cite: 97, 98].",
      details: "Il permet de porter des thématiques majeures : droits civiques, sécurisation foncière, et accès à l'eau potable[cite: 112, 113, 115, 116]. Les membres intègrent les Structures Locales de Concertation (SLC)[cite: 126].",
      points: [
        "Conseils mutuels entre groupes [cite: 106]",
        "Lobbying et plaidoyer via la SLC [cite: 126]",
        "Sécurisation foncière [cite: 115]",
        "Diagnostic approfondi des problèmes [cite: 121]"
      ],
      color: "bg-amber-600"
    }
  ];

  return (
    <main className="bg-white min-h-screen font-sans">
      
      {/* --- HERO SECTION (PERFECT SLIDESHOW) --- */}
      <div className="relative h-[55vh] min-h-[400px] flex items-center overflow-hidden">
        {/* CSS-only Infinite Slideshow Background */}
        <div className="absolute inset-0 z-0">
          <div className="slideshow-container h-full w-full">
            <div className="slide" style={{ backgroundImage: "url('/GS.jpg')" }}></div>
            <div className="slide" style={{ backgroundImage: "url('/Formation.jpg')" }}></div>
            <div className="slide" style={{ backgroundImage: "url('/Dvpmt.JPG')" }}></div>
            <div className="slide" style={{ backgroundImage: "url('/Epargne.jpg')" }}></div>
          </div>
          <div className="absolute inset-0 bg-indigo-950/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-20 relative z-10 pt-10">
          <button onClick={() => navigate(-1)} className="group flex items-center space-x-2 text-white hover:text-emerald-400 mb-6 transition-colors">
            <ArrowLeft size={14} />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Retour</span>
          </button>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-4 drop-shadow-lg">
            NOS <span className="text-emerald-400 italic">ACTIVITÉS.</span>
          </h1>
          <p className="text-white max-w-xl text-sm md:text-base font-medium leading-relaxed border-l-2 border-emerald-400 pl-4 drop-shadow-md">
            Transformer la précarité en souveraineté à travers l'effort propre et la solidarité communautaire.
          </p>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="container mx-auto px-6 md:px-20 -mt-16 pb-12 relative z-20">
        <div className="grid grid-cols-1 gap-20">
          {activites.map((item, index) => (
            <article key={item.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-center animate-fade-in`}>
              <div className="w-full lg:w-1/2 group relative">
                <div className="overflow-hidden rounded-2xl shadow-xl aspect-[4/3]">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className={`absolute -bottom-4 ${index % 2 === 0 ? '-right-4' : '-left-4'} p-4 ${item.color} text-white rounded-xl shadow-xl`}>
                  {item.icon}
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-4">
                <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest">{item.subtitle}</span>
                <h2 className="text-2xl md:text-3xl font-black text-indigo-950 uppercase leading-tight">{item.title}</h2>
                <div className="space-y-3 text-slate-600 text-sm md:text-base leading-relaxed">
                  <p className="font-bold text-slate-800">{item.desc}</p>
                  <p>{item.details}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {item.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start space-x-2">
                      <CheckCircle2 size={14} className="text-emerald-500 mt-1 shrink-0" />
                      <span className="text-[11px] font-semibold text-slate-700 leading-tight">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* --- FORMATIONS LIST (ULTRA COMPACT) --- */}
      <div className="bg-slate-50 py-8 border-y border-slate-100">
        <div className="container mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center justify-center gap-4">
          <h3 className="text-[10px] font-black text-indigo-950 uppercase tracking-[0.2em]">Modules :</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {["Gestion Familiale [cite: 138]", "Changement Climatique [cite: 139]", "Genre [cite: 140]", "Agroécologie [cite: 141]", "Nutrition [cite: 142]", "Plaidoyer [cite: 143]"].map((f, i) => (
              <span key={i} className="px-3 py-1 bg-white border border-slate-200 text-[9px] font-bold text-slate-500 uppercase rounded-md">{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* --- CALL TO ACTION (MODERN & SLIM) --- */}
      <div className="container mx-auto px-6 md:px-20 py-12">
        <div className="bg-indigo-950 rounded-[2.5rem] p-10 md:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase mb-3">Rejoignez le mouvement.</h2>
            <p className="text-indigo-200 text-xs mb-8 max-w-lg mx-auto">
              Nous ciblons les plus démunis et exclus pour favoriser l'inclusion au sein du groupe[cite: 129, 36].
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="group inline-flex items-center space-x-4 bg-emerald-400 text-indigo-950 px-10 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all rounded-full"
            >
              <span>Contactez l'ONG</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* --- STYLES FOR SEAMLESS SLIDESHOW --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .slideshow-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .slide {
          position: absolute;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          animation: slideAnim 12s infinite;
        }
        .slide:nth-child(1) { animation-delay: 0s; }
        .slide:nth-child(2) { animation-delay: 3s; }
        .slide:nth-child(3) { animation-delay: 6s; }
        .slide:nth-child(4) { animation-delay: 9s; }

        @keyframes slideAnim {
          0% { opacity: 0; transform: scale(1); }
          5% { opacity: 1; }
          25% { opacity: 1; }
          30% { opacity: 0; transform: scale(1.1); }
          100% { opacity: 0; }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </main>
  );
};

export default NosActivites;