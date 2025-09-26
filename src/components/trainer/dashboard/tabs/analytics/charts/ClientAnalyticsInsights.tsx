import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Award, 
  Lightbulb,
  RefreshCw,
  Zap,
  Heart
} from "lucide-react";

interface ClientInsight {
  type: 'strength' | 'progress' | 'consistency' | 'motivation';
  title: string;
  description: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
}

interface ClientAnalyticsInsightsProps {
  clientName?: string;
  fitnessScore?: number;
  progressTrend?: 'improving' | 'stable' | 'declining';
}

export function ClientAnalyticsInsights({ 
  clientName, 
  fitnessScore = 78,
  progressTrend = 'improving' 
}: ClientAnalyticsInsightsProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [insights, setInsights] = useState<ClientInsight[]>([
    {
      type: 'progress',
      title: 'Excellent Weight Progress',
      description: 'Client has consistently lost weight over the past 6 weeks with steady progress toward target.',
      recommendation: 'Continue current nutrition plan and consider adding more cardio variety.',
      priority: 'high'
    },
    {
      type: 'strength',
      title: 'Strength Plateau Detected',
      description: 'Bench press progress has stalled at 85kg for the past 3 sessions.',
      recommendation: 'Implement progressive overload with drop sets or increase training frequency.',
      priority: 'medium'
    },
    {
      type: 'consistency',
      title: 'Outstanding Attendance',
      description: '94% session attendance rate shows exceptional commitment to training.',
      recommendation: 'Maintain current schedule and consider reward system for continued motivation.',
      priority: 'low'
    },
    {
      type: 'motivation',
      title: 'High Motivation Levels',
      description: 'Client shows enthusiasm and consistently achieves weekly targets.',
      recommendation: 'Introduce new challenges to maintain engagement and prevent boredom.',
      priority: 'medium'
    }
  ]);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setInsights(prev => [
        ...prev,
        {
          type: 'progress',
          title: 'New Analysis Complete',
          description: 'AI has identified optimal training windows and recovery patterns.',
          recommendation: 'Schedule intense sessions on Mondays and Thursdays for best results.',
          priority: 'high'
        }
      ]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'strength': return <Target className="h-4 w-4" />;
      case 'progress': return <TrendingUp className="h-4 w-4" />;
      case 'consistency': return <Award className="h-4 w-4" />;
      case 'motivation': return <Heart className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving': return 'text-green-600';
      case 'declining': return 'text-red-600';
      case 'stable': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4" />;
      case 'declining': return <TrendingUp className="h-4 w-4 rotate-180" />;
      case 'stable': return <Target className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-md p-1.5">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-medium">
                {clientName ? `${clientName}'s AI Insights` : 'Client AI Insights'}
              </h3>
              <p className="text-xs text-muted-foreground">Performance analysis and recommendations</p>
            </div>
          </div>
          <Button 
            onClick={runAnalysis} 
            disabled={isAnalyzing} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            {isAnalyzing ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Zap className="h-4 w-4" />
            )}
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </Button>
        </div>

        {/* Fitness Score and Trend */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
            <div className="text-2xl font-bold text-blue-700 mb-1">{fitnessScore}</div>
            <div className="text-xs text-blue-600 flex items-center justify-center gap-1">
              <Award className="h-3 w-3" />
              Fitness Score
            </div>
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
            <div className={`text-lg font-bold mb-1 ${getTrendColor(progressTrend)} flex items-center justify-center gap-2`}>
              {getTrendIcon(progressTrend)}
              {progressTrend.charAt(0).toUpperCase() + progressTrend.slice(1)}
            </div>
            <div className="text-xs text-green-600">Progress Trend</div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">AI Recommendations</span>
          </div>

          {insights.map((insight, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-blue-100 rounded">
                    {getTypeIcon(insight.type)}
                  </div>
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                </div>
                <Badge className={getPriorityColor(insight.priority)}>
                  {insight.priority}
                </Badge>
              </div>

              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {insight.description}
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-medium text-blue-800 mb-1">Recommendation</div>
                    <div className="text-sm text-blue-700">{insight.recommendation}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isAnalyzing && (
            <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span className="text-sm">AI is analyzing client data...</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}