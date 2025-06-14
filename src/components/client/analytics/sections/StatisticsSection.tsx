
import React from "react";
import { StatisticsSummary } from "./StatisticsSummary";
import { GoalsProgress } from "./GoalsProgress";
import { ProgressItem, BodyMeasurements } from "@/components/client/overview/fitness-progress/types";

interface StatisticsSectionProps {
  progressData: ProgressItem[];
  bodyMeasurements: BodyMeasurements[];
}

export function StatisticsSection({ progressData, bodyMeasurements }: StatisticsSectionProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-5 text-slate-800">Performance Statistics</h2>
      <div className="space-y-5">
        <StatisticsSummary />
        <GoalsProgress progressData={progressData} bodyMeasurements={bodyMeasurements} />
      </div>
    </div>
  );
}
