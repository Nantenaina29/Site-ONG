import React, { useState} from 'react';
import { supabase } from './supabaseClient';
import { useNavigate,Link } from 'react-router-dom';
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
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      // 1. Ampiasao ny Supabase Auth fa tsy axios intsony
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
  
      // 2. Raha misy fahadisoana avy amin'ny Supabase
      if (authError) throw authError;
  
      // 3. Raha tafiditra soa aman-tsara
      if (data.session) {

        
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
      // 4. Hafatra fahadisoana amin'ny teny frantsay araka ny nangatahinao
      console.error("Erreur de connexion:", err.message);
  
      Swal.fire({
        icon: "error",
        title: "Erreur de connexion",
        text: "Adresse email ou mot de passe incorrect.", // Na err.message raha tianao ho hita ny antony
        confirmButtonColor: "#312e81"
      });
  
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    // 1. Vérification
    if (!email) {
      alert("Veuillez saisir votre adresse e-mail.");
      return;
    }

    // 2. Envoi de l'email via Supabase
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    // 3. Gestion de la réponse
    if (error) {
      alert("Erreur : " + error.message);
    } else {
      alert("Un lien de réinitialisation a été envoyé à votre e-mail.");
    }
  }; // <--- Hamarino tsara io semikolôna sy fononteny io

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 overflow-hidden p-4">
      
      {/* Ny vata lehibe (Card) */}
      <div className="flex flex-col lg:flex-row w-full max-w-md lg:max-w-4xl bg-white rounded-4xl lg:rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 h-auto lg:h-125">
        
        {/* 1. ANKAVIA (na AMBONY amin'ny Mobile): SARY */}
        <div className="w-full lg:w-1/2 relative bg-slate-50 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-50 h-56 sm:h-64 lg:h-full overflow-hidden">
          <img 
            src="/admin.png" 
            alt="Admin Illustration" 
            className="w-full h-full object-cover lg:object-cover" 
            // Raha toa ka sary miendrika logo na misy soratra ilay admin.png dia ampiasao ny object-contain amin'ny mobile
          />
          {/* Overlay kely mba hanome style */}
          <div className="absolute inset-0 bg-indigo-900/5"></div>
        </div>
  
        {/* 2. ANKAVANANA: FORMULAIRE */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
          <div className="w-full max-w-xs space-y-6">
            
            {/* Header Form */}
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
                    placeholder="Adresse email"
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
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
              <div className="flex justify-end mb-6">
                        <button 
                          type="button"
                          onClick={handleForgotPassword}
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 hover:underline"
                        >
                          Mot de passe oublié ?
                        </button>
                      </div>
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
  
      {/* CSS */}
      <style>{`
        input::-ms-reveal, input::-ms-clear, input::-webkit-password-reveal {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
export default Login;