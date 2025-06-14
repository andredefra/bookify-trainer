
import React from "react";
import { Target, TrendingUp, Award, Dumbbell, Scale, Activity, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProgressItem, BodyMeasurements } from "@/components/client/overview/fitness-progress/types";
import { getLatestMeasurements, getWeightData, calculateBMI, getBMIStatus } from "./body-composition/utils";
import { calculateBodyFatPercentage, getBodyFatStatus, checkBodyFatRequirements } from "../utils/bodyFatCalculations";

interface GoalsProgressProps {
  progressData: ProgressItem[];
  bodyMeasurements: BodyMeasurements[];
}

export function GoalsProgress({ progressData, bodyMeasurements }: GoalsProgressProps) {
  const isMobile = useIsMobile();

  // Get data using utility functions
  const latestMeasurements = getLatestMeasurements(bodyMeasurements);
  const weightData = getWeightData(progressData);
  
  // Calculate BMI and body fat data
  const currentWeight = weightData?.current || 70;
  const bmi = calculateBMI(currentWeight);
  const bmiStatus = getBMIStatus(bmi);

  // Get specific goals from progress data
  const weightGoal = progressData.find(goal => goal.goalType === 'weight_management');
  const workoutGoal = progressData.find(goal => goal.goalType === 'activity_level') || 
                     progressData.find(goal => goal.goalType === 'strength_progress');

  // Calculate body fat data
  const bodyFatPercentage = latestMeasurements ? calculateBodyFatPercentage(latestMeasurements) : null;
  const bodyFatRequirements = latestMeasurements ? checkBodyFatRequirements(latestMeasurements) : { sufficient: false, missing: [] };
  const bodyFatStatus = bodyFatPercentage && latestMeasurements?.gender ? 
    getBodyFatStatus(bodyFatPercentage, latestMeasurements.gender) : null;

  return (
    <Card className="shadow-md hover:shadow-lg transition-all bg-white border-slate-200">
      <CardContent className="p-5">
        <h3 className="text-base font-semibold mb-4 flex items-center text-slate-800">
          <Target className="h-5 w-5 mr-2.5 text-blue-600" />
          <span>Goals Progress</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Weight Goal Card */}
          {weightGoal && (
            <div className="bg-blue-50 p-4 rounded-lg min-w-0">
              <div className="flex flex-col gap-2 mb-2.5">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-blue-800 truncate">Weight Goal</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded whitespace-nowrap">
                    Current: {weightGoal.current}{weightGoal.unit}
                  </span>
                  <span className="text-xs bg-blue-300 text-blue-900 px-2 py-0.5 rounded whitespace-nowrap">
                    Target: {weightGoal.target}{weightGoal.unit}
                  </span>
                </div>
              </div>
              <div className="mb-2 flex items-center">
                <Progress value={weightGoal.progress} className="h-2.5 flex-grow bg-blue-200" 
                  style={{ 
                    "--theme-primary": "rgb(37 99 235)",
                  } as React.CSSProperties} 
                />
                <span className="ml-2 text-xs font-semibold text-blue-800 w-12 text-right flex-shrink-0">{weightGoal.progress}%</span>
              </div>
              <p className="text-xs text-blue-700">
                {Math.abs(weightGoal.target - weightGoal.current)}{weightGoal.unit} {weightGoal.current > weightGoal.target ? 'to lose' : 'to gain'}
              </p>
            </div>
          )}

          {/* BMI & Weight Card */}
          <div className="bg-green-50 p-4 rounded-lg min-w-0">
            <div className="flex flex-col gap-2 mb-2.5">
              <div className="flex items-center">
                <Scale className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
                <span className="text-sm font-medium text-green-800 truncate">BMI & Weight</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded whitespace-nowrap">
                  Weight: {currentWeight}kg
                </span>
                <span className="text-xs bg-green-300 text-green-900 px-2 py-0.5 rounded whitespace-nowrap">
                  BMI: {bmi}
                </span>
              </div>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-green-700">Status:</span>
              <Badge className={`text-xs px-2 py-1 ${bmiStatus.color} border-0`}>
                {bmiStatus.label}
              </Badge>
            </div>
            <p className="text-xs text-green-700">
              {weightData?.trend === 'down' ? '📉 Losing weight' : 
               weightData?.trend === 'up' ? '📈 Gaining weight' : '➖ Weight stable'}
            </p>
          </div>

          {/* Workout Goal Card */}
          {workoutGoal && (
            <div className="bg-teal-50 p-4 rounded-lg min-w-0">
              <div className="flex flex-col gap-2 mb-2.5">
                <div className="flex items-center">
                  <Dumbbell className="h-4 w-4 mr-2 text-teal-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-teal-800 truncate">
                    {workoutGoal.goalType === 'activity_level' ? 'Activity Goal' : 'Strength Goal'}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                  <span className="text-xs bg-teal-200 text-teal-800 px-2 py-0.5 rounded whitespace-nowrap">
                    Current: {workoutGoal.current}{workoutGoal.unit}
                  </span>
                  <span className="text-xs bg-teal-300 text-teal-900 px-2 py-0.5 rounded whitespace-nowrap">
                    Target: {workoutGoal.target}{workoutGoal.unit}
                  </span>
                </div>
              </div>
              <div className="mb-2 flex items-center">
                <Progress value={workoutGoal.progress} className="h-2.5 flex-grow bg-teal-200" 
                  style={{ 
                    "--theme-primary": "rgb(20 184 166)",
                  } as React.CSSProperties} 
                />
                <span className="ml-2 text-xs font-semibold text-teal-800 w-12 text-right flex-shrink-0">{workoutGoal.progress}%</span>
              </div>
              <p className="text-xs text-teal-700">
                {workoutGoal.target - workoutGoal.current} {workoutGoal.unit} remaining
              </p>
            </div>
          )}

          {/* Body Fat % Card */}
          <div className="bg-purple-50 p-4 rounded-lg min-w-0">
            <div className="flex flex-col gap-2 mb-2.5">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-purple-600 flex-shrink-0" />
                <span className="text-sm font-medium text-purple-800 truncate">Body Fat %</span>
              </div>
              {bodyFatRequirements.sufficient && bodyFatPercentage ? (
                <>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                    <span className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded whitespace-nowrap">
                      BF: {bodyFatPercentage}%
                    </span>
                    <span className="text-xs bg-purple-300 text-purple-900 px-2 py-0.5 rounded whitespace-nowrap">
                      {latestMeasurements?.gender === 'male' ? 'Male' : 'Female'}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-xs text-purple-600">
                  Missing: {bodyFatRequirements.missing.join(', ')}
                </div>
              )}
            </div>
            {bodyFatStatus ? (
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-purple-700">Category:</span>
                <Badge className={`text-xs px-2 py-1 ${bodyFatStatus.color} border-0`}>
                  {bodyFatStatus.label}
                </Badge>
              </div>
            ) : (
              <div className="mb-2 text-xs text-purple-500">Add measurements to calculate</div>
            )}
            <p className="text-xs text-purple-700">
              {bodyFatPercentage ? 'Using Navy body fat formula' : 'Complete profile for calculation'}
            </p>
          </div>

          {/* Body Measurements Card */}
          {latestMeasurements && (
            <div className="bg-orange-50 p-4 rounded-lg min-w-0">
              <div className="flex flex-col gap-2 mb-2.5">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-orange-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-orange-800 truncate">Body Measurements</span>
                </div>
                <div className="text-xs text-orange-600 mb-1">
                  Last: {new Date(latestMeasurements.date).toLocaleDateString()}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs mb-2">
                {latestMeasurements.waist && (
                  <div>Waist: <span className="font-medium">{latestMeasurements.waist}cm</span></div>
                )}
                {latestMeasurements.hips && (
                  <div>Hips: <span className="font-medium">{latestMeasurements.hips}cm</span></div>
                )}
                {latestMeasurements.arms && (
                  <div>Arms: <span className="font-medium">{latestMeasurements.arms}cm</span></div>
                )}
                {latestMeasurements.neck && (
                  <div>Neck: <span className="font-medium">{latestMeasurements.neck}cm</span></div>
                )}
              </div>
              <Badge className="text-xs px-2 py-1 bg-orange-100 text-orange-800 border-0">
                {latestMeasurements.source === 'manual' ? 'Manual Entry' : 
                 latestMeasurements.source === 'googleFit' ? 'Google Fit' : 'Apple Health'}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
