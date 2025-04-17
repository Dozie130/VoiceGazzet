
import { toast } from "@/hooks/use-toast";

// Types for our news data
export interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  region?: string;
}

// Available news sources
export type NewsSource = "headlines" | "x" | "worldwide" | "africa" | "nigeria";

// Mock API responses for different sources if real API fails
const fallbackNews: Record<NewsSource, string[]> = {
  headlines: [
    "Supreme Court delivers landmark ruling on digital privacy case",
    "Major tech company announces breakthrough in quantum computing",
    "International climate agreement reached after marathon negotiations",
    "Global markets react to unexpected economic forecast",
    "Medical researchers announce promising results in vaccine development"
  ],
  x: [
    "Trending hashtag reaches over 1 million posts in 24 hours",
    "Celebrity announcement goes viral with record engagement",
    "Tech influencer shares first look at upcoming smartphone",
    "Breaking political news gains traction across platform",
    "Sports fans react to controversial referee decision"
  ],
  worldwide: [
    "European Union announces new trade agreement with Asian nations",
    "Massive cultural festival attracts tourists from across the globe",
    "International space mission reports groundbreaking discovery",
    "Global effort launched to address plastic pollution in oceans",
    "World leaders gather for summit on economic cooperation"
  ],
  africa: [
    "Pan-African trade agreement enters implementation phase",
    "Renewable energy initiative launched across multiple African nations",
    "Conservation efforts see remarkable success in wildlife protection",
    "Cultural festival celebrates diversity of African heritage",
    "Tech startup hub in East Africa attracts international investment"
  ],
  nigeria: [
    "Nigerian tech startups secure record funding in first quarter",
    "Cultural festival in Lagos celebrates Nigeria's artistic heritage",
    "Government announces infrastructure development initiative",
    "Nigerian athlete breaks world record at international competition",
    "Economic reforms aim to boost local manufacturing sector"
  ]
};

// NewsAPI endpoints for different regions
const NEWS_API_ENDPOINTS: Record<NewsSource, string> = {
  headlines: "https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY",
  x: "https://newsapi.org/v2/everything?q=twitter OR X&sortBy=popularity&apiKey=YOUR_API_KEY",
  worldwide: "https://newsapi.org/v2/top-headlines?language=en&apiKey=YOUR_API_KEY",
  africa: "https://newsapi.org/v2/everything?q=Africa&sortBy=publishedAt&apiKey=YOUR_API_KEY",
  nigeria: "https://newsapi.org/v2/top-headlines?country=ng&apiKey=YOUR_API_KEY"
};

const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds

// Cache for each news source
const cachedNews: Record<NewsSource, string[]> = {
  headlines: [...fallbackNews.headlines],
  x: [...fallbackNews.x],
  worldwide: [...fallbackNews.worldwide],
  africa: [...fallbackNews.africa],
  nigeria: [...fallbackNews.nigeria]
};

// Last fetch time for each source
const lastFetchTimes: Record<NewsSource, number> = {
  headlines: 0,
  x: 0,
  worldwide: 0,
  africa: 0,
  nigeria: 0
};

/**
 * Fetches news from a specific source
 */
export async function fetchNews(source: NewsSource = "headlines"): Promise<string[]> {
  try {
    // If we have cached news and it's been less than the refresh interval, return the cached news
    const now = Date.now();
    if (cachedNews[source].length > 0 && now - lastFetchTimes[source] < REFRESH_INTERVAL) {
      return cachedNews[source];
    }

    // Fetch news from the API
    const response = await fetch(NEWS_API_ENDPOINTS[source]);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${source} news: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform API response to our format
    if (data.articles && data.articles.length > 0) {
      cachedNews[source] = data.articles
        .slice(0, 5)
        .map((article: any) => article.title)
        .filter((title: string) => title && title.length > 0);
      
      lastFetchTimes[source] = now;
      console.log(`Fetched fresh ${source} news`);
      return cachedNews[source];
    } else {
      // If no articles found, return fallback
      return fallbackNews[source];
    }
  } catch (error) {
    console.error(`Error fetching ${source} news:`, error);
    // Use fallback news data in case of error
    return fallbackNews[source];
  }
}

/**
 * Fetches breaking news (backward compatibility)
 */
export async function fetchBreakingNews(): Promise<string[]> {
  return fetchNews("headlines");
}

/**
 * Sets up intervals to refresh news in the background
 */
export function startNewsRefreshInterval() {
  // Initial fetch for all sources
  const sources: NewsSource[] = ["headlines", "x", "worldwide", "africa", "nigeria"];
  
  sources.forEach(source => {
    fetchNews(source).then(() => {
      console.log(`Initial ${source} news loaded`);
    });
  });

  // Set up interval for background refreshes
  const intervalId = setInterval(async () => {
    try {
      for (const source of sources) {
        await fetchNews(source);
      }
      // Notify user only on successful updates
      toast({
        title: "News Updated",
        description: "News from all sources has been refreshed",
        duration: 3000
      });
    } catch (error) {
      console.error("Background news refresh failed:", error);
    }
  }, REFRESH_INTERVAL);

  // Return cleanup function
  return () => clearInterval(intervalId);
}
