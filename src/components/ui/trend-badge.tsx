
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react";
import React from "react";

export interface TrendBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  showIcon?: boolean;
  showZero?: boolean;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const TrendBadge = React.forwardRef<HTMLDivElement, TrendBadgeProps>(
  ({ 
    value, 
    showIcon = true, 
    showZero = true,
    iconOnly = false,
    size = "md",
    className, 
    ...props 
  }, ref) => {
    // Determine if trend is positive, negative, or neutral
    const trend = value > 0 ? "up" : value < 0 ? "down" : "neutral";
    
    // Color classes based on trend
    const colorClasses = {
      up: "bg-success/10 text-success",
      down: "bg-destructive/10 text-destructive",
      neutral: "bg-muted text-muted-foreground",
    };

    // Size classes
    const sizeClasses = {
      sm: "text-xs py-0.5 px-1.5",
      md: "text-sm py-1 px-2",
      lg: "text-base py-1.5 px-3",
    };

    // Icons based on trend
    const icons = {
      up: <ArrowUpIcon className={cn("inline", size === "sm" ? "h-3 w-3" : "h-4 w-4")} />,
      down: <ArrowDownIcon className={cn("inline", size === "sm" ? "h-3 w-3" : "h-4 w-4")} />,
      neutral: <MinusIcon className={cn("inline", size === "sm" ? "h-3 w-3" : "h-4 w-4")} />,
    };

    // If value is 0 and showZero is false, return null
    if (value === 0 && !showZero) {
      return null;
    }

    const formattedValue = Math.abs(value).toFixed(2);

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-full font-medium",
          colorClasses[trend],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {showIcon && icons[trend]}
        {!iconOnly && (
          <span>
            {trend === "up" && "+"}{formattedValue}%
          </span>
        )}
      </div>
    );
  }
);

TrendBadge.displayName = "TrendBadge";

export { TrendBadge };
