import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Sport {
  id: string;
  name: string;
  category: string;
  icon: string;
}

interface SportSelectorProps {
  value: string;
  onChange: (sport: Sport) => void;
  placeholder?: string;
}

const SportSelector: React.FC<SportSelectorProps> = ({
  value,
  onChange,
  placeholder
}) => {
  const { t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sports: Sport[] = [
    // Sports d'équipe
    { id: 'football', name: 'Football', category: 'Sports d\'équipe', icon: '⚽' },
    { id: 'basketball', name: 'Basketball', category: 'Sports d\'équipe', icon: '🏀' },
    { id: 'volleyball', name: 'Volleyball', category: 'Sports d\'équipe', icon: '🏐' },
    { id: 'handball', name: 'Handball', category: 'Sports d\'équipe', icon: '🤾' },
    { id: 'rugby', name: 'Rugby', category: 'Sports d\'équipe', icon: '🏉' },
    { id: 'hockey', name: 'Hockey', category: 'Sports d\'équipe', icon: '🏒' },
    { id: 'baseball', name: 'Baseball', category: 'Sports d\'équipe', icon: '⚾' },

    // Sports individuels
    { id: 'tennis', name: 'Tennis', category: 'Sports individuels', icon: '🎾' },
    { id: 'athletisme', name: 'Athlétisme', category: 'Sports individuels', icon: '🏃' },
    { id: 'natation', name: 'Natation', category: 'Sports individuels', icon: '🏊' },
    { id: 'cyclisme', name: 'Cyclisme', category: 'Sports individuels', icon: '🚴' },
    { id: 'golf', name: 'Golf', category: 'Sports individuels', icon: '⛳' },
    { id: 'badminton', name: 'Badminton', category: 'Sports individuels', icon: '🏸' },
    { id: 'tennis_table', name: 'Tennis de table', category: 'Sports individuels', icon: '🏓' },

    // Sports de combat
    { id: 'boxe', name: 'Boxe', category: 'Sports de combat', icon: '🥊' },
    { id: 'karate', name: 'Karaté', category: 'Sports de combat', icon: '🥋' },
    { id: 'judo', name: 'Judo', category: 'Sports de combat', icon: '🥋' },
    { id: 'taekwondo', name: 'Taekwondo', category: 'Sports de combat', icon: '🦵' },
    { id: 'mma', name: 'MMA', category: 'Sports de combat', icon: '🥊' },
    { id: 'escrime', name: 'Escrime', category: 'Sports de combat', icon: '🤺' },

    // Sports extrêmes
    { id: 'surf', name: 'Surf', category: 'Sports extrêmes', icon: '🏄' },
    { id: 'skateboard', name: 'Skateboard', category: 'Sports extrêmes', icon: '🛹' },
    { id: 'escalade', name: 'Escalade', category: 'Sports extrêmes', icon: '🧗' },
    { id: 'parachutisme', name: 'Parachutisme', category: 'Sports extrêmes', icon: '🪂' },
    { id: 'snowboard', name: 'Snowboard', category: 'Sports extrêmes', icon: '🏂' },
    { id: 'ski', name: 'Ski', category: 'Sports extrêmes', icon: '⛷️' },

    // Sports de force
    { id: 'halterophilie', name: 'Haltérophilie', category: 'Sports de force', icon: '🏋️' },
    { id: 'crossfit', name: 'CrossFit', category: 'Sports de force', icon: '💪' },
    { id: 'powerlifting', name: 'Powerlifting', category: 'Sports de force', icon: '🏋️' },

    // Sports aquatiques
    { id: 'plongee', name: 'Plongée', category: 'Sports aquatiques', icon: '🤿' },
    { id: 'water_polo', name: 'Water-polo', category: 'Sports aquatiques', icon: '🤽' },
    { id: 'voile', name: 'Voile', category: 'Sports aquatiques', icon: '⛵' },

    // Sports de précision
    { id: 'tir_arc', name: 'Tir à l\'arc', category: 'Sports de précision', icon: '🏹' },
    { id: 'billard', name: 'Billard', category: 'Sports de précision', icon: '🎱' },
    { id: 'darts', name: 'Fléchettes', category: 'Sports de précision', icon: '🎯' },

    // Sports motorisés
    { id: 'formule1', name: 'Formule 1', category: 'Sports motorisés', icon: '🏎️' },
    { id: 'motocross', name: 'Motocross', category: 'Sports motorisés', icon: '🏍️' },
    { id: 'rallye', name: 'Rallye', category: 'Sports motorisés', icon: '🚗' },

    // Autres
    { id: 'gymnastique', name: 'Gymnastique', category: 'Autres', icon: '🤸' },
    { id: 'danse_sportive', name: 'Danse sportive', category: 'Autres', icon: '💃' },
    { id: 'equitation', name: 'Équitation', category: 'Autres', icon: '🏇' },
  ];

  const filteredSports = sports.filter(sport =>
    sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sport.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedSports = filteredSports.reduce((groups, sport) => {
    const category = sport.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(sport);
    return groups;
  }, {} as Record<string, Sport[]>);

  const selectedSport = sports.find(sport => sport.id === value);

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

  const handleSelect = (sport: Sport) => {
    onChange(sport);
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
          {selectedSport ? (
            <>
              <span className="text-lg">{selectedSport.icon}</span>
              <span>{selectedSport.name}</span>
            </>
          ) : (
            <span className="text-lionix-light-gray">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={`w-5 h-5 text-lionix-light-gray transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-lionix-darkest border border-gray-600 rounded-xl shadow-lg z-50 max-h-80 overflow-hidden">
          <div className="p-3 border-b border-gray-600">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('searchSport')}
              className={`w-full bg-lionix-darker border border-gray-600 rounded-lg px-3 py-2 text-white font-noto text-sm placeholder-lionix-light-gray focus:border-lionix-gray focus:outline-none ${isRTL ? 'text-right' : ''}`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {Object.entries(groupedSports).map(([category, categorySpots]) => (
              <div key={category}>
                <div className="px-4 py-2 bg-lionix-darker/50 border-b border-gray-700">
                  <h4 className={`text-lionix-gray font-noto font-medium text-xs uppercase tracking-wide ${isRTL ? 'text-right' : ''}`}>
                    {category}
                  </h4>
                </div>
                {categorySpots.map((sport) => (
                  <button
                    key={sport.id}
                    type="button"
                    onClick={() => handleSelect(sport)}
                    className={`w-full px-4 py-3 ${isRTL ? 'text-right' : 'text-left'} hover:bg-lionix-darker transition-colors flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <span className="text-lg">{sport.icon}</span>
                    <span className="text-white font-noto text-sm flex-1">{sport.name}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SportSelector;
