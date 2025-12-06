import { motion } from 'framer-motion';
import { Moon, Sun, Volume2, Bell, Shield, Palette } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';
import { VoiceStatus } from '@/components/VoiceStatus';
import { cn } from '@/lib/utils';

export default function Settings() {
  const { theme, toggleTheme } = useDashboard();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Customize your dashboard experience
          </p>
        </div>
      </motion.div>

      {/* Voice Status */}
      <VoiceStatus />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <Palette className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
              <p className="text-sm text-muted-foreground">Customize the look</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5 text-primary" />
                ) : (
                  <Sun className="w-5 h-5 text-warning" />
                )}
                <div>
                  <p className="font-medium text-foreground">Theme</p>
                  <p className="text-sm text-muted-foreground">
                    Say "Dark mode on" or "Light mode on"
                  </p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={cn(
                  "relative w-14 h-8 rounded-full transition-colors duration-200",
                  theme === 'dark' ? "bg-primary" : "bg-secondary"
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 left-1 w-6 h-6 rounded-full bg-foreground transition-transform duration-200",
                    theme === 'dark' && "translate-x-6"
                  )}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Voice Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Voice</h2>
              <p className="text-sm text-muted-foreground">Voice command settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Voice Feedback</p>
                <p className="text-sm text-muted-foreground">Speak confirmations</p>
              </div>
              <button className="w-14 h-8 rounded-full bg-primary relative">
                <span className="absolute top-1 right-1 w-6 h-6 rounded-full bg-foreground" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Continuous Listening</p>
                <p className="text-sm text-muted-foreground">Always listen for commands</p>
              </div>
              <button className="w-14 h-8 rounded-full bg-secondary relative">
                <span className="absolute top-1 left-1 w-6 h-6 rounded-full bg-foreground" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
              <p className="text-sm text-muted-foreground">Manage alerts</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Task Reminders</p>
                <p className="text-sm text-muted-foreground">Get notified about tasks</p>
              </div>
              <button className="w-14 h-8 rounded-full bg-primary relative">
                <span className="absolute top-1 right-1 w-6 h-6 rounded-full bg-foreground" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
              <div>
                <p className="font-medium text-foreground">Sound Effects</p>
                <p className="text-sm text-muted-foreground">Play sounds on actions</p>
              </div>
              <button className="w-14 h-8 rounded-full bg-secondary relative">
                <span className="absolute top-1 left-1 w-6 h-6 rounded-full bg-foreground" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-success" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Privacy</h2>
              <p className="text-sm text-muted-foreground">Data & security</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-secondary/30">
              <p className="font-medium text-foreground mb-2">Voice Data</p>
              <p className="text-sm text-muted-foreground mb-3">
                Your voice commands are processed locally and never stored.
              </p>
              <span className="inline-flex items-center gap-1 text-xs text-success bg-success/10 px-2 py-1 rounded-full">
                <Shield className="w-3 h-3" />
                Secure
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
