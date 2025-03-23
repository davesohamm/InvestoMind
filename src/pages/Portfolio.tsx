
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Sidebar } from "@/components/layout/Sidebar";
import { GlassCard } from "@/components/ui/glass-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { PlusIcon, IndianRupee, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Mock stock holdings data
const MOCK_HOLDINGS = [
  {
    symbol: "RELIANCE.NS",
    name: "Reliance Industries Ltd.",
    quantity: 10,
    avgCost: 2780.50,
    currentPrice: 2843.85,
    value: 28438.50,
    profit: 633.50,
    profitPercentage: 2.28,
    dayChange: 1.25,
  },
  {
    symbol: "TCS.NS",
    name: "Tata Consultancy Services",
    quantity: 5,
    avgCost: 3750.80,
    currentPrice: 3876.50,
    value: 19382.50,
    profit: 628.50,
    profitPercentage: 3.35,
    dayChange: 0.55,
  },
  {
    symbol: "INFY.NS",
    name: "Infosys Ltd.",
    quantity: 15,
    avgCost: 1680.40,
    currentPrice: 1657.75,
    value: 24866.25,
    profit: -339.75,
    profitPercentage: -1.35,
    dayChange: -0.61,
  },
  {
    symbol: "HDFCBANK.NS",
    name: "HDFC Bank Ltd.",
    quantity: 12,
    avgCost: 1620.75,
    currentPrice: 1645.30,
    value: 19743.60,
    profit: 294.60,
    profitPercentage: 1.51,
    dayChange: 0.34,
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: 3,
    avgCost: 15250.30, // ~$183.25 in INR
    currentPrice: 15682.35, // ~$188.60 in INR
    value: 47047.05,
    profit: 1296.15,
    profitPercentage: 2.83,
    dayChange: 0.68,
  },
];

// Mock sector allocation data for pie chart
const MOCK_SECTOR_ALLOCATION = [
  { name: "Technology", value: 45 },
  { name: "Energy", value: 18 },
  { name: "Financial Services", value: 15 },
  { name: "Healthcare", value: 12 },
  { name: "Consumer Goods", value: 10 },
];

