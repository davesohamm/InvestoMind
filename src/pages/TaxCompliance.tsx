
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Search, IndianRupee, Shield, Info, AlertTriangle } from "lucide-react";

// Indian Tax Information
const INDIAN_TAX_INFO = {
  shortTerm: {
    title: "Short-Term Capital Gains Tax (STCG)",
    description: "For equity investments held for less than 1 year, STCG tax is levied at 15% plus applicable surcharge and cess.",
    regulations: [
      "Equity shares and equity-oriented mutual funds are subject to Securities Transaction Tax (STT).",
      "Short-term capital gains from equity shares sold on a recognized stock exchange are taxed at 15%.",
      "Income tax surcharge is applicable if your total income exceeds ₹50 lakhs.",
      "Health and education cess of 4% is applicable on the tax amount.",
    ],
    examples: [
      "If you buy shares for ₹50,000 and sell them within 1 year for ₹60,000, your STCG is ₹10,000. Tax at 15% would be ₹1,500 plus applicable surcharge and cess."
    ]
  },
  longTerm: {
    title: "Long-Term Capital Gains Tax (LTCG)",
    description: "For equity investments held for more than 1 year, LTCG tax is levied at 10% (without indexation) on gains exceeding ₹1 lakh per financial year.",
    regulations: [
      "Long-term capital gains up to ₹1 lakh in a financial year are exempt from tax.",
      "Gains above ₹1 lakh are taxed at 10% without the benefit of indexation.",
      "For equity shares purchased before January 31, 2018, the cost of acquisition is taken as higher of actual cost or fair market value as on January 31, 2018.",
      "LTCG tax is applicable only if Securities Transaction Tax (STT) has been paid.",
    ],
    examples: [
      "If you sell shares after holding for more than a year and make a profit of ₹1,50,000, the first ₹1,00,000 is exempt and the remaining ₹50,000 will be taxed at 10%, resulting in a tax of ₹5,000."
    ]
  },
  dividends: {
    title: "Dividend Income Tax",
    description: "Dividends are taxable in the hands of recipients at applicable slab rates. Companies no longer pay Dividend Distribution Tax (DDT).",
    regulations: [
      "Dividends received from Indian companies are taxable in the hands of the shareholder at their applicable income tax slab rate.",
      "TDS at 10% is deducted if the dividend amount exceeds ₹5,000 in a financial year.",
      "Taxpayers can claim a deduction for interest expense incurred for earning dividend income, subject to a maximum of 20% of the dividend income.",
    ],
    examples: [
      "If you receive a dividend of ₹20,000 and your income tax slab rate is 20%, you'll pay ₹4,000 as tax on this dividend income."
    ]
  },
  stt: {
    title: "Securities Transaction Tax (STT)",
    description: "STT is a tax payable on the purchase and sale of securities listed on recognized stock exchanges in India.",
    regulations: [
      "For equity delivery-based buying: 0.1% of the transaction value",
      "For equity delivery-based selling: 0.1% of the transaction value",
      "For equity intraday trades: 0.025% of the transaction value (selling side only)",
      "For F&O (Futures and Options): Different rates apply based on the instrument and nature of transaction",
    ],
    examples: [
      "For a delivery-based purchase of shares worth ₹1,00,000, the STT would be ₹100.",
      "For an intraday sell transaction of ₹50,000, the STT would be ₹12.50."
    ]
  },
  sebi: {
    title: "SEBI Regulations for Retail Investors",
    description: "The Securities and Exchange Board of India (SEBI) establishes rules to protect investors and regulate the securities market.",
    regulations: [
      "KYC (Know Your Customer) documentation is mandatory for all investors",
      "PAN (Permanent Account Number) is required for all market transactions",
      "Demat account is necessary for holding and trading in securities",
      "Trading hours on NSE and BSE are from 9:15 AM to 3:30 PM on working days",
      "Circuit limits are applied to prevent excessive price volatility",
      "Block deals window operates from 8:45 AM to 9:00 AM for large transactions"
    ],
    examples: []
  }
};

