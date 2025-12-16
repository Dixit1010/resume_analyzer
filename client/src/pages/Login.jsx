import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import DotGrid from '../components/DotGrid';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const { login } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    setCapsLockOn(e.getModifierState('CapsLock'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth
    console.log('Google sign in clicked');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#030303]' : 'bg-pearl'} relative transition-colors duration-300`}>
      {/* Dot Grid Background */}
      <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0">
        <DotGrid
          key={theme}
          dotSize={10}
          gap={15}
          baseColor={isDark ? '#1F2937' : '#E5E7EB'}
          activeColor={isDark ? '#3B82F6' : '#2563EB'}
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ y: -2 }}
          className={`w-full max-w-md p-8 rounded-2xl border transition-all duration-300 ${
            isDark
              ? 'bg-[#0A0A0A] border-gray-800'
              : 'bg-white border-border-light'
          } shadow-xl`}
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <h1 className={`text-3xl font-bold tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                Sign In
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
                Welcome back to ATS PRO
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className={`p-4 rounded-lg border ${
                isDark
                  ? 'bg-red-500/10 border-red-500/20 text-red-400'
                  : 'bg-red-50 border-red-200 text-red-600'
              }`}>
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            {/* Google Sign In Button */}
            <motion.button
              onClick={handleGoogleSignIn}
              className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 flex items-center justify-center gap-3 ${
                isDark
                  ? 'bg-[#030303] border-gray-700 hover:border-gray-600 text-white'
                  : 'bg-white border-border-light hover:border-gray-300 text-dark-text'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-medium text-sm">Sign in with Google</span>
            </motion.button>

            {/* Divider */}
            <div className="relative">
              <div className={`absolute inset-0 flex items-center ${isDark ? 'border-gray-800' : 'border-border-light'}`}>
                <div className={`w-full border-t ${isDark ? 'border-gray-800' : 'border-border-light'}`}></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className={`px-2 ${isDark ? 'bg-[#0A0A0A] text-gray-500' : 'bg-white text-slate-gray'}`}>
                  or
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-dark-text'}`}>
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-gray'}`} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-300 ${
                      isDark
                        ? 'bg-[#030303] border-gray-800 text-white placeholder-gray-500 focus:border-trust-blue'
                        : 'bg-pearl border-border-light text-dark-text placeholder-gray-400 focus:border-trust-blue'
                    } focus:outline-none focus:ring-2 focus:ring-trust-blue/20`}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-dark-text'}`}>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-gray'}`} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    required
                    className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-colors duration-300 ${
                      isDark
                        ? 'bg-[#030303] border-gray-800 text-white placeholder-gray-500 focus:border-trust-blue'
                        : 'bg-pearl border-border-light text-dark-text placeholder-gray-400 focus:border-trust-blue'
                    } focus:outline-none focus:ring-2 focus:ring-trust-blue/20`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                      isDark ? 'text-gray-500 hover:text-gray-400' : 'text-slate-gray hover:text-dark-text'
                    } transition-colors`}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {capsLockOn && (
                  <p className={`mt-1 text-xs ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    Caps Lock is on
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <RouterLink
                  to="#"
                  className={`text-sm font-medium hover:underline transition-colors ${
                    isDark ? 'text-trust-blue hover:text-blue-400' : 'text-trust-blue hover:text-blue-600'
                  }`}
                >
                  Forgot Password?
                </RouterLink>
              </div>

              {/* Sign In Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-trust-blue text-white font-semibold rounded-lg hover:bg-trust-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  'Sign In'
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
              Don't have an account?{' '}
              <RouterLink
                to="/signup"
                className="text-trust-blue hover:underline font-medium"
              >
                Sign up
              </RouterLink>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
