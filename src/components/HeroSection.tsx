
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Mock featured articles data - in a real app this would come from an API
const featuredArticles = [
  {
    id: 1,
    title: "Global Summit Addresses Climate Crisis with Ambitious New Targets",
    excerpt: "World leaders agree on groundbreaking measures to combat climate change during the two-week summit in Geneva.",
    category: "Politics",
    imageUrl: "https://images.unsplash.com/photo-1596800381634-3e78cac9daef?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    author: "Sarah Johnson",
    readTime: "6 min read",
    date: "April 17, 2025",
    isBreaking: true
  },
  {
    id: 2,
    title: "Tech Giant Unveils Revolutionary AI System That Could Transform Industries",
    excerpt: "The new artificial intelligence platform demonstrates unprecedented capabilities in solving complex problems across multiple domains.",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    author: "Michael Chen",
    readTime: "5 min read",
    date: "April 16, 2025",
    isBreaking: false
  },
  {
    id: 3,
    title: "Economic Report Shows Unexpected Growth Despite Global Challenges",
    excerpt: "Analysts surprised by resilient economic performance as markets adapt to changing international conditions.",
    category: "Business",
    imageUrl: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    author: "Jennifer Lee",
    readTime: "4 min read",
    date: "April 16, 2025",
    isBreaking: false
  }
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    // Auto-rotate featured articles
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredArticles.length);
        setIsTransitioning(false);
      }, 500);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const currentArticle = featuredArticles[currentIndex];
  
  const selectArticle = (index: number) => {
    if (index === currentIndex) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500);
  };
  
  return (
    <section className="py-6 lg:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main featured article */}
          <div 
            className={`lg:col-span-2 relative overflow-hidden rounded-xl ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            } transition-opacity duration-500`}
          >
            <div className="relative aspect-[16/9] lg:aspect-[21/9]">
              <img 
                src={currentArticle.imageUrl} 
                alt={currentArticle.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-8">
                {currentArticle.isBreaking && (
                  <div className="breaking-news-tag mb-3 inline-block">Breaking News</div>
                )}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                  {currentArticle.title}
                </h2>
                <p className="text-white/80 mb-4 line-clamp-2 md:line-clamp-none">
                  {currentArticle.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-white/70 text-sm flex items-center">
                    <span className="mr-4">{currentArticle.author}</span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {currentArticle.readTime}
                    </span>
                  </div>
                  <Button size="sm" variant="secondary" asChild>
                    <Link to="#" className="flex items-center">
                      Read Full Story <ChevronRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Selector for featured articles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Top Stories</h3>
            {featuredArticles.map((article, index) => (
              <button
                key={article.id}
                onClick={() => selectArticle(index)}
                className={`w-full text-left p-3 border rounded-lg transition-all duration-200 ${
                  index === currentIndex 
                    ? 'bg-secondary border-primary/20' 
                    : 'hover:bg-secondary/50'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <div className="text-xs font-medium text-news-crimson mb-1">
                      {article.category}
                    </div>
                    <h4 className="font-medium line-clamp-2 mb-1">{article.title}</h4>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <div className="ml-3 flex-shrink-0 w-20 h-16 overflow-hidden rounded">
                    <img 
                      src={article.imageUrl} 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
