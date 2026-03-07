import { useState, useRef, useEffect } from 'react';
import { Send, Mic, ArrowLeft, Volume2, Copy, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatInterfaceProps {
  onNavigateBack: () => void;
  language: string;
}

export default function ChatInterface({ onNavigateBack, language }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Namaste! I am KrishiNyaya AI, your guide to government schemes and agricultural policies. How may I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ⭐ BACKEND CALL (ADDED)
  const askBackend = async (question: string) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      const data = await res.json();
      return data.answer;
    } catch (e) {
      return "⚠ Backend connection failed.";
    }
  };

  // ⭐ MODIFIED ONLY LOGIC (UI SAME)
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userText = inputText;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    const backendReply = await askBackend(userText);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: backendReply,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  // ⭐ REAL AUDIO INPUT (ADDED)
  const handleVoiceInput = () => {

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in browser.");
      return;
    }

    if (!recognitionRef.current) {
  recognitionRef.current = new SpeechRecognition();

  // ⭐ Detect speech language from selected UI language
  const langMap: any = {
    English: "en-IN",
    Hindi: "hi-IN",
    Gujarati: "gu-IN",
    Tamil: "ta-IN",
    Telugu: "te-IN",
    Kannada: "kn-IN",
    Malayalam: "ml-IN",
    Bengali: "bn-IN",
    Punjabi: "pa-IN"
  };

  recognitionRef.current.lang = langMap[language] || "en-IN";
  recognitionRef.current.interimResults = false;
}

    const recognition = recognitionRef.current;

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    recognition.start();

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsRecording(false);

      setInputText(transcript);

      // auto send voice query
      const userMessage: Message = {
        id: Date.now().toString(),
        text: transcript,
        sender: 'user',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      const backendReply = await askBackend(transcript);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: backendReply,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      setInputText('');
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <button className="back-button" onClick={onNavigateBack}>
          <ArrowLeft size={24} />
        </button>
        <div className="chat-header-info">
          <div className="chat-avatar">
            <img src="/icon.png" alt="KrishiNyaya AI" />
          </div>
          <div className="chat-header-text">
            <h2>KrishiNyaya AI</h2>
            <p className="chat-status">
              <span className="status-dot" />
              Online • Speaking in {language}
            </p>
          </div>
        </div>
        <button className="voice-button-header">
          <Volume2 size={20} />
        </button>
      </div>

      <div className="chat-background">
        <div className="field-pattern" />
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message-wrapper ${message.sender}`}>
            <div className={`message-bubble ${message.sender}`}>
              {message.sender === 'bot' && (
                <div className="bot-avatar">
                  <img src="/icon.png" alt="Bot" />
                </div>
              )}
              <div className="message-content">
                <p className="message-text">{message.text}</p>
                <div className="message-footer">
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                  {message.sender === 'bot' && (
                    <button
                      className="copy-button"
                      onClick={() => handleCopy(message.text, message.id)}
                    >
                      {copiedId === message.id ? <CheckCheck size={14} /> : <Copy size={14} />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message-wrapper bot">
            <div className="message-bubble bot">
              <div className="bot-avatar">
                <img src="/image.png" alt="Bot" />
              </div>
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="chat-input"
            placeholder="Ask about schemes, eligibility, subsidies..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            className={`voice-input-button ${isRecording ? 'recording' : ''}`}
            onClick={handleVoiceInput}
          >
            <Mic size={20} />
            {isRecording && <span className="recording-pulse" />}
          </button>
          <button
            className="send-button"
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
          >
            <Send size={20} />
          </button>
        </div>
        <p className="input-hint">
          Powered by RAG AI • Grounded in official documents • Work by Shivani
        </p>
      </div>
    </div>
  );
}