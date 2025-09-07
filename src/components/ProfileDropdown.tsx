import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, ChevronDown, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const ProfileDropdown: React.FC = () => {
  const { logout, user } = useAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-100 dark:bg-lionix-darker p-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
      >
        <User className="w-5 h-5 text-black dark:text-white" />
        <ChevronDown className={`w-4 h-4 text-black dark:text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 w-64 bg-white dark:bg-lionix-darkest border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-50 ${isRTL ? 'left-0' : 'right-0'}`}>
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <p className={`text-sm font-medium text-gray-800 dark:text-white truncate ${isRTL ? 'text-right' : ''}`}>{t('myAccount')}</p>
            <p className={`text-xs text-gray-500 dark:text-lionix-gray truncate ${isRTL ? 'text-right' : ''}`}>{user?.email}</p>
          </div>
          <div className="py-2">
            <Link
              to="/profil"
              onClick={() => setIsOpen(false)}
              className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-lionix-darker transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <LayoutDashboard className="w-5 h-5 text-gray-600 dark:text-lionix-light-gray" />
              <span className="text-black dark:text-white font-noto text-sm flex-1">{t('myAccount')}</span>
            </Link>
          </div>
          <div className="p-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className={`w-full px-2 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-lionix-darker rounded-lg transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <LogOut className="w-5 h-5 text-red-500 dark:text-red-400" />
              <span className="text-red-500 dark:text-red-400 font-noto text-sm flex-1">{t('logout')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
