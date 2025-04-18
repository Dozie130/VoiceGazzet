
import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Radio } from "lucide-react";
import { fetchNews, NewsSource } from "@/services/newsService";
import { Link } from "react-router-dom";

interface NewsItem {
  text: string;
  source: NewsSource;
}

export function LiveNewsTicker() {
  const [liveNewsItems, setLiveNewsItems] = useState<NewsItem[]>([
    { text: "Stock markets reach all-time high as tech sector booms", source: "headlines" },
    { text: "Scientists discover potential breakthrough in renewable energy storage", source: "worldwide" },
    { text: "Olympic committee announces host city for 2036 Summer Games", source: "worldwide" },
    { text: "Nigerian tech startups secure record funding in first quarter", source: "nigeria" },
    { text: "Tech influencer shares first look at upcoming smartphone", source: "x" },
    { text: "Pan-African trade agreement enters implementation phase", source: "africa" }
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Fetch live news from all sources on component mount and refresh every 10 minutes
  useEffect(() => {
    const sources: NewsSource[] = ["headlines", "x", "worldwide", "africa", "nigeria"];
    
    const loadAllNews = async () => {
      try {
        const allNewsItems: NewsItem[] = [];
        
        for (const source of sources) {
          const newsItems = await fetchNews(source);
          const sourceItems = newsItems.map(item => ({ text: item, source }));
          allNewsItems.push(...sourceItems);
        }
        
        // Shuffle the news items to mix different sources
        const shuffledItems = allNewsItems.sort(() => Math.random() - 0.5);
        setLiveNewsItems(shuffledItems);
      } catch (error) {
        console.error("Failed to load news for ticker:", error);
      }
    };

    loadAllNews();
    
    // Refresh news every 10 minutes
    const refreshInterval = setInterval(loadAllNews, 10 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);
  
  // Automatically scroll news items
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % liveNewsItems.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isPaused, liveNewsItems.length]);

  // Reset animation when item changes
  useEffect(() => {
    if (tickerRef.current) {
      tickerRef.current.style.animation = 'none';
      // Trigger reflow
      void tickerRef.current.offsetWidth;
      tickerRef.current.style.animation = '';
    }
  }, [currentIndex]);

  // Show fewer items on mobile
  const visibleNews = isMobile ? 1 : 3;
  
  // Get source display text and URLs
  const getSourceInfo = (source: NewsSource): { text: string; url: string } => {
    switch(source) {
      case "headlines":
        return { text: "Breaking", url: "/category/breaking" };
      case "x":
        return { text: "X", url: "/source/x" };
      case "worldwide":
        return { text: "World", url: "/category/world" };
      case "africa":
        return { text: "Africa", url: "/category/africa" };
      case "nigeria":
        return { text: "Nigeria", url: "/category/nigeria" };
      default:
        return { text: source, url: `/source/${source}` };
    }
  };
  
  return (
    <div 
      className="bg-background border-y border-border py-1.5 overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="flex items-center bg-primary/10 dark:bg-primary/20 rounded-full px-2 py-0.5 mr-3">
            <Radio className="h-3 w-3 text-news-crimson animate-pulse mr-1" />
            <span className="text-xs font-semibold uppercase">Live</span>
          </div>
          
          <div className="relative overflow-hidden flex-1" style={{ height: '1.5rem' }}>
            <div
              ref={tickerRef}
              className="flex whitespace-nowrap animate-scroll"
              style={{
                animationPlayState: isPaused ? 'paused' : 'running'
              }}
            >
              {liveNewsItems.slice(currentIndex, currentIndex + visibleNews)
                .concat(
                  liveNewsItems.slice(
                    0, 
                    Math.max(0, visibleNews - (liveNewsItems.length - currentIndex))
                  )
                )
                .map((item, index) => {
                  const sourceInfo = getSourceInfo(item.source);
                  return (
                    <div 
                      key={`${item.text}-${index}`} 
                      className="text-sm px-4 border-r border-border last:border-r-0 flex-shrink-0 flex items-center"
                    >
                      <Link
                        to={sourceInfo.url}
                        className="text-xs font-semibold uppercase mr-2 px-1.5 py-0.5 rounded bg-news-crimson text-white hover:bg-news-crimson/90 transition-colors"
                      >
                        {sourceInfo.text}
                      </Link>
                      {item.text}
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
