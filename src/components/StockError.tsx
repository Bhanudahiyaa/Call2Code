import React, { useMemo } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

interface StockErrorProps {
  ticker: string;
  onRetry: () => void;
  darkMode: boolean;
}

const financeJokesOrQuotes = [
  "“An investment in knowledge pays the best interest.” – Benjamin Franklin",
  "Why did the stock go to therapy? Too many issues.",
  "“Risk comes from not knowing what you’re doing.” – Warren Buffett",
  "My portfolio is like a rollercoaster... except it's always going down.",
  "“In investing, what is comfortable is rarely profitable.” – Robert Arnott",
  "Why did the bear get fired? He kept shorting the market!",
  "“The stock market is filled with individuals who know the price of everything, but the value of nothing.” – Philip Fisher",
  "Money talks... but all mine ever says is goodbye.",
];

const getRandomMessage = () =>
  financeJokesOrQuotes[Math.floor(Math.random() * financeJokesOrQuotes.length)];

const StockError: React.FC<StockErrorProps> = ({
  ticker,
  onRetry,
  darkMode,
}) => {
  const message = useMemo(() => getRandomMessage(), []);

  return (
    <div
      className={`rounded-2xl p-6 border text-center transition-all duration-300 ${
        darkMode
          ? "bg-gray-900/40 border-gray-800/50 text-white"
          : "bg-white/40 border-gray-200/50 text-gray-800"
      }`}
    >
      <div className="w-48 mx-auto mb-4">
        <Player autoplay loop src="/assets/lottie/stock-crash.json" />
      </div>
      <h2 className="text-xl font-bold mb-2">Markets are down… literally!</h2>
      <p className="mb-4">
        Couldn't fetch data for <strong>{ticker}</strong>. Check your connection
        or try again.
      </p>
      <p className="italic text-sm opacity-75 mb-4 max-w-md mx-auto">
        {message}
      </p>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
      >
        Retry
      </button>
    </div>
  );
};

export default StockError;
