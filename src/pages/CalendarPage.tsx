import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const FilterDropdown: React.FC<{ label: string }> = ({ label }) => (
  <button className="bg-lionix-darker text-white font-noto font-medium text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors">
    {label}
    <ChevronDown className="w-4 h-4" />
  </button>
);

const MonthView: React.FC<{ year: number; month: number }> = ({ year, month }) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const blanks = Array(firstDayOfMonth).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Highlight day 5 of October 2024 as per Figma
  const isHighlighted = (day: number) => {
      return year === 2024 && month === 9 && day === 5;
  };

  return (
    <div className="flex-1">
      <h2 className="text-white font-noto font-bold text-lg text-center mb-4">
        {monthNames[month]} {year}
      </h2>
      <div className="grid grid-cols-7 gap-y-2 text-center">
        {dayNames.map((day, index) => (
          <div key={index} className="text-lionix-gray font-noto font-bold text-sm w-12 h-12 flex items-center justify-center">
            {day}
          </div>
        ))}
        {blanks.map((_, i) => <div key={`blank-${i}`} className="w-12 h-12"></div>)}
        {days.map(day => (
          <div key={day} className={`w-12 h-12 flex items-center justify-center rounded-full font-noto text-sm cursor-pointer transition-colors ${isHighlighted(day) ? 'bg-lionix-gray text-lionix-dark' : 'text-white hover:bg-lionix-darker'}`}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};


const CalendarPage: React.FC = () => {
    const { t } = useLanguage();
    const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 1)); // Start with October 2024

    const handlePrevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 2, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 2, 1));
    };

    const month1 = currentDate;
    const month2 = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    return (
        <div className="max-w-6xl mx-auto text-white">
            <h1 className="font-noto font-bold text-3xl mb-8">
                {t('calendar')}
            </h1>

            <div className="flex items-center gap-4 mb-8">
                <FilterDropdown label="Event Type" />
                <FilterDropdown label="Date Range" />
            </div>

            <div className="flex items-center justify-between">
                <button onClick={handlePrevMonth} className="p-2 text-lionix-gray hover:text-white transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 flex-grow">
                    <MonthView year={month1.getFullYear()} month={month1.getMonth()} />
                    <MonthView year={month2.getFullYear()} month={month2.getMonth()} />
                </div>

                <button onClick={handleNextMonth} className="p-2 text-lionix-gray hover:text-white transition-colors">
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default CalendarPage;
