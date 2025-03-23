
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Mock data for demonstration
const MOCK_PORTFOLIO_DATA = {
  totalValue: 24567.89,
  dailyChange: 1.34,
  allocation: [
    { name: "Technology", value: 35, color: "hsl(210, 100%, 50%)" },
    { name: "Healthcare", value: 20, color: "hsl(195, 85%, 41%)" },
    { name: "Consumer", value: 15, color: "hsl(246, 100%, 65%)" },
    { name: "Financial", value: 12, color: "hsl(338, 95%, 56%)" },
    { name: "Energy", value: 10, color: "hsl(142, 71%, 45%)" },
    { name: "Other", value: 8, color: "hsl(38, 92%, 50%)" },
  ],
};

export function PortfolioOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Portfolio Overview</h2>
        <p className="text-muted-foreground">Your investment allocation</p>
      </div>

      <GlassCard className="p-6 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Total Value</div>
              <div className="text-3xl font-semibold">${MOCK_PORTFOLIO_DATA.totalValue.toLocaleString()}</div>
            </div>
            
            <div>
              <div className="text-sm text-muted-foreground">Daily Change</div>
              <div className={cn(
                "text-xl font-medium",
                MOCK_PORTFOLIO_DATA.dailyChange >= 0 ? "text-success" : "text-destructive"
              )}>
                {MOCK_PORTFOLIO_DATA.dailyChange >= 0 ? "+" : ""}
                {MOCK_PORTFOLIO_DATA.dailyChange}%
              </div>
            </div>
            
            <div className="pt-4">
              <div className="text-sm font-medium mb-2">Asset Allocation</div>
              <div className="space-y-2">
                {MOCK_PORTFOLIO_DATA.allocation.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3 flex items-center justify-center h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_PORTFOLIO_DATA.allocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {MOCK_PORTFOLIO_DATA.allocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