export default function TaxCompliance() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleQuerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    setResponse("");
    
    try {
      // In a real implementation, this would call the Gemini API
      // For now, we'll simulate a response with a timeout
      setTimeout(() => {
        // Generate a basic response based on keywords in the query
        let simulatedResponse = "Based on Indian tax regulations for investments:\n\n";
        
        if (query.toLowerCase().includes("short term") || query.toLowerCase().includes("stcg")) {
          simulatedResponse += INDIAN_TAX_INFO.shortTerm.description + "\n\n";
          simulatedResponse += "Key regulations:\n- " + INDIAN_TAX_INFO.shortTerm.regulations.join("\n- ");
        }
        else if (query.toLowerCase().includes("long term") || query.toLowerCase().includes("ltcg")) {
          simulatedResponse += INDIAN_TAX_INFO.longTerm.description + "\n\n";
          simulatedResponse += "Key regulations:\n- " + INDIAN_TAX_INFO.longTerm.regulations.join("\n- ");
        }
        else if (query.toLowerCase().includes("dividend")) {
          simulatedResponse += INDIAN_TAX_INFO.dividends.description + "\n\n";
          simulatedResponse += "Key regulations:\n- " + INDIAN_TAX_INFO.dividends.regulations.join("\n- ");
        }
        else if (query.toLowerCase().includes("stt") || query.toLowerCase().includes("securities transaction")) {
          simulatedResponse += INDIAN_TAX_INFO.stt.description + "\n\n";
          simulatedResponse += "Key regulations:\n- " + INDIAN_TAX_INFO.stt.regulations.join("\n- ");
        }
        else if (query.toLowerCase().includes("sebi") || query.toLowerCase().includes("regulations")) {
          simulatedResponse += INDIAN_TAX_INFO.sebi.description + "\n\n";
          simulatedResponse += "Key regulations:\n- " + INDIAN_TAX_INFO.sebi.regulations.join("\n- ");
        }
        else {
          simulatedResponse += "The Indian tax system for investments includes various components:\n\n";
          simulatedResponse += "1. Short-Term Capital Gains Tax (STCG): 15% for equity investments held less than 1 year\n";
          simulatedResponse += "2. Long-Term Capital Gains Tax (LTCG): 10% for equity investments held more than 1 year (gains above ₹1 lakh)\n";
          simulatedResponse += "3. Dividend Income: Taxed at your income tax slab rate\n";
          simulatedResponse += "4. Securities Transaction Tax (STT): Applicable on buying and selling securities\n";
          simulatedResponse += "5. SEBI Regulations: Guidelines for trading, KYC requirements, and market operations\n\n";
          simulatedResponse += "Please ask specific questions about any of these tax components for more detailed information.";
        }
        
        setResponse(simulatedResponse);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error generating tax information:", error);
      setResponse("Sorry, I couldn't fetch the tax information at this time. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <Header />
        <PageTransition>
          <main className="p-4 md:p-6">
            <div className="container pb-12">
              <div className="max-w-6xl mx-auto">
                <div className="mb-6 md:mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <h1 className="text-2xl font-bold">Indian Tax Compliance Tool</h1>
                  </div>
                  <p className="text-muted-foreground">
                    Understand Indian tax regulations for investments and stay compliant with SEBI guidelines
                  </p>
                </div>
                
                <Tabs defaultValue="info">
                  <TabsList className="grid w-full grid-cols-2 mb-6 md:mb-8">
                    <TabsTrigger value="info">Tax Information</TabsTrigger>
                    <TabsTrigger value="assistant">Tax Assistant</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <GlassCard className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <IndianRupee className="h-5 w-5 text-primary" />
                          <h2 className="text-lg font-semibold">{INDIAN_TAX_INFO.shortTerm.title}</h2>
                        </div>
                        <p className="mb-4 text-muted-foreground">{INDIAN_TAX_INFO.shortTerm.description}</p>
                        <div className="space-y-2">
                          <h3 className="font-medium">Key Regulations:</h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            {INDIAN_TAX_INFO.shortTerm.regulations.map((reg, idx) => (
                              <li key={idx}>{reg}</li>
                            ))}
                          </ul>
                          <h3 className="font-medium mt-4">Example:</h3>
                          <p className="text-sm text-muted-foreground">{INDIAN_TAX_INFO.shortTerm.examples[0]}</p>
                        </div>
                      </GlassCard>
                      
                      <GlassCard className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <IndianRupee className="h-5 w-5 text-primary" />
                          <h2 className="text-lg font-semibold">{INDIAN_TAX_INFO.longTerm.title}</h2>
                        </div>
                        <p className="mb-4 text-muted-foreground">{INDIAN_TAX_INFO.longTerm.description}</p>
                        <div className="space-y-2">
                          <h3 className="font-medium">Key Regulations:</h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            {INDIAN_TAX_INFO.longTerm.regulations.map((reg, idx) => (
                              <li key={idx}>{reg}</li>
                            ))}
                          </ul>
                          <h3 className="font-medium mt-4">Example:</h3>
                          <p className="text-sm text-muted-foreground">{INDIAN_TAX_INFO.longTerm.examples[0]}</p>
                        </div>
                      </GlassCard>
                      
                      <GlassCard className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <IndianRupee className="h-5 w-5 text-primary" />
                          <h2 className="text-lg font-semibold">{INDIAN_TAX_INFO.dividends.title}</h2>
                        </div>
                        <p className="mb-4 text-muted-foreground">{INDIAN_TAX_INFO.dividends.description}</p>
                        <div className="space-y-2">
                          <h3 className="font-medium">Key Regulations:</h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            {INDIAN_TAX_INFO.dividends.regulations.map((reg, idx) => (
                              <li key={idx}>{reg}</li>
                            ))}
                          </ul>
                          <h3 className="font-medium mt-4">Example:</h3>
                          <p className="text-sm text-muted-foreground">{INDIAN_TAX_INFO.dividends.examples[0]}</p>
                        </div>
                      </GlassCard>
                      
                      <GlassCard className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <IndianRupee className="h-5 w-5 text-primary" />
                          <h2 className="text-lg font-semibold">{INDIAN_TAX_INFO.stt.title}</h2>
                        </div>
                        <p className="mb-4 text-muted-foreground">{INDIAN_TAX_INFO.stt.description}</p>
                        <div className="space-y-2">
                          <h3 className="font-medium">Key Regulations:</h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            {INDIAN_TAX_INFO.stt.regulations.map((reg, idx) => (
                              <li key={idx}>{reg}</li>
                            ))}
                          </ul>
                          <h3 className="font-medium mt-4">Examples:</h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                            {INDIAN_TAX_INFO.stt.examples.map((ex, idx) => (
                              <li key={idx}>{ex}</li>
                            ))}
                          </ul>
                        </div>
                      </GlassCard>
                      
                      <GlassCard className="p-6 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                          <Shield className="h-5 w-5 text-primary" />
                          <h2 className="text-lg font-semibold">{INDIAN_TAX_INFO.sebi.title}</h2>
                        </div>
                        <p className="mb-4 text-muted-foreground">{INDIAN_TAX_INFO.sebi.description}</p>
                        <div className="space-y-2">
                          <h3 className="font-medium">Key Regulations:</h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-x-4">
                            {INDIAN_TAX_INFO.sebi.regulations.map((reg, idx) => (
                              <li key={idx}>{reg}</li>
                            ))}
                          </ul>
                        </div>
                      </GlassCard>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="assistant">
                    <GlassCard className="p-6 mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Info className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-semibold">AI Tax Assistant</h2>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Ask specific questions about Indian tax regulations for investments and trading activities.
                      </p>
                      
                      <form onSubmit={handleQuerySubmit} className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Example: How are short-term capital gains taxed in India?"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1"
                          />
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Search className="h-4 w-4 mr-2" />
                            )}
                            {isLoading ? "Generating..." : "Ask"}
                          </Button>
                        </div>
                      </form>
                    </GlassCard>
                    
                    {(isLoading || response) && (
                      <GlassCard className="p-6">
                        <h3 className="font-medium mb-3">Response:</h3>
                        {isLoading ? (
                          <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          </div>
                        ) : (
                          <Textarea 
                            value={response} 
                            readOnly 
                            className="min-h-[300px]"
                          />
                        )}
                      </GlassCard>
                    )}
                  </TabsContent>
                </Tabs>
                
                <GlassCard className="p-6 mt-8">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Disclaimer</h2>
                      <p className="text-sm text-muted-foreground">
                        The information provided is for general informational purposes only and should not be construed as tax advice. Tax laws are subject to change, and tax implications may vary based on individual circumstances. It is recommended to consult with a qualified tax professional for specific advice tailored to your situation. InvestoMind is not responsible for any actions taken based on the information provided.
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
