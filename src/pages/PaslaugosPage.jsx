import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Footprints, Users, Globe, BookOpen, HeartHandshake, MapPin } from 'lucide-react'; // Pakeista Walk į Footprints
import SEO from '../components/SEO';

function PaslaugosPage() {
  const { theme } = useTheme();

  // Puslapio ir teksto spalvos
  const pageBgColor = theme === 'light' ? 'bg-neutral-200' : 'bg-emerald-950';
  const pageTextColor = theme === 'light' ? 'text-gray-800' : 'text-slate-100';
  const headingColor = theme === 'light' ? 'text-emerald-950' : 'text-slate-100';
  const cardBgColor = theme === 'light' ? 'bg-white' : 'bg-green-900';
  const cardTextColor = theme === 'light' ? 'text-gray-700' : 'text-slate-200';
  const iconColor = theme === 'light' ? 'text-emerald-700' : 'text-slate-200';

  // Paslaugų duomenys su ikonėlėmis
  const services = [
    {
      icon: <Footprints size={40} />, // Pakeista į Footprints ikoną
      title: "Individualūs žygiai",
      description: "Planuojame ir vedame žygius, pritaikytus tik jūsų poreikiams ir tempui. Atraskite Lietuvos gamtos grožį kartu su asmeniniu gidu, pasirinktu maršrutu ir laiku, kuris tinka būtent jums. Puikiai tinka norintiems išskirtinės patirties arba turintiems specifinių pageidavimų."
    },
    {
      icon: <Users size={40} />,
      title: "Grupės žygiai ir renginiai",
      description: "Organizuojame įsimintinus žygius draugų grupėms, įmonių kolektyvams ar šeimos šventėms. Pasirūpiname viskuo – nuo maršruto sudarymo iki užkandžių gamtoje, žaidimų ir įdomių istorijų. Puiki proga sustiprinti komandos dvasią ar praleisti laiką su artimaisiais netradicinėje aplinkoje."
    },
    {
      icon: <Globe size={40} />,
      title: "Užsienio žygiai ir ekspedicijos",
      description: "Nuo kalnų viršūnių iki atokiausių slėnių – organizuojame unikalias žygių ekspedicijas užsienyje. Pasirūpiname logistika, gidu ir saugumu, kad galėtumėte mėgautis nepakartojamais kraštovaizdžiais ir kultūromis visame pasaulyje. Prisijunkite prie mūsų tarptautinių nuotykių!"
    },
    {
      icon: <BookOpen size={40} />,
      title: "Edukacinės programos gamtoje",
      description: "Siūlome interaktyvias edukacines programas mokykloms, darželiams ir visiems, norintiems giliau pažinti gamtą. Mokomės apie vietinę florą ir fauną, orientavimąsi miške, išgyvenimo įgūdžius ir tvarios gyvensenos principus. Mokymasis tampa nuotykiu!"
    },
    {
      icon: <HeartHandshake size={40} />,
      title: "Konsultacijos ir maršrutų kūrimas",
      description: "Jei planuojate žygį savarankiškai, bet trūksta idėjų ar patarimų, siūlome individualias konsultacijas. Padėsiu sudaryti optimalų maršrutą, parinkti tinkamą įrangą, atsakysiu į visus klausimus, susijusius su pasiruošimu ir saugumu gamtoje. Jūsų žygis bus sėkmingas!"
    },
    {
      icon: <MapPin size={40} />,
      title: "Orientavimosi kursai",
      description: "Išmokte pasitikėti kompasu ir žemėlapiu! Vedame praktinius orientavimosi kursus pradedantiesiems ir pažengusiems. Išmoksite skaityti topografinius žemėlapius, naudotis kompasu, GPS prietaisais ir mobiliosiomis programėlėmis. Būkite pasiruošę bet kokiems nuotykiams!"
    }
  ];

  return (
    <>
      <SEO title="Paslaugos" description="RK nuotykiai siūlo individualius ir grupinius žygius bei kitas paslaugas." />
      <div className={`min-h-[calc(100vh-80px-100px)] flex flex-col items-center p-4 md:p-8 ${pageBgColor} ${pageTextColor} w-full`}>
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${headingColor}`}>Mūsų siūlomos paslaugos</h1>
        <p className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12">
          Atraskite platų žygių ir gamtos pažinimo paslaugų asortimentą. Nesvarbu, ar esate patyręs žygeivis, ar tik pradedate savo kelionę gamtoje, mes turime jums tinkamą nuotykių pasiūlymą.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto pb-8 w-full">
          {services.map((service, index) => (
            <div key={index} className={`rounded-lg shadow-xl p-6 flex flex-col items-center text-center ${cardBgColor} ${cardTextColor} transition-colors duration-300`}>
              <div className={`mb-4 ${iconColor}`}>
                {service.icon}
              </div>
              <h2 className={`text-2xl font-bold mb-3 ${headingColor}`}>{service.title}</h2>
              <p className="text-base leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PaslaugosPage;