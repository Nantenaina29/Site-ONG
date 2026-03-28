import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { Calendar as CalendarIcon, Newspaper, ArrowRight } from 'lucide-react';

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
    <div className="w-full px-6 md:px-20 py-12 bg-white">
      <div className="flex flex-col lg:flex-row gap-12 items-stretch">
        
        {/* --- 1. CALENDRIER (MIVELATRA MIDINA) --- */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex items-center space-x-3 mb-6 shrink-0">
            <CalendarIcon className="text-green-600" size={24} />
            <h2 className="text-xl font-black text-indigo-900 uppercase tracking-tight border-b-2 border-green-600">Calendrier</h2>
          </div>
          
          {/* Ity div 'flex-1' ity no manery ny calendrier hitombo haavo */}
          <div className="flex-1 flex flex-col min-h-[500px] border border-slate-100 rounded-3xl p-4 shadow-sm bg-slate-50/50"> 
            <Calendar 
              onChange={setDate} 
              value={date} 
              tileClassName={tileClassName}
              className="custom-calendar" 
            />
          </div>
        </div>

        {/* --- 2. ACTUALITÉS & IMPACT --- */}
        <div className="w-full lg:w-1/2 space-y-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Newspaper className="text-orange-500" size={24} />
              <h2 className="text-xl font-black text-indigo-900 uppercase tracking-tight border-b-2 border-orange-500">Actualités & Impact</h2>
            </div>

            <div className="space-y-8">
              {/* Vaovao 1 */}
              <div className="group border-l-4 border-green-600 pl-6 py-1">
                <span className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Dernière minute</span>
                <h4 className="font-bold text-green-600 uppercase text-lg leading-tight mt-1">Multiplication et conservation des semences locales</h4>
                <p className="text-sm text-gray-600 mt-2 text-justify">La préservation et la diffusion des semences locales au sein des communautés renforcent la souveraineté alimentaire...</p>
              </div>

              {/* Vaovao 2 */}
              <div className="group border-l-4 border-indigo-900 pl-6 py-1">
                <span className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Impact Social</span>
                <h4 className="font-bold text-green-600 uppercase text-lg leading-tight mt-1">Succès de l'Épargne Collective</h4>
                <p className="text-sm text-gray-700 mt-2 text-justify">La mise en place d’une épargne collective permet aux villageois et villageoises de se libérer de la dépendance...</p>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-900 hover:text-green-600 transition-all pt-6">
            Voir tous les rapports <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <style>{`
        /* 1. Manitatra ny calendrier ho 100% haavo */
        .custom-calendar {
          width: 100% !important;
          height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          border: none !important;
          background: transparent !important;
          font-family: inherit;
        }

        /* 2. Mampivelatra ny 'grid' misy ny daty mba hameno ny toerana */
        .custom-calendar .react-calendar__viewContainer,
        .custom-calendar .react-calendar__month-view,
        .custom-calendar .react-calendar__month-view > div,
        .custom-calendar .react-calendar__month-view > div > div {
          display: flex !important;
          flex-direction: column !important;
          flex: 1 !important;
        }

        .custom-calendar .react-calendar__month-view__days {
          display: grid !important;
          grid-template-columns: repeat(7, 1fr);
          flex: 1 !important; /* Ity no manitatra ny andro midina */
        }

        /* 3. Manamboatra ny tile (box kely tsirairay) */
        .custom-calendar .react-calendar__tile {
          display: flex !important;
          align-items: center;
          justify-content: center;
          height: auto !important; /* Avela hitombo manaraka ny grid */
          aspect-ratio: 1 / 1; /* Mitazona azy ho square raha kely ny ecran */
        }

        .has-event {
          background: #4ade80 !important; 
          color: white !important;
          font-weight: bold;
          border-radius: 12px;
        }

        .react-calendar__tile--active {
          background: #312e81 !important;
          border-radius: 12px;
        }

        .react-calendar__tile:hover {
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
};

export default EventCalendar;