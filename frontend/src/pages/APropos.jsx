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
                <div className="text-lg text-gray-700 leading-relaxed font-medium space-y-4 text-justify">
                  <p>
                  Le Projet Fianarantsoa a vu le jour en 1998, dans la partie sud de la région, à Ambalavao, sous la forme d’une initiative individuelle. Rapidement, il s’est étendu vers le nord en 2001 puis en 2003, amorçant une dynamique de croissance continue. En 2009, pour soutenir et structurer cette démarche, l’Association Tsinjo Aina Betsileo a été fondée. Quelques années plus tard, en décembre 2016, elle a évolué pour devenir l’ONG TSINJO AINA Fianarantsoa.
                  </p>
                  <p>
                  Aujourd’hui, l’organisation accompagne directement près de 25000 bénéficiaires, dont 11800 femmes, et touche indirectement plus de 58400 personnes supplémentaires. Sa mission est d’améliorer les conditions de vie et de renforcer l’autonomie des communautés locales, en particulier des femmes, à travers des projets sociaux, économiques et environnementaux.
                  </p>
                  <p>
                  L’approche adoptée repose sur la mobilisation des efforts communautaires: encourager les groupes à concevoir et gérer leurs propres initiatives de développement durable. L’ONG œuvre également à raviver la solidarité communautaire, une valeur profondément enracinée dans l’histoire Malagasy mais qui s’est progressivement effritée. Elle met l’accent sur le renforcement des capacités, l’acquisition de compétences et la sensibilisation, afin de promouvoir un développement à la fois durable et souverain.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black text-indigo-950 uppercase border-l-4 border-emerald-500 pl-4">
                Nos Fondements
                </h3>
                <div className="text-lg text-gray-700 leading-relaxed font-medium space-y-6 text-justify">
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
            <div className="text-gray-700 text-lg leading-relaxed border-l-4 border-emerald-500 pl-4 text-justify">
            <p>L’action de Tsinjo Aina s’oriente prioritairement vers les personnes les plus vulnérables et marginalisées: celles privées de terres et de moyens de production, les personnes âgées, ainsi que celles vivant avec un handicap physique ou mental. Ces groupes, souvent laissés de côté par les circuits classiques du développement, rencontrent de profondes difficultés pour accéder aux ressources naturelles indispensables à leur survie.</p>
            <p>Pour rompre ce cercle d’exclusion, l’organisation les intègre dans des Groupes de Solidarité (GS), fondés sur une règle d’inclusion radicale: « suivre le plus faible ». Concrètement, la progression collective s’adapte au rythme des membres les plus fragiles, garantissant que personne ne soit abandonné en chemin.</p>
            <p>À travers cette démarche, Tsinjo Aina transforme ces bénéficiaires en citoyens responsables, capables de gérer leur propre effort et de construire leur autonomie. Les objectifs sont clairs: sortir du cycle de l’endettement auprès des usuriers, atteindre la souveraineté alimentaire grâce à l’agroécologie, et obtenir une pleine reconnaissance civique au sein des instances locales de décision.</p>

            </div>
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
            <div className="text-lg text-gray-700 leading-relaxed text-justify">
           <p> Au sein des Groupes de Solidarité (GS), la démocratie directe s’exprime à travers une organisation horizontale. Chaque groupement devient une cellule d’apprentissage citoyen, où tous les membres disposent d’un droit égal de parole et d’influence sur les décisions collectives. Contrairement aux systèmes classiques fondés sur le vote majoritaire, les résolutions émergent d’un processus exigeant de débat approfondi, visant toujours l’obtention d’un consensus. Ainsi, chaque décision est portée par l’ensemble des participants.</p>
           <p>Cette structure est coordonnée par un bureau permanent – président, trésorier et secrétaire – élu de manière ouverte et transparente. Ces responsables n’exercent aucun pouvoir hiérarchique: leur rôle est exclusivement de service, au bénéfice du collectif.</p>
           <p>Enfin, cette démocratie se veut résolument inclusive grâce au principe du « suivre le plus faible ». Le rythme de progression et les règles du groupe s’ajustent en fonction de sa maturité, afin de protéger et d’intégrer pleinement les membres les plus démunis ou marginalisés.</p>
            </div>
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
            <Link to="/activites" className="inline-flex items-center space-x-3 text-emerald-400 font-black uppercase text-xs tracking-widest border-b border-emerald-400 pb-1 hover:text-white hover:border-white transition-all">
              <span>Voir nos activités</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default APropos;