
import React from "react";
import { StatisticsSummary } from "./StatisticsSummary";
import { GoalsProgress } from "./GoalsProgress";

export function StatisticsSection() {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-5 text-slate-800">Performance Statistics</h2>
      <div className="space-y-5">
        <StatisticsSummary />
        <GoalsProgress />
      </div>
    </div>
  );
}
