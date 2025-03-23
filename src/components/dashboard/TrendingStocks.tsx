
import { GlassCard } from "@/components/ui/glass-card";
import { TrendBadge } from "@/components/ui/trend-badge";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { IndianRupee } from "lucide-react";
import { formatToINR } from "@/services/stockService";

// USD to INR conversion rate (approximate)
const USD_TO_INR_RATE = 83.15;

// Mock data for demonstration
const MOCK_TRENDING_STOCKS = [
  {
    id: "AAPL",
    name: "Apple Inc.",
    price: 188.63 * USD_TO_INR_RATE,
    change: 1.24 * USD_TO_INR_RATE,
    volume: "72.5M",
    chart: Array.from({ length: 20 }, (_, i) => ({
      value: (180 + Math.random() * 20) * USD_TO_INR_RATE,
    })),
  },
  {
    id: "MSFT",
    name: "Microsoft Corp.",
    price: 403.78 * USD_TO_INR_RATE, 
    change: 0.87 * USD_TO_INR_RATE,
    volume: "28.2M",
    chart: Array.from({ length: 20 }, (_, i) => ({
      value: (390 + Math.random() * 30) * USD_TO_INR_RATE,
    })),
  },
  {
    id: "RELIANCE.NS",
    name: "Reliance Industries",
    price: 2800.50,
    change: 45.75,
    volume: "12.3M",
    chart: Array.from({ length: 20 }, (_, i) => ({
      value: 2750 + Math.random() * 100,
    })),
  },
  {
    id: "INFY.NS",
    name: "Infosys Ltd.",
    price: 1660.25,
    change: -15.50,
    volume: "8.7M",
    chart: Array.from({ length: 20 }, (_, i) => ({
      value: 1650 + Math.random() * 40,
    })),
  },
  {
    id: "TCS.NS",
    name: "Tata Consultancy Services",
    price: 3890.75,
    change: 35.20,
    volume: "5.2M",
    chart: Array.from({ length: 20 }, (_, i) => ({
      value: 3850 + Math.random() * 80,
    })),
  },
];

export function TrendingStocks() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Trending Stocks</h2>
        <p className="text-muted-foreground">Stocks with high trading activity today</p>
      </div>

      <div className="space-y-4">
        {MOCK_TRENDING_STOCKS.map((stock) => (
          <Link 
            key={stock.id} 
            to={`/stocks/${stock.id}`} 
            className="block transition-transform hover:translate-y-[-2px]"
          >
            <GlassCard className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{stock.name}</div>
                      <div className="text-sm text-muted-foreground">{stock.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold flex items-center justify-end">
                        <IndianRupee className="h-3.5 w-3.5 mr-0.5" />
                        {stock.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </div>
                      <TrendBadge value={stock.change} />
                    </div>
                  </div>
                </div>

                <div className="w-24 h-12 hidden sm:block">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stock.chart}>
                      <defs>
                        <linearGradient id={`gradient-${stock.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="0%"
                            stopColor={stock.change >= 0 ? "hsl(142, 71%, 45%)" : "hsl(0, 84%, 60%)"}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="100%"
                            stopColor={stock.change >= 0 ? "hsl(142, 71%, 45%)" : "hsl(0, 84%, 60%)"}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={stock.change >= 0 ? "hsl(142, 71%, 45%)" : "hsl(0, 84%, 60%)"}
                        strokeWidth={2}
                        fill={`url(#gradient-${stock.id})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-sm text-muted-foreground w-20 text-right">
                  Vol: {stock.volume}
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
