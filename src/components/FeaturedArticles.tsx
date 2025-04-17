
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// This would normally come from an API
const featuredArticles = [
  {
    id: 1,
    title: "Global Climate Summit Leads to Historic Agreement on Emissions",
    excerpt:
      "World leaders reach a landmark deal to reduce carbon emissions by 50% by 2030, marking a turning point in climate policy.",
    category: "Politics",
    author: "Elena Rodriguez",
    date: "April 16, 2025",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isBreaking: true,
  },
  {
    id: 2,
    title: "Tech Giant Unveils Revolutionary AI Assistant for Healthcare",
    excerpt:
      "New artificial intelligence system promises to transform patient care by providing real-time diagnostics and treatment recommendations.",
    category: "Technology",
    author: "Michael Chen",
    date: "April 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isBreaking: false,
  },
  {
    id: 3,
    title: "Market Reaches All-Time High as Economy Shows Strong Growth",
    excerpt:
      "Stock markets surge following better-than-expected economic data and strong corporate earnings reports.",
    category: "Business",
    author: "Sarah Johnson",
    date: "April 16, 2025",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    isBreaking: false,
  },
];

export function FeaturedArticles() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured News</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main featured article */}
          <div className="md:col-span-2 group">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={featuredArticles[0].imageUrl}
                alt={featuredArticles[0].title}
                className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-0 p-6 space-y-2">
                  {featuredArticles[0].isBreaking && (
                    <span className="breaking-news-tag">Breaking</span>
                  )}
                  <div className="flex items-center space-x-2 text-white/80 text-sm">
                    <Badge
                      className="bg-news-crimson hover:bg-news-crimson/90 rounded-sm"
                      variant="secondary"
                    >
                      {featuredArticles[0].category}
                    </Badge>
                    <span>{featuredArticles[0].date}</span>
                  </div>
                  <h3 className="text-white text-xl md:text-2xl font-bold group-hover:text-news-crimson transition-colors">
                    {featuredArticles[0].title}
                  </h3>
                  <p className="text-white/80 line-clamp-2 md:line-clamp-3">
                    {featuredArticles[0].excerpt}
                  </p>
                  <div className="pt-2">
                    <Button
                      variant="link"
                      className="text-white hover:text-news-crimson p-0 h-auto font-medium"
                    >
                      Read More
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Secondary featured articles */}
          <div className="space-y-6">
            {featuredArticles.slice(1, 3).map((article) => (
              <div key={article.id} className="group">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-[180px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="absolute bottom-0 p-4 space-y-1">
                      {article.isBreaking && (
                        <span className="breaking-news-tag">Breaking</span>
                      )}
                      <div className="flex items-center space-x-2 text-white/80 text-xs">
                        <Badge
                          className="bg-news-crimson hover:bg-news-crimson/90 rounded-sm"
                          variant="secondary"
                        >
                          {article.category}
                        </Badge>
                        <span>{article.date}</span>
                      </div>
                      <h3 className="text-white text-sm md:text-base font-bold line-clamp-2 group-hover:text-news-crimson transition-colors">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
