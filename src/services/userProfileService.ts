
import { connectToDatabase } from './mongodb';

export interface UserProfile {
  _id?: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  photoUrl: string;
  memberSince: string;
  preferences: {
    riskTolerance: string;
    investmentGoal: string;
    investmentHorizon: string;
    preferredSectors: string[];
  }
}

// Default user profile for demo purposes
const defaultUserProfile: UserProfile = {
  userId: "user123",
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  photoUrl: "https://github.com/shadcn.png",
  memberSince: "Jan 2023",
  preferences: {
    riskTolerance: "Moderate",
    investmentGoal: "Growth",
    investmentHorizon: "Medium-term (3-7 years)",
    preferredSectors: ["Technology", "Financial Services"]
  }
};

// In-memory storage for fallback when database isn't connected
let cachedUserProfile: UserProfile | null = null;

export async function getUserProfile(userId: string): Promise<UserProfile> {
  try {
    const db = await connectToDatabase();
    const profiles = db.collection('userProfiles');
    const profile = await profiles.findOne({ userId });
    
    if (profile) {
      // Cast the document to UserProfile type
      cachedUserProfile = profile as UserProfile;
      return cachedUserProfile;
    } else {
      // If no profile exists, create a default one
      cachedUserProfile = { ...defaultUserProfile, userId };
      await profiles.insertOne(cachedUserProfile);
      return cachedUserProfile;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    // Fallback to in-memory cache or default
    return cachedUserProfile || { ...defaultUserProfile, userId };
  }
}

export async function updateUserProfile(profile: UserProfile): Promise<UserProfile> {
  try {
    const db = await connectToDatabase();
    const profiles = db.collection('userProfiles');
    
    // Update or insert the profile
    await profiles.updateOne(
      { userId: profile.userId },
      { $set: profile },
      { upsert: true }
    );
    
    cachedUserProfile = profile;
    return profile;
  } catch (error) {
    console.error("Error updating user profile:", error);
    // Still update the in-memory cache
    cachedUserProfile = profile;
    return profile;
  }
}

// For local storage fallback
export function saveProfileToLocalStorage(profile: UserProfile): void {
  localStorage.setItem('userProfile', JSON.stringify(profile));
}

export function getProfileFromLocalStorage(): UserProfile | null {
  const savedProfile = localStorage.getItem('userProfile');
  if (savedProfile) {
    return JSON.parse(savedProfile);
  }
  return null;
}
