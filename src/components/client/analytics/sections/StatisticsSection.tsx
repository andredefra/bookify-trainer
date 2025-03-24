
import React from "react";
import { StatisticsSummary } from "./StatisticsSummary";
import { GoalsProgress } from "./GoalsProgress";
import { BodyMetrics } from "./BodyMetrics";
import { WeeklyStats } from "./WeeklyStats";
import { Achievements } from "./Achievements";

export function StatisticsSection() {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4 text-slate-800">Performance Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatisticsSummary />
        <GoalsProgress />
        <BodyMetrics />
        <WeeklyStats />
        <Achievements />
      </div>
    </div>
  );
}
