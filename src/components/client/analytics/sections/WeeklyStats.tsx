
import React from "react";
import { Calendar, Dumbbell, Activity, Flame, BarChart2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export function WeeklyStats() {
  const weeklyData = [
    { day: "Mon", workouts: 2, hours: 1.2, calories: 450 },
    { day: "Tue", workouts: 1, hours: 0.5, calories: 200 },
    { day: "Wed", workouts: 2, hours: 1.5, calories: 600 },
    { day: "Thu", workouts: 0, hours: 0, calories: 0 },
    { day: "Fri", workouts: 1, hours: 0.5, calories: 350 },
    { day: "Sat", workouts: 1, hours: 0.5, calories: 300 },
    { day: "Sun", workouts: 1, hours: 0.5, calories: 250 }
  ];

  return (
    <Card className="shadow-md hover:shadow-lg transition-all bg-white border-slate-200 col-span-1 md:col-span-2">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold flex items-center text-slate-800">
            <BarChart2 className="h-5 w-5 mr-2 text-teal-600" />
            <span>Weekly Activity</span>
          </h3>
          <span className="text-xs bg-teal-100 text-teal-800 px-2.5 py-1 rounded-full">Last 7 days</span>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 shadow-lg border rounded-lg">
                        <p className="font-medium text-slate-900">{label}</p>
                        <p className="text-sm text-slate-700 flex items-center mt-1">
                          <Dumbbell className="h-3.5 w-3.5 text-teal-500 mr-1.5" />
                          Workouts: <span className="font-medium ml-1">{payload[0].value}</span>
                        </p>
                        <p className="text-sm text-slate-700 flex items-center mt-1">
                          <Activity className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
                          Hours: <span className="font-medium ml-1">{payload[1].value}</span>
                        </p>
                        <p className="text-sm text-slate-700 flex items-center mt-1">
                          <Flame className="h-3.5 w-3.5 text-orange-500 mr-1.5" />
                          Calories: <span className="font-medium ml-1">{payload[2].value}</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="workouts" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="hours" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="calories" fill="#f97316" radius={[4, 4, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-teal-50 p-3 rounded-lg flex flex-col items-center">
            <div className="flex items-center mb-1">
              <Dumbbell className="h-4 w-4 text-teal-600 mr-1.5" />
              <span className="text-sm text-teal-800 font-medium">Workouts</span>
            </div>
            <span className="text-xl font-bold text-teal-900">8</span>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg flex flex-col items-center">
            <div className="flex items-center mb-1">
              <Activity className="h-4 w-4 text-blue-600 mr-1.5" />
              <span className="text-sm text-blue-800 font-medium">Hours</span>
            </div>
            <span className="text-xl font-bold text-blue-900">4.7</span>
          </div>
          
          <div className="bg-orange-50 p-3 rounded-lg flex flex-col items-center">
            <div className="flex items-center mb-1">
              <Flame className="h-4 w-4 text-orange-600 mr-1.5" />
              <span className="text-sm text-orange-800 font-medium">Calories</span>
            </div>
            <span className="text-xl font-bold text-orange-900">2.7k</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
