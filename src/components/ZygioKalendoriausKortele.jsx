import { useTheme } from '../context/ThemeContext';
import { isPastEvent } from '../lib/date';

const ZygioKalendoriausKortele = ({ zygis, onRegisterClick, hideRegisterButton }) => {
  const { theme } = useTheme();

  const cardBg = theme === 'light' ? 'bg-neutral-100' : 'bg-green-800';
  const cardTextColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-100';
  const headingColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-100';
  const buttonBg = theme === 'light' ? 'bg-emerald-600' : 'bg-slate-100';
  const buttonTextColor = theme === 'light' ? 'text-slate-100' : 'text-emerald-950';
  const linkColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-100';

  const formatDate = (dateString) => {
    if (!dateString) return 'Nenurodyta';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('lt-LT', options);
  };

  const googleMapsUrl = zygis.koordinates
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(zygis.koordinates)}`
    : '#';

  const showRegisterButton = !hideRegisterButton && !isPastEvent(zygis.data);

  return (
    <div className={`rounded-lg shadow-md p-6 flex flex-col justify-between ${cardBg} ${cardTextColor} transition-colors duration-300`}>
      {zygis.cardPhoto ? (
        <div className="mb-4 rounded-md overflow-hidden">
          <img 
            src={zygis.cardPhoto} 
            alt={zygis.pavadinimas || 'Žygio nuotrauka'} 
            className="w-full h-48 object-cover" 
          />
        </div>
      ) : (
        <div className="mb-4 rounded-md overflow-hidden h-48 flex items-center justify-center bg-gray-400 text-gray-800">
          Nėra nuotraukos
        </div>
      )}

      <h3 className={`text-2xl font-bold mb-4 ${headingColor}`}>{zygis.pavadinimas || 'Be pavadinimo'}</h3>
      <p className="mb-2"><strong>Data:</strong> {formatDate(zygis.data)}</p>
      <p className="mb-2"><strong>Laikas:</strong> {zygis.laikas || 'Nenurodyta'}</p>
      <p className="mb-2"><strong>Susitikimo vieta:</strong> {zygis.susitikimoVieta || 'Nenurodyta'}</p>
      <p className="mb-2">
        <strong>Koordinatės:</strong>{' '}
        {zygis.koordinates ? (
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className={`${linkColor} hover:underline`}>
            Žemėlapyje
          </a>
        ) : (
          'Nenurodyta'
        )}
      </p>
      <p className="mb-4"><strong>Kaina:</strong> {zygis.kaina || 'Nenurodyta'} €</p>
      <p className="text-sm italic mb-4">{zygis.aprasymas || 'Aprašymas nepateiktas.'}</p>

      {showRegisterButton ? (
        <button
          className={`py-2 px-4 rounded-md text-lg font-semibold ${buttonBg} ${buttonTextColor} hover:opacity-90 transition-opacity`}
          onClick={() => onRegisterClick(zygis)}
        >
          Registruotis
        </button>
      ) : (
        <p className="font-bold text-gray-500 py-1 px-2 rounded-md text-center">Registracija negalima</p>
      )}
    </div>
  );
};

export default ZygioKalendoriausKortele;
