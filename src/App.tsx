
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageTransitionProvider } from "./components/layout/PageTransition";
import { ThemeProvider } from "./hooks/use-theme";
import Dashboard from "./pages/Dashboard";
import StockDetail from "./pages/StockDetail";
import Portfolio from "./pages/Portfolio";
import AiAdvisor from "./pages/AiAdvisor";
import NotFound from "./pages/NotFound";
import Stocks from "./pages/Stocks";
import Watchlist from "./pages/Watchlist";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";
import NotificationCenter from "./pages/NotificationCenter";
import Index from "./pages/Index";
import TaxCompliance from "./pages/TaxCompliance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PageTransitionProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/stocks" element={<Stocks />} />
              <Route path="/stocks/:symbol" element={<StockDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/ai-advisor" element={<AiAdvisor />} />
              <Route path="/tax-compliance" element={<TaxCompliance />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/notifications" element={<NotificationCenter />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransitionProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
