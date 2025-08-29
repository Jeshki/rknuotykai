// === src/pages/KontaktaiPage.tsx ===

import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Phone, Mail, MapPin, Facebook, Send, User, MessageSquare, Smartphone } from 'lucide-react';
import { ContactsService } from '../services/contacts.service';
import SEO from '../components/SEO';

const KontaktaiPage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    vardas: '',
    email: '',
    telefonas: '',
    zinute: '',
  });
  const [formStatus, setFormStatus] = useState('');

  const pageBgColor = theme === 'light' ? 'bg-neutral-200' : 'bg-emerald-950';
  const pageTextColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-100';
  const cardBgColor = theme === 'light' ? 'bg-white' : 'bg-green-900';
  const cardTextColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-100';
  const headingColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-100';
  const inputBorderColor = theme === 'light' ? 'border-slate-400' : 'border-gray-200';
  const inputFocusBorderColor = theme === 'light' ? 'focus:border-emerald-600' : 'focus:border-emerald-400';
  const buttonBgColor = theme === 'light' ? 'bg-emerald-700' : 'bg-emerald-600';
  const buttonTextColor = 'text-white';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vardas || !formData.email || !formData.telefonas || !formData.zinute) {
      setFormStatus('klaida_laukai');
      return;
    }

    setFormStatus('siunciama');
    try {
      await ContactsService.create({
        name: formData.vardas,
        email: formData.email,
        phone: formData.telefonas,
        message: formData.zinute,
      });

      setFormStatus('sekmingai');
      setFormData({ vardas: '', email: '', telefonas: '', zinute: '' });
      setTimeout(() => setFormStatus(''), 5000);
    } catch (error) {
      console.error(error);
      setFormStatus('klaida_siuntimo');
    }
  };

  const RekvizitaiItem = ({ icon, title, children }) => (
    <div className="flex items-start mb-3">
      <div className={`mr-3 mt-1 ${theme === 'light' ? 'text-emerald-950' : 'text-emerald-400'}`}>{icon}</div>
      <div>
        <h3 className={`font-semibold ${headingColor}`}>{title}</h3>
        <div className={`${cardTextColor} text-sm`}>{children}</div>
      </div>
    </div>
  );

  return (
    <>
      <SEO title="Kontaktai" description="Susisiekite su RK nuotykiais dėl žygių ir paslaugų." />
      <div className={`flex flex-col items-center p-4 md:p-8 ${pageBgColor} ${pageTextColor} w-full min-h-screen`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Susisiekite</h1>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">

        {/* Form */}
        <div className={`p-6 md:p-8 rounded-lg shadow-xl ${cardBgColor} ${cardTextColor}`}>
          <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${headingColor}`}>Parašykite mums</h2>
          <form onSubmit={handleSubmit} noValidate>
            {['vardas', 'email', 'telefonas'].map((field, idx) => (
              <div className="mb-4" key={idx}>
                <label htmlFor={field} className="block text-sm font-semibold mb-1">
                  {field === 'vardas' ? 'Vardas' : field === 'email' ? 'El. paštas' : 'Telefono numeris'}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  {field === 'vardas' && <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                  {field === 'email' && <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                  {field === 'telefonas' && <Smartphone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                  <input
                    type={field === 'email' ? 'email' : field === 'telefonas' ? 'tel' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 pl-10 rounded-md border ${inputBorderColor} bg-transparent focus:ring-1 ${inputFocusBorderColor}`}
                    placeholder={`Jūsų ${field}`}
                  />
                </div>
              </div>
            ))}

            <div className="mb-6">
              <label htmlFor="zinute" className="block text-sm font-semibold mb-1">Žinutė <span className="text-red-500">*</span></label>
              <div className="relative">
                <MessageSquare size={18} className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  id="zinute"
                  name="zinute"
                  rows="5"
                  value={formData.zinute}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 pl-10 rounded-md border ${inputBorderColor} bg-transparent focus:ring-1 ${inputFocusBorderColor}`}
                  placeholder="Jūsų žinutė..."
                ></textarea>
              </div>
            </div>

            {formStatus === 'klaida_laukai' && <p className="mb-4 text-sm text-red-500">Prašome užpildyti visus laukelius.</p>}
            {formStatus === 'klaida_siuntimo' && <p className="mb-4 text-sm text-red-500">Klaida siunčiant. Bandykite vėliau.</p>}
            {formStatus === 'sekmingai' && <p className="mb-4 text-sm text-green-500">Ačiū! Žinutė išsiųsta.</p>}

            <button
              type="submit"
              disabled={formStatus === 'siunciama'}
              className={`w-full py-3 px-6 rounded-md font-semibold flex items-center justify-center ${buttonBgColor} ${buttonTextColor} hover:opacity-90 disabled:opacity-50`}
            >
              {formStatus === 'siunciama' ? (
                <svg className="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
              ) : <><Send size={18} className="mr-2" /> Siųsti žinutę</>}
            </button>
          </form>
        </div>

        {/* Rekvizitai */}
        <div className={`p-6 md:p-8 rounded-lg shadow-xl ${cardBgColor} ${cardTextColor} flex flex-col`}>
          <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${headingColor}`}>Rekvizitai</h2>
          <RekvizitaiItem icon={<MapPin size={20} />} title="Adresas">Kaišiadorys, Lietuva</RekvizitaiItem>
          <RekvizitaiItem icon={<Phone size={20} />} title="Telefonas">
            <a href="tel:+37068214393" className="hover:underline">(0-682) 14393</a>
          </RekvizitaiItem>
          <RekvizitaiItem icon={<Mail size={20} />} title="El. paštas">
            <a href="mailto:rknuotykiai@gmail.com" className="hover:underline">rknuotykiai@gmail.com</a>
          </RekvizitaiItem>

          <div className="mt-4 pt-4 border-t border-gray-300">
            <h3 className={`text-xl font-semibold mb-3 ${headingColor}`}>Mokėjimo informacija</h3>
            <p className="mb-1 text-sm"><strong>Gavėjas:</strong> Rolandas Kriugžda</p>
            <p className="mb-1 text-sm"><strong>Veiklos pažyma:</strong> 1224311</p>
            <p className="mb-1 text-sm"><strong>Sąskaita:</strong> LT887300010176526444 (Swedbank)</p>
            <p className="text-sm"><strong>Paskirtis:</strong> Miestas/Data, vardas, pavardė</p>
          </div>

          <div className="mt-auto pt-6">
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${headingColor}`}>Sekite mus</h2>
            <a href="https://www.facebook.com/rknuotykiai" target="_blank" rel="noopener noreferrer"
              className={`inline-flex items-center py-2 px-4 rounded-md font-semibold ${theme === 'light' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
              <Facebook size={20} className="mr-2" /> Facebook
            </a>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default KontaktaiPage;