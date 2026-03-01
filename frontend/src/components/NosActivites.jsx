import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, Sprout, Users, 
  Coins, Network, ArrowRight 
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
      desc: "La base de l'Action Tsinjo Aina repose sur la constitution de groupes informels soudés par la confiance.",
      details: "Chaque groupe se structure avec un bureau permanent (Président, Trésorier, Secrétaire) élu de manière transparente. C'est une cellule d'apprentissage de la démocratie directe.",
      points: ["Solidarité et confiance", "Décisions par consensus", "Équilibre hommes/femmes", "Règlement évolutif"],
      themeColor: "text-blue-700",
      bgColor: "bg-blue-700"
    },
    {
      id: "02",
      title: "Épargne et Crédit Interne",
      subtitle: "Autodéfense économique",
      icon: <Coins size={24} />,
      img: "/Epargne.jpg",
      desc: "L'épargne commune est l'arme principale de libération des membres face aux usuriers.",
      details: "Elle permet d'octroyer des crédits pour des besoins vitaux (nourriture, santé, écolage). Le principe 'On suit le plus faible' garantit l'inclusion de tous.",
      points: ["Épargne en riz ou argent", "Lutte contre l'usure", "Inclusion des vulnérables", "Gestion rigoureuse"],
      themeColor: "text-emerald-600",
      bgColor: "bg-emerald-600"
    },
    {
      id: "03",
      title: "Agroécologie et Souveraineté",
      subtitle: "Produire pour nourrir sainement",
      icon: <Sprout size={24} />,
      img: "/Formation.jpg",
      desc: "Nous formons les membres aux bases de l'agroécologie pour augmenter la production familiale.",
      details: "Fabrication de compost, haies vives et banques de semences communautaires sont au cœur de l'action pour une alimentation saine et durable.",
      points: ["Compostage & Haies vives", "Semences locales", "Éducation nutritionnelle", "Adaptation au climat"],
      themeColor: "text-green-600",
      bgColor: "bg-green-600"
    },
    {
      id: "04",
      title: "Réseautage et Plaidoyer",
      subtitle: "Une voix pour les exclus",
      icon: <Network size={24} />,
      img: "/Dvpmt.JPG",
      desc: "Le Réseau Tsinjo Aina regroupe les GS pour porter des plaidoyers au niveau communal.",
      details: "Les membres intègrent les Structures Locales de Concertation (SLC) pour agir sur le foncier, les droits civiques et l'accès aux services de base.",
      points: ["Conseils entre groupes", "Plaidoyer via la SLC", "Sécurisation foncière", "Diagnostic participatif"],
      themeColor: "text-blue-600",
      bgColor: "bg-blue-600"
    }
  ];

  return (
    <main className="bg-white min-h-screen font-sans">
      
      {/* --- HERO SECTION (NO-GAP SLIDESHOW) --- */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="slideshow-infinite">
            {/* Averina indroa ny sary voalohany amin'ny farany mba tsy hisy fahatapahana */}
            <div className="slide-item" style={{ backgroundImage: "url('/GS.jpg')" }}></div>
            <div className="slide-item" style={{ backgroundImage: "url('/Formation.jpg')" }}></div>
            <div className="slide-item" style={{ backgroundImage: "url('/Dvpmt.JPG')" }}></div>
            <div className="slide-item" style={{ backgroundImage: "url('/Epargne.jpg')" }}></div>
          </div>
          {/* Overlay mazava fa tsy bleumarine */}
          <div className="absolute inset-0 bg-blue-900/10 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-20 relative z-20">
          <button onClick={() => navigate(-1)} className="group flex items-center space-x-2 text-white hover:text-emerald-400 mb-6 transition-all drop-shadow-md">
            <ArrowLeft size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Retour</span>
          </button>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter mb-4 drop-shadow-2xl">
            NOS <span className="text-emerald-400">ACTIVITÉS.</span>
          </h1>
          <p className="text-white max-w-xl text-sm md:text-base font-bold leading-relaxed border-l-4 border-emerald-400 pl-4 drop-shadow-md">
            Transformer la précarité en souveraineté à travers l'effort propre et la solidarité.
          </p>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="container mx-auto px-6 md:px-20 pt-16 pb-12">
        <div className="grid grid-cols-1 gap-24">
          {activites.map((item, index) => (
            <article key={item.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
              <div className="w-full lg:w-1/2 relative group">
                <div className="overflow-hidden rounded-3xl shadow-2xl aspect-[4/3] border-4 border-slate-50">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className={`absolute -bottom-4 ${index % 2 === 0 ? '-right-4' : '-left-4'} p-4 ${item.bgColor} text-white rounded-2xl shadow-xl z-10`}>
                  {item.icon}
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-5">
                <span className={`${item.themeColor} font-black text-[11px] uppercase tracking-[0.3em]`}>{item.subtitle}</span>
                <h2 className="text-3xl md:text-4xl font-black text-black uppercase leading-tight">{item.title}</h2>
                
                <div className="space-y-4 text-black">
                  <p className="text-lg font-bold leading-snug">{item.desc}</p>
                  <p className="text-base leading-relaxed opacity-95">{item.details}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {item.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center space-x-2 group">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                      <span className="text-[11px] font-black text-black uppercase tracking-tight">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* --- FORMATION LIST --- */}
      <div className="bg-blue-50 py-10 border-y-2 border-blue-100">
        <div className="container mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center justify-center gap-6">
          <h3 className="text-xs font-black text-blue-900 uppercase tracking-[0.4em]">Formations :</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {["Gestion", "Agroécologie", "Genre", "Nutrition", "Plaidoyer", "Climat"].map((f, i) => (
              <div key={i} className="px-5 py-2 bg-white border-2 border-blue-100 text-[10px] font-black text-blue-800 uppercase rounded-full shadow-sm">
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- CALL TO ACTION --- */}
      <div className="container mx-auto px-6 md:px-13 py-13">
        <div className="bg-blue-900 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Bâtissons l'autonomie.</h2>
            <p className="text-blue-100 text-sm mb-10 max-w-xl mx-auto font-medium">
              Nous ciblons les personnes les plus démunies pour transformer l'exclusion en force collective.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-emerald-400 text-blue-900 px-12 py-5 font-black uppercase text-[11px] tracking-[0.2em] hover:bg-white transition-all rounded-full shadow-xl inline-flex items-center gap-3"
            >
              <span>Travailler avec nous</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* --- CSS SYSTEME SEAMLESS --- */}
      <style dangerouslySetInnerHTML={{ __html: `
        .slideshow-infinite {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .slide-item {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          /* Sary 4 * 4 segondra = 16s total loop */
          animation: crossFadeLoop 16s infinite ease-in-out;
        }

        /* Ny elanelana (timing) dia natao mifanindry tsara (overlapping) mba tsy hisy loko mipoitra */
        .slide-item:nth-child(1) { animation-delay: 0s; }
        .slide-item:nth-child(2) { animation-delay: 4s; }
        .slide-item:nth-child(3) { animation-delay: 8s; }
        .slide-item:nth-child(4) { animation-delay: 12s; }

        @keyframes crossFadeLoop {
          0% { opacity: 0; }
          5% { opacity: 1; }   /* Miseho haingana */
          25% { opacity: 1; }  /* Mijery 4 segondra */
          30% { opacity: 0; }  /* Manjavona tsikelikely eo ambonin'ny manaraka */
          100% { opacity: 0; }
        }
      `}} />
    </main>
  );
};

export default NosActivites;