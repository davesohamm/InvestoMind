
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/hooks/use-theme";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <PageTransition>
          <main className="p-6">
            <div className="container pb-12">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center gap-3 mb-8">
                  <h1 className="text-2xl font-bold">Settings</h1>
                  <p className="text-muted-foreground">
                    Customize your experience
                  </p>
                </div>

                <GlassCard className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Appearance</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Toggle between light and dark mode
                        </p>
                      </div>
                      <Switch 
                        id="dark-mode" 
                        checked={theme === "dark"}
                        onCheckedChange={(checked) => 
                          setTheme(checked ? "dark" : "light")
                        }
                      />
                    </div>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Notifications</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive push notifications in browser
                        </p>
                      </div>
                      <Switch id="push-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="price-alerts">Price Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified about significant price changes
                        </p>
                      </div>
                      <Switch id="price-alerts" defaultChecked />
                    </div>
                  </div>
                </GlassCard>
                
                <GlassCard className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Account</h2>
                  
                  <div className="space-y-6">
                    <Button variant="outline">Change Password</Button>
                    <Button variant="outline" className="ml-2">Update Email</Button>
                    <div className="pt-4 border-t">
                      <Button variant="destructive">Delete Account</Button>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
