
import { cn } from "@/lib/utils";
import React from "react";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  intensity?: "low" | "medium" | "high";
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className, hover = false, intensity = "medium", ...props }, ref) => {
    const intensityClasses = {
      low: "bg-white/40 backdrop-blur-sm border-white/10",
      medium: "bg-white/60 backdrop-blur-md border-white/20",
      high: "bg-white/80 backdrop-blur-lg border-white/30",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border shadow-sm transition-all duration-300",
          intensityClasses[intensity],
          hover && "hover:shadow-md hover:translate-y-[-2px]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
