import { useTheme } from '../context/ThemeContext';

const Modal = ({ registracijosInfo, onClose }) => {
  const { theme } = useTheme();

  const modalBg = theme === 'light' ? 'bg-white' : 'bg-green-900';
  const modalTextColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-100';
  const headingColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-100';
  const closeButtonBg = 'bg-red-500';
  const closeButtonTextColor = 'text-white';
  const paymentInfoBorder = theme === 'light' ? 'border-gray-300' : 'border-gray-600';
  const paymentInfoBg = theme === 'light' ? 'bg-gray-100' : 'bg-green-800';

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('lt-LT', options);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className={`rounded-lg shadow-xl p-8 max-w-lg w-full ${modalBg} ${modalTextColor} transition-colors duration-300`}>
        <h2 className={`text-3xl font-bold mb-4 ${headingColor}`}>Registracija sėkminga!</h2>
        <p className="mb-4">
          Ačiū, kad užsiregistravote į žygį: <strong>{registracijosInfo.zygioPavadinimas}</strong>
        </p>

        <div className={`border ${paymentInfoBorder} p-4 rounded-md mb-6 ${paymentInfoBg}`}>
          <h3 className={`text-xl font-semibold mb-2 ${headingColor}`}>Mokėjimo informacija:</h3>
          <p className="mb-2">
            Mokestį perveskite į sąskaitą:
            <p className="font-bold"><strong>LT887300010176526444</strong> (Swedbank)</p>
          </p>
          <p className="mb-2"><strong>Gavėjas:</strong> Rolandas Kriugžda</p>
          <p>
            <strong>Mokėjimo paskirtyje nurodykite:</strong> {registracijosInfo.miestas}/{formatDate(registracijosInfo.zygioData)} {registracijosInfo.vardas}
          </p>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-600 pt-6 mt-6">
          <div className={`p-4 rounded-md ${paymentInfoBg} border ${paymentInfoBorder}`}>
            <h3 className={`text-xl font-semibold mb-2 ${headingColor}`}>Žygio kaina:</h3>
            <p className="text-2xl font-bold">{registracijosInfo.kaina ? `${registracijosInfo.kaina} €` : 'Nenurodyta'}</p>
          </div>
        </div>

        <button
          className={`py-3 px-6 rounded-md font-semibold mt-6 ${closeButtonBg} ${closeButtonTextColor} hover:opacity-90 transition-opacity`}
          onClick={onClose}
        >
          Uždaryti
        </button>
      </div>
    </div>
  );
};

export default Modal;