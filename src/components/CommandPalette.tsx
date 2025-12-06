import { motion } from 'framer-motion';
import { 
  Home, 
  CheckSquare, 
  BarChart3, 
  Calendar, 
  Moon, 
  Sun, 
  Trash2, 
  Plus,
  Volume2
} from 'lucide-react';

const commands = [
  { category: 'Navigation', items: [
    { icon: Home, text: '"Go home" or "Open home"', description: 'Navigate to dashboard' },
    { icon: CheckSquare, text: '"Open tasks" or "Show tasks"', description: 'View your tasks' },
    { icon: BarChart3, text: '"Open analytics"', description: 'View analytics' },
    { icon: Calendar, text: '"Show calendar"', description: 'View calendar' },
  ]},
  { category: 'Tasks', items: [
    { icon: Plus, text: '"Add task: [task name]"', description: 'Create a new task' },
    { icon: Trash2, text: '"Clear completed tasks"', description: 'Remove finished tasks' },
    { icon: Trash2, text: '"Clear all tasks"', description: 'Remove all tasks' },
  ]},
  { category: 'Theme', items: [
    { icon: Moon, text: '"Dark mode on"', description: 'Switch to dark theme' },
    { icon: Sun, text: '"Light mode on"', description: 'Switch to light theme' },
  ]},
];

export function CommandPalette() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Volume2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Voice Commands</h2>
          <p className="text-sm text-muted-foreground">Say these to control the dashboard</p>
        </div>
      </div>

      <div className="space-y-6">
        {commands.map((section) => (
          <div key={section.category}>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
              {section.category}
            </h3>
            <div className="space-y-2">
              {section.items.map((command) => (
                <div
                  key={command.text}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <command.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary">{command.text}</p>
                    <p className="text-xs text-muted-foreground">{command.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
