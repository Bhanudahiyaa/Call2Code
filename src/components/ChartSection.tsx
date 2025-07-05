import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface ChartSectionProps {
  ticker: string;
  darkMode: boolean;
}

const API_KEY = "d1k5jp9r01ql1h3aqlkgd1k5jp9r01ql1h3aqll0";
const USD_TO_INR = 83.25;

const timeframeMap: Record<
  string,
  { resolution: string; durationDays: number }
> = {
  "1D": { resolution: "5", durationDays: 1 },
  "1W": { resolution: "15", durationDays: 7 },
  "1M": { resolution: "D", durationDays: 30 },
  "3M": { resolution: "D", durationDays: 90 },
  "1Y": { resolution: "W", durationDays: 365 },
  "5Y": { resolution: "M", durationDays: 1825 },
};

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ChartSection: React.FC<ChartSectionProps> = ({ ticker, darkMode }) => {
  const [chartData, setChartData] = useState<{ date: Date; price: number }[]>(
    []
  );
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      const { resolution, durationDays } = timeframeMap[selectedTimeframe];
      const now = Math.floor(Date.now() / 1000);
      const from = now - durationDays * 86400;

      try {
        const url = `https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=${resolution}&from=${from}&to=${now}&token=${API_KEY}`;
        const res = await axios.get(url);
        if (res.data.s === "ok" && res.data.t && res.data.c) {
          const formatted = res.data.t.map((t: number, i: number) => ({
            date: new Date(t * 1000),
            price: res.data.c[i] * USD_TO_INR,
          }));
          setChartData(formatted);
          console.log("Formatted Chart Data:", formatted);
        } else {
          console.warn("No data returned for chart");
          setChartData([]);
        }
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setChartData([]);
      }
    };

    fetchChartData();
  }, [ticker, selectedTimeframe]);

  const formatINRPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  console.log("Final Chart Data State:", chartData);

  const prices = chartData.map(d => d.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 1;
  const priceRange = maxPrice - minPrice || 1;

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
              {ticker} Historical Chart
            </h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Price Movement Over Time (INR)
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {Object.keys(timeframeMap).map(timeframe => (
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
        {chartData.length === 0 ? (
          <div
            className={`h-full flex items-center justify-center text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            No chart data available for this stock.
          </div>
        ) : (
          <Line
            data={{
              labels:
                chartData.length > 0
                  ? chartData.map(d => d.date.toLocaleDateString())
                  : [],
              datasets: [
                {
                  label: "Price (INR)",
                  data: chartData.length > 0 ? chartData.map(d => d.price) : [],
                  borderColor: "#3B82F6",
                  backgroundColor: "rgba(59, 130, 246, 0.3)",
                  tension: 0.4,
                  fill: true,
                  pointRadius: 0,
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      return formatINRPrice(context.parsed.y);
                    },
                  },
                },
              },
              scales: {
                x: {
                  ticks: {
                    color: darkMode ? "#9CA3AF" : "#4B5563",
                  },
                  grid: {
                    color: darkMode ? "#374151" : "#E5E7EB",
                  },
                },
                y: {
                  ticks: {
                    callback: function (value) {
                      return new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(Number(value));
                    },
                    color: darkMode ? "#9CA3AF" : "#4B5563",
                  },
                  grid: {
                    color: darkMode ? "#374151" : "#E5E7EB",
                  },
                },
              },
              layout: {
                padding: {
                  top: 10,
                  bottom: 10,
                },
              },
            }}
            height={250}
          />
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
            Last updated: {new Date().toLocaleTimeString()}
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
