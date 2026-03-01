import React from 'react';
import { Target, Heart, ShieldCheck, Users, Sprout, Landmark, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const APropos = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">

      {/* --- 3. NOTRE HISTOIRE, VISION & VALEURS --- */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* HISTOIRE & VISION */}
            <div className="space-y-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-indigo-950 uppercase border-l-4 border-orange-500 pl-4">
                  Notre Histoire
                </h3>
                <div className="text-lg text-gray-700 leading-relaxed font-medium space-y-4">
                  <p>
                  Le Projet Fianarantsoa a vu le jour en 1998 dans la partie sud de Fianarantsoa
                   à Ambalavao à titre de projet individuel. Il a ensuite connu une expansion en 2001 
                   et 2003 vers le nord, et depuis, il n’a cessé de grandir. En 2009, l’Association
                    Tsinjo Aina Betsileo  a été crée pour soutenir cette initiative. Puis, en  décembre 2016, 
                    cette association a été transformée en l’ONG TSINJO AINA Fianarantsoa.
                  </p>
                  <p>
                  Actuellement, l’ONG bénéficie à 24 060 personnes directement, dont 11 814 femmes,
                   et touche indirectement 23 628 personnes supplémentaires. L’organisation s’efforce
                    améliorer les condition de vie et autonomiser les communautés locales, en
                     particulier les femmes, a travers divers projets sociaux, économiques et environnementaux.
                  </p>
                  <p>
                  L’approche de  ‘ONG repose sur l’effort propre des  communautés, c’est a dire encourager
                   les groupes créer et gérer leurs propres initiatives de développement durable. L’ONG prône
                    également la reconstruction la solidarité communautaire, un concept qui a historiquement
                     existe a Madagascar mais qui a peu a peu disparu. Elle met l’accent sur le renforcement
                      des capacités, l’acquisition de compétences et la sensibilisation pour un développement
                       durable et souverain.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black text-indigo-950 uppercase border-l-4 border-emerald-500 pl-4">
                Nos Fondements
                </h3>
                <div className="text-lg text-gray-700 leading-relaxed font-medium space-y-6">
                  <p>
                    <strong>Vision :</strong> Faire de chaque bénéficiaire un citoyen responsable, prenant en main son développement et vivant en harmonie dans une société équitable.
                  </p>
                  <p>
                    <strong>Mission :</strong> Œuvrer pour le développement humain durable, l’autopromotion des communautés et la protection de l’environnement.
                  </p>
                  <p>
                    <strong>Nos valeurs:</strong> Notre action est guidée par le développement par l'effort propre, la volonté de ne laisser personne de côté et une approche stricte sans aucune discrimination.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Décoration d'arrière-plan */}
              <div className="absolute -inset-4 bg-gray-50 rounded-[3rem] rotate-2"></div>
              
              {/* Image Principale */}
              <img 
                src="/histoire.jpg" 
                alt="Action de l'ONG Tsinjo Aina" 
                className="relative rounded-[2.5rem] shadow-2xl w-full h-245 object-cover shadow-indigo-100/50"
              />
              
            </div>

          </div>
        </div>
      </section>
      
