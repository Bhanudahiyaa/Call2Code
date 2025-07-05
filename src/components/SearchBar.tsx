import React, { useState } from "react";
import { Search, TrendingUp } from "lucide-react";

interface SearchBarProps {
  onSearch: (ticker: string) => void;
  darkMode: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, darkMode }) => {
  const [ticker, setTicker] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticker.trim()) {
      onSearch(ticker.trim().toUpperCase());
    }
  };

  const popularStocks = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "NVDA"];

  return (
    <div
      className={`backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 ${
        darkMode
          ? "bg-gray-900/40 border-gray-800/50"
          : "bg-white/40 border-gray-200/50"
      }`}
    >
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative">
          <Search
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            type="text"
            value={ticker}
            onChange={e => setTicker(e.target.value)}
            placeholder="Enter stock ticker (e.g., APPLE)"
            className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
              darkMode
                ? "bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-400"
                : "bg-white/50 border-gray-300/50 text-gray-900 placeholder-gray-500"
            }`}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105"
          >
            Search
          </button>
        </div>
      </form>

      <div>
        <p
          className={`text-sm font-medium mb-3 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Popular Stocks
        </p>
        <div className="flex flex-wrap gap-2">
          {popularStocks.map(stock => (
            <button
              key={stock}
              onClick={() => onSearch(stock)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                  : "bg-gray-100/50 text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              {stock}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
