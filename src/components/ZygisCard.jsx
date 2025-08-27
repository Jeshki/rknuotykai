import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NextArrow = (props) => {
  const { className, onClick, theme } = props;
  const arrowColorClass = theme === 'light' ? 'text-emerald-950' : 'text-white';
  return (
    <div
      className={`${className} absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-70 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-90 transition-all`}
      onClick={onClick}
    >
      <ChevronRight className={`${arrowColorClass} w-4 h-4`} />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, onClick, theme } = props;
  const arrowColorClass = theme === 'light' ? 'text-emerald-950' : 'text-white';
  return (
    <div
      className={`${className} absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer bg-black bg-opacity-70 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-90 transition-all`}
      onClick={onClick}
    >
      <ChevronLeft className={`${arrowColorClass} w-4 h-4`} />
    </div>
  );
};

const ZygisCard = ({ zygis = {} }) => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  const cardBg = theme === 'light' ? 'bg-slate-100' : 'bg-green-800';
  const cardTextColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-100';
  const headingColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-100';

  const formatText = (text) => text || 'Nenurodyta';
  const formatArray = (arr) => Array.isArray(arr) && arr.length ? arr.join(', ') : 'Nenurodyta';

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow theme={theme} />,
    prevArrow: <PrevArrow theme={theme} />,
    afterChange: (current) => setCurrentSlide(current),
  };

  return (
    <div className={`rounded-lg shadow-md p-6 ${cardBg} ${cardTextColor} transition-colors duration-300`}>
      <h3 className={`text-2xl font-bold mb-4 ${headingColor}`}>{formatText(zygis.pavadinimas)}</h3>
      <p className="mb-2"><strong>Vieta:</strong> {formatText(zygis.vieta)}</p>

      {zygis.nuotraukos.length > 0 ? (
        <div className="relative mb-4">
          <Slider {...sliderSettings}>
            {zygis.nuotraukos.map((foto, index) => (
              <div key={index} className="carousel-image-wrapper">
                <img src={foto} alt={`Nuotrauka ${index + 1}`} className="w-full h-64 object-cover rounded-md" />
              </div>
            ))}
          </Slider>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
            {currentSlide + 1} / {zygis.nuotraukos.length}
          </div>
        </div>
      ) : (
        <p className="mb-4 italic">Nuotraukų nėra.</p>
      )}

      <div className="text-sm italic mb-4" dangerouslySetInnerHTML={{ __html: zygis.aprasymas }} />

      <div className="text-sm">
        <p className="mb-1"><strong>Aplankytos vietos:</strong> {formatArray(zygis.aplankytosVietos)}</p>
        <p className="mb-1"><strong>Nueiti km:</strong> {zygis.nueitiKm ?? 'Nenurodyta'} km</p>
        <p><strong>Aplankyti objektai:</strong> {formatArray(zygis.aplankytiObjektai)}</p>
      </div>
    </div>
  );
};

export default ZygisCard;