import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import ZygisCard from '../components/ZygisCard';
import { HikesService } from '../services/hikes.service';

const ZygiaiPage = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [archivedHikes, setArchivedHikes] = useState([]);

  const pageBgColor = theme === 'light' ? 'bg-neutral-200' : 'bg-green-700';
  const pageTextColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-100';

  useEffect(() => {
    (async () => {
      try {
        const res = await HikesService.list({ archived: true });
        setArchivedHikes(res.data || []);
      } catch (err) {
        console.error('Klaida kraunant archyvuotus žygius:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className={`p-4 ${pageTextColor}`}>Kraunama...</p>;
  if (!archivedHikes.length) {
    return <p className={`p-4 ${pageTextColor}`}>Šiuo metu nėra buvusių žygių. Laukite artimiausių atnaujinimų!</p>;
  }

  return (
    <div className={`min-h-[calc(100vh-80px-100px)] flex flex-col items-center p-4 md:p-8 text-center ${pageBgColor} ${pageTextColor} w-full`}>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Buvusių žygių galerijos</h1>
      <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
        Atraskite mano nuotykius ir įspūdžius iš praeities žygių!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pb-8 w-full">
        {archivedHikes.map((hike) => (
          <ZygisCard
            key={hike.id}
            zygis={{
              pavadinimas: hike.title,
              aprasymas: hike.description,
              nuotraukos: Array.isArray(hike.gallery_links)
                ? hike.gallery_links
                : (hike.gallery_links?.split(',') || []),
              vieta: hike.meet_location || 'Nenurodyta',
              aplankytosVietos: hike.visited_places?.split(',') || [],
              nueitiKm: hike.km_walked || null,
              aplankytiObjektai: [], // galima pridėt jei atsiras
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ZygiaiPage;