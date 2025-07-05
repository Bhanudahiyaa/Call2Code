import React from "react";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer
      className={`border-t transition-all duration-300 ${
        darkMode
          ? "bg-gray-900/80 border-gray-800/50"
          : "bg-white/80 border-gray-200/50"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4
              className={`text-lg font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Market Pulse
            </h4>
            <p
              className={`text-sm mb-4 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Professional stock analysis platform providing real-time market
              data, sentiment analysis, and comprehensive financial insights.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://mail.google.com"
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  darkMode
                    ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300"
                    : "bg-gray-100/50 hover:bg-gray-200/50 text-gray-700"
                }`}
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  darkMode
                    ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300"
                    : "bg-gray-100/50 hover:bg-gray-200/50 text-gray-700"
                }`}
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  darkMode
                    ? "bg-gray-800/50 hover:bg-gray-700/50 text-gray-300"
                    : "bg-gray-100/50 hover:bg-gray-200/50 text-gray-700"
                }`}
              >
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4
              className={`text-lg font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Market Data", "Watchlist", "News"].map(item => (
                <li key={item}>
                  <a
                    href="#"
                    className={`flex items-center space-x-2 text-sm transition-colors hover:text-blue-500 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className={`text-lg font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Legal
            </h4>
            <ul className="space-y-2">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Risk Disclaimer",
                "Cookie Policy",
              ].map(item => (
                <li key={item}>
                  <a
                    href="#"
                    className={`flex items-center space-x-2 text-sm transition-colors hover:text-blue-500 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`mt-8 pt-8 border-t text-center ${
            darkMode ? "border-gray-800/50" : "border-gray-200/50"
          }`}
        >
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            2025 Market Pulse. All rights reserved by Core-4{" "}
            {"{ Bhanu ,Aditya ,Arjun ,Hardik }"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
