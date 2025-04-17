
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  isBreaking?: boolean;
}

interface CategorySectionProps {
  title: string;
  articles: Article[];
  color?: string;
  viewAllLink: string;
}

export function CategorySection({ title, articles, color = "bg-news-navy", viewAllLink }: CategorySectionProps) {
  if (!articles.length) return null;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className={`w-1 h-6 ${color} mr-3 rounded-full`} />
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
          <Link
            to={viewAllLink}
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-news-crimson"
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main article */}
          <div className="md:col-span-1 group">
            <div className="rounded-xl overflow-hidden">
              <img
                src={articles[0].imageUrl}
                alt={articles[0].title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Badge variant="outline" className="rounded-sm">
                  {articles[0].category}
                </Badge>
                <span>{articles[0].date}</span>
              </div>
              <h3 className="article-title line-clamp-2">
                <Link to={`/article/${articles[0].id}`}>{articles[0].title}</Link>
              </h3>
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {articles[0].excerpt}
              </p>
              <div className="article-meta">
                <span>By {articles[0].author}</span>
              </div>
            </div>
          </div>

          {/* List of articles */}
          <div className="md:col-span-2 border-l pl-6 space-y-4">
            {articles.slice(1, 5).map((article) => (
              <div key={article.id} className="group">
                <div className="flex space-x-4">
                  <div className="hidden sm:block flex-shrink-0">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{article.date}</span>
                      {article.isBreaking && (
                        <span className="breaking-news-tag">Breaking</span>
                      )}
                    </div>
                    <h3 className="font-semibold group-hover:text-news-crimson transition-colors line-clamp-2">
                      <Link to={`/article/${article.id}`}>{article.title}</Link>
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      By {article.author}
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
