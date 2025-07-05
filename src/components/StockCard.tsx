import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { fetchStockQuote } from "../api/fetchStockQuote";

interface StockCardProps {
  ticker: string;
  darkMode: boolean;
}

const StockCard: React.FC<StockCardProps> = ({ ticker, darkMode }) => {
  const [price, setPrice] = useState<number>(0);
  const [change, setChange] = useState<number>(0);
  const [changePercent, setChangePercent] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);
  const [marketCap, setMarketCap] = useState<string>("—");

  useEffect(() => {
    console.log("Fetching data for", ticker);
    const loadStockData = async () => {
      const data = await fetchStockQuote(ticker);
      console.log("Fetched data:", data);
      setPrice(data.c);
      setChange(data.d);
      setChangePercent(data.dp);
      setVolume(data.v);
      setMarketCap("—"); // placeholder
    };

    loadStockData(); // initial fetch
    const intervalId = setInterval(loadStockData, 1000); // fetch every 1 sec

    return () => clearInterval(intervalId); // cleanup on unmount
  }, [ticker]);

  const isPositive = change >= 0;

  // Format price in Indian Rupees
  const formatINRPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Format change in Indian Rupees
  const formatINRChange = (change: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: "always",
    }).format(change);
  };

  return (
    <div
      className={`backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
        darkMode
          ? "bg-gray-900/40 border-gray-800/50"
          : "bg-white/40 border-gray-200/50"
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
            <h3
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {ticker}
            </h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Live Price (INR)
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
                Volume
              </span>
            </div>
            <p
              className={`text-lg font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {typeof volume === "number"
                ? volume.toLocaleString("en-IN")
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
                Market Cap
              </span>
            </div>
            <p
              className={`text-lg font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {marketCap}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
