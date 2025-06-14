import React from "react";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BodyMeasurements } from "@/components/client/overview/fitness-progress/types";

interface BodyFatCardProps {
  bodyFatPercentage: number | null;
  bodyFatStatus: { label: string; color: string } | null;
  bodyFatRequirements: { sufficient: boolean; missing: string[] };
  latestMeasurements: BodyMeasurements | null;
}

export function BodyFatCard({ 
  bodyFatPercentage, 
  bodyFatStatus, 
  bodyFatRequirements, 
  latestMeasurements 
}: BodyFatCardProps) {
  return (
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
  );
}