// Mock performance history data
const MOCK_PERFORMANCE_HISTORY = [
  { month: "Jan", balance: 120000 },
  { month: "Feb", balance: 124500 },
  { month: "Mar", balance: 122000 },
  { month: "Apr", balance: 128000 },
  { month: "May", balance: 135000 },
  { month: "Jun", balance: 134000 },
  { month: "Jul", balance: 140000 },
  { month: "Aug", balance: 142000 },
  { month: "Sep", balance: 139000 },
  { month: "Oct", balance: 145000 },
  { month: "Nov", balance: 149000 },
  { month: "Dec", balance: 152000 },
];

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function Portfolio() {
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);
  const [totalProfitLossPercent, setTotalProfitLossPercent] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Calculate portfolio totals
    const totalValue = MOCK_HOLDINGS.reduce((acc, holding) => acc + holding.value, 0);
    const totalCost = MOCK_HOLDINGS.reduce((acc, holding) => acc + (holding.avgCost * holding.quantity), 0);
    const profitLoss = totalValue - totalCost;
    const profitLossPercent = (profitLoss / totalCost) * 100;
    
    setTotalPortfolioValue(totalValue);
    setTotalProfitLoss(profitLoss);
    setTotalProfitLossPercent(profitLossPercent);
  }, []);

  const handleAddInvestment = () => {
    navigate('/stocks');
    toast({
      title: "Add Investment",
      description: "Navigate to the Stocks page to find and add investments to your portfolio.",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <Header />
        <PageTransition>
          <main className="p-4 md:p-6">
            <div className="container pb-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h1 className="text-2xl font-bold mb-1">My Portfolio</h1>
                  <p className="text-muted-foreground">
                    Track and manage your investments
                  </p>
                </div>
                <Button onClick={handleAddInvestment}>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Investment
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <GlassCard className="p-4 md:p-6">
                  <div className="text-sm text-muted-foreground mb-1">Total Portfolio Value</div>
                  <div className="text-2xl md:text-3xl font-bold flex items-center">
                    <IndianRupee className="h-6 w-6 mr-1" />
                    {totalPortfolioValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </div>
                </GlassCard>
                
                <GlassCard className="p-4 md:p-6">
                  <div className="text-sm text-muted-foreground mb-1">Total Profit/Loss</div>
                  <div className={`text-2xl md:text-3xl font-bold flex items-center ${totalProfitLoss >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {totalProfitLoss >= 0 ? (
                      <ArrowUpRight className="h-6 w-6 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-6 w-6 mr-1" />
                    )}
                    <IndianRupee className="h-6 w-6 mr-1" />
                    {Math.abs(totalProfitLoss).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </div>
                </GlassCard>
                
                <GlassCard className="p-4 md:p-6">
                  <div className="text-sm text-muted-foreground mb-1">Returns</div>
                  <div className={`text-2xl md:text-3xl font-bold flex items-center ${totalProfitLossPercent >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {totalProfitLossPercent >= 0 ? (
                      <ArrowUpRight className="h-6 w-6 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-6 w-6 mr-1" />
                    )}
                    {Math.abs(totalProfitLossPercent).toFixed(2)}%
                  </div>
                </GlassCard>
              </div>

              <Tabs defaultValue="holdings" className="mb-8">
                <TabsList className="mb-6">
                  <TabsTrigger value="holdings">Holdings</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="allocation">Allocation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="holdings">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 font-medium">Stock</th>
                          <th className="text-right py-3 font-medium">Qty</th>
                          <th className="text-right py-3 font-medium">Avg Cost</th>
                          <th className="text-right py-3 font-medium">Current Price</th>
                          <th className="text-right py-3 font-medium">Value</th>
                          <th className="text-right py-3 font-medium">P&L</th>
                          <th className="text-right py-3 font-medium">Day</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MOCK_HOLDINGS.map((holding) => (
                          <tr key={holding.symbol} className="border-b hover:bg-accent/20">
                            <td className="py-3">
                              <div className="font-medium">{holding.symbol}</div>
                              <div className="text-sm text-muted-foreground">{holding.name}</div>
                            </td>
                            <td className="text-right py-3">{holding.quantity}</td>
                            <td className="text-right py-3">
                              <div className="flex items-center justify-end">
                                <IndianRupee className="h-3.5 w-3.5 mr-0.5" />
                                {holding.avgCost.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                              </div>
                            </td>
                            <td className="text-right py-3">
                              <div className="flex items-center justify-end">
                                <IndianRupee className="h-3.5 w-3.5 mr-0.5" />
                                {holding.currentPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                              </div>
                            </td>
                            <td className="text-right py-3">
                              <div className="flex items-center justify-end font-medium">
                                <IndianRupee className="h-3.5 w-3.5 mr-0.5" />
                                {holding.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                              </div>
                            </td>
                            <td className={`text-right py-3 ${holding.profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                              <div className="flex flex-col items-end">
                                <div className="flex items-center">
                                  <IndianRupee className="h-3.5 w-3.5 mr-0.5" />
                                  {Math.abs(holding.profit).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                                </div>
                                <div className="text-sm">
                                  {holding.profit >= 0 ? '+' : '-'}{Math.abs(holding.profitPercentage).toFixed(2)}%
                                </div>
                              </div>
                            </td>
                            <td className={`text-right py-3 ${holding.dayChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                              {holding.dayChange >= 0 ? '+' : ''}{holding.dayChange.toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="performance">
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Portfolio Performance</h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={MOCK_PERFORMANCE_HISTORY}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                          <XAxis dataKey="month" />
                          <YAxis
                            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                          />
                          <Tooltip 
                            formatter={(value: number) => [
                              `₹${value.toLocaleString('en-IN')}`, 
                              'Portfolio Value'
                            ]}
                            contentStyle={{ background: 'var(--background)', borderColor: 'var(--border)' }}
                          />
                          <Line
                            type="monotone"
                            dataKey="balance"
                            stroke="hsl(var(--primary))"
                            strokeWidth={3}
                            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </GlassCard>
                </TabsContent>
                
                <TabsContent value="allocation">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <GlassCard className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Sector Allocation</h3>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={MOCK_SECTOR_ALLOCATION}
                              cx="50%"
                              cy="50%"
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {MOCK_SECTOR_ALLOCATION.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value: number) => [`${value}%`, 'Allocation']}
                              contentStyle={{ background: 'var(--background)', borderColor: 'var(--border)' }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </GlassCard>
                    
                    <GlassCard className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Holdings by Value</h3>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={MOCK_HOLDINGS}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis 
                              type="number" 
                              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                            />
                            <YAxis 
                              type="category" 
                              dataKey="symbol" 
                              width={80}
                            />
                            <Tooltip 
                              formatter={(value: number) => [
                                `₹${value.toLocaleString('en-IN')}`, 
                                'Investment Value'
                              ]}
                              contentStyle={{ background: 'var(--background)', borderColor: 'var(--border)' }}
                            />
                            <Bar 
                              dataKey="value" 
                              fill="hsl(var(--primary))" 
                              radius={[0, 4, 4, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </GlassCard>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
