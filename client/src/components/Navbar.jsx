import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
        isDark 
          ? 'bg-[#0A0A0A]/80 border-gray-800' 
          : 'bg-white/80 border-border-light'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="w-6 h-6 text-trust-blue" />
            <span className={`text-xl font-bold tracking-tighter ${isDark ? 'text-white' : 'text-dark-text'}`}>
              ATS PRO
            </span>
          </motion.div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className={`transition-colors text-sm font-medium ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-slate-gray hover:text-dark-text'
              }`}
            >
              Home
            </a>
            <a
              href="#features"
              className={`transition-colors text-sm font-medium ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-slate-gray hover:text-dark-text'
              }`}
            >
              Service
            </a>
            <a
              href="#"
              className={`transition-colors text-sm font-medium ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-slate-gray hover:text-dark-text'
              }`}
            >
              Blogs
            </a>
            <a
              href="#"
              className={`transition-colors text-sm font-medium ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-slate-gray hover:text-dark-text'
              }`}
            >
              About Us
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => navigate('/login')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isDark ? 'text-gray-400 hover:text-white' : 'text-slate-gray hover:text-dark-text'
              }`}
            >
              Login
            </button>
            <motion.button
              onClick={() => navigate('/signup')}
              className="px-6 py-2 bg-trust-blue text-white text-sm font-semibold rounded-lg hover:bg-trust-blue/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
