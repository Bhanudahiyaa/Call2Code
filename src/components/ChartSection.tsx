import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";
import {
  BarController,
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  BarElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "chartjs-adapter-date-fns"; // Required for time axis

ChartJS.register(
  BarController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  BarElement
);

interface ChartSectionProps {
  ticker: string;
  darkMode: boolean;
}

const intervalMap: Record<string, string> = {
  "1D": "5min",
  "1W": "15min",
  "1M": "1h",
  "3M": "4h",
  "1Y": "1day",
  "5Y": "1week",
};

const loadingQuotes = [
  "📉 Waiting longer than a bear market...",
  "📊 Compiling more data than Warren Buffet’s portfolio...",
  "🧮 Crunching numbers like a caffeinated quant...",
  "⏳ Rome wasn’t charted in a day...",
];

const errorQuotes = [
  "Oops! This stock has vanished like your gains in 2020. Try another ticker!",
  " Chart not found. Maybe the market took a break, Maybe a KitKat should work?",
  "The chart took a day off. Must be a market holiday!",
];

const ChartSection: React.FC<ChartSectionProps> = ({ ticker, darkMode }) => {
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);
  const [volumeData, setVolumeData] = useState<{ x: string; y: number }[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const API_KEY = import.meta.env.VITE_TWELVE_DATA_KEY;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const interval = intervalMap[selectedTimeframe] || "1day";
        const response = await axios.get(
          "https://api.twelvedata.com/time_series",
          {
            params: {
              symbol: ticker,
              interval,
              outputsize: 100,
              apikey: API_KEY,
            },
          }
        );

        const values = response.data.values || [];
        const reversed = values.reverse();
        setChartData(
          reversed.map((point: any) => ({
            x: point.datetime,
            y: parseFloat(point.close),
          }))
        );
        setVolumeData(
          reversed.map((point: any) => ({
            x: point.datetime,
            y: parseInt(point.volume || "0", 10),
          }))
        );
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setChartData([]);
        setVolumeData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticker, selectedTimeframe]);

  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div
      className={`backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 ${
        darkMode
          ? "bg-gray-900/40 border-gray-800/50"
          : "bg-white/40 border-gray-200/50"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div
            className={`p-3 rounded-full ${
              darkMode ? "bg-gray-800/50" : "bg-gray-100/50"
            }`}
          >
            <BarChart3 className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {ticker} {t("historical_chart", "Historical Chart")}
            </h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t("chart_subtitle", "Price Movement Over Time (INR)")}
            </p>
          </div>
        </div>

        <div className="flex space-x-2">
          {Object.keys(intervalMap).map(timeframe => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 ${
                selectedTimeframe === timeframe
                  ? "bg-blue-500 text-white"
                  : darkMode
                  ? "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                  : "bg-gray-100/50 text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-64 mb-4">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <span className="text-blue-400 mb-2 animate-pulse">
              📊 {t("loading_chart", "Loading chart...")}
            </span>
            <span
              className={`italic text-xs ${
                darkMode ? "text-gray-500" : "text-gray-600"
              }`}
            >
              {loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)]}
            </span>
          </div>
        ) : chartData.length > 0 ? (
          <Line
            data={{
              datasets: [
                {
                  type: "line",
                  label: t("price_label", "Price (INR)"),
                  data: chartData,
                  borderColor: "#3B82F6",
                  backgroundColor: "rgba(59,130,246,0.3)",
                  tension: 0.4,
                  fill: true,
                  pointRadius: 0,
                  borderWidth: 2,
                  yAxisID: "y",
                },
                {
                  type: "bar",
                  label: t("volume_label", "Volume"),
                  data: volumeData,
                  backgroundColor: "rgba(148, 163, 184, 0.4)",
                  borderRadius: 4,
                  yAxisID: "y1",
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: "time",
                  time: { unit: "day" },
                  ticks: {
                    color: darkMode ? "#9CA3AF" : "#4B5563",
                  },
                  grid: {
                    color: darkMode ? "#374151" : "#E5E7EB",
                  },
                },
                y: {
                  position: "left",
                  ticks: {
                    callback: value => formatINR(Number(value)),
                    color: darkMode ? "#9CA3AF" : "#4B5563",
                  },
                  grid: {
                    color: darkMode ? "#374151" : "#E5E7EB",
                  },
                  title: {
                    display: true,
                    text: t("price_axis", "Price"),
                  },
                },
                y1: {
                  position: "right",
                  grid: {
                    drawOnChartArea: false,
                  },
                  ticks: {
                    color: darkMode ? "#A1A1AA" : "#52525B",
                    callback: value => `${Number(value) / 1000}K`,
                  },
                  title: {
                    display: true,
                    text: t("volume_axis", "Volume"),
                  },
                },
              },
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: context =>
                      context.dataset.label === t("volume_label", "Volume")
                        ? `${context.dataset.label}: ${context.parsed.y}`
                        : `${context.dataset.label}: ${formatINR(
                            context.parsed.y
                          )}`,
                  },
                },
              },
            }}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <span className="text-red-400 mb-2">
              🚫 {t("no_chart_data", "No chart data available.")}
            </span>
            <span
              className={`italic text-xs ${
                darkMode ? "text-gray-500" : "text-gray-600"
              }`}
            >
              {errorQuotes[Math.floor(Math.random() * errorQuotes.length)]}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <Calendar
            className={`w-4 h-4 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
            {t("last_updated", "Last updated")}:{" "}
            {new Date().toLocaleTimeString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-green-500 font-medium">
            +12.5% ({selectedTimeframe})
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
