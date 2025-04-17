
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { fetchNews, startNewsRefreshInterval, NewsSource } from "@/services/newsService";

export function BreakingNewsBanner() {
  const [breakingNews, setBreakingNews] = useState<{ text: string; source: NewsSource }[]>([
    { text: "Supreme Court delivers landmark ruling on digital privacy case", source: "headlines" },
    { text: "Nigerian tech startups secure record funding in first quarter", source: "nigeria" },
    { text: "Pan-African trade agreement enters implementation phase", source: "africa" },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);
  const [currentSource, setCurrentSource] = useState<NewsSource>("headlines");
  const sources: NewsSource[] = ["headlines", "x", "worldwide", "africa", "nigeria"];
  const sourceIndex = { current: 0 };

  // Fetch breaking news on component mount
  useEffect(() => {
    const loadAllNews = async () => {
      try {
        const allNewsItems: { text: string; source: NewsSource }[] = [];
        
        for (const source of sources) {
          const newsItems = await fetchNews(source);
          const sourceItems = newsItems.map(item => ({ text: item, source }));
          allNewsItems.push(...sourceItems);
        }
        
        setBreakingNews(allNewsItems);
      } catch (error) {
        console.error("Failed to load breaking news:", error);
      }
    };

    loadAllNews();
    
    // Set up refresh interval and cleanup on unmount
    const cleanup = startNewsRefreshInterval();
    return cleanup;
  }, []);

  // Change news source every 40 seconds (after cycling through 5 headlines)
  useEffect(() => {
    if (isBannerDismissed) return;
    
    const rotateSource = () => {
      sourceIndex.current = (sourceIndex.current + 1) % sources.length;
      setCurrentSource(sources[sourceIndex.current]);
    };
    
    const sourceInterval = setInterval(rotateSource, 40000);
    
    return () => clearInterval(sourceInterval);
  }, [isBannerDismissed, sources.length]);

  // Rotate through breaking news headlines
  useEffect(() => {
    if (isBannerDismissed) return;
    
    const currentSourceNews = breakingNews.filter(news => news.source === currentSource);
    if (currentSourceNews.length === 0) return;
    
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % currentSourceNews.length);
        setIsVisible(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [breakingNews, currentSource, isBannerDismissed]);

  const handleClose = () => {
    setIsVisible(false);
    // Hide completely after animation
    setTimeout(() => {
      setIsBannerDismissed(true);
    }, 300);
  };

  if (isBannerDismissed) {
    return null;
  }

  // Get current news to display
  const currentNewsItems = breakingNews.filter(news => news.source === currentSource);
  const currentNewsItem = currentNewsItems[currentIndex % currentNewsItems.length] || breakingNews[0];

  // Get source display name
  const getSourceDisplay = (source: NewsSource): string => {
    switch(source) {
      case "headlines": return "Breaking News";
      case "x": return "From X";
      case "worldwide": return "World News";
      case "africa": return "Africa News";
      case "nigeria": return "Nigeria News";
      default: return source;
    }
  };

  return (
    <div
      id="breaking-news-banner"
      className={`bg-news-crimson text-white py-2 transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span className="font-bold uppercase text-xs">{getSourceDisplay(currentNewsItem.source)}</span>
            </div>
            <div className="h-4 w-px bg-white/30" />
            <p className="text-sm font-medium">{currentNewsItem.text}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white"
            aria-label="Close breaking news"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
