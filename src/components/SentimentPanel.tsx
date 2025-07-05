import React, { useEffect, useState } from "react";
import {
  MessageCircle,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react";
import { fetchStockNews, analyzeSentiment } from "../api/fetchStockNews";

interface SentimentPanelProps {
  ticker: string;
  darkMode: boolean;
}

interface NewsItem {
  id: number;
  headline: string;
  sentiment: "positive" | "negative" | "neutral";
  score: number;
  source: string;
  time: string;
  url: string;
}

const SentimentPanel: React.FC<SentimentPanelProps> = ({
  ticker,
  darkMode,
}) => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [fallback, setFallback] = useState<boolean>(false);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      let rawNews = await fetchStockNews(ticker);

      if (!rawNews || rawNews.length === 0) {
        console.log(
          `No news found for ${ticker}. Falling back to general news.`
        );
        setFallback(true);
        rawNews = await fetchStockNews("AAPL"); // fallback to a popular stock as general news
      } else {
        setFallback(false);
      }

      const processed = rawNews.slice(0, 5).map((item: any, idx: number) => {
        const sentiment = analyzeSentiment(item.headline);
        let score = 0;
        if (sentiment === "positive") score = 5 + Math.random() * 4;
        else if (sentiment === "negative") score = -(2 + Math.random() * 6);
        else score = (Math.random() - 0.5) * 3;

        return {
          id: idx + 1,
          headline: item.headline,
          sentiment,
          score,
          source: item.source || "Unknown",
          time: new Date(item.datetime * 1000).toLocaleTimeString(),
          url: item.url || "#",
        };
      });

      setNewsData(processed);
      setLoading(false);
    };

    loadNews();
  }, [ticker]);

  const overallSentiment =
    newsData.length > 0
      ? newsData.reduce((sum, item) => sum + item.score, 0) / newsData.length
      : 0;

  const getSentimentData = (sentiment: number) => {
    if (sentiment > 2) {
      return {
        label: "Bullish",
        color: "text-green-500",
        bgColor: "bg-green-500/20",
        icon: TrendingUp,
      };
    } else if (sentiment < -2) {
      return {
        label: "Bearish",
        color: "text-red-500",
        bgColor: "bg-red-500/20",
        icon: TrendingDown,
      };
    } else {
      return {
        label: "Neutral",
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/20",
        icon: AlertCircle,
      };
    }
  };

  const sentimentData = getSentimentData(overallSentiment);
  const SentimentIcon = sentimentData.icon;

  return (
    <div
      className={`backdrop-blur-xl rounded-2xl p-6 border transition-all duration-500 ${
        darkMode
          ? "bg-gray-900/40 border-gray-800/50"
          : "bg-white/40 border-gray-200/50"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div
            className={`p-3 rounded-full transition-all duration-300 ${
              darkMode ? "bg-gray-800/50" : "bg-gray-100/50"
            }`}
          >
            <MessageCircle className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3
              className={`text-xl font-bold transition-colors duration-300 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Market Sentiment for {ticker}
            </h3>
            {fallback && (
              <p
                className={`text-xs italic ${
                  darkMode ? "text-gray-500" : "text-gray-600"
                }`}
              >
                Showing general news due to no recent updates for "{ticker}".
              </p>
            )}
            <p
              className={`text-sm transition-colors duration-300 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              News & Social Analysis
            </p>
          </div>
        </div>

        <div
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-500 ${sentimentData.bgColor}`}
        >
          <SentimentIcon className={`w-5 h-5 ${sentimentData.color}`} />
          <span className={`font-bold ${sentimentData.color}`}>
            {sentimentData.label}
          </span>
          <span className={`text-sm ${sentimentData.color} opacity-75`}>
            ({overallSentiment.toFixed(1)})
          </span>
        </div>
      </div>

      {loading ? (
        <div
          className={`text-center py-6 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Loading news...
        </div>
      ) : (
        <div className="space-y-4">
          {newsData.map((news, index) => (
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              key={news.id}
              className={`block p-4 rounded-lg border transition-all duration-500 hover:scale-[1.02] cursor-pointer animate-fadeIn ${
                darkMode
                  ? "bg-gray-800/30 border-gray-700/30 hover:bg-gray-700/30"
                  : "bg-white/30 border-gray-200/30 hover:bg-gray-50/30"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4
                  className={`text-sm font-medium leading-relaxed transition-colors duration-300 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {news.headline}
                </h4>
                <div
                  className={`flex items-center space-x-1 ml-4 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                    news.sentiment === "positive"
                      ? "bg-green-500/20 text-green-500"
                      : news.sentiment === "negative"
                      ? "bg-red-500/20 text-red-500"
                      : "bg-yellow-500/20 text-yellow-500"
                  }`}
                >
                  {news.sentiment === "positive" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : news.sentiment === "negative" ? (
                    <TrendingDown className="w-3 h-3" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  <span>{news.score.toFixed(1)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-medium transition-colors duration-300 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {news.source}
                </span>
                <span
                  className={`text-xs transition-colors duration-300 ${
                    darkMode ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  {news.time}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      <div
        className={`mt-6 p-4 rounded-lg border transition-all duration-300 ${
          darkMode
            ? "bg-gray-800/20 border-gray-700/30"
            : "bg-gray-100/20 border-gray-200/30"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h4
              className={`text-sm font-bold mb-1 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Sentiment Score
            </h4>
            <p
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Based on {newsData.length} recent articles
            </p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${sentimentData.color}`}>
              {overallSentiment.toFixed(1)}
            </div>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  overallSentiment > 0 ? "bg-green-500" : "bg-red-500"
                }`}
                style={{
                  width: `${Math.min(Math.abs(overallSentiment) * 10, 100)}%`,
                  marginLeft: overallSentiment < 0 ? "auto" : "0",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentPanel;
