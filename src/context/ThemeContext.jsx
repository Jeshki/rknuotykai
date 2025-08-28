import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    const body = document.body;

    body.classList.add('min-h-screen', 'flex', 'flex-col', 'font-inter', 'transition-colors', 'duration-300');

    if (theme === 'light') {
      body.classList.add('bg-neutral-200', 'text-gray-800');
      body.classList.remove('bg-emerald-950', 'text-slate-100');
    } else {
      body.classList.add('bg-emerald-950', 'text-slate-100');
      body.classList.remove('bg-neutral-200', 'text-gray-800');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
