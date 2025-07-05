import React from "react";
import { TrendingUp, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const { t, i18n } = useTranslation();

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        darkMode
          ? "bg-gray-900/80 border-gray-800/50"
          : "bg-white/80 border-gray-200/50"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? "bg-gray-800/50" : "bg-gray-100/50"
              }`}
            >
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h1
                className={`text-2xl font-bold transition-colors ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {t("app_name")}
              </h1>
              <p
                className={`text-sm transition-colors ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("app_tagline")}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select
              onChange={e => i18n.changeLanguage(e.target.value)}
              value={i18n.language}
              className={`text-sm rounded px-2 py-1 border transition-all duration-300 ${
                darkMode
                  ? "bg-gray-800/50 text-white border-gray-700"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="es">Español</option>
            </select>

            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                darkMode
                  ? "bg-gray-800/50 hover:bg-gray-700/50 text-yellow-400"
                  : "bg-gray-100/50 hover:bg-gray-200/50 text-gray-700"
              }`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
