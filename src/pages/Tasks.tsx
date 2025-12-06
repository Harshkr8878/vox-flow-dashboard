import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';
import { TaskList } from '@/components/TaskList';
import { VoiceStatus } from '@/components/VoiceStatus';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'pending' | 'completed';

export default function Tasks() {
  const { tasks, addTask } = useDashboard();
  const [filter, setFilter] = useState<FilterType>('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
  };

  const stats = {
    all: tasks.length,
    pending: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-1">
            Manage your tasks with voice or keyboard
          </p>
        </div>
      </motion.div>

      {/* Voice Status */}
      <VoiceStatus />

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-warning" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {tasks.filter(t => t.priority === 'high' && !t.completed).length}
            </p>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </div>
        </motion.div>
      </div>

      {/* Add Task Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onSubmit={handleAddTask}
        className="glass-card p-4"
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder='Add a new task... or say "Add task: your task"'
            className="flex-1 bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>
      </motion.form>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-2"
      >
        {(['all', 'pending', 'completed'] as FilterType[]).map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 capitalize",
              filter === filterType
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            {filterType} ({stats[filterType]})
          </button>
        ))}
      </motion.div>

      {/* Task List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <TaskList />
      </motion.div>
    </div>
  );
}
