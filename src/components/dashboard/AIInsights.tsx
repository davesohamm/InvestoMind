
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { ZapIcon, Loader2 } from "lucide-react";
import { useState } from "react";

// Mock insights data for demonstration
const MOCK_INSIGHTS = [
  {
    id: 1,
    title: "Technology Sector Analysis",
    content: "Tech stocks are showing strong momentum with the semiconductor industry leading growth. Consider increasing allocation to chip manufacturers and AI-related companies.",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    title: "Market Volatility Alert",
    content: "Increased market volatility expected due to upcoming GST council announcements. Consider hedging positions or maintaining higher cash reserves in the short term.",
    timestamp: "1 day ago",
  },
  {
    id: 3,
    title: "Emerging Market Opportunity",
    content: "South Asian markets are showing signs of accelerated growth. Look for ETFs or direct investments in these regions for portfolio diversification.",
    timestamp: "3 days ago",
  },
];

// Stock specific mock insights
const STOCK_SPECIFIC_INSIGHTS: Record<string, any[]> = {
  'AAPL': [
    {
      id: 4,
      title: "Apple's India Strategy",
      content: "Apple's expansion in the Indian market could drive significant growth, with local manufacturing helping overcome import duties and price barriers.",
      timestamp: "5 hours ago",
    }
  ],
  'GOOGL': [
    {
      id: 5,
      title: "Google's AI Investments",
      content: "Google's heavy investments in AI technology and infrastructure in India could position it for strong growth in the emerging tech ecosystem.",
      timestamp: "4 hours ago",
    }
  ],
  'MSFT': [
    {
      id: 6,
      title: "Microsoft's Cloud Growth in India",
      content: "Microsoft's Azure cloud services are gaining traction in India, particularly with government contracts and enterprise solutions.",
      timestamp: "1 day ago",
    }
  ]
};

interface AIInsightsProps {
  stockSymbol?: string;
}

export function AIInsights({ stockSymbol }: AIInsightsProps) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Get initial insights - combine general and stock-specific if available
  const initialInsights = stockSymbol && STOCK_SPECIFIC_INSIGHTS[stockSymbol] 
    ? [...STOCK_SPECIFIC_INSIGHTS[stockSymbol], ...MOCK_INSIGHTS] 
    : MOCK_INSIGHTS;
    
  const [insights, setInsights] = useState(initialInsights);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      // Generate a response based on the query and stock symbol
      let responseContent = `Analysis for "${query}"`;
      
      if (stockSymbol) {
        responseContent += ` regarding ${stockSymbol}: `;
        
        if (query.toLowerCase().includes("buy") || query.toLowerCase().includes("invest")) {
          responseContent += `Based on recent market trends and financial performance, ${stockSymbol} shows ${Math.random() > 0.5 ? 'positive' : 'mixed'} indicators. Consider your risk tolerance and investment horizon before making a decision.`;
        } else if (query.toLowerCase().includes("risk") || query.toLowerCase().includes("volatility")) {
          responseContent += `${stockSymbol} currently has a ${Math.random() > 0.5 ? 'moderate' : 'high'} risk profile in the Indian market context. Recent volatility is ${Math.random() > 0.5 ? 'above' : 'below'} sector average.`;
        } else if (query.toLowerCase().includes("outlook") || query.toLowerCase().includes("future")) {
          responseContent += `The 12-month outlook for ${stockSymbol} suggests ${Math.random() > 0.5 ? 'potential growth opportunities' : 'cautious optimism'} as it navigates changing market conditions. Keep an eye on upcoming quarterly results.`;
        } else {
          responseContent += `The company has been showing ${Math.random() > 0.5 ? 'promising' : 'interesting'} developments in its sector. Consider following analyst reports and industry news for more detailed insights.`;
        }
      } else {
        responseContent += ": Based on current market analysis, Indian markets are showing interesting patterns with key sectors like IT, pharma, and banking demonstrating varied performance. Consider diversification across multiple sectors for balanced risk.";
      }

      // Create a new insight with the response
      const newInsight = {
        id: Date.now(),
        title: `AI Response: ${query.length > 20 ? query.substring(0, 20) + '...' : query}`,
        content: responseContent,
        timestamp: "Just now",
      };

      setInsights([newInsight, ...insights]);
      setQuery("");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">AI Insights</h2>
        <p className="text-muted-foreground">Personalized investment recommendations</p>
      </div>

      <GlassCard className="p-6">
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <Input
            placeholder={stockSymbol ? 
              `Ask about ${stockSymbol}, investment strategies, or specific market trends...` : 
              "Ask about investment strategies, market trends, or specific stocks..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <ZapIcon className="h-4 w-4 mr-2" />
            )}
            {isLoading ? "Processing..." : "Ask AI"}
          </Button>
        </form>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className="p-4 rounded-lg bg-primary/5 border border-primary/10 animate-scale-in"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-primary">{insight.title}</h3>
                <span className="text-xs text-muted-foreground">{insight.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground">{insight.content}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
