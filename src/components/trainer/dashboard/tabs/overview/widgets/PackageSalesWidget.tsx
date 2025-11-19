import { BaseWidget } from "./BaseWidget";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PackageSale } from "./types";

export function PackageSalesWidget() {
  const packageSales: PackageSale[] = [
    { packageName: "1-Month Personal Training", soldCount: 12, revenue: 1800 },
    { packageName: "Nutrition + Training Combo", soldCount: 8, revenue: 2400 },
    { packageName: "3-Month Program", soldCount: 5, revenue: 2500 },
  ];

  const totalSales = packageSales.reduce((sum, p) => sum + p.soldCount, 0);
  const totalRevenue = packageSales.reduce((sum, p) => sum + p.revenue, 0);
  const maxSold = Math.max(...packageSales.map(p => p.soldCount));

  return (
    <BaseWidget
      title="Package Sales"
      icon={Package}
      className="col-span-full lg:col-span-1"
      action={
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          New Package
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 pb-4 border-b">
          <div>
            <p className="text-2xl font-bold">{totalSales}</p>
            <p className="text-xs text-muted-foreground">Packages sold</p>
          </div>
          <div>
            <p className="text-2xl font-bold">€{totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total revenue</p>
          </div>
        </div>

        <div className="space-y-3">
          {packageSales.map((pkg, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium truncate pr-2">{pkg.packageName}</span>
                <span className="text-muted-foreground whitespace-nowrap">
                  {pkg.soldCount} sold
                </span>
              </div>
              <Progress 
                value={(pkg.soldCount / maxSold) * 100} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">
                €{pkg.revenue.toLocaleString()} revenue
              </p>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}
