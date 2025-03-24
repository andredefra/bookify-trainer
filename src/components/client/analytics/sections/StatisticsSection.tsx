
import React from "react";
import { StatisticsSummary } from "./StatisticsSummary";
import { GoalsProgress } from "./GoalsProgress";

export function StatisticsSection() {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-5 text-slate-800">Performance Statistics</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-3">
          <StatisticsSummary />
        </div>
        <div className="lg:col-span-1">
          <GoalsProgress />
        </div>
      </div>
    </div>
  );
}
