
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  ChartLineIcon,
  FolderIcon,
  HomeIcon,
  SettingsIcon,
  StarIcon,
  ZapIcon,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

interface NavItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  to: string;
  isCollapsed: boolean;
}

function NavItem({ icon: Icon, title, to, isCollapsed }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
          isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground",
          isCollapsed && "justify-center py-3"
        )
      }
    >
      <Icon className={cn("h-5 w-5", isCollapsed && "h-6 w-6")} />
      {!isCollapsed && <span>{title}</span>}
    </NavLink>
  );
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-background h-[calc(100vh-64px)] transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-[220px]",
        className
      )}
    >
      <ScrollArea className="flex-1 p-3">
        <nav className="flex flex-col gap-1">
          <NavItem icon={HomeIcon} title="Dashboard" to="/" isCollapsed={isCollapsed} />
          <NavItem icon={ChartLineIcon} title="Stocks" to="/stocks" isCollapsed={isCollapsed} />
          <NavItem icon={FolderIcon} title="Portfolio" to="/portfolio" isCollapsed={isCollapsed} />
          <NavItem icon={StarIcon} title="Watchlist" to="/watchlist" isCollapsed={isCollapsed} />
          <NavItem icon={ZapIcon} title="AI Advisor" to="/ai-advisor" isCollapsed={isCollapsed} />
        </nav>
      </ScrollArea>
      
      <div className="border-t p-3">
        <NavItem
          icon={SettingsIcon}
          title="Settings"
          to="/settings"
          isCollapsed={isCollapsed}
        />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 -right-4 h-8 w-8 rounded-full bg-background border shadow-sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="h-4 w-4" />
      </Button>
    </div>
  );
}
