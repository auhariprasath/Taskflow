import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ListTodo, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Calendar
} from 'lucide-react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import api from '../services/api'
import { format } from 'date-fns'

const COLORS = ['#6366F1', '#F59E0B', '#10B981']

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [statsRes, tasksRes] = await Promise.all([
        api.get('/tasks/stats'),
        api.get('/tasks/all')
      ])
      setStats(statsRes.data)
      setTasks(tasksRes.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const pieData = stats ? [
    { name: 'To Do', value: stats.todo },
    { name: 'In Progress', value: stats.inProgress },
    { name: 'Done', value: stats.done }
  ] : []

  const priorityData = [
    { name: 'High Priority', value: stats?.high || 0, color: '#EF4444' }
  ]

  if (loading) {
    return <DashboardSkeleton />
  }

  const completionRate = stats?.total > 0 
    ? Math.round((stats.done / stats.total) * 100) 
    : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">Welcome back! Here's your task overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={ListTodo}
          label="Total Tasks"
          value={stats?.total || 0}
          color="bg-primary-500"
          trend="+12%"
        />
        <StatCard
          icon={Clock}
          label="In Progress"
          value={stats?.inProgress || 0}
          color="bg-amber-500"
          trend="+5%"
        />
        <StatCard
          icon={CheckCircle}
          label="Completed"
          value={stats?.done || 0}
          color="bg-emerald-500"
          trend={`${completionRate}%`}
        />
        <StatCard
          icon={AlertTriangle}
          label="Overdue"
          value={stats?.overdue || 0}
          color="bg-red-500"
          trend="-3%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Task Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: COLORS[index] }} />
                <span className="text-sm text-slate-600 dark:text-slate-400">{entry.name}</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{entry.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Completion Progress</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'To Do', value: stats?.todo || 0 },
                { name: 'In Progress', value: stats?.inProgress || 0 },
                { name: 'Done', value: stats?.done || 0 }
              ]}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    background: '#1e293b', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }}
                />
                <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Recent Tasks</h2>
        <div className="space-y-3">
          {tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  task.status === 'DONE' ? 'bg-emerald-500' :
                  task.status === 'IN_PROGRESS' ? 'bg-amber-500' : 'bg-slate-400'
                }`} />
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{task.title}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {task.priority} • {task.status.replace('_', ' ')}
                  </p>
                </div>
              </div>
              {task.dueDate && (
                <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(task.dueDate), 'MMM d')}
                </div>
              )}
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              No tasks yet. Create your first task!
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div className="flex items-center gap-1 text-emerald-500 text-sm">
          <TrendingUp className="w-4 h-4" />
          {trend}
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </motion.div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse" />
        <div className="h-80 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse" />
      </div>
    </div>
  )
}