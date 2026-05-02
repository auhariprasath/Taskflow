import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Kanban, 
  ListTodo, 
  Menu, 
  X,
  Moon,
  Sun
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/board', icon: Kanban, label: 'Board' },
  { path: '/tasks', icon: ListTodo, label: 'Tasks' },
]

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-50 lg:hidden"
            >
              <SidebarContent 
                isDark={isDark}
                toggleTheme={toggleTheme}
                onClose={() => setSidebarOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="hidden lg:flex">
        <div className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
          <SidebarContent 
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
        </div>
        <div className="flex-1 lg:ml-72">
          <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>

      <div className="lg:hidden">
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ isDark, toggleTheme, onClose }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
            TaskFlow
          </h1>
          {onClose && (
            <button onClick={onClose} className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
              <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span className="font-medium">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </div>
  )
}

function MobileHeader({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg lg:hidden"
        >
          <Menu className="w-6 h-6 text-slate-600 dark:text-slate-400" />
        </button>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 lg:hidden">
          TaskFlow
        </h1>
        <div className="w-10" />
      </div>
    </header>
  )
}