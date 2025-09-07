import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

interface CountrySelectorProps {
  value: string;
  onChange: (country: Country) => void;
  placeholder?: string;
  type: 'phone' | 'residence';
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  value,
  onChange,
  placeholder,
  type
}) => {
  const { t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const countries: Country[] = [
    { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
    { code: 'MA', name: 'Maroc', flag: '🇲🇦', dialCode: '+212' },
    { code: 'DZ', name: 'Algérie', flag: '🇩🇿', dialCode: '+213' },
    { code: 'TN', name: 'Tunisie', flag: '🇹🇳', dialCode: '+216' },
    { code: 'EG', name: 'Égypte', flag: '🇪🇬', dialCode: '+20' },
    { code: 'SN', name: 'Sénégal', flag: '🇸🇳', dialCode: '+221' },
    { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮', dialCode: '+225' },
    { code: 'ML', name: 'Mali', flag: '🇲🇱', dialCode: '+223' },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', dialCode: '+226' },
    { code: 'NE', name: 'Niger', flag: '🇳🇪', dialCode: '+227' },
    { code: 'TD', name: 'Tchad', flag: '🇹🇩', dialCode: '+235' },
    { code: 'CM', name: 'Cameroun', flag: '🇨🇲', dialCode: '+237' },
    { code: 'GA', name: 'Gabon', flag: '🇬🇦', dialCode: '+241' },
    { code: 'CG', name: 'Congo', flag: '🇨🇬', dialCode: '+242' },
    { code: 'CD', name: 'RD Congo', flag: '🇨🇩', dialCode: '+243' },
    { code: 'US', name: 'États-Unis', flag: '🇺🇸', dialCode: '+1' },
    { code: 'GB', name: 'Royaume-Uni', flag: '🇬🇧', dialCode: '+44' },
    { code: 'DE', name: 'Allemagne', flag: '🇩🇪', dialCode: '+49' },
    { code: 'ES', name: 'Espagne', flag: '🇪🇸', dialCode: '+34' },
    { code: 'IT', name: 'Italie', flag: '🇮🇹', dialCode: '+39' },
    { code: 'BE', name: 'Belgique', flag: '🇧🇪', dialCode: '+32' },
    { code: 'CH', name: 'Suisse', flag: '🇨🇭', dialCode: '+41' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
    { code: 'BR', name: 'Brésil', flag: '🇧🇷', dialCode: '+55' },
    { code: 'SA', name: 'Arabie Saoudite', flag: '🇸🇦', dialCode: '+966' },
    { code: 'AE', name: 'Émirats Arabes Unis', flag: '🇦🇪', dialCode: '+971' },
    { code: 'QA', name: 'Qatar', flag: '🇶🇦', dialCode: '+974' },
    { code: 'KW', name: 'Koweït', flag: '🇰🇼', dialCode: '+965' },
    { code: 'LB', name: 'Liban', flag: '🇱🇧', dialCode: '+961' },
    { code: 'JO', name: 'Jordanie', flag: '🇯🇴', dialCode: '+962' },
  ];

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCountry = countries.find(country => 
    type === 'phone' ? country.dialCode === value : country.code === value
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (country: Country) => {
    onChange(country);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-lionix-darker border border-gray-600 rounded-xl px-4 py-3 ${isRTL ? 'text-right' : 'text-left'} text-white font-noto text-sm focus:border-lionix-gray focus:outline-none transition-colors flex items-center justify-between`}
      >
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {selectedCountry ? (
            <>
              <span className="text-lg">{selectedCountry.flag}</span>
              <span>
                {type === 'phone' 
                  ? `${selectedCountry.name} (${selectedCountry.dialCode})`
                  : selectedCountry.name
                }
              </span>
            </>
          ) : (
            <span className="text-lionix-light-gray">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-lionix-light-gray transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-lionix-darkest border border-gray-600 rounded-xl shadow-lg z-50 max-h-60 overflow-hidden">
          <div className="p-3 border-b border-gray-600">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('searchCountry')}
              className={`w-full bg-lionix-darker border border-gray-600 rounded-lg px-3 py-2 text-white font-noto text-sm placeholder-lionix-light-gray focus:border-lionix-gray focus:outline-none ${isRTL ? 'text-right' : ''}`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleSelect(country)}
                className={`w-full px-4 py-3 ${isRTL ? 'text-right' : 'text-left'} hover:bg-lionix-darker transition-colors flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <span className="text-lg">{country.flag}</span>
                <span className="text-white font-noto text-sm flex-1">
                  {type === 'phone' 
                    ? `${country.name} (${country.dialCode})`
                    : country.name
                  }
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
