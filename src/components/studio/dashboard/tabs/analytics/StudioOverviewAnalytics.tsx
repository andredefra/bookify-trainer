import { EnhancedKPICards } from './charts/EnhancedKPICards';
import { RevenueBySourceChart } from './charts/RevenueBySourceChart';
import { MonthlySourceRevenueChart } from './charts/MonthlySourceRevenueChart';
import { CommissionBreakdownChart } from './charts/CommissionBreakdownChart';
import { 
  kpiData, 
  revenueBySourceData, 
  monthlySourceRevenueData,
  commissionSummary 
} from './data/studioRevenueData';

export const StudioOverviewAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Enhanced KPI Cards */}
      <EnhancedKPICards data={kpiData} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueBySourceChart data={revenueBySourceData} />
        <CommissionBreakdownChart data={commissionSummary} />
      </div>

      {/* Monthly Trend */}
      <MonthlySourceRevenueChart data={monthlySourceRevenueData} />
    </div>
  );
};
