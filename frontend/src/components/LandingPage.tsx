import { useState, useEffect } from 'react';
import { Sprout, MessageSquare, Globe, Shield, Zap, Users } from 'lucide-react';

interface LandingPageProps {
  onNavigateToChat: () => void;
  onLanguageSelect: (language: string) => void;
}

const languages = [
  { name: 'हिन्दी', code: 'hi', position: 'top-left' },
  { name: 'ગુજરાતી', code: 'gu', position: 'top-right' },
  { name: 'ਪੰਜਾਬੀ', code: 'pa', position: 'bottom-left' },
  { name: 'தமிழ்', code: 'ta', position: 'bottom-right' },
  { name: 'తెలుగు', code: 'te', position: 'left' },
  { name: 'ಕನ್ನಡ', code: 'kn', position: 'right' },
  { name: 'മലയാളം', code: 'ml', position: 'top' },
  { name: 'বাংলা', code: 'bn', position: 'bottom' },
];

const features = [
  {
    icon: Shield,
    title: 'Verified Information',
    description: 'Answers grounded in official government documents',
  },
  {
    icon: Globe,
    title: 'Multilingual Support',
    description: 'Access schemes in your preferred language',
  },
  {
    icon: Zap,
    title: 'Instant Answers',
    description: 'Get immediate guidance on eligibility and applications',
  },
  {
    icon: Users,
    title: 'Farmer Focused',
    description: 'Designed specifically for Indian farmers',
  },
];

export default function LandingPage({ onNavigateToChat, onLanguageSelect }: LandingPageProps) {
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ FIXED: Complete position mapping with proper z-index and sizing
  const getLanguagePosition = (position: string) => {
    const positions: Record<string, string> = {
      'top-left': 'absolute top-8 left-8 z-20',
      'top-right': 'absolute top-8 right-8 z-20',
      'bottom-left': 'absolute bottom-8 left-8 z-20',
      'bottom-right': 'absolute bottom-8 right-8 z-20',
      'left': 'absolute left-6 top-1/2 -translate-y-1/2 z-20',
      'right': 'absolute right-6 top-1/2 -translate-y-1/2 z-20',
      'top': 'absolute top-20 left-1/2 -translate-x-1/2 z-20',
      'bottom': 'absolute bottom-20 left-1/2 -translate-x-1/2 z-20',
    };
    return positions[position] || 'absolute top-8 left-8 z-20';
  };
  
  return (
    <div className="landing-page min-h-screen relative overflow-hidden">
      {/* ✅ FIXED: Container for absolute positioning - MUST be relative */}
      <div className="language-tags-container absolute inset-0 pointer-events-none z-30">
        {languages.map((lang, index) => (
          <div
            key={lang.code}
            className={`language-tag pointer-events-auto ${getLanguagePosition(lang.position)}`}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
            onMouseEnter={() => setHoveredLang(lang.code)}
            onMouseLeave={() => setHoveredLang(null)}
            onClick={() => {
              const languageMap: Record<string, string> = {
                'हिन्दी': 'Hindi',
                'ગુજરાતી': 'Gujarati',
                'ਪੰਜਾਬੀ': 'Punjabi',
                'தமிழ்': 'Tamil',
                'తెలుగు': 'Telugu',
                'ಕನ್ನಡ': 'Kannada',
                'മലയാളം': 'Malayalam',
                'বাংলা': 'Bengali'
              };

              const selected = languageMap[lang.name] || 'English';

                onLanguageSelect(selected);
                onNavigateToChat();
              }}
          >
            <span className={`block px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-all duration-300 ${
              hoveredLang === lang.code 
                ? 'scale-110 bg-green-500 text-white shadow-green-500/50 backdrop-blur-sm' 
                : 'bg-white/80 hover:bg-white text-gray-800 shadow-md hover:shadow-xl'
            }`}>
              {lang.name}
            </span>
          </div>
        ))}
      </div>

      <div className="hero-section">
        <div
          className="hero-background"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        <div className="hero-content">
          <div className="logo-container">
            <div className="logo-3d">
              <Sprout className="logo-icon" size={64} />
            </div>
          </div>

          <h1 className="hero-title">
            <span className="title-line">KrishiNyaya AI</span>
            <span className="title-subtitle">कृषि न्याय एआई</span>
          </h1>

          <p className="hero-description">
            Your trusted AI assistant for government schemes, subsidies, and agricultural guidance
          </p>

          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">Languages</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Schemes</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Available</div>
            </div>
          </div>

          <button className="cta-button" onClick={onNavigateToChat}>
            <MessageSquare size={24} />
            <span>Start Conversation</span>
            <div className="button-glow" />
          </button>
        </div>

        <div className="floating-farmer">
          <img src="/image.png" alt="Farmer Assistant" />
        </div>
      </div>

      <section className="features-section">
        <h2 className="section-title">Why Choose KrishiNyaya AI?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              style={{
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <div className="feature-icon">
                <feature.icon size={32} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Ask Your Question</h3>
            <p>Type or speak your query about schemes</p>
          </div>
          <div className="step-connector" />
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>AI Analysis</h3>
            <p>RAG system searches official documents</p>
          </div>
          <div className="step-connector" />
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Get Answer</h3>
            <p>Receive verified, actionable guidance</p>
          </div>
        </div>
      </section>

      <div className="grain-overlay" />
    </div>
    
  );
}
