import React from "react";
import { Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BodyMeasurements } from "@/components/client/overview/fitness-progress/types";

interface BodyMeasurementsCardProps {
  latestMeasurements: BodyMeasurements;
}

export function BodyMeasurementsCard({ latestMeasurements }: BodyMeasurementsCardProps) {
  return (
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
  );
}