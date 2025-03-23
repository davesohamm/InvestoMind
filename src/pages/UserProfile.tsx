
import { useState, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useUserProfile } from "@/hooks/use-user-profile";
import { UserProfile as UserProfileType } from "@/services/userProfileService";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

// Available sectors for selection
const AVAILABLE_SECTORS = [
  "Technology", 
  "Healthcare", 
  "Financial Services", 
  "Consumer Discretionary", 
  "Energy", 
  "Real Estate", 
  "Communication Services",
  "Industrials",
  "Materials",
  "Utilities",
  "Consumer Staples"
];

export default function UserProfile() {
  const { profile, isLoading, isUpdating, updateProfile } = useUserProfile();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<UserProfileType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form data when profile is loaded
  if (profile && !formData) {
    setFormData({ ...profile });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!formData) return;

    const { name, value } = e.target;
    if (name.includes('.')) {
      // Handle nested properties like preferences.riskTolerance
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData] as Record<string, any>,
          [child]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSectorChange = (sector: string, isChecked: boolean) => {
    if (!formData) return;
    
    const updatedSectors = isChecked
      ? [...formData.preferences.preferredSectors, sector]
      : formData.preferences.preferredSectors.filter(s => s !== sector);
    
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        preferredSectors: updatedSectors
      }
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !formData) return;

    // Create a URL for the selected image file
    const url = URL.createObjectURL(file);
    setFormData({ ...formData, photoUrl: url });
    
    // In a real app, you would upload this to your storage service
    toast({
      title: "Photo selected",
      description: "Your photo will be updated when you save your profile."
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    
    updateProfile(formData);
    setEditMode(false);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <PageTransition>
            <main className="p-6 flex justify-center items-center min-h-[calc(100vh-4rem)]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </main>
          </PageTransition>
        </div>
      </div>
    );
  }

  if (!profile || !formData) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <PageTransition>
            <main className="p-6">
              <div className="container pb-12">
                <div className="max-w-4xl mx-auto">
                  <GlassCard className="p-6">
                    <p className="text-center">Error loading profile. Please try again later.</p>
                  </GlassCard>
                </div>
              </div>
            </main>
          </PageTransition>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <PageTransition>
          <main className="p-6">
            <div className="container pb-12">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold mb-2">User Profile</h1>
                  <p className="text-muted-foreground">
                    Manage your account and personal information
                  </p>
                </div>
                
                <GlassCard className="p-6 mb-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={formData.photoUrl} />
                      <AvatarFallback>{formData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 text-center md:text-left">
                      <h2 className="text-xl font-bold">{formData.fullName}</h2>
                      <p className="text-muted-foreground">{formData.email}</p>
                      <p className="text-sm text-muted-foreground">Member since {formData.memberSince}</p>
                      <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handlePhotoChange}
                        />
                        <Button onClick={triggerFileInput} variant="outline" size="sm">Change Photo</Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditMode(!editMode)}
                        >
                          {editMode ? "Cancel Editing" : "Edit Profile"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <GlassCard className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input 
                            id="fullName" 
                            name="fullName"
                            value={formData.fullName} 
                            onChange={handleChange}
                            className="mt-1" 
                            disabled={!editMode}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email"
                            value={formData.email} 
                            onChange={handleChange}
                            className="mt-1" 
                            disabled={!editMode}
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            name="phone"
                            value={formData.phone} 
                            onChange={handleChange}
                            className="mt-1" 
                            disabled={!editMode}
                          />
                        </div>
                        {editMode && (
                          <Button 
                            type="submit" 
                            className="mt-2" 
                            disabled={isUpdating}
                          >
                            {isUpdating ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              "Save Changes"
                            )}
                          </Button>
                        )}
                      </div>
                    </GlassCard>
                    
                    <GlassCard className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Security</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input 
                            id="currentPassword" 
                            type="password" 
                            className="mt-1" 
                            disabled={!editMode}
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input 
                            id="newPassword" 
                            type="password" 
                            className="mt-1" 
                            disabled={!editMode}
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input 
                            id="confirmPassword" 
                            type="password" 
                            className="mt-1" 
                            disabled={!editMode}
                          />
                        </div>
                        {editMode && (
                          <Button className="mt-2">Update Password</Button>
                        )}
                      </div>
                    </GlassCard>
                  </div>
                  
                  <GlassCard className="p-6 mt-8">
                    <h3 className="text-lg font-semibold mb-4">Investment Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                        <select 
                          id="riskTolerance" 
                          name="preferences.riskTolerance"
                          value={formData.preferences.riskTolerance}
                          onChange={handleChange}
                          disabled={!editMode}
                          className="w-full p-2 mt-1 rounded-md border border-input bg-background"
                        >
                          <option value="Conservative">Conservative</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Aggressive">Aggressive</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="investmentGoal">Investment Goal</Label>
                        <select 
                          id="investmentGoal" 
                          name="preferences.investmentGoal"
                          value={formData.preferences.investmentGoal}
                          onChange={handleChange}
                          disabled={!editMode}
                          className="w-full p-2 mt-1 rounded-md border border-input bg-background"
                        >
                          <option value="Retirement">Retirement</option>
                          <option value="Growth">Growth</option>
                          <option value="Income">Income</option>
                          <option value="Preservation">Preservation</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="investmentHorizon">Investment Horizon</Label>
                        <select 
                          id="investmentHorizon" 
                          name="preferences.investmentHorizon"
                          value={formData.preferences.investmentHorizon}
                          onChange={handleChange}
                          disabled={!editMode}
                          className="w-full p-2 mt-1 rounded-md border border-input bg-background"
                        >
                          <option value="Short-term (0-3 years)">Short-term (0-3 years)</option>
                          <option value="Medium-term (3-7 years)">Medium-term (3-7 years)</option>
                          <option value="Long-term (7+ years)">Long-term (7+ years)</option>
                        </select>
                      </div>
                      <div>
                        <Label className="block mb-2">Preferred Sectors</Label>
                        <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2 border border-input rounded-md">
                          {AVAILABLE_SECTORS.map((sector) => (
                            <div key={sector} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`sector-${sector}`} 
                                checked={formData.preferences.preferredSectors.includes(sector)}
                                onCheckedChange={(checked) => handleSectorChange(sector, checked === true)}
                                disabled={!editMode}
                              />
                              <Label 
                                htmlFor={`sector-${sector}`}
                                className="text-sm cursor-pointer"
                              >
                                {sector}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {editMode && (
                      <Button type="submit" className="mt-6" disabled={isUpdating}>
                        {isUpdating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Preferences"
                        )}
                      </Button>
                    )}
                  </GlassCard>
                </form>
              </div>
            </div>
          </main>
        </PageTransition>
      </div>
    </div>
  );
}
