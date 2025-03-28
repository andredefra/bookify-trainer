
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

interface Payment {
  id: number;
  trainer: string;
  amount: number;
  date: string;
  type: string;
}

interface PaymentsTableProps {
  payments: Payment[];
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Trainer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.trainer}</TableCell>
                <TableCell>{payment.type}</TableCell>
                <TableCell>€{payment.amount}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Receipt</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline">
          <CreditCard className="mr-2 h-4 w-4" />
          Manage Payment Methods
        </Button>
      </div>
    </div>
  );
}
