import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, Sprout, Users, 
  Landmark, Coins, Network, ArrowRight 
} from 'lucide-react';

const NosActivites = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = ["/GS.jpg", "/Formation.jpg", "/Dvpmt.JPG", "/Epargne.jpg"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activites = [
    {
      id: "01",
      title: "Groupes de Solidarité (GS)",
      subtitle: "L'Humain au cœur du système",
      icon: <Users size={24} />,
      img: "/GS.jpg",
      desc: "La base de l'Action Tsinjo Aina repose sur la constitution de groupes informels soudés par la confiance et la motivation[cite: 2, 3].",
      details: "Chaque groupe se structure de manière démocratique avec un bureau permanent (Président, Trésorier, Secrétaire) élu en toute transparence. C'est une cellule d'apprentissage de la démocratie directe[cite: 12].",
      points: [
        "Constitution basée sur la solidarité [cite: 3]",
        "Gestion transparente par consensus [cite: 14]",
        "Équilibre hommes/femmes essentiel [cite: 6]",
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
      desc: "L'épargne commune est l'arme principale de libération et d'autodéfense des membres face aux usuriers[cite: 45].",
      details: "L'épargne permet d'octroyer des crédits pour des besoins vitaux : nourriture, médicaments ou écolage[cite: 55, 57]. Le principe 'On suit le plus faible' garantit l'inclusion des plus démunis[cite: 33, 34].",
      points: [
        "Épargne en argent ou riz paddy [cite: 23, 25]",
        "Crédit à taux nul ou modeste ",
        "Lutte contre l'endettement usurier [cite: 56]",
        "Gestion rigoureuse et transparente [cite: 44, 45]"
      ],
      color: "bg-emerald-600"
    },
    {
      id: "03",
      title: "Agroécologie et Souveraineté",
      subtitle: "Produire pour nourrir sainement",
      icon: <Sprout size={24} />,
      img: "/Formation.jpg",
      desc: "Nous formons les membres aux bases de l'agroécologie pour diminuer les charges et augmenter la production[cite: 131, 132].",
      details: "L'accent est mis sur la fabrication de compost, l'installation de haies vives et la création de banques de semences communautaires[cite: 132, 135]. L'objectif est une alimentation saine[cite: 136].",
      points: [
        "Fabrication de compost et haies vives [cite: 132]",
        "Banques de semences locales [cite: 134, 135]",
        "Éducation nutritionnelle [cite: 142]",
        "Adaptation au changement climatique [cite: 139]"
      ],
      color: "bg-green-700"
    },
    {
      id: "04",
      title: "Réseautage et Plaidoyer",
      subtitle: "Une voix pour les exclus",
      icon: <Network size={24} />,
      img: "/Dvpmt.JPG",
      desc: "Le Réseau Tsinjo Aina regroupe les GS de proximité pour des échanges et des actions communes[cite: 96, 97].",
      details: "Le réseau porte des thématiques majeures : droits civiques, sécurisation foncière, et accès à l'eau potable[cite: 113, 115, 116]. Les membres intègrent les Structures Locales de Concertation (SLC)[cite: 126].",
      points: [
        "Échanges et conseils mutuels [cite: 120]",
        "Lobbying et plaidoyer via la SLC [cite: 126]",
        "Actions sur le foncier et droits [cite: 113, 115]",
        "Diagnostics communautaires [cite: 121]"
      ],
      color: "bg-amber-600"
    }
  ];

  return (
    <main className="bg-white min-h-screen font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* --- HERO SECTION (COMPACT WITH SLIDESHOW) --- */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden bg-slate-900">
        {slides.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-50' : 'opacity-0'}`}
          >
            <img src={img} alt="Background" className="w-full h-full object-cover scale-110 animate-slow-zoom" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/60 to-white"></div>
        
        <div className="container mx-auto px-6 md:px-20 relative z-10 pt-10">
          <button onClick={() => navigate(-1)} className="group flex items-center space-x-2 text-white/70 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={14} />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Retour</span>
          </button>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-4">
            NOS <span className="text-emerald-400 italic">ACTIVITÉS.</span>
          </h1>
          <p className="text-white/80 max-w-xl text-sm md:text-base font-light leading-relaxed border-l border-emerald-400 pl-4">
            Transformer la précarité en souveraineté à travers l'effort propre et la solidarité communautaire.
          </p>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="container mx-auto px-6 md:px-20 -mt-16 pb-12 relative z-20">
        <div className="grid grid-cols-1 gap-20">
          {activites.map((item, index) => (
            <article key={item.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-center`}>
              <div className="w-full lg:w-1/2 group relative">
                <div className="overflow-hidden rounded-2xl shadow-2xl aspect-[4/3]">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                </div>
                <div className={`absolute -bottom-4 ${index % 2 === 0 ? '-right-4' : '-left-4'} p-4 ${item.color} text-white rounded-xl shadow-xl`}>
                  {item.icon}
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-4">
                <span className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest">{item.subtitle}</span>
                <h2 className="text-2xl md:text-3xl font-black text-indigo-950 uppercase">{item.title}</h2>
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

      {/* --- FORMATIONS LIST (CLEAN & NO EXTRA SPACE) --- */}
      <div className="bg-slate-50 py-10 border-y border-slate-100">
        <div className="container mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-xs font-black text-indigo-950 uppercase tracking-[0.3em] whitespace-nowrap">Formations Offertes :</h3>
          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            {["Gestion", "Agroécologie", "Genre", "Nutrition", "Plaidoyer", "Climat"].map((f, i) => (
              <span key={i} className="px-4 py-1.5 bg-white border border-slate-200 text-[9px] font-bold text-slate-500 uppercase rounded-full">{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* --- CALL TO ACTION (MINIMAL) --- */}
      <div className="container mx-auto px-6 md:px-20 py-16">
        <div className="bg-indigo-950 rounded-[2rem] p-10 md:p-14 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-black text-white uppercase mb-4">Bâtissons l'autonomie paysanne.</h2>
            <p className="text-indigo-200 text-sm mb-8 max-w-lg mx-auto font-light">
              Le groupe cible direct est constitué des personnes les plus démunies et exclues de la communauté[cite: 128, 129].
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="inline-flex items-center space-x-3 bg-emerald-400 text-indigo-950 px-8 py-4 font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-lg"
            >
              <span>Nous Contacter</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom { animation: slow-zoom 10s linear infinite alternate; }
      `}} />
    </main>
  );
};

export default NosActivites;