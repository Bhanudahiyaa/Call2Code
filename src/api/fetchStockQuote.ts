import axios from "axios";

const API_KEY =
  import.meta.env.VITE_FINNHUB_API_KEY ||
  "d1k5jp9r01ql1h3aqlkgd1k5jp9r01ql1h3aqll0";

export const fetchStockQuote = async (ticker: string) => {
  const url = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`;

  try {
    const response = await axios.get(url);
    console.log(`Fetched quote for ${ticker}:`, response.data); // ✅ Debug line
    return response.data;
  } catch (error) {
    console.error(`Error fetching stock quote for ${ticker}:`, error);
    return {
      c: 187.56,
      d: 2.1,
      dp: 1.13,
      v: 8210000,
    };
  }
};
