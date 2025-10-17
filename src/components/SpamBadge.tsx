import { CheckCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpamBadgeProps {
  isSpam: boolean;
  confidence?: number;
  className?: string;
}

export function SpamBadge({ isSpam, confidence, className }: SpamBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold",
        isSpam
          ? "bg-gradient-danger text-white"
          : "bg-gradient-safe text-white",
        className
      )}
    >
      {isSpam ? (
        <AlertTriangle className="h-4 w-4" />
      ) : (
        <CheckCircle className="h-4 w-4" />
      )}
      <span>{isSpam ? "🚨 Spam" : "✅ Not Spam"}</span>
      {confidence && (
        <span className="text-xs opacity-90">
          ({(confidence * 100).toFixed(0)}%)
        </span>
      )}
    </div>
  );
}