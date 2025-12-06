import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const events = [
  { date: 5, title: 'Team Meeting', color: 'bg-primary' },
  { date: 12, title: 'Project Deadline', color: 'bg-destructive' },
  { date: 18, title: 'Review Session', color: 'bg-accent' },
  { date: 25, title: 'Sprint Planning', color: 'bg-success' },
];

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const getEventForDate = (day: number) => {
    return events.find(e => e.date === day);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const event = getEventForDate(day);
          const today = isToday(day);
          const selected = selectedDate === day;

          return (
            <motion.button
              key={day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDate(day)}
              className={cn(
                "aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 relative",
                today && "bg-primary text-primary-foreground",
                selected && !today && "bg-secondary ring-2 ring-primary",
                !today && !selected && "hover:bg-secondary/50"
              )}
            >
              <span className={cn(
                "text-sm font-medium",
                today ? "text-primary-foreground" : "text-foreground"
              )}>
                {day}
              </span>
              {event && (
                <div className={cn("w-1.5 h-1.5 rounded-full", event.color)} />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Events List */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Upcoming Events</h3>
        <div className="space-y-2">
          {events.map((event) => (
            <div
              key={event.date}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className={cn("w-3 h-3 rounded-full", event.color)} />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{event.title}</p>
                <p className="text-xs text-muted-foreground">
                  {monthNames[currentDate.getMonth()]} {event.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
