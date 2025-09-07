import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { LayoutDashboard, User, CreditCard, CalendarDays, Star } from 'lucide-react';

const ProfileMobileNav: React.FC = () => {
  const { t } = useLanguage();

  const links = [
    { to: '/profil', text: t('myAccount'), icon: LayoutDashboard, end: true },
    { to: '/profil/edit', text: t('profile'), icon: User, end: false },
    { to: '/profil/subscriptions', text: t('subscriptions'), icon: CreditCard, end: false },
    { to: '/profil/calendar', text: t('calendar'), icon: CalendarDays, end: false },
    { to: '/profil/vip', text: t('vipZone'), icon: Star, end: false },
  ];

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-colors flex-1 ${
      isActive
        ? 'bg-lionix-darker text-white'
        : 'text-lionix-gray hover:bg-lionix-darker/50 hover:text-white'
    }`;

  return (
    <nav className="md:hidden sticky top-16 z-30 bg-lionix-dark border-b border-gray-700/50 p-1">
      <div className="flex items-center justify-around">
        {links.map(link => (
          <NavLink key={link.to + link.text} to={link.to} className={getLinkClass} end={link.end}>
            <link.icon className="w-5 h-5" />
            <span className="truncate">{link.text}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default ProfileMobileNav;
