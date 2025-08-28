import { useTheme } from '../context/ThemeContext';
import { gql, useQuery } from '@apollo/client';

const SITE_INFO = gql`
  query {
    generalSettings {
      title
    }
  }
`;

const Footer = () => {
  const { theme } = useTheme();
  const { data } = useQuery(SITE_INFO);
  const currentYear = new Date().getFullYear();

  const footerBgColor = theme === 'light' ? 'bg-emerald-950' : 'bg-green-800';
  const footerTextColor = theme === 'light' ? 'text-neutral-200' : 'text-slate-100';

  return (
    <footer className={`${footerBgColor} p-4 shadow-md`}>
      <div className={`container mx-auto flex flex-col md:flex-row items-center md:justify-between ${footerTextColor} text-center md:text-left`}>
        <p className="text-sm md:text-base mb-4 md:mb-0">
          © {currentYear} {data?.generalSettings?.title || 'RKNuotykiai'}. Visos teisės saugomos.
        </p>
        <div className="flex flex-row flex-wrap justify-center gap-x-4 md:flex-row md:space-y-0 md:space-x-4 text-sm md:text-base w-full md:w-auto items-center">
          <a href="/privatumo-politika" className="hover:underline">Privatumo politika</a>
          <a href="/naudojimosi-salygos" className="hover:underline">Naudojimosi sąlygos</a>
          <a href="/kontaktai" className="hover:underline">Susisiekite</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;