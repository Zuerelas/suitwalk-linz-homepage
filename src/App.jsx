import { HashRouter, Routes, Route } from 'react-router-dom'; // Changed BrowserRouter to HashRouter
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
import Abmelden from './pages/anmeldung/abmelden';
import Abgemeldet from './pages/anmeldung/abgemeldet';
import Erfolgreich from './pages/anmeldung/erfolgreich';
import Error from './pages/anmeldung/error';

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
    <HashRouter>
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
            <Route path="/anmeldung/abmelden" element={<Abmelden />} />
            <Route path="/anmeldung/erfolgreich" element={<Erfolgreich />} />
            <Route path="/anmeldung/error" element={<Error />} />
            <Route path="/anmeldung/abgemeldet" element={<Abgemeldet />} />
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
    </HashRouter>
  );
}

export default App;