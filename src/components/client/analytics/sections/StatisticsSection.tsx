
import React from "react";
import { StatisticsSummary } from "./StatisticsSummary";
import { ProgressItem, BodyMeasurements } from "@/components/client/overview/fitness-progress/types";

interface StatisticsSectionProps {
  progressData: ProgressItem[];
  bodyMeasurements: BodyMeasurements[];
}

export function StatisticsSection({ progressData, bodyMeasurements }: StatisticsSectionProps) {
  return (
    <div className="w-full space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Performance Statistics</h2>
      <StatisticsSummary />
    </div>
  );
}
