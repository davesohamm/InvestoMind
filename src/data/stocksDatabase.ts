export interface Stock {
  symbol: string;
  name: string;
  sector?: string;
  industry?: string;
  price?: number;
  change?: number;
}

// A comprehensive list of popular stocks
export const STOCKS_DATABASE: Stock[] = [
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology", industry: "Consumer Electronics" },
  { symbol: "MSFT", name: "Microsoft Corporation", sector: "Technology", industry: "Software" },
  { symbol: "GOOGL", name: "Alphabet Inc. Class A", sector: "Communication Services", industry: "Internet Content & Information" },
  { symbol: "GOOG", name: "Alphabet Inc. Class C", sector: "Communication Services", industry: "Internet Content & Information" },
  { symbol: "AMZN", name: "Amazon.com Inc.", sector: "Consumer Discretionary", industry: "Internet Retail" },
  { symbol: "META", name: "Meta Platforms Inc.", sector: "Communication Services", industry: "Internet Content & Information" },
  { symbol: "TSLA", name: "Tesla Inc.", sector: "Consumer Discretionary", industry: "Auto Manufacturers" },
  { symbol: "NVDA", name: "NVIDIA Corporation", sector: "Technology", industry: "Semiconductors" },
  { symbol: "BRK.A", name: "Berkshire Hathaway Inc. Class A", sector: "Financials", industry: "Insurance" },
  { symbol: "BRK.B", name: "Berkshire Hathaway Inc. Class B", sector: "Financials", industry: "Insurance" },
  { symbol: "LLY", name: "Eli Lilly and Company", sector: "Healthcare", industry: "Drug Manufacturers" },
  { symbol: "V", name: "Visa Inc.", sector: "Financials", industry: "Credit Services" },
  { symbol: "UNH", name: "UnitedHealth Group Incorporated", sector: "Healthcare", industry: "Healthcare Plans" },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", sector: "Financials", industry: "Banks" },
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare", industry: "Drug Manufacturers" },
  { symbol: "MA", name: "Mastercard Incorporated", sector: "Financials", industry: "Credit Services" },
  { symbol: "PG", name: "The Procter & Gamble Company", sector: "Consumer Staples", industry: "Household & Personal Products" },
  { symbol: "HD", name: "The Home Depot Inc.", sector: "Consumer Discretionary", industry: "Home Improvement Retail" },
  { symbol: "AVGO", name: "Broadcom Inc.", sector: "Technology", industry: "Semiconductors" },
  { symbol: "MRK", name: "Merck & Co. Inc.", sector: "Healthcare", industry: "Drug Manufacturers" },
  { symbol: "CVX", name: "Chevron Corporation", sector: "Energy", industry: "Oil & Gas Integrated" },
  { symbol: "COST", name: "Costco Wholesale Corporation", sector: "Consumer Staples", industry: "Discount Stores" },
  { symbol: "ABBV", name: "AbbVie Inc.", sector: "Healthcare", industry: "Drug Manufacturers" },
  { symbol: "KO", name: "The Coca-Cola Company", sector: "Consumer Staples", industry: "Beverages" },
  { symbol: "PEP", name: "PepsiCo Inc.", sector: "Consumer Staples", industry: "Beverages" },
  { symbol: "WMT", name: "Walmart Inc.", sector: "Consumer Staples", industry: "Discount Stores" },
  { symbol: "TMO", name: "Thermo Fisher Scientific Inc.", sector: "Healthcare", industry: "Diagnostics & Research" },
  { symbol: "BAC", name: "Bank of America Corporation", sector: "Financials", industry: "Banks" },
  { symbol: "ADBE", name: "Adobe Inc.", sector: "Technology", industry: "Software" },
  { symbol: "CMCSA", name: "Comcast Corporation", sector: "Communication Services", industry: "Entertainment" },
  // Indian Stocks
  { symbol: "RELIANCE.NS", name: "Reliance Industries Limited", sector: "Energy", industry: "Oil & Gas" },
  { symbol: "TCS.NS", name: "Tata Consultancy Services Limited", sector: "Technology", industry: "IT Services" },
  { symbol: "HDFCBANK.NS", name: "HDFC Bank Limited", sector: "Financials", industry: "Banks" },
  { symbol: "INFY.NS", name: "Infosys Limited", sector: "Technology", industry: "IT Services" },
  { symbol: "HINDUNILVR.NS", name: "Hindustan Unilever Limited", sector: "Consumer Staples", industry: "Personal Products" },
  { symbol: "ICICIBANK.NS", name: "ICICI Bank Limited", sector: "Financials", industry: "Banks" },
  { symbol: "SBIN.NS", name: "State Bank of India", sector: "Financials", industry: "Banks" },
  { symbol: "BHARTIARTL.NS", name: "Bharti Airtel Limited", sector: "Communication Services", industry: "Telecom" },
  { symbol: "ITC.NS", name: "ITC Limited", sector: "Consumer Staples", industry: "Tobacco" },
  { symbol: "KOTAKBANK.NS", name: "Kotak Mahindra Bank Limited", sector: "Financials", industry: "Banks" },
  { symbol: "LT.NS", name: "Larsen & Toubro Limited", sector: "Industrials", industry: "Engineering & Construction" },
  { symbol: "AXISBANK.NS", name: "Axis Bank Limited", sector: "Financials", industry: "Banks" },
  { symbol: "WIPRO.NS", name: "Wipro Limited", sector: "Technology", industry: "IT Services" },
  { symbol: "HCLTECH.NS", name: "HCL Technologies Limited", sector: "Technology", industry: "IT Services" },
  { symbol: "ASIANPAINT.NS", name: "Asian Paints Limited", sector: "Materials", industry: "Specialty Chemicals" },
  // Add more stocks here...
];

export function searchStocks(query: string): Stock[] {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  
  return STOCKS_DATABASE.filter(stock => 
    stock.symbol.toLowerCase().includes(lowercaseQuery) || 
    stock.name.toLowerCase().includes(lowercaseQuery)
  ).slice(0, 10); // Limit to 10 results
}
