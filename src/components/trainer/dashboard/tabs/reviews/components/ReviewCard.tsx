
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Star, MoreHorizontal, AlertCircle, Eye, EyeOff, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { TrainerReview } from "../types";

interface ReviewCardProps {
  review: TrainerReview;
  onRequestModification: (reviewId: string) => void;
  onHideReview: (reviewId: string) => void;
  onUnhideReview: (reviewId: string) => void;
}

export function ReviewCard({ 
  review, 
  onRequestModification, 
  onHideReview, 
  onUnhideReview 
}: ReviewCardProps) {
  const getStatusBadge = (status: TrainerReview['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Attiva</Badge>;
      case 'pending_modification':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Modifica Richiesta</Badge>;
      case 'hidden':
        return <Badge variant="outline" className="bg-gray-100 text-gray-600">Nascosta</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className={`transition-all ${review.status === 'hidden' ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={review.clientAvatar} alt={review.clientName} />
              <AvatarFallback>{review.clientName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{review.clientName}</h3>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? "text-amber-500 fill-amber-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {format(review.createdAt, "dd MMM yyyy", { locale: it })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(review.status)}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {review.status === 'active' && (
                  <>
                    <DropdownMenuItem onClick={() => onRequestModification(review.id)}>
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Richiedi Modifica
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onHideReview(review.id)}>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Nascondi
                    </DropdownMenuItem>
                  </>
                )}
                {review.status === 'hidden' && (
                  <DropdownMenuItem onClick={() => onUnhideReview(review.id)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Mostra
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Rispondi
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
        
        {review.modificationRequest && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Richiesta di Modifica</span>
              <Badge variant="outline" className="text-xs">
                {review.modificationRequest.status === 'pending' ? 'In Attesa' : 
                 review.modificationRequest.status === 'approved' ? 'Approvata' : 'Rifiutata'}
              </Badge>
            </div>
            <p className="text-xs text-yellow-700">{review.modificationRequest.reason}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Richiesta il {format(review.modificationRequest.requestedAt, "dd MMM yyyy", { locale: it })}
            </p>
          </div>
        )}
        
        <div className="flex justify-between text-xs text-muted-foreground mt-3 pt-3 border-t">
          <span>Ultima sessione: {format(review.sessionDate, "dd MMM yyyy", { locale: it })}</span>
          <span>Aggiornata: {format(review.updatedAt, "dd MMM yyyy", { locale: it })}</span>
        </div>
      </CardContent>
    </Card>
  );
}
