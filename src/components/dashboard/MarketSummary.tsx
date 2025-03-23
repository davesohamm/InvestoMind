
import { StatCard } from "@/components/ui/stat-card";
import { 
  TrendingUpIcon, 
  DollarSignIcon, 
  TrendingDownIcon,
  CircleIcon,
  IndianRupee
} from "lucide-react";
import { useEffect, useState } from "react";

// USD to INR conversion rate
const USD_TO_INR_RATE = 83.15;

// Mock data for demonstration with INR values
const MOCK_MARKET_DATA = {
  indices: [
    { id: "sp500", name: "S&P 500", value: 4780.94, change: 0.86 },
    { id: "nasdaq", name: "NASDAQ", value: 16795.20, change: 1.37 },
    { id: "dji", name: "Dow Jones", value: 37468.61, change: -0.31 },
  ],
  cryptos: [
    { id: "btc", name: "Bitcoin", value: 42895.67 * USD_TO_INR_RATE, change: 2.41 },
    { id: "eth", name: "Ethereum", value: 2274.81 * USD_TO_INR_RATE, change: 1.83 },
  ],
  commodities: [
    { id: "gold", name: "Gold", value: 2031.75 * USD_TO_INR_RATE, change: 0.12 },
    { id: "oil", name: "Crude Oil", value: 72.68 * USD_TO_INR_RATE, change: -0.92 },
  ],
};

export function MarketSummary() {
  const [isLoading, setIsLoading] = useState(true);
  const [marketData, setMarketData] = useState(MOCK_MARKET_DATA);

  useEffect(() => {
    // Simulate API fetch with a delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Market Summary</h2>
        <p className="text-muted-foreground">Overview of major indices and assets</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {marketData.indices.map((index) => (
          <StatCard
            key={index.id}
            title={index.name}
            value={index.value.toLocaleString()}
            change={index.change}
            loading={isLoading}
            icon={index.change >= 0 ? <TrendingUpIcon className="h-5 w-5" /> : <TrendingDownIcon className="h-5 w-5" />}
            className="animate-fade-in"
          />
        ))}

        {marketData.cryptos.map((crypto) => (
          <StatCard
            key={crypto.id}
            title={crypto.name}
            value={crypto.value.toLocaleString('en-IN')}
            prefix="₹"
            change={crypto.change}
            loading={isLoading}
            icon={<CircleIcon className="h-5 w-5" />}
            className="animate-fade-in"
          />
        ))}

        {marketData.commodities.map((commodity) => (
          <StatCard
            key={commodity.id}
            title={commodity.name}
            value={commodity.value.toLocaleString('en-IN')}
            prefix="₹"
            change={commodity.change}
            loading={isLoading}
            icon={<IndianRupee className="h-5 w-5" />}
            className="animate-fade-in"
          />
        ))}
      </div>
    </div>
  );
}
