import { motion } from 'framer-motion';
import { VoiceStatus } from '@/components/VoiceStatus';
import { CalendarView } from '@/components/CalendarView';

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground mt-1">
            View and manage your schedule
          </p>
        </div>
      </motion.div>

      {/* Voice Status */}
      <VoiceStatus />

      {/* Calendar */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CalendarView />
        </div>

        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Today's Schedule</h2>
          
          <div className="space-y-4">
            <div className="relative pl-6 pb-4 border-l-2 border-primary/30">
              <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-primary" />
              <p className="text-xs text-muted-foreground">9:00 AM</p>
              <p className="font-medium text-foreground">Morning Review</p>
              <p className="text-sm text-muted-foreground">Check daily tasks</p>
            </div>

            <div className="relative pl-6 pb-4 border-l-2 border-success/30">
              <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-success" />
              <p className="text-xs text-muted-foreground">11:00 AM</p>
              <p className="font-medium text-foreground">Team Standup</p>
              <p className="text-sm text-muted-foreground">15 min meeting</p>
            </div>

            <div className="relative pl-6 pb-4 border-l-2 border-warning/30">
              <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-warning" />
              <p className="text-xs text-muted-foreground">2:00 PM</p>
              <p className="font-medium text-foreground">Focus Time</p>
              <p className="text-sm text-muted-foreground">Deep work session</p>
            </div>

            <div className="relative pl-6 border-l-2 border-accent/30">
              <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-accent" />
              <p className="text-xs text-muted-foreground">5:00 PM</p>
              <p className="font-medium text-foreground">Review & Plan</p>
              <p className="text-sm text-muted-foreground">End of day review</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
