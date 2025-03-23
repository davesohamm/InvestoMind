
import { toast } from "@/components/ui/use-toast";
import { STOCKS_DATABASE } from "@/data/stocksDatabase";

const TIINGO_API_TOKEN = "53ad3f7054832c059d4f65860b42d951228069b8";
const API_BASE_URL = "https://api.tiingo.com";

// Conversion rate (approximate, would be better with a real forex API)
const USD_TO_INR_RATE = 83.15;

export interface StockPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjOpen?: number;
  adjHigh?: number;
  adjLow?: number;
  adjClose?: number;
  adjVolume?: number;
  divCash?: number;
  splitFactor?: number;
}

export interface StockInfo {
  ticker: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  exchangeCode: string;
}

export interface StockQuote {
  ticker: string;
  timestamp: string;
  lastPrice: number;
  prevClose: number;
  open: number;
  high: number;
  low: number;
  mid?: number;
  volume: number;
  bidSize?: number;
  bidPrice?: number;
  askSize?: number;
  askPrice?: number;
}

// Get stock info (company details)
export async function getStockInfo(symbol: string): Promise<StockInfo | null> {
  try {
    // Check if we have this in our database for a fallback
    const stockInDatabase = STOCKS_DATABASE.find(s => s.symbol === symbol);
    
    const response = await fetch(`${API_BASE_URL}/tiingo/daily/${symbol}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${TIINGO_API_TOKEN}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch stock info: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching stock info:", error);
    
    // Fallback to stock database
    const stockInDatabase = STOCKS_DATABASE.find(s => s.symbol === symbol);
    if (stockInDatabase) {
      return {
        ticker: stockInDatabase.symbol,
        name: stockInDatabase.name,
        description: `${stockInDatabase.name} (${symbol}) is a publicly traded company in the ${stockInDatabase.sector} sector, specializing in ${stockInDatabase.industry}.`,
        startDate: "2000-01-01",
        endDate: new Date().toISOString().split('T')[0],
        exchangeCode: "NSE" // Default to NSE for Indian stocks
      };
    }
    
    toast({
      title: "Error",
      description: `Could not fetch information for ${symbol}. Using mock data instead.`,
      variant: "destructive"
    });
    return null;
  }
}

// Get historical price data
export async function getStockPriceHistory(
  symbol: string, 
  startDate: string, 
  endDate: string
): Promise<StockPrice[]> {
  try {
    const url = `${API_BASE_URL}/tiingo/daily/${symbol}/prices?startDate=${startDate}&endDate=${endDate}&format=json`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${TIINGO_API_TOKEN}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch price history: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Convert USD to INR
    return data.map((item: StockPrice) => ({
      ...item,
      open: item.open * USD_TO_INR_RATE,
      high: item.high * USD_TO_INR_RATE,
      low: item.low * USD_TO_INR_RATE,
      close: item.close * USD_TO_INR_RATE,
      adjOpen: item.adjOpen ? item.adjOpen * USD_TO_INR_RATE : undefined,
      adjHigh: item.adjHigh ? item.adjHigh * USD_TO_INR_RATE : undefined,
      adjLow: item.adjLow ? item.adjLow * USD_TO_INR_RATE : undefined,
      adjClose: item.adjClose ? item.adjClose * USD_TO_INR_RATE : undefined,
    }));
  } catch (error) {
    console.error("Error fetching price history:", error);
    toast({
      title: "Error",
      description: `Could not fetch price history for ${symbol}. Using mock data instead.`,
      variant: "destructive"
    });
    
    // Return mock data if API fails
    return generateMockPriceHistory(startDate, endDate);
  }
}

// Get latest quote
export async function getStockQuote(symbol: string): Promise<StockQuote | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/iex/?tickers=${symbol}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${TIINGO_API_TOKEN}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch quote: ${response.statusText}`);
    }
    
    const data = await response.json();
    if (data && data[0]) {
      // Convert USD to INR
      const quote = data[0];
      return {
        ...quote,
        lastPrice: quote.lastPrice * USD_TO_INR_RATE,
        prevClose: quote.prevClose * USD_TO_INR_RATE,
        open: quote.open * USD_TO_INR_RATE,
        high: quote.high * USD_TO_INR_RATE,
        low: quote.low * USD_TO_INR_RATE,
        bidPrice: quote.bidPrice ? quote.bidPrice * USD_TO_INR_RATE : undefined,
        askPrice: quote.askPrice ? quote.askPrice * USD_TO_INR_RATE : undefined,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching stock quote:", error);
    
    // Get stock from mock database
    const stockInDatabase = STOCKS_DATABASE.find(s => s.symbol === symbol);
    if (stockInDatabase) {
      // Create mock quote based on the stock data
      const mockPrice = (stockInDatabase.price ?? 2500 + Math.random() * 1000) * USD_TO_INR_RATE;
      const mockChange = stockInDatabase.change ?? (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 50);
      
      return {
        ticker: symbol,
        timestamp: new Date().toISOString(),
        lastPrice: mockPrice,
        prevClose: mockPrice - mockChange,
        open: mockPrice - (mockChange / 2),
        high: mockPrice + (Math.random() * 20),
        low: mockPrice - (Math.random() * 20),
        volume: Math.floor(Math.random() * 10000000) + 1000000
      };
    }
    
    toast({
      title: "Error",
      description: `Could not fetch latest quote for ${symbol}. Using mock data instead.`,
      variant: "destructive"
    });
    return null;
  }
}

// Generate mock historical data for fallback
function generateMockPriceHistory(startDate: string, endDate: string): StockPrice[] {
  const data: StockPrice[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  let price = (100 + Math.random() * 50) * USD_TO_INR_RATE; // Random starting price between 8300-12400 INR
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    // Skip weekends
    if (d.getDay() === 0 || d.getDay() === 6) continue;
    
    // Random price movement
    const change = (Math.random() - 0.5) * 2 * USD_TO_INR_RATE; // -1 to 1 in INR
    price = Math.max(price + change, 0.1 * USD_TO_INR_RATE);
    
    const open = price;
    const close = price + (Math.random() - 0.5) * 2 * USD_TO_INR_RATE;
    const high = Math.max(open, close) + Math.random() * 1 * USD_TO_INR_RATE;
    const low = Math.min(open, close) - Math.random() * 1 * USD_TO_INR_RATE;
    
    data.push({
      date: new Date(d).toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 10000000) + 1000000
    });
  }
  
  return data;
}

// Format currency to Indian Rupees
export function formatToINR(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(value);
}
