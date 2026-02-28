import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, LogIn  } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fanadiovana ny formulaire isaky ny miditra ny pejy
  useEffect(() => {
    setEmail('');
    setPassword('');
    setError('');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });
  
      if (response.data.access_token) {
  
        localStorage.setItem('token', response.data.access_token);
  
        Swal.fire({
          icon: "success",
          title: "Connexion réussie",
          text: "Bienvenue dans l’espace administrateur",
          timer: 1500,
          showConfirmButton: false
        });
  
        setEmail('');
        setPassword('');
  
        setTimeout(() => {
          navigate('/interventions-list');
        }, 1500);
      }
  
    } catch (err) {
      console.error("Erreur de connexion:", err.response?.data || err.message);
    
      Swal.fire({
        icon: "error",
        title: "Erreur de connexion",
        text: "Adresse email ou mot de passe incorrecte.",
        confirmButtonColor: "#312e81"
      });
    
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* h-screen sy overflow-hidden: Miantoka fa tsy misy scroll mihitsy ny pejy manontolo */
    <div className="h-screen w-full flex items-center justify-center bg-gray-20 overflow-hidden p-4">
      
      {/* Ny vata lehibe (Card): Nofefena ho 500px ny haavony mba ho "compact" */}
      <div className="flex w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 h-125">
        
        {/* 1. ANKAVIA: SARY (h-full mba hameno ny vata) */}
        <div className="hidden lg:flex w-1/2 relative bg-slate-50 items-center justify-center border-r border-gray-50">
          <img 
            src="/admin.png" 
            alt="Admin Illustration" 
            className="w-full h-full object-cover" 
          />
          {/* Overlay kely mba hanome style */}
          <div className="absolute inset-0 bg-indigo-900/5"></div>
        </div>
  
        {/* 2. ANKAVANANA: FORMULAIRE */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-xs space-y-6">
            
            {/* Header Form: Natao compact kokoa */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-600 rounded-xl shadow-lg shadow-indigo-100">
                  <ShieldCheck className="text-white" size={20} />
                </div>
                <h2 className="text-xl font-black text-indigo-950 uppercase tracking-tight">
                  Espace <span className="text-green-600">Administrateur</span>
                </h2>
              </div>
              <p className="text-gray-500 text-xs font-medium ml-1">
                Connectez-vous pour accéder à la gestion.
              </p>
            </div>
  
            {/* Message d'erreur */}
            {error && (
              <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-[10px] font-bold animate-shake">
                {error}
              </div>
            )}
  
            <form onSubmit={handleLogin} className="space-y-4">
              {/* EMAIL */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-1">
                  Adresse Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email"
                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-50 text-sm outline-none transition-all"
                    placeholder="admin@tsinjoaina.mg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
  
              {/* PASSWORD */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-11 pr-11 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-50 text-sm outline-none transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 p-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
  
              {/* BUTTON */}
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100 hover:bg-indigo-800 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <LogIn size={18} />
                {isLoading ? "Vérification..." : "Connexion"}
              </button>
            </form>
  
          </div>
        </div>
      </div>
  
      {/* CSS mba hanesorana ny icon browser default */}
      <style>{`
        input::-ms-reveal, input::-ms-clear, input::-webkit-password-reveal {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
export default Login;