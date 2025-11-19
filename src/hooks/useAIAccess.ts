import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useClientSubscription } from './useClientSubscription';
import { getCurrentDemoUserId } from '@/utils/demoUserUtils';

interface AIAccessResult {
  hasAccess: boolean;
  reason?: 'no_subscription' | 'rate_limit_exceeded' | 'free_plan';
  remainingRequests?: number;
  maxRequests?: number;
}

const FREE_DAILY_LIMIT = 5;
const PRO_DAILY_LIMIT = 100;

export function useAIAccess() {
  const { subscription, loading: subscriptionLoading } = useClientSubscription();
  const [dailyUsage, setDailyUsage] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDailyUsage = async () => {
    try {
      const demoUser = localStorage.getItem('demo-user');
      let userId: string | undefined;
      
      if (demoUser) {
        userId = getCurrentDemoUserId();
        // Demo user: simulate some usage
        setDailyUsage(2);
        setLoading(false);
        return;
      }
      
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id;
      
      if (!userId) {
        setDailyUsage(0);
        setLoading(false);
        return;
      }
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { count, error } = await supabase
        .from('ai_usage_tracking')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', today.toISOString());
      
      if (error) {
        console.error('Error fetching AI usage:', error);
        setDailyUsage(0);
      } else {
        setDailyUsage(count || 0);
      }
    } catch (error) {
      console.error('Error:', error);
      setDailyUsage(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!subscriptionLoading) {
      fetchDailyUsage();
    }
  }, [subscriptionLoading]);

  const checkAIAccess = async (feature: 'chat' | 'vision' | 'image_gen'): Promise<AIAccessResult> => {
    if (!subscription) {
      return {
        hasAccess: false,
        reason: 'no_subscription'
      };
    }
    
    if (subscription.isPro) {
      if (dailyUsage >= PRO_DAILY_LIMIT) {
        return {
          hasAccess: false,
          reason: 'rate_limit_exceeded',
          remainingRequests: 0,
          maxRequests: PRO_DAILY_LIMIT
        };
      }
      
      return {
        hasAccess: true,
        remainingRequests: PRO_DAILY_LIMIT - dailyUsage,
        maxRequests: PRO_DAILY_LIMIT
      };
    }
    
    if (dailyUsage >= FREE_DAILY_LIMIT) {
      return {
        hasAccess: false,
        reason: 'rate_limit_exceeded',
        remainingRequests: 0,
        maxRequests: FREE_DAILY_LIMIT
      };
    }
    
    return {
      hasAccess: true,
      remainingRequests: FREE_DAILY_LIMIT - dailyUsage,
      maxRequests: FREE_DAILY_LIMIT
    };
  };

  const trackAIUsage = async (feature: string, tokensUsed?: number, costEstimate?: number) => {
    const demoUser = localStorage.getItem('demo-user');
    
    if (demoUser) {
      // Demo mode: just increment in-memory counter
      setDailyUsage(prev => prev + 1);
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
    
    await fetchDailyUsage();
  };

  return {
    hasAccess: subscription?.isPro || (dailyUsage < FREE_DAILY_LIMIT),
    isPro: subscription?.isPro || false,
    dailyUsage,
    loading: loading || subscriptionLoading,
    checkAIAccess,
    trackAIUsage,
    refetchUsage: fetchDailyUsage
  };
}
