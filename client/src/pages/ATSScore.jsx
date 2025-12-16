import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { TrendingUp, Target, AlertCircle, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';

function ScoreRing({ score, isDark }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;
  const getColor = () => {
    if (score >= 70) return '#10B981';
    if (score >= 50) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="relative w-32 h-32">
      <svg width="128" height="128" className="transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r="45"
          fill="none"
          stroke={isDark ? '#374151' : '#E5E7EB'}
          strokeWidth="8"
        />
        <motion.circle
          cx="64"
          cy="64"
          r="45"
          fill="none"
          stroke={getColor()}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-dark-text'}`}>
          {score}
        </span>
        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
          ATS Score
        </span>
      </div>
    </div>
  );
}

export default function ATSScore() {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalysis();
  }, [resumeId]);

  const fetchAnalysis = async () => {
    try {
      const response = await axios.get(`/api/dashboard/analyses/${resumeId}`);
      if (response.data && response.data.atsScore !== null && response.data.atsScore !== undefined) {
        setAnalysis(response.data);
      }
    } catch (err) {
      // Analysis doesn't exist yet
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setError('');

    try {
      const response = await axios.post(`/api/resume/analyze/${resumeId}`);
      setAnalysis(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-trust-blue"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-dark-text'}`}>
              ATS Score Analysis
            </h1>
            <p className={isDark ? 'text-gray-400' : 'text-slate-gray'}>
              Comprehensive compatibility check for your resume
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/jd-match/${resumeId}`)}
              className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-trust-blue hover:text-white hover:border-trust-blue"
            >
              Match JD
            </button>
            <button
              onClick={() => navigate(`/rewrite/${resumeId}`)}
              className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-trust-blue hover:text-white hover:border-trust-blue"
            >
              Rewrite
            </button>
          </div>
        </div>

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

        {!analysis ? (
          <div className={`p-12 rounded-2xl border text-center transition-colors duration-300 ${
            isDark
              ? 'bg-[#0A0A0A] border-gray-800'
              : 'bg-white border-border-light'
          }`}>
            <Target className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
              No analysis yet. Click below to analyze your resume.
            </p>
            <motion.button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="px-8 py-3 bg-trust-blue text-white font-semibold rounded-lg hover:bg-trust-blue/90 transition-colors disabled:opacity-50"
              whileHover={{ scale: analyzing ? 1 : 1.05 }}
              whileTap={{ scale: analyzing ? 1 : 0.95 }}
            >
              {analyzing ? 'Analyzing...' : 'Analyze Resume'}
            </motion.button>
          </div>
        ) : (
          <>
            {/* Score Display */}
            <div className={`p-8 rounded-2xl border transition-colors duration-300 ${
              isDark
                ? 'bg-[#0A0A0A] border-gray-800'
                : 'bg-white border-border-light'
            }`}>
              <div className="flex items-center gap-8">
                <ScoreRing score={analysis.atsScore} isDark={isDark} />
                <div>
                  <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
                    Your resume has an ATS compatibility score of
                  </p>
                  <p className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                    {analysis.atsScore}/100
                  </p>
                  <p className={isDark ? 'text-gray-400' : 'text-slate-gray'}>
                    {analysis.atsScore >= 70
                      ? 'Great! Your resume is well-optimized for ATS systems.'
                      : analysis.atsScore >= 50
                      ? 'Good, but there\'s room for improvement.'
                      : 'Your resume needs significant improvements for ATS compatibility.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Missing Skills */}
            {analysis.missingSkills && analysis.missingSkills.length > 0 && (
              <div className={`p-6 rounded-2xl border transition-colors duration-300 ${
                isDark
                  ? 'bg-[#0A0A0A] border-gray-800'
                  : 'bg-white border-border-light'
              }`}>
                <h2 className={`text-xl font-bold tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                  Missing Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-600 border border-orange-500/20 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Weak Sections */}
            {analysis.weakSections && analysis.weakSections.length > 0 && (
              <div className={`p-6 rounded-2xl border transition-colors duration-300 ${
                isDark
                  ? 'bg-[#0A0A0A] border-gray-800'
                  : 'bg-white border-border-light'
              }`}>
                <h2 className={`text-xl font-bold tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                  Weak Sections
                </h2>
                <div className="space-y-2">
                  {analysis.weakSections.map((section, idx) => (
                    <div key={idx} className={`flex items-center gap-2 ${isDark ? 'text-gray-300' : 'text-slate-gray'}`}>
                      <span className="text-orange-500">•</span>
                      {section}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Improvement Suggestions */}
            {analysis.bulletImprovements && analysis.bulletImprovements.length > 0 && (
              <div className={`p-6 rounded-2xl border transition-colors duration-300 ${
                isDark
                  ? 'bg-[#0A0A0A] border-gray-800'
                  : 'bg-white border-border-light'
              }`}>
                <h2 className={`text-xl font-bold tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                  Improvement Suggestions
                </h2>
                <div className="space-y-4">
                  {analysis.bulletImprovements.slice(0, 5).map((improvement, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg transition-colors duration-300 ${
                        isDark ? 'bg-[#030303]' : 'bg-pearl'
                      }`}
                    >
                      <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
                        Original:
                      </p>
                      <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-dark-text'}`}>
                        {improvement.original}
                      </p>
                      <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
                        Improved:
                      </p>
                      <p className={`mb-2 text-trust-blue ${isDark ? 'text-blue-400' : 'text-trust-blue'}`}>
                        {improvement.improved}
                      </p>
                      {improvement.reason && (
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-slate-gray'}`}>
                          {improvement.reason}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
