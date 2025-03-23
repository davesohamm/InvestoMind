
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2, IndianRupee } from "lucide-react";
import { getStockPriceHistory, StockPrice, formatToINR } from "@/services/stockService";

interface StockChartProps {
  symbol: string;
  initialPrice?: number;
  className?: string;
}

type TimeRange = "1D" | "1W" | "1M" | "3M" | "1Y" | "5Y";

export function StockChart({ 
  symbol, 
  initialPrice = 150, 
  className 
}: StockChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("1M");
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchStockData = async () => {
      setIsLoading(true);
      
      try {
        const endDate = new Date();
        let startDate = new Date();
        
        // Set start date based on selected range
        switch (timeRange) {
          case "1D":
            startDate.setDate(endDate.getDate() - 1);
            break;
          case "1W":
            startDate.setDate(endDate.getDate() - 7);
            break;
          case "1M":
            startDate.setMonth(endDate.getMonth() - 1);
            break;
          case "3M":
            startDate.setMonth(endDate.getMonth() - 3);
            break;
          case "1Y":
            startDate.setFullYear(endDate.getFullYear() - 1);
            break;
          case "5Y":
            startDate.setFullYear(endDate.getFullYear() - 5);
            break;
        }
        
        // Format dates for API
        const startDateStr = startDate.toISOString().split('T')[0];
        const endDateStr = endDate.toISOString().split('T')[0];
        
        // Fetch stock data from API
        const priceHistory = await getStockPriceHistory(symbol, startDateStr, endDateStr);
        
        // Transform data for chart
        const formattedData = priceHistory.map((day: StockPrice) => ({
          date: new Date(day.date).toLocaleDateString("en-IN", {
            month: timeRange === "1D" ? "numeric" : "short",
            day: "numeric",
            year: timeRange === "1Y" || timeRange === "5Y" ? "numeric" : undefined
          }),
          price: day.close
        }));
        
        setChartData(formattedData);
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
        // Use mock data as fallback
        const mockData = generateMockData(getNumDataPoints(timeRange), initialPrice, getVolatility(timeRange));
        setChartData(mockData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStockData();
  }, [symbol, timeRange, initialPrice]);
  
  // Helper functions for mock data
  const getNumDataPoints = (range: TimeRange): number => {
    switch (range) {
      case "1D": return 24; // Hourly
      case "1W": return 7;
      case "1M": return 30;
      case "3M": return 90;
      case "1Y": return 250; // Trading days in a year
      case "5Y": return 250 * 5;
      default: return 30;
    }
  };
  
  const getVolatility = (range: TimeRange): number => {
    switch (range) {
      case "1D": return 0.5;
      case "1W": return 1;
      case "1M": return 2;
      case "3M": return 4;
      case "1Y": return 10;
      case "5Y": return 25;
      default: return 2;
    }
  };
  
  // Generate mock data for fallback
  const generateMockData = (days: number, startPrice: number, volatility: number) => {
    const data = [];
    let currentPrice = startPrice;

    for (let i = 0; i < days; i++) {
      // Calculate date for X axis
      const date = new Date();
      if (timeRange === "1D") {
        // For 1D, use hourly time points
        date.setHours(date.getHours() - (24 - i));
      } else {
        date.setDate(date.getDate() - (days - i));
      }
      
      // Random price movement
      const change = (Math.random() - 0.5) * (volatility / days * 10);
      currentPrice = Math.max(currentPrice + change, 0.1);
      
      let dateFormat: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
      if (timeRange === "1D") {
        dateFormat = { hour: "numeric" };
      } else if (timeRange === "1Y" || timeRange === "5Y") {
        dateFormat = { month: "short", year: "numeric" };
      }
      
      data.push({
        date: date.toLocaleDateString("en-US", dateFormat),
        price: currentPrice,
      });
    }
    
    return data;
  };
  
  if (isLoading || chartData.length === 0) {
    return (
      <GlassCard className={cn("p-6 flex justify-center items-center min-h-[300px]", className)}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </GlassCard>
    );
  }
  
  const isPositive = chartData[chartData.length - 1].price >= chartData[0].price;
  
  // Calculate price change and percentage
  const startPrice = chartData[0].price;
  const endPrice = chartData[chartData.length - 1].price;
  const priceDifference = endPrice - startPrice;
  const percentageChange = (priceDifference / startPrice) * 100;

  const timeRangeOptions: TimeRange[] = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

  return (
    <GlassCard className={cn("p-6", className)}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xl font-semibold">{symbol} Price Chart</h3>
          <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleTimeString('en-IN')}</div>
        </div>
        
        <div className="flex items-baseline gap-3">
          <div className="text-3xl font-bold flex items-center">
            <IndianRupee className="h-6 w-6 mr-1" />
            {endPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </div>
          <div 
            className={cn(
              "text-lg font-medium flex items-center",
              isPositive ? "text-success" : "text-destructive"
            )}
          >
            {isPositive ? "+" : ""}{priceDifference.toLocaleString('en-IN', { maximumFractionDigits: 2 })} ({isPositive ? "+" : ""}{percentageChange.toFixed(2)}%)
          </div>
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isPositive ? "hsl(142, 71%, 45%)" : "hsl(0, 84%, 60%)"}
                  stopOpacity={0.3}
                />
                <stop 
                  offset="95%" 
                  stopColor={isPositive ? "hsl(142, 71%, 45%)" : "hsl(0, 84%, 60%)"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`}
            />
            <Tooltip 
              formatter={(value: number) => [`${formatToINR(value)}`, 'Price']}
              labelFormatter={(label) => `Date: ${label}`}
              contentStyle={{ background: 'var(--background)', borderColor: 'var(--border)' }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "hsl(142, 71%, 45%)" : "hsl(0, 84%, 60%)"}
              strokeWidth={2}
              fill="url(#colorPrice)"
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex flex-wrap justify-center gap-1 mt-4">
        {timeRangeOptions.map((option) => (
          <Button
            key={option}
            variant={timeRange === option ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange(option)}
            className={cn(
              "rounded-full min-w-12",
              timeRange === option ? "bg-primary" : "bg-background"
            )}
          >
            {option}
          </Button>
        ))}
      </div>
    </GlassCard>
  );
}
