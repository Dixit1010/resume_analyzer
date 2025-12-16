import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, AlertCircle, TrendingUp, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';

export default function JDMatch() {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [matchResult, setMatchResult] = useState(null);
  const [error, setError] = useState('');

  const handleMatch = async () => {
    if (!jobDescription.trim() || jobDescription.trim().length < 50) {
      setError('Job description must be at least 50 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`/api/resume/match-jd/${resumeId}`, {
        jobDescription: jobDescription.trim()
      });
      setMatchResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Match analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const getMatchColor = (score) => {
    if (score >= 70) return '#10B981';
    if (score >= 50) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-dark-text'}`}>
              Job Description Match
            </h1>
            <p className={isDark ? 'text-gray-400' : 'text-slate-gray'}>
              Compare your resume against job requirements
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

        {/* JD Input */}
        <div className={`p-6 rounded-2xl border transition-colors duration-300 ${
          isDark
            ? 'bg-[#0A0A0A] border-gray-800'
            : 'bg-white border-border-light'
        }`}>
          <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-dark-text'}`}>
            Paste Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here..."
            className={`w-full px-4 py-3 rounded-lg border min-h-[200px] transition-colors duration-300 ${
              isDark
                ? 'bg-[#030303] border-gray-800 text-white placeholder-gray-500 focus:border-trust-blue'
                : 'bg-pearl border-border-light text-dark-text placeholder-gray-400 focus:border-trust-blue'
            } focus:outline-none focus:ring-2 focus:ring-trust-blue/20 resize-none`}
          />
          <motion.button
            onClick={handleMatch}
            disabled={loading}
            className="mt-4 w-full px-6 py-3 bg-trust-blue text-white font-semibold rounded-lg hover:bg-trust-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? 'Analyzing...' : 'Analyze Match'}
          </motion.button>
        </div>

        {/* Match Results */}
        {matchResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-colors duration-300 ${
              isDark
                ? 'bg-[#0A0A0A] border-gray-800'
                : 'bg-white border-border-light'
            }`}
          >
            <div className="space-y-6">
              {/* Match Percentage */}
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
                    Match Percentage
                  </p>
                  <p className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-dark-text'}`}>
                    {matchResult.matchPercentage}%
                  </p>
                </div>
                <div className="w-64">
                  <div className={`h-3 rounded-full overflow-hidden ${
                    isDark ? 'bg-gray-800' : 'bg-gray-200'
                  }`}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: getMatchColor(matchResult.matchPercentage) }}
                      initial={{ width: 0 }}
                      animate={{ width: `${matchResult.matchPercentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>

              {/* Missing Skills */}
              {matchResult.missingSkills && matchResult.missingSkills.length > 0 && (
                <div>
                  <h2 className={`text-lg font-bold tracking-tighter mb-3 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                    Missing Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {matchResult.missingSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-red-500/10 text-red-600 border border-red-500/20 text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Changes */}
              {matchResult.suggestedChanges && matchResult.suggestedChanges.length > 0 && (
                <div>
                  <h2 className={`text-lg font-bold tracking-tighter mb-3 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                    Suggested Changes
                  </h2>
                  <div className="space-y-2">
                    {matchResult.suggestedChanges.map((change, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg transition-colors duration-300 ${
                          isDark ? 'bg-[#030303]' : 'bg-pearl'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-gray-500' : 'text-slate-gray'}`} />
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-dark-text'}`}>
                            {change}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
