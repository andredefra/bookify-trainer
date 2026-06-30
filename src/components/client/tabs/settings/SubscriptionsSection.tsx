import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Zap, BarChart2, Info } from "lucide-react";

export function SubscriptionsSection() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Free Plan</CardTitle>
              <CardDescription>Basic access with limited AI features</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-amber-100 text-amber-700">
              Coming Soon
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <Info className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-800">
              Le funzionalità AI non sono ancora disponibili. Saranno attivate al lancio dell'AI Plan.
            </p>
          </div>

          <div className="opacity-50 pointer-events-none select-none space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Monthly AI Usage</span>
                <span className="text-sm text-muted-foreground">0/0 requests</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Your Features</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">AI Workout Coach (AI Plan)</p>
                    <p className="text-xs text-muted-foreground">AI chat during workouts</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Sparkles className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Exercise Demos (AI Plan)</p>
                    <p className="text-xs text-muted-foreground">AI-generated setup images and videos</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <BarChart2 className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Advanced Workout Insights (AI Plan)</p>
                    <p className="text-xs text-muted-foreground">AI-powered analytics and fitness score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
