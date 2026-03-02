import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'chat'>('landing');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  return (
    <div className="app-container">
      {currentPage === 'landing' ? (
        <LandingPage
          onNavigateToChat={() => setCurrentPage('chat')}
          onLanguageSelect={setSelectedLanguage}
        />
      ) : (
        <ChatInterface
          onNavigateBack={() => setCurrentPage('landing')}
          language={selectedLanguage}
        />
      )}
    </div>
  );
}

export default App;
