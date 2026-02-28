import React from 'react';
import { 
  Users, ShieldCheck, Briefcase, MapPin, ArrowLeft, 
  Settings, LineChart, Sprout, Heart, UserCircle, LayoutGrid, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Recrutement = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fcfcfd] min-h-screen flex flex-col font-sans text-slate-900">
      
      {/* --- HEADER COMPACT & PREMIUM --- */}
      <section className="bg-indigo-950 pt-8 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        
        <div className="relative z-10 container mx-auto max-w-6xl">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center space-x-2 text-indigo-300/70 hover:text-emerald-400 transition-all mb-8 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Retour</span>
          </button>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase leading-none mb-4">
              Organigramme <span className="text-emerald-400">Institutionnel</span>
            </h1>
            <p className="text-indigo-200/50 text-[10px] font-black uppercase tracking-[0.4em]">
              ONG Tsinjo Aina Fianarantsoa
            </p>
          </div>
        </div>
      </section>

      {/* --- ORGANIGRAMME STRUCTURE --- */}
      <section className="container mx-auto max-w-6xl px-6 -mt-12 pb-24 relative z-20">
        
        {/* LEVEL 1: TOP MANAGEMENT (CENTERED) */}
        <div className="flex flex-col items-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            {/* Conseil d'Administration */}
            <div className="bg-white p-6 rounded-[2rem] shadow-xl border-2 border-indigo-600 flex flex-col items-center text-center group hover:bg-indigo-600 transition-all duration-500">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 mb-4 group-hover:bg-white/20 group-hover:text-white transition-colors">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-sm font-black text-indigo-950 uppercase group-hover:text-white">Conseil d’Administration</h3>
              <p className="text-[10px] text-slate-500 font-bold mt-2 group-hover:text-indigo-100 uppercase tracking-wider">Organe de Décision Stratégique</p>
            </div>

            {/* Directeur Exécutif */}
            <div className="bg-white p-6 rounded-[2rem] shadow-xl border-2 border-emerald-500 flex flex-col items-center text-center group hover:bg-emerald-500 transition-all duration-500">
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 mb-4 group-hover:bg-white/20 group-hover:text-white transition-colors">
                <UserCircle size={28} />
              </div>
              <h3 className="text-sm font-black text-indigo-950 uppercase group-hover:text-white">Directeur Exécutif</h3>
              <p className="text-[10px] text-slate-500 font-bold mt-2 group-hover:text-emerald-50 uppercase tracking-wider">Gestion & Coordination</p>
            </div>
          </div>
          
          {/* Visual Linker */}
          <div className="flex flex-col items-center mt-6">
            <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent"></div>
            <ChevronDown className="text-indigo-500 -mt-2" size={20} />
          </div>
        </div>

        {/* LEVEL 2: GESTION & SUPPORT (GRID) */}
        <div className="mb-16">
          <div className="flex items-center space-x-4 mb-8">
            <div className="h-px bg-slate-200 flex-grow"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Support & Administratif</span>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Responsable de Projet", code: "RP", icon: <Settings />, color: "border-sky-400", cite: "32" },
              { title: "Suivi & Évaluation", code: "R.S.E", icon: <LineChart />, color: "border-sky-400", cite: "38" },
              { title: "Comptable", code: "C.B", icon: <Briefcase />, color: "border-sky-400", cite: "36" },
              { title: "Secrétaire Caissière", code: "S.C", icon: <Users />, color: "border-sky-400", cite: "34" }
            ].map((item, i) => (
              <div key={i} className={`bg-white p-5 rounded-2xl border-t-4 ${item.color} shadow-lg shadow-slate-200/50 hover:-translate-y-1 transition-all`}>
                <div className="text-indigo-900 mb-3 opacity-60">{item.icon}</div>
                <h4 className="text-[11px] font-black text-indigo-950 uppercase leading-tight">{item.title} ({item.code})</h4>
              </div>
            ))}
          </div>
        </div>

        {/* LEVEL 3: OPÉRATIONS & TERRAIN */}
        <div>
          <div className="flex items-center space-x-4 mb-8">
            <div className="h-px bg-slate-200 flex-grow"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Équipes de Terrain</span>
            <div className="h-px bg-slate-200 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Socio-Organisateurs", code: "S.O", icon: <LayoutGrid />, desc: "Organisation communautaire", color: "bg-emerald-500" },
              { title: "Accompagnatrices Nutrition", code: "A.N", icon: <Heart />, desc: "Appui santé & nutrition", color: "bg-emerald-500" },
              { title: "Accompagnateurs Agricoles", code: "A.A", icon: <Sprout />, desc: "Développement rural", color: "bg-emerald-500" },
              { title: "Animateurs Locaux", code: "A.L", icon: <MapPin />, desc: "Relais de proximité", color: "bg-emerald-500" }
            ].map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-sm flex items-start space-x-4 hover:border-emerald-200 transition-colors">
                <div className={`p-2 rounded-xl text-white ${item.color}`}>
                  {React.cloneElement(item.icon, { size: 20 })}
                </div>
                <div>
                  <h4 className="text-[12px] font-black text-indigo-950 uppercase leading-none mb-1">{item.title}</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{item.code}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INFO CARD */}
        <div className="mt-16 bg-indigo-950 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute bottom-0 right-0 opacity-10 transform translate-x-10 translate-y-10">
            <Users size={200} />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-black uppercase mb-4">Engagement & Impact</h3>
              <p className="text-indigo-200/70 text-sm leading-relaxed mb-6 font-medium">
                Notre structure permet de toucher directement <span className="text-emerald-400">24 060 personnes</span> à travers des initiatives d'effort propre et de solidarité communautaire.
              </p>
              <div className="flex gap-4">
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                  <p className="text-emerald-400 font-black text-xl">11 814</p>
                  <p className="text-[8px] uppercase font-bold text-indigo-200">Femmes bénéficiaires</p>
                </div>
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg">
                  <p className="text-emerald-400 font-black text-xl">23 628</p>
                  <p className="text-[8px] uppercase font-bold text-indigo-200">Impact indirect</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <div className="bg-emerald-500 text-white p-6 rounded-2xl shadow-xl shadow-emerald-500/20">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">Approche</p>
                <p className="text-sm font-bold uppercase leading-tight">L'effort propre pour un développement durable et souverain</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recrutement;