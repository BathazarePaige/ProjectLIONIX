import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const FilterDropdown: React.FC<{ label: string }> = ({ label }) => (
  <button className="bg-lionix-darker text-white font-noto font-medium text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors">
    {label}
    <ChevronDown className="w-4 h-4" />
  </button>
);

interface MonthViewProps {
  year: number;
  month: number;
  today: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ year, month, today, selectedDate, onDateSelect }) => {
  const { currentLanguage } = useLanguage();
  const monthName = new Date(year, month).toLocaleDateString(currentLanguage, { month: 'long' });
  
  const dayNames = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(currentLanguage, { weekday: 'narrow' });
    // Get day names based on a week starting on Sunday
    return [...Array(7).keys()].map(day => formatter.format(new Date(Date.UTC(2021, 5, 6 + day))));
  }, [currentLanguage]);

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const blanks = Array(firstDayOfMonth).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const isToday = (day: number) => {
    return year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return year === selectedDate.getFullYear() && month === selectedDate.getMonth() && day === selectedDate.getDate();
  };

  return (
    <div className="flex-1">
      <h2 className="text-white font-noto font-bold text-lg text-center mb-4 capitalize">
        {monthName} {year}
      </h2>
      <div className="grid grid-cols-7 gap-y-2 text-center">
        {dayNames.map((day, index) => (
          <div key={index} className="text-lionix-gray font-noto font-bold text-sm w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            {day}
          </div>
        ))}
        {blanks.map((_, i) => <div key={`blank-${i}`} className="w-10 h-10 md:w-12 md:h-12"></div>)}
        {days.map(day => {
          const dayDate = new Date(year, month, day);
          const isPast = dayDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          
          let dayClasses = "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full font-noto text-sm transition-colors ";
          if (isPast) {
            dayClasses += "text-gray-600 cursor-not-allowed";
          } else {
            dayClasses += "cursor-pointer ";
            if (isSelected(day)) {
              dayClasses += "bg-lionix-gray text-lionix-dark font-bold";
            } else if (isToday(day)) {
              dayClasses += "text-white ring-2 ring-lionix-gray";
            } else {
              dayClasses += "text-white hover:bg-lionix-darker";
            }
          }
          
          return (
            <div key={day} className={dayClasses} onClick={() => !isPast && onDateSelect(dayDate)}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CalendarPage: React.FC = () => {
    const { t, currentLanguage } = useLanguage();
    const [today] = useState(new Date());
    const [displayDate, setDisplayDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handlePrevMonth = () => {
        setDisplayDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setDisplayDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };
    
    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const formatGoogleCalendarDate = (date: Date): string => {
        return date.toISOString().replace(/-|:|\.\d{3}/g, '');
    };

    const handleAddToGoogleCalendar = () => {
        if (selectedDate) {
            const eventStart = new Date(selectedDate);
            eventStart.setHours(10, 0, 0, 0); // Default to 10:00 AM

            const eventEnd = new Date(eventStart);
            eventEnd.setHours(eventStart.getHours() + 1); // 1-hour duration

            const startDateString = formatGoogleCalendarDate(eventStart);
            const endDateString = formatGoogleCalendarDate(eventEnd);

            const title = t('scheduleAppointment');
            const details = t('appointmentForDate', { date: selectedDate.toLocaleDateString(currentLanguage) });

            const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDateString}/${endDateString}&details=${encodeURIComponent(details)}`;
            
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    const month1 = displayDate;
    const month2 = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1);

    return (
        <div className="max-w-7xl mx-auto text-white p-4">
            <h1 className="font-noto font-bold text-3xl mb-8">
                {t('calendar')}
            </h1>

            <div className="bg-lionix-darkest border border-gray-700/50 rounded-2xl p-4 sm:p-6 lg:p-8">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <FilterDropdown label={t('eventType')} />
                    <FilterDropdown label={t('dateRange')} />
                </div>

                <div className="flex items-center justify-between">
                    <button onClick={handlePrevMonth} className="p-2 text-lionix-gray hover:text-white transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 flex-grow">
                        <MonthView 
                            year={month1.getFullYear()} 
                            month={month1.getMonth()} 
                            today={today}
                            selectedDate={selectedDate}
                            onDateSelect={handleDateSelect}
                        />
                        <div className="hidden md:block">
                            <MonthView 
                                year={month2.getFullYear()} 
                                month={month2.getMonth()} 
                                today={today}
                                selectedDate={selectedDate}
                                onDateSelect={handleDateSelect}
                            />
                        </div>
                    </div>

                    <button onClick={handleNextMonth} className="p-2 text-lionix-gray hover:text-white transition-colors">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="mt-8 bg-lionix-darkest border border-gray-700/50 rounded-2xl p-6 text-center">
                {selectedDate ? (
                    <>
                        <h3 className="font-noto font-semibold text-lg text-white mb-2">
                            {t('scheduleAppointment')}
                        </h3>
                        <p className="text-lionix-gray mb-4">
                            {t('appointmentForDate', { date: selectedDate.toLocaleDateString(currentLanguage, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) })}
                        </p>
                        <button 
                            onClick={handleAddToGoogleCalendar}
                            className="inline-flex items-center gap-2 bg-lionix-gray text-lionix-dark font-noto font-bold text-sm py-2.5 px-5 rounded-full hover:bg-white transition-colors"
                        >
                            <CalendarIcon className="w-4 h-4" />
                            {t('addToGoogleCalendar')}
                        </button>
                    </>
                ) : (
                    <p className="text-lionix-light-gray font-noto">{t('selectDatePrompt')}</p>
                )}
            </div>
        </div>
    );
};

export default CalendarPage;
