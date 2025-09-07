import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const PlanCard: React.FC<{ plan: any, t: any }> = ({ plan, t }) => (
  <div className="bg-lionix-darkest border border-gray-600 rounded-xl p-6 flex flex-col h-full">
    <div className="mb-4">
      <h3 className="text-white font-noto font-bold text-base mb-1">{plan.name}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-white font-noto font-black text-3xl tracking-tight">{plan.price}</span>
        <span className="text-white font-noto font-bold text-base">{t('perMonth')}</span>
      </div>
    </div>
    <button className="bg-lionix-darker text-white font-noto font-bold text-sm py-3 px-4 rounded-xl mb-4 hover:bg-lionix-darker/80 transition-colors">
      {t('payNow')}
    </button>
    <div className="space-y-2 flex-1">
      {plan.features.map((feature: string, index: number) => (
        <div key={index} className="flex items-start gap-3">
          <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
          <span className="text-white font-noto text-xs leading-relaxed">{feature}</span>
        </div>
      ))}
    </div>
  </div>
);

const SubscriptionsPage: React.FC = () => {
    const { t } = useLanguage();

    const plans = [
      {
        name: t('classic'),
        price: '$9.99',
        features: [t('accessAllSports'), t('liveGameStreaming'), t('exclusiveInterviews')]
      },
      {
        name: t('premium'),
        price: '$19.99',
        features: [t('allClassicFeatures'), t('adFreeViewing'), t('downloadableContent')]
      },
      {
        name: t('vip'),
        price: '$29.99',
        features: [t('allPremiumFeatures'), t('fourKStreaming'), t('earlyAccessToContent')]
      }
    ];

    return (
        <div className="max-w-4xl mx-auto text-white">
            <h1 className="text-center font-noto-display text-4xl font-bold mb-12">{t('chooseYourPlan')}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {plans.map(plan => <PlanCard key={plan.name} plan={plan} t={t} />)}
            </div>

            <div className="bg-lionix-darkest border border-gray-700/50 rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label htmlFor="cardNumber" className="block text-white font-noto font-medium text-sm mb-2">{t('cardNumber')}</label>
                        <input type="text" id="cardNumber" placeholder={t('enterCardNumber')} className="w-full bg-lionix-darker border border-gray-600 rounded-xl px-4 py-3 text-white font-noto text-sm placeholder-lionix-light-gray focus:border-lionix-gray focus:outline-none transition-colors" />
                    </div>
                    <div>
                        <label htmlFor="expiryDate" className="block text-white font-noto font-medium text-sm mb-2">{t('expiryDate')}</label>
                        <input type="text" id="expiryDate" placeholder="MM/YY" className="w-full bg-lionix-darker border border-gray-600 rounded-xl px-4 py-3 text-white font-noto text-sm placeholder-lionix-light-gray focus:border-lionix-gray focus:outline-none transition-colors" />
                    </div>
                    <div>
                        <label htmlFor="cvv" className="block text-white font-noto font-medium text-sm mb-2">{t('cvv')}</label>
                        <input type="text" id="cvv" placeholder={t('cvv')} className="w-full bg-lionix-darker border border-gray-600 rounded-xl px-4 py-3 text-white font-noto text-sm placeholder-lionix-light-gray focus:border-lionix-gray focus:outline-none transition-colors" />
                    </div>
                </div>
                <div className="mt-8">
                    <button className="w-full bg-lionix-gray text-lionix-dark font-noto font-bold text-base py-3 px-4 rounded-full hover:bg-white transition-colors">
                        {t('confirmPayment')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionsPage;
