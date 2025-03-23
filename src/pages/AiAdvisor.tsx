
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AlertCircle, SendIcon, ZapIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    type: "ai",
    content: "Hello! I'm your AI investment advisor powered by Google Gemini. How can I help you today? You can ask me about investment strategies, market trends, specific stocks, or portfolio advice.",
    timestamp: new Date(),
  },
];

// Mock suggested questions
const SUGGESTED_QUESTIONS = [
  "What are the best performing tech stocks this quarter?",
  "How should I diversify my portfolio?",
  "What's your analysis on Tesla stock?",
  "Explain dollar cost averaging strategy",
  "What are the risks of investing in cryptocurrency?",
];

// Updated API key and endpoint
const GEMINI_API_KEY = "AIzaSyDq-ihduSI5jT8dxEld8pTTiPCzeOAhsKk";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export default function AiAdvisor() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || input;
    if (!messageContent.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageContent,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setError(null);

    try {
      // Call Google Gemini API with updated endpoint and model
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an AI investment advisor assistant. Provide helpful, accurate, and concise advice about investments, stocks, and financial markets. The user's question is: ${messageContent}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
          },
        }),
      });

      const data = await response.json();
      console.log("Gemini API response:", data);
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to get response from Gemini');
      }

      // Extract response text from updated API response format
      const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm unable to provide an answer at the moment. Please try again later.";

      // Add AI response message
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponseText,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      console.error('Error calling Gemini API:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive",
      });
      
      // Add fallback AI response
      const fallbackResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "I'm sorry, I couldn't process your request at the moment. Please try again later.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <PageTransition>
          <main className="p-6">
            <div className="container pb-12">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <ZapIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">AI Investment Advisor</h1>
                    <p className="text-muted-foreground">
                      Get personalized investment advice and market insights powered by Google Gemini
                    </p>
                  </div>
                </div>

                <GlassCard className="p-6 h-[calc(100vh-250px)] flex flex-col">
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.type === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-2xl px-4 py-3",
                            message.type === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          <div className="text-sm">
                            {message.content.split("\n").map((line, i) => (
                              <p key={i} className={i > 0 ? "mt-2" : ""}>
                                {line}
                              </p>
                            ))}
                          </div>
                          <div 
                            className={cn(
                              "text-xs mt-1",
                              message.type === "user" 
                                ? "text-primary-foreground/70" 
                                : "text-muted-foreground"
                            )}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-2xl px-4 py-3">
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-pulse"></div>
                            <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-pulse delay-150"></div>
                            <div className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-pulse delay-300"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {error && (
                      <div className="flex justify-start">
                        <div className="bg-destructive/10 text-destructive rounded-2xl px-4 py-3 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          <p className="text-sm">{error}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {messages.length === 1 && (
                    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SUGGESTED_QUESTIONS.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start h-auto py-2 px-3 text-sm text-left"
                          onClick={() => handleSendMessage(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask about investment strategies, market trends, or specific stocks..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button onClick={() => handleSendMessage()} disabled={!input.trim() || isTyping}>
                      <SendIcon className="h-4 w-4" />
                    </Button>
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
