
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Calendar, Clock, CreditCard } from "lucide-react";

const mockPackages = [
  {
    id: 1,
    name: "Personal Training Package",
    type: "sessions_only",
    totalSessions: 10,
    usedSessions: 6,
    expiryDate: "2024-08-15",
    status: "active",
    totalPaid: 500,
    trainer: "John Doe"
  },
  {
    id: 2,
    name: "Complete Transformation",
    type: "hybrid",
    totalSessions: 8,
    usedSessions: 3,
    programs: ["Strength Building", "Nutrition Guide"],
    expiryDate: "2024-09-20",
    status: "active",
    totalPaid: 750,
    trainer: "John Doe"
  }
];

export function MyPackagesTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {mockPackages.map((pkg) => (
          <Card key={pkg.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{pkg.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">with {pkg.trainer}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {pkg.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Sessions Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sessions Used</span>
                  <span>{pkg.usedSessions}/{pkg.totalSessions}</span>
                </div>
                <Progress value={(pkg.usedSessions / pkg.totalSessions) * 100} />
              </div>

              {/* Package Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Expires: {pkg.expiryDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>Paid: €{pkg.totalPaid}</span>
                </div>
              </div>

              {/* Programs (if hybrid) */}
              {pkg.programs && (
                <div>
                  <p className="text-sm font-medium mb-2">Included Programs:</p>
                  <div className="flex gap-2">
                    {pkg.programs.map((program, index) => (
                      <Badge key={index} variant="secondary">
                        {program}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  Book Session
                </Button>
                {pkg.usedSessions === pkg.totalSessions && (
                  <Button size="sm">
                    Renew Package
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockPackages.length === 0 && (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Packages Yet</h3>
          <p className="text-muted-foreground mb-4">
            You haven't purchased any training packages yet.
          </p>
          <Button>Browse Packages</Button>
        </div>
      )}
    </div>
  );
}
