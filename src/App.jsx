import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Navigation from './navigation';
import Footer from './footer';
import Home from './pages/home';
import Regeln from './pages/regeln';
import Impressum from './pages/impressum';
import Crew from './pages/crew';
import Strecke from './pages/info/strecke';
import Anreise from './pages/info/anreise';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navigation />
        <main className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info/strecke" element={<Strecke />} />
            <Route path="/info/anreise" element={<Anreise />} />
            <Route path="/info/unterkunfts-moeglichkeiten" element={<div className="page-content">Unterkunftsmöglichkeiten content</div>} />
            <Route path="/info/ablauf" element={<div className="page-content">Ablauf content</div>} />
            <Route path="/info/standort" element={<div className="page-content">Standort content</div>} />
            <Route path="/regeln" element={<Regeln />} />
            <Route path="/crew" element={<Crew />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="*" element={<div className="page-content">Page not found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;