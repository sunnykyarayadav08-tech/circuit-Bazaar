import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  Sparkles, 
  Smartphone, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Zap, 
  ArrowRight,
  MapPin,
  RefreshCw,
  Gift
} from 'lucide-react';
import { UserAccount } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  selectedCity: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  selectedCity,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  
  // Phone OTP Flow State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  
  // Email/Password State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  
  // Feedback
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setErrorMsg('');
    setIsSendingOtp(true);
    setTimeout(() => {
      setIsSendingOtp(false);
      setOtpSent(true);
      setEnteredOtp('5829'); // Auto-fill sample OTP for instant seamless UX
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredOtp || enteredOtp.trim().length < 4) {
      setErrorMsg('Please enter the 4-digit verification code');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: UserAccount = {
        id: `usr_${Date.now().toString().slice(-6)}`,
        name: fullName.trim() || `User +91-${phoneNumber.slice(0, 5)}...`,
        phone: phoneNumber,
        email: email || `user_${phoneNumber.slice(-4)}@circuitbazaar.in`,
        city: selectedCity,
        memberTier: 'Circuit Prime',
        joinedDate: 'August 2026',
        savedAddress: {
          addressLine: '42, Tech Park Enclave',
          city: selectedCity,
          state: 'India',
          pincode: '302001'
        }
      };
      onLoginSuccess(user);
      onClose();
    }, 500);
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: UserAccount = {
        id: `usr_${Date.now().toString().slice(-6)}`,
        name: fullName.trim() || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        email: email.trim(),
        phone: phoneNumber || '9876543210',
        city: selectedCity,
        memberTier: 'Circuit Prime',
        joinedDate: 'August 2026',
        savedAddress: {
          addressLine: 'Flat 101, Galaxy Apartments',
          city: selectedCity,
          state: 'India',
          pincode: '302017'
        }
      };
      onLoginSuccess(user);
      onClose();
    }, 600);
  };

  // Quick 1-Click Demo Logins
  const handleQuickDemoLogin = (preset: 'aarav' | 'pooja' | 'rohit') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      let user: UserAccount;
      if (preset === 'aarav') {
        user = {
          id: 'usr_aarav_8492',
          name: 'Aarav Sharma',
          email: 'aarav.sharma@example.com',
          phone: '9876543210',
          city: 'Jaipur',
          memberTier: 'Circuit Prime',
          joinedDate: 'January 2026',
          savedAddress: {
            addressLine: 'Plot 42, Malviya Nagar Sector 4',
            landmark: 'Near World Trade Park',
            city: 'Jaipur',
            state: 'Rajasthan',
            pincode: '302017'
          }
        };
      } else if (preset === 'pooja') {
        user = {
          id: 'usr_pooja_7193',
          name: 'Pooja Verma',
          email: 'pooja.verma@techmail.com',
          phone: '9812345678',
          city: 'Bengaluru',
          memberTier: 'Circuit Prime',
          joinedDate: 'March 2026',
          savedAddress: {
            addressLine: 'Flat 302, Green Glen Heights, Bellandur',
            landmark: 'Opposite Ecospace Tech Park',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560103'
          }
        };
      } else {
        user = {
          id: 'usr_rohit_4019',
          name: 'Rohit Khandelwal',
          email: 'rohit.k@corp.in',
          phone: '9789012345',
          city: 'Patna',
          memberTier: 'Tech Explorer',
          joinedDate: 'July 2026',
          savedAddress: {
            addressLine: 'House 18, Fraser Road',
            landmark: 'Near Dak Bungalow',
            city: 'Patna',
            state: 'Bihar',
            pincode: '800001'
          }
        };
      }
      onLoginSuccess(user);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl my-auto animate-fadeIn relative">
        
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-blue-500" />

        {/* Modal Header */}
        <div className="p-5 pb-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-500/20">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm font-['Space_Grotesk'] flex items-center gap-1.5">
                {authMode === 'signin' ? 'Sign in to CircuitBazaar' : 'Create CircuitBazaar Account'}
              </h3>
              <p className="text-[11px] text-slate-400">
                Unlock 0% EMI pre-approval & 1-Year Doorstep Warranty
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 transition-colors"
            id="auth-modal-close-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Auth Mode Toggle Tabs (Sign In / Sign Up) */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-950/80 mx-5 mt-4 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => { setAuthMode('signin'); setErrorMsg(''); }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              authMode === 'signin'
                ? 'bg-slate-800 text-cyan-300 shadow font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            id="tab-mode-signin"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
              authMode === 'signup'
                ? 'bg-slate-800 text-cyan-300 shadow font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            id="tab-mode-signup"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>New Customer? Register</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 space-y-4">
          
          {/* Method Selector (Phone OTP vs Email) */}
          <div className="flex items-center justify-center space-x-3 text-xs">
            <button
              onClick={() => { setLoginMethod('phone'); setErrorMsg(''); }}
              className={`px-3 py-1.5 rounded-lg border transition-all flex items-center space-x-1.5 ${
                loginMethod === 'phone'
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 font-bold'
                  : 'border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Mobile OTP Login</span>
            </button>
            <button
              onClick={() => { setLoginMethod('email'); setErrorMsg(''); }}
              className={`px-3 py-1.5 rounded-lg border transition-all flex items-center space-x-1.5 ${
                loginMethod === 'email'
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 font-bold'
                  : 'border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              <span>Email & Password</span>
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl text-xs text-rose-200">
              {errorMsg}
            </div>
          )}

          {/* 1. PHONE NUMBER OTP FORM */}
          {loginMethod === 'phone' && (
            <div className="space-y-3">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-3">
                  {authMode === 'signup' && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-300">Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Aarav Sharma"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                          required={authMode === 'signup'}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-300">10-Digit Mobile Number</label>
                    <div className="flex items-center space-x-2">
                      <div className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-300 font-mono font-bold flex items-center">
                        <span className="mr-1">🇮🇳</span> +91
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="9876543210"
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 tracking-wider"
                        required
                        id="auth-phone-input"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSendingOtp}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center space-x-1.5"
                    id="auth-send-otp-btn"
                  >
                    {isSendingOtp ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Get 4-Digit OTP</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3 animate-fadeIn">
                  <div className="bg-cyan-500/10 border border-cyan-500/30 p-3 rounded-xl flex items-center justify-between text-xs text-cyan-200">
                    <div>
                      <span className="font-semibold">OTP sent to: </span>
                      <span className="font-mono font-bold text-white">+91-{phoneNumber}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[10px] text-cyan-400 underline font-bold"
                    >
                      Change
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-semibold text-slate-300">Enter Verification OTP</label>
                      <span className="text-[10px] text-emerald-400 font-mono">Demo OTP: 5829</span>
                    </div>
                    <input
                      type="text"
                      maxLength={4}
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value)}
                      placeholder="5 8 2 9"
                      className="w-full bg-slate-950 border border-cyan-500/60 rounded-xl py-2.5 text-center text-base tracking-widest font-mono font-bold text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      required
                      id="auth-otp-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center space-x-1.5"
                    id="auth-verify-otp-btn"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verify & Sign In</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* 2. EMAIL & PASSWORD FORM */}
          {loginMethod === 'email' && (
            <form onSubmit={handleEmailAuth} className="space-y-3">
              {authMode === 'signup' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Vikram Singh"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                    required
                    id="auth-email-input"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-slate-300">Password</label>
                  {authMode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset link sent to registered email with 256-bit encryption.')}
                      className="text-[10px] text-cyan-400 hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                    required
                    id="auth-password-input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center space-x-1.5"
                id="auth-email-submit-btn"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-3.5 h-3.5" />
                    <span>{authMode === 'signin' ? 'Sign In with Email' : 'Create Account'}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Demo 1-Click Accounts */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
              <span className="flex items-center">
                <Sparkles className="w-3 h-3 text-amber-400 mr-1" />
                1-Click Instant Demo Login:
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('aarav')}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-left transition-all group"
                id="demo-user-aarav"
              >
                <div className="text-[11px] font-bold text-slate-200 group-hover:text-cyan-300 truncate">
                  Aarav S.
                </div>
                <div className="text-[9px] text-slate-400 flex items-center">
                  <MapPin className="w-2.5 h-2.5 mr-0.5 text-cyan-400" /> Jaipur
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('pooja')}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 rounded-xl text-left transition-all group"
                id="demo-user-pooja"
              >
                <div className="text-[11px] font-bold text-slate-200 group-hover:text-indigo-300 truncate">
                  Pooja V.
                </div>
                <div className="text-[9px] text-slate-400 flex items-center">
                  <MapPin className="w-2.5 h-2.5 mr-0.5 text-indigo-400" /> Bengaluru
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('rohit')}
                className="p-2 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 rounded-xl text-left transition-all group"
                id="demo-user-rohit"
              >
                <div className="text-[11px] font-bold text-slate-200 group-hover:text-emerald-300 truncate">
                  Rohit K.
                </div>
                <div className="text-[9px] text-slate-400 flex items-center">
                  <MapPin className="w-2.5 h-2.5 mr-0.5 text-emerald-400" /> Patna
                </div>
              </button>
            </div>
          </div>

          {/* Member Benefits Footer */}
          <div className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-2xl flex items-center space-x-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              Member Perks: <strong className="text-slate-200">1-Year Doorstep Warranty</strong> & <strong className="text-slate-200">0% Downpayment EMI</strong> on 18,000+ pincodes.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
