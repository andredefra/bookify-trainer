import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Euro, RefreshCcw, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CancellationPolicyCardProps {
  scheduledDate: string;
  freeHours?: number;
  reducedHours?: number;
  reducedPercentage?: number;
  fullPercentage?: number;
  refundDays?: number;
}

export function CancellationPolicyCard({ 
  scheduledDate,
  freeHours = 48,
  reducedHours = 24,
  reducedPercentage = 50,
  fullPercentage = 100,
  refundDays = 5
}: CancellationPolicyCardProps) {
  const { t } = useLanguage();
  const sessionDate = new Date(scheduledDate);
  const now = new Date();
  const hoursUntilSession = Math.floor((sessionDate.getTime() - now.getTime()) / (1000 * 60 * 60));

  const getPolicyStatus = () => {
    if (hoursUntilSession >= freeHours) {
      return {
        type: "free" as const,
        title: t('cancellationPolicy.freeCancellation'),
        description: t('cancellationPolicy.freeCancellationDesc'),
        icon: RefreshCcw,
        color: "text-green-600",
        bgColor: "bg-green-50 border-green-200"
      };
    } else if (hoursUntilSession >= reducedHours) {
      return {
        type: "partial" as const,
        title: t('cancellationPolicy.reducedFeeCancellation'),
        description: t('cancellationPolicy.reducedFeeCancellationDesc'),
        icon: Euro,
        color: "text-amber-600",
        bgColor: "bg-amber-50 border-amber-200"
      };
    } else {
      return {
        type: "full" as const,
        title: t('cancellationPolicy.lateCancellation'),
        description: t('cancellationPolicy.lateCancellationDesc'),
        icon: AlertCircle,
        color: "text-red-600",
        bgColor: "bg-red-50 border-red-200"
      };
    }
  };

  const policy = getPolicyStatus();
  const Icon = policy.icon;

  return (
    <Card className={`${policy.bgColor} border`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Icon className={`h-4 w-4 ${policy.color}`} />
          {t('cancellationPolicy.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium">{policy.title}</span>
          <Badge 
            variant={policy.type === "free" ? "default" : policy.type === "partial" ? "secondary" : "destructive"}
          >
            {policy.description}
          </Badge>
        </div>

        <div className="text-xs space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <span>
              {hoursUntilSession > 0 
                ? `${t('cancellationPolicy.timeRemaining')} ${hoursUntilSession} ${hoursUntilSession === 1 ? 'ora' : 'ore'}`
                : t('cancellationPolicy.timeRemainingLessThanHour')
              }
            </span>
          </div>
          
          <div className="bg-white/50 rounded-md p-2 space-y-1">
            <p className="font-medium">{t('cancellationPolicy.terms')}</p>
            <ul className="space-y-0.5 text-muted-foreground">
              <li>• +{freeHours}h prima: {t('cancellationPolicy.freeHours')}</li>
              <li>• {reducedHours}-{freeHours}h prima: {reducedPercentage}% del costo</li>
              <li>• &lt;{reducedHours}h prima: {fullPercentage}% del costo</li>
              <li>• {t('cancellationPolicy.refundTime')}</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}