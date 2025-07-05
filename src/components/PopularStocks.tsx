import React from "react";

interface PopularStocksProps {
  onSelect: (ticker: string) => void;
  darkMode: boolean;
}

const popularTickers = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "NVDA"];

const PopularStocks: React.FC<PopularStocksProps> = ({
  onSelect,
  darkMode,
}) => {
  return (
    <div
      className={`backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 ${
        darkMode
          ? "bg-gray-900/40 border-gray-800/50"
          : "bg-white/40 border-gray-200/50"
      }`}
    >
      <h2
        className={`text-xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Most Popular Stocks
      </h2>
      <div className="flex flex-wrap gap-3">
        {popularTickers.map(ticker => (
          <button
            key={ticker}
            onClick={() => onSelect(ticker)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
              darkMode
                ? "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                : "bg-gray-100/50 text-gray-700 hover:bg-gray-200/50"
            }`}
          >
            {ticker}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularStocks;
