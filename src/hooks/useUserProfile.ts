import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UserProfile {
  id?: string;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  city?: string;
  profile_image_url?: string;
  allergies?: string;
  health_conditions?: string;
  physical_limitations?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  fitness_goals?: string[];
  experience_level?: string;
  preferred_workout_time?: string;
  created_at?: string;
  updated_at?: string;
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setProfile(null);
        return;
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (profileData: Partial<UserProfile>) => {
    try {
      setSaving(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('You must be logged in to save profile');
        return false;
      }

      const dataToSave = {
        ...profileData,
        user_id: user.id,
      };

      const { error } = await supabase
        .from('user_profiles')
        .upsert(dataToSave, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error saving profile:', error);
        toast.error('Failed to save profile');
        return false;
      }

      toast.success('Profile saved successfully');
      await fetchProfile(); // Refresh the profile data
      return true;
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save profile');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const uploadProfileImage = async (file: File) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('You must be logged in to upload images');
        return null;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/profile.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast.error('Failed to upload image');
        return null;
      }

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    }
  };

  const calculateAge = (dateOfBirth?: string) => {
    if (!dateOfBirth) return null;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  useEffect(() => {
    fetchProfile();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'SIGNED_IN') {
          fetchProfile();
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return {
    profile,
    loading,
    saving,
    saveProfile,
    uploadProfileImage,
    calculateAge,
    refreshProfile: fetchProfile,
  };
}