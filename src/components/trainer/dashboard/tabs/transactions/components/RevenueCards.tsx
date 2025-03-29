
import { Euro } from "lucide-react";
import { useTransactions } from "../context/TransactionsContext";

export function RevenueCards() {
  const { transactions } = useTransactions();
  
  // Calculate totals
  const totalRevenue = transactions.reduce((sum, t) => 
    t.status === 'paid' ? sum + t.amount : sum, 0
  ).toFixed(2);
  
  const pendingRevenue = transactions.reduce((sum, t) => 
    t.status === 'pending' ? sum + t.amount : sum, 0
  ).toFixed(2);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-green-50 p-3 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="bg-green-100 p-1.5 rounded-full">
            <Euro className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <div className="text-xs font-medium text-green-600">Total Revenue</div>
            <div className="text-xl font-bold">€{totalRevenue}</div>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-3 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="bg-yellow-100 p-1.5 rounded-full">
            <Euro className="h-4 w-4 text-yellow-600" />
          </div>
          <div>
            <div className="text-xs font-medium text-yellow-600">Pending Payments</div>
            <div className="text-xl font-bold">€{pendingRevenue}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
