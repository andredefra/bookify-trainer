import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTrainerShifts, TrainerAvailability } from '@/hooks/gym/useTrainerShifts';
import { useGymTrainersData } from '@/hooks/gym/useGymTrainersData';
import { toast } from 'sonner';
import { Clock, Save } from 'lucide-react';

const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday' },
  { value: 1, label: 'Monday' },
  { value: 2, label: 'Tuesday' },
  { value: 3, label: 'Wednesday' },
  { value: 4, label: 'Thursday' },
  { value: 5, label: 'Friday' },
  { value: 6, label: 'Saturday' }
];

export function TrainerAvailabilityManager() {
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [availabilityData, setAvailabilityData] = useState<Partial<TrainerAvailability>[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { availability, updateAvailability, loading } = useTrainerShifts();
  const { trainers } = useGymTrainersData();

  // Initialize availability data when trainer is selected
  useEffect(() => {
    if (selectedTrainer) {
      const trainerAvailability = availability.filter(a => a.trainer_id === selectedTrainer);
      
      if (trainerAvailability.length > 0) {
        setAvailabilityData(trainerAvailability);
      } else {
        // Initialize with default availability for all days
        setAvailabilityData(
          DAYS_OF_WEEK.map(day => ({
            trainer_id: selectedTrainer,
            gym_id: '11111111-1111-1111-1111-111111111111',
            day_of_week: day.value,
            start_time: '09:00:00',
            end_time: '17:00:00',
            is_active: day.value >= 1 && day.value <= 5 // Default to weekdays only
          }))
        );
      }
    }
  }, [selectedTrainer, availability]);

  const updateAvailabilityForDay = (dayOfWeek: number, field: keyof TrainerAvailability, value: any) => {
    setAvailabilityData(prev => 
      prev.map(item => 
        item.day_of_week === dayOfWeek 
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const handleSave = async () => {
    if (!selectedTrainer) {
      toast.error('Please select a trainer');
      return;
    }

    const validData = availabilityData.filter(item => item.is_active);
    
    if (validData.length === 0) {
      toast.error('Please set at least one day as available');
      return;
    }

    setIsLoading(true);

    try {
      await updateAvailability(
        selectedTrainer, 
        validData as Omit<TrainerAvailability, 'id' | 'created_at' | 'updated_at'>[]
      );
      toast.success('Availability updated successfully');
    } catch (error) {
      console.error('Error updating availability:', error);
      toast.error('Failed to update availability');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Trainer Availability Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="trainer" className="text-sm sm:text-base">Select Trainer</Label>
          <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
            <SelectTrigger className="min-h-[44px]">
              <SelectValue placeholder="Choose a trainer to manage availability" />
            </SelectTrigger>
            <SelectContent>
              {trainers.map((trainer) => (
                <SelectItem key={trainer.id} value={trainer.id} className="min-h-[44px]">
                  {trainer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedTrainer && (
          <div className="space-y-4">
            <h4 className="font-medium">Weekly Availability</h4>
            <div className="space-y-4">
              {DAYS_OF_WEEK.map((day) => {
                const dayAvailability = availabilityData.find(a => a.day_of_week === day.value);
                
                return (
                  <div key={day.value} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 border rounded-lg">
                    <div className="sm:w-24">
                      <span className="font-medium text-sm sm:text-base">{day.label}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={dayAvailability?.is_active || false}
                        onCheckedChange={(checked) => 
                          updateAvailabilityForDay(day.value, 'is_active', checked)
                        }
                      />
                      <Label className="text-sm">Available</Label>
                    </div>

                    {dayAvailability?.is_active && (
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm min-w-[45px]">From:</Label>
                          <Input
                            type="time"
                            value={dayAvailability.start_time?.slice(0, 5) || '09:00'}
                            onChange={(e) => 
                              updateAvailabilityForDay(day.value, 'start_time', e.target.value + ':00')
                            }
                            className="w-full sm:w-32 min-h-[44px]"
                          />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Label className="text-sm min-w-[25px]">To:</Label>
                          <Input
                            type="time"
                            value={dayAvailability.end_time?.slice(0, 5) || '17:00'}
                            onChange={(e) => 
                              updateAvailabilityForDay(day.value, 'end_time', e.target.value + ':00')
                            }
                            className="w-full sm:w-32 min-h-[44px]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleSave} 
                disabled={isLoading}
                className="w-full sm:w-auto min-h-[44px]"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Availability'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}