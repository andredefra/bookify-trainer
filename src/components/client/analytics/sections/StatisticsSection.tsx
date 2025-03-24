
import React from "react";
import { StatisticsSummary } from "./StatisticsSummary";
import { GoalsProgress } from "./GoalsProgress";
import { BodyMetrics } from "./BodyMetrics";
import { WeeklyStats } from "./WeeklyStats";
import { Achievements } from "./Achievements";

export function StatisticsSection() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Left Column - Summary & Weekly Stats */}
        <div className="space-y-3">
          <StatisticsSummary />
        </div>

        {/* Middle Column - Goals & Body Metrics */}
        <div className="space-y-3">
          <GoalsProgress />
          <BodyMetrics />
        </div>

        {/* Right Column - Weekly Stats & Achievements */}
        <div className="space-y-3">
          <WeeklyStats />
          <Achievements />
        </div>
      </div>
    </div>
  );
}
