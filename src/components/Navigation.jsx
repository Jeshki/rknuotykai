// === src/features/reviews/pages/Navigation.jsx ===

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { gql, useQuery } from '@apollo/client';
import localLogo from "../assets/logo.png"; // Correct way to import a local image

const GET_LOGO = gql`
  query {
    themeSettings {
      logo {
        sourceUrl
      }
    }
  }
`;

function Navigation() {
  const { theme = 'light' } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, loading, error } = useQuery(GET_LOGO);
  let logoUrl = localLogo;
  if (!loading && !error && data?.themeSettings?.logo?.sourceUrl) {
    logoUrl = data.themeSettings.logo.sourceUrl;
  }
  const navBgColor = theme === 'light' ? 'bg-neutral-200' : 'bg-green-700';
  const navTextColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-100';
  const navHoverColor = theme === 'light' ? 'hover:bg-gray-300' : 'hover:bg-green-600';
  // Only static classNames below
  return (
    <nav className={navBgColor + ' p-2 md:p-4 lg:p-6 shadow-md tablet-nav'}>
      <div className="w-full max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto flex flex-row items-center justify-between py-2 md:py-1 lg:py-0 px-1 md:px-4 lg:px-6 tablet-nav-inner">
        <NavLink to="/" className={"text-sm md:text-lg font-bold " + navTextColor + " flex items-center"}>
          {logoUrl ? <img src={logoUrl} alt="Logo" className="h-10 md:h-14 lg:h-16 w-auto transition-all duration-300" /> : null}
        </NavLink>
  <ul className="hidden md:flex flex-row gap-3 md:gap-5 lg:gap-8 items-center ml-1 md:ml-4 lg:ml-6 tablet-menu justify-center w-full">
          <li><NavLink to="/" className={`text-[9px] md:text-xs lg:text-sm uppercase tracking-wide px-1 py-1 rounded-md ${navTextColor} ${navHoverColor} hover:opacity-90 transition-all duration-200 tablet-link text-center`}>Apie mane</NavLink></li>
          <li><NavLink to="/zygiai" className={`text-[9px] md:text-xs lg:text-sm uppercase tracking-wide px-1 py-1 rounded-md ${navTextColor} ${navHoverColor} hover:opacity-90 transition-all duration-200 tablet-link text-center`}>Žygiai</NavLink></li>
          <li><NavLink to="/paslaugos" className={`text-[9px] md:text-xs lg:text-sm uppercase tracking-wide px-1 py-1 rounded-md ${navTextColor} ${navHoverColor} hover:opacity-80 transition-opacity tablet-link text-center`}>Paslaugos</NavLink></li>
          <li><NavLink to="/artimiausi-renginiai" className={`text-[9px] md:text-xs lg:text-sm uppercase tracking-wide px-1 py-1 rounded-md ${navTextColor} ${navHoverColor} hover:opacity-80 transition-opacity tablet-link text-center`}>Artimiausi renginiai</NavLink></li>
          <li><NavLink to="/atsiliepimai" className={`text-[9px] md:text-xs lg:text-sm uppercase tracking-wide px-1 py-1 rounded-md ${navTextColor} ${navHoverColor} hover:opacity-80 transition-opacity tablet-link text-center`}>Atsiliepimai</NavLink></li>
          <li><NavLink to="/kontaktai" className={`text-[9px] md:text-xs lg:text-sm uppercase tracking-wide px-1 py-1 rounded-md ${navTextColor} ${navHoverColor} hover:opacity-80 transition-opacity tablet-link text-center`}>Kontaktai</NavLink></li>
          <li><ThemeToggle /></li>
        </ul>
        <button className={"md:hidden ml-2 p-3 rounded-lg " + navHoverColor + " focus:outline-none focus:ring-2 focus:ring-green-400"} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} className={navTextColor} /> : <Menu size={24} className={navTextColor} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className={"fixed top-0 right-0 h-full w-4/5 max-w-md " + navBgColor + " z-50 shadow-lg flex flex-col items-start gap-4 pt-16 px-4 md:px-8 transition-transform duration-300 md:hidden"}>
          <button className={"absolute top-4 right-4 p-2 rounded-lg " + navHoverColor + " focus:outline-none focus:ring-2 focus:ring-green-400"} onClick={() => setIsMenuOpen(false)}>
            <X size={28} className={navTextColor} />
          </button>
            <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={`text-sm uppercase tracking-wide px-3 py-2 rounded-lg w-full text-left font-medium ${navTextColor} ${navHoverColor} focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200`}>Apie mane</NavLink>
            <NavLink to="/zygiai" onClick={() => setIsMenuOpen(false)} className={`text-sm uppercase tracking-wide px-3 py-2 rounded-lg w-full text-left font-medium ${navTextColor} ${navHoverColor} focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200`}>Žygiai</NavLink>
            <NavLink to="/paslaugos" onClick={() => setIsMenuOpen(false)} className={`text-sm uppercase tracking-wide px-3 py-2 rounded-lg w-full text-left font-medium ${navTextColor} ${navHoverColor} focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200`}>Paslaugos</NavLink>
            <NavLink to="/artimiausi-renginiai" onClick={() => setIsMenuOpen(false)} className={`text-sm uppercase tracking-wide px-3 py-2 rounded-lg w-full text-left font-medium ${navTextColor} ${navHoverColor} focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200`}>Artimiausi renginiai</NavLink>
            <NavLink to="/atsiliepimai" onClick={() => setIsMenuOpen(false)} className={`text-sm uppercase tracking-wide px-3 py-2 rounded-lg w-full text-left font-medium ${navTextColor} ${navHoverColor} focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200`}>Atsiliepimai</NavLink>
            <NavLink to="/kontaktai" onClick={() => setIsMenuOpen(false)} className={`text-sm uppercase tracking-wide px-3 py-2 rounded-lg w-full text-left font-medium ${navTextColor} ${navHoverColor} focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200`}>Kontaktai</NavLink>
          <div className="w-full mt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
