import { motion } from 'framer-motion';
import { Check, Trash2, Clock } from 'lucide-react';
import { Task, useDashboard } from '@/context/DashboardContext';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  index: number;
}

export function TaskCard({ task, index }: TaskCardProps) {
  const { toggleTask, deleteTask } = useDashboard();

  const priorityColors = {
    high: 'border-destructive/50 bg-destructive/5',
    medium: 'border-warning/50 bg-warning/5',
    low: 'border-success/50 bg-success/5',
  };

  const priorityBadge = {
    high: 'bg-destructive/20 text-destructive border-destructive/30',
    medium: 'bg-warning/20 text-warning border-warning/30',
    low: 'bg-success/20 text-success border-success/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "glass-card p-4 border-l-4 transition-all duration-300 group",
        priorityColors[task.priority],
        task.completed && "opacity-60"
      )}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => toggleTask(task.id)}
          className={cn(
            "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 mt-0.5",
            task.completed
              ? "bg-primary border-primary text-primary-foreground"
              : "border-border hover:border-primary"
          )}
        >
          {task.completed && <Check className="w-4 h-4" />}
        </button>

        <div className="flex-1 min-w-0">
          <p className={cn(
            "font-medium text-foreground transition-all duration-200",
            task.completed && "line-through text-muted-foreground"
          )}>
            {task.title}
          </p>
          
          <div className="flex items-center gap-2 mt-2">
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full border capitalize",
              priorityBadge[task.priority]
            )}>
              {task.priority}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              {task.createdAt.toLocaleDateString()}
            </span>
          </div>
        </div>

        <button
          onClick={() => deleteTask(task.id)}
          className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
