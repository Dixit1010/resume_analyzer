import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, AlertCircle, Loader } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout';

export default function ResumeUpload() {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      handleFileUpload(file);
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      handleFileUpload(file);
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleFileUpload = async (file) => {
    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post('/api/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate(`/ats-score/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl space-y-6">
        <div>
          <h1 className={`text-3xl font-bold tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-dark-text'}`}>
            Upload Resume
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-slate-gray'}>
            Upload your resume in PDF format to get started
          </p>
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

        <motion.div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative p-12 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
            dragging
              ? 'border-trust-blue bg-trust-blue/5'
              : isDark
              ? 'border-gray-700 bg-[#0A0A0A] hover:border-gray-600'
              : 'border-border-light bg-white hover:border-trust-blue/50'
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {uploading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader className="w-12 h-12 text-trust-blue animate-spin" />
              <p className={isDark ? 'text-gray-400' : 'text-slate-gray'}>
                Uploading and parsing resume...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isDark ? 'bg-gray-800' : 'bg-pearl'
              }`}>
                <Upload className="w-8 h-8 text-trust-blue" />
              </div>
              <div className="text-center space-y-2">
                <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-dark-text'}`}>
                  Drop your resume here
                </p>
                <p className={isDark ? 'text-gray-400' : 'text-slate-gray'}>
                  or click to browse
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-slate-gray'}`}>
                  PDF files only (max 5MB)
                </p>
              </div>
            </div>
          )}
        </motion.div>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileSelect}
          className="hidden"
        />

        <motion.button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full px-6 py-3 bg-trust-blue text-white font-semibold rounded-lg hover:bg-trust-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: uploading ? 1 : 1.02 }}
          whileTap={{ scale: uploading ? 1 : 0.98 }}
        >
          {uploading ? 'Uploading...' : 'Select File'}
        </motion.button>
      </div>
    </Layout>
  );
}
