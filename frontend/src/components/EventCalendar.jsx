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
    <div className="flex flex-col lg:flex-row gap-12 items-stretch">
      
      {/* --- 1. CALENDRIER (SADY FLAT NO TSY MISY CARD) --- */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="flex items-center space-x-3 mb-6 shrink-0">
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
            <h4 className="font-bold text-green-600 uppercase text-lg leading-tight mt-1 text-justify">Multiplication et conservation des semences locales</h4>
            <p className="text-sm text-gray-600 mt-2 text-justify">La préservation et la diffusion des semences locales au sein des communautés renforcent la souveraineté alimentaire en donnant aux paysans et paysannes la possibilité de conserver et de partager des variétés adaptées et résistantes. Ce système coopératif réduit la dépendance aux intrants agricoles onéreux, permettant aux familles de diminuer immédiatement leurs coûts de production. En protégeant les réserves collectives, le projet contribue à sécuriser l’avenir agricole des paysans et paysannes face aux incertitudes climatiques. </p>
          </div>

          {/* Vaovao 2 */}
          <div className="group border-l-4 border-indigo-900 pl-6 py-1">
            <span className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Impact Social</span>
            <h4 className="font-bold text-green-600 uppercase text-lg leading-tight mt-1 text-justify">Succès de l'Épargne Collective</h4>
            <p className="text-sm text-gray-700 mt-2 text-justify">La mise en place d’une épargne collective permet aux villageois et villageoises de se libérer de la dépendance aux usuriers en constituant un fonds solidaire géré de manière autonome. Grâce à des crédits internes à faible taux, les familles peuvent sécuriser leurs récoltes et répondre à leurs besoins urgents sans recourir à l’endettement extérieur. Cette dynamique renforce la cohésion sociale et démontre que la solidarité financière locale constitue un levier puissant pour un développement durable et respectueux de la dignité des communautés.</p>
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