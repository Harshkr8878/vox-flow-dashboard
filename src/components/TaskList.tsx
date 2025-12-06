import { AnimatePresence } from 'framer-motion';
import { useDashboard } from '@/context/DashboardContext';
import { TaskCard } from './TaskCard';
import { CheckCircle2 } from 'lucide-react';

export function TaskList() {
  const { tasks } = useDashboard();

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  if (tasks.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <CheckCircle2 className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No tasks yet</h3>
        <p className="text-muted-foreground text-sm">
          Say "Add task: your task here" to create one
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pendingTasks.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
            Pending ({pendingTasks.length})
          </h3>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {pendingTasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
            Completed ({completedTasks.length})
          </h3>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {completedTasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
