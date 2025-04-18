
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { LiveNewsTicker } from "@/components/LiveNewsTicker";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import { fetchNews, NewsSource } from "@/services/newsService";

interface NewsItem {
  text: string;
  source: NewsSource;
}

const SourcePage = () => {
  const { sourceId } = useParams<{ sourceId: string }>();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [sourceName, setSourceName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!sourceId) return;
    
    // Set proper display name for source
    switch(sourceId) {
      case "x":
        setSourceName("X");
        break;
      case "worldwide":
        setSourceName("Worldwide News");
        break;
      case "africa":
        setSourceName("African News");
        break;
      case "nigeria":
        setSourceName("Nigerian News");
        break;
      default:
        setSourceName(sourceId.charAt(0).toUpperCase() + sourceId.slice(1));
    }
    
    const loadNews = async () => {
      setIsLoading(true);
      try {
        // Only fetch if sourceId is a valid NewsSource
        if (sourceId === "x" || 
            sourceId === "worldwide" || 
            sourceId === "africa" || 
            sourceId === "nigeria") {
          const items = await fetchNews(sourceId as NewsSource);
          setNewsItems(items.map(text => ({ 
            text, 
            source: sourceId as NewsSource
          })));
        }
      } catch (error) {
        console.error(`Error loading ${sourceId} news:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNews();
  }, [sourceId]);

  return (
    <>
      <Header />
      <LiveNewsTicker />
      <main className="my-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <div className="w-2 h-8 bg-news-navy mr-3 rounded-full" />
            <h1 className="text-3xl font-bold">News from {sourceName}</h1>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-pulse text-center">
                <p>Loading news...</p>
              </div>
            </div>
          ) : newsItems.length > 0 ? (
            <div className="space-y-6">
              {newsItems.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <p className="text-lg font-medium">{item.text}</p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Source: {sourceName}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No news found from this source.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SourcePage;
