import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NewsPage from './pages/NewsPage';
import LivePage from './pages/LivePage';
import SportsPage from './pages/SportsPage';
import CulturePage from './pages/CulturePage';
import ProfileLayout from './pages/ProfileLayout';
import ProfileDashboardPage from './pages/ProfileDashboardPage';
import ProfileEditPage from './pages/ProfileEditPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import CalendarPage from './pages/CalendarPage';
import VipZonePage from './pages/VipZonePage';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <div className="min-h-screen bg-white dark:bg-lionix-dark text-gray-800 dark:text-lionix-gray">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/connexion" element={<LoginPage />} />
              <Route path="/sports" element={<SportsPage />} />
              <Route path="/culture" element={<CulturePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/live" element={<LivePage />} />
              
              <Route path="/profil" element={<ProfileLayout />}>
                <Route index element={<ProfileDashboardPage />} />
                <Route path="edit" element={<ProfileEditPage />} />
                <Route path="subscriptions" element={<SubscriptionsPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="vip" element={<VipZonePage />} />
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
