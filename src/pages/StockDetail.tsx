
import { AIInsights } from "@/components/dashboard/AIInsights";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Sidebar } from "@/components/layout/Sidebar";
import { StockChart } from "@/components/stocks/StockChart";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { TrendBadge } from "@/components/ui/trend-badge";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStockInfo, getStockQuote, formatToINR } from "@/services/stockService";
import { STOCKS_DATABASE } from "@/data/stocksDatabase";
import { Loader2, IndianRupee, Info, Shield } from "lucide-react";

export default function StockDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const stockSymbol = symbol?.toUpperCase() || "AAPL";
  
  // Find stock in our database for backup info
  const stockInDatabase = STOCKS_DATABASE.find(s => s.symbol === stockSymbol);
  
  // Fetch stock information
  const { data: stockInfo, isLoading: isLoadingInfo } = useQuery({
    queryKey: ['stockInfo', stockSymbol],
    queryFn: () => getStockInfo(stockSymbol),
  });
  
  // Fetch latest quote
  const { data: stockQuote, isLoading: isLoadingQuote } = useQuery({
    queryKey: ['stockQuote', stockSymbol],
    queryFn: () => getStockQuote(stockSymbol),
    refetchInterval: 60000, // Refresh every minute
  });
  
  // Fallback data structure
  const [stockData, setStockData] = useState({
    name: stockInDatabase?.name || `${stockSymbol} Inc.`,
    price: 0,
    change: 0,
    marketCap: "N/A",
    peRatio: 0,
    dividendYield: 0,
    volume: "N/A",
    avgVolume: "N/A",
    high52w: 0,
    low52w: 0,
    description: stockInDatabase 
      ? `${stockInDatabase.name} (${stockSymbol}) is a publicly traded company in the ${stockInDatabase.sector} sector.`
      : `${stockSymbol} is a publicly traded company. This is placeholder data as the actual company information is not available.`,
  });

  // Update stock data when API responses arrive
  useEffect(() => {
    if (stockInfo || stockQuote) {
      setStockData(prevData => {
        const newData = { ...prevData };
        
        if (stockInfo) {
          newData.name = stockInfo.name || newData.name;
          newData.description = stockInfo.description || newData.description;
        }
        
        if (stockQuote) {
          newData.price = stockQuote.lastPrice || prevData.price;
          newData.change = stockQuote.lastPrice - stockQuote.prevClose;
          newData.volume = stockQuote.volume.toLocaleString('en-IN');
        }
        
        return newData;
      });
    }
  }, [stockInfo, stockQuote]);

  const isLoading = isLoadingInfo && isLoadingQuote;

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <Header />
        <PageTransition>
          <main className="p-4 md:p-6">
            <div className="container space-y-6 lg:space-y-8 pb-12">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{stockData.name} ({stockSymbol})</h1>
                    <div className="flex items-center gap-3 mt-1">
                      {isLoading ? (
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      ) : (
                        <>
                          <div className="flex items-center text-2xl font-semibold">
                            <IndianRupee className="h-5 w-5 mr-1" />
                            {stockData.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                          </div>
                          <TrendBadge value={stockData.change} size="lg" />
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Add to Watchlist</Button>
                    <Button>Buy</Button>
                  </div>
                </div>
              </div>

              <StockChart symbol={stockSymbol} initialPrice={stockData.price || 8300} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <GlassCard className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Company Overview</h2>
                  {isLoading ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <>
                      <p className="text-muted-foreground mb-6">{stockData.description}</p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Market Cap</div>
                          <div className="font-medium">{stockData.marketCap}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">P/E Ratio</div>
                          <div className="font-medium">{stockData.peRatio || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Dividend Yield</div>
                          <div className="font-medium">{stockData.dividendYield || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Volume</div>
                          <div className="font-medium">{stockData.volume}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Avg. Volume</div>
                          <div className="font-medium">{stockData.avgVolume}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Sector</div>
                          <div className="font-medium">{stockInDatabase?.sector || "N/A"}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Industry</div>
                          <div className="font-medium">{stockInDatabase?.industry || "N/A"}</div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-between items-center">
                        <Link to="/tax-compliance" className="inline-flex items-center text-sm text-primary hover:underline">
                          <Shield className="h-4 w-4 mr-1" />
                          View Indian Tax & SEBI Regulations
                        </Link>
                        <Button variant="outline" size="sm">
                          <Info className="h-4 w-4 mr-2" />
                          Full Report
                        </Button>
                      </div>
                    </>
                  )}
                </GlassCard>
                
                <AIInsights stockSymbol={stockSymbol} />
              </div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
