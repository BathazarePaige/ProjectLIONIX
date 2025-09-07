import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const SubscriptionPlans: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const plans = [
    {
      name: t('classic'),
      price: '9,99€',
      period: t('perMonth'),
      features: [
        t('basicSportsAccess'),
        t('limitedCulturalContent'),
        t('standardVideoQuality')
      ]
    },
    {
      name: t('premium'),
      price: '19,99€',
      period: t('perMonth'),
      features: [
        t('premiumSportsAccess'),
        t('extendedCulturalContent'),
        t('hdVideoQuality'),
        t('exclusiveInterviews')
      ]
    },
    {
      name: t('vip'),
      price: '29,99€',
      period: t('perMonth'),
      features: [
        t('fullContentAccess'),
        t('fourKVideoQuality'),
        t('vipEvents'),
        t('personalizedRecommendations')
      ]
    }
  ];

  return (
    <section className="bg-lionix-dark py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 py-5 mb-3">
          <h2 className={`text-white font-noto font-bold text-xl md:text-2xl ${isRTL ? 'text-right' : ''}`}>
            {t('subscriptionPlans')}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 px-4 pb-3">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-lionix-darkest border border-gray-600 rounded-xl p-6 flex flex-col h-full">
              {/* En-tête */}
              <div className={`mb-4 ${isRTL ? 'text-right' : ''}`}>
                <h3 className="text-white font-noto font-bold text-base mb-1">{plan.name}</h3>
                <div className={`flex items-baseline gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-white font-noto font-black text-3xl tracking-tight">{plan.price}</span>
                  <span className="text-white font-noto font-bold text-base">{plan.period}</span>
                </div>
              </div>

              {/* Bouton S'abonner */}
              <button className="bg-lionix-darker text-white font-noto font-bold text-sm py-3 px-4 rounded-2xl mb-4 hover:bg-lionix-darker/80 transition-colors">
                {t('subscribe')}
              </button>

              {/* Fonctionnalités */}
              <div className="space-y-2 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-noto text-xs leading-relaxed flex-1">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
