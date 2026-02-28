import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const InterventionsPubliees = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/interventions')
      .then(res => {
        const rawData = Array.isArray(res.data) ? res.data : (res.data.data || []);
        const publishedData = rawData.filter(item => item.is_published == 1 || item.is_published === true);
        setData(publishedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur InterventionsPubliees:", err);
        setLoading(false);
      });
}, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#28a745]"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
  
      <section className="bg-sky-400 py-10 text-center border-t"> 
        <h1 className="text-4xl font-black text-indigo-900 uppercase mb-4 tracking-tight"> 
          Nos <span className="text-white">Actions</span> sur le terrain 
        </h1>
        <div className="w-24 h-1 bg-indigo-900 mx-auto"></div>
      </section>
  
      <section className="container mx-auto py-12 px-4 md:px-10 max-w-7xl space-y-10">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row items-start">
              {/* Sary */}
              <div className="md:w-1/2 lg:w-5/12 p-4">
                <img
                  src={item.image 
                    ? `http://localhost:8000/storage/${item.image}` 
                    : 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800'}
                  alt={item.title}
                  className="w-full h-auto object-contain"
                />
              </div>
  
              {/* Details */}
              <div className="flex-1 p-4 md:p-6">
                <div className="flex items-center space-x-4 text-gray-500 text-sm uppercase font-bold mb-2">
                  <span className="flex items-center">
                    <Calendar size={16} className="mr-1 text-green-600"/> 
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <MapPin size={16} className="mr-1 text-green-600"/> 
                    {item.location || 'Madagascar'}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-fmfp-blue mb-2 uppercase">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-inner">
            <p className="text-gray-400 italic">Aucune donnée disponible pour le moment.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default InterventionsPubliees;