import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, TrendingUp, Calendar, DollarSign, Users } from "lucide-react";

interface Trainer {
  id: string;
  name: string;
}

interface StudioProgramSalesContentProps {
  trainers: Trainer[];
}

// Mock sales data
const mockSalesData = [
  {
    id: "s1",
    date: "2024-03-15",
    clientName: "Sarah Johnson",
    programName: "12-Week Transformation",
    trainerName: "Marco Rossi",
    trainerId: "1",
    price: 299,
    paymentStatus: "completed",
    paymentMethod: "card",
  },
  {
    id: "s2",
    date: "2024-03-12",
    clientName: "Michael Brown",
    programName: "Beginner Strength",
    trainerName: "Laura Bianchi",
    trainerId: "2",
    price: 199,
    paymentStatus: "completed",
    paymentMethod: "cash",
  },
  {
    id: "s3",
    date: "2024-03-10",
    clientName: "Emma Wilson",
    programName: "HIIT Intensive",
    trainerName: "Giuseppe Verde",
    trainerId: "3",
    price: 149,
    paymentStatus: "pending",
    paymentMethod: "card",
  },
  {
    id: "s4",
    date: "2024-03-08",
    clientName: "Sofia Martinez",
    programName: "12-Week Transformation",
    trainerName: "Marco Rossi",
    trainerId: "1",
    price: 299,
    paymentStatus: "completed",
    paymentMethod: "card",
  },
  {
    id: "s5",
    date: "2024-03-05",
    clientName: "Alex Turner",
    programName: "Yoga & Flexibility",
    trainerName: "Laura Bianchi",
    trainerId: "2",
    price: 129,
    paymentStatus: "completed",
    paymentMethod: "card",
  },
];

const formatCurrency = (amount: number) => `€${amount.toFixed(2)}`;

export function StudioProgramSalesContent({ trainers }: StudioProgramSalesContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [trainerFilter, setTrainerFilter] = useState<string>("all");

  const filteredSales = mockSalesData.filter((sale) => {
    const matchesSearch =
      sale.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.programName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrainer = trainerFilter === "all" || sale.trainerId === trainerFilter;
    return matchesSearch && matchesTrainer;
  });

  // Calculate KPIs
  const totalRevenue = mockSalesData.reduce((sum, s) => s.paymentStatus === "completed" ? sum + s.price : sum, 0);
  const pendingRevenue = mockSalesData.reduce((sum, s) => s.paymentStatus === "pending" ? sum + s.price : sum, 0);
  const totalSales = mockSalesData.filter((s) => s.paymentStatus === "completed").length;

  // Revenue by trainer
  const revenueByTrainer = trainers.map((trainer) => {
    const trainerSales = mockSalesData.filter(
      (s) => s.trainerId === trainer.id && s.paymentStatus === "completed"
    );
    return {
      ...trainer,
      revenue: trainerSales.reduce((sum, s) => sum + s.price, 0),
      salesCount: trainerSales.length,
    };
  });

  const kpiCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Pending Payments",
      value: formatCurrency(pendingRevenue),
      icon: TrendingUp,
      color: "text-orange-600",
    },
    {
      title: "Total Sales",
      value: totalSales.toString(),
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Active Trainers",
      value: trainers.length.toString(),
      icon: Users,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{kpi.title}</span>
                  <Icon className={`h-4 w-4 ${kpi.color}`} />
                </div>
                <div className="text-2xl font-bold">{kpi.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue by Trainer */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Revenue by Trainer</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {revenueByTrainer.map((trainer) => (
              <div
                key={trainer.id}
                className="p-4 bg-muted/50 rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{trainer.name}</p>
                  <p className="text-sm text-muted-foreground">{trainer.salesCount} sales</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(trainer.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sales History */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-semibold">Sales History</h3>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search client or program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={trainerFilter} onValueChange={setTrainerFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Trainer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Trainers</SelectItem>
                  {trainers.map((trainer) => (
                    <SelectItem key={trainer.id} value={trainer.id}>
                      {trainer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Trainer</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="text-muted-foreground">{sale.date}</TableCell>
                    <TableCell className="font-medium">{sale.clientName}</TableCell>
                    <TableCell>{sale.programName}</TableCell>
                    <TableCell>{sale.trainerName}</TableCell>
                    <TableCell>{formatCurrency(sale.price)}</TableCell>
                    <TableCell>
                      {sale.paymentStatus === "completed" ? (
                        <Badge className="bg-green-100 text-green-800">Paid</Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSales.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No sales found matching your filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
