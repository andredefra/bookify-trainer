import { Card, CardContent } from "@/components/ui/card";
import { KPIWithBreakdown } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface EnhancedKPICardsProps {
  data: KPIWithBreakdown[];
}

export const EnhancedKPICards = ({ data }: EnhancedKPICardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((kpi, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <p className="text-2xl font-bold mt-1">{kpi.value}</p>
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                kpi.isPositive 
                  ? 'bg-green-500/10 text-green-600' 
                  : 'bg-red-500/10 text-red-600'
              }`}>
                {kpi.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {kpi.change}
              </div>
            </div>

            {kpi.breakdown && (
              <div className="space-y-2 pt-2 border-t border-border">
                {kpi.breakdown.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{item.source}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                    <Progress 
                      value={item.percentage} 
                      className="h-1.5"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
