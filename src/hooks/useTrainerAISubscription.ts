import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface TrainerAISubscriptionData {
  plan: 'none' | 'ai_plus';
  status: 'active' | 'inactive' | 'cancelled' | 'trialing';
  hasAIAccess: boolean;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  trialEndDate?: string;
}

export function useTrainerAISubscription() {
  const [subscription, setSubscription] = useState<TrainerAISubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      
      const demoUser = localStorage.getItem('demo-user');
      let userId: string | undefined;
      
      if (demoUser) {
        const parsed = JSON.parse(demoUser);
        // Demo trainer always has AI access
        if (parsed.type === 'trainer') {
          setSubscription({
            plan: 'ai_plus',
            status: 'active',
            hasAIAccess: true,
            isActive: true,
            startDate: new Date().toISOString()
          });
          setLoading(false);
          return;
        }
      }
      
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id;
      
      if (!userId) {
        setSubscription({
          plan: 'none',
          status: 'inactive',
          hasAIAccess: false,
          isActive: false
        });
        setLoading(false);
        return;
      }
      
      // Demo trainer UUID check
      if (userId === '00000000-0000-0000-0000-000000000001') {
        setSubscription({
          plan: 'ai_plus',
          status: 'active',
          hasAIAccess: true,
          isActive: true,
          startDate: new Date().toISOString()
        });
        setLoading(false);
        return;
      }
      
      // Real user: fetch from database
      const { data, error } = await supabase
        .from('trainer_ai_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching AI subscription:', error);
        setSubscription({
          plan: 'none',
          status: 'inactive',
          hasAIAccess: false,
          isActive: false
        });
      } else if (data) {
        const isActive = data.subscription_status === 'active' || data.subscription_status === 'trialing';
        setSubscription({
          plan: data.subscription_plan as 'none' | 'ai_plus',
          status: data.subscription_status as any,
          hasAIAccess: data.subscription_plan === 'ai_plus' && isActive,
          isActive,
          startDate: data.subscription_start_date ?? undefined,
          endDate: data.subscription_end_date ?? undefined,
          trialEndDate: data.trial_end_date ?? undefined
        });
      } else {
        // No subscription found - default to no AI access
        setSubscription({
          plan: 'none',
          status: 'inactive',
          hasAIAccess: false,
          isActive: false
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setSubscription({
        plan: 'none',
        status: 'inactive',
        hasAIAccess: false,
        isActive: false
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const activateAIViaMock = async () => {
    // For demo: simulate AI Plus activation (in-memory only)
    setSubscription({
      plan: 'ai_plus',
      status: 'active',
      hasAIAccess: true,
      isActive: true,
      startDate: new Date().toISOString()
    });
  };

  const deactivateAIViaMock = async () => {
    // For demo: simulate deactivation (in-memory only)
    setSubscription({
      plan: 'none',
      status: 'inactive',
      hasAIAccess: false,
      isActive: false
    });
  };

  return {
    subscription,
    loading,
    hasAIAccess: subscription?.hasAIAccess ?? false,
    refetch: fetchSubscription,
    activateAIViaMock,
    deactivateAIViaMock
  };
}
