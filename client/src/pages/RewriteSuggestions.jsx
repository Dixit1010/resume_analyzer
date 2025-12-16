import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Copy, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';

export default function RewriteSuggestions() {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState(null);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    fetchSuggestions();
  }, [resumeId]);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(`/api/resume/rewrite/${resumeId}`);
      setSuggestions(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load suggestions');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
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
              Resume Rewrite Suggestions
            </h1>
            <p className={isDark ? 'text-gray-400' : 'text-slate-gray'}>
              AI-powered improvements for your resume bullets
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/ats-score/${resumeId}`)}
              className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-trust-blue hover:text-white hover:border-trust-blue"
            >
              ATS Score
            </button>
            <button
              onClick={() => navigate(`/jd-match/${resumeId}`)}
              className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-trust-blue hover:text-white hover:border-trust-blue"
            >
              Match JD
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

        {suggestions && (
          <>
            {/* Overall Feedback */}
            {suggestions.overallFeedback && (
              <div className={`p-6 rounded-2xl border transition-colors duration-300 ${
                isDark
                  ? 'bg-[#0A0A0A] border-gray-800'
                  : 'bg-white border-border-light'
              }`}>
                <h2 className={`text-xl font-bold tracking-tighter mb-3 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                  Overall Feedback
                </h2>
                <p className={isDark ? 'text-gray-300' : 'text-dark-text'}>
                  {suggestions.overallFeedback}
                </p>
              </div>
            )}

            {/* Bullet Improvements */}
            {suggestions.bulletImprovements && suggestions.bulletImprovements.length > 0 && (
              <div>
                <h2 className={`text-xl font-bold tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                  Bullet Point Improvements
                </h2>
                <div className="space-y-4">
                  {suggestions.bulletImprovements.map((improvement, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className={`p-6 rounded-2xl border transition-colors duration-300 ${
                        isDark
                          ? 'bg-[#0A0A0A] border-gray-800'
                          : 'bg-white border-border-light'
                      }`}
                    >
                      <div className="space-y-4">
                        {/* Original */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
                              Original
                            </span>
                            <button
                              onClick={() => copyToClipboard(improvement.original, `original-${idx}`)}
                              className={`p-1.5 rounded hover:bg-gray-100 transition-colors ${
                                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                              }`}
                            >
                              <Copy className={`w-4 h-4 ${copiedIndex === `original-${idx}` ? 'text-trust-blue' : isDark ? 'text-gray-500' : 'text-slate-gray'}`} />
                            </button>
                          </div>
                          <div className={`p-4 rounded-lg transition-colors duration-300 ${
                            isDark ? 'bg-[#030303]' : 'bg-pearl'
                          }`}>
                            <p className={isDark ? 'text-gray-300' : 'text-dark-text'}>
                              {improvement.original}
                            </p>
                          </div>
                        </div>

                        {/* Improved */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-trust-blue">
                              Improved
                            </span>
                            <button
                              onClick={() => copyToClipboard(improvement.improved, `improved-${idx}`)}
                              className={`p-1.5 rounded hover:bg-gray-100 transition-colors ${
                                isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                              }`}
                            >
                              <Copy className={`w-4 h-4 ${copiedIndex === `improved-${idx}` ? 'text-trust-blue' : isDark ? 'text-gray-500' : 'text-slate-gray'}`} />
                            </button>
                          </div>
                          <div className={`p-4 rounded-lg border transition-colors duration-300 ${
                            isDark
                              ? 'bg-[#030303] border-trust-blue/30'
                              : 'bg-pearl border-trust-blue/30'
                          }`}>
                            <p className="text-trust-blue">
                              {improvement.improved}
                            </p>
                          </div>
                        </div>

                        {/* Reason */}
                        {improvement.reason && (
                          <div className="flex items-start gap-2 pt-2">
                            <Sparkles className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-gray-500' : 'text-slate-gray'}`} />
                            <p className={`text-xs italic ${isDark ? 'text-gray-500' : 'text-slate-gray'}`}>
                              {improvement.reason}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {(!suggestions.bulletImprovements || suggestions.bulletImprovements.length === 0) && (
              <div className={`p-12 rounded-2xl border text-center transition-colors duration-300 ${
                isDark
                  ? 'bg-[#0A0A0A] border-gray-800 text-gray-400'
                  : 'bg-white border-border-light text-slate-gray'
              }`}>
                <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No rewrite suggestions available.</p>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
