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
    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/60 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-500 rounded-lg p-2">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">Body Fat %</h4>
            <p className="text-xs text-slate-600">Body composition</p>
          </div>
        </div>
        {bodyFatStatus && (
          <Badge className={`${bodyFatStatus.color} border-0 font-medium`}>
            {bodyFatStatus.label}
          </Badge>
        )}
      </div>
      
      <div className="space-y-3">
        {bodyFatRequirements.sufficient && bodyFatPercentage ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center bg-white/60 rounded-lg p-3">
              <div className="text-xl font-bold text-purple-700">{bodyFatPercentage}%</div>
              <div className="text-xs text-slate-600">Body Fat</div>
            </div>
            <div className="text-center bg-white/60 rounded-lg p-3">
              <div className="text-sm font-bold text-purple-700">
                {latestMeasurements?.gender === 'male' ? 'M' : 'F'}
              </div>
              <div className="text-xs text-slate-600">Gender</div>
            </div>
          </div>
        ) : (
          <div className="text-center bg-white/60 rounded-lg p-4">
            <div className="text-sm text-slate-600 mb-2">Missing measurements:</div>
            <div className="text-xs font-medium text-purple-700">
              {bodyFatRequirements.missing.join(', ')}
            </div>
          </div>
        )}
        
        <div className="text-center">
          <span className="text-xs text-purple-600">
            {bodyFatPercentage ? 'Using Navy body fat formula' : 'Complete profile for calculation'}
          </span>
        </div>
      </div>
    </div>
  );
}