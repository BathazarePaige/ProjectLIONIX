import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const CulturalHeritage: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="bg-lionix-dark py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 py-5 mb-10">
          <h2 className={`text-white font-noto font-bold text-xl md:text-2xl ${isRTL ? 'text-right' : ''}`}>
            {t('culturalHeritage')}
          </h2>
        </div>

        <div className="px-4 space-y-10">
          {/* Texte d'en-tête */}
          <div className={`max-w-4xl ${isRTL ? 'text-right mr-auto' : ''}`}>
            <h3 className="text-white font-noto font-black text-3xl md:text-4xl mb-4 tracking-tight">
              {t('discoverYourOrigins')}
            </h3>
            <p className="text-white font-noto text-base leading-relaxed max-w-4xl">
              {t('exploreAfricanCulture')}
            </p>
          </div>

          {/* Contenu avec image */}
          <div className={`flex flex-col lg:flex-row gap-3 items-start ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            {/* Image */}
            <div className="w-full lg:w-1/2 mb-3 lg:mb-0">
              <div 
                className="w-full h-[522px] bg-cover bg-center rounded-xl"
                style={{
                  backgroundImage: `url('https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/5d78/7b6a/a8c59f0eca331d79e80f35598e9752d5?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=V2Tw0~IG4JoZroGb2s5kOWJBGZFT2thDrrLDovxkBX0iI5rRlBUDCbnehvo~9~3Xv9HHIzxuZtlxTNPL4DQfMRGkkfs7nCZ5MWecv3jBXWNGhCfDkyoSo0anovT1Wn0-ciikajtqDs5kJNHvYzfnlNwpxBIhTOORSfma1IZTsYmq5JIYkFioyFiCGR0BN-D~7Wig65n2YYCFG0WUiKkjTTApjfVumGjF6i2vu3qXaKEWhAmbPViUp0acSq5bTx2HGHydIL4BymJ-xRWDTxlH6Jro-rQZc1BupeMP7v8KvGdyr6uenfPnTPkWwnqlKJJocqznILWQy1LAhlUD~RHa5Q__')`
                }}
              ></div>
            </div>

            {/* Contenu textuel */}
            <div className={`w-full lg:w-1/2 ${isRTL ? 'lg:pr-3 text-right' : 'lg:pl-3'}`}>
              <h4 className="text-white font-noto font-medium text-base mb-3">{t('africanOrigins')}</h4>
              <p className="text-lionix-light-gray font-noto text-sm leading-relaxed">
                {t('africanCultureDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CulturalHeritage;
