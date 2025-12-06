import { motion } from 'framer-motion';
import { TrendingUp, Target, Clock, Award } from 'lucide-react';
import { VoiceStatus } from '@/components/VoiceStatus';
import { StatsCard } from '@/components/StatsCard';
import { AnalyticsCharts } from '@/components/AnalyticsCharts';
import { useDashboard } from '@/context/DashboardContext';

export default function Analytics() {
  const { stats, tasks } = useDashboard();

  const avgTasksPerDay = (tasks.length / 7).toFixed(1);
  const completionRate = tasks.length > 0 
    ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Track your productivity and progress
          </p>
        </div>
      </motion.div>

      {/* Voice Status */}
      <VoiceStatus />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Completion Rate"
          value={`${completionRate}%`}
          subtitle="Overall efficiency"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
          color="primary"
          index={0}
        />
        <StatsCard
          title="Avg Tasks/Day"
          value={avgTasksPerDay}
          subtitle="Last 7 days"
          icon={Target}
          color="success"
          index={1}
        />
        <StatsCard
          title="Focus Time"
          value="6.5h"
          subtitle="Today"
          icon={Clock}
          trend={{ value: 12, isPositive: true }}
          color="warning"
          index={2}
        />
        <StatsCard
          title="Current Streak"
          value={`${stats.streak} days`}
          subtitle="Personal best: 14 days"
          icon={Award}
          color="accent"
          index={3}
        />
      </div>

      {/* Charts */}
      <AnalyticsCharts />

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">AI Insights</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <h3 className="font-medium text-foreground mb-2">🎯 Productivity Peak</h3>
            <p className="text-sm text-muted-foreground">
              You're most productive between 9 AM - 12 PM. Consider scheduling important tasks during this time.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-success/10 border border-success/20">
            <h3 className="font-medium text-foreground mb-2">🔥 Streak Alert</h3>
            <p className="text-sm text-muted-foreground">
              You're on a {stats.streak}-day streak! Complete one more task today to keep it going.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
            <h3 className="font-medium text-foreground mb-2">⚡ Quick Win</h3>
            <p className="text-sm text-muted-foreground">
              You have {tasks.filter(t => t.priority === 'low' && !t.completed).length} low-priority tasks. Clearing these could boost your completion rate.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
            <h3 className="font-medium text-foreground mb-2">📈 Weekly Trend</h3>
            <p className="text-sm text-muted-foreground">
              Your productivity is up 12% compared to last week. Keep up the great work!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
