import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getCurrentDemoUserId } from '@/utils/demoUserUtils';

interface ClientSubscriptionData {
  plan: 'free' | 'pro';
  status: 'active' | 'cancelled' | 'expired' | 'trialing';
  isActive: boolean;
  isPro: boolean;
  startDate?: string;
  endDate?: string;
  trialEndDate?: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

export function useClientSubscription() {
  const [subscription, setSubscription] = useState<ClientSubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      
      const demoUser = localStorage.getItem('demo-user');
      let userId: string | undefined;
      
      if (demoUser) {
        userId = getCurrentDemoUserId();
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        userId = user?.id;
      }
      
      if (!userId) {
        setSubscription(null);
        setLoading(false);
        return;
      }
      
      // For demo mode OR demo UUID, create Pro subscription in memory
      if (demoUser || userId === '00000000-0000-0000-0000-000000000002') {
        setSubscription({
          plan: 'free',
          status: 'active',
          isActive: true,
          isPro: false,
          startDate: new Date().toISOString()
        });
        setLoading(false);
        return;
      }
      
      // Real user: fetch from database
      const { data, error } = await supabase
        .from('client_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
        setSubscription(null);
      } else if (data) {
        const isActive = data.subscription_status === 'active' || data.subscription_status === 'trialing';
        setSubscription({
          plan: data.subscription_plan as 'free' | 'pro',
          status: data.subscription_status as any,
          isActive,
          isPro: data.subscription_plan === 'pro' && isActive,
          startDate: data.subscription_start_date,
          endDate: data.subscription_end_date,
          trialEndDate: data.trial_end_date,
          stripeCustomerId: data.stripe_customer_id,
          stripeSubscriptionId: data.stripe_subscription_id
        });
      } else {
        // No subscription found: create free default
        const { error: insertError } = await supabase
          .from('client_subscriptions')
          .insert({
            user_id: userId,
            subscription_plan: 'free',
            subscription_status: 'active'
          });
        
        if (insertError) {
          console.error('Error creating default subscription:', insertError);
        }
        
        setSubscription({
          plan: 'free',
          status: 'active',
          isActive: true,
          isPro: false
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const upgradeToProViaMock = async () => {
    // For demo: simulate upgrade to Pro (in-memory only)
    setSubscription({
      plan: 'pro',
      status: 'active',
      isActive: true,
      isPro: true,
      startDate: new Date().toISOString()
    });
  };

  const downgradeToFreeViaMock = async () => {
    // For demo: simulate downgrade to Free (in-memory only)
    setSubscription({
      plan: 'free',
      status: 'active',
      isActive: true,
      isPro: false
    });
  };

  return {
    subscription,
    loading,
    refetch: fetchSubscription,
    upgradeToProViaMock,
    downgradeToFreeViaMock
  };
}
