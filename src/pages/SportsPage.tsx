import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const SportsPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col min-h-screen bg-lionix-dark">
      <Header />
      <main className="flex-grow flex items-center justify-center text-white">
        <h1 className="text-4xl font-noto font-bold">{t('sports')}</h1>
      </main>
      <Footer />
    </div>
  );
};

export default SportsPage;
