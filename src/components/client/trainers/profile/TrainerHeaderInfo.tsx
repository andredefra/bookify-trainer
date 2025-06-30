
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, DollarSign, CheckCircle, MessageSquare, Calendar } from "lucide-react";
import { TrainerData } from "../data/trainerData";

interface TrainerHeaderInfoProps {
  trainer: TrainerData;
  averageRating: number;
  onBookSession: (trainerName: string) => void;
  onSendMessage: (trainerName: string) => void;
}

export function TrainerHeaderInfo({ 
  trainer, 
  averageRating, 
  onBookSession, 
  onSendMessage 
}: TrainerHeaderInfoProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{trainer.name}</h1>
          <div className="flex gap-1">
            {trainer.highlights.map((highlight) => (
              <Badge key={highlight} variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                {highlight}
              </Badge>
            ))}
          </div>
        </div>
        
        <h2 className="text-xl text-gray-600 mb-4">{trainer.title}</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{trainer.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{trainer.experience}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm">{averageRating.toFixed(1)} ({trainer.reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-2 text-gray-900 font-semibold">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm">${trainer.hourlyRate}/hour</span>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col gap-3 lg:min-w-[200px]">
        <Button size="lg" onClick={() => onBookSession(trainer.name)} className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="h-4 w-4 mr-2" />
          Book Session
        </Button>
        <Button variant="outline" size="lg" onClick={() => onSendMessage(trainer.name)}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Send Message
        </Button>
      </div>
    </div>
  );
}
