// === src/features/reviews/pages/AtsiliepimaiPage.tsx ===

import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Star, UserCircle, CalendarDays } from 'lucide-react';
import { ReviewsService } from '../services/reviews.service';
import SEO from '../components/SEO';

const AtsiliepimasCard = ({ atsiliepimas, theme }) => {
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-green-900';
  const textColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-200';
  const authorColor = theme === 'light' ? 'text-emerald-950' : 'text-emerald-400';
  const dateColor = theme === 'light' ? 'text-gray-500' : 'text-gray-400';
  const borderColor = theme === 'light' ? 'border-emerald-500' : 'border-emerald-600';
  const starColor = 'text-amber-400';

  const formattedDate = atsiliepimas.review_date
    ? new Date(atsiliepimas.review_date).toLocaleDateString('lt-LT', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Data nepateikta';

  const ivertinimas = parseInt(atsiliepimas.rating) || 0;

  return (
    <div className={`p-6 rounded-lg shadow-lg ${cardBg} ${textColor} transition-colors flex flex-col`}>
      <div className="flex items-center mb-3">
        <UserCircle size={28} className={`mr-3 ${authorColor}`} />
        <div>
          <h3 className={`text-lg font-semibold ${authorColor}`}>{atsiliepimas.name || 'Nežinomas autorius'}</h3>
          {atsiliepimas.hike_title?.trim() && (
            <p className={`text-xs ${dateColor}`}>Žygis: {atsiliepimas.hike_title}</p>
          )}
        </div>
      </div>

      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < ivertinimas ? starColor : (theme === 'light' ? 'text-gray-300' : 'text-gray-600')}
            fill={i < ivertinimas ? starColor : 'none'}
          />
        ))}
      </div>

      <blockquote className={`border-l-4 ${borderColor} pl-4 italic text-md mb-4`}>
        {atsiliepimas.content || 'Atsiliepimo tekstas nepateiktas.'}
      </blockquote>

      <div className={`flex items-center text-sm ${dateColor} mt-auto`}>
        <CalendarDays size={16} className="mr-2" />
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

const AtsiliepimaiPage = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [atsiliepimai, setAtsiliepimai] = useState([]);
  const [error, setError] = useState('');

  const pageBg = theme === 'light' ? 'bg-slate-100' : 'bg-green-700';
  const textColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-100';

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await ReviewsService.list();
        const sorted = (data || []).sort((a, b) => new Date(b.review_date) - new Date(a.review_date));
        setAtsiliepimai(sorted);
      } catch (err) {
        setError('Nepavyko užkrauti atsiliepimų');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const seo = <SEO title="Atsiliepimai" description="Perskaitykite dalyvių atsiliepimus apie RK nuotykius." />;

  if (loading) {
    return (
      <>
        {seo}
        <p className="p-4">Kraunama...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        {seo}
        <p className="p-4 text-red-500">{error}</p>
      </>
    );
  }

  return (
    <>
      {seo}
      <div className={`flex flex-col items-center p-4 md:p-8 ${pageBg} ${textColor} w-full min-h-screen`}>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Mūsų Klientų Atsiliepimai</h1>
        <p className="text-lg md:text-xl mb-10 text-center max-w-2xl">
          Džiaugiamės galėdami dalintis įspūdžiais ir patirtimis, kurias mūsų žygeiviai patiria keliaudami kartu!
        </p>

        {atsiliepimai.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto w-full">
            {atsiliepimai.map(atsl => (
              <AtsiliepimasCard key={atsl.id} atsiliepimas={atsl} theme={theme} />
            ))}
          </div>
        ) : (
          <p className="text-lg">Atsiliepimų kol kas nėra.</p>
        )}
      </div>
    </>
  );
};

export default AtsiliepimaiPage;
