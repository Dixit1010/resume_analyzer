import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle2, Users, Star, FileUp, UserCheck, BarChart3, UserX, FileText, Twitter, Linkedin, Github, Mail } from 'lucide-react';
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
      <section className="relative pt-28 pb-24 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[60%_40%] gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h1 className={`text-5xl lg:text-6xl font-semibold tracking-tighter leading-tight ${isDark ? 'text-white' : 'text-dark-text'}`}>
                Get Expert Feedback on your{' '}
                <span className="text-trust-blue">Resume</span>, instantly.
              </h1>

              <p className={`text-xl max-w-xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
                Reslyzer scans your resume like an ATS, flags what’s broken, and shows exactly how to fix it—before recruiters ever see it.
              </p>

              {/* Primary / Secondary CTAs */}
              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={() => navigate('/upload')}
                  className="px-6 py-3 bg-trust-blue text-white font-semibold rounded-xl hover:bg-trust-blue/90 transition-colors flex items-center gap-2 shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Upload className="w-4 h-4" />
                  Upload Resume
                </motion.button>
                <motion.button
                  onClick={() => {
                    const el = document.getElementById('how-it-works');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold border transition-colors ${
                    isDark
                      ? 'border-gray-700 text-gray-200 hover:border-gray-500'
                      : 'border-border-light text-dark-text hover:border-trust-blue/60'
                  } flex items-center gap-2`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  See How It Works
                </motion.button>
              </div>

              {/* Dropzone */}
              <div
                className={`border-2 border-dashed rounded-2xl p-8 transition-colors duration-300 cursor-pointer ${
                  isDark ? 'border-gray-700 bg-[#0A0A0A]/80 hover:border-gray-500' : 'border-border-light bg-white hover:border-trust-blue/60'
                }`}
                onClick={() => navigate('/upload')}
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <motion.div
                    initial={{ scale: 1, opacity: 0.9 }}
                    animate={{ scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-trust-blue/15' : 'bg-trust-blue/10'
                    }`}
                  >
                    <Upload className="w-7 h-7 text-trust-blue" />
                  </motion.div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>Drag and drop your resume here</p>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/upload');
                    }}
                    className="px-6 py-3 bg-trust-blue text-white font-semibold rounded-xl hover:bg-trust-blue/90 transition-colors shadow-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Drop your Resume
                  </motion.button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border border-white bg-[url('https://i.pravatar.cc/40?img=1')] bg-cover bg-center" />
                    <div className="w-8 h-8 rounded-full border border-white bg-[url('https://i.pravatar.cc/40?img=2')] bg-cover bg-center" />
                    <div className="w-8 h-8 rounded-full border border-white bg-[url('https://i.pravatar.cc/40?img=3')] bg-cover bg-center" />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-dark-text'}`}>10,000+ job seekers</span>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-gray'}`}>Using Reslyzer to tune their resumes</span>
                  </div>
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
              {/* Ambient glow behind mockup */}
              <div className="absolute -inset-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.18),_transparent_55%)] blur-3xl pointer-events-none" />

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

      {/* How Reslyzer Works */}
      <section
        id="how-it-works"
        className={`py-24 px-6 transition-colors duration-300 ${isDark ? 'bg-[#030303]/80' : 'bg-white/80'} backdrop-blur-sm`}
      >
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center">
            <h2 className={`text-3xl font-bold tracking-tighter mb-3 ${isDark ? 'text-white' : 'text-dark-text'}`}>
              How resume scan works
            </h2>
            <p className={isDark ? 'text-gray-400' : 'text-slate-gray'}>
              Three quick steps from upload to ATS-ready resume.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 01 */}
            <div
              className={`p-6 rounded-2xl border transition-colors duration-300 ${
                isDark ? 'bg-[#0A0A0A] border-gray-800' : 'bg-white border-border-light'
              }`}
            >
              <p className={`text-[11px] font-semibold mb-2 uppercase tracking-wide ${isDark ? 'text-gray-500' : 'text-slate-gray'}`}>
                Step 01
              </p>
              <div className="flex flex-col items-start space-y-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-trust-blue/15' : 'bg-trust-blue/10'
                  }`}
                >
                  <FileUp className="w-5 h-5 text-trust-blue" />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                    Upload your resume (PDF)
                  </h3>
                  <p className={isDark ? 'text-gray-400 text-sm' : 'text-slate-gray text-sm'}>
                    Drag and drop your resume, and Reslyzer converts it into ATS-readable text instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 02 */}
            <div
              className={`p-6 rounded-2xl border transition-colors duration-300 ${
                isDark ? 'bg-[#0A0A0A] border-gray-800' : 'bg-white border-border-light'
              }`}
            >
              <p className={`text-[11px] font-semibold mb-2 uppercase tracking-wide ${isDark ? 'text-gray-500' : 'text-slate-gray'}`}>
                Step 02
              </p>
              <div className="flex flex-col items-start space-y-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-trust-blue/15' : 'bg-trust-blue/10'
                  }`}
                >
                  <UserCheck className="w-5 h-5 text-trust-blue" />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                    Add experience or job description
                  </h3>
                  <p className={isDark ? 'text-gray-400 text-sm' : 'text-slate-gray text-sm'}>
                    Paste a job description or describe the roles you’re targeting for focused analysis.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 03 */}
            <div
              className={`p-6 rounded-2xl border transition-colors duration-300 ${
                isDark ? 'bg-[#0A0A0A] border-gray-800' : 'bg-white border-border-light'
              }`}
            >
              <p className={`text-[11px] font-semibold mb-2 uppercase tracking-wide ${isDark ? 'text-gray-500' : 'text-slate-gray'}`}>
                Step 03
              </p>
              <div className="flex flex-col items-start space-y-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-trust-blue/15' : 'bg-trust-blue/10'
                  }`}
                >
                  <BarChart3 className="w-5 h-5 text-trust-blue" />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                    Get ATS score and fixes
                  </h3>
                  <p className={isDark ? 'text-gray-400 text-sm' : 'text-slate-gray text-sm'}>
                    See your ATS score, mistakes, and AI corrections in under 30 seconds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why you're not getting interview calls */}
      <section
        id="reasons"
        className={`py-24 px-6 transition-colors duration-300 ${isDark ? 'bg-[#030303]' : 'bg-pearl'}`}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[60%_40%] gap-12 items-center">
          {/* Left: Reasons list */}
          <div className="space-y-6">
            <h2 className={`text-3xl font-bold tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-dark-text'}`}>
              Why you’re not getting interview calls
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-semibold text-white mt-1">
                  1
                </div>
                <div>
                  <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-dark-text'}`}>Your resume is not ATS-optimized</p>
                  <p className={isDark ? 'text-gray-400 text-sm' : 'text-slate-gray text-sm'}>
                    Most resumes get filtered out by ATS because of formatting issues, missing keywords, and poor structure.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-semibold text-white mt-1">
                  2
                </div>
                <div>
                  <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-dark-text'}`}>Your resume doesn’t match the JD</p>
                  <p className={isDark ? 'text-gray-400 text-sm' : 'text-slate-gray text-sm'}>
                    Recruiters and ATS both look for direct alignment between your experience and the job description.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-semibold text-white mt-1">
                  3
                </div>
                <div>
                  <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-dark-text'}`}>You use the same resume for every job</p>
                  <p className={isDark ? 'text-gray-400 text-sm' : 'text-slate-gray text-sm'}>
                    A single generic resume rarely matches the language, skills, and priorities of every role you apply to.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`w-full max-w-sm p-8 rounded-2xl border flex flex-col items-center gap-4 text-center ${
                isDark ? 'bg-[#0A0A0A] border-gray-800' : 'bg-white border-border-light'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-red-500/10' : 'bg-red-50'
                }`}
              >
                <UserX className="w-8 h-8 text-red-500" />
              </div>
              <p className={`font-semibold ${isDark ? 'text-white' : 'text-dark-text'}`}>
                Stop losing interviews to avoidable resume issues.
              </p>
              <p className={isDark ? 'text-gray-400 text-sm' : 'text-slate-gray text-sm'}>
                Reslyzer shows you why applications are being ignored and how to correct them in minutes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section
        id="features"
        className={`py-24 px-6 transition-colors duration-300 ${isDark ? 'bg-[#030303]/80' : 'bg-white/80'} backdrop-blur-sm`}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold tracking-tighter mb-3 ${isDark ? 'text-white' : 'text-dark-text'}`}>
              Key features
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
              Everything you need to make your resume ATS-ready.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="target"
              title="ATS Resume Checker"
              description="Simulates modern ATS systems to score your resume."
              delay={0.1}
            />
            <FeatureCard
              icon="layers"
              title="Keyword Gap Analysis"
              description="Find missing skills and keywords for target roles."
              delay={0.2}
            />
            <FeatureCard
              icon="sparkles"
              title="Resume Mistake Detection"
              description="Catch weak bullets, vague language, and formatting issues."
              delay={0.3}
            />
            <FeatureCard
              icon="layers"
              title="JD-Based Optimization"
              description="Align your resume to a specific job description."
              delay={0.4}
            />
            <FeatureCard
              icon="sparkles"
              title="Free Initial Review"
              description="Get a high-level ATS check before going deeper."
              delay={0.5}
            />
            <FeatureCard
              icon="target"
              title="ATS-Friendly Templates"
              description="Use clean layouts that parse correctly in most ATS."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* ATS Education Bento Grid */}
      <section
        id="ats-education"
        className={`py-24 px-6 transition-colors duration-300 ${isDark ? 'bg-[#030303]' : 'bg-pearl'}`}
      >
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center">
            <h2 className={`text-2xl font-bold tracking-tighter mb-3 ${isDark ? 'text-white' : 'text-dark-text'}`}>
              What is an ATS?
            </h2>
            <p className={isDark ? 'text-gray-400' : 'text-slate-gray'}>
              Understand how Applicant Tracking Systems read and rank your resume.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm border-t-2 border-t-orange-500">
              <h3 className="text-sm font-semibold text-dark-text mb-2">Automated resume filtering</h3>
              <p className="text-sm text-slate-gray">
                ATS automatically scans and filters resumes before a human recruiter ever sees them.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm border-t-2 border-t-orange-500">
              <h3 className="text-sm font-semibold text-dark-text mb-2">Keyword and structure focused</h3>
              <p className="text-sm text-slate-gray">
                It looks for job titles, skills, and clean structure—not colors, icons, or complex layouts.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm border-t-2 border-t-orange-500">
              <h3 className="text-sm font-semibold text-dark-text mb-2">Ranking and shortlisting</h3>
              <p className="text-sm text-slate-gray">
                Resumes are scored and ranked, and only the top matches move forward to recruiters.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm border-t-2 border-t-orange-500">
              <h3 className="text-sm font-semibold text-dark-text mb-2">Why optimization matters</h3>
              <p className="text-sm text-slate-gray">
                Even strong candidates can be rejected if their resume isn’t written for ATS systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section
        id="final-cta"
        className={`py-24 px-6 transition-colors duration-300 ${isDark ? 'bg-[#030303]/90' : 'bg-white'}`}
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className={`text-3xl font-bold tracking-tighter ${isDark ? 'text-white' : 'text-dark-text'}`}>
            Upload your resume and see how well it matches the jobs you want.
          </h2>
          <motion.button
            onClick={() => navigate('/upload')}
            className="px-8 py-3 bg-trust-blue text-white font-semibold rounded-xl hover:bg-trust-blue/90 transition-colors flex items-center gap-2 mx-auto shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Upload className="w-4 h-4" />
            Upload resume to find perfect jobs
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative border-t transition-colors duration-300 ${
        isDark ? 'bg-[#030303] border-gray-800' : 'bg-white border-border-light'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-trust-blue" />
                <span className={`text-xl font-bold tracking-tighter ${isDark ? 'text-white' : 'text-dark-text'}`}>
                  RESLYZER
                </span>
              </div>
              <p className={`text-sm max-w-md leading-relaxed ${
                isDark ? 'text-gray-400' : 'text-slate-gray'
              }`}>
                AI-powered resume analysis that helps you bypass ATS filters and land interviews at top companies.
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="#"
                  className={`p-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                      : 'text-slate-gray hover:text-dark-text hover:bg-gray-100'
                  }`}
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className={`p-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                      : 'text-slate-gray hover:text-dark-text hover:bg-gray-100'
                  }`}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className={`p-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                      : 'text-slate-gray hover:text-dark-text hover:bg-gray-100'
                  }`}
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className={`p-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                      : 'text-slate-gray hover:text-dark-text hover:bg-gray-100'
                  }`}
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                Product
              </h3>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'ATS Checker', 'Resume Templates'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className={`text-sm transition-colors ${
                        isDark 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-slate-gray hover:text-dark-text'
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                Company
              </h3>
              <ul className="space-y-3">
                {['About Us', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className={`text-sm transition-colors ${
                        isDark 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-slate-gray hover:text-dark-text'
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                Resources
              </h3>
              <ul className="space-y-3">
                {['Help Center', 'Documentation', 'API', 'Privacy Policy'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className={`text-sm transition-colors ${
                        isDark 
                          ? 'text-gray-400 hover:text-white' 
                          : 'text-slate-gray hover:text-dark-text'
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`pt-8 border-t ${
            isDark ? 'border-gray-800' : 'border-border-light'
          }`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-slate-gray'
              }`}>
                © {new Date().getFullYear()} Reslyzer. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className={`text-sm transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-slate-gray hover:text-dark-text'
                  }`}
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className={`text-sm transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-slate-gray hover:text-dark-text'
                  }`}
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className={`text-sm transition-colors ${
                    isDark 
                      ? 'text-gray-400 hover:text-white' 
                      : 'text-slate-gray hover:text-dark-text'
                  }`}
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
