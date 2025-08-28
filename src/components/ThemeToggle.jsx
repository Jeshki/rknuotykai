import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const buttonBgColor = theme === 'light' ? 'bg-gray-300' : 'bg-green-800';
  const buttonTextColor = theme === 'light' ? 'text-gray-800' : 'text-slate-100';
  const buttonHover = theme === 'light' ? 'hover:bg-gray-400' : 'hover:bg-green-700';

  return (
      <button
        onClick={toggleTheme}
  className={`px-2 py-1 rounded flex items-center w-fit text-sm sm:text-base ${buttonBgColor} ${buttonTextColor} ${buttonHover} transition-colors`}
      >
      {theme === 'light' ? (
        <Moon className="mr-2" />
      ) : (
        <Sun className="mr-2" />
      )}

      {theme === 'light' ? 'Tamsu' : 'Šviesu'}
    </button>
  );
}

export default ThemeToggle;
