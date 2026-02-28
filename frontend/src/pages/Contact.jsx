import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
  
    try {

      await axios.post('http://127.0.0.1:8000/api/contact', form); 
      
      setLoading(false); 

      Swal.fire({
        title: 'Message envoyé !',
        text: 'Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.',
        icon: 'success',
        confirmButtonColor: '#4f46e5'
      });
      
      // 3. Fafana ny formulaire
      setForm({ name: '', email: '', subject: '', message: '' });
      
    } catch (err) {
      // 4. Vonoy koa ny loading eto raha nisy erreur
      setLoading(false); 
      console.error(err);
      
      Swal.fire({
        title: 'Erreur !',
        text: 'Une erreur est survenue lors de l\'envoi.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* --- SECTION 1: HEADER --- */}
      <section className="bg-sky-400 py-10 text-center border-t">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-black uppercase mb-2 tracking-tighter text-indigo-900">
            Contactez-<span className="text-indigo-700">nous</span>
          </h1>
          <p className="text-indigo-950 max-w-2xl mx-auto text-lg font-medium leading-tight">
            Vous avez un projet, une question ou vous souhaitez soutenir nos actions ? 
            Notre équipe est à votre écoute.
          </p>
        </div>
      </section>

      {/* --- SECTION 2: INFOS & FORMULAIRE --- */}
      <section className="container mx-auto py-20 px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* ANKAVIA: COORDONNÉES */}
          <div className="lg:col-span-1 space-y-10">
            <div>
              <h2 className="text-2xl font-black text-indigo-900 uppercase mb-8 tracking-tight border-b-4 border-emerald-500 inline-block">
                Nos Coordonnées
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900 uppercase text-lg tracking-widest mb-1">Adresse</h4>
                    <p className="text-gray-700 font-medium">Lot 602/3306 Idanda Fianarantsoa 301, Madagascar</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-blue-50 p-4 rounded-2xl text-indigo-600">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900 uppercase text-lg tracking-widest mb-1">Téléphone</h4>
                    <p className="text-gray-700 font-medium">+261 34 12 530 74</p>
                    <p className="text-gray-700 font-medium">+261 38 30 083 74</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-gray-50 p-4 rounded-2xl text-gray-700">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-900 uppercase text-lg tracking-widest mb-1">E-mail</h4>
                    <p className="text-gray-700 font-medium">tsinjoainafi@yahoo.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SOCIAL MEDIA */}
            <div>
              <h4 className="font-bold text-indigo-900 uppercase text-xs tracking-widest mb-4">Suivez-nous</h4>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-emerald-500 hover:text-white transition-all">
                  <Facebook size={20} />
                </a>
                <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-emerald-500 hover:text-white transition-all">
                  <Twitter size={20} />
                </a>
                <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-emerald-500 hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* ANKAVANANA: FORMULAIRE */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-900/5 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-lg font-black text-indigo-900  tracking-widest ml-1 opacity-70">Nom Complet</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                      placeholder="Votre nom..."
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-lg font-black text-indigo-900  tracking-widest ml-1 opacity-70">Adresse E-mail</label>
                    <input 
                      type="email" 
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                      placeholder="Votre adresse email"
                      value={form.email}
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-lg font-black text-indigo-900 tracking-widest ml-1 opacity-70">Sujet</label>
                  <input 
                    type="text" 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                    placeholder="De quoi s'agit-il ?"
                    value={form.subject}
                    onChange={(e) => setForm({...form, subject: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-lg font-black text-indigo-900 uppercase tracking-widest ml-1 opacity-70">Message</label>
                  <textarea 
                    rows="5" 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all resize-none"
                    placeholder="Écrivez votre message ici..."
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-indigo-950 text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[12px] shadow-lg shadow-indigo-900/20 hover:bg-emerald-600 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:translate-y-0"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                  Envoyer le Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 3: MAP --- */}
      <section className="h-[450px] w-full bg-gray-200">
        <iframe 
          title="ONG Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14841.411656515814!2d47.085816!3d-21.459385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21e7befd64115597%3A0x6b90740a6e343467!2sFianarantsoa!5e0!3m2!1sfr!2smg!4v1708550000000!5m2!1sfr!2smg"
          className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700 border-none"
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;