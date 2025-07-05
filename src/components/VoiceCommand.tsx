import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import tickerMap from "../utils/tickerMap";

interface VoiceCommandProps {
  onSetTicker: (ticker: string) => void;
  onToggleDarkMode: () => void;
  language?: "en-US" | "hi-IN" | "es-ES";
}

const VoiceCommand: React.FC<VoiceCommandProps> = ({
  onSetTicker,
  onToggleDarkMode,
  language = "en-US",
}) => {
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [message, setMessage] = useState("🎤 Tap to Speak");
  const recognitionRef = useRef<any>(null);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 1;
    setSpeaking(true);

    utterance.onend = () => {
      setSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessage("❌ Voice not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onstart = () => setMessage("🎙️ Listening...");
    recognition.onend = () => setMessage("🎤 Tap to Speak");

    recognition.onresult = e => {
      const transcript = e.results[e.results.length - 1][0].transcript
        .trim()
        .toLowerCase();

      // Handle theme
      if (
        transcript.includes("toggle dark mode") ||
        transcript.includes("डार्क मोड") ||
        transcript.includes("modo oscuro")
      ) {
        onToggleDarkMode();
        speak("Dark mode toggled");
        setMessage("🌗 Toggled theme");
        return;
      }

      const showMatch = transcript.match(/(?:show|open|load)?\s*(\w+)/);
      if (showMatch && showMatch[1]) {
        const spokenWord = showMatch[1].toLowerCase();
        const matchedTicker = tickerMap[spokenWord];

        if (matchedTicker) {
          onSetTicker(matchedTicker);
          speak(`Showing chart for ${spokenWord}`);
          setMessage(`📈 Showing ${spokenWord}`);
          return;
        }
      }

      speak("Sorry, I didn’t understand.");
      setMessage("🤔 Didn’t understand.");
    };

    recognition.onerror = () => {
      setMessage("⚠️ Mic Error");
      speak("Microphone error");
    };

    recognitionRef.current = recognition;
    return () => recognition.stop();
  }, [language, onSetTicker, onToggleDarkMode]);

  const toggleMic = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
      {/* Visual Speaking Feedback */}
      {speaking && (
        <div className="flex items-center space-x-2 px-4 py-2 text-sm rounded-lg shadow bg-blue-500/80 text-white animate-pulse">
          <Volume2 className="w-4 h-4" />
          <span>🔊 Speaking...</span>
        </div>
      )}

      {/* Microphone Toggle UI */}
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleMic}
          className={`p-3 rounded-full transition-all duration-300 shadow-md hover:scale-110 ${
            listening ? "bg-red-500/30" : "bg-blue-500/30"
          } backdrop-blur-xl`}
        >
          {listening ? (
            <MicOff className="w-5 h-5 text-white" />
          ) : (
            <Mic className="w-5 h-5 text-white" />
          )}
        </button>
        <span className="px-3 py-1 text-sm rounded-lg bg-black/60 text-white backdrop-blur-sm">
          {message}
        </span>
      </div>
    </div>
  );
};

export default VoiceCommand;
