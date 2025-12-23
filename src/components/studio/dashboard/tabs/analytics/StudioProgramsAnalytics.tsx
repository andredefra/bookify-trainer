import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgramSalesChart } from './charts/ProgramSalesChart';
import { programSalesData, sourceColors, sourceLabels } from './data/studioRevenueData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Package } from 'lucide-react';

export const StudioProgramsAnalytics = () => {
  // Aggregate programs for table
  const programSummary = programSalesData.reduce((acc, item) => {
    const existing = acc.find(a => a.programName === item.programName);
    if (existing) {
      existing.totalUnits += item.unitsSold;
      existing.totalRevenue += item.revenue;
      existing.totalCommissions += item.commissions;
      existing.sources.push({ source: item.source, units: item.unitsSold, revenue: item.revenue });
    } else {
      acc.push({
        programName: item.programName,
        totalUnits: item.unitsSold,
        totalRevenue: item.revenue,
        totalCommissions: item.commissions,
        sources: [{ source: item.source, units: item.unitsSold, revenue: item.revenue }]
      });
    }
    return acc;
  }, [] as any[]);

  // Sort by revenue
  programSummary.sort((a, b) => b.totalRevenue - a.totalRevenue);

  // Calculate totals
  const totals = programSummary.reduce((acc, p) => ({
    units: acc.units + p.totalUnits,
    revenue: acc.revenue + p.totalRevenue,
    commissions: acc.commissions + p.totalCommissions
  }), { units: 0, revenue: 0, commissions: 0 });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Programs Sold</p>
                <p className="text-2xl font-bold">{totals.units}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Program Revenue</p>
                <p className="text-2xl font-bold">€{totals.revenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Net Revenue</p>
                <p className="text-2xl font-bold">€{(totals.revenue - totals.commissions).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <ProgramSalesChart data={programSalesData} />

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Program Sales Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program</TableHead>
                <TableHead className="text-center">Units Sold</TableHead>
                <TableHead className="text-center">Source</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Commissions</TableHead>
                <TableHead className="text-right">Net</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programSummary.map((program, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{program.programName}</TableCell>
                  <TableCell className="text-center">{program.totalUnits}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-1 justify-center flex-wrap">
                      {program.sources.map((s: any, i: number) => (
                        <Badge 
                          key={i} 
                          variant="outline" 
                          className="text-xs"
                          style={{ 
                            borderColor: sourceColors[s.source as keyof typeof sourceColors],
                            color: sourceColors[s.source as keyof typeof sourceColors]
                          }}
                        >
                          {s.source === 'direct' ? 'D' : s.source === 'gym' ? 'G' : 'S'}: {s.units}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">€{program.totalRevenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    -€{program.totalCommissions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    €{(program.totalRevenue - program.totalCommissions).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell>Total</TableCell>
                <TableCell className="text-center">{totals.units}</TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right">€{totals.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-right">-€{totals.commissions.toLocaleString()}</TableCell>
                <TableCell className="text-right">€{(totals.revenue - totals.commissions).toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
