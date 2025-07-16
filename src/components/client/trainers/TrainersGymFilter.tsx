import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Filter, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface TrainersGymFilterProps {
  isGymFilterActive: boolean;
  onToggleGymFilter: () => void;
  gymName?: string;
  gymTrainersCount?: number;
}

export function TrainersGymFilter({ 
  isGymFilterActive, 
  onToggleGymFilter, 
  gymName = "FitLife Gym",
  gymTrainersCount = 2
}: TrainersGymFilterProps) {
  const [affiliatedTrainersCount, setAffiliatedTrainersCount] = useState(gymTrainersCount);

  useEffect(() => {
    const fetchAffiliatedTrainersCount = async () => {
      try {
        // Count trainers affiliated with demo gym
        const { count, error } = await supabase
          .from('trainer_gym_affiliations')
          .select('*', { count: 'exact', head: true })
          .eq('gym_id', '11111111-1111-1111-1111-111111111111')
          .eq('status', 'approved');

        if (error) throw error;
        setAffiliatedTrainersCount(count || 0);
      } catch (error) {
        console.error('Error fetching affiliated trainers count:', error);
        // Fallback to provided count
        setAffiliatedTrainersCount(gymTrainersCount);
      }
    };

    fetchAffiliatedTrainersCount();
  }, [gymTrainersCount]);
  return (
    <div className="flex items-center gap-3">
      <Button
        variant={isGymFilterActive ? "default" : "outline"}
        size="sm"
        onClick={onToggleGymFilter}
        className="flex items-center gap-2"
      >
        <Building2 className="h-4 w-4" />
        My Gym Trainers
        {isGymFilterActive && (
          <Badge variant="secondary" className="ml-1 bg-white/20 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            {affiliatedTrainersCount}
          </Badge>
        )}
      </Button>
      
      {isGymFilterActive && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-3 w-3" />
          Showing {affiliatedTrainersCount} verified trainers from {gymName}
        </div>
      )}
    </div>
  );
}