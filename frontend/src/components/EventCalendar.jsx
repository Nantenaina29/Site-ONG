import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { Calendar as CalendarIcon, Newspaper, Bell, ArrowRight } from 'lucide-react';

const EventCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error("Erreur :", err));
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const eventDate = events.find(e => 
        new Date(e.event_date).toDateString() === date.toDateString()
      );
      return eventDate ? 'has-event' : null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start">
      
      {/* --- 1. CALENDRIER (SADY FLAT NO TSY MISY CARD) --- */}
      <div className="w-full lg:w-1/2">
        <div className="flex items-center space-x-3 mb-6">
          <CalendarIcon className="text-fmfp-green" size={24} />
          <h2 className="text-xl font-black text-indigo-900 uppercase tracking-tight border-b-2 border-fmfp-green">Calendrier</h2>
        </div>
        
        <Calendar 
          onChange={setDate} 
          value={date} 
          tileClassName={tileClassName}
          className="custom-calendar"
        />
      </div>

      {/* --- 2. ACTUALITÉS & IMPACT (SOLON'ILAY ACTIVITÉS TALOHA) --- */}
      <div className="w-full lg:w-1/2 space-y-8">
        <div className="flex items-center space-x-3 mb-2">
          <Newspaper className="text-orange-500" size={24} />
          <h2 className="text-xl font-black text-indigo-900 uppercase tracking-tight border-b-2 border-orange-500">Actualités & Impact</h2>
        </div>

        <div className="space-y-6">
          {/* Vaovao 1 */}
          <div className="group border-l-4 border-fmfp-green pl-6 py-1">
            <span className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Dernière minute</span>
            <h4 className="font-bold text-green-600 uppercase text-lg leading-tight mt-1">Multiplication et conservation des semences locales</h4>
            <p className="text-sm text-gray-600 mt-2">La banque de semences communautaire assure la souveraineté alimentaire en permettant 
              aux paysans d'emprunter des variétés locales résilientes et de les rembourser en nature après la récolte. Ce système solidaire
               élimine la dépendance aux intrants industriels coûteux, garantissant ainsi une autonomie financière immédiate aux familles.
                En protégeant les stocks collectifs, l'ONG sécurise l'avenir agricole du village face aux aléas climatiques.</p>
          </div>

          {/* Vaovao 2 */}
          <div className="group border-l-4 border-indigo-900 pl-6 py-1">
            <span className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Impact Social</span>
            <h4 className="font-bold text-green-600 uppercase text-lg leading-tight mt-1">Succès de l'Épargne Collective</h4>
            <p className="text-sm text-gray-700 mt-2">L'épargne collective permet aux villageois de Fianarantsoa de s'affranchir
               des usuriers en créant leur propre fonds de solidarité géré en toute autonomie. Grâce à des crédits internes à taux 
               réduits, les familles sécurisent leurs récoltes et financent leurs besoins urgents sans s'endetter à l'extérieur.
                Cette dynamique renforce la cohésion sociale et prouve que la solidarité financière interne est le moteur le plus 
                efficace pour un développement digne et durable.</p>
          </div>

          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-900 hover:text-fmfp-green transition-all pt-2">
            Voir tous les rapports <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <style>{`
        .custom-calendar {
          width: 100% !important;
          background: transparent !important;
          border: none !important;
          font-family: inherit;
        }
        .has-event {
          background: #4ade80 !important; 
          color: white !important;
          border-radius: 4px;
        }
        .react-calendar__tile--active {
          background: #312e81 !important;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default EventCalendar;