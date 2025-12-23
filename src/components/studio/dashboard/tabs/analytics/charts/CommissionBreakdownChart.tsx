import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommissionSummary } from '../types';
import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface CommissionBreakdownChartProps {
  data: CommissionSummary;
}

export const CommissionBreakdownChart = ({ data }: CommissionBreakdownChartProps) => {
  const netPercentage = (data.netRevenue / data.totalGrossRevenue) * 100;
  const earnedPercentage = (data.commissionsEarned / data.totalGrossRevenue) * 100;
  const paidPercentage = (data.commissionsPaid / data.totalGrossRevenue) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Commission Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Gross Revenue */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Gross Revenue</span>
            </div>
            <span className="font-semibold text-lg">€{data.totalGrossRevenue.toLocaleString()}</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>

        {/* Commissions Earned */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowDownLeft className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Commissions Earned</span>
              <span className="text-xs text-muted-foreground">(from Gym Partner)</span>
            </div>
            <span className="font-medium text-green-600">+€{data.commissionsEarned.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={earnedPercentage} className="h-2 flex-1" />
            <span className="text-xs text-muted-foreground w-12">{earnedPercentage.toFixed(1)}%</span>
          </div>
        </div>

        {/* Commissions Paid */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4 text-red-500" />
              <span className="text-sm text-muted-foreground">Commissions Paid</span>
              <span className="text-xs text-muted-foreground">(to Studio Network)</span>
            </div>
            <span className="font-medium text-red-600">-€{data.commissionsPaid.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={paidPercentage} className="h-2 flex-1" />
            <span className="text-xs text-muted-foreground w-12">{paidPercentage.toFixed(1)}%</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Net Revenue */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Net Revenue</span>
            <span className="font-bold text-xl text-primary">€{data.netRevenue.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={netPercentage} className="h-3 flex-1" />
            <span className="text-sm font-medium text-primary w-16">{netPercentage.toFixed(1)}%</span>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Commission margin: </span>
            €{(data.commissionsEarned - data.commissionsPaid).toLocaleString()}
            <span className="text-green-600 ml-1">
              (+{(((data.commissionsEarned - data.commissionsPaid) / data.totalGrossRevenue) * 100).toFixed(1)}%)
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Extra earnings from gym partnerships after deducting studio network commissions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
