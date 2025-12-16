import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, CreditCard, LogOut, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';
import ThemeToggle from '../components/ThemeToggle';

export default function Settings() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="max-w-3xl space-y-6">
        <div>
          <h1 className={`text-3xl font-bold tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-dark-text'}`}>
            Settings
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-slate-gray'}>
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Section */}
        <div className={`p-6 rounded-2xl border transition-colors duration-300 ${
          isDark
            ? 'bg-[#0A0A0A] border-gray-800'
            : 'bg-white border-border-light'
        }`}>
          <h2 className={`text-xl font-bold tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-dark-text'}`}>
            Profile
          </h2>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-dark-text'}`}>
                Name
              </label>
              <input
                type="text"
                defaultValue={user?.name || ''}
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                  isDark
                    ? 'bg-[#030303] border-gray-800 text-white focus:border-trust-blue'
                    : 'bg-pearl border-border-light text-dark-text focus:border-trust-blue'
                } focus:outline-none focus:ring-2 focus:ring-trust-blue/20`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-dark-text'}`}>
                Email
              </label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                disabled
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                  isDark
                    ? 'bg-[#030303] border-gray-800 text-gray-500'
                    : 'bg-gray-100 border-border-light text-gray-500'
                } cursor-not-allowed`}
              />
            </div>
            <motion.button
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-trust-blue text-white font-semibold rounded-lg hover:bg-trust-blue/90 transition-colors disabled:opacity-50"
              whileHover={{ scale: saving ? 1 : 1.02 }}
              whileTap={{ scale: saving ? 1 : 0.98 }}
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </motion.button>
          </div>
        </div>

        {/* Plan Section */}
        <div className={`p-6 rounded-2xl border transition-colors duration-300 ${
          isDark
            ? 'bg-[#0A0A0A] border-gray-800'
            : 'bg-white border-border-light'
        }`}>
          <h2 className={`text-xl font-bold tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-dark-text'}`}>
            Plan
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                {user?.plan ? user.plan.charAt(0).toUpperCase() + user.plan.slice(1) : 'Free'} Plan
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
                Current subscription plan
              </p>
            </div>
            <motion.button
              className="px-6 py-2 border border-trust-blue text-trust-blue font-semibold rounded-lg hover:bg-trust-blue hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Upgrade
            </motion.button>
          </div>
        </div>

        {/* Preferences Section */}
        <div className={`p-6 rounded-2xl border transition-colors duration-300 ${
          isDark
            ? 'bg-[#0A0A0A] border-gray-800'
            : 'bg-white border-border-light'
        }`}>
          <h2 className={`text-xl font-bold tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-dark-text'}`}>
            Preferences
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                Theme
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
                Switch between light and dark mode
              </p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Danger Zone */}
        <div className={`p-6 rounded-2xl border transition-colors duration-300 ${
          isDark
            ? 'bg-red-500/10 border-red-500/20'
            : 'bg-red-50 border-red-200'
        }`}>
          <h2 className={`text-xl font-bold tracking-tighter mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            Danger Zone
          </h2>
          <motion.button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </div>
      </div>
    </Layout>
  );
}

