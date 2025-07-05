import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface VirtualAssistantProps {
  darkMode: boolean;
}

const VirtualAssistant: React.FC<VirtualAssistantProps> = ({ darkMode }) => {
  const { t } = useTranslation();

  const messages = [
    t("assistant.greeting"),
    t("assistant.card_info"),
    t("assistant.chart_info"),
    t("assistant.sentiment_info"),
    t("assistant.search_info"),
  ];

  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (step < messages.length - 1) setStep(step + 1);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 20000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [step]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end space-x-4">
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
        <img
          src="https://www.telegraph.co.uk/content/dam/business/2025/05/09/TELEMMGLPICT000255920900_17468033740760_trans_NvBQzQNjv4BqKyHt9LyDGHZG95j7JY85mP4Xpit_DMGvdp2n7FDd82k.jpeg?imwidth=1920"
          alt="Sensex Sam"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className={`relative px-5 py-4 rounded-2xl max-w-xs text-sm font-medium leading-relaxed shadow-xl backdrop-blur-md transition-all duration-300 ${
          darkMode ? "bg-black/30 text-white" : "bg-black/40 text-white"
        }`}
      >
        <div className="font-bold text-base mb-2">Warren Buffet</div>
        <p className="transition-opacity duration-700 ease-in-out">
          {messages[step]}
        </p>
        <div
          className={`absolute -left-2 top-6 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent ${
            darkMode ? "border-r-black/30" : "border-r-white/40"
          }`}
        />
      </div>
    </div>
  );
};

export default VirtualAssistant;
