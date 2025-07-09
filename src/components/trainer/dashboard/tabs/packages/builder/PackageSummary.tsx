
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Euro, Target, Users, Video, User } from "lucide-react";

interface PackageData {
  title: string;
  objective: string;
  basePrice: number;
  finalPrice: number;
  calculatedDuration: number;
  discount: number;
  sessions: {
    individual: { count: number; pricePerSession: number; };
    group: { count: number; pricePerSession: number; };
    online: { count: number; pricePerSession: number; };
  };
  selectedPrograms: Array<{ title: string; duration: number; price: number; }>;
  additionalServices: Array<{ name: string; price: number; }>;
}

interface PackageSummaryProps {
  data: PackageData;
}

export function PackageSummary({ data }: PackageSummaryProps) {
  const totalSessions = data.sessions.individual.count + data.sessions.group.count + data.sessions.online.count;
  const hasContent = data.title || totalSessions > 0 || data.selectedPrograms.length > 0 || data.additionalServices.length > 0;

  if (!hasContent) {
    return (
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle className="text-base">Package Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            Start by filling in the basic information to see the summary
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="text-base">Package Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Info */}
        {data.title && (
          <div>
            <h4 className="font-medium">{data.title}</h4>
            {data.objective && (
              <div className="flex items-center gap-1 mt-1">
                <Target className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{data.objective}</span>
              </div>
            )}
          </div>
        )}

        {/* Duration and Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{data.calculatedDuration} weeks</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">€{data.finalPrice.toFixed(2)}</div>
            {data.discount > 0 && (
              <div className="text-xs text-muted-foreground line-through">€{data.basePrice.toFixed(2)}</div>
            )}
          </div>
        </div>
        
        {data.discount > 0 && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Discount {data.discount}%
          </Badge>
        )}

        <Separator />

        {/* Sessions */}
        {totalSessions > 0 && (
          <div>
            <h5 className="text-sm font-medium mb-2">Sessions ({totalSessions})</h5>
            <div className="space-y-1">
              {data.sessions.individual.count > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>Individual</span>
                  </div>
                  <span>{data.sessions.individual.count}</span>
                </div>
              )}
              {data.sessions.group.count > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>Group</span>
                  </div>
                  <span>{data.sessions.group.count}</span>
                </div>
              )}
              {data.sessions.online.count > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Video className="h-3 w-3" />
                    <span>Online</span>
                  </div>
                  <span>{data.sessions.online.count}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Programs */}
        {data.selectedPrograms.length > 0 && (
          <div>
            <h5 className="text-sm font-medium mb-2">Programs ({data.selectedPrograms.length})</h5>
            <div className="space-y-1">
              {data.selectedPrograms.map((program, index) => (
                <div key={index} className="text-xs">
                  <div className="font-medium">{program.title}</div>
                  <div className="text-muted-foreground">{program.duration} weeks - €{program.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services */}
        {data.additionalServices.length > 0 && (
          <div>
            <h5 className="text-sm font-medium mb-2">Services ({data.additionalServices.length})</h5>
            <div className="space-y-1">
              {data.additionalServices.map((service, index) => (
                <div key={index} className="flex justify-between text-xs">
                  <span className="flex-1">{service.name}</span>
                  <span>€{service.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Price per week */}
        {data.finalPrice > 0 && data.calculatedDuration > 0 && (
          <div className="pt-2 border-t">
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Price per week:</span>
              <span>€{(data.finalPrice / data.calculatedDuration).toFixed(2)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
