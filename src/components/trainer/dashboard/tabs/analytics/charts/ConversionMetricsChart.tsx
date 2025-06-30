
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Target, Euro } from "lucide-react";
import { RevenueBreakdown } from "../data/enhancedRevenueData";

interface ConversionMetricsChartProps {
  revenueBreakdown: RevenueBreakdown;
}

export function ConversionMetricsChart({ revenueBreakdown }: ConversionMetricsChartProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-base font-medium mb-4">Metriche di Conversione</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Target className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">Tasso di Conversione</p>
                  <h3 className="text-xl font-bold text-blue-900">{revenueBreakdown.conversionRate.toFixed(1)}%</h3>
                  <p className="text-xs text-blue-600">Da occasionale a cliente</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <Euro className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-700">Valore Medio Occasionale</p>
                  <h3 className="text-xl font-bold text-green-900">€{revenueBreakdown.averageOccasionalValue.toFixed(0)}</h3>
                  <p className="text-xs text-green-600">Per transazione</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-purple-50">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-700">Revenue Totale</p>
                  <h3 className="text-xl font-bold text-purple-900">€{revenueBreakdown.totalRevenue.toFixed(0)}</h3>
                  <p className="text-xs text-purple-600">Da transazioni reali</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-amber-50">
              <div className="flex items-center space-x-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Users className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-700">Differenza Valore</p>
                  <h3 className="text-xl font-bold text-amber-900">
                    +€{(revenueBreakdown.averageClientValue - revenueBreakdown.averageOccasionalValue).toFixed(0)}
                  </h3>
                  <p className="text-xs text-amber-600">Cliente vs Occasionale</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
