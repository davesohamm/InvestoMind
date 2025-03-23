
import { useEffect, useState } from 'react';
import { UserProfile, getUserProfile, updateUserProfile, saveProfileToLocalStorage, getProfileFromLocalStorage } from '@/services/userProfileService';
import { toast } from '@/components/ui/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useUserProfile() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch user profile
  const { data: profile, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      setIsLoading(true);
      try {
        // First try to get from local storage for faster loading
        const localProfile = getProfileFromLocalStorage();
        
        // Then fetch from the database
        const dbProfile = await getUserProfile('user123');
        
        // Save to local storage for offline use
        saveProfileToLocalStorage(dbProfile);
        
        return dbProfile;
      } catch (err) {
        console.error('Error fetching profile:', err);
        // Fallback to local storage
        const localProfile = getProfileFromLocalStorage();
        if (localProfile) return localProfile;
        
        throw new Error('Failed to fetch user profile');
      } finally {
        setIsLoading(false);
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false
  });
  
  // Update profile mutation
  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: async (updatedProfile: UserProfile) => {
      console.log("Updating profile:", updatedProfile);
      // Update both database and local storage
      const result = await updateUserProfile(updatedProfile);
      saveProfileToLocalStorage(result);
      return result;
    },
    onSuccess: (data) => {
      console.log("Profile updated successfully:", data);
      queryClient.setQueryData(['userProfile'], data);
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      });
    }
  });

  return {
    profile,
    isLoading: isLoading || !profile,
    isUpdating,
    updateProfile,
    error
  };
}
