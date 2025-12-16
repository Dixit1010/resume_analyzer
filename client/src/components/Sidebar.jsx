import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, Upload, History, Settings, LogOut, FileText } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Upload Resume', path: '/upload', icon: Upload },
  { label: 'History', path: '/history', icon: History },
  { label: 'Settings', path: '/settings', icon: Settings }
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`fixed left-0 top-0 w-60 h-screen border-r transition-colors duration-300 ${
        isDark
          ? 'bg-[#0A0A0A] border-gray-800'
          : 'bg-white border-border-light'
      } p-6 z-40`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <FileText className="w-6 h-6 text-trust-blue" />
          <span className={`text-xl font-bold tracking-tighter ${isDark ? 'text-white' : 'text-dark-text'}`}>
            ATS PRO
          </span>
        </div>

        {/* User Info */}
        <div className="mb-6 pb-6 border-b border-border-light">
          <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-dark-text'}`}>
            {user?.name || 'User'}
          </p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
            {user?.email}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-trust-blue text-white'
                    : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                    : 'text-slate-gray hover:text-dark-text hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </motion.button>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
            isDark
              ? 'text-red-400 hover:bg-red-500/10'
              : 'text-red-600 hover:bg-red-50'
          }`}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
