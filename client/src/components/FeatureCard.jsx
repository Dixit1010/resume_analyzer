import { motion } from 'framer-motion';
import { Target, Layers, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const icons = {
  target: Target,
  layers: Layers,
  sparkles: Sparkles,
};

export default function FeatureCard({ icon, title, description, delay = 0 }) {
  const Icon = icons[icon];
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`group relative p-6 rounded-2xl border transition-all duration-300 shadow-soft hover:shadow-md ${
        isDark
          ? 'bg-[#0A0A0A] border-gray-800 hover:border-trust-blue/30'
          : 'bg-white border-border-light hover:border-trust-blue/30'
      }`}
    >
      <div className="flex flex-col space-y-4">
        <div className="w-12 h-12 rounded-xl bg-trust-blue/10 flex items-center justify-center group-hover:bg-trust-blue/20 transition-colors">
          <Icon className="w-6 h-6 text-trust-blue" />
        </div>
        <div>
          <h3 className={`text-lg font-bold tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-dark-text'}`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-gray'}`}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
