import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { EntrancePortal } from './components/EntrancePortal';
import { ChatBot } from './components/ChatBot';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { MapPage } from './pages/MapPage';
import { ComparePage } from './pages/ComparePage';
import { FloorPlansPage } from './pages/FloorPlansPage';
import { ResidentsPage } from './pages/ResidentsPage';
import { ContactPage } from './pages/ContactPage';
import { InvestorsPage } from './pages/InvestorsPage';
import { AboutPage } from './pages/AboutPage';
import { TourPage } from './pages/TourPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'sonner';
import './App.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasEntered, setHasEntered] = useState(() => {
    return sessionStorage.getItem('yellowstone-entered') === 'true';
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem('yellowstone-entered', 'true');
    setHasEntered(true);
  };

  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        {/* Entrance Portal - shown only on first visit */}
        {!hasEntered && <EntrancePortal onEnter={handleEnter} />}
        
        <div className={`min-h-screen bg-off-white transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/properties/:slug" element={<PropertyDetailPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/floor-plans" element={<FloorPlansPage />} />
              <Route path="/residents" element={<ResidentsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/investors" element={<InvestorsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/tour" element={<TourPage />} />
            </Routes>
          </main>
          <Footer />
          
          {/* AI Chatbot - Available on all pages */}
          <ChatBot />
          
          <Toaster position="top-right" richColors />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
