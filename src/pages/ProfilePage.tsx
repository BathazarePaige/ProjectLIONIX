import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Globe, Trophy, Edit, AlertCircle, Save, X, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';
import { UserProfile } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CountrySelector from '../components/CountrySelector';
import SportSelector from '../components/SportSelector';

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

const ProfilePage: React.FC = () => {
  const { user, session } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});
  
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      navigate('/connexion');
      return;
    }

    const fetchProfile = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw new Error(error.message);
        if (data) {
          setProfile(data);
          setEditedProfile(data);
        }
      } catch (err: any) {
        setError(t('errorLoadingProfile'));
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session, user, navigate, t]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setEditedProfile(profile || {});
      setSuccessMessage(null);
      setError(null);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (country: Country) => {
    setEditedProfile(prev => ({ ...prev, country_of_residence: country.code }));
  };

  const handlePhoneCountryChange = (country: Country) => {
    setEditedProfile(prev => ({ ...prev, phone_country_code: country.dialCode }));
  };

  const handleSportChange = (sport: Sport) => {
    setEditedProfile(prev => ({ ...prev, sport_discipline: sport.id }));
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    const { id, created_at, updated_at, ...updateData } = editedProfile;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;

      setProfile(data);
      setEditedProfile(data);
      setIsEditing(false);
      setSuccessMessage(t('profileUpdatedSuccess'));
      setTimeout(() => setSuccessMessage(null), 3000);

    } catch (err: any) {
      setError(t('profileUpdatedError'));
      console.error('Error updating profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const renderInfoRow = (Icon: React.ElementType, label: string, value: string | undefined) => (
    <div className={`flex items-start gap-4 py-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <Icon className="w-5 h-5 text-lionix-gray mt-1" />
      <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
        <p className="text-sm text-lionix-light-gray font-noto">{label}</p>
        <p className="text-base text-white font-noto font-medium">{value || 'N/A'}</p>
      </div>
    </div>
  );

  const renderEditRow = (Icon: React.ElementType, label: string, name: keyof UserProfile, value: string | undefined, children?: React.ReactNode) => (
    <div className={`flex items-start gap-4 py-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <Icon className="w-5 h-5 text-lionix-gray mt-4" />
      <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
        <label htmlFor={name} className="text-sm text-lionix-light-gray font-noto">{label}</label>
        {children || (
          <input
            type="text"
            id={name}
            name={name}
            value={value || ''}
            onChange={handleInputChange}
            className={`w-full mt-1 bg-lionix-darker border border-gray-600 rounded-xl px-4 py-3 text-white font-noto text-sm placeholder-lionix-light-gray focus:border-lionix-gray focus:outline-none transition-colors ${isRTL ? 'text-right' : ''}`}
          />
        )}
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <main className="flex-grow bg-lionix-dark py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`flex justify-between items-center mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h1 className="text-white font-noto font-bold text-3xl md:text-4xl">{t('myProfile')}</h1>
            {!isEditing && (
              <button onClick={handleEditToggle} className="flex items-center gap-2 bg-lionix-darker text-white font-noto font-medium text-sm py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                <Edit className="w-4 h-4" />
                {t('editProfile')}
              </button>
            )}
          </div>
          
          {(error || successMessage) && (
            <div className={`mb-6 p-4 rounded-xl border ${successMessage ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
              <div className="flex items-center gap-2">
                {successMessage ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <p className={`font-noto text-sm ${isRTL ? 'text-right' : ''}`}>{successMessage || error}</p>
              </div>
            </div>
          )}

          <div className="bg-lionix-darkest border border-gray-700/50 rounded-2xl p-8">
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="w-8 h-8 border-4 border-lionix-gray border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : !profile ? (
              <div className="flex flex-col items-center justify-center h-48 text-red-400">
                <AlertCircle className="w-12 h-12 mb-4" />
                <p className="font-noto text-lg">{t('errorLoadingProfile')}</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-700/50">
                {isEditing ? (
                  <>
                    {renderEditRow(User, t('username'), 'username', editedProfile.username)}
                    {renderInfoRow(Mail, t('emailAddress'), user?.email)}
                    {renderEditRow(Phone, t('phoneNumber'), 'phone_number', editedProfile.phone_number, 
                      <div className={`flex gap-2 mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-48"><CountrySelector type="phone" value={editedProfile.phone_country_code || ''} onChange={handlePhoneCountryChange} /></div>
                        <div className="flex-1"><input type="tel" name="phone_number" value={editedProfile.phone_number || ''} onChange={handleInputChange} className={`w-full bg-lionix-darker border border-gray-600 rounded-xl px-4 py-3 text-white font-noto text-sm placeholder-lionix-light-gray focus:border-lionix-gray focus:outline-none transition-colors ${isRTL ? 'text-right' : ''}`} /></div>
                      </div>
                    )}
                    {renderEditRow(Globe, t('countryOfResidence'), 'country_of_residence', editedProfile.country_of_residence,
                      <div className="mt-1"><CountrySelector type="residence" value={editedProfile.country_of_residence || ''} onChange={handleCountryChange} /></div>
                    )}
                    {renderEditRow(Trophy, t('sportDiscipline'), 'sport_discipline', editedProfile.sport_discipline,
                      <div className="mt-1"><SportSelector value={editedProfile.sport_discipline || ''} onChange={handleSportChange} /></div>
                    )}
                  </>
                ) : (
                  <>
                    {renderInfoRow(User, t('username'), profile.username)}
                    {renderInfoRow(Mail, t('emailAddress'), user?.email)}
                    {renderInfoRow(Phone, t('phoneNumber'), `${profile.phone_country_code} ${profile.phone_number}`)}
                    {renderInfoRow(Globe, t('countryOfResidence'), profile.country_of_residence)}
                    {renderInfoRow(Trophy, t('sportDiscipline'), profile.sport_discipline)}
                  </>
                )}
              </div>
            )}
            
            {isEditing && (
              <div className={`flex gap-4 mt-8 ${isRTL ? 'flex-row-reverse' : 'justify-end'}`}>
                <button onClick={handleEditToggle} className="flex items-center gap-2 bg-lionix-darker text-white font-noto font-medium text-sm py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                  <X className="w-4 h-4" />
                  {t('cancel')}
                </button>
                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 bg-lionix-gray text-lionix-dark font-noto font-bold text-sm py-2 px-4 rounded-lg hover:bg-white transition-colors disabled:opacity-50">
                  {isSaving ? <div className="w-4 h-4 border-2 border-lionix-dark border-t-transparent rounded-full animate-spin"></div> : <Save className="w-4 h-4" />}
                  {t('save')}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
