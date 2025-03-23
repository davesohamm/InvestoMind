
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Sidebar } from "@/components/layout/Sidebar";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { 
  BellIcon, 
  TrendingUpIcon, 
  TrendingDownIcon, 
  AlertCircleIcon,
  NewspaperIcon,
  CheckIcon,
  TrashIcon
} from "lucide-react";

// Mock notification data
const INITIAL_NOTIFICATIONS = [
  {
    id: "1",
    type: "price-alert",
    title: "AAPL Price Alert",
    description: "Apple Inc. has increased by 3.5% in the last hour",
    time: "10 minutes ago",
    read: false,
    icon: TrendingUpIcon,
    iconColor: "text-success"
  },
  {
    id: "2",
    type: "price-alert",
    title: "TSLA Price Alert",
    description: "Tesla, Inc. has decreased by 2.8% in the last hour",
    time: "25 minutes ago",
    read: false,
    icon: TrendingDownIcon,
    iconColor: "text-destructive"
  },
  {
    id: "3",
    type: "news",
    title: "Market News",
    description: "Fed announces new interest rate decision - markets react positively",
    time: "1 hour ago",
    read: true,
    icon: NewspaperIcon,
    iconColor: "text-primary"
  },
  {
    id: "4",
    type: "alert",
    title: "Market Volatility",
    description: "Unusual market volatility detected. Consider reviewing your portfolio.",
    time: "3 hours ago",
    read: true,
    icon: AlertCircleIcon,
    iconColor: "text-warning"
  },
  {
    id: "5",
    type: "news",
    title: "Quarterly Earnings",
    description: "Microsoft reports Q2 earnings, exceeding analyst expectations",
    time: "5 hours ago",
    read: true,
    icon: NewspaperIcon,
    iconColor: "text-primary"
  },
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState("all");
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.type === filter;
  });
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <PageTransition>
          <main className="p-6">
            <div className="container pb-12">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <BellIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">Notifications</h1>
                      <p className="text-muted-foreground">
                        Stay updated with market alerts and news
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {unreadCount > 0 && (
                      <Button variant="outline" onClick={markAllAsRead}>
                        <CheckIcon className="mr-2 h-4 w-4" />
                        Mark All Read
                      </Button>
                    )}
                    
                    {notifications.length > 0 && (
                      <Button variant="outline" onClick={clearAll}>
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Clear All
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  <Button 
                    variant={filter === "all" ? "default" : "outline"} 
                    onClick={() => setFilter("all")}
                    size="sm"
                  >
                    All
                  </Button>
                  <Button 
                    variant={filter === "unread" ? "default" : "outline"} 
                    onClick={() => setFilter("unread")}
                    size="sm"
                  >
                    Unread {unreadCount > 0 && `(${unreadCount})`}
                  </Button>
                  <Button 
                    variant={filter === "price-alert" ? "default" : "outline"} 
                    onClick={() => setFilter("price-alert")}
                    size="sm"
                  >
                    Price Alerts
                  </Button>
                  <Button 
                    variant={filter === "news" ? "default" : "outline"} 
                    onClick={() => setFilter("news")}
                    size="sm"
                  >
                    News
                  </Button>
                  <Button 
                    variant={filter === "alert" ? "default" : "outline"} 
                    onClick={() => setFilter("alert")}
                    size="sm"
                  >
                    System Alerts
                  </Button>
                </div>
                
                {filteredNotifications.length === 0 ? (
                  <GlassCard className="p-10 text-center">
                    <BellIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h2 className="text-xl font-semibold mb-2">No notifications</h2>
                    <p className="text-muted-foreground">
                      {filter === "all" 
                        ? "You don't have any notifications yet" 
                        : `You don't have any ${filter === "unread" ? "unread" : filter} notifications`}
                    </p>
                  </GlassCard>
                ) : (
                  <div className="space-y-4">
                    {filteredNotifications.map((notification) => {
                      const Icon = notification.icon;
                      return (
                        <GlassCard 
                          key={notification.id} 
                          className={`p-4 ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-full ${notification.iconColor} bg-background`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{notification.title}</h3>
                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => markAsRead(notification.id)}
                                  className="h-8 w-8"
                                >
                                  <CheckIcon className="h-4 w-4" />
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => deleteNotification(notification.id)}
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </GlassCard>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
