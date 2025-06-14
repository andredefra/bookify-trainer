import React from "react";
import { Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BodyMeasurements } from "@/components/client/overview/fitness-progress/types";

interface BodyMeasurementsCardProps {
  latestMeasurements: BodyMeasurements;
}

export function BodyMeasurementsCard({ latestMeasurements }: BodyMeasurementsCardProps) {
  const getSourceInfo = () => {
    switch (latestMeasurements.source) {
      case 'manual':
        return { label: 'Manual Entry', color: 'bg-orange-100 text-orange-800' };
      case 'googleFit':
        return { label: 'Google Fit', color: 'bg-blue-100 text-blue-800' };
      case 'appleHealth':
        return { label: 'Apple Health', color: 'bg-gray-100 text-gray-800' };
      default:
        return { label: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const sourceInfo = getSourceInfo();

  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-500 rounded-lg p-2">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">Body Measurements</h4>
            <p className="text-xs text-slate-600">
              {new Date(latestMeasurements.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Badge className={`${sourceInfo.color} border-0 font-medium text-xs`}>
          {sourceInfo.label}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {latestMeasurements.waist && (
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-orange-700">{latestMeasurements.waist}</div>
            <div className="text-xs text-slate-600">Waist (cm)</div>
          </div>
        )}
        {latestMeasurements.hips && (
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-orange-700">{latestMeasurements.hips}</div>
            <div className="text-xs text-slate-600">Hips (cm)</div>
          </div>
        )}
        {latestMeasurements.arms && (
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-orange-700">{latestMeasurements.arms}</div>
            <div className="text-xs text-slate-600">Arms (cm)</div>
          </div>
        )}
        {latestMeasurements.neck && (
          <div className="bg-white/60 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-orange-700">{latestMeasurements.neck}</div>
            <div className="text-xs text-slate-600">Neck (cm)</div>
          </div>
        )}
      </div>
    </div>
  );
}