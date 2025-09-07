import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-lionix-dark py-10 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Liens */}
        <div className={`flex flex-wrap justify-between items-center gap-6 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`flex flex-wrap gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <a href="#" className="text-lionix-light-gray font-noto text-base hover:text-white transition-colors block w-40 text-center">
              {t('about')}
            </a>
            <a href="#" className="text-lionix-light-gray font-noto text-base hover:text-white transition-colors block w-40 text-center">
              {t('contact')}
            </a>
            <a href="#" className="text-lionix-light-gray font-noto text-base hover:text-white transition-colors block w-40 text-center">
              {t('termsOfUse')}
            </a>
            <a href="#" className="text-lionix-light-gray font-noto text-base hover:text-white transition-colors block w-40 text-center">
              {t('privacyPolicy')}
            </a>
          </div>

          {/* Icônes sociales */}
          <div className="flex justify-center gap-4">
            <button className="p-2 hover:bg-lionix-darker rounded-lg transition-colors">
              <Facebook className="w-6 h-6 text-lionix-light-gray hover:text-white" />
            </button>
            <button className="p-2 hover:bg-lionix-darker rounded-lg transition-colors">
              <Twitter className="w-6 h-6 text-lionix-light-gray hover:text-white" />
            </button>
            <button className="p-2 hover:bg-lionix-darker rounded-lg transition-colors">
              <Instagram className="w-6 h-6 text-lionix-light-gray hover:text-white" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className={`text-center ${isRTL ? 'text-right' : ''}`}>
          <p className="text-lionix-light-gray font-noto text-base">
            {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
