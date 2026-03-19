import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import {Home, Info, Briefcase, Award, Mail, UserCircle, Menu, X } from 'lucide-react';
import { supabase } from './supabaseClient';
import './i18n';

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
      className="group bg-white rounded-3xl p-3 shadow-sm hover:shadow-md transition-all duration-500 border border-slate-100 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* IMAGE CONTAINER - h-16 w-16 dia ampy tsara mba tsy ho tery loatra ny soratra */}
      <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden bg-slate-50 border-2 border-white shadow-sm">
        <img 
          src={member.img || `https://ui-avatars.com/api/?name=${member.name}&background=6366f1&color=fff`} 
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* INFO - Nesorina ny truncate mba hidina andalana ny anarana */}
      <div className="min-w-0 flex flex-col justify-center">
        <h4 className="text-[12px] font-black text-black tracking-tight leading-[1.1] whitespace-normal break-words">
          {member.name}
        </h4>
        <p className="text-[9px] font-bold text-blue-800 uppercase tracking-wider mt-1 whitespace-normal leading-tight">
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
      desc: "Le Groupe de Solidarité (GS) représente l’espace central de participation citoyenne, où les membres exercent une démocratie directe garantissant à chacun la liberté de parole. Son fonctionnement repose sur trois piliers essentiels : l’information, la formation et l’accompagnement-conseil, qui soutiennent l’engagement des membres. Pour assurer une gestion transparente, le GS procède à l’élection ouverte d’un bureau permanent composé d’un président, d’un trésorier et d’un secrétaire, tous investis dans la défense de l’intérêt collectif. Les décisions majeures sont systématiquement prises en Assemblée Générale (AG), réunissant l’ensemble des membres. ",
      details: ["Épargne commune (riz, argent)","Crédits internes sans usuriers","Principe 'On suit le plus faible'","Gestion transparente par bureau élu"],
      img: "/gs.jpg", align: "flex-row"
    },
    {
      id: "02",
      title: "Formations & Production",
      desc:  "Ce programme s’adresse en priorité aux personnes les plus vulnérables et marginalisées, confrontées à de fortes difficultés d’accès aux ressources naturelles indispensables à la production. L’appui repose sur une formation solide aux principes de l’agroécologie, renforcée par la mise à disposition de semences locales communautaires, garantissant l’autonomie et la diversité des cultures. Parallèlement, une éducation nutritionnelle valorise la production locale et favorise une alimentation saine et équilibrée pour toutes les familles. Enfin, des formations transversales portant sur la gestion du temps, l’égalité de genre et l’adaptation au changement climatique viennent compléter ce dispositif, afin de renforcer la résilience globale des bénéficiaires.",
      details: ["Bases de l'agroécologie","Éducation nutritionnelle","Genre & Climat","Multiplication et conservation des semences locales"],
      img: "/form.jpg", align: "flex-row-reverse"
    },
    {
      id: "03",
      title: "Les Réseaux",
      desc: "Le réseau constitue une véritable plateforme d’échange et de concertation entre les différents Groupes de Solidarité, leur permettant d’unir leurs forces pour relever les défis du développement local et progresser vers une autonomie durable. Une action stratégique clé réside dans l’intégration des membres au sein de la Structure Locale de Concertation (SLC), afin de renforcer le lobbying et le plaidoyer auprès des instances décisionnelles. Le réseau accompagne également ses membres dans l’élaboration et la présentation de plans de développement structurés aux autorités locales, contribuant ainsi à influencer les politiques publiques. Outre la défense des droits civiques, il encourage des initiatives communes visant à sécuriser l’accès aux ressources vitales telles que l’eau potable, le foncier et une agriculture durable. Enfin, ce mouvement consolide la solidarité entre les groupements, les positionnant comme des acteurs incontournables du progrès social et économique régional.",
      details: ["Lobbying & Plaidoyer (SLC)","Défense des Droits Civiques","Accès à l'eau & Foncier","Planification locale"],
      img: "/RESEAU.jpg", align: "flex-row"
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
                   <span className="text-7xl font-black text-gray-500 absolute -top-10 -left-2 z-0 opacity-50">{item.id}</span>
                   <h4 className="text-3xl font-black text-green-600 uppercase tracking-tight relative z-10">{item.title}</h4>
                </div>

                {/* --- ETO NO ASIANA ILAY text-justify --- */}
                <p className="text-lg text-gray-800 leading-relaxed border-l-4 border-orange-500 pl-6 font-medium text-justify">
                  {item.desc}
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mt-8">
                {item.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-center gap-3">
                    {/* 1. Ahena kely ny haben'ny teboka maitso */}
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></div>
                    
                    {/* 2. Ovaina ho text-[11px] mba hifanaraka amin'ny Navbar-nao */}
                    <p className="text-[11px] text-green-600 font-black uppercase tracking-tight leading-none">
                      {detail}
                    </p>
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
              <p className="text-lg leading-snug text-justify">La mise en place d’une épargne collective constitue une réponse concrète pour briser le cycle de l’endettement. Les petites cotisations hebdomadaires se transforment en un capital communautaire géré de manière transparente. Ce fonds permet d’accorder des crédits internes à des taux équitables, offrant aux paysans la possibilité de se libérer de l’usure et de retrouver leur dignité ainsi qu’une véritable indépendance financière.</p>
          </div>
          <div className="border-l-4 border-indigo-900 pl-4 py-1">
              <p className="text-lg font-black uppercase text-green-600 mb-0.5">Inclusion Totale</p>
              <p className="text-lg leading-snug text-justify">Ce principe garantit que le rythme de progression de l'ensemble du groupe s'ajuste systématiquement sur les capacités des membres les plus vulnérables afin de ne laisser personne de côté. En plaçant l'humain avant la performance technique, cette approche renforce la cohésion sociale et assure que chaque avancée bénéficie réellement à toutes et à tous, sans exception.</p>
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
          <img src="/ENTRAIDE.jpg" alt="Background" className="w-full h-full object-cover opacity-60" />
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

  // Menu raikitra amin'ny teny Frantsay
  const navLinks = [
    { path: "/", label: "Accueil", icon: <Home size={14} /> },
    { path: "/a-propos", label: "À propos", icon: <Info size={14} /> },
    { path: "/interventions-publiees", label: "Interventions", icon: <Briefcase size={14} /> },
    { path: "/realisations", label: "Réalisations", icon: <Award size={14} /> },
    { path: "/contact", label: "Contact", icon: <Mail size={14} /> }
  ];

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white font-black uppercase text-[10px] tracking-widest text-green-600">
      Chargement...
    </div>
  );

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
          <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8 text-[11px] font-black uppercase tracking-widest text-indigo-900 items-center">
              {navLinks.map((l) => (
                <li key={l.path}>
                  <NavLink 
                    to={l.path} 
                    className={({ isActive }) => isActive ? "border-b-2 border-green-600 pb-1 text-green-600" : "hover:text-green-600 transition-colors"}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-4 border-l pl-6 border-gray-200">
              <Link to="/login" className="text-indigo-900 hover:text-green-600 transition-colors">
                <UserCircle size={28} />
              </Link>
            </div>
          </div>

          {/* --- ICON HAMBURGER (MOBILE) --- */}
          <button className="md:hidden text-indigo-900 focus:outline-none p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </nav>
              {/* --- SIDEBAR MOBILE --- */}
              {isMenuOpen && (
                <div 
                  className="fixed inset-0 top-[105px] bg-black/40 z-40 md:hidden backdrop-blur-sm" 
                  onClick={() => setIsMenuOpen(false)}
                ></div>
              )}

              <div className={`fixed top-[105px] left-0 h-[calc(100vh-105px)] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col border-r border-gray-100 ${
                isMenuOpen ? 'translate-x-0' : '-translate-x-full'
              }`} 
              style={{ width: '200px' }}> {/* Natao 200px mba ho malalaka tsara ny soratra */}
                
                <ul className="flex flex-col items-start py-8 space-y-2 px-4">
                  {navLinks.map((l) => (
                    <li key={l.path} className="w-full">
                      <NavLink 
                        to={l.path} 
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) => 
                          `flex flex-row items-center gap-4 p-3 rounded-xl transition-all duration-200 w-full ${
                            isActive 
                              ? 'bg-green-50 text-green-600 shadow-sm' 
                              : 'text-indigo-900 hover:bg-gray-50'
                          }`
                        }
                      >
                        {/* Icon - tsy miova habe (shrink-0) */}
                        <span className="shrink-0 opacity-80">{l.icon}</span>
                        
                        {/* Soratra - tsy tapaka (whitespace-nowrap) */}
                        <span className="text-[11px] font-extrabold uppercase tracking-wide whitespace-nowrap">
                          {l.label}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                  
                  {/* Admin Section eo ambany */}
                  <li className="mt-4 pt-4 border-t border-gray-100 w-full">
                    <Link 
                      to="/login" 
                      onClick={() => setIsMenuOpen(false)} 
                      className="flex flex-row items-center gap-4 p-3 text-indigo-900 hover:text-green-600 transition-colors"
                    >
                      <UserCircle size={22} className="shrink-0 opacity-80" />
                      <span className="text-[11px] font-extrabold uppercase tracking-wide">Admin ONG</span>
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