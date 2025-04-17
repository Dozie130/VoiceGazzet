
import { Info, X } from "lucide-react";
import { useState, useEffect } from "react";

interface AdPlaceholderProps {
  type: "banner" | "sidebar" | "inline";
  id?: string;
}

export function AdPlaceholder({ type, id = "ad-" + Math.random().toString(36).substr(2, 9) }: AdPlaceholderProps) {
  const [visible, setVisible] = useState(true);
  const [impressions, setImpressions] = useState(0);
  
  let width = "w-full";
  let height = "h-24";

  if (type === "banner") {
    height = "h-24 md:h-32";
  } else if (type === "sidebar") {
    height = "h-64";
  } else if (type === "inline") {
    height = "h-20";
  }

  // Record impression when ad becomes visible
  useEffect(() => {
    if (visible) {
      setImpressions(prev => prev + 1);
      // In a real app, you would track this with analytics
      console.log(`Ad ${id} impression recorded. Total: ${impressions + 1}`);
    }
  }, [id, visible, impressions]);

  // Mock function to simulate ad click tracking
  const trackAdClick = () => {
    // In a real app, this would send click tracking data to analytics
    console.log(`Ad ${id} clicked`);
    
    // In a real implementation, this would navigate to the advertiser's site
    // window.open('https://example.com', '_blank');
  };

  const closeAd = () => {
    setVisible(false);
    // In a real app, you would track this with analytics
    console.log(`Ad ${id} closed by user`);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={`${width} ${height} bg-secondary/50 dark:bg-secondary/30 rounded-md relative border border-dashed border-muted-foreground/30 transition-all duration-300 hover:border-muted-foreground/50`}>
      <button 
        onClick={closeAd} 
        className="absolute top-2 right-2 text-muted-foreground/70 hover:text-muted-foreground z-10"
        aria-label="Close advertisement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      
      <button 
        onClick={trackAdClick}
        className="absolute inset-0 w-full h-full flex items-center justify-center group cursor-pointer"
        aria-label="Advertisement content"
      >
        <div className="text-center text-muted-foreground group-hover:scale-105 transition-transform">
          <div className="flex justify-center mb-1">
            <Info className="h-4 w-4" />
          </div>
          <p className="text-xs font-medium">Advertisement</p>
          <p className="text-[10px] mt-1 opacity-70">Your ad could be here</p>
        </div>
      </button>
    </div>
  );
}
