import React from 'react';
import { ArrowLeft, CheckCircle2, Sprout, Users, Landmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NosActivites = () => {
  const navigate = useNavigate();

  const activites = [
    {
      title: "Groupe de Solidarité et Réseaux (GS)",
      icon: <Users className="text-fmfp-green" size={32} />,
      img: "/GS.jpg",
      subtitle: "Le socle du développement communautaire",
      desc: "Le GS est la pierre angulaire de l'ONG Tsinjo Aina. Il s'agit d'une structure regroupant les personnes vulnérables et les paysans pour favoriser l'entraide.",
      details: "Grâce à l'épargne commune (monétaire ou en produits agricoles), les membres parviennent à surmonter les périodes de soudure sans dépendre de l'endettement extérieur. C'est une véritable école de démocratie directe.",
      points: [
        "Promotion de l'épargne solidaire",
        "Gestion par consensus et transparence",
        "Mise en réseau au niveau communal"
      ]
    },
    {
      title: "Formations et Renforcement de Capacités",
      icon: <Sprout className="text-fmfp-green" size={32} />,
      img: "/Formation.jpg",
      subtitle: "Des outils pour l'autonomie durable",
      desc: "Nous proposons des formations adaptées aux réalités locales afin de doter les bénéficiaires de compétences pratiques et pérennes.",
      details: "Notre approche repose sur le 'Learning by doing' (apprendre en faisant), transformant chaque membre en acteur de son propre progrès.",
      points: [
        "Agroécologie & Compostage : préserver la terre",
        "Éducation nutritionnelle : santé de la famille",
        "Adaptation au changement climatique",
        "Droit & Citoyenneté : connaître ses devoirs"
      ]
    },
    {
      title: "Développement Local et Plaidoyer",
      icon: <Landmark className="text-fmfp-green" size={32} />,
      img: "/Dvpmt.JPG",
      subtitle: "Participation active à la gouvernance",
      desc: "Nous travaillons en étroite collaboration avec les autorités locales pour intégrer la voix des plus vulnérables dans les décisions publiques.",
      details: "Nous accompagnons les Communes dans l'élaboration du PCD (Plan Communal de Développement) et facilitons l'intégration des bénéficiaires dans les SLC (Structures Locales de Concertation).",
      points: [
        "Appui aux administrations décentralisées",
        "Plaidoyer pour les paysans vulnérables",
        "Élaboration de plans de développement inclusifs"
      ]
    }
  ];

  return (
    <section className="bg-white min-h-screen pb-32 font-sans">
      {/* --- EN-TÊTE --- */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-20 py-10">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center space-x-2 text-gray-400 hover:text-indigo-950 transition-all mb-12 group"
          >
            <ArrowLeft size={18} strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Retour</span>
          </button>

          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-black text-indigo-950 uppercase tracking-tighter leading-none mb-6">
              Nos <span className="text-fmfp-green">Activités</span>.
            </h1>
            <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl">
              Nous appliquons la stratégie de l'Effort Propre pour transformer la précarité en une force de développement souveraine.
            </p>
          </div>
        </div>
      </div>

      {/* --- LISTE DES ACTIVITÉS --- */}
      <div className="container mx-auto px-6 md:px-20 pt-20">
        <div className="space-y-32">
          {activites.map((item, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Côté Visuel */}
              <div className="lg:col-span-5 space-y-6">
                <div className="aspect-[4/5] bg-gray-100 overflow-hidden relative group">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-6 left-6 bg-white p-4 shadow-xl">
                    {item.icon}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-black text-gray-100 italic">0{index + 1}</span>
                  <div className="h-[2px] grow bg-gray-100"></div>
                </div>
              </div>

              {/* Détails du contenu */}
              <div className="lg:col-span-7 pt-4">
                <span className="text-fmfp-green font-black text-xs uppercase tracking-[0.4em] mb-4 block">
                  {item.subtitle}
                </span>
                <h3 className="text-4xl font-black text-indigo-950 uppercase tracking-tighter mb-8 leading-tight">
                  {item.title}
                </h3>
                
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p className="font-semibold text-indigo-900">{item.desc}</p>
                  <p>{item.details}</p>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {item.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start space-x-3 p-4 border border-gray-100 hover:border-fmfp-green transition-colors group">
                      <CheckCircle2 size={18} className="text-fmfp-green mt-1 shrink-0" />
                      <span className="text-sm font-bold text-gray-500 group-hover:text-indigo-950 transition-colors">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* --- APPEL À L'ACTION (CTA) --- */}
      <div className="container mx-auto px-6 md:px-20 mt-40">
        <div className="bg-indigo-950 p-16 text-center space-y-8">
           <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
             Souhaitez-vous soutenir nos actions ?
           </h2>
           <button 
             onClick={() => navigate('/contact')}
             className="bg-fmfp-green text-indigo-950 px-12 py-5 font-black uppercase text-xs tracking-widest hover:bg-white transition-all"
           >
             Contactez-nous
           </button>
        </div>
      </div>
    </section>
  );
};

export default NosActivites;