import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { cn } from '@/lib/utils';

export function VoiceStatus() {
  const { voiceStatus, lastCommand, isListening } = useDashboard();
  const { toggleListening, isSupported } = useVoiceCommands();

  if (!isSupported) {
    return (
      <div className="glass-card p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
          <MicOff className="w-5 h-5 text-destructive" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Voice Not Supported</p>
          <p className="text-xs text-muted-foreground">Use Chrome or Edge for voice commands</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleListening}
          className={cn(
            "relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300",
            isListening 
              ? "bg-primary text-primary-foreground pulse-glow listening-ripple" 
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          <AnimatePresence mode="wait">
            {voiceStatus === 'processing' ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Loader2 className="w-6 h-6 animate-spin" />
              </motion.div>
            ) : isListening ? (
              <motion.div
                key="listening"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Mic className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <MicOff className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={cn(
              "inline-block w-2 h-2 rounded-full",
              isListening ? "bg-primary animate-pulse" : "bg-muted-foreground"
            )} />
            <span className="text-sm font-medium text-foreground">
              {isListening ? 'Listening...' : 'Click to activate voice'}
            </span>
          </div>
          
          <AnimatePresence mode="wait">
            {lastCommand && (
              <motion.p
                key={lastCommand}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-xs text-muted-foreground mt-1 truncate"
              >
                Last: "{lastCommand}"
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {isListening && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-border/50"
        >
          <p className="text-xs text-muted-foreground mb-2">Try saying:</p>
          <div className="flex flex-wrap gap-2">
            {['Add task: study', 'Open analytics', 'Dark mode on', 'Show calendar'].map((cmd) => (
              <span
                key={cmd}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {cmd}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
