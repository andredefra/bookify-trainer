
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Play, Image, ExternalLink, BarChart3 } from 'lucide-react';
import { ExerciseData } from '@/data/exercises/exerciseDatabase';

interface ExerciseLibraryStatusProps {
  exercises: ExerciseData[];
}

export function ExerciseLibraryStatus({ exercises }: ExerciseLibraryStatusProps) {
  // Calculate statistics
  const totalExercises = exercises.length;
  const exercisesWithVideo = exercises.filter(ex => ex.videoUrl).length;
  const exercisesWithImages = exercises.filter(ex => ex.equipmentImages && Object.keys(ex.equipmentImages).length > 0).length;
  const exercisesWithAlternatives = exercises.filter(ex => ex.alternativeExercises && ex.alternativeExercises.length > 0).length;
  
  const videoPercentage = Math.round((exercisesWithVideo / totalExercises) * 100);
  const imagePercentage = Math.round((exercisesWithImages / totalExercises) * 100);
  const alternativePercentage = Math.round((exercisesWithAlternatives / totalExercises) * 100);

  const stats = [
    {
      icon: Play,
      label: 'Video Tutorials',
      count: exercisesWithVideo,
      percentage: videoPercentage,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: Image,
      label: 'Equipment Images',
      count: exercisesWithImages,
      percentage: imagePercentage,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      icon: ExternalLink,
      label: 'Alternative Exercises',
      count: exercisesWithAlternatives,
      percentage: alternativePercentage,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Exercise Library Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {stats.map((stat) => (
            <div key={stat.label} className={`p-4 rounded-lg border ${stat.bgColor} ${stat.borderColor}`}>
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{stat.count}</span>
                <Badge variant="secondary" className="text-xs">
                  {stat.percentage}%
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${stat.color === 'text-blue-600' ? 'bg-blue-600' : stat.color === 'text-purple-600' ? 'bg-purple-600' : 'bg-orange-600'}`}
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span>Library enhanced with {totalExercises} exercises, complete with media and alternatives</span>
        </div>
      </CardContent>
    </Card>
  );
}
