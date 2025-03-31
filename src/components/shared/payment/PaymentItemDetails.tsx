
import { Euro } from "lucide-react";

interface PaymentItem {
  id: string | number;
  name: string;
  price: number;
  description?: string;
  date?: string;
  time?: string;
  trainer?: string;
  attendees?: number;
  maxAttendees?: number;
}

interface PaymentItemDetailsProps {
  item: PaymentItem;
}

export function PaymentItemDetails({ item }: PaymentItemDetailsProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm">{item.name}</h3>
      {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
      {item.date && <p className="text-sm">Date: {item.date} {item.time && `at ${item.time}`}</p>}
      {item.trainer && <p className="text-sm">Trainer: {item.trainer}</p>}
      {item.attendees !== undefined && item.maxAttendees !== undefined && (
        <p className="text-sm">{item.attendees}/{item.maxAttendees} participants</p>
      )}
      <div className="text-lg font-bold flex items-center mt-1">
        <Euro className="h-4 w-4 mr-1" />
        {item.price.toFixed(2)}
      </div>
    </div>
  );
}
