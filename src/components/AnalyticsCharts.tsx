import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const weeklyData = [
  { name: 'Mon', tasks: 5, completed: 4 },
  { name: 'Tue', tasks: 8, completed: 7 },
  { name: 'Wed', tasks: 6, completed: 5 },
  { name: 'Thu', tasks: 10, completed: 8 },
  { name: 'Fri', tasks: 7, completed: 6 },
  { name: 'Sat', tasks: 3, completed: 3 },
  { name: 'Sun', tasks: 4, completed: 2 },
];

const productivityData = [
  { name: 'Week 1', productivity: 65 },
  { name: 'Week 2', productivity: 72 },
  { name: 'Week 3', productivity: 68 },
  { name: 'Week 4', productivity: 85 },
];

const categoryData = [
  { name: 'Work', value: 45, color: 'hsl(187, 94%, 43%)' },
  { name: 'Personal', value: 25, color: 'hsl(263, 70%, 50%)' },
  { name: 'Learning', value: 20, color: 'hsl(142, 71%, 45%)' },
  { name: 'Health', value: 10, color: 'hsl(38, 92%, 50%)' },
];

export function AnalyticsCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Weekly Tasks Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Tasks</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))',
                }}
              />
              <Bar dataKey="tasks" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Productivity Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Productivity Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))',
                }}
              />
              <Line
                type="monotone"
                dataKey="productivity"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Category Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 lg:col-span-2"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Task Categories</h3>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="h-64 w-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {category.name} ({category.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
