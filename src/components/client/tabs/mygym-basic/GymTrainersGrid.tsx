import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Star, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface Trainer {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  certifications: string[];
}

const MOCK_TRAINERS: Record<string, Trainer[]> = {
  fitlife: [
    { id: 1, name: "Sarah Johnson", specialty: "Personal Trainer", rating: 4.9, reviews: 124, image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400", certifications: ["NASM CPT", "Nutrition Specialist"] },
    { id: 2, name: "Marco Rossi", specialty: "Strength & Conditioning", rating: 4.8, reviews: 87, image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400", certifications: ["CSCS", "NSCA"] },
    { id: 3, name: "Giulia Bianchi", specialty: "Yoga & Mobility", rating: 4.9, reviews: 156, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400", certifications: ["RYT 500", "FMS L2"] },
  ],
  powerhouse: [
    { id: 4, name: "Luca Ferrari", specialty: "Powerlifting Coach", rating: 4.9, reviews: 92, image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400", certifications: ["USAPL Coach"] },
    { id: 5, name: "Anna Conti", specialty: "Functional Training", rating: 4.7, reviews: 64, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400", certifications: ["CrossFit L2"] },
  ],
  urbanfit: [
    { id: 6, name: "Davide Romano", specialty: "HIIT & Cardio", rating: 4.8, reviews: 110, image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400", certifications: ["ACE CPT"] },
    { id: 7, name: "Elisa Marini", specialty: "Pilates & Postura", rating: 4.9, reviews: 78, image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400", certifications: ["STOTT Pilates"] },
  ],
};

interface GymTrainersGridProps {
  gymId: string;
}

export function GymTrainersGrid({ gymId }: GymTrainersGridProps) {
  const trainers = MOCK_TRAINERS[gymId] || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" /> Allenatori della palestra
        </CardTitle>
      </CardHeader>
      <CardContent>
        {trainers.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">Nessun allenatore disponibile.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trainers.map(t => (
              <div key={t.id} className="border rounded-lg p-4 space-y-3 hover:shadow-sm transition">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={t.image} alt={t.name} className="object-cover" />
                    <AvatarFallback>{t.name.split(' ').map(p => p[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{t.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{t.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-medium">{t.rating}</span>
                  <span className="text-muted-foreground">({t.reviews})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {t.certifications.map(c => (
                    <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => toast.info("Profilo trainer (demo)")}>
                    Vedi profilo
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => toast.info("Messaggio inviato (demo)")}>
                    <MessageSquare className="h-3 w-3 mr-1" /> Messaggia
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
