import { motion } from 'framer-motion';
import { CheckCircle2, Flame, Target, TrendingUp } from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';
import { VoiceStatus } from '@/components/VoiceStatus';
import { StatsCard } from '@/components/StatsCard';
import { TaskList } from '@/components/TaskList';
import { CommandPalette } from '@/components/CommandPalette';

export default function Index() {
  const { tasks, stats } = useDashboard();
  
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const completedToday = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, <span className="gradient-text">User</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Control everything with your voice. Just speak.
          </p>
        </div>
      </motion.div>

      {/* Voice Status */}
      <VoiceStatus />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Pending Tasks"
          value={pendingTasks}
          subtitle="Tasks to complete"
          icon={Target}
          color="primary"
          index={0}
        />
        <StatsCard
          title="Completed Today"
          value={completedToday}
          subtitle="Great progress!"
          icon={CheckCircle2}
          trend={{ value: 12, isPositive: true }}
          color="success"
          index={1}
        />
        <StatsCard
          title="Current Streak"
          value={`${stats.streak} days`}
          subtitle="Keep it up!"
          icon={Flame}
          color="warning"
          index={2}
        />
        <StatsCard
          title="Total Completed"
          value={stats.totalCompleted}
          subtitle="All time"
          icon={TrendingUp}
          trend={{ value: 8, isPositive: true }}
          color="accent"
          index={3}
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Tasks</h2>
          <TaskList />
        </motion.div>

        {/* Command Palette */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Commands</h2>
          <CommandPalette />
        </motion.div>
      </div>
    </div>
  );
}