{/* --- 1. HERO & VISION (CIBLE DIRECTE) --- */}
      {/* Suppression de "border-b" ici pour enlever le trait de séparation */}
      <section className="py-12 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-orange-600 font-bold text-xs uppercase tracking-widest">Qui sommes-nous</h2>
            <h1 className="text-4xl md:text-5xl font-black text-indigo-950 uppercase leading-none">
              Soutenir les <br/><span className="text-emerald-600 text-3xl md:text-4xl italic">plus démunis</span>
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed border-l-4 border-emerald-500 pl-4">
            L'Action Tsinjo Aina concentre son intervention sur les personnes les plus démunies et exclues, dont la
             vulnérabilité est accentuée par leur position sociale (absence de terres et de moyens de production),
              leur âge ou leur handicap physique et mental. Cette cible, souvent ignorée par les circuits classiques 
              de développement, rencontre des obstacles majeurs pour accéder aux ressources naturelles essentielles
               à sa subsistance. Pour briser ce cycle d'isolement, l'organisation intègre ces individus dans des Groupes
                de Solidarité (GS) où s'applique la règle d'inclusion radicale du « suivre le plus faible » : le rythme 
                de progression du collectif est calé sur celui des membres les plus fragiles, garantissant que personne
                 ne soit laissé de côté. En transformant ces bénéficiaires en citoyens responsables capables de gérer 
                 leur propre « effort propre », l'ONG vise leur désendettement vis-à-vis des usuriers, leur souveraineté
                  alimentaire par l'agroécologie et leur pleine reconnaissance civique au sein des instances de décision locales."
            </p>
          </div>
          <div className="relative">
          <img src="/hero.jpg" alt="Fivorian'ny GS"  className="rounded-3xl shadow-xl w-full h-150 object-cover transition-all duration-500" />

          </div>
        </div>
      </section>

      {/* --- 2. LE GROUPE DE SOLIDARITÉ (LA MÉTHODOLOGIE) --- */}
      <section className="py-12 px-6 md:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse gap-12">
          <div className="w-full lg:w-1/2 space-y-6">
            <h3 className="text-2xl font-black text-indigo-950 uppercase flex items-center gap-3">
              <Users className="text-emerald-600" /> Démocratie Directe
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
            Au sein du Groupe de Solidarité (GS), la démocratie directe se manifeste par une organisation 
            horizontale où le groupement sert de cellule de base à l'apprentissage des vertus citoyennes,
             garantissant que chaque membre dispose du même droit de parole et d'influence sur l'avenir collectif. 
             Contrairement aux systèmes de vote majoritaire classique, la prise de décision repose sur
              un processus rigoureux de débat collectif approfondi visant systématiquement l'obtention 
              d'un consensus, assurant ainsi que les résolutions soient soutenues par l'ensemble des
               participants. Cette structure est encadrée par un bureau permanent (président, trésorier, secrétaire)
                élu de manière ouverte et transparente, dont les membres n'exercent aucune prérogative de pouvoir
                 mais assument des responsabilités de service dans l'intérêt commun. Enfin, cette démocratie 
                 se veut radicalement inclusive par l'application du principe de « suivre le plus faible », 
                 ajustant le rythme de progression et les règles du groupe qui évoluent selon sa maturité, 
                 afin de protéger et d'intégrer pleinement les membres les plus démunis ou marginalisés.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-indigo-900 text-xs uppercase mb-1">Bureau Permanent</h4>
                <p className="text-[11px] text-gray-600 uppercase font-semibold">Élu ouvertement : Président, Trésorier, Secrétaire.</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-indigo-900 text-xs uppercase mb-1">Inclusion Totale</h4>
                <p className="text-[11px] text-gray-600 uppercase font-semibold italic">« On suit le plus faible »</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
          <img  src="/Ensbl.jpg"  alt="Equipe Tsinjo Aina"  className="rounded-2xl shadow-lg w-full h-150 object-cover transition-all duration-500" />
          </div>
        </div>
      </section>



      {/* --- FOOTER CTA --- */}
      <section className="pb-16 text-center container mx-auto px-6">
        <div className="bg-indigo-950 rounded-[2.5rem] p-10 md:p-16 text-white relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-2xl md:text-3xl font-black uppercase mb-6 italic">« Effort Propre & Solidarité »</h2>
            <p className="text-indigo-200 font-bold mb-8 text-xs md:text-sm uppercase tracking-widest">
              Rejoignez-nous pour un développement humain durable.
            </p>
            <Link to="./activites" className="inline-flex items-center space-x-3 text-emerald-400 font-black uppercase text-xs tracking-widest border-b border-emerald-400 pb-1 hover:text-white hover:border-white transition-all">
              <span>Voir nos réalisations</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default APropos;