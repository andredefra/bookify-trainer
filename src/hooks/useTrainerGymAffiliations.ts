import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface TrainerGymAffiliation {
  id: string;
  trainer_id: string;
  gym_id: string;
  status: string;
  request_message?: string | null;
  response_message?: string | null;
  requested_at: string;
  responded_at?: string | null;
  commission_rate?: number | null;
  contract_details?: any;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface GymInfo {
  id: string;
  name: string;
  location?: string;
  logo_url?: string;
  description?: string;
  gym_type?: string;
  phone?: string;
  website?: string;
  amenities?: string[];
}

export const useTrainerGymAffiliations = (trainerId?: string) => {
  const [affiliations, setAffiliations] = useState<TrainerGymAffiliation[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (trainerId) {
      fetchAffiliations();
    }
  }, [trainerId]);

  const fetchAffiliations = async () => {
    if (!trainerId) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('trainer_gym_affiliations')
        .select('*')
        .eq('trainer_id', trainerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAffiliations(data || []);
    } catch (error) {
      console.error('Error fetching affiliations:', error);
      toast({
        title: "Error",
        description: "Failed to load gym affiliations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const requestAffiliation = async (gymId: string, message?: string) => {
    if (!trainerId) return false;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('trainer_gym_affiliations')
        .insert({
          trainer_id: trainerId,
          gym_id: gymId,
          request_message: message,
          status: 'pending'
        });

      if (error) throw error;
      
      await fetchAffiliations();
      toast({
        title: "Success",
        description: "Affiliation request sent successfully",
      });
      return true;
    } catch (error) {
      console.error('Error requesting affiliation:', error);
      toast({
        title: "Error",
        description: "Failed to send affiliation request",
        variant: "destructive",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const setPrimaryGym = async (gymId: string) => {
    if (!trainerId) return false;

    setSaving(true);
    try {
      // First, remove primary status from all affiliations
      await supabase
        .from('trainer_gym_affiliations')
        .update({ is_primary: false })
        .eq('trainer_id', trainerId);

      // Set the selected gym as primary
      const { error } = await supabase
        .from('trainer_gym_affiliations')
        .update({ is_primary: true })
        .eq('trainer_id', trainerId)
        .eq('gym_id', gymId);

      if (error) throw error;

      // Update trainer profile with primary gym
      await supabase
        .from('trainer_profiles')
        .update({ primary_gym_id: gymId })
        .eq('trainer_id', trainerId);
      
      await fetchAffiliations();
      toast({
        title: "Success",
        description: "Primary gym updated successfully",
      });
      return true;
    } catch (error) {
      console.error('Error setting primary gym:', error);
      toast({
        title: "Error",
        description: "Failed to update primary gym",
        variant: "destructive",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const cancelRequest = async (affiliationId: string) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('trainer_gym_affiliations')
        .delete()
        .eq('id', affiliationId)
        .eq('trainer_id', trainerId);

      if (error) throw error;
      
      await fetchAffiliations();
      toast({
        title: "Success",
        description: "Affiliation request cancelled",
      });
      return true;
    } catch (error) {
      console.error('Error cancelling request:', error);
      toast({
        title: "Error",
        description: "Failed to cancel request",
        variant: "destructive",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const searchGyms = async (query: string): Promise<GymInfo[]> => {
    try {
      // Enhanced mock gym data with more realistic information
      const mockGyms: GymInfo[] = [
        { 
          id: '11111111-1111-1111-1111-111111111111', 
          name: 'FitLife Gym', 
          location: '123 Main St, Downtown',
          logo_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop',
          description: 'A modern fitness center with state-of-the-art equipment',
          gym_type: 'Traditional Gym',
          phone: '(555) 123-4567',
          website: 'www.fitlifegym.com',
          amenities: ['Cardio Equipment', 'Weight Training', 'Group Classes', 'Locker Rooms']
        },
        { 
          id: '22222222-2222-2222-2222-222222222222', 
          name: 'PowerHouse CrossFit', 
          location: '456 Oak Ave, Uptown',
          logo_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=64&h=64&fit=crop',
          description: 'High-intensity CrossFit training for all fitness levels',
          gym_type: 'CrossFit Box',
          phone: '(555) 987-6543',
          website: 'www.powerhousecrossfit.com',
          amenities: ['Olympic Lifting', 'Functional Training', 'Personal Training', 'Nutrition Coaching']
        },
        { 
          id: '33333333-3333-3333-3333-333333333333', 
          name: 'Zen Yoga Studio', 
          location: '789 Elm St, Midtown',
          logo_url: 'https://images.unsplash.com/photo-1506629905586-beb79dc61d0b?w=64&h=64&fit=crop',
          description: 'Peaceful yoga studio offering various styles and meditation',
          gym_type: 'Yoga Studio',
          phone: '(555) 456-7890',
          website: 'www.zenyogastudio.com',
          amenities: ['Yoga Classes', 'Meditation', 'Workshops', 'Retail Shop']
        },
        { 
          id: '44444444-4444-4444-4444-444444444444', 
          name: 'Elite Performance Center', 
          location: '321 Pine St, Financial District',
          logo_url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=64&h=64&fit=crop',
          description: 'Premium training facility for serious athletes',
          gym_type: 'Performance Center',
          phone: '(555) 234-5678',
          website: 'www.eliteperformance.com',
          amenities: ['Personal Training', 'Sports Performance', 'Recovery Suites', 'Nutrition Lab']
        },
        { 
          id: '55555555-5555-5555-5555-555555555555', 
          name: 'Neighborhood Fitness', 
          location: '654 Maple Dr, Suburbs',
          logo_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=64&h=64&fit=crop',
          description: 'Family-friendly gym with affordable membership options',
          gym_type: 'Community Gym',
          phone: '(555) 345-6789',
          website: 'www.neighborhoodfitness.com',
          amenities: ['Family Programs', 'Senior Classes', 'Childcare', 'Pool']
        }
      ].filter(gym => 
        gym.name.toLowerCase().includes(query.toLowerCase()) ||
        gym.location?.toLowerCase().includes(query.toLowerCase()) ||
        gym.gym_type?.toLowerCase().includes(query.toLowerCase())
      );

      return mockGyms;
    } catch (error) {
      console.error('Error searching gyms:', error);
      return [];
    }
  };

  return {
    affiliations,
    loading,
    saving,
    requestAffiliation,
    setPrimaryGym,
    cancelRequest,
    searchGyms,
    refetch: fetchAffiliations
  };
};