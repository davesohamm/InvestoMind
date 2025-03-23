
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Sidebar } from "@/components/layout/Sidebar";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { STOCKS_DATABASE } from "@/data/stocksDatabase";

// Convert stocks database prices to INR
const USD_TO_INR_RATE = 83.15;

// Top Indian Stock sectors
const INDIAN_SECTORS = [
  "Information Technology", 
  "Banking & Finance", 
  "Pharmaceuticals", 
  "Automobiles", 
  "Oil & Gas",
  "Consumer Goods", 
  "Infrastructure", 
  "Telecom"
];

export default function Stocks() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  // Create a composite stock list with Indian symbols
  const POPULAR_STOCKS = [
    { symbol: "RELIANCE.NS", name: "Reliance Industries Ltd.", price: 2843.85, change: 12.45, changePercent: 0.44 },
    { symbol: "TCS.NS", name: "Tata Consultancy Services Ltd.", price: 3876.50, change: 21.35, changePercent: 0.55 },
    { symbol: "INFY.NS", name: "Infosys Ltd.", price: 1657.75, change: -10.25, changePercent: -0.61 },
    { symbol: "HDFCBANK.NS", name: "HDFC Bank Ltd.", price: 1645.30, change: 5.65, changePercent: 0.34 },
    { symbol: "ICICIBANK.NS", name: "ICICI Bank Ltd.", price: 1138.40, change: 8.70, changePercent: 0.77 },
    ...STOCKS_DATABASE.map(stock => ({
      symbol: stock.symbol,
      name: stock.name,
      price: (stock.price || 100) * USD_TO_INR_RATE,
      change: (stock.change || Math.random() * 10 - 5) * USD_TO_INR_RATE,
      changePercent: stock.change && stock.price ? (stock.change / stock.price) * 100 : (Math.random() * 4 - 2),
    }))
  ];
  
  const filteredStocks = POPULAR_STOCKS.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Find matches and navigate to first match
      if (filteredStocks.length > 0) {
        navigate(`/stocks/${filteredStocks[0].symbol}`);
      }
    }
  };
  
  const handleStockClick = (symbol: string) => {
    navigate(`/stocks/${symbol}`);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <Header />
        <PageTransition>
          <main className="p-4 md:p-6">
            <div className="container pb-12">
              <div className="max-w-6xl mx-auto">
                <div className="mb-6 md:mb-8">
                  <h1 className="text-2xl font-bold mb-2">Stocks</h1>
                  <p className="text-muted-foreground">
                    Search and explore stocks across Indian and global markets
                  </p>
                </div>
                
                <div className="mb-6 md:mb-8">
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                      placeholder="Search by stock symbol or company name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit">
                      <SearchIcon className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </form>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8 md:mb-10">
                  {INDIAN_SECTORS.map((sector) => (
                    <Button 
                      key={sector} 
                      variant="outline" 
                      className="h-auto py-3 justify-start"
                    >
                      {sector}
                    </Button>
                  ))}
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Popular Stocks</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredStocks.slice(0, 20).map((stock) => (
                      <GlassCard 
                        key={stock.symbol}
                        className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                        onClick={() => handleStockClick(stock.symbol)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold">{stock.symbol}</h3>
                            <p className="text-sm text-muted-foreground">{stock.name}</p>
                          </div>
                          <div className={`text-right ${stock.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                            <p className="font-bold flex items-center justify-end">
                              <IndianRupee className="h-3.5 w-3.5 mr-0.5" />
                              {stock.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                            </p>
                            <p className="text-sm">
                              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                            </p>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
