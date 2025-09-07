import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import SubscriptionPlans from '../components/SubscriptionPlans';
import CulturalHeritage from '../components/CulturalHeritage';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="px-4 sm:px-6 lg:px-8 py-10">
        <HeroSection />
        <SubscriptionPlans />
        <CulturalHeritage />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
