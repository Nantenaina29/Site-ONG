import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import { UserCircle, Menu, X } from 'lucide-react';
import { supabase } from './supabaseClient';

// --- PAGES ---
import Login from './Login';
import Dashboard from './Dashboard';
import InterventionList from './pages/InterventionList';
import APropos from './pages/APropos';
import NosActivites from './components/NosActivites';
import InterventionsPubliees from './pages/InterventionsPubliees';
import Realisations from './pages/Realisations';
import Contact from './pages/Contact';
import Parametres from './pages/Parametres';
import EventCalendar from './components/EventCalendar';
import './index.css';

const phrasesHero = [
  "ONG TSINJO AINA FIANARANTSOA",
  "Construisons l'avenir malagasy",
  "Engageons-nous pour le social",
  "Soutenons nos communautés"
];

const TeamSection = () => {
  const [team, setTeam] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setTeamLoading(true);
        // Alaina mivantana avy amin'ny Supabase ny data
        const { data, error } = await supabase
          .from('teams')
          .select('*')
          .order('id', { ascending: true }); // Milahatra manaraka ny ID avy hatrany

        if (error) throw error;

        if (data && data.length > 0) {
          setTeam(data);
        }
      } catch (err) {
        console.error("Error fetching team:", err.message);
      } finally {
        setTeamLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (teamLoading) {
    return (
      <div className="py-24 text-center flex flex-col justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
        <p className="text-slate-400 font-medium tracking-widest text-[10px] uppercase">Chargement de l'équipe...</p>
      </div>
    );
  }
  return (
    <section className="py-8 bg-[#f8fafc]"> {/* Nahena ny py-24 ho py-8 */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TITRE SECTION - Nahena ny mb-16 ho mb-8 */}
        <div className="mb-8">
          <h2 className="text-[9px] font-black uppercase tracking-[0.4em] text-indigo-600 mb-1">
            Staff & Expertise
          </h2>
          <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">
            Ceux qui font la <span className="text-indigo-600">différence</span>
          </h3>
        </div>

        {/* GRID MEMBRES - gap-4 ho an'ny espace kely kokoa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((member, index) => (
            <div 
              key={member.id}
              className="group bg-white rounded-3xl p-3 shadow-sm hover:shadow-md transition-all duration-500 border border-slate-100 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* IMAGE CONTAINER - Boribory 2.5cm (approx 96px/w-24 h-24) */}
              <div className="relative h-20 w-20 shrink-0 rounded-full overflow-hidden bg-slate-50 border-2 border-white shadow-sm">
                <img 
                  src={member.img || `https://ui-avatars.com/api/?name=${member.name}&background=6366f1&color=fff`} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* INFO - Atao eo anilan'ny sary (flex) mba tsy handany toerana ambony/ambany */}
              <div className="min-w-0">
                <h4 className="text-sm font-black text-slate-800 tracking-tight leading-tight truncate">
                  {member.name}
                </h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {team.length === 0 && (
          <div className="text-center py-6 bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Aucun membre</p>
          </div>
        )}

      </div>
    </section>
  );
}

