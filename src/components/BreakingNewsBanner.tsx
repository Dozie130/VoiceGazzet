
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { fetchBreakingNews, startNewsRefreshInterval } from "@/services/newsService";

export function BreakingNewsBanner() {
  const [breakingNews, setBreakingNews] = useState<string[]>([
    "Supreme Court delivers landmark ruling on digital privacy case",
    "Major tech company announces breakthrough in quantum computing",
    "International climate agreement reached after marathon negotiations",
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);

  // Fetch breaking news on component mount
  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsItems = await fetchBreakingNews();
        setBreakingNews(newsItems);
      } catch (error) {
        console.error("Failed to load breaking news:", error);
      }
    };

    loadNews();
    
    // Set up refresh interval and cleanup on unmount
    const cleanup = startNewsRefreshInterval();
    return cleanup;
  }, []);

  // Rotate through breaking news headlines
  useEffect(() => {
    if (isBannerDismissed) return;
    
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % breakingNews.length);
        setIsVisible(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [breakingNews.length, isBannerDismissed]);

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
              <span className="font-bold uppercase text-xs">Breaking News</span>
            </div>
            <div className="h-4 w-px bg-white/30" />
            <p className="text-sm font-medium">{breakingNews[currentIndex]}</p>
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
