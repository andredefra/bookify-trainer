
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, User, Clock } from "lucide-react";
import { ClientPackage } from "@/hooks/useClientPackages";

interface PackageSummaryCardProps {
  packageData: ClientPackage;
  trainerName: string;
}

export function PackageSummaryCard({ packageData, trainerName }: PackageSummaryCardProps) {
  const getPackageTypeColor = (type: string) => {
    switch (type) {
      case 'sessions_only': return 'bg-blue-100 text-blue-800';
      case 'program_only': return 'bg-green-100 text-green-800';
      case 'hybrid': return 'bg-purple-100 text-purple-800';
      case 'service': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <Badge className={getPackageTypeColor(packageData.package_type)}>
              {packageData.package_type.replace('_', ' ')}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">€{packageData.price}</div>
          </div>
        </div>
        
        <h3 className="font-semibold mb-2">{packageData.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{packageData.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>by {trainerName}</span>
          </div>
          {packageData.sessions_count > 0 && (
            <div>{packageData.sessions_count} sessions</div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {packageData.validity_days} days validity
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
