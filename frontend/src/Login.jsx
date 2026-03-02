import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, LogIn, KeyRound } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // States vaovao ho an'ny OTP
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  
  const navigate = useNavigate();

  // 1. Login mahazatra (Password)
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
  
      if (authError) throw authError;
  
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
      console.error("Erreur de connexion:", err.message);
      Swal.fire({
        icon: "error",
        title: "Erreur de connexion",
        text: "Adresse email ou mot de passe incorrect.",
        confirmButtonColor: "#312e81"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Fandefasana ny kaody (OTP)
  const handleSendCode = async () => {
    if (!email) {
      Swal.fire({
        icon: 'warning',
        title: 'Aucune Email',
        text: 'Veuillez saisir votre e-mail d’abord.',
        confirmButtonColor: '#3085d6',
      });
      return;
    }
  
    Swal.fire({
      title: 'Envoi en cours...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: false, 
      }
    });
  
    Swal.close();
  
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: error.message,
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Code envoyé !',
        text: 'Un code de vérification a été envoyé à votre Gmail.',
        confirmButtonColor: '#28a745',
      });
      setStep(2); 
    }
  };
  
  // 3. Hanamarinana ny kaody OTP
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!otp) return;

    Swal.fire({
      title: 'Vérification en cours...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    const { error } = await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: 'recovery'
    });
  
    Swal.close();
  
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Code invalide',
        text: "Le code est incorrect ou a expiré.",
        confirmButtonColor: '#d33',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Connexion réussie !',
        text: 'Bienvenue Admin.',
        timer: 1500,
        showConfirmButton: false,
      });
  
      setTimeout(() => {
        navigate('/interventions-list');
      }, 1500);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 overflow-hidden p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-md lg:max-w-4xl bg-white rounded-4xl lg:rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 h-auto lg:h-125">
        
        {/* 1. ANKAVIA: SARY */}
        <div className="w-full lg:w-1/2 relative bg-slate-50 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-50 h-56 sm:h-64 lg:h-full overflow-hidden">
          <img 
            src="/admin.png" 
            alt="Admin Illustration" 
            className="w-full h-full object-cover lg:object-cover" 
          />
          <div className="absolute inset-0 bg-indigo-900/5"></div>
        </div>
  
        {/* 2. ANKAVANANA: FORMULAIRE */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
          <div className="w-full max-w-xs space-y-6">
            
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
                {step === 1 ? "Connectez-vous pour accéder à la gestion." : "Entrez le code reçu par email."}
              </p>
            </div>
  
            {error && (
              <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-[10px] font-bold animate-shake">
                {error}
              </div>
            )}
  
            {/* STEP 1: LOGIN NORMAL */}
            {step === 1 ? (
              <form onSubmit={handleLogin} className="space-y-4">
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
  
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-1">
                      Mot de passe
                    </label>
                    
                    {/* 1. Ny Input (miaraka amin'ny icon Lock sy Eye) */}
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
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 p-1"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>

                    {/* 2. Ny bokotra Mot de passe oublié (eo ambany mitongilana miankavanana) */}
                    <div className="flex justify-end px-1">
                      <button 
                        type="button"
                        onClick={handleSendCode}
                        className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
                      >
                        Mot de passe oublié ?
                      </button>

                  </div>
                </div>
  
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100 hover:bg-indigo-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <LogIn size={18} />
                  {isLoading ? "Vérification..." : "Se connecter"}
                </button>
              </form>
            ) : (
              /* STEP 2: VERIFICATION CODE OTP */
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-indigo-950 uppercase tracking-widest ml-1 text-center block">
                    Code de vérification
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text"
                      className="w-full pl-4 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-50 text-sm outline-none transition-all text-center font-bold tracking-[0.5em]"
                      placeholder="00000000" // Natao 8 ny aotra
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={8} // Nalalahana ho 8 araka ny nasehon'ny Supabase
                      required
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-100 hover:bg-indigo-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Vérifier le code
                </button>

                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-indigo-600"
                >
                  Retour au login
                </button>
              </form>
            )}
  
          </div>
        </div>
      </div>
  
      <style>{`
        input::-ms-reveal, input::-ms-clear, input::-webkit-password-reveal {
          display: none !important;
        }
      `}</style>
    </div>
  );
}

export default Login;