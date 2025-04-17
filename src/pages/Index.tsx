
import { Header } from "@/components/Header";
import { BreakingNewsBanner } from "@/components/BreakingNewsBanner";
import { LiveNewsTicker } from "@/components/LiveNewsTicker";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedArticles } from "@/components/FeaturedArticles";
import { CategorySection } from "@/components/CategorySection";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Footer } from "@/components/Footer";

// Mock data - in a real app, this would come from an API
const politicsArticles = [
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
  {
    id: 103,
    title: "Supreme Court Ruling Reshapes Electoral District Boundaries",
    excerpt: "The landmark decision will affect upcoming elections in multiple states.",
    category: "Politics",
    author: "Robert Lee",
    date: "April 14, 2025",
    imageUrl: "https://images.unsplash.com/photo-1589262804704-c5aa9e6def89?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 104,
    title: "Foreign Ministers Meet to Discuss Regional Security Concerns",
    excerpt: "The talks focused on maintaining stability amid rising tensions.",
    category: "Politics",
    author: "Sarah Johnson",
    date: "April 13, 2025",
    imageUrl: "https://images.unsplash.com/photo-1482784160316-6eb046863ece?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 105,
    title: "Local Government Implements New Public Transport Initiative",
    excerpt: "The initiative aims to reduce traffic congestion and carbon emissions in metropolitan areas.",
    category: "Politics",
    author: "David Chen",
    date: "April 12, 2025",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  }
];

const businessArticles = [
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
  {
    id: 203,
    title: "Major Retailer Announces Expansion Plan with 200 New Stores",
    excerpt: "The expansion is expected to create thousands of jobs across the country.",
    category: "Business",
    author: "Thomas Garcia",
    date: "April 14, 2025",
    imageUrl: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 204,
    title: "Oil Prices Stabilize After Weeks of Volatility",
    excerpt: "Experts attribute the stabilization to new supply agreements between major producers.",
    category: "Business",
    author: "Lisa Wang",
    date: "April 13, 2025",
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 205,
    title: "Central Bank Announces Interest Rate Decision",
    excerpt: "The decision comes amid concerns about inflation and economic growth.",
    category: "Business",
    author: "Richard Brooks",
    date: "April 12, 2025",
    imageUrl: "https://images.unsplash.com/photo-1565514477972-9e1c16c2c380?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  }
];

const sportsArticles = [
  {
    id: 301,
    title: "National Team Secures Spot in World Cup Finals",
    excerpt: "The team's victory in the semifinal guarantees them a chance at the championship.",
    category: "Sports",
    author: "John Martinez",
    date: "April 16, 2025",
    imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 302,
    title: "Star Athlete Signs Record-Breaking Contract Extension",
    excerpt: "The deal is reportedly worth over $300 million over five years.",
    category: "Sports",
    author: "Amanda Johnson",
    date: "April 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1475440197469-e367ec8eeb19?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 303,
    title: "Championship Match Ends in Dramatic Overtime Victory",
    excerpt: "The underdog team pulled off a stunning comeback in the final minutes.",
    category: "Sports",
    author: "Carlos Mendez",
    date: "April 14, 2025",
    imageUrl: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 304,
    title: "Olympic Committee Announces Host City for 2036 Games",
    excerpt: "The selection comes after years of bidding and preparation by candidate cities.",
    category: "Sports",
    author: "Sofia Lopez",
    date: "April 13, 2025",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 305,
    title: "Legendary Coach Announces Retirement After 30-Year Career",
    excerpt: "The coach leaves behind a legacy of championships and developed talent.",
    category: "Sports",
    author: "Kevin Thompson",
    date: "April 12, 2025",
    imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  }
];

const entertainmentArticles = [
  {
    id: 401,
    title: "Blockbuster Film Breaks Opening Weekend Box Office Records",
    excerpt: "The highly anticipated sequel exceeded expectations with global ticket sales.",
    category: "Entertainment",
    author: "Rachel Green",
    date: "April 16, 2025",
    imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 402,
    title: "Music Superstar Announces Surprise Album and World Tour",
    excerpt: "Fans were delighted by the unexpected announcement on social media.",
    category: "Entertainment",
    author: "Daniel Smith",
    date: "April 15, 2025",
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 403,
    title: "Streaming Service Lands Rights to Acclaimed Book Series Adaptation",
    excerpt: "The deal is reportedly worth hundreds of millions of dollars.",
    category: "Entertainment",
    author: "Emily Johnson",
    date: "April 14, 2025",
    imageUrl: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 404,
    title: "Celebrity Couple Announces Engagement After Whirlwind Romance",
    excerpt: "The pair made the announcement with stunning photos on social media.",
    category: "Entertainment",
    author: "Jessica Williams",
    date: "April 13, 2025",
    imageUrl: "https://images.unsplash.com/photo-1604514628550-37477afdf4e3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 405,
    title: "Award-Winning TV Series Confirmed for Final Season",
    excerpt: "Producers promise a satisfying conclusion to the critically acclaimed show.",
    category: "Entertainment",
    author: "Alex Rodriguez",
    date: "April 12, 2025",
    imageUrl: "https://images.unsplash.com/photo-1605703485586-18293fdb31b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  }
];

export default function Index() {
  return (
    <>
      <Header />
      <LiveNewsTicker />
      <BreakingNewsBanner />
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Featured Articles Section */}
        <FeaturedArticles />
        
        {/* Ad Banner */}
        <div className="container mx-auto px-4 py-4">
          <AdPlaceholder type="banner" id="main-banner" />
        </div>
        
        {/* Categories Sections */}
        <CategorySection 
          title="Politics" 
          articles={politicsArticles} 
          color="bg-blue-600" 
          viewAllLink="/category/politics" 
        />
        
        <div className="py-4 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <AdPlaceholder type="inline" id="politics-ad" />
          </div>
        </div>
        
        <CategorySection 
          title="Business" 
          articles={businessArticles} 
          color="bg-green-600" 
          viewAllLink="/category/business" 
        />
        
        <div className="py-4">
          <div className="container mx-auto px-4">
            <AdPlaceholder type="inline" id="business-ad" />
          </div>
        </div>
        
        <CategorySection 
          title="Sports" 
          articles={sportsArticles} 
          color="bg-orange-600" 
          viewAllLink="/category/sports" 
        />
        
        <div className="py-4 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <AdPlaceholder type="inline" id="sports-ad" />
          </div>
        </div>
        
        <CategorySection 
          title="Entertainment" 
          articles={entertainmentArticles} 
          color="bg-purple-600" 
          viewAllLink="/category/entertainment" 
        />
      </main>
      <Footer />
    </>
  );
}
