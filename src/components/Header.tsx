import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import ProfileDropdown from './ProfileDropdown';

const Header: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { session } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-noto font-medium text-sm transition-colors pb-2 ${
      isActive
        ? 'text-black dark:text-white border-b-2 border-black dark:border-white'
        : 'text-gray-500 dark:text-lionix-gray hover:text-black dark:hover:text-white border-b-2 border-transparent'
    }`;
  
  const getMobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-noto font-medium text-lg transition-colors py-3 ${
      isActive
        ? 'text-black dark:text-white'
        : 'text-gray-500 dark:text-lionix-gray hover:text-black dark:hover:text-white'
    }`;

  const MobileMenu = () => (
    <div className="fixed inset-0 bg-white dark:bg-lionix-dark z-[100] flex flex-col p-4">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4">
          <div className="w-4 h-4 bg-black dark:bg-white"></div>
          <h1 className="text-black dark:text-white font-noto font-bold text-lg">LIONIX</h1>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
          <X className="w-6 h-6 text-black dark:text-white" />
        </button>
      </div>

      <nav className={`flex flex-col items-center gap-4 text-center flex-grow ${isRTL ? 'flex-row-reverse' : ''}`}>
        <NavLink to="/" className={getMobileLinkClass} end onClick={() => setIsMobileMenuOpen(false)}>
          {t('home')}
        </NavLink>
        <NavLink to="/sports" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
          {t('sports')}
        </NavLink>
        <NavLink to="/culture" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
          {t('culture')}
        </NavLink>
        <NavLink to="/news" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
          {t('news')}
        </NavLink>
        <NavLink to="/live" className={getMobileLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
          {t('live')}
        </NavLink>
      </nav>

      <div className="flex flex-col items-center gap-4">
        <LanguageSelector />
        <button 
          onClick={toggleTheme}
          className="bg-gray-100 dark:bg-lionix-darker p-2.5 rounded-full w-full max-w-xs flex justify-center"
          title={t('darkMode')}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-white" />
          ) : (
            <Moon className="w-5 h-5 text-black" />
          )}
        </button>
        {session ? (
            <div className="w-full max-w-xs">
                <Link to="/profil" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center bg-gray-100 dark:bg-lionix-darker text-black dark:text-white font-noto font-medium text-sm px-5 py-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors block">
                    {t('myProfile')}
                </Link>
            </div>
        ) : (
            <Link 
                to="/connexion"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full max-w-xs text-center bg-gray-100 dark:bg-lionix-darker text-black dark:text-white font-noto font-medium text-sm px-5 py-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
                {t('login')}
            </Link>
        )}
      </div>
    </div>
  );

  return (
    <>
      <header className="bg-white dark:bg-lionix-dark border-b border-gray-200 dark:border-gray-700/50 px-4 md:px-10 h-16 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
          {/* Logo et Navigation */}
          <div className={`flex items-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Link to="/" className="flex items-center gap-4">
              <div className="w-4 h-4 bg-black dark:bg-white"></div>
              <h1 className="text-black dark:text-white font-noto font-bold text-lg">LIONIX</h1>
            </Link>
            
            <nav className={`hidden md:flex items-center gap-9 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <NavLink to="/" className={getLinkClass} end>
                {t('home')}
              </NavLink>
              <NavLink to="/sports" className={getLinkClass}>
                {t('sports')}
              </NavLink>
              <NavLink to="/culture" className={getLinkClass}>
                {t('culture')}
              </NavLink>
              <NavLink to="/news" className={getLinkClass}>
                {t('news')}
              </NavLink>
              <NavLink to="/live" className={getLinkClass}>
                {t('live')}
              </NavLink>
            </nav>
          </div>

          {/* Actions */}
          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-2">
              {session && <ProfileDropdown />}
              <LanguageSelector />
              <button 
                onClick={toggleTheme}
                className="bg-gray-100 dark:bg-lionix-darker p-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title={t('darkMode')}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-white" />
                ) : (
                  <Moon className="w-5 h-5 text-black" />
                )}
              </button>
            </div>

            {!session && (
              <div className="hidden md:block">
                <div className="flex items-center">
                    <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>
                    <Link 
                        to="/connexion"
                        className="bg-gray-100 dark:bg-lionix-darker text-black dark:text-white font-noto font-medium text-sm px-5 py-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        {t('login')}
                    </Link>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden bg-gray-100 dark:bg-lionix-darker p-2.5 rounded-full">
              <Menu className="w-5 h-5 text-black dark:text-white" />
            </button>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && <MobileMenu />}
    </>
  );
};

export default Header;
