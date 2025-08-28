import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { HikesService } from '../services/hikes.service';

const RegistracijosForma = ({ zygis, onSubmitSuccess, onCancel }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    vardas: '',
    miestas: '',
    telefonas: '',
    email: '', // jei nereikia, gali paslėpti
  });
  const [loading, setLoading] = useState(false);

  const formBg = theme === 'light' ? 'bg-neutral-200' : 'bg-green-700';
  const formTextColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-100';
  const inputBorder = theme === 'light' ? 'border-gray-500' : 'border-neutral-300';
  const inputFocusRing = theme === 'light' ? 'focus:ring-emerald-950' : 'focus:ring-slate-700';
  const inputFocusBorder = theme === 'light' ? 'focus:border-emerald-950' : 'focus:border-slate-700';
  const submitButtonBg = theme === 'light' ? 'bg-emerald-950' : 'bg-green-900';
  const submitButtonTextColor = theme === 'light' ? 'text-slate-100' : 'text-slate-100';
  const cancelButtonBg = 'bg-gray-300';
  const cancelButtonTextColor = 'text-gray-800';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.vardas.trim() || !formData.miestas.trim() || !formData.telefonas.trim()) {
      alert('Būtina nurodyti vardą, miestą ir telefoną.');
      return;
    }

    try {
      setLoading(true);
      // Tavo API laukia: full_name, city, phone
      await HikesService.registerParticipant(zygis.id, {
        full_name: formData.vardas,
        city: formData.miestas,
        phone: formData.telefonas,
      });

      onSubmitSuccess(zygis, formData);
    } catch (error) {
      console.error(error);
      alert('Nepavyko užsiregistruoti. Bandykite dar kartą.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className={`rounded-lg shadow-xl p-8 max-w-lg w-full ${formBg} ${formTextColor} transition-colors duration-300`}>
        <h2 className="text-3xl font-bold mb-6 text-center">
          Registracija į žygį: <br /> {zygis.pavadinimas}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="vardas" className="block text-sm font-semibold mb-2">Vardas ir pavardė:</label>
            <input
              type="text"
              id="vardas"
              name="vardas"
              value={formData.vardas}
              onChange={handleChange}
              required
              className={`w-full p-3 rounded-md border ${inputBorder} focus:border-2 ${inputFocusBorder} focus:ring-1 ${inputFocusRing} bg-transparent ${formTextColor}`}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="miestas" className="block text-sm font-semibold mb-2">Miestas:</label>
            <input
              type="text"
              id="miestas"
              name="miestas"
              value={formData.miestas}
              onChange={handleChange}
              required
              className={`w-full p-3 rounded-md border ${inputBorder} focus:border-2 ${inputFocusBorder} focus:ring-1 ${inputFocusRing} bg-transparent ${formTextColor}`}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="telefonas" className="block text-sm font-semibold mb-2">Telefono numeris:</label>
            <input
              type="tel"
              id="telefonas"
              name="telefonas"
              value={formData.telefonas}
              onChange={handleChange}
              required
              className={`w-full p-3 rounded-md border ${inputBorder} focus:border-2 ${inputFocusBorder} focus:ring-1 ${inputFocusRing} bg-transparent ${formTextColor}`}
            />
          </div>

          {/* Jei nori – palik el. paštą informaciniais tikslais */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">El. paštas (pasirinktinai):</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 rounded-md border ${inputBorder} focus:border-2 ${inputFocusBorder} focus:ring-1 ${inputFocusRing} bg-transparent ${formTextColor}`}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`py-2 px-6 rounded-md font-semibold ${submitButtonBg} ${submitButtonTextColor} hover:opacity-90 transition-opacity`}
            >
              {loading ? 'Siunčiama...' : 'Registruotis'}
            </button>

            <button type="button" className={`py-2 px-6 rounded-md font-semibold ${cancelButtonBg} ${cancelButtonTextColor} hover:opacity-90 transition-opacity`} onClick={onCancel}>
              Atšaukti
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistracijosForma;