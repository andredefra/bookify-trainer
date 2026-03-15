import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useClientSubscription } from './useClientSubscription';

interface AIAccessResult {
  hasAccess: boolean;
  reason?: 'no_subscription' | 'rate_limit_exceeded' | 'free_plan';
  remainingRequests?: number;
  maxRequests?: number;
}

const FREE_MONTHLY_LIMIT = 5;
const PRO_DAILY_LIMIT = 100;
const DEMO_INITIAL_USAGE = 4;

function isDemoMode(): boolean {
  return !!localStorage.getItem('demo-user');
}

export function useAIAccess() {
  const { subscription, loading: subscriptionLoading } = useClientSubscription();
  const demoMode = isDemoMode();
  const demoRef = useRef(demoMode);
  
  const [monthlyUsage, setMonthlyUsage] = useState(demoMode ? DEMO_INITIAL_USAGE : 0);
  const [loading, setLoading] = useState(!demoMode);

  useEffect(() => {
    // Demo users: always force usage to DEMO_INITIAL_USAGE, never fetch
    if (demoRef.current || isDemoMode()) {
      demoRef.current = true;
      setMonthlyUsage(prev => prev < DEMO_INITIAL_USAGE ? DEMO_INITIAL_USAGE : prev);
      setLoading(false);
      return;
    }
    
    // Real users: wait for subscription to load first
    if (subscriptionLoading) return;

    const fetchUsage = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.id) {
          setMonthlyUsage(0);
          setLoading(false);
          return;
        }
        
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        
        const { count, error } = await supabase
          .from('ai_usage_tracking')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .gte('created_at', startOfMonth.toISOString());
        
        if (error) {
          console.error('Error fetching AI usage:', error);
          setMonthlyUsage(0);
        } else {
          setMonthlyUsage(count || 0);
        }
      } catch (error) {
        console.error('Error:', error);
        setMonthlyUsage(0);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, [subscriptionLoading]);

  const checkAIAccess = async (feature: 'chat' | 'vision' | 'image_gen'): Promise<AIAccessResult> => {
    if (!subscription) {
      return {
        hasAccess: false,
        reason: 'no_subscription'
      };
    }
    
    if (subscription.isPro) {
      if (monthlyUsage >= PRO_DAILY_LIMIT) {
        return {
          hasAccess: false,
          reason: 'rate_limit_exceeded',
          remainingRequests: 0,
          maxRequests: PRO_DAILY_LIMIT
        };
      }
      
      return {
        hasAccess: true,
        remainingRequests: PRO_DAILY_LIMIT - monthlyUsage,
        maxRequests: PRO_DAILY_LIMIT
      };
    }
    
    if (monthlyUsage >= FREE_MONTHLY_LIMIT) {
      return {
        hasAccess: false,
        reason: 'rate_limit_exceeded',
        remainingRequests: 0,
        maxRequests: FREE_MONTHLY_LIMIT
      };
    }
    
    return {
      hasAccess: true,
      remainingRequests: FREE_MONTHLY_LIMIT - monthlyUsage,
      maxRequests: FREE_MONTHLY_LIMIT
    };
  };

  const trackAIUsage = async (feature: string, tokensUsed?: number, costEstimate?: number) => {
    if (isDemoMode()) {
      setMonthlyUsage(prev => prev + 1);
      return;
    }
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    await supabase.from('ai_usage_tracking').insert({
      user_id: user.id,
      feature,
      tokens_used: tokensUsed,
      cost_estimate: costEstimate
    });
    
    // Re-fetch for real users
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const { count } = await supabase
      .from('ai_usage_tracking')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', startOfMonth.toISOString());
    setMonthlyUsage(count || 0);
  };

  return {
    hasAccess: subscription?.isPro || (monthlyUsage < FREE_MONTHLY_LIMIT),
    isPro: subscription?.isPro || false,
    monthlyUsage,
    loading: loading || subscriptionLoading,
    checkAIAccess,
    trackAIUsage,
    refetchUsage: () => {} // no-op for demo, real users can call if needed
  };
}
