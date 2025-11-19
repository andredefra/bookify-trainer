
import React from "react";
import { ProgressItem, BodyMeasurements } from "@/components/client/overview/fitness-progress/types";
import { getLatestMeasurements, getWeightData, calculateBMI, getBMIStatus } from "./body-composition/utils";
import { calculateBodyFatPercentage, getBodyFatStatus, checkBodyFatRequirements } from "../utils/bodyFatCalculations";
import { useUserProfile } from "@/hooks/useUserProfile";
import { 
  WeightGoalCard, 
  BMIWeightCard, 
  WorkoutGoalCard, 
  BodyFatCard, 
  BodyMeasurementsCard,
  ProgressTrendsCard 
} from "./goals-progress";

interface GoalsProgressProps {
  progressData: ProgressItem[];
  bodyMeasurements: BodyMeasurements[];
}

export function GoalsProgress({ progressData, bodyMeasurements }: GoalsProgressProps) {
  const { profile } = useUserProfile();
  
  // Get data using utility functions
  const latestMeasurements = getLatestMeasurements(bodyMeasurements);
  const weightData = getWeightData(progressData);
  
  // Calculate BMI and body fat data
  const currentWeight = weightData?.current || 70;
  const bmi = profile?.height ? calculateBMI(currentWeight, profile.height) : calculateBMI(currentWeight);
  const bmiStatus = getBMIStatus(bmi);

  // Get specific goals from progress data
  const weightGoal = progressData.find(goal => goal.goalType === 'weight_management');
  const workoutGoal = progressData.find(goal => goal.goalType === 'activity_level') || 
                     progressData.find(goal => goal.goalType === 'strength_progress');

  // Calculate body fat data using profile height and gender
  const bodyFatPercentage = latestMeasurements && profile?.height && profile?.gender && latestMeasurements.waist && latestMeasurements.neck ? 
    calculateBodyFatPercentage({
      waist: latestMeasurements.waist,
      neck: latestMeasurements.neck,
      hips: latestMeasurements.hips,
      height: profile.height,
      gender: profile.gender
    }) : null;
    
  const bodyFatRequirements = checkBodyFatRequirements({
    height: profile?.height,
    gender: profile?.gender,
    waist: latestMeasurements?.waist,
    neck: latestMeasurements?.neck,
    hips: latestMeasurements?.hips
  });
  
  const bodyFatStatus = bodyFatPercentage && profile?.gender ? 
    getBodyFatStatus(bodyFatPercentage, profile.gender) : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Weight Goal Card */}
      {weightGoal && <WeightGoalCard weightGoal={weightGoal} />}

      {/* BMI & Weight Card */}
      <BMIWeightCard 
        currentWeight={currentWeight}
        bmi={bmi}
        bmiStatus={bmiStatus}
        weightTrend={weightData?.trend}
      />

      {/* Workout Goal Card */}
      {workoutGoal && <WorkoutGoalCard workoutGoal={workoutGoal} />}

      {/* Progress Trends Card */}
      <ProgressTrendsCard progressData={progressData} />

      {/* Body Measurements Card */}
      {latestMeasurements && (
        <BodyMeasurementsCard 
          latestMeasurements={latestMeasurements} 
          bodyMeasurements={bodyMeasurements}
        />
      )}

      {/* Body Fat % Card */}
      <BodyFatCard 
        bodyFatPercentage={bodyFatPercentage}
        bodyFatStatus={bodyFatStatus}
        bodyFatRequirements={bodyFatRequirements}
        latestMeasurements={latestMeasurements}
        bodyMeasurements={bodyMeasurements}
      />
    </div>
  );
}
