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
      // For now, return mock data since we don't have a gym profiles table yet
      // In the future, this would search the actual gym profiles
      const mockGyms: GymInfo[] = [
        { id: '11111111-1111-1111-1111-111111111111', name: 'FitLife Gym', location: 'Downtown' },
        { id: '22222222-2222-2222-2222-222222222222', name: 'PowerHouse Fitness', location: 'Uptown' },
        { id: '33333333-3333-3333-3333-333333333333', name: 'Elite Training Center', location: 'Midtown' },
      ].filter(gym => 
        gym.name.toLowerCase().includes(query.toLowerCase()) ||
        gym.location?.toLowerCase().includes(query.toLowerCase())
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