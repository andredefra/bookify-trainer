
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Calendar, ArrowUpRight, DollarSign, LineChart, Target } from "lucide-react";
import { MetricsCardProps, TimeFrame } from "./types";

// Mock data for different time frames
const mockMetricsData = {
  day: { 
    totalNew: 12, 
    conversionRate: 8.5, 
    averageValue: 125, 
    growthRate: 3.2 
  },
  week: { 
    totalNew: 68, 
    conversionRate: 12.3, 
    averageValue: 145, 
    growthRate: 5.7 
  },
  month: { 
    totalNew: 210, 
    conversionRate: 15.8, 
    averageValue: 175, 
    growthRate: 8.4 
  },
  quarter: { 
    totalNew: 520, 
    conversionRate: 18.2, 
    averageValue: 195, 
    growthRate: 12.5 
  },
  year: { 
    totalNew: 1680, 
    conversionRate: 22.7, 
    averageValue: 210, 
    growthRate: 15.3 
  },
  custom: { 
    totalNew: 90, 
    conversionRate: 14.2, 
    averageValue: 160, 
    growthRate: 6.8 
  }
};

export function MetricsCards({ analytics, timeFrame }: MetricsCardProps & { timeFrame: TimeFrame }) {
  const metrics = useMemo(() => {
    // Use mock data based on timeFrame
    return mockMetricsData[timeFrame];
  }, [timeFrame]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      <Card className="shadow-sm">
        <CardContent className="p-3 flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <Users className="h-4 w-4 text-blue-700" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">New Contacts</p>
            <h4 className="text-lg font-semibold">{metrics.totalNew} <span className="text-xs font-normal text-muted-foreground">in {analytics.timeFrameLabel.toLowerCase()}</span></h4>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-3 flex items-center">
          <div className="bg-green-100 p-2 rounded-full mr-3">
            <Target className="h-4 w-4 text-green-700" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Conversion Rate</p>
            <h4 className="text-lg font-semibold">{metrics.conversionRate.toFixed(1)}%</h4>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-3 flex items-center">
          <div className="bg-amber-100 p-2 rounded-full mr-3">
            <DollarSign className="h-4 w-4 text-amber-700" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg. Contact Value</p>
            <h4 className="text-lg font-semibold">{metrics.averageValue.toFixed(0)}€</h4>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-3 flex items-center">
          <div className={`p-2 rounded-full mr-3 ${metrics.growthRate >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
            <LineChart className={`h-4 w-4 ${metrics.growthRate >= 0 ? 'text-green-700' : 'text-red-700'}`} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Growth Rate</p>
            <h4 className="text-lg font-semibold">{metrics.growthRate.toFixed(1)}%</h4>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
