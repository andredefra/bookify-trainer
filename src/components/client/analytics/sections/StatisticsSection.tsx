
import React from "react";
import { StatisticsSummary } from "./StatisticsSummary";
import { GoalsProgress } from "./GoalsProgress";
import { BodyMetrics } from "./BodyMetrics";
import { WeeklyStats } from "./WeeklyStats";

export function StatisticsSection() {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6 text-slate-800">Performance Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatisticsSummary />
        <GoalsProgress />
        <BodyMetrics />
        <WeeklyStats />
      </div>
    </div>
  );
}
