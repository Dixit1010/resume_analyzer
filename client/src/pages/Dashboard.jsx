import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resumesRes, analysesRes] = await Promise.all([
        axios.get('/api/dashboard/resumes'),
        axios.get('/api/dashboard/analyses')
      ]);
      setResumes(resumesRes.data);
      setAnalyses(analysesRes.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load data');
    } finally {
      setLoading(false);
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
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-dark-text'}`}>
              Dashboard
            </h1>
            <p className={isDark ? 'text-gray-400' : 'text-slate-gray'}>
              Overview of your resume analyses
            </p>
          </div>
          <motion.button
            onClick={() => navigate('/upload')}
            className="flex items-center gap-2 px-6 py-3 bg-trust-blue text-white font-semibold rounded-lg hover:bg-trust-blue/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Upload className="w-5 h-5" />
            Upload Resume
          </motion.button>
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

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border transition-colors duration-300 ${
              isDark
                ? 'bg-[#0A0A0A] border-gray-800'
                : 'bg-white border-border-light'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className={`w-8 h-8 ${isDark ? 'text-gray-400' : 'text-slate-gray'}`} />
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-dark-text'}`}>
                {resumes.length}
              </span>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
              Total Resumes
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-2xl border transition-colors duration-300 ${
              isDark
                ? 'bg-[#0A0A0A] border-gray-800'
                : 'bg-white border-border-light'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className={`w-8 h-8 ${isDark ? 'text-gray-400' : 'text-slate-gray'}`} />
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-dark-text'}`}>
                {analyses.length}
              </span>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
              Total Analyses
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-6 rounded-2xl border transition-colors duration-300 ${
              isDark
                ? 'bg-[#0A0A0A] border-gray-800'
                : 'bg-white border-border-light'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isDark ? 'bg-emerald/20' : 'bg-emerald/10'
              }`}>
                <span className="text-emerald text-lg">✓</span>
              </div>
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-dark-text'}`}>
                {analyses.filter(a => a.atsScore >= 70).length}
              </span>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
              High Scores (70+)
            </p>
          </motion.div>
        </div>

        {/* Recent Resumes */}
        <div>
          <h2 className={`text-xl font-bold tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-dark-text'}`}>
            Recent Resumes
          </h2>
          {resumes.length === 0 ? (
            <div className={`p-8 rounded-2xl border text-center transition-colors duration-300 ${
              isDark
                ? 'bg-[#0A0A0A] border-gray-800 text-gray-400'
                : 'bg-white border-border-light text-slate-gray'
            }`}>
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No resumes uploaded yet. Upload your first resume to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {resumes.map((resume) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => navigate(`/ats-score/${resume.id}`)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isDark
                      ? 'bg-[#0A0A0A] border-gray-800 hover:border-trust-blue/50'
                      : 'bg-white border-border-light hover:border-trust-blue/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                        {resume.fileName}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
                        Uploaded {new Date(resume.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/ats-score/${resume.id}`);
                        }}
                        className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-trust-blue hover:text-white hover:border-trust-blue"
                      >
                        ATS Score
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/jd-match/${resume.id}`);
                        }}
                        className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-trust-blue hover:text-white hover:border-trust-blue"
                      >
                        Match JD
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/rewrite/${resume.id}`);
                        }}
                        className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors hover:bg-trust-blue hover:text-white hover:border-trust-blue"
                      >
                        Rewrite
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Analyses */}
        <div>
          <h2 className={`text-xl font-bold tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-dark-text'}`}>
            Recent Analyses
          </h2>
          {analyses.length === 0 ? (
            <div className={`p-8 rounded-2xl border text-center transition-colors duration-300 ${
              isDark
                ? 'bg-[#0A0A0A] border-gray-800 text-gray-400'
                : 'bg-white border-border-light text-slate-gray'
            }`}>
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No analyses yet. Analyze a resume to see results here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {analyses.map((analysis) => (
                <motion.div
                  key={analysis.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => navigate(`/ats-score/${analysis.resumeId}`)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isDark
                      ? 'bg-[#0A0A0A] border-gray-800 hover:border-trust-blue/50'
                      : 'bg-white border-border-light hover:border-trust-blue/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-dark-text'}`}>
                        {analysis.resumeName}
                      </h3>
                      <div className="flex gap-4">
                        {analysis.atsScore !== null && analysis.atsScore !== undefined && (
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
                            ATS: <strong className={isDark ? 'text-white' : 'text-dark-text'}>{analysis.atsScore}</strong>
                          </span>
                        )}
                        {analysis.jdMatchScore !== null && analysis.jdMatchScore !== undefined && (
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
                            JD Match: <strong className={isDark ? 'text-white' : 'text-dark-text'}>{analysis.jdMatchScore}%</strong>
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
                      {new Date(analysis.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
