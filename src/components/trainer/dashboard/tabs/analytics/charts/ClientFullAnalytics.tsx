import React from "react";
import { ClientData } from "../utils/metricsCalculator";
import { ExtendedBodyMeasurement } from "../data/clientMockData";
import {
  convertGoalsToProgressItems,
  convertBodyMeasurements,
  getWeightData,
  calculateBMI,
  getBMIStatus,
  getBodyFatStatus,
  checkBodyFatRequirements,
} from "../utils/clientDataConverter";

// Import client dashboard cards
import { WeightGoalCard } from "@/components/client/analytics/sections/goals-progress/WeightGoalCard";
import { BMIWeightCard } from "@/components/client/analytics/sections/goals-progress/BMIWeightCard";
import { WorkoutGoalCard } from "@/components/client/analytics/sections/goals-progress/WorkoutGoalCard";
import { ProgressTrendsCard } from "@/components/client/analytics/sections/goals-progress/ProgressTrendsCard";
import { BodyMeasurementsCard } from "@/components/client/analytics/sections/goals-progress/BodyMeasurementsCard";
import { BodyFatCard } from "@/components/client/analytics/sections/goals-progress/BodyFatCard";

interface ClientFullAnalyticsProps {
  client: ClientData;
}

export function ClientFullAnalytics({ client }: ClientFullAnalyticsProps) {
  // Convert trainer data to client format
  const progressData = convertGoalsToProgressItems(client);
  const bodyMeasurements = convertBodyMeasurements(
    client.bodyMeasurements as ExtendedBodyMeasurement[],
    client.height,
    client.gender || 'male'
  );

  // Get latest measurements
  const latestMeasurements = bodyMeasurements.length > 0 
    ? bodyMeasurements[bodyMeasurements.length - 1] 
    : null;

  // Get weight data
  const weightData = getWeightData(client);

  // Calculate BMI
  const bmi = calculateBMI(
    latestMeasurements?.weight || client.currentWeight,
    client.height
  );
  const bmiStatus = getBMIStatus(bmi);

  // Get body fat data
  const latestBodyFat = (client.bodyMeasurements as ExtendedBodyMeasurement[]).slice(-1)[0]?.bodyFat;
  const bodyFatStatus = latestBodyFat 
    ? getBodyFatStatus(latestBodyFat, client.gender || 'male') 
    : null;
  const bodyFatRequirements = checkBodyFatRequirements(
    latestMeasurements,
    !!client.height,
    !!client.gender
  );

  // Find specific goals
  const weightGoal = progressData.find(g => g.goalType === 'weight_management');
  const workoutGoal = progressData.find(g => 
    g.goalType === 'activity_level' || g.goalType === 'strength_progress'
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {client.name}'s Full Analytics
        </h3>
        <span className="text-xs text-muted-foreground">
          {bodyMeasurements.length} measurements tracked
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weight Goal Card */}
        {weightGoal && (
          <WeightGoalCard weightGoal={weightGoal} />
        )}

        {/* BMI & Weight Card */}
        <BMIWeightCard
          currentWeight={latestMeasurements?.weight || client.currentWeight}
          bmi={bmi}
          bmiStatus={bmiStatus}
          weightTrend={weightData.trend}
        />

        {/* Workout Goal Card */}
        {workoutGoal && (
          <WorkoutGoalCard workoutGoal={workoutGoal} />
        )}

        {/* Progress Trends Card */}
        <ProgressTrendsCard progressData={progressData} />

        {/* Body Measurements Card */}
        {latestMeasurements && (
          <BodyMeasurementsCard
            latestMeasurements={latestMeasurements}
            bodyMeasurements={bodyMeasurements}
          />
        )}

        {/* Body Fat Card */}
        <BodyFatCard
          bodyFatPercentage={latestBodyFat || null}
          bodyFatStatus={bodyFatStatus}
          bodyFatRequirements={bodyFatRequirements}
          latestMeasurements={latestMeasurements}
          bodyMeasurements={bodyMeasurements}
        />
      </div>

      {/* Historical Summary */}
      <div className="bg-muted/30 rounded-lg p-4 mt-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Historical Overview</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-muted-foreground">Data Since</span>
            <p className="font-medium text-foreground">
              {bodyMeasurements.length > 0 
                ? new Date(bodyMeasurements[0].date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                : 'N/A'}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Weight Change</span>
            <p className="font-medium text-foreground">
              {bodyMeasurements.length > 1
                ? `${(latestMeasurements?.weight || 0) - (bodyMeasurements[0]?.weight || 0) > 0 ? '+' : ''}${((latestMeasurements?.weight || 0) - (bodyMeasurements[0]?.weight || 0)).toFixed(1)}kg`
                : 'N/A'}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Body Fat Change</span>
            <p className="font-medium text-foreground">
              {bodyMeasurements.length > 1
                ? `${latestBodyFat && (client.bodyMeasurements as ExtendedBodyMeasurement[])[0]?.bodyFat
                    ? (latestBodyFat - (client.bodyMeasurements as ExtendedBodyMeasurement[])[0].bodyFat > 0 ? '+' : '') + 
                      (latestBodyFat - (client.bodyMeasurements as ExtendedBodyMeasurement[])[0].bodyFat).toFixed(1) + '%'
                    : 'N/A'}`
                : 'N/A'}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Active Goals</span>
            <p className="font-medium text-foreground">
              {progressData.filter(g => g.progress < 100).length} / {progressData.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
