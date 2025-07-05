// src/pages/NotFound.tsx
import React from "react";
import { BarChart3, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NotFoundProps {
  darkMode: boolean;
}

const NotFound: React.FC<NotFoundProps> = ({ darkMode }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-b from-gray-100 via-white to-gray-100 text-gray-900"
      }`}
    >
      <div className="text-center space-y-6">
        <div className="inline-block p-6 rounded-full border-4 border-red-500 bg-red-100 dark:bg-red-900 animate-bounce-slow">
          <BarChart3 className="w-12 h-12 text-red-500 animate-pulse" />
        </div>

        <h1 className="text-3xl font-extrabold">
          Oops! This stock has vanished like your gains in 2020 📉
        </h1>

        <p className="text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          The page you're looking for couldn't be found. Maybe the ticker is
          broken, or the market just crashed. Let's get you back on track!
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 
            bg-blue-600 text-white hover:bg-blue-700"
        >
          🔁 Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
