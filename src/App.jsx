import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './navigation';
import './App.css';
import Footer from './footer';

// Import your page components
// Example: import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navigation />
        <main className="content-container">
          <Routes>
            <Route path="/" element={<div className="page-content">Home page content</div>} />
            <Route path="/info/strecke" element={<div className="page-content">Strecke content</div>} />
            <Route path="/info/anreise" element={<div className="page-content">Anreise content</div>} />
            <Route path="/info/unterkunfts-moeglichkeiten" element={<div className="page-content">Unterkunftsmöglichkeiten content</div>} />
            <Route path="/info/ablauf" element={<div className="page-content">Ablauf content</div>} />
            <Route path="/info/standort" element={<div className="page-content">Standort content</div>} />
            <Route path="/regeln" element={<div className="page-content">Regeln content</div>} />
            <Route path="/crew" element={<div className="page-content">Crew content</div>} />
            <Route path="*" element={<div className="page-content">Page not found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;