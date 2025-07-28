import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TrainingProgramData {
  programId: string;
  programTitle: string;
  durationWeeks: number;
  currentWeek: number;
  completedSessions: number;
  totalSessions: number;
  goals: string[];
  difficulty: string;
  startDate: string;
}

interface WorkoutLog {
  id: string;
  date: string;
  name: string;
  duration: number;
  exercises: Array<{
    name: string;
    sets: number;
    reps: string;
    weight?: number;
    completed: boolean;
  }>;
  notes?: string;
}

interface FitnessTrackerData {
  heartRateAverage?: number;
  caloriesBurned?: number;
  steps?: number;
  sleepQuality?: number;
  restingHeartRate?: number;
  activeMinutes?: number;
}

interface UserProfile {
  age: number;
  weight: number;
  height: number;
  fitnessLevel: string;
  primaryGoals: string[];
}

interface ProgramAnalysis {
  overallProgress: {
    completionRate: number;
    adherenceScore: number;
    progressTrend: 'improving' | 'stable' | 'declining';
    weeklyConsistency: number;
  };
  performanceMetrics: {
    strengthProgression: string;
    volumeProgression: string;
    intensityTrend: string;
    recoveryIndicators: string;
  };
  goalAlignment: {
    goalsOnTrack: string[];
    areasNeedingFocus: string[];
    adjustmentSuggestions: string[];
  };
  healthIntegration: {
    heartRateZoneAnalysis?: string;
    recoveryAssessment?: string;
    sleepImpact?: string;
    calorieBalance?: string;
  };
  recommendations: {
    weeklyAdjustments: string[];
    exerciseModifications: string[];
    recoveryOptimization: string[];
    nutritionTips: string[];
  };
  insights: {
    strengthAreas: string[];
    improvementOpportunities: string[];
    motivationalNotes: string;
    nextMilestone: string;
  };
}

serve(async (req) => {
  console.log('Training program analysis function invoked');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      programData,
      workoutLogs,
      fitnessData,
      userProfile
    }: {
      programData: TrainingProgramData;
      workoutLogs: WorkoutLog[];
      fitnessData?: FitnessTrackerData;
      userProfile?: UserProfile;
    } = await req.json();

    console.log('Received program analysis request:', {
      programId: programData.programId,
      totalLogs: workoutLogs.length,
      hasFitnessData: !!fitnessData,
      hasUserProfile: !!userProfile
    });

    // Prepare data for AI analysis
    const workoutSummary = workoutLogs.map(log => ({
      date: log.date,
      duration: log.duration,
      exerciseCount: log.exercises.length,
      completionRate: log.exercises.filter(ex => ex.completed).length / log.exercises.length,
      totalVolume: log.exercises.reduce((sum, ex) => {
        const weight = ex.weight || 0;
        const reps = parseInt(ex.reps.split('-')[0]) || 0;
        return sum + (weight * reps * ex.sets);
      }, 0)
    }));

    const systemPrompt = `You are an expert fitness coach and data analyst specializing in training program evaluation. 
    You analyze training programs by examining workout completion patterns, performance progression, and integration with health data to provide comprehensive insights and recommendations.

    Your analysis should be:
    - Data-driven and objective
    - Personalized to the user's goals and fitness level
    - Actionable with specific recommendations
    - Motivating and encouraging
    - Professional but accessible

    Always provide insights in English and structure your response as a valid JSON object matching the ProgramAnalysis interface.`;

    const userPrompt = `
    Analyze this training program data:

    PROGRAM OVERVIEW:
    - Title: ${programData.programTitle}
    - Duration: ${programData.durationWeeks} weeks
    - Current Week: ${programData.currentWeek}
    - Progress: ${programData.completedSessions}/${programData.totalSessions} sessions (${Math.round((programData.completedSessions / programData.totalSessions) * 100)}%)
    - Goals: ${programData.goals.join(', ')}
    - Difficulty: ${programData.difficulty}
    - Started: ${programData.startDate}

    WORKOUT LOGS (${workoutLogs.length} sessions):
    ${workoutSummary.map((workout, index) => `
    Session ${index + 1}:
    - Date: ${workout.date}
    - Duration: ${workout.duration} minutes
    - Exercises: ${workout.exerciseCount}
    - Completion Rate: ${Math.round(workout.completionRate * 100)}%
    - Estimated Volume: ${workout.totalVolume} kg
    `).join('')}

    ${fitnessData ? `
    FITNESS TRACKER DATA:
    - Average Heart Rate: ${fitnessData.heartRateAverage || 'N/A'} bpm
    - Calories Burned: ${fitnessData.caloriesBurned || 'N/A'}
    - Daily Steps: ${fitnessData.steps || 'N/A'}
    - Sleep Quality: ${fitnessData.sleepQuality || 'N/A'}/10
    - Resting Heart Rate: ${fitnessData.restingHeartRate || 'N/A'} bpm
    - Active Minutes: ${fitnessData.activeMinutes || 'N/A'}
    ` : 'No fitness tracker data available'}

    ${userProfile ? `
    USER PROFILE:
    - Age: ${userProfile.age}
    - Weight: ${userProfile.weight} kg
    - Height: ${userProfile.height} cm
    - Fitness Level: ${userProfile.fitnessLevel}
    - Primary Goals: ${userProfile.primaryGoals.join(', ')}
    ` : 'No user profile data available'}

    Provide a comprehensive analysis of this training program including progress assessment, performance trends, goal alignment, health integration insights, and actionable recommendations for optimization.
    `;

    console.log('Sending request to OpenAI for program analysis');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI Response received');

    let analysisContent = data.choices[0].message.content;
    
    // Clean up the response to ensure it's valid JSON
    if (analysisContent.startsWith('```json')) {
      analysisContent = analysisContent.slice(7, -3);
    } else if (analysisContent.startsWith('```')) {
      analysisContent = analysisContent.slice(3, -3);
    }

    let analysis: ProgramAnalysis;
    try {
      analysis = JSON.parse(analysisContent);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      throw new Error('Invalid response format from AI analysis');
    }

    console.log('Program Analysis Response:', JSON.stringify(analysis, null, 2));

    return new Response(JSON.stringify({
      success: true,
      analysis
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-training-program function:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});