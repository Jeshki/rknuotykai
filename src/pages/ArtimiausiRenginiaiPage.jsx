import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import ZygioKalendoriausKortele from '../components/ZygioKalendoriausKortele';
import RegistracijosForma from '../components/RegistracijosForma';
import Modal from '../components/Modal';
import { HikesService } from '../services/hikes.service';
import SEO from '../components/SEO';

const ArtimiausiRenginiaiPage = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [renginiai, setRenginiai] = useState([]);
  const [selectedZygis, setSelectedZygis] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);

  const pageBgColor = theme === 'light' ? 'bg-neutral-200' : 'bg-emerald-950';
  const pageTextColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-100';

  useEffect(() => {
    (async function () {
      try {
        const res = await HikesService.list();
        const hikes = res.data || [];

        const mapped = hikes
          .filter(h => h.status === 'active')
          .map(h => {
            const d = new Date(h.starts_at);
            const data = d.toISOString().split('T')[0];
            const laikas = d.toTimeString().slice(0, 5);
            return {
              id: h.id,
              pavadinimas: h.title,
              data,
              laikas,
              susitikimoVieta: h.meet_location,
              koordinates: '',
              kaina: h.price,
              aprasymas: h.description,
              expireat: h.valid_until || '',
              statusas: h.status === 'active' ? ['Active'] : [],
              cardPhoto: h.main_image_url || '',
            };
          })
          .sort((a, b) => new Date(a.data) - new Date(b.data));
        setRenginiai(mapped);
      } catch (err) {
        console.error(err);
        setRenginiai([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const isAfterExpire = (expireDate) => {
    if (!expireDate) return false;
    return new Date(expireDate) < new Date();
  };

  const handleRegisterClick = (zygis) => setSelectedZygis(zygis);
  const handleCancelRegistration = () => setSelectedZygis(null);
  const handleSubmitRegistration = (zygis, formData) => {
    setRegistrationData({
      zygisId: zygis.id,
      zygioPavadinimas: zygis.pavadinimas,
      zygioData: zygis.data,
      kaina: zygis.kaina,
      ...formData
    });
    setSelectedZygis(null);
  };
  const handleCloseConfirmationModal = () => setRegistrationData(null);
  const handleSendConfirmationEmail = async () => {
    // jei nori – gali pajungti el. pašto siuntimą backend'e
    return Promise.resolve();
  };

  const seo = <SEO title="Artimiausi renginiai" description="Peržiūrėkite artimiausius RK nuotykių žygius ir registruokitės." />;

  if (loading) {
    return (
      <>
        {seo}
        <p className={`p-4 ${pageTextColor}`}>Kraunama...</p>
      </>
    );
  }

  return (
    <>
      {seo}
      <div className={`min-h-[calc(100vh-80px-100px)] flex flex-col items-center p-4 md:p-8 text-center ${pageBgColor} ${pageTextColor} w-full`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Būsimų žygių kalendorius</h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">Išsirinkite ir registruokitės į artimiausius nuotykius!</p>

      {renginiai.length === 0 ? (
        <p>Šiuo metu nėra aktyvių žygių.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pb-8 w-full">
          {renginiai.map((zygis) => {
            const afterExpire = isAfterExpire(zygis.expireat);
            const isActive = zygis.statusas.includes('Active');

            return (
              <ZygioKalendoriausKortele
                key={zygis.id}
                zygis={zygis}
                onRegisterClick={handleRegisterClick}
                hideRegisterButton={!isActive || afterExpire}
              />
            );
          })}
        </div>
      )}

        {selectedZygis && (
          <RegistracijosForma
            zygis={selectedZygis}
            onSubmitSuccess={handleSubmitRegistration}
            onCancel={handleCancelRegistration}
          />
        )}

        {registrationData && (
          <Modal
            registracijosInfo={registrationData}
            onClose={handleCloseConfirmationModal}
            onSendEmail={handleSendConfirmationEmail}
          />
        )}
      </div>
    </>
  );
};

export default ArtimiausiRenginiaiPage;