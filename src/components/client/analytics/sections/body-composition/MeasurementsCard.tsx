
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { BodyMeasurements } from "@/components/client/overview/fitness-progress/types";

interface MeasurementsCardProps {
  latestMeasurements: BodyMeasurements | null;
}

export function MeasurementsCard({ latestMeasurements }: MeasurementsCardProps) {
  const isMobile = useIsMobile();

  return (
    <Card className="shadow-sm hover:shadow-md transition-all bg-white border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-sm' : 'text-base'}`}>
          <Activity className="h-5 w-5 text-green-600" />
          Measurements
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        {latestMeasurements ? (
          <>
            <div className="text-xs text-slate-600 mb-2">
              Last updated: {new Date(latestMeasurements.date).toLocaleDateString()}
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              {latestMeasurements.chest && (
                <div>
                  <span className="text-slate-600">Chest:</span>
                  <span className="ml-1 font-medium">{latestMeasurements.chest}cm</span>
                </div>
              )}
              {latestMeasurements.waist && (
                <div>
                  <span className="text-slate-600">Waist:</span>
                  <span className="ml-1 font-medium">{latestMeasurements.waist}cm</span>
                </div>
              )}
              {latestMeasurements.abdomen && (
                <div>
                  <span className="text-slate-600">Abdomen:</span>
                  <span className="ml-1 font-medium">{latestMeasurements.abdomen}cm</span>
                </div>
              )}
              {latestMeasurements.hips && (
                <div>
                  <span className="text-slate-600">Hips:</span>
                  <span className="ml-1 font-medium">{latestMeasurements.hips}cm</span>
                </div>
              )}
              {latestMeasurements.arms && (
                <div>
                  <span className="text-slate-600">Arms:</span>
                  <span className="ml-1 font-medium">{latestMeasurements.arms}cm</span>
                </div>
              )}
              {(latestMeasurements.quadriceps ?? latestMeasurements.thighs) && (
                <div>
                  <span className="text-slate-600">Quadriceps:</span>
                  <span className="ml-1 font-medium">{latestMeasurements.quadriceps ?? latestMeasurements.thighs}cm</span>
                </div>
              )}
            </div>
            
            <Badge className="text-xs px-2 py-1 bg-green-50 text-green-600 border-0">
              Source: {latestMeasurements.source === 'manual' ? 'Manual' : 
                       latestMeasurements.source === 'googleFit' ? 'Google Fit' : 'Apple Health'}
            </Badge>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-xs text-slate-500 mb-2">No measurements recorded</p>
            <p className="text-xs text-slate-400">
              Add body measurements to track your progress
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
