import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ApieManePage from './pages/ApieManePage';
import ArtimiausiRenginiaiPage from './pages/ArtimiausiRenginiaiPage';
import KontaktaiPage from './pages/KontaktaiPage';
import PaslaugosPage from './pages/PaslaugosPage';
import ZygiaiPage from './pages/ZygiaiPage';
import AtsiliepimaiPage from './pages/AtsiliepimaiPage'; 

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<ApieManePage />} />
          <Route path="/apie-mane" element={<ApieManePage />} />
          <Route path="/artimiausi-renginiai" element={<ArtimiausiRenginiaiPage />} />
          <Route path="/kontaktai" element={<KontaktaiPage />} />
          <Route path="/zygiai" element={<ZygiaiPage />} />
          <Route path="/paslaugos" element={<PaslaugosPage />} />
          <Route path="/atsiliepimai" element={<AtsiliepimaiPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;