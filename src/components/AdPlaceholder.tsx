
import { Info, X, Tag } from "lucide-react";
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
      console.log(`Ad ${id} impression recorded. Total: ${impressions + 1}`);
    }
  }, [id, visible, impressions]);

  const mockAds = {
    banner: {
      title: "Subscribe to Premium",
      description: "Get unlimited access to exclusive content",
      cta: "Start Free Trial",
      bgColor: "bg-gradient-to-r from-blue-500 to-purple-500"
    },
    sidebar: {
      title: "Download Our App",
      description: "Stay updated with our mobile app",
      cta: "Get the App",
      bgColor: "bg-gradient-to-b from-green-500 to-emerald-600"
    },
    inline: {
      title: "Special Offer",
      description: "Limited time discount on annual plans",
      cta: "Learn More",
      bgColor: "bg-gradient-to-r from-orange-500 to-red-500"
    }
  };

  const currentAd = mockAds[type];

  // Mock function to simulate ad click tracking
  const trackAdClick = () => {
    console.log(`Ad ${id} clicked`);
  };

  const closeAd = () => {
    setVisible(false);
    console.log(`Ad ${id} closed by user`);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={`${width} ${height} ${currentAd.bgColor} rounded-md relative transition-all duration-300 hover:shadow-lg group overflow-hidden`}>
      <button 
        onClick={closeAd} 
        className="absolute top-2 right-2 text-white/70 hover:text-white z-10 bg-black/20 rounded-full p-1"
        aria-label="Close advertisement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      
      <div className="absolute top-2 left-2 flex items-center gap-1 text-white/70 text-xs">
        <Tag className="h-3 w-3" />
        <span>Advertisement</span>
      </div>
      
      <button 
        onClick={trackAdClick}
        className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer"
        aria-label="Advertisement content"
      >
        <div className="text-center text-white group-hover:scale-105 transition-transform p-4">
          <h3 className="font-bold text-lg mb-1">{currentAd.title}</h3>
          <p className="text-sm text-white/90 mb-3">{currentAd.description}</p>
          <span className="inline-block bg-white text-gray-800 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/90 transition-colors">
            {currentAd.cta}
          </span>
        </div>
      </button>

      {/* Decorative elements */}
      <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
