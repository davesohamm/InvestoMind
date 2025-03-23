
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BellIcon,
  CogIcon,
  SearchIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import { searchStocks } from "@/data/stocksDatabase";

export function Header() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ symbol: string; name: string }>>([]);
  const [showResults, setShowResults] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchStocks(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && searchResults.length > 0) {
      navigate(`/stocks/${searchResults[0].symbol}`);
      setSearchQuery("");
      setShowResults(false);
    }
  };

  const handleSelectResult = (symbol: string) => {
    navigate(`/stocks/${symbol}`);
    setSearchQuery("");
    setShowResults(false);
    setIsSearching(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-6">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-primary font-bold text-xl">InvestoMind</div>
          </Link>
        </div>
        
        <div className="flex-1 flex items-center justify-end md:justify-between">
          <div className="relative hidden md:flex items-center w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <form onSubmit={handleSearch} className="w-full">
              <Input
                type="search"
                placeholder="Search stocks, crypto, ETFs..."
                className="pl-10 rounded-full bg-muted/50 border-0 focus-visible:ring-primary w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
              />
            </form>
            
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-input rounded-md shadow-lg z-50">
                {searchResults.map((result) => (
                  <div
                    key={result.symbol}
                    className="px-4 py-2 hover:bg-muted cursor-pointer"
                    onMouseDown={() => handleSelectResult(result.symbol)}
                  >
                    <div className="font-medium">{result.symbol}</div>
                    <div className="text-sm text-muted-foreground truncate">{result.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearching(!isSearching)}
              className="md:hidden"
            >
              <SearchIcon className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" asChild>
              <Link to="/notifications">
                <BellIcon className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="ghost" size="icon" asChild>
              <Link to="/settings">
                <CogIcon className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full ml-2 bg-background"
              asChild
            >
              <Link to="/profile">
                <UserIcon className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {isSearching && (
        <div className="p-4 border-t md:hidden animate-slide-down">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <form onSubmit={handleSearch} className="w-full">
              <Input
                type="search"
                placeholder="Search stocks, crypto, ETFs..."
                className="pl-10 rounded-full bg-muted/50 border-0 focus-visible:ring-primary w-full"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowResults(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setShowResults(false);
                  }, 200);
                }}
              />
            </form>
            
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-input rounded-md shadow-lg z-50">
                {searchResults.map((result) => (
                  <div
                    key={result.symbol}
                    className="px-4 py-2 hover:bg-muted cursor-pointer"
                    onMouseDown={() => handleSelectResult(result.symbol)}
                  >
                    <div className="font-medium">{result.symbol}</div>
                    <div className="text-sm text-muted-foreground truncate">{result.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
