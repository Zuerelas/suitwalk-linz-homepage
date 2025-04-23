import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './navigation';
import './App.css';

// Import your page components

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/info/strecke" element={<Navigation />} />
        <Route path="/info/another-link" element={<Navigation />} />
        <Route path="/info/yet-another-link" element={<div></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;