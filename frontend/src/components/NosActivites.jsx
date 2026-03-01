import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Sprout, 
  Users, 
  Landmark, 
  Coins, 
  Network,
  ArrowRight
} from 'lucide-react';

const NosActivites = () => {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activites = [
    {
      id: "01",
      title: "Groupes de Solidarité (GS)",
      subtitle: "L'Humain au cœur du système",
      icon: <Users className="text-white" size={28} />,
      img: "/GS.jpg",
      desc: "La base de l'Action Tsinjo Aina repose sur la constitution de groupes informels soudés par la confiance et la motivation[cite: 1, 2, 3].",
      details: "Chaque groupe se structure de manière démocratique avec un bureau permanent (Président, Trésorier, Secrétaire) élu en toute transparence[cite: 8, 9]. C'est une cellule d'apprentissage de la démocratie directe où chaque décision est prise par consensus[cite: 12, 14, 15].",
      points: [
        "Constitution basée sur la solidarité et la confiance [cite: 3]",
        "Gestion transparente et par consensus [cite: 9, 14]",
        "Équilibre hommes/femmes essentiel [cite: 6]",
        "Règlement intérieur évolutif [cite: 18]"
      ],
      color: "bg-indigo-900"
    },
    {
      id: "02",
      title: "Épargne et Crédit Interne",
      subtitle: "Autodéfense économique",
      icon: <Coins className="text-white" size={28} />,
      img: "/Epargne.jpg", // Assurez-vous d'avoir cette image
      desc: "L'épargne commune est l'arme principale de libération et d'autodéfense des membres face aux usuriers[cite: 45].",
      details: "Que ce soit en argent ou en riz (paddy/blanc), l'épargne permet d'octroyer des crédits internes pour des besoins vitaux : nourriture en période de soudure, médicaments ou écolage[cite: 23, 25, 55]. Le principe 'On suit le plus faible' garantit l'inclusion des plus démunis[cite: 33, 34].",
      points: [
        "Épargne monétaire ou en produits agricoles [cite: 23]",
        "Crédit à taux nul ou très modeste [cite: 86]",
        "Lutte contre l'endettement usurier [cite: 54, 60]",
        "Gestion rigoureuse avec suivi par cahiers [cite: 43, 44]"
      ],
      color: "bg-fmfp-green"
    },
    {
      id: "03",
      title: "Agroécologie et Souveraineté",
      subtitle: "Produire pour nourrir sainement",
      icon: <Sprout className="text-white" size={28} />,
      img: "/Formation.jpg",
      desc: "Nous formons les membres aux bases de l'agroécologie pour diminuer les charges et augmenter la production familiale[cite: 131, 133].",
      details: "L'accent est mis sur la fabrication de compost, l'installation de haies vives et la création de banques de semences communautaires[cite: 132, 134, 135]. L'objectif final est une alimentation saine issue d'une production locale valorisée[cite: 136].",
      points: [
        "Fabrication de compost et haies vives ",
        "Banques de semences communautaires [cite: 135]",
        "Éducation nutritionnelle et santé [cite: 142]",
        "Adaptation au changement climatique [cite: 139]"
      ],
      color: "bg-emerald-700"
    },
    {
      id: "04",
      title: "Réseautage et Plaidoyer",
      subtitle: "Une voix pour les exclus",
      icon: <Network className="text-white" size={28} />,
      img: "/Dvpmt.JPG",
      desc: "Le Réseau Tsinjo Aina regroupe les GS de proximité pour des échanges de conseils et des actions communes[cite: 97, 98, 106].",
      details: "Le réseau porte des thématiques majeures : droits civiques, sécurisation foncière, et accès à l'eau potable[cite: 113, 115, 116]. Les membres intègrent les Structures Locales de Concertation (SLC) pour influencer les plans de développement[cite: 126, 127].",
      points: [
        "Échanges et conseils mutuels entre GS [cite: 120]",
        "Lobbying et plaidoyer via la SLC [cite: 126, 143]",
        "Actions sur le foncier et les droits civiques [cite: 113, 115]",
        "Diagnostics communautaires approfondis [cite: 121]"
      ],
      color: "bg-amber-600"
    }
  ];

  return (
    <main className="bg-slate-50 min-h-screen font-sans selection:bg-fmfp-green selection:text-white">
      {/* --- HERO SECTION --- */}
      <div className="relative bg-indigo-950 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-10 w-72 h-72 bg-fmfp-green rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 -right-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-20 relative z-10">
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center space-x-2 text-slate-400 hover:text-white transition-all mb-10"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Retour</span>
          </button>

          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-8">
              ACTIONS <br />
              <span className="text-fmfp-green tracking-tighter italic">TSINJO AINA.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl border-l-2 border-fmfp-green pl-6">
              Transformer la précarité en souveraineté à travers l'effort propre et la solidarité communautaire.
            </p>
          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="container mx-auto px-6 md:px-20 -mt-10 pb-20">
        <div className="grid grid-cols-1 gap-24">
          {activites.map((item, index) => (
            <article 
              key={item.id} 
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute -inset-4 bg-white shadow-2xl rounded-sm -z-10 group-hover:scale-[1.02] transition-transform duration-500"></div>
                <div className="overflow-hidden aspect-video lg:aspect-square relative">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  />
                  <div className={`absolute bottom-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} p-6 ${item.color} text-white`}>
                    <p className="text-4xl font-black italic opacity-50 leading-none">{item.id}</p>
                  </div>
                </div>
                {/* Floating Icon */}
                <div className={`absolute -top-6 ${index % 2 === 0 ? '-left-6' : '-right-6'} p-5 shadow-2xl ${item.color} border-4 border-white animate-bounce-slow`}>
                  {item.icon}
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 space-y-6">
                <header>
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-900 font-bold text-[10px] uppercase tracking-widest mb-4">
                    {item.subtitle}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-indigo-950 uppercase tracking-tight">
                    {item.title}
                  </h2>
                </header>

                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p className="text-lg font-bold text-indigo-900/80">
                    {item.desc}
                  </p>
                  <p className="text-base">
                    {item.details}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {item.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start space-x-2">
                      <CheckCircle2 size={16} className="text-fmfp-green mt-1 shrink-0" />
                      <span className="text-xs font-semibold text-slate-700 leading-tight">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* --- FORMATIONS LIST (MINIMALIST) --- */}
      <div className="bg-white py-20 border-y border-slate-200">
        <div className="container mx-auto px-6 md:px-20 text-center">
          <h3 className="text-2xl font-black text-indigo-950 uppercase tracking-widest mb-12">
            Domaines de Formation <span className="text-fmfp-green">[cite: 137]</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Gestion de temps [cite: 138]", 
              "Genre [cite: 140]", 
              "Nutrition [cite: 142]", 
              "Plaidoyer [cite: 143]", 
              "Climat [cite: 139]"
            ].map((f, i) => (
              <span key={i} className="px-6 py-3 bg-slate-50 border border-slate-200 text-xs font-black text-slate-500 uppercase rounded-full hover:border-fmfp-green hover:text-indigo-900 transition-all cursor-default">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- CALL TO ACTION --- */}
      <div className="container mx-auto px-6 md:px-20 py-24">
        <div className="relative bg-indigo-900 rounded-3xl overflow-hidden p-10 md:p-20 text-center shadow-2xl group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Bâtissons ensemble <br /> l'autonomie paysanne.
            </h2>
            <p className="text-indigo-200 max-w-xl mx-auto font-light">
              Le groupe cible direct de nos actions sont les plus démunis et exclus de la communauté[cite: 128, 129]. Rejoignez notre mouvement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => navigate('/contact')}
                className="group flex items-center justify-center space-x-3 bg-fmfp-green text-indigo-950 px-10 py-5 font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-lg"
              >
                <span>Soutenir l'Action</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Simple tailwind animation injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}} />
    </main>
  );
};

export default NosActivites;