import { useState, useEffect } from "react";

interface ChartDataPoint {
  date: string;
  price: number;
}

type TimeRange = "1M" | "3M" | "6M" | "1Y";

// Cache for storing fetched data
const dataCache = new Map<string, { data: ChartDataPoint[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function useStockChartData(symbol: string, timeRange: TimeRange) {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);

      const cacheKey = `${symbol}-${timeRange}`;
      const cached = dataCache.get(cacheKey);

      // Check if we have valid cached data
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setData(cached.data);
        setLoading(false);
        return;
      }

      try {
        // Calculate date range
        const endDate = new Date();
        const startDate = new Date();
        
        switch (timeRange) {
          case "1M":
            startDate.setMonth(startDate.getMonth() - 1);
            break;
          case "3M":
            startDate.setMonth(startDate.getMonth() - 3);
            break;
          case "6M":
            startDate.setMonth(startDate.getMonth() - 6);
            break;
          case "1Y":
            startDate.setFullYear(startDate.getFullYear() - 1);
            break;
        }

        const formatDate = (date: Date) => date.toISOString().split('T')[0];

        // Using Twelve Data API (free tier allows 8 requests per minute)
        // Alternative: You can also use Alpha Vantage or Yahoo Finance API
        const period1 = Math.floor(startDate.getTime() / 1000);
        const period2 = Math.floor(endDate.getTime() / 1000);
        
        // Using Yahoo Finance via query1.finance.yahoo.com (no API key needed)
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=1d`;

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error("Failed to fetch stock data");
        }

        const result = await response.json();
        
        if (!result.chart?.result?.[0]?.timestamp) {
          throw new Error("Invalid data format");
        }

        const timestamps = result.chart.result[0].timestamp;
        const prices = result.chart.result[0].indicators.quote[0].close;

        const chartData: ChartDataPoint[] = timestamps
          .map((timestamp: number, index: number) => ({
            date: new Date(timestamp * 1000).toLocaleDateString('he-IL', {
              month: 'short',
              day: 'numeric'
            }),
            price: prices[index],
          }))
          .filter((point: ChartDataPoint) => point.price !== null);

        // Cache the data
        dataCache.set(cacheKey, {
          data: chartData,
          timestamp: Date.now(),
        });

        setData(chartData);
      } catch (err) {
        console.error("Error fetching stock chart data:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        
        // Fallback to mock data for demonstration if API fails
        const mockData = generateMockData(timeRange);
        setData(mockData);
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchChartData();
    }
  }, [symbol, timeRange]);

  return { data, loading, error };
}

// Fallback mock data generator
function generateMockData(timeRange: TimeRange): ChartDataPoint[] {
  const points = timeRange === "1M" ? 30 : timeRange === "3M" ? 90 : timeRange === "6M" ? 180 : 365;
  const data: ChartDataPoint[] = [];
  const basePrice = 100 + Math.random() * 100;
  
  for (let i = 0; i < points; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (points - i));
    
    const randomWalk = (Math.random() - 0.5) * 5;
    const price = i === 0 ? basePrice : data[i - 1].price + randomWalk;
    
    data.push({
      date: date.toLocaleDateString('he-IL', { month: 'short', day: 'numeric' }),
      price: Math.max(price, basePrice * 0.5),
    });
  }
  
  return data;
}
