
import { AIInsights } from "@/components/dashboard/AIInsights";
import { MarketSummary } from "@/components/dashboard/MarketSummary";
import { PortfolioOverview } from "@/components/dashboard/PortfolioOverview";
import { TrendingStocks } from "@/components/dashboard/TrendingStocks";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Sidebar } from "@/components/layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <PageTransition>
          <main className="p-6">
            <div className="container space-y-10 pb-12">
              <MarketSummary />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <PortfolioOverview />
                <AIInsights />
              </div>
              <TrendingStocks />
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
