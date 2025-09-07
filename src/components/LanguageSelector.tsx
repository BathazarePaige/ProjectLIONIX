import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { 
      code: 'fr' as Language, 
      name: t('french'), 
      flag: '🇫🇷' 
    },
    { 
      code: 'en' as Language, 
      name: t('english'), 
      flag: '🇺🇸' 
    },
    { 
      code: 'ar' as Language, 
      name: t('arabic'), 
      flag: '🇸🇦' 
    }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-100 dark:bg-lionix-darker p-2.5 rounded-2xl hover:bg-gray-200 dark:hover:bg-lionix-darker/80 transition-colors flex items-center gap-2"
        title={t('changeLanguage')}
      >
        <Globe className="w-5 h-5 text-black dark:text-white" />
        <span className="text-black dark:text-white text-sm font-noto hidden sm:block">
          {currentLang?.flag} {currentLang?.name}
        </span>
        <ChevronDown className={`w-4 h-4 text-black dark:text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-lionix-darkest border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-50">
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-lionix-darker transition-colors ${
                  currentLanguage === language.code ? 'bg-gray-100 dark:bg-lionix-darker' : ''
                }`}
              >
                <span className="text-xl">{language.flag}</span>
                <span className="text-black dark:text-white font-noto text-sm flex-1">{language.name}</span>
                {currentLanguage === language.code && (
                  <div className="w-2 h-2 bg-gray-500 dark:bg-lionix-gray rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
