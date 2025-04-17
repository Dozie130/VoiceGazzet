
import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Radio } from "lucide-react";

// Mock live news data
const liveNewsItems = [
  "Stock markets reach all-time high as tech sector booms",
  "Scientists discover potential breakthrough in renewable energy storage",
  "Olympic committee announces host city for 2036 Summer Games",
  "Global leaders agree on new climate change framework",
  "Health experts release guidelines for post-pandemic workplace safety",
  "Major automaker announces shift to all-electric vehicle production by 2030"
];

export function LiveNewsTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Automatically scroll news items
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % liveNewsItems.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  // Reset animation when item changes
  useEffect(() => {
    if (tickerRef.current) {
      tickerRef.current.style.animation = 'none';
      // Trigger reflow
      void tickerRef.current.offsetWidth;
      tickerRef.current.style.animation = '';
    }
  }, [currentIndex]);

  // Show fewer items on mobile
  const visibleNews = isMobile ? 1 : 3;
  
  return (
    <div 
      className="bg-background border-y border-border py-1.5 overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="flex items-center bg-primary/10 dark:bg-primary/20 rounded-full px-2 py-0.5 mr-3">
            <Radio className="h-3 w-3 text-news-crimson animate-pulse mr-1" />
            <span className="text-xs font-semibold uppercase">Live</span>
          </div>
          
          <div className="relative overflow-hidden flex-1" style={{ height: '1.5rem' }}>
            <div
              ref={tickerRef}
              className="flex whitespace-nowrap animate-scroll"
              style={{
                animationPlayState: isPaused ? 'paused' : 'running'
              }}
            >
              {liveNewsItems.slice(currentIndex, currentIndex + visibleNews)
                .concat(
                  liveNewsItems.slice(
                    0, 
                    Math.max(0, visibleNews - (liveNewsItems.length - currentIndex))
                  )
                )
                .map((item, index) => (
                  <div 
                    key={`${item}-${index}`} 
                    className="text-sm px-4 border-r border-border last:border-r-0 flex-shrink-0"
                  >
                    {item}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
