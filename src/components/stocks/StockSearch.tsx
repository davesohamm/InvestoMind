
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchStocks } from "@/data/stocksDatabase";

export function StockSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{ symbol: string; name: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 0) {
      const results = searchStocks(query);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/stocks/${query.toUpperCase()}`);
      setQuery("");
      setShowSuggestions(false);
    }
  };

  const handleSelect = (symbol: string) => {
    navigate(`/stocks/${symbol}`);
    setQuery("");
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search for a stock symbol or company name..."
          className="pl-10 pr-24 py-6 text-lg rounded-xl shadow-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <Button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2"
        >
          Search
        </Button>
      </form>

      {showSuggestions && query.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-background dark:bg-background rounded-lg shadow-lg border border-input py-2 animate-slide-down">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <div
                key={suggestion.symbol}
                className="px-4 py-2 hover:bg-muted cursor-pointer"
                onMouseDown={() => handleSelect(suggestion.symbol)}
              >
                <div className="font-medium">{suggestion.symbol}</div>
                <div className="text-sm text-muted-foreground">
                  {suggestion.name}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-muted-foreground">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
