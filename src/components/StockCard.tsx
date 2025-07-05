import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Volume2,
} from "lucide-react";
import { fetchStockQuote } from "../api/fetchStockQuote";

interface StockCardProps {
  ticker: string;
  darkMode: boolean;
}

const StockCard: React.FC<StockCardProps> = ({ ticker, darkMode }) => {
  const { t } = useTranslation();
  const [price, setPrice] = useState<number>(0);
  const [change, setChange] = useState<number>(0);
  const [changePercent, setChangePercent] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);
  const [marketCap, setMarketCap] = useState<string>("—");

  useEffect(() => {
    const loadStockData = async () => {
      const data = await fetchStockQuote(ticker);
      setPrice(data.c);
      setChange(data.d);
      setChangePercent(data.dp);
      setVolume(data.v);
      setMarketCap(
        data.marketCapitalization
          ? (Number(data.marketCapitalization) / 1e9).toFixed(2) + "B"
          : "—"
      );
    };

    loadStockData();
    const intervalId = setInterval(loadStockData, 5000);
    return () => clearInterval(intervalId);
  }, [ticker]);

  const isPositive = change >= 0;

  const formatINRPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatINRChange = (change: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: "always",
    }).format(change);
  };

  const speakSummary = () => {
    const summary = `${ticker} is currently trading at ${formatINRPrice(
      price
    )}. The change is ${formatINRChange(change)} (${changePercent.toFixed(
      2
    )} percent).`;

    const utterance = new SpeechSynthesisUtterance(summary);
    utterance.lang = "en-IN";
    utterance.rate = 0.95;
    speechSynthesis.speak(utterance);
  };

  return (
    <div
      className={`backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
        isPositive
          ? darkMode
            ? "bg-green-700/30 border-green-500/30"
            : "bg-green-100/30 border-green-400/50"
          : darkMode
          ? "bg-red-700/30 border-red-500/30"
          : "bg-red-100/30 border-red-400/50"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`p-3 rounded-full ${
              darkMode ? "bg-gray-800/50" : "bg-gray-100/50"
            }`}
          >
            <DollarSign className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {ticker}
              </h3>
              <button
                onClick={speakSummary}
                title="Read Summary"
                className="p-1 rounded hover:scale-110 transition-all"
              >
                <Volume2
                  className={`w-4 h-4 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                />
              </button>
            </div>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t("live_price")}
            </p>
          </div>
        </div>

        <div
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg ${
            isPositive
              ? "bg-green-500/20 text-green-500"
              : "bg-red-500/20 text-red-500"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">
            {typeof changePercent === "number"
              ? `${changePercent.toFixed(2)}%`
              : "—"}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-baseline space-x-2">
          <span
            className={`text-3xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {typeof price === "number" ? formatINRPrice(price) : "—"}
          </span>
          <span
            className={`text-lg font-medium ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {typeof change === "number" ? formatINRChange(change) : "—"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div
            className={`p-3 rounded-lg ${
              darkMode ? "bg-gray-800/30" : "bg-gray-100/30"
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <Activity className="w-4 h-4 text-blue-500" />
              <span
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {t("volume")}
              </span>
            </div>
            <p
              className={`text-lg font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {typeof volume === "number"
                ? volume >= 1e9
                  ? (volume / 1e9).toFixed(2) + "B"
                  : volume >= 1e6
                  ? (volume / 1e6).toFixed(2) + "M"
                  : volume.toLocaleString("en-IN")
                : "—"}
            </p>
          </div>

          <div
            className={`p-3 rounded-lg ${
              darkMode ? "bg-gray-800/30" : "bg-gray-100/30"
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {t("market_cap")}
              </span>
            </div>
            <p
              className={`text-lg font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {typeof marketCap === "string"
                ? marketCap
                : Number(marketCap).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
