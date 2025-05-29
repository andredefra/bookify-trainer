
import { TransactionType } from "../../transactions/types/transactionTypes";

export interface EnhancedRevenueDataPoint {
  name: string;
  clientRevenue: number;
  occasionalRevenue: number;
  total: number;
}

export interface RevenueBreakdown {
  clientsRevenue: number;
  occasionalParticipantsRevenue: number;
  totalRevenue: number;
  clientConversionRate: number;
  averageClientValue: number;
  averageOccasionalValue: number;
}

export interface ClientTypeMetrics {
  recurringClients: number;
  occasionalParticipants: number;
  conversionRate: number;
  retentionRate: number;
}

// Enhanced mock data that separates client types
export const enhancedMonthlyRevenue: EnhancedRevenueDataPoint[] = [
  { name: 'Jan', clientRevenue: 920, occasionalRevenue: 280, total: 1200 },
  { name: 'Feb', clientRevenue: 1050, occasionalRevenue: 350, total: 1400 },
  { name: 'Mar', clientRevenue: 1125, occasionalRevenue: 375, total: 1500 },
  { name: 'Apr', clientRevenue: 1350, occasionalRevenue: 450, total: 1800 },
  { name: 'May', clientRevenue: 1500, occasionalRevenue: 500, total: 2000 },
  { name: 'Jun', clientRevenue: 1275, occasionalRevenue: 425, total: 1700 },
];

export const clientTypeBreakdown = {
  name: 'Revenue by Client Type',
  data: [
    { name: 'Recurring Clients', value: 75, color: '#0088FE' },
    { name: 'Occasional Participants', value: 25, color: '#00C49F' }
  ]
};

// Function to calculate revenue from actual transactions
export function calculateRevenueFromTransactions(
  transactions: TransactionType[],
  clientsList: string[]
): RevenueBreakdown {
  const paidTransactions = transactions.filter(t => t.status === 'paid');
  
  let clientsRevenue = 0;
  let occasionalRevenue = 0;
  let clientTransactions = 0;
  let occasionalTransactions = 0;
  
  paidTransactions.forEach(transaction => {
    if (clientsList.includes(transaction.client)) {
      clientsRevenue += transaction.amount;
      clientTransactions++;
    } else {
      occasionalRevenue += transaction.amount;
      occasionalTransactions++;
    }
  });
  
  const totalRevenue = clientsRevenue + occasionalRevenue;
  const totalParticipants = new Set(paidTransactions.map(t => t.client)).size;
  const recurringClients = clientsList.length;
  const occasionalParticipants = totalParticipants - recurringClients;
  
  return {
    clientsRevenue,
    occasionalParticipantsRevenue: occasionalRevenue,
    totalRevenue,
    clientConversionRate: occasionalParticipants > 0 ? (recurringClients / (recurringClients + occasionalParticipants)) * 100 : 0,
    averageClientValue: clientTransactions > 0 ? clientsRevenue / clientTransactions : 0,
    averageOccasionalValue: occasionalTransactions > 0 ? occasionalRevenue / occasionalTransactions : 0
  };
}

export const ENHANCED_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
