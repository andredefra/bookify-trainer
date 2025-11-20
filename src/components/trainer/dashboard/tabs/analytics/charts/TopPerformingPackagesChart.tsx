import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Award, Package, Users, DollarSign } from "lucide-react";
import { PackageData, getPackageTypeColor, getRankColor } from "../data/packageAnalyticsData";

interface TopPerformingPackagesChartProps {
  packages: PackageData[];
}

export function TopPerformingPackagesChart({ packages }: TopPerformingPackagesChartProps) {
  if (packages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Top Performing Package Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No packages sold in this period
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Top Performing Package Templates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Rank Badge */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getRankColor(pkg.rank)}`}>
                  {pkg.rank}
                </div>
                
                {/* Package Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{pkg.title}</h4>
                    <Badge className={getPackageTypeColor(pkg.type)}>
                      {pkg.type.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      <span>{pkg.salesCount} sold</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      <span>€{pkg.revenue}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{pkg.conversionRate}% conversion</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-lg font-bold">€{pkg.avgValue}</div>
                  <div className="text-xs text-muted-foreground">Avg. Value</div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold">{pkg.completionRate}%</div>
                  <div className="text-xs text-muted-foreground">Completion</div>
                </div>
                
                <div className="flex items-center gap-1">
                  {pkg.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    pkg.growthRate > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {pkg.growthRate > 0 ? '+' : ''}{pkg.growthRate}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}