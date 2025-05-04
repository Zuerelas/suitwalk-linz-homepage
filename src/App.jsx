import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './pages/template.css';

import Navigation from './navigation';
import Footer from './footer';
import NotFound from './pages/notFound';
import Home from './pages/home';
import Regeln from './pages/regeln';
import Impressum from './pages/impressum';

import Strecke from './pages/info/strecke';
import Anreise from './pages/info/anreise';
import Unterkunft from './pages/info/unterkunft';
import Ablauf from './pages/info/ablauf';

import Suiter from './pages/anmeldung/suiter';
import Spotter from './pages/anmeldung/spotter';
import Sanitaeter from './pages/anmeldung/sanitaeter';
import Fotografen from './pages/anmeldung/fotografen';
import Besucher from './pages/anmeldung/besucher';
import Badges from './pages/anmeldung/badges';

import FotosFotografen from './pages/galerie/fotosFotografen';

import FurmeetLinz from './pages/events/furmeetlinz';
import Mehr from './pages/events/mehr';

import Telegram from './pages/kontakt/telegram';
import Barq from './pages/kontakt/barq';
import X from './pages/kontakt/x';
import Paypal from './pages/kontakt/paypal';

import Crew from './pages/crew';

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
            <Route path="/info/unterkunfts-moeglichkeiten" element={<Unterkunft />} />
            <Route path="/info/ablauf" element={<Ablauf />} />
            <Route path="/anmeldung/suiter" element={<Suiter />} />
            <Route path="/anmeldung/spotter" element={<Spotter />} />
            <Route path="/anmeldung/sanitaeter" element={<Sanitaeter />} />
            <Route path="/anmeldung/fotografen" element={<Fotografen />} />
            <Route path="/anmeldung/besucher" element={<Besucher />} />
            <Route path="/anmeldung/badges" element={<Badges />} />
            <Route path="/anmeldung/erfolgreich" element={<h1>Anmeldung erfolgreich</h1>} />
            <Route path="/api/telegram-auth" element={<h1>Telegram Authorisation</h1>} />
            <Route path="/regeln" element={<Regeln />} />
            <Route path="/galerie/fotos-fotografen" element={<FotosFotografen />} />
            <Route path="/events/furmeet-linz" element={<FurmeetLinz />} />
            <Route path="/events/mehr" element={<Mehr />} />
            <Route path="/kontakt/telegram" element={<Telegram />} />
            <Route path="/kontakt/barq" element={<Barq />} />
            <Route path="/kontakt/x" element={<X />} />
            <Route path="/kontakt/paypal" element={<Paypal />} />
            <Route path="/crew" element={<Crew />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;