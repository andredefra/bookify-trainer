import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Euro, RefreshCcw, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface CancellationPolicyCardProps {
  scheduledDate: string;
}

export function CancellationPolicyCard({ scheduledDate }: CancellationPolicyCardProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [policy, setPolicy] = useState({
    freeHours: 48,
    reducedHours: 24,
    reducedPercentage: 50,
    fullPercentage: 100,
    refundDays: 5
  });

  const sessionDate = new Date(scheduledDate);
  const now = new Date();
  const hoursUntilSession = Math.floor((sessionDate.getTime() - now.getTime()) / (1000 * 60 * 60));

  useEffect(() => {
    loadPolicy();
  }, []);

  const loadPolicy = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('demo-user') || '{}');
      const { data, error } = await supabase
        .from('gym_settings')
        .select('free_cancellation_hours, reduced_fee_hours, reduced_fee_percentage, full_fee_percentage, refund_processing_days')
        .eq('gym_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setPolicy({
          freeHours: data.free_cancellation_hours,
          reducedHours: data.reduced_fee_hours,
          reducedPercentage: data.reduced_fee_percentage,
          fullPercentage: data.full_fee_percentage,
          refundDays: data.refund_processing_days
        });
      }
    } catch (error) {
      console.error('Error loading cancellation policy:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPolicyStatus = () => {
    if (hoursUntilSession >= policy.freeHours) {
      return {
        type: "free" as const,
        title: t('cancellationPolicy.freeCancellation'),
        description: t('cancellationPolicy.freeCancellationDesc'),
        icon: RefreshCcw,
        color: "text-green-600",
        bgColor: "bg-green-50 border-green-200"
      };
    } else if (hoursUntilSession >= policy.reducedHours) {
      return {
        type: "partial" as const,
        title: t('cancellationPolicy.reducedFeeCancellation'),
        description: t('cancellationPolicy.reducedFeeCancellationDesc').replace('{percentage}', policy.reducedPercentage.toString()),
        icon: Euro,
        color: "text-amber-600",
        bgColor: "bg-amber-50 border-amber-200"
      };
    } else {
      return {
        type: "full" as const,
        title: t('cancellationPolicy.lateCancellation'),
        description: t('cancellationPolicy.lateCancellationDesc').replace('{percentage}', policy.fullPercentage.toString()),
        icon: AlertCircle,
        color: "text-red-600",
        bgColor: "bg-red-50 border-red-200"
      };
    }
  };

  if (loading) {
    return (
      <Card className="border">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  const policyStatus = getPolicyStatus();
  const Icon = policyStatus.icon;

  return (
    <Card className={`${policyStatus.bgColor} border`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Icon className={`h-4 w-4 ${policyStatus.color}`} />
          {t('cancellationPolicy.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium">{policyStatus.title}</span>
          <Badge 
            variant={policyStatus.type === "free" ? "default" : policyStatus.type === "partial" ? "secondary" : "destructive"}
          >
            {policyStatus.description}
          </Badge>
        </div>

        <div className="text-xs space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>
              {hoursUntilSession > 0 
                ? `${t('cancellationPolicy.timeRemaining')} ${hoursUntilSession} ${hoursUntilSession === 1 ? t('cancellationPolicy.hour') : t('cancellationPolicy.hours')}`
                : t('cancellationPolicy.timeRemainingLessThanHour')
              }
            </span>
          </div>
          
          <div className="bg-white/50 rounded-md p-2 space-y-1">
            <p className="font-medium">{t('cancellationPolicy.terms')}</p>
            <ul className="space-y-0.5 text-muted-foreground">
              <li>• {t('cancellationPolicy.freeCancellationRule')
                .replace('{hours}', policy.freeHours.toString())
                .replace('{description}', t('cancellationPolicy.freeHours'))}</li>
              <li>• {t('cancellationPolicy.reducedFeeRule')
                .replace('{startHours}', policy.reducedHours.toString())
                .replace('{endHours}', policy.freeHours.toString())
                .replace('{percentage}', policy.reducedPercentage.toString())}</li>
              <li>• {t('cancellationPolicy.lateCancellationRule')
                .replace('{hours}', policy.reducedHours.toString())
                .replace('{percentage}', policy.fullPercentage.toString())}</li>
              <li>• {t('cancellationPolicy.refundTime').replace('{days}', policy.refundDays.toString())}</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}