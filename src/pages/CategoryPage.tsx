
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { LiveNewsTicker } from "@/components/LiveNewsTicker";
import { CategorySection } from "@/components/CategorySection";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";

// Define interface for article data
interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  isBreaking?: boolean; // Added optional isBreaking property
}

// Mock data for different categories as Record of category ID to array of articles
const categoryArticles: Record<string, Article[]> = {
  politics: [
    {
      id: 101,
      title: "President Announces New Climate Initiative During Global Summit",
      excerpt: "The initiative aims to reduce carbon emissions by 40% over the next decade through international cooperation and investment in green technologies.",
      category: "Politics",
      author: "James Wilson",
      date: "April 16, 2025",
      imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 102,
      title: "Parliament Passes Controversial Digital Privacy Bill",
      excerpt: "The bill establishes new regulations for data collection and usage by tech companies.",
      category: "Politics",
      author: "Emma Davis",
      date: "April 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    // More articles would be here in a real implementation
  ],
  business: [
    {
      id: 201,
      title: "Tech Giant Acquires AI Startup for $2 Billion",
      excerpt: "The acquisition marks one of the largest deals in the artificial intelligence sector this year.",
      category: "Business",
      author: "Michael Chen",
      date: "April 16, 2025",
      imageUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 202,
      title: "Global Stock Markets Hit Record Highs Following Economic Report",
      excerpt: "Investors react positively to better-than-expected economic growth figures.",
      category: "Business",
      author: "Jennifer Lee",
      date: "April 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isBreaking: true,
    },
    // More articles would be here in a real implementation
  ],
  technology: [
    {
      id: 301,
      title: "Breakthrough in Quantum Computing Announced by Research Team",
      excerpt: "Scientists claim to have achieved quantum supremacy with new processor design.",
      category: "Technology",
      author: "Sarah Zhang",
      date: "April 16, 2025",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 302,
      title: "New Smartphone Features Revolutionary Battery Technology",
      excerpt: "The device can reportedly last up to three days on a single charge.",
      category: "Technology",
      author: "David Kim",
      date: "April 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1553345258-61c2d796710a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    // More articles would be here in a real implementation
  ],
  sports: [
    {
      id: 401,
      title: "National Team Secures Spot in World Cup Finals",
      excerpt: "The team's victory in the semifinal guarantees them a chance at the championship.",
      category: "Sports",
      author: "John Martinez",
      date: "April 16, 2025",
      imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 402,
      title: "Star Athlete Signs Record-Breaking Contract Extension",
      excerpt: "The deal is reportedly worth over $300 million over five years.",
      category: "Sports",
      author: "Amanda Johnson",
      date: "April 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    // More articles would be here in a real implementation
  ],
  entertainment: [
    {
      id: 501,
      title: "Blockbuster Film Breaks Opening Weekend Box Office Records",
      excerpt: "The highly anticipated sequel exceeded expectations with global ticket sales.",
      category: "Entertainment",
      author: "Rachel Green",
      date: "April 16, 2025",
      imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 502,
      title: "Music Superstar Announces Surprise Album and World Tour",
      excerpt: "Fans were delighted by the unexpected announcement on social media.",
      category: "Entertainment",
      author: "Daniel Smith",
      date: "April 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    // More articles would be here in a real implementation
  ],
  health: [
    {
      id: 601,
      title: "New Study Reveals Benefits of Mediterranean Diet",
      excerpt: "Researchers found significant improvements in heart health and longevity.",
      category: "Health",
      author: "Dr. Lisa Chen",
      date: "April 16, 2025",
      imageUrl: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 602,
      title: "Breakthrough in Alzheimer's Research Offers Hope for Treatment",
      excerpt: "Clinical trials show promising results for new drug therapy.",
      category: "Health",
      author: "Dr. James Wilson",
      date: "April 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    // More articles would be here in a real implementation
  ],
  breaking: [
    {
      id: 701,
      title: "Breaking: Major Political Agreement Reached in Peace Talks",
      excerpt: "After months of negotiations, leaders announce historic agreement.",
      category: "Breaking",
      author: "International Desk",
      date: "April 16, 2025",
      imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605b5e5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isBreaking: true,
    },
    {
      id: 702,
      title: "Breaking: Central Bank Announces Emergency Interest Rate Cut",
      excerpt: "Markets respond positively to surprise economic intervention.",
      category: "Breaking",
      author: "Economics Team",
      date: "April 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      isBreaking: true,
    },
    // More articles would be here in a real implementation
  ],
  world: [
    {
      id: 801,
      title: "International Climate Agreement Enters New Phase",
      excerpt: "Countries pledge increased cooperation on environmental challenges.",
      category: "World",
      author: "Global Affairs Desk",
      date: "April 16, 2025",
      imageUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 802,
      title: "Cultural Exchange Program Launched Between Continents",
      excerpt: "Initiative aims to promote understanding and collaboration across borders.",
      category: "World",
      author: "Cultural Affairs",
      date: "April 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    // More articles would be here in a real implementation
  ],
  africa: [
    {
      id: 901,
      title: "Pan-African Trade Agreement Shows Early Success",
      excerpt: "Economic indicators point to positive impact across the continent.",
      category: "Africa",
      author: "African Affairs Desk",
      date: "April 16, 2025",
      imageUrl: "https://images.unsplash.com/photo-1489493512598-d08130f49bea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 902,
      title: "Conservation Efforts in East Africa Yield Promising Results",
      excerpt: "Wildlife population numbers show signs of recovery in protected areas.",
      category: "Africa",
      author: "Environmental Team",
      date: "April 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    // More articles would be here in a real implementation
  ],
  nigeria: [
    {
      id: 1001,
      title: "Nigerian Tech Startups Attract Record Investment",
      excerpt: "International venture capital shows increasing interest in the nation's tech ecosystem.",
      category: "Nigeria",
      author: "Tech Correspondent",
      date: "April 16, 2025",
      imageUrl: "https://images.unsplash.com/photo-1577368211130-4bdd7f9e6f7c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    {
      id: 1002,
      title: "Cultural Festival in Lagos Celebrates Nigeria's Diversity",
      excerpt: "Event showcases art, music, and cuisine from across the nation.",
      category: "Nigeria",
      author: "Cultural Reporter",
      date: "April 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    },
    // More articles would be here in a real implementation
  ],
};

interface CategoryPageProps {}

const CategoryPage: React.FC<CategoryPageProps> = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("bg-news-navy");
  
  useEffect(() => {
    if (!categoryId) return;
    
    // Set proper display name for category
    const name = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
    setCategoryName(name);
    
    // Set color based on category
    switch(categoryId) {
      case "politics":
        setCategoryColor("bg-blue-600");
        break;
      case "business":
        setCategoryColor("bg-green-600");
        break;
      case "technology":
        setCategoryColor("bg-purple-600");
        break;
      case "sports":
        setCategoryColor("bg-orange-600");
        break;
      case "entertainment":
        setCategoryColor("bg-pink-600");
        break;
      case "health":
        setCategoryColor("bg-teal-600");
        break;
      case "breaking":
        setCategoryColor("bg-news-crimson");
        break;
      case "world":
        setCategoryColor("bg-indigo-600");
        break;
      case "africa":
        setCategoryColor("bg-yellow-600");
        break;
      case "nigeria":
        setCategoryColor("bg-green-700");
        break;
      default:
        setCategoryColor("bg-news-navy");
    }
  }, [categoryId]);

  // Get articles for this category (or empty array if category doesn't exist)
  const articles = categoryId ? (categoryArticles[categoryId as keyof typeof categoryArticles] || []) : [];

  return (
    <>
      <Header />
      <LiveNewsTicker />
      <main className="my-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <div className={`w-2 h-8 ${categoryColor} mr-3 rounded-full`} />
            <h1 className="text-3xl font-bold">{categoryName}</h1>
          </div>
          
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div key={article.id} className="group">
                  <div className="rounded-xl overflow-hidden mb-3">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{article.date}</span>
                      {article.isBreaking && (
                        <span className="text-xs font-semibold uppercase px-1.5 py-0.5 rounded bg-news-crimson text-white">
                          Breaking
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-news-crimson transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {article.excerpt}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      By {article.author}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No articles found for this category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CategoryPage;
