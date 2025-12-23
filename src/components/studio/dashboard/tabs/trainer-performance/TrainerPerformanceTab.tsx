import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, MessageSquare, BarChart2 } from "lucide-react";
import { PerformanceStatsCards } from "./components/PerformanceStatsCards";
import { TrainerLeaderboard } from "./components/TrainerLeaderboard";
import { TrainerReviewsList } from "./components/TrainerReviewsList";
import { RatingDistributionChart } from "./components/RatingDistributionChart";
import { 
  mockTrainerPerformance, 
  mockClientReviews 
} from "./data/trainerPerformanceData";

export function TrainerPerformanceTab() {
  const [activeSubTab, setActiveSubTab] = useState("performance");
  const [selectedTrainer, setSelectedTrainer] = useState("all");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Trainer Performance</h1>
          <p className="text-muted-foreground">
            Monitor trainer performance, client reviews, and satisfaction metrics
          </p>
        </div>
      </div>

      {/* Stats */}
      <PerformanceStatsCards 
        trainers={mockTrainerPerformance}
        reviews={mockClientReviews}
      />

      {/* Tabs */}
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="performance" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart2 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {activeSubTab === "reviews" && (
            <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by trainer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trainers</SelectItem>
                {mockTrainerPerformance.map((trainer) => (
                  <SelectItem key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <TabsContent value="performance" className="mt-6">
          <TrainerLeaderboard trainers={mockTrainerPerformance} />
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <TrainerReviewsList 
            reviews={mockClientReviews}
            selectedTrainer={selectedTrainer}
          />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RatingDistributionChart />
            
            {/* Trainer Comparison */}
            <div className="space-y-4">
              {mockTrainerPerformance.map((trainer) => (
                <div key={trainer.id} className="p-4 rounded-lg border bg-muted/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{trainer.name}</h4>
                    <span className="text-amber-500 font-medium">⭐ {trainer.rating}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Sessions</p>
                      <p className="font-medium">{trainer.sessionsCompleted}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-medium text-emerald-600">€{trainer.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Response</p>
                      <p className="font-medium">{trainer.responseTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
