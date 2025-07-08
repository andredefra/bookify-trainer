import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Award, Package, Users, DollarSign } from "lucide-react";

const topPerformingPackages = [
  {
    id: 1,
    title: "Complete Transformation",
    type: "hybrid",
    rank: 1,
    salesCount: 15,
    revenue: 11250,
    avgValue: 750,
    growthRate: 25,
    conversionRate: 85,
    completionRate: 92,
    trend: "up"
  },
  {
    id: 2,
    title: "Personal Training Package",
    type: "sessions_only",
    rank: 2,
    salesCount: 12,
    revenue: 6000,
    avgValue: 500,
    growthRate: 15,
    conversionRate: 78,
    completionRate: 88,
    trend: "up"
  },
  {
    id: 3,
    title: "Beginner's Program",
    type: "program_only",
    rank: 3,
    salesCount: 8,
    revenue: 1920,
    avgValue: 240,
    growthRate: -5,
    conversionRate: 65,
    completionRate: 90,
    trend: "down"
  },
  {
    id: 4,
    title: "Group Training",
    type: "sessions_only",
    rank: 4,
    salesCount: 6,
    revenue: 1800,
    avgValue: 300,
    growthRate: 10,
    conversionRate: 72,
    completionRate: 85,
    trend: "up"
  }
];

const getPackageTypeColor = (type: string) => {
  switch (type) {
    case 'sessions_only': return 'bg-blue-100 text-blue-800';
    case 'program_only': return 'bg-green-100 text-green-800';
    case 'hybrid': return 'bg-purple-100 text-purple-800';
    case 'service': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1: return 'text-yellow-600 bg-yellow-50';
    case 2: return 'text-gray-600 bg-gray-50';
    case 3: return 'text-amber-600 bg-amber-50';
    default: return 'text-blue-600 bg-blue-50';
  }
};

export function TopPerformingPackagesChart() {
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
          {topPerformingPackages.map((pkg) => (
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
        
        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">41</div>
              <div className="text-sm text-muted-foreground">Total Sales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">€20,970</div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">75%</div>
              <div className="text-sm text-muted-foreground">Avg. Conversion</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}