import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Target } from "lucide-react";

export function UserAnalytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics & Progress</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Weight Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">72 kg</div>
            <Progress value={60} className="mb-2" />
            <p className="text-sm text-muted-foreground">Target: 65 kg</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Goals Achieved</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">2/3</div>
            <Progress value={67} className="mb-2" />
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}