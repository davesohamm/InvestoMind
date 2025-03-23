
import { cn } from "@/lib/utils";
import React from "react";
import { GlassCard } from "./glass-card";
import { TrendBadge } from "./trend-badge";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  change?: number;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ 
    title, 
    value, 
    change, 
    prefix, 
    suffix, 
    icon, 
    loading = false, 
    className, 
    ...props 
  }, ref) => {
    return (
      <GlassCard
        ref={ref}
        className={cn("p-5 flex flex-col gap-3", className)}
        hover
        {...props}
      >
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {icon && <div className="text-primary/80">{icon}</div>}
        </div>
        
        <div className="mt-1">
          {loading ? (
            <div className="h-8 w-24 bg-muted/50 animate-pulse rounded"></div>
          ) : (
            <div className="flex items-baseline">
              {prefix && <span className="text-sm mr-1 text-muted-foreground">{prefix}</span>}
              <span className="text-2xl font-semibold">{value}</span>
              {suffix && <span className="text-sm ml-1 text-muted-foreground">{suffix}</span>}
            </div>
          )}
        </div>

        {(change !== undefined) && (
          <div className="mt-auto">
            <TrendBadge value={change} />
          </div>
        )}
      </GlassCard>
    );
  }
);

StatCard.displayName = "StatCard";

export { StatCard };
