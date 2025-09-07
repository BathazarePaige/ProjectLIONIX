import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileMobileNav from '../components/ProfileMobileNav';

const ProfileLayout: React.FC = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!session) {
      navigate('/connexion');
    }
  }, [session, navigate]);

  if (!session) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-lionix-dark">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <ProfileSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <ProfileMobileNav />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
