
import { Info } from "lucide-react";

interface AdPlaceholderProps {
  type: "banner" | "sidebar" | "inline";
}

export function AdPlaceholder({ type }: AdPlaceholderProps) {
  let width = "w-full";
  let height = "h-24";

  if (type === "banner") {
    height = "h-24 md:h-32";
  } else if (type === "sidebar") {
    height = "h-64";
  } else if (type === "inline") {
    height = "h-20";
  }

  return (
    <div className={`${width} ${height} bg-secondary/50 dark:bg-secondary/30 rounded-md flex items-center justify-center border border-dashed border-muted-foreground/30`}>
      <div className="text-center text-muted-foreground">
        <div className="flex justify-center mb-1">
          <Info className="h-4 w-4" />
        </div>
        <p className="text-xs font-medium">Advertisement</p>
      </div>
    </div>
  );
}
