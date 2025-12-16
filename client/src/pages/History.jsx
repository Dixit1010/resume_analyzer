import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';

export default function History() {
  const [analyses, setAnalyses] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const [analysesRes, resumesRes] = await Promise.all([
        axios.get('/api/dashboard/analyses'),
        axios.get('/api/dashboard/resumes')
      ]);
      setAnalyses(analysesRes.data);
      setResumes(resumesRes.data);
    } catch (err) {
      console.error('Failed to load history:', err);
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
        <div>
          <h1 className={`text-3xl font-bold tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-dark-text'}`}>
            History
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-slate-gray'}>
            View all your past resume analyses and job matches
          </p>
        </div>

        {/* All Resumes */}
        <div>
          <h2 className={`text-xl font-bold tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-dark-text'}`}>
            All Resumes ({resumes.length})
          </h2>
          {resumes.length === 0 ? (
            <div className={`p-12 rounded-2xl border text-center transition-colors duration-300 ${
              isDark
                ? 'bg-[#0A0A0A] border-gray-800 text-gray-400'
                : 'bg-white border-border-light text-slate-gray'
            }`}>
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No resumes uploaded yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {resumes.map((resume) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                  onClick={() => navigate(`/ats-score/${resume.id}`)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    isDark
                      ? 'bg-[#0A0A0A] border-gray-800 hover:border-trust-blue/50'
                      : 'bg-white border-border-light hover:border-trust-blue/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-gray'}`} />
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-dark-text'}`}>
                          {resume.fileName}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {new Date(resume.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-gray'}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* All Analyses */}
        <div>
          <h2 className={`text-xl font-bold tracking-tighter mb-4 ${isDark ? 'text-white' : 'text-dark-text'}`}>
            All Analyses ({analyses.length})
          </h2>
          {analyses.length === 0 ? (
            <div className={`p-12 rounded-2xl border text-center transition-colors duration-300 ${
              isDark
                ? 'bg-[#0A0A0A] border-gray-800 text-gray-400'
                : 'bg-white border-border-light text-slate-gray'
            }`}>
              <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No analyses yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {analyses.map((analysis) => (
                <motion.div
                  key={analysis.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                  onClick={() => navigate(`/ats-score/${analysis.resumeId}`)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    isDark
                      ? 'bg-[#0A0A0A] border-gray-800 hover:border-trust-blue/50'
                      : 'bg-white border-border-light hover:border-trust-blue/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingUp className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-gray'}`} />
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-dark-text'}`}>
                          {analysis.resumeName}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
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
                          <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-slate-gray'}`}>
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {new Date(analysis.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-slate-gray'}`} />
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

