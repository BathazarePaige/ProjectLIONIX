import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative h-[480px] bg-gradient-to-r from-black/10 to-black/40 overflow-hidden">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/2f5e/4cc1/13ffecd0e10d686423df5954eed06067?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gqCQCWPdRS838KAHzTTggfObRKPZjIPSyac1U2dCYEfRG~XF0hTzI5E8bqJe1PioVOX-vse4LYw6eHvKb~cuOY9pX8me761orsOtivmzgh0gJ9K04VR~4DB8qC0qLr5oQbp9W6fOVeZEsVtoxB6a~hEymBe6PsDGrUIqZu8efqt8nBUHkoCYHzoJw3Udl-8rtielqd0-9PXCwbpIjU3ak1vzQnM85feixWIc7mD7HhCVVysjooEn-Ajs1eLxisWdrl54yB8dXHXWQ710GzEgZUuOtCyTzVVJJG23VFynXMlq-OvTYAEC9niJ3g~U7azoMGNjq9YDbYkNmPG8TNYAjA__')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/40"></div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className={`text-center max-w-2xl ${isRTL ? 'text-right' : ''}`}>
          <h1 className="text-white font-noto font-black text-4xl md:text-5xl leading-tight mb-2 tracking-tight">
            {t('welcomeToLionix')}
          </h1>
          <p className="text-white font-noto text-base md:text-lg mb-8 leading-relaxed max-w-lg mx-auto">
            {t('exploreContent')}
          </p>
          <button className="bg-lionix-gray text-lionix-dark font-noto font-bold text-base px-5 py-3 rounded-3xl hover:bg-white transition-colors">
            {t('discoverSubscriptions')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
