import axios from "axios";

const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

export const fetchStockNews = async (ticker: string) => {
  const today = new Date();
  const to = today.toISOString().split("T")[0];
  const from = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const url = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`;

  const response = await axios.get(url);
  return response.data;
};

export const analyzeSentiment = (
  text: string
): "positive" | "neutral" | "negative" => {
  const positiveWords = [
    "surge",
    "gain",
    "record",
    "profit",
    "growth",
    "strong",
    "beat",
    "upgraded",
    "rally",
    "buy",
  ];
  const negativeWords = [
    "fall",
    "loss",
    "miss",
    "lawsuit",
    "scandal",
    "layoff",
    "weak",
    "down",
    "downgraded",
    "sell",
  ];

  const lower = text.toLowerCase();
  const posScore = positiveWords.filter(word => lower.includes(word)).length;
  const negScore = negativeWords.filter(word => lower.includes(word)).length;

  if (posScore > negScore) return "positive";
  if (negScore > posScore) return "negative";
  return "neutral";
};
