import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";
import { SubscriptionDialog } from "./SubscriptionDialog";

const categories = [
  { name: "Politics", path: "/category/politics" },
  { name: "Business", path: "/category/business" },
  { name: "Technology", path: "/category/technology" },
  { name: "Sports", path: "/category/sports" },
  { name: "Entertainment", path: "/category/entertainment" },
  { name: "Health", path: "/category/health" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-news-navy dark:text-white">
              Voice Gazette
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-nav-hover transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search - Desktop */}
            <div className="hidden md:block">
              <SearchBar />
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setIsSubscribeOpen(true)}
              className="hidden sm:flex"
            >
              Subscribe
            </Button>
            
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <div className="pb-3">
              <SearchBar />
            </div>
            
            <nav className="flex flex-col space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="px-3 py-2 rounded-md hover:bg-nav-hover transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsSubscribeOpen(true);
                }}
                className="mt-4"
              >
                Subscribe
              </Button>
            </nav>
          </div>
        )}
      </div>
      
      <SubscriptionDialog open={isSubscribeOpen} onOpenChange={setIsSubscribeOpen} />
    </header>
  );
}
