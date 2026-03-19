import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Loader2, MessageSquare } from 'lucide-react';
import Swal from 'sweetalert2';
import { supabase } from '../supabaseClient';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([form]);
      if (error) throw error;

      await emailjs.send(
        'service_9fthtx8', 
        'template_i3bbvmr', 
        {
          name: form.name,    
          email: form.email,  
          subject: form.subject,
          message: form.message  
        },
        '3zUqCmG2ks6xyxDnl'
      );
  
      setLoading(false);
      Swal.fire({ title: 'Success!', icon: 'success' });
      setForm({ name: '', email: '', subject: '', message: '' });
  
    } catch (err) {
      setLoading(false);
      console.error(err); // <--- Ampiasao toy izao dia tsy ho mena intsony izy
      Swal.fire({ title: 'Erreur !', icon: 'error' });
    }
  };
  return (
    <div className="bg-white min-h-screen font-sans">
            <section className="relative w-full min-h-100 md:min-h-125 flex items-center justify-center text-center overflow-hidden group">
          
          {/* --- BACKGROUND IMAGE RESPONSIVE --- */}
          <div className="absolute inset-0 z-0">
              <img 
                  src="/Contact.jpg" 
                  alt="Background" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* --- CONTENT --- */}
          <div className="container mx-auto px-6 relative z-10 py-12">
              <h1 className="text-4xl md:text-7xl font-black uppercase mb-6 tracking-tighter text-white drop-shadow-2xl">
                  Contactez-nous
              </h1>
              
              <p className="text-white max-w-2xl mx-auto text-lg md:text-xl font-bold leading-relaxed drop-shadow-lg">
                  Vous avez un projet, une question ou vous souhaitez soutenir nos actions ? 
                  Notre équipe est à votre entière disposition pour vous accompagner.
              </p>
          </div>
      </section>

      {/* --- SECTION 2: INFOS & FORMULAIRE --- */}
      <section className="container mx-auto py-24 px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          
          {/* ANKAVIA: COORDONNÉES (SORATRA MAINTY) */}
          <div className="lg:col-span-1 space-y-12">
            <div>
              <h2 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <MessageSquare size={18} />
                Nos Coordonnées
              </h2>
              <div className="space-y-10">
                <div className="flex items-start gap-6 group">
                  <div className="bg-slate-900 p-4 rounded-2xl text-white group-hover:bg-emerald-500 transition-colors duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900  text-lg tracking-widest mb-2 opacity-50">Adresse</h4>
                    <p className="text-slate-900 font-bold text-lg leading-snug">Lot 602/3306 Idanda,<br />Fianarantsoa 301, Madagascar</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-slate-900 p-4 rounded-2xl text-white group-hover:bg-indigo-600 transition-colors duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900  text-lg tracking-widest mb-2 opacity-50">Téléphone</h4>
                    <p className="text-slate-900 font-bold text-lg">+261 34 12 530 74</p>
                    <p className="text-slate-900 font-bold text-lg">+261 38 30 083 74</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-slate-900 p-4 rounded-2xl text-white group-hover:bg-sky-500 transition-colors duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900  text-lg tracking-widest mb-2 opacity-50">E-mail</h4>
                    <p className="text-slate-900 font-bold text-lg underline decoration-indigo-500/30">tsinjoainafi@yahoo.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SOCIAL MEDIA */}
            <div className="pt-8 border-t border-slate-100">
                <h4 className="font-bold text-slate-400 uppercase text-black tracking-[0.4em] mb-6">
                  Suivez notre impact
                </h4>
                <div className="flex gap-4">
                  {[
                    { Icon: Facebook, link: "https://www.facebook.com/groups/1016298758850495/" },
                    { Icon: Twitter, link: "https://twitter.com/yourprofile" }, 
                    { Icon: Instagram, link: "https://instagram.com/yourprofile" } 
                  ].map((social, i) => (
                    <a 
                      key={i} 
                      href={social.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-4 bg-slate-50 rounded-full text-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-300"
                    >
                      <social.Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
              </div>


          {/* ANKAVANANA: FORMULAIRE (CLEAN & PRO) */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">Nom Complet</label>
                    <input 
                      type="text" 
                      className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 font-medium"
                      placeholder="Nom complet"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">Adresse E-mail</label>
                    <input 
                      type="email" 
                      className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 font-medium"
                      placeholder="Adresse email"
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">Sujet</label>
                  <input 
                    type="text" 
                    className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-900 font-medium"
                    placeholder="Comment pouvons-nous vous aider ?"
                    value={form.subject}
                    onChange={(e) => setForm({...form, subject: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-900 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    rows="5" 
                    className="w-full p-5 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none text-slate-900 font-medium"
                    placeholder="Détaillez votre demande ici..."
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-slate-900/20 hover:bg-indigo-600 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:bg-slate-300"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                  Envoyer le Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 3: MAP (PRECISION IDANDA FIANARANTSOA) --- */}

        <section className="h-125 w-full bg-slate-100 relative">
          
          <iframe 
            title="ONG Location Idanda"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4480.389744985139!2d47.08137711192371!3d-21.44773352810447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21e7bf81bbb385a1%3A0x70141182c49e987f!2sONG%20TSINJO%20AINA!5e0!3m2!1sfr!2smg!4v1772344636197!5m2!1sfr!2smg"
            className="w-full h-full grayscale contrast-125 hover:grayscale-0 transition-all duration-1000 border-none"
            allowFullScreen="" 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>

      {/* --- CSS ANIMATIONS --- */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Contact;