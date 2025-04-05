
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Calendar, ArrowUpRight } from "lucide-react";
import { MetricsCardProps } from "./types";

export function MetricsCards({ analytics }: MetricsCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      <Card className="shadow-sm">
        <CardContent className="p-3 flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <Users className="h-4 w-4 text-blue-700" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">New Contacts</p>
            <h4 className="text-lg font-semibold">{analytics.totalNew} <span className="text-xs font-normal text-muted-foreground">in {analytics.timeFrameLabel.toLowerCase()}</span></h4>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-3 flex items-center">
          <div className="bg-green-100 p-2 rounded-full mr-3">
            <TrendingUp className="h-4 w-4 text-green-700" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Conversion Rate</p>
            <h4 className="text-lg font-semibold">{analytics.conversionRate.toFixed(1)}%</h4>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-3 flex items-center">
          <div className="bg-amber-100 p-2 rounded-full mr-3">
            <Calendar className="h-4 w-4 text-amber-700" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg. Contact Value</p>
            <h4 className="text-lg font-semibold">{analytics.averageValue.toFixed(0)}€</h4>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-3 flex items-center">
          <div className={`p-2 rounded-full mr-3 ${analytics.growthRate >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
            <ArrowUpRight className={`h-4 w-4 ${analytics.growthRate >= 0 ? 'text-green-700' : 'text-red-700'} ${analytics.growthRate < 0 ? 'rotate-90' : ''}`} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Growth Rate</p>
            <h4 className="text-lg font-semibold">{analytics.growthRate.toFixed(1)}%</h4>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
