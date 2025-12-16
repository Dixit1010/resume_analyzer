import { useTheme } from '../context/ThemeContext';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#030303]' : 'bg-pearl'}`}>
      <Sidebar />
      <div className="flex-1 ml-60 p-8">
        {children}
      </div>
    </div>
  );
}
