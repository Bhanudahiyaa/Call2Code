import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import StockCard from "./components/StockCard";
import ChartSection from "./components/ChartSection";
import SentimentPanel from "./components/SentimentPanel";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import FeatureSection from "./components/FeatureSection";
import PopularStocks from "./components/PopularStocks";
import { BarChart3 } from "lucide-react";

function App() {
  const darkMode = true;
  const [selectedTicker, setSelectedTicker] = useState("AAPL");

  useEffect(() => {
    console.log("Selected Ticker:", selectedTicker);
  }, [selectedTicker]);

  return (
    <div className="min-h-screen transition-all duration-300 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

      <Header darkMode={darkMode} />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <SearchBar onSearch={setSelectedTicker} darkMode={darkMode} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <StockCard ticker={selectedTicker} darkMode={darkMode} />
            </div>

            <div className="lg:col-span-2">
              {/* Pass selectedTicker explicitly to ChartSection */}
              <ChartSection ticker={selectedTicker} darkMode={darkMode} />
            </div>
          </div>

          <div className="w-full">
            <SentimentPanel ticker={selectedTicker} darkMode={darkMode} />
          </div>
          <FeatureSection darkMode={darkMode} />
        </div>
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div
                className={`p-3 rounded-full ${
                  darkMode ? "bg-gray-800/50" : "bg-gray-100/50"
                }`}
              >
                <BarChart3 className="w-6 h-6 text-yellow-500" />
              </div>
              <h3
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Top Performing Stocks
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "AAPL",
                "GOOGL",
                "MSFT",
                "TSLA",
                "AMZN",
                "NVDA",
                "META",
                "NFLX",
                "AMD",
                "INTC",
                "ADBE",
                "CRM",
                "ORCL",
                "PYPL",
                "UBER",
              ].map(ticker => (
                <div
                  key={ticker}
                  onClick={() => setSelectedTicker(ticker)}
                  className={`w-full h-20 cursor-pointer p-6 rounded-xl flex items-center space-x-4 transition-all duration-300 hover:scale-105 backdrop-blur-xl ${
                    darkMode
                      ? "bg-gray-800/30 border border-gray-700 text-white"
                      : "bg-white/30 border border-gray-200 text-gray-800"
                  }`}
                >
                  <img
                    src={`https://logo.clearbit.com/${ticker.toLowerCase()}.com`}
                    alt={`${ticker} logo`}
                    className="w-8 h-8 object-contain"
                    onError={e => (e.currentTarget.style.display = "none")}
                  />
                  <span className="text-base font-medium">{ticker}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            onClick={() => setSelectedTicker("TSLA")}
            className={`mt-6 p-6 rounded-2xl flex items-center justify-between hover:scale-105 transition-all duration-300 ${
              darkMode
                ? "bg-gray-900/50 border border-gray-800"
                : "bg-white/50 border border-gray-200"
            }`}
          >
            <div className="flex items-center space-x-4">
              <img
                src="https://logo.clearbit.com/tesla.com"
                alt="Tesla Logo"
                className="w-10 h-10 object-contain"
                onError={e => (e.currentTarget.style.display = "none")}
              />
              <div>
                <h3
                  className={`text-lg font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  TSLA - Tesla Inc.
                </h3>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Click to view full stock insights and chart
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
