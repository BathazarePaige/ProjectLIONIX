import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const VipZonePage: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="text-white">
            <h1 className="font-noto text-3xl font-bold">{t('vipZone')}</h1>
            <p className="mt-4 text-lionix-gray">Accédez à votre contenu VIP exclusif.</p>
        </div>
    );
};

export default VipZonePage;
