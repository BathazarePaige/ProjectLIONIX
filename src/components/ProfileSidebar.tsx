import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { User, CreditCard, CalendarDays, Star, HelpCircle, LogOut, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase, UserProfile } from '../lib/supabase';

const ProfileSidebar: React.FC = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, created_at')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        if (data) setProfile(data as UserProfile);
      } catch (err) {
        console.error('Error fetching profile for sidebar:', err);
      }
    };

    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
      isActive
        ? 'bg-lionix-darker text-white'
        : 'text-white hover:bg-lionix-darker/50'
    }`;

  return (
    <aside className="hidden md:flex w-80 bg-lionix-dark p-4 flex-col justify-between border-r border-gray-700/50 sticky top-16 z-40 h-[calc(100vh-4rem)] overflow-y-auto">
      <div>
        <div className="flex items-center gap-3 p-3 mb-4">
          <img
            src={`https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/40c3/222c/fb5177742f5f6111996946c59e8b4776?Expires=1757894400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RP735khhUhWqPDPZXwgKrb6LDkExOeswOo1p~U0GdpRufSoS7-F62mSGzeS8IJj2G0giru0XaEcQhMS6OD1L6qxA~-ZoQfxLqwm9i79f0gIUUKhN7KdVNhdrzvA86SU9Esvnn0eh0r8PSGttTZMsOw-mMaIlkm9bzABQ-Kl-UDg2nx6tlUjVtNIGv-UTXe0H9ZMDf80kJc6bqb40TyR-NMyHP82q3UTiVJnG1DHbCYw7~eEUncJscy3zkdIux6BEGUOXDa4xUZ88-84zVoiyrpu4dAQVHX5y6g8VJIFo51Y7ToVpWrTdC9cqY5k-L6cyKmofY0GZ945QfkPUinp6tQ__`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-white font-noto font-medium text-base">{profile?.username || '...'}</p>
            <p className="text-lionix-light-gray font-noto text-sm">
              {profile ? t('memberSince', { year: new Date(profile.created_at).getFullYear() }) : '...'}
            </p>
          </div>
        </div>

        <nav className="space-y-2 px-3">
          <NavLink to="/profil" className={getLinkClass} end>
            <LayoutDashboard className="w-5 h-5" />
            <span>{t('myAccount')}</span>
          </NavLink>
          <NavLink to="/profil/edit" className={getLinkClass}>
            <User className="w-5 h-5" />
            <span>{t('profile')}</span>
          </NavLink>
          <NavLink to="/profil/subscriptions" className={getLinkClass}>
            <CreditCard className="w-5 h-5" />
            <span>{t('subscriptions')}</span>
          </NavLink>
          <NavLink to="/profil/calendar" className={getLinkClass}>
            <CalendarDays className="w-5 h-5" />
            <span>{t('calendar')}</span>
          </NavLink>
          <NavLink to="/profil/vip" className={getLinkClass}>
            <Star className="w-5 h-5" />
            <span>{t('vipZone')}</span>
          </NavLink>
        </nav>
      </div>

      <div className="px-3 space-y-2">
         <Link to="/profil/subscriptions" className="w-full h-12 flex justify-center items-center bg-lionix-gray text-lionix-dark font-noto font-bold text-sm py-2 px-4 rounded-xl hover:bg-white transition-colors">
            {t('upgrade')}
        </Link>
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium text-white hover:bg-lionix-darker/50 transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span>{t('help')}</span>
        </button>
        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
