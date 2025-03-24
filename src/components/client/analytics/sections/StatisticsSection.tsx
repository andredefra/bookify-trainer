
import React from "react";
import { StatisticsSummary } from "./StatisticsSummary";
import { GoalsProgress } from "./GoalsProgress";
import { BodyMetrics } from "./BodyMetrics";
import { WeeklyStats } from "./WeeklyStats";

export function StatisticsSection() {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6 text-slate-800">Performance Statistics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-3">
          <StatisticsSummary />
        </div>
        <div className="lg:col-span-1">
          <GoalsProgress />
        </div>
        <div className="lg:col-span-1">
          <BodyMetrics />
        </div>
        <div className="lg:col-span-3">
          <WeeklyStats />
        </div>
      </div>
    </div>
  );
}
