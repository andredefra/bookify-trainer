
import { Badge } from "@/components/ui/badge";
import { Coins, CreditCard } from "lucide-react";

interface PaymentMethodBadgeProps {
  method: 'cash' | 'card';
}

export function PaymentMethodBadge({ method }: PaymentMethodBadgeProps) {
  if (method === 'cash') {
    return (
      <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20" variant="outline">
        <Coins className="mr-1 h-3 w-3" />
        Cash
      </Badge>
    );
  }
  
  return (
    <Badge className="bg-slate-500/10 text-slate-600 hover:bg-slate-500/20" variant="outline">
      <CreditCard className="mr-1 h-3 w-3" />
      Card
    </Badge>
  );
}
