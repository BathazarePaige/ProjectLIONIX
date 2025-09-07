import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Phone, Globe, Trophy, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import CountrySelector from '../components/CountrySelector';
import SportSelector from '../components/SportSelector';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

interface Sport {
  id: string;
  name: string;
  category: string;
  icon: string;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  phoneNumber: string;
  phoneCountryCode: string;
  countryOfResidence: string;
  sportDiscipline: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
  phoneNumber?: string;
  countryOfResidence?: string;
  sportDiscipline?: string;
  otp?: string;
  general?: string;
}

const LoginPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [awaitingOtp, setAwaitingOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [otp, setOtp] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    phoneNumber: '',
    phoneCountryCode: '+33',
    countryOfResidence: 'FR',
    sportDiscipline: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
    if (message) setMessage(null);
  };

  const handlePhoneCountryChange = (country: Country) => {
    setFormData({ ...formData, phoneCountryCode: country.dialCode });
  };

  const handleCountryChange = (country: Country) => {
    setFormData({ ...formData, countryOfResidence: country.code });
  };

  const handleSportChange = (sport: Sport) => {
    setFormData({ ...formData, sportDiscipline: sport.id });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email) newErrors.email = t('emailRequired');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('invalidEmail');
    if (!formData.password) newErrors.password = t('passwordRequired');
    else if (formData.password.length < 6) newErrors.password = t('passwordTooShort');

    if (!isLogin) {
      if (!formData.confirmPassword) newErrors.confirmPassword = t('confirmPasswordRequired');
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t('passwordsDoNotMatch');
      if (!formData.username) newErrors.username = t('usernameRequired');
      else if (formData.username.length < 3) newErrors.username = t('usernameTooShort');
      if (!formData.phoneNumber) newErrors.phoneNumber = t('phoneRequired');
      if (!formData.sportDiscipline) newErrors.sportDiscipline = t('sportRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: formData.email, password: formData.password });
      if (error) setMessage({ type: 'error', text: t('loginError') });
      else {
        setMessage({ type: 'success', text: t('loginSuccess') });
        setTimeout(() => navigate('/profil'), 1500);
      }
    } catch (error) {
      setMessage({ type: 'error', text: t('unexpectedError') });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
            phone_number: formData.phoneNumber,
            phone_country_code: formData.phoneCountryCode,
            country_of_residence: formData.countryOfResidence,
            sport_discipline: formData.sportDiscipline,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        setMessage({ type: 'error', text: error.message.includes('already registered') ? t('emailAlreadyExists') : t('signupError') });
      } else {
        setMessage({ type: 'success', text: t('signupSuccess') });
        setAwaitingOtp(true);
        setResendCooldown(120);
      }
    } catch (error) {
      setMessage({ type: 'error', text: t('unexpectedError') });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setErrors({ ...errors, otp: t('otpRequired') });
      return;
    }
    setIsLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: otp,
        type: 'signup',
      });

      if (error) {
        setMessage({ type: 'error', text: t('otpInvalid') });
      } else {
        setMessage({ type: 'success', text: t('otpSuccess') });
        setTimeout(() => navigate('/profil'), 1500);
      }
    } catch (error) {
      setMessage({ type: 'error', text: t('unexpectedError') });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setIsLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: formData.email,
      });
      if (error) {
        setMessage({ type: 'error', text: t('resendOtpError') });
      } else {
        setMessage({ type: 'success', text: t('resendOtpSuccess') });
        setResendCooldown(120);
      }
    } catch (error) {
      setMessage({ type: 'error', text: t('unexpectedError') });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (awaitingOtp) {
      await handleVerifyOtp();
    } else {
      if (!validateForm()) return;
      if (isLogin) await handleLogin();
      else await handleSignUp();
    }
  };

  const renderLoginForm = () => (
    <>
      <div className={`text-center mb-8 ${isRTL ? 'text-right' : ''}`}>
        <h2 className="text-white font-noto font-bold text-2xl mb-2">{t('login')}</h2>
        <p className="text-lionix-light-gray font-noto text-sm">{t('accessYourAccount')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className={`block text-white font-noto font-medium text-sm mb-2 ${isRTL ? 'text-right' : ''}`}>{t('emailAddress')} *</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder={t('enterYourEmail')} className={`w-full bg-lionix-darker border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 text-white font-noto text-sm placeholder-lionix-light-gray focus:border-lionix-gray focus:outline-none transition-colors ${isRTL ? 'text-right' : ''}`} required dir={isRTL ? 'rtl' : 'ltr'} />
          {errors.email && <p className={`text-red-400 text-xs mt-1 font-noto ${isRTL ? 'text-right' : ''}`}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className={`block text-white font-noto font-medium text-sm mb-2 ${isRTL ? 'text-right' : ''}`}>{t('password')} *</label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleInputChange} placeholder={t('enterYourPassword')} className={`w-full bg-lionix-darker border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 ${isRTL ? 'pl-12 pr-4 text-right' : 'pr-12'} text-white font-noto text-sm placeholder-lionix-light-gray focus:border-lionix-gray focus:outline-none transition-colors`} required dir={isRTL ? 'rtl' : 'ltr'} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-lionix-light-gray hover:text-white transition-colors`}>{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
          </div>
          {errors.password && <p className={`text-red-400 text-xs mt-1 font-noto ${isRTL ? 'text-right' : ''}`}>{errors.password}</p>}
        </div>
        <button type="submit" disabled={isLoading} className="w-full bg-lionix-gray text-lionix-dark font-noto font-bold text-sm py-3 px-4 rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {isLoading && <div className="w-4 h-4 border-2 border-lionix-dark border-t-transparent rounded-full animate-spin"></div>}
          {t('login')}
        </button>
      </form>
    </>
  );

  const renderSignupForm = () => (
    <>
      <div className={`text-center mb-8 ${isRTL ? 'text-right' : ''}`}>
        <h2 className="text-white font-noto font-bold text-2xl mb-2">{t('signupAthlete')}</h2>
        <p className="text-lionix-light-gray font-noto text-sm">{t('createAthleteAccount')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className={`block text-white font-noto font-medium text-sm mb-2 ${isRTL ? 'text-right' : ''}`}><Mail className={`w-4 h-4 inline ${isRTL ? 'ml-2' : 'mr-2'}`} />{t('emailAddress')} *</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder={t('enterYourEmail')} className={`w-full bg-lionix-darker border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 text-white font-noto text-sm placeholder-lionix-light-gray focus:border-lionix-gray focus:outline-none transition-colors ${isRTL ? 'text-right' : ''}`} required dir={isRTL ? 'rtl' : 'ltr'} />
          {errors.email && <p className={`text-red-400 text-xs mt-1 font-noto ${isRTL ? 'text-right' : ''}`}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="username" className={`block text-white font-noto font-medium text-sm mb-2 ${isRTL ? 'text-right' : ''}`}><User className={`w-4 h-4 inline ${isRTL ? 'ml-2' : 'mr-2'}`} />{t('username')} *</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} placeholder={t('enterUsername')} className={`w-full bg-lionix-darker border ${errors.username ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 text-white font-noto text-sm placeholder-lionix-light-gray focus:border-lionix-gray focus:outline-none transition-colors ${isRTL ? 'text-right' : ''}`} required dir={isRTL ? 'rtl' : 'ltr'} />
          {errors.username && <p className={`text-red-400 text-xs mt-1 font-noto ${isRTL ? 'text-right' : ''}`}>{errors.username}</p>}
        </div>
        <div>
          <label className={`block text-white font-noto font-medium text-sm mb-2 ${isRTL ? 'text-right' : ''}`}><Phone className={`w-4 h-4 inline ${isRTL ? 'ml-2' : 'mr-2'}`} />{t('phoneNumber')} *</label>
          <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-48"><CountrySelector type="phone" value={formData.phoneCountryCode} onChange={handlePhoneCountryChange} placeholder={t('selectCountry')} /></div>
            <div className="flex-1"><input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder={t('enterPhoneNumber')} className={`w-full bg-lionix-darker border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 text-white font-noto text-sm placeholder-lionix-light-gray focus:border-lionix-gray focus:outline-none transition-colors ${isRTL ? 'text-right' : ''}`} required dir={isRTL ? 'rtl' : 'ltr'} /></div>
          </div>
          {errors.phoneNumber && <p className={`text-red-400 text-xs mt-1 font-noto ${isRTL ? 'text-right' : ''}`}>{errors.phoneNumber}</p>}
        </div>
        <div>
          <label className={`block text-white font-noto font-medium text-sm mb-2 ${isRTL ? 'text-right' : ''}`}><Globe className={`w-4 h-4 inline ${isRTL ? 'ml-2' : 'mr-2'}`} />{t('countryOfResidence')} *</label>
          <CountrySelector type="residence" value={formData.countryOfResidence} onChange={handleCountryChange} placeholder={t('selectCountry')} />
          {errors.countryOfResidence && <p className={`text-red-400 text-xs mt-1 font-noto ${isRTL ? 'text-right' : ''}`}>{errors.countryOfResidence}</p>}
        </div>
        <div>
          <label className={`block text-white font-noto font-medium text-sm mb-2 ${isRTL ? 'text-right' : ''}`}><Trophy className={`w-4 h-4 inline ${isRTL ? 'ml-2' : 'mr-2'}`} />{t('sportDiscipline')} *</label>
          <SportSelector value={formData.sportDiscipline} onChange={handleSportChange} placeholder={t('selectSport')} />
          {errors.sportDiscipline && <p className={`text-red-400 text-xs mt-1 font-noto ${isRTL ? 'text-right' : ''}`}>{errors.sportDiscipline}</p>}
        </div>
        <div>
          <label htmlFor="password" className={`block text-white font-noto font-medium text-sm mb-2 ${isRTL ? 'text-right' : ''}`}>{t('password')} *</label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleInputChange} placeholder={t('enterYourPassword')} className={`w-full bg-lionix-darker border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 ${isRTL ? 'pl-12 pr-4 text-right' : 'pr-12'} text-white font-noto text-sm placeholder-lionix-light-gray focus:border-lionix-gray focus:outline-none transition-colors`} required dir={isRTL ? 'rtl' : 'ltr'} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-lionix-light-gray hover:text-white transition-colors`}>{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
          </div>
          {errors.password && <p className={`text-red-400 text-xs mt-1 font-noto ${isRTL ? 'text-right' : ''}`}>{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className={`block text-white font-noto font-medium text-sm mb-2 ${isRTL ? 'text-right' : ''}`}>{t('confirmPassword')} *</label>
          <div className="relative">
            <input type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder={t('confirmYourPassword')} className={`w-full bg-lionix-darker border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 ${isRTL ? 'pl-12 pr-4 text-right' : 'pr-12'} text-white font-noto text-sm placeholder-lionix-light-gray focus:border-lionix-gray focus:outline-none transition-colors`} required dir={isRTL ? 'rtl' : 'ltr'} />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 text-lionix-light-gray hover:text-white transition-colors`}>{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
          </div>
          {errors.confirmPassword && <p className={`text-red-400 text-xs mt-1 font-noto ${isRTL ? 'text-right' : ''}`}>{errors.confirmPassword}</p>}
        </div>
        <button type="submit" disabled={isLoading} className="w-full bg-lionix-gray text-lionix-dark font-noto font-bold text-sm py-3 px-4 rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {isLoading && <div className="w-4 h-4 border-2 border-lionix-dark border-t-transparent rounded-full animate-spin"></div>}
          {t('createAccount')}
        </button>
      </form>
    </>
  );

  const renderOtpForm = () => (
    <>
      <div className={`text-center mb-8 ${isRTL ? 'text-right' : ''}`}>
        <h2 className="text-white font-noto font-bold text-2xl mb-2">{t('otpTitle')}</h2>
        <p className="text-lionix-light-gray font-noto text-sm">{t('otpMessage')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="otp" className={`block text-white font-noto font-medium text-sm mb-2 ${isRTL ? 'text-right' : ''}`}>{t('otpInputLabel')} *</label>
          <input type="text" id="otp" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder={t('otpPlaceholder')} className={`w-full bg-lionix-darker border ${errors.otp ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3 text-white font-noto text-sm placeholder-lionix-light-gray focus:border-lionix-gray focus:outline-none transition-colors text-center tracking-[0.5em]`} required maxLength={6} />
          {errors.otp && <p className={`text-red-400 text-xs mt-1 font-noto ${isRTL ? 'text-right' : ''}`}>{errors.otp}</p>}
        </div>
        <button type="submit" disabled={isLoading} className="w-full bg-lionix-gray text-lionix-dark font-noto font-bold text-sm py-3 px-4 rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {isLoading && <div className="w-4 h-4 border-2 border-lionix-dark border-t-transparent rounded-full animate-spin"></div>}
          {t('otpSubmitButton')}
        </button>
        <div className="text-center">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendCooldown > 0 || isLoading}
            className="text-lionix-gray hover:text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendCooldown > 0 ? t('resendOtpCooldown', { seconds: resendCooldown }) : t('resendOtp')}
          </button>
        </div>
      </form>
    </>
  );

  return (
    <>
      <Header />
      <main className="text-white">
        <div className="text-center py-16">
          <h1 className="font-noto text-6xl font-bold">
            {isLogin ? t('login') : t('signup')}
          </h1>
        </div>
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-start p-8 sm:p-12 lg:p-16">
            <div className="w-full max-w-xl mx-auto">
              <div className="bg-lionix-darkest border border-gray-700/50 rounded-2xl p-8">
                {message && (
                  <div className={`mb-6 p-4 rounded-xl border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                    <p className={`font-noto text-sm ${isRTL ? 'text-right' : ''}`}>{message.text}</p>
                  </div>
                )}
                
                {awaitingOtp ? renderOtpForm() : (isLogin ? renderLoginForm() : renderSignupForm())}

                {!awaitingOtp && (
                  <div className={`text-center mt-6 ${isRTL ? 'text-right' : ''}`}>
                    <p className="text-lionix-light-gray font-noto text-sm">
                      {isLogin ? t('noAccountYet') : t('alreadyHaveAccount')}
                      <button onClick={() => { setIsLogin(!isLogin); setMessage(null); setErrors({}); }} className="text-lionix-gray hover:text-white font-medium ml-1 transition-colors">{isLogin ? t('signup') : t('login')}</button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <img
              src="https://user-images.githubusercontent.com/138806948/235334994-6663b51e-a128-4b10-a745-0d65545f1b13.jpg"
              alt="Athlètes en action"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-lionix-dark"></div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
