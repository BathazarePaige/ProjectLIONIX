import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, UserProfile } from '../lib/supabase';

const InfoCard: React.FC<{ title: string; description: string; buttonText: string; imageUrl: string; linkTo?: string }> = ({ title, description, buttonText, imageUrl, linkTo }) => {
  const buttonClasses = "bg-lionix-darker text-white font-noto font-medium text-sm py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors";
  
  return (
    <div className="bg-lionix-darkest rounded-2xl flex justify-between items-center p-4">
      <div className="flex-1 pr-4">
        <h3 className="text-white font-noto font-bold text-lg">{title}</h3>
        <p className="text-lionix-light-gray font-noto text-sm mb-4">{description}</p>
        {linkTo ? (
          <Link to={linkTo} className={buttonClasses}>
            {buttonText}
          </Link>
        ) : (
          <button className={buttonClasses}>
            {buttonText}
          </button>
        )}
      </div>
      <div className="w-48 h-32">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-lg" />
      </div>
    </div>
  );
};

const ProfileDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        if (data) setProfile(data as UserProfile);
      } catch (err) {
        console.error('Error fetching profile for dashboard:', err);
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <div className="text-white p-4 space-y-8">
      <div>
        <h1 className="font-noto font-bold text-3xl mb-4">
          {t('helloUser', { name: profile?.username || '...' })}
        </h1>
        <InfoCard 
          title={t('activeSubscription')}
          description={t('premiumPlan')}
          buttonText={t('changePlan')}
          imageUrl="https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/5567/a815/86c404bad78c104041376292413e3c27?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=II0t63wnCn3sQ1NZvFsGUiP3iZrcp9CkD1emppSPrH1Kcg5h2eZ3ZCMSyC7TW2AtwO0DF5Mee715AJWu94H2SqEoZESxMWGeLfqitwiPywex6uoqAzCT0nS61lcK~WvQr7Kn7v6hzkBSzl4yNA1sDEeqBAZ~GFRzfAxrqLQdAuNdaCBkNQGw8bKGQQVGmND-NAw~6LdbtVVhfqOIIYSnh5wF1MnxwIF3OzAgFXKMdwEGkYG-SebQIbQCYh0fJ4NBWWG3wde9gi3YcG0XQKjbUCbgxxV3YXTzit5~pAkwhGqFVpjcX3XoiL9hTJNJazUAKKXnmrcV2Xp3qUxI9AA9nQ__"
          linkTo="/profil/subscriptions"
        />
      </div>

      <div>
        <h2 className="font-noto font-bold text-2xl mb-4">{t('explore')}</h2>
        <div className="space-y-4">
          <InfoCard 
            title={t('vipZone')}
            description={t('exclusiveContent')}
            buttonText={t('upgrade')}
            imageUrl="https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/aae4/f7f8/199faff8f440edbbdf64068166f206e5?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T1QoB-68-EZ-uFOf6w5gqaViuudFT6S8q8kR6c7md6Jz6vm5VNNke60d0Guc5oah7LrcRcCf3JxLbOlUaPl2aLbSE7XkjmYjiXfx63Nx1lceSBJSVD2hV4j5n4-Wd6Sx0WPYHhDd-GjYmT2K1M7G3x~hSOCiQ4OkoeaOcnbNvhYGNpRChJPvm77pqvGVApd29-F2xuorQlptIcaLVgg5Ebw2IMdd2vlTt5nrGD8JP3c9Uq9N9bhKOLEg1bLtQyLIO2Ori~x8dhiR9~UxEMmppeLX847qDzpwcjTgz9QyPJ8BBHLNlYLY19FpcHnny2kNcYe2LyPCzuNBEWv1aG3RYw__"
            linkTo="/profil/subscriptions"
          />
          <InfoCard 
            title={t('calendar')}
            description={t('upcomingEvents')}
            buttonText={t('viewCalendar')}
            imageUrl="https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/1edc/ddb5/551ee3bf221282d69b67a7751aff2f7a?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SniKoc-zNDvnYFH7H-2CRIDPaqgjw6X2sGeRZSOHW~6SAUsk~teesAhsnIi-h7~EJEDCxBjKyo6tbOL5X9201TI1ZQzOcYOg-D0vHYyKpahJcYDGFo4858-90gEpeBH0SolWKiaa5~LJDWqIs57r17LRyG3RYVaA9G5m8kM6Q71ltVTrH8CJqH8foW~HjSyi1PCGJFbdCw~Bs3F~dlPLZFcPojCcTU1KL9LHaUsXnIST83BuF3xL4HWKAMBgKUzuh4Wq8h-mN8Y~~Ue5uyOHUuLzNffoTT6USXE7MYQaDLRKy01wH0tCR2Ii3szPsXMpDQRs-~Ob-Fa48RsTw9~VNg__"
            linkTo="/profil/calendar"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboardPage;
