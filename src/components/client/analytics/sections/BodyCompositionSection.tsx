
import React from "react";
import { ProgressItem, BodyMeasurements } from "@/components/client/overview/fitness-progress/types";
import { getLatestMeasurements, getWeightData } from "./body-composition/utils";
import { BodyCompositionChart } from "./body-composition/BodyCompositionChart";
import { WeightBMICard } from "./body-composition/WeightBMICard";
import { MeasurementsCard } from "./body-composition/MeasurementsCard";

interface BodyCompositionSectionProps {
  progressData: ProgressItem[];
  bodyMeasurements?: BodyMeasurements[];
}

export function BodyCompositionSection({ progressData, bodyMeasurements = [] }: BodyCompositionSectionProps) {
  const latestMeasurements = getLatestMeasurements(bodyMeasurements);
  const weightData = getWeightData(progressData);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <BodyCompositionChart latestMeasurements={latestMeasurements} />
      <WeightBMICard weightData={weightData} latestMeasurements={latestMeasurements} />
      <MeasurementsCard latestMeasurements={latestMeasurements} />
    </div>
  );
}
