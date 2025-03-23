
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Sidebar } from "@/components/layout/Sidebar";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon, StarIcon, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";

// USD to INR conversion rate (approximate)
const USD_TO_INR_RATE = 83.15;

// Mock watchlist data with INR values
const INITIAL_WATCHLIST = [
  { 
    symbol: "AAPL", 
    name: "Apple Inc.", 
    price: 184.25 * USD_TO_INR_RATE, 
    change: 1.25 * USD_TO_INR_RATE, 
    changePercent: 0.68 
  },
  { 
    symbol: "MSFT", 
    name: "Microsoft Corporation", 
    price: 418.32 * USD_TO_INR_RATE, 
    change: 5.23 * USD_TO_INR_RATE, 
    changePercent: 1.27 
  },
  { 
    symbol: "TSLA", 
    name: "Tesla, Inc.", 
    price: 175.18 * USD_TO_INR_RATE, 
    change: -3.45 * USD_TO_INR_RATE, 
    changePercent: -1.93 
  },
  { 
    symbol: "NVDA", 
    name: "NVIDIA Corporation", 
    price: 891.70 * USD_TO_INR_RATE, 
    change: 15.42 * USD_TO_INR_RATE, 
    changePercent: 1.76 
  },
];

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState(INITIAL_WATCHLIST);
  const navigate = useNavigate();
  
  const handleRemoveFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter(stock => stock.symbol !== symbol));
  };
  
  const handleStockClick = (symbol: string) => {
    navigate(`/stocks/${symbol}`);
  };

  const handleAddStock = () => {
    navigate('/stocks');
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <PageTransition>
          <main className="p-6">
            <div className="container pb-12">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-2xl font-bold mb-2">Watchlist</h1>
                    <p className="text-muted-foreground">
                      Track your favorite stocks and investments
                    </p>
                  </div>
                  <Button onClick={handleAddStock}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Stock
                  </Button>
                </div>
                
                {watchlist.length === 0 ? (
                  <GlassCard className="p-10 text-center">
                    <StarIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h2 className="text-xl font-semibold mb-2">Your watchlist is empty</h2>
                    <p className="text-muted-foreground mb-6">
                      Add stocks to your watchlist to keep track of their performance
                    </p>
                    <Button onClick={handleAddStock}>
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add Your First Stock
                    </Button>
                  </GlassCard>
                ) : (
                  <div className="space-y-4">
                    {watchlist.map((stock) => (
                      <GlassCard key={stock.symbol} className="p-4">
                        <div className="flex items-center justify-between">
                          <div 
                            className="flex-1 cursor-pointer"
                            onClick={() => handleStockClick(stock.symbol)}
                          >
                            <h3 className="font-bold text-lg">{stock.symbol}</h3>
                            <p className="text-sm text-muted-foreground">{stock.name}</p>
                          </div>
                          <div className="flex-1 text-center">
                            <div className={`inline-flex px-2 py-1 rounded-full text-sm ${stock.change >= 0 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                            </div>
                          </div>
                          <div className="flex-1 text-right">
                            <p className="font-bold flex items-center justify-end">
                              <IndianRupee className="h-3.5 w-3.5 mr-0.5" />
                              {stock.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRemoveFromWatchlist(stock.symbol)}
                            className="ml-4 text-muted-foreground hover:text-destructive"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
