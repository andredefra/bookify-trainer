
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  MessageCircle, 
  FileText, 
  Phone, 
  Calendar, 
  Utensils, 
  Heart,
  Dumbbell,
  Clock,
  Users,
  Target,
  Activity,
  Zap
} from "lucide-react";

const availableIcons = [
  { name: "MessageCircle", icon: MessageCircle, label: "Messaggio" },
  { name: "FileText", icon: FileText, label: "Documento" },
  { name: "Phone", icon: Phone, label: "Telefono" },
  { name: "Calendar", icon: Calendar, label: "Calendario" },
  { name: "Utensils", icon: Utensils, label: "Nutrizione" },
  { name: "Heart", icon: Heart, label: "Benessere" },
  { name: "Dumbbell", icon: Dumbbell, label: "Fitness" },
  { name: "Clock", icon: Clock, label: "Tempo" },
  { name: "Users", icon: Users, label: "Gruppo" },
  { name: "Target", icon: Target, label: "Obiettivo" },
  { name: "Activity", icon: Activity, label: "Attività" },
  { name: "Zap", icon: Zap, label: "Energia" },
];

interface ServiceIconSelectorProps {
  value: string;
  onChange: (icon: string) => void;
}

export function ServiceIconSelector({ value, onChange }: ServiceIconSelectorProps) {
  const selectedIcon = availableIcons.find(icon => icon.name === value) || availableIcons[0];
  const Icon = selectedIcon.icon;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Icon className="h-4 w-4 mr-2" />
          {selectedIcon.label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <div className="grid grid-cols-4 gap-1">
          {availableIcons.map((iconInfo) => {
            const IconComponent = iconInfo.icon;
            return (
              <Button
                key={iconInfo.name}
                variant={value === iconInfo.name ? "default" : "ghost"}
                size="sm"
                className="h-10 w-10 p-0"
                onClick={() => onChange(iconInfo.name)}
              >
                <IconComponent className="h-4 w-4" />
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
