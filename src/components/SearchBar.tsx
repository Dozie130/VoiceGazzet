
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

// Mock search suggestions based on query
// In a real app, this would come from an API
const getSuggestions = (query: string) => {
  if (!query.trim()) return [];
  
  const allSuggestions = [
    { id: 1, text: "Politics latest news", category: "Politics" },
    { id: 2, text: "Business market updates", category: "Business" },
    { id: 3, text: "Technology innovations", category: "Technology" },
    { id: 4, text: "Sports results", category: "Sports" },
    { id: 5, text: "Entertainment celebrity news", category: "Entertainment" },
    { id: 6, text: "Health medical breakthroughs", category: "Health" },
    { id: 7, text: "Climate change reports", category: "Environment" },
    { id: 8, text: "Education reforms", category: "Education" },
  ];
  
  return allSuggestions.filter(item => 
    item.text.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );
};

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{id: number, text: string, category: string}>>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const results = getSuggestions(query);
      setSuggestions(results);
      setOpen(results.length > 0);
    } else {
      setSuggestions([]);
      setOpen(false);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Searching for:", query);
      setOpen(false);
      // In a real app, this would navigate to search results
      // navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setOpen(false);
    console.log("Selected suggestion:", suggestion);
    // In a real app, this would navigate to search results
    // navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleClear = () => {
    setQuery("");
    setOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <form onSubmit={handleSearch} className="relative w-full">
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search articles..."
              className="pr-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query ? (
              <button
                type="button"
                className="absolute right-10 top-1/2 -translate-y-1/2"
                onClick={handleClear}
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            ) : null}
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
            </button>
          </form>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[calc(100%-1rem)] max-w-sm" align="start">
          <Command>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              <CommandGroup heading="Suggestions">
                {suggestions.map((suggestion) => (
                  <CommandItem
                    key={suggestion.id}
                    onSelect={() => handleSelectSuggestion(suggestion.text)}
                    className="flex items-center"
                  >
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <span className="flex-1 truncate">{suggestion.text}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {suggestion.category}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
