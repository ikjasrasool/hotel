import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import MobileNavigation from './components/MobileNavigation';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Mobile Navigation */}
      <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="container mx-auto pb-20">
        {activeTab === 'home' && <Login setActiveTab={setActiveTab} />}
        {activeTab === 'menu' && <Menu />}
        {activeTab === 'about' && <About />}
        {activeTab === 'contact' && <Contact />}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;