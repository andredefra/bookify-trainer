
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTransactions } from "../context/TransactionsContext";

export function TransactionsSearch() {
  const { searchQuery, setSearchQuery } = useTransactions();
  
  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
