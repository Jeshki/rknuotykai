import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const buttonBgColor = theme === 'light' ? 'bg-green-700' : 'bg-emerald-950';
  const buttonTextColor = theme === 'light' ? 'text-neutral-200' : 'text-slate-100';

  return (
      <button
        onClick={toggleTheme}
  className={`px-2 py-1 rounded flex items-center w-fit text-sm sm:text-base
                    ${buttonBgColor} ${buttonTextColor}
                    hover:opacity-80 transition-colors`}
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