const ActivitiesHome = () => {
  const activities = [
    {
      id: "01",
      title: "Les Groupes de Solidarités (GS)",
      desc: "Le Groupe de Solidarité (GS) constitue l'espace fondamental où les membres pratiquent la démocratie directe, garantissant que chaque personne peut s'exprimer librement. Le fonctionnement de cette structure repose sur trois piliers essentiels que sont l'information, la formation et le soutien-conseil pour accompagner les membres. Pour assurer une gestion transparente, le groupe élit ouvertement un bureau permanent composé d'un président, d'un trésorier et d'un secrétaire qui agissent dans l'intérêt collectif. La prise de décision au sein du GS ne suit pas une simple majorité, mais recherche systématiquement le consensus après un débat collectif approfondi. Enfin, cette méthodologie applique le principe inclusif de « suivre le plus faible », ajustant le rythme de progression du groupe sur les capacités de ses membres les plus démunis.",
      details: ["Épargne commune (riz, argent)","Crédits internes sans usuriers","Principe 'On suit le plus faible'","Gestion transparente par bureau élu"],
      img: "/GS.jpg", align: "flex-row"
    },
    {
      id: "02",
      title: "Formations & Production",
      desc:  "Ce programme cible spécifiquement les personnes les plus démunies et exclues qui rencontrent des difficultés majeures pour accéder aux ressources naturelles nécessaires à la production. L'appui repose sur une formation solide aux bases de l'agroécologie, incluant la fabrication de compost biologique et l'installation de haies vives pour enrichir les terres. L'ONG facilite également la mise à disposition de semences locales et la constitution de banques de semences communautaires afin de garantir l'autonomie et la diversité des cultures. Parallèlement, une éducation nutritionnelle est dispensée pour valoriser la production locale et assurer une alimentation saine et équilibrée à toutes les familles. Enfin, des formations transversales sur la gestion du temps, le genre et l'adaptation au changement climatique complètent ce dispositif pour renforcer la résilience globale des bénéficiaires.",
      details: ["Bases de l'agroécologie","Éducation nutritionnelle","Genre & Climat","Banque de semences"],
      img: "/Formation.jpg", align: "flex-row-reverse"
    },
    {
      id: "03",
      title: "Les Réseaux",
      desc: "Ce réseau sert de plateforme d'échange et de concertation entre les différents groupements pour relever ensemble les défis du développement local et tendre vers une autonomie totale. Une action stratégique consiste en l'intégration des membres du réseau au sein de la Structure Locale de Concertation (SLC) afin d'assurer un lobbying et un plaidoyer efficaces auprès des instances décisionnelles. Le réseau accompagne également ses membres dans l'élaboration et la présentation de plans de développement structurés aux autorités locales pour influencer les politiques publiques. En plus de la défense des droits civiques, il promeut des actions communes pour sécuriser l'accès aux ressources vitales comme l'eau potable, le foncier et une agriculture durable. Enfin, ce mouvement vise à consolider la solidarité entre les groupements pour qu'ils deviennent des acteurs incontournables du progrès social et économique de leur région.",
      details: ["Lobbying & Plaidoyer (SLC)","Défense des Droits Civiques","Accès à l'eau & Foncier","Planification locale"],
      img: "/Dvpmt.JPG", align: "flex-row"
    }
  ];
  return (
    <section className="-mt-16 pt-0 pb-12 bg-white px-6 md:px-20 relative z-30">
      <div className="container mx-auto">
        <div className="mb-16 text-left">
          <h2 className="text-orange-600 font-bold text-xs uppercase tracking-[0.4em] mb-1">Piliers d'intervention</h2>
          <div className="h-0.5 w-16 bg-indigo-900 mb-4"></div>
          <h3 className="text-3xl md:text-5xl font-bold text-green-600 uppercase tracking-tighter leading-none">Notre méthodologie.</h3>
        </div>
        <div className="space-y-32">
          {activities.map((item, index) => (
            <div key={index} className={`flex flex-col lg:items-center gap-8 md:gap-16 ${item.align === 'flex-row' ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
              <div className="w-full lg:w-1/2">
                <img src={item.img} alt={item.title} className="w-full h-137.5 object-cover rounded-4xl shadow-2xl transition-transform duration-500 hover:scale-[1.01]" />
              </div>
              <div className="w-full lg:w-1/2 space-y-6 text-left">
                <div className="relative">
                   <span className="text-7xl font-black text-gray-100 absolute -top-10 -left-2 z-0 opacity-50">{item.id}</span>
                   <h4 className="text-3xl font-black text-green-600 uppercase tracking-tight relative z-10">{item.title}</h4>
                </div>
                <p className="text-lg text-gray-800 leading-relaxed border-l-4 border-orange-500 pl-6 font-medium">{item.desc}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mt-8">
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0"></div>
                      <p className="text-lg text-green-600 font-black uppercase tracking-tight leading-none">{detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ApproachSection = () => (
  <div className="py-6 bg-gray-50 px-6 md:px-20"> 
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div className="space-y-4 text-left">
        <h3 className="text-fmfp-green font-bold text-xs tracking-[0.3em] uppercase">Philosophie</h3>
        <h2 className="text-3xl font-black text-green-600 uppercase tracking-tighter leading-none">L'effort propre</h2>
        <div className="space-y-2 text-gray-700"> 
          <div className="border-l-4 border-fmfp-green pl-4 py-1">
              <p className="text-lg font-black uppercase text-green-600 mb-0.5">Épargne Collective</p>
              <p className="text-lg leading-snug">Pour briser le cycle de l'endettement, l'ONG met en place une épargne collective qui transforme les petites cotisations hebdomadaires en un capital communautaire géré en toute transparence. Ce fonds permet d'octroyer des crédits internes à taux justes, libérant ainsi les paysans de l'usure pour qu'ils retrouvent leur dignité et une totale indépendance financière.</p>
          </div>
          <div className="border-l-4 border-indigo-900 pl-4 py-1">
              <p className="text-lg font-black uppercase text-green-600 mb-0.5">Inclusion Totale</p>
              <p className="text-lg leading-snug">Ce principe garantit que le rythme de progression de l'ensemble du groupe s'ajuste systématiquement sur les capacités des membres les plus vulnérables afin de ne laisser personne de côté. En plaçant l'humain avant la performance technique, cette approche renforce la cohésion sociale et assure que chaque avancée bénéficie réellement à tous, sans exception.</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <img src="/TENA.jpg" alt="Impact" className="w-full h-80 object-cover shadow-sm" />
        <div className="mt-4 flex items-center gap-4">
          <span className="text-4xl font-black text-indigo-950">100%</span>
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-black uppercase tracking-widest text-orange-600">Démocratie Directe</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase">Consensus & Solidarité</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HomePage = () => {
  const [heroText, setHeroText] = useState("");
  const [heroDeleting, setHeroDeleting] = useState(false);
  const [heroLoop, setHeroLoop] = useState(0);
  const [heroSpeed, setHeroSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const i = heroLoop % phrasesHero.length;
      const fullText = phrasesHero[i];
      setHeroText(heroDeleting ? fullText.substring(0, heroText.length - 1) : fullText.substring(0, heroText.length + 1));
      setHeroSpeed(heroDeleting ? 50 : 100);
      if (!heroDeleting && heroText === fullText) {
        setTimeout(() => setHeroDeleting(true), 2500);
      } else if (heroDeleting && heroText === "") {
        setHeroDeleting(false);
        setHeroLoop(prev => prev + 1);
      }
    };
    const timer = setTimeout(handleTyping, heroSpeed);
    return () => clearTimeout(timer);
  }, [heroText, heroDeleting, heroLoop, heroSpeed]);

  return (
    <>
      <div className="relative h-[60vh] bg-gray-900 overflow-hidden text-left flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="/back.jpg" alt="Background" className="w-full h-full object-cover opacity-60" />
        </div>
        <div className="relative z-20 container mx-auto px-6 md:px-20 text-white">
          <h2 className="max-w-lg text-gray-300 mb-6 text-md font-light leading-tight">Formation et Développement</h2>
          <h1 className="text-4xl md:text-6xl font-black max-w-3xl mb-4 leading-none uppercase tracking-tighter min-h-[2.4em]">
            {heroText}
            <span className="inline-block w-1.5 h-10 md:h-14 bg-fmfp-green ml-2 animate-pulse align-middle"></span>
          </h1>
          <p className="max-w-lg text-gray-300 mb-6 text-md font-light leading-tight">Réduction durable de la pauvreté par l'autonomie des communautés vulnérables.</p>
          <Link to="/contact" className="w-fit bg-fmfp-green text-indigo-900 px-8 py-3 font-black uppercase text-xs tracking-widest hover:bg-white transition-all">Nous soutenir</Link>
        </div>
      </div>
      <TeamSection />
      <div className="bg-gray-50 py-12 px-6 md:px-20 border-t border-gray-100">
        <div className="container mx-auto"><EventCalendar /></div>
      </div>
      <ActivitiesHome />
      <ApproachSection />
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => { 
    const timer = setTimeout(() => setLoading(false), 400); 
    return () => clearTimeout(timer); 
  }, []);

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/a-propos", label: "À propos" },
    { path: "/interventions-publiees", label: "Interventions" },
    { path: "/realisations", label: "Réalisations" },
    { path: "/contact", label: "Contact" }
  ];

  if (loading) return <div className="h-screen flex items-center justify-center bg-white font-black uppercase text-[10px] tracking-widest text-fmfp-green">Chargement...</div>;

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-gray-900 relative">
        
        {/* --- NAVBAR --- */}
        <nav className="bg-white sticky top-0 z-50 px-6 md:px-20 py-5 flex justify-between items-center border-b shadow-sm">
          <Link to="/" className="flex items-center space-x-4 text-left">
            <img src="/Logo TAF 3D.png" alt="Logo" className="h-16 w-16 object-contain rounded-full border border-gray-100 shadow-sm" />
            <span className="text-green-600 font-black text-lg leading-none uppercase tracking-tighter">
              ONG TSINJO AINA FIANARANTSOA<br />
              <span className="text-[10px] font-bold tracking-[0.3em] text-indigo-800 uppercase">Haute Matsiatra</span>
            </span>
          </Link>

          {/* --- VERSION ORDINATEUR --- */}
          <ul className="hidden md:flex space-x-8 text-[16px] font-black uppercase tracking-widest text-indigo-900 items-center">
            {navLinks.map((l) => (
              <li key={l.path}>
                <NavLink 
                  to={l.path} 
                  className={({ isActive }) => isActive ? "border-b-2 border-fmfp-green pb-1 text-fmfp-green" : "hover:text-fmfp-green transition-colors"}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <Link to="/login" className="ml-4 hover:text-fmfp-green"><UserCircle size={24} /></Link>
          </ul>

          {/* --- ICON HAMBURGER (MOBILE) --- */}
          <button 
            className="md:hidden text-indigo-900 focus:outline-none p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Afaka akatona eto koa
          >
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </nav>

        {/* --- SIDEBAR MOBILE --- */}
        {/* Overlay (Miseho eo ambanin'ny navbar koa ny overlay) */}
        {isMenuOpen && (
          <div 
            className="fixed inset-0 top-26.25 bg-black/30 z-40 md:hidden" 
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}

          {/* Ny Sidebar (3.5cm ny largeur, fohy araka ny soratra ao anatiny) */}
          <div className={`fixed top-26.25 left-0 bg-white z-45 shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col border-r border-b rounded-br-2xl ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
              style={{ width: '132.3px' }}> 
            
            <ul className="flex flex-col items-start py-6 space-y-6 px-4">
              {navLinks.map((l) => (
                <li key={l.path} className="w-full">
                  <NavLink 
                    to={l.path} 
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => 
                      `text-[11px] font-black uppercase tracking-tight transition-colors block w-full ${
                        isActive 
                          ? 'text-fmfp-green border-l-4 border-fmfp-green pl-2' 
                          : 'text-indigo-900 hover:text-fmfp-green pl-2'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-4 border-t border-gray-100 w-full">
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="flex items-center space-x-2 text-indigo-900 hover:text-fmfp-green pl-2"
                >
                  <UserCircle size={20} />
                  <span className="text-[11px] font-black uppercase tracking-tight">Admin</span>
                </Link>
              </li>
            </ul>
          </div>

        {/* --- CONTENT --- */}
        <main className="grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/:id?" element={<Dashboard />} />
            <Route path="/interventions-list" element={<InterventionList />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/activites" element={<NosActivites />} />
            <Route path="/interventions-publiees" element={<InterventionsPubliees />} />
            <Route path="/realisations" element={<Realisations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/settings" element={<Parametres />} />
          </Routes>
        </main>

        <footer className="bg-sky-400 py-6 text-center text-indigo-950 font-bold text-[10px] uppercase tracking-[0.5em]">
          © {new Date().getFullYear()} ONG Tsinjo Aina Fianarantsoa — Haute Matsiatra
        </footer>
      </div>
    </Router>
  );
}

export default App;