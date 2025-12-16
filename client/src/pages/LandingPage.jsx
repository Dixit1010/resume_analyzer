import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle2, Users, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import FeatureCard from '../components/FeatureCard';
import DotGrid from '../components/DotGrid';

export default function LandingPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#030303]' : 'bg-pearl'} relative transition-colors duration-300`}>
      {/* Dot Grid Background - Full Page */}
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
      
      <div className="relative z-10">
        <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[60%_40%] gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h1 className={`text-5xl lg:text-6xl font-bold tracking-tighter leading-tight ${isDark ? 'text-white' : 'text-dark-text'}`}>
                Get Expert Feedback on your{' '}
                <span className="text-trust-blue">Resume</span>, instantly.
              </h1>
              
              <p className={`text-xl max-w-xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
                AI-powered resume analysis that bypasses ATS filters and helps you land interviews at top companies.
              </p>

              {/* Drag and Drop Zone */}
              <div className={`border-2 border-dashed rounded-xl p-8 transition-colors duration-300 ${isDark ? 'border-gray-700 bg-[#0A0A0A]' : 'border-border-light bg-white'}`}>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Upload className="w-12 h-12 text-trust-blue" />
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>Drag and drop your resume here</p>
                  <motion.button
                    onClick={() => navigate('/signup')}
                    className="px-6 py-3 bg-trust-blue text-white font-semibold rounded-lg hover:bg-trust-blue/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Drop your Resume
                  </motion.button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-trust-blue" />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>10,000+ Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald" />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>98% Match Rate</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Product Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className={`relative rounded-2xl shadow-2xl p-4 border transition-colors duration-300 ${isDark ? 'bg-[#0A0A0A] border-gray-800' : 'bg-white border-border-light'}`}>
                {/* Laptop Frame */}
                <div className="bg-gray-900 rounded-lg p-2">
                  <div className="bg-white rounded overflow-hidden">
                    {/* Mockup Content */}
                    <div className={`p-6 space-y-4 transition-colors duration-300 ${isDark ? 'bg-[#030303]' : 'bg-pearl'}`}>
                      <div className={`h-4 rounded w-3/4 transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                      <div className={`h-4 rounded w-1/2 transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className={`p-4 rounded-lg border shadow-soft transition-colors duration-300 ${isDark ? 'bg-[#0A0A0A] border-gray-800' : 'bg-white border-border-light'}`}>
                          <div className="h-8 bg-trust-blue/20 rounded mb-2"></div>
                          <div className={`h-3 rounded w-2/3 transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                        </div>
                        <div className={`p-4 rounded-lg border shadow-soft transition-colors duration-300 ${isDark ? 'bg-[#0A0A0A] border-gray-800' : 'bg-white border-border-light'}`}>
                          <div className="h-8 bg-emerald/20 rounded mb-2"></div>
                          <div className={`h-3 rounded w-2/3 transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                        </div>
                        <div className={`p-4 rounded-lg border shadow-soft transition-colors duration-300 ${isDark ? 'bg-[#0A0A0A] border-gray-800' : 'bg-white border-border-light'}`}>
                          <div className="h-8 bg-yellow-500/20 rounded mb-2"></div>
                          <div className={`h-3 rounded w-2/3 transition-colors duration-300 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-trust-blue/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald/10 rounded-full blur-2xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Bento Grid */}
      <section id="features" className={`py-16 px-6 transition-colors duration-300 ${isDark ? 'bg-[#030303]/80' : 'bg-white/60'} backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold tracking-tighter mb-3 ${isDark ? 'text-white' : 'text-dark-text'}`}>
              Powerful Features
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
              Everything you need to optimize your resume
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="target"
              title="ATS Score"
              description="Real-time compatibility checking."
              delay={0.1}
            />
            <FeatureCard
              icon="layers"
              title="JD Match"
              description="Align your skills with job descriptions instantly."
              delay={0.2}
            />
            <FeatureCard
              icon="sparkles"
              title="AI Rewrite"
              description="Intelligent bullet point enhancement."
              delay={0.3}
            />
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
