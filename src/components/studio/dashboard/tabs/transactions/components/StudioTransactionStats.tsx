import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Clock, FileText, TrendingUp, Users } from "lucide-react";
import { StudioTransaction, TrainerStats } from "../data/studioTransactionsData";

interface StudioTransactionStatsProps {
  transactions: StudioTransaction[];
  trainerStats: TrainerStats[];
  selectedTrainer: string;
}

export function StudioTransactionStats({ 
  transactions, 
  trainerStats,
  selectedTrainer 
}: StudioTransactionStatsProps) {
  const filteredTransactions = selectedTrainer === "all" 
    ? transactions 
    : transactions.filter(t => t.trainerId === selectedTrainer);

  const totalRevenue = filteredTransactions
    .filter(t => t.status === "paid")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const pendingAmount = filteredTransactions
    .filter(t => t.status === "pending" || t.status === "overdue")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const pendingInvoices = filteredTransactions.filter(t => !t.invoiceSent).length;
  
  const totalCommissions = selectedTrainer === "all"
    ? trainerStats.reduce((sum, t) => sum + t.commission, 0)
    : trainerStats.find(t => t.trainerId === selectedTrainer)?.commission || 0;

  const activeTrainers = selectedTrainer === "all" 
    ? trainerStats.length 
    : 1;

  const stats = [
    {
      label: "Total Revenue",
      value: `€${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      label: "Pending",
      value: `€${pendingAmount.toLocaleString()}`,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      label: "Missing Invoices",
      value: pendingInvoices.toString(),
      icon: FileText,
      color: "text-rose-600",
      bgColor: "bg-rose-50"
    },
    {
      label: "Commissions",
      value: `€${totalCommissions.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      label: "Active Trainers",
      value: activeTrainers.toString(),
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
