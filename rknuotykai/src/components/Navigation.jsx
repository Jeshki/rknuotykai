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
  let logoUrl = localLogo; // Use the imported local logo as the default

  if (!loading && !error && data?.themeSettings?.logo?.sourceUrl) {
    logoUrl = data.themeSettings.logo.sourceUrl;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navBgColor = theme === 'light' ? 'bg-emerald-950' : 'bg-green-800';
  const navTextColor = theme === 'light' ? 'text-neutral-200' : 'text-slate-100';
  const navActiveLinkColor = theme === 'light' ? 'font-bold text-neutral-200' : 'font-bold text-slate-100';

  return (
    <nav className={`${navBgColor} p-4 shadow-md`}>
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/" className={`text-lg font-bold ${navTextColor}`}>
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-12 md:h-16 w-auto" />
          ) : (
            <span>RK Nuotykiai</span>
          )}
        </NavLink>

        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X size={24} className={navTextColor} />
          ) : (
            <Menu size={24} className={navTextColor} />
          )}
        </button>

        <ul className="hidden md:flex flex-row space-x-4 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-lg uppercase ${isActive ? navActiveLinkColor : ''} ${navTextColor} hover:opacity-80 transition-opacity`
              }
            >
              Apie mane
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/zygiai"
              className={({ isActive }) =>
                `text-lg uppercase ${isActive ? navActiveLinkColor : ''} ${navTextColor} hover:opacity-80 transition-opacity`
              }
            >
              Žygiai
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/paslaugos"
              className={({ isActive }) =>
                `text-lg uppercase ${isActive ? navActiveLinkColor : ''} ${navTextColor} hover:opacity-80 transition-opacity`
              }
            >
              Paslaugos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/artimiausi-renginiai"
              className={({ isActive }) =>
                `text-lg uppercase ${isActive ? navActiveLinkColor : ''} ${navTextColor} hover:opacity-80 transition-opacity`
              }
            >
              Artimiausi renginiai
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/atsiliepimai"
              className={({ isActive }) =>
                `text-lg uppercase ${isActive ? navActiveLinkColor : ''} ${navTextColor} hover:opacity-80 transition-opacity`
              }
            >
              Atsiliepimai
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/kontaktai"
              className={({ isActive }) =>
                `text-lg uppercase ${isActive ? navActiveLinkColor : ''} ${navTextColor} hover:opacity-80 transition-opacity`
              }
            >
              Kontaktai
            </NavLink>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>

      {isMenuOpen && (
        <div className={`md:hidden flex flex-col space-y-4 p-4 ${navBgColor}`}>
          <NavLink
            to="/"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `text-lg uppercase ${isActive ? navActiveLinkColor : ''} ${navTextColor} hover:opacity-80 transition-opacity`
            }
          >
            Apie mane
          </NavLink>
          <NavLink
            to="/zygiai"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `text-lg uppercase ${isActive ? navActiveLinkColor : ''} ${navTextColor} hover:opacity-80 transition-opacity`
            }
          >
            Žygiai
          </NavLink>
          <NavLink
            to="/paslaugos"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `text-lg uppercase ${isActive ? navActiveLinkColor : ''} ${navTextColor} hover:opacity-80 transition-opacity`
            }
          >
            Paslaugos
          </NavLink>
          <NavLink
            to="/artimiausi-renginiai"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `text-lg uppercase ${isActive ? navActiveLinkColor : ''} ${navTextColor} hover:opacity-80 transition-opacity`
            }
          >
            Artimiausi renginiai
          </NavLink>
          <NavLink
            to="/atsiliepimai"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `text-lg uppercase ${isActive ? navActiveLinkColor : ''} ${navTextColor} hover:opacity-80 transition-opacity`
            }
          >
            Atsiliepimai
          </NavLink>
          <NavLink
            to="/kontaktai"
            onClick={toggleMenu}
            className={({ isActive }) =>
              `text-lg uppercase ${isActive ? navActiveLinkColor : ''} ${navTextColor} hover:opacity-80 transition-opacity`
            }
          >
            Kontaktai
          </NavLink>
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
}

export default Navigation;
