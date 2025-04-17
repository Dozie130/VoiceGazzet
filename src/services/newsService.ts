
import { toast } from "@/hooks/use-toast";

// Types for our news data
export interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
}

// Mock API response if real API fails
const fallbackNews = [
  "Supreme Court delivers landmark ruling on digital privacy case",
  "Major tech company announces breakthrough in quantum computing",
  "International climate agreement reached after marathon negotiations",
  "Global markets react to unexpected economic forecast",
  "Medical researchers announce promising results in vaccine development"
];

// NewsAPI endpoint for top headlines
const NEWS_API_URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY";
const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds

let cachedNews: string[] = [...fallbackNews];
let lastFetchTime = 0;

/**
 * Fetches breaking news from the NewsAPI
 */
export async function fetchBreakingNews(): Promise<string[]> {
  try {
    // If we have cached news and it's been less than 10 minutes, return the cached news
    const now = Date.now();
    if (cachedNews.length > 0 && now - lastFetchTime < REFRESH_INTERVAL) {
      return cachedNews;
    }

    // Fetch new headlines
    const response = await fetch(NEWS_API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform API response to our format
    if (data.articles && data.articles.length > 0) {
      cachedNews = data.articles
        .slice(0, 5)
        .map((article: any) => article.title)
        .filter((title: string) => title && title.length > 0);
      
      lastFetchTime = now;
      console.log("Fetched fresh breaking news");
      return cachedNews;
    } else {
      // If no articles found, return fallback
      return fallbackNews;
    }
  } catch (error) {
    console.error("Error fetching breaking news:", error);
    // Use fallback news data in case of error
    return fallbackNews;
  }
}

/**
 * Sets up an interval to refresh news in the background
 */
export function startNewsRefreshInterval() {
  // Initial fetch
  fetchBreakingNews().then(() => {
    console.log("Initial breaking news loaded");
  });

  // Set up interval for background refreshes
  const intervalId = setInterval(async () => {
    try {
      await fetchBreakingNews();
      // Notify user only on successful updates
      toast({
        title: "News Updated",
        description: "Breaking news has been refreshed",
        duration: 3000
      });
    } catch (error) {
      console.error("Background news refresh failed:", error);
    }
  }, REFRESH_INTERVAL);

  // Return cleanup function
  return () => clearInterval(intervalId);
}
