import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier?: string;
  subscription_start_date?: string;
  subscription_end_date?: string;
  early_adopter_number?: number;
  isEarlyAdopter: boolean;
  loading: boolean;
  error?: string;
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<SubscriptionData>({
    subscribed: false,
    isEarlyAdopter: false,
    loading: true,
  });

  const checkSubscription = async () => {
    try {
      setSubscription(prev => ({ ...prev, loading: true, error: undefined }));
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setSubscription(prev => ({ ...prev, loading: false }));
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      setSubscription({
        subscribed: data.subscribed || false,
        subscription_tier: data.subscription_tier,
        subscription_start_date: data.subscription_start_date,
        subscription_end_date: data.subscription_end_date,
        early_adopter_number: data.early_adopter_number,
        isEarlyAdopter: data.isEarlyAdopter || false,
        loading: false,
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscription(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to check subscription',
      }));
    }
  };

  const createCheckout = async (priceId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: { priceId },
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error) throw error;

    // Open Stripe checkout in a new tab
    window.open(data.url, '_blank');
  };

  const openCustomerPortal = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase.functions.invoke('customer-portal', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (error) throw error;

    // Open Stripe customer portal in a new tab
    window.open(data.url, '_blank');
  };

  // Check subscription on mount
  useEffect(() => {
    checkSubscription();
  }, []);

  // Listen for auth changes
  useEffect(() => {
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          checkSubscription();
        } else if (event === 'SIGNED_OUT') {
          setSubscription({
            subscribed: false,
            isEarlyAdopter: false,
            loading: false,
          });
        }
      }
    );

    return () => authSubscription.unsubscribe();
  }, []);

  // Auto-refresh subscription every 30 seconds
  useEffect(() => {
    const interval = setInterval(checkSubscription, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    ...subscription,
    checkSubscription,
    createCheckout,
    openCustomerPortal,
  };
}