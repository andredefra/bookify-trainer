import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { revenueBySourceData, revenueByProductType, sourceColors, sourceLabels, commissionSummary } from './data/studioRevenueData';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp, Building2, Store, Network } from 'lucide-react';

export const StudioRevenueDetails = () => {
  // Colors for product types
  const productColors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            €{data.value.toLocaleString()} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'direct': return <DollarSign className="h-4 w-4" />;
      case 'gym': return <Building2 className="h-4 w-4" />;
      case 'studio': return <Network className="h-4 w-4" />;
      default: return <Store className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Product Type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Fatturato per Tipo Prodotto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByProductType}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {revenueByProductType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={productColors[index % productColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-3">
              {revenueByProductType.map((item, index) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: productColors[index] }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">€{item.value.toLocaleString()}</span>
                  </div>
                  <Progress value={item.percentage} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue per Source Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Fatturato per Fonte (Dettaglio)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {revenueBySourceData.map((source, index) => (
              <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="p-1.5 rounded-lg"
                      style={{ backgroundColor: `${sourceColors[source.source]}20` }}
                    >
                      {getSourceIcon(source.source)}
                    </div>
                    <div>
                      <p className="font-medium">{source.sourceName}</p>
                      <p className="text-xs text-muted-foreground">{sourceLabels[source.source]}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">€{source.netRevenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Netto</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-center p-2 bg-background rounded">
                    <p className="text-muted-foreground">Programmi</p>
                    <p className="font-medium">€{source.programs.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-2 bg-background rounded">
                    <p className="text-muted-foreground">Sessioni</p>
                    <p className="font-medium">€{source.sessions.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-2 bg-background rounded">
                    <p className="text-muted-foreground">Pacchetti</p>
                    <p className="font-medium">€{source.packages.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-2 bg-background rounded">
                    <p className="text-muted-foreground">Servizi</p>
                    <p className="font-medium">€{source.services.toLocaleString()}</p>
                  </div>
                </div>
                {source.commissions > 0 && (
                  <div className="flex justify-between text-xs pt-2 border-t border-border">
                    <span className="text-muted-foreground">Commissioni pagate:</span>
                    <span className="text-red-500">-€{source.commissions.toLocaleString()}</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Full Revenue Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Riepilogo Completo Fatturato</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fonte</TableHead>
                <TableHead className="text-right">Programmi</TableHead>
                <TableHead className="text-right">Sessioni</TableHead>
                <TableHead className="text-right">Pacchetti</TableHead>
                <TableHead className="text-right">Servizi</TableHead>
                <TableHead className="text-right">Lordo</TableHead>
                <TableHead className="text-right">Commissioni</TableHead>
                <TableHead className="text-right">Netto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueBySourceData.map((source, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: sourceColors[source.source] }}
                      />
                      {source.sourceName}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">€{source.programs.toLocaleString()}</TableCell>
                  <TableCell className="text-right">€{source.sessions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">€{source.packages.toLocaleString()}</TableCell>
                  <TableCell className="text-right">€{source.services.toLocaleString()}</TableCell>
                  <TableCell className="text-right">€{source.grossRevenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-red-500">
                    {source.commissions > 0 ? `-€${source.commissions.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell className="text-right font-medium">€{source.netRevenue.toLocaleString()}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50 font-bold">
                <TableCell>Totale</TableCell>
                <TableCell className="text-right">
                  €{revenueBySourceData.reduce((s, r) => s + r.programs, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  €{revenueBySourceData.reduce((s, r) => s + r.sessions, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  €{revenueBySourceData.reduce((s, r) => s + r.packages, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  €{revenueBySourceData.reduce((s, r) => s + r.services, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  €{commissionSummary.totalGrossRevenue.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-red-500">
                  -€{revenueBySourceData.reduce((s, r) => s + r.commissions, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  €{commissionSummary.netRevenue.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
