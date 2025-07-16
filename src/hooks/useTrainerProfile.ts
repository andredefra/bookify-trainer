import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";

export interface TrainerProfile {
  id?: string;
  trainer_id: string;
  slug?: string;
  title?: string;
  bio?: string;
  location?: string;
  hourly_rate?: number;
  profile_image_url?: string;
  specialties?: string[];
  certifications?: Json;
  education?: Json;
  experience?: Json;
  languages?: string[];
  is_public?: boolean;
  primary_gym_id?: string;
}

export const useTrainerProfile = (trainerId?: string) => {
  const [profile, setProfile] = useState<TrainerProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (trainerId) {
      fetchProfile();
    }
  }, [trainerId]);

  const fetchProfile = async () => {
    if (!trainerId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('trainer_profiles')
        .select('*')
        .eq('trainer_id', trainerId)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = async (name: string) => {
    try {
      const { data, error } = await supabase.rpc('generate_trainer_slug', {
        trainer_name: name
      });
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error generating slug:', error);
      return null;
    }
  };

  const saveProfile = async (profileData: Partial<TrainerProfile>) => {
    if (!trainerId) return false;

    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('trainer_profiles')
        .upsert({
          trainer_id: trainerId,
          ...profileData
        })
        .select()
        .single();

      if (error) throw error;
      
      setProfile(data);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      return true;
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile",
        variant: "destructive",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    profile,
    loading,
    saving,
    saveProfile,
    generateSlug,
    refetch: fetchProfile
  };
};