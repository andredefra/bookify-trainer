import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesContact } from "./types";
import {
  format,
  differenceInDays,
  startOfDay,
  startOfWeek,
  startOfMonth,
  startOfQuarter,
  startOfYear,
  isSameDay,
  isSameWeek,
  isSameMonth,
  isSameQuarter,
  isSameYear,
  subDays,
  subWeeks,
  subMonths,
  subQuarters,
  subYears
} from "date-fns";
import { enUS } from "date-fns/locale";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, ArrowUpRight, Users } from "lucide-react";

interface SalesTimeAnalyticsProps {
  contacts: SalesContact[];
}

type TimeFrame = "day" | "week" | "month" | "quarter" | "year" | "custom";

export function SalesTimeAnalytics({ contacts }: SalesTimeAnalyticsProps) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("day");
  const [customPeriod, setCustomPeriod] = useState(7); // Default 7 days

  const analytics = useMemo(() => {
    const now = new Date();
    
    const isWithinTimeFrame = (dateStr: string, compareDate = now): boolean => {
      const date = new Date(dateStr);
      
      switch (timeFrame) {
        case "day":
          return isSameDay(date, now);
        case "week":
          return isSameWeek(date, now, { weekStartsOn: 1 });
        case "month":
          return isSameMonth(date, now);
        case "quarter":
          return isSameQuarter(date, now);
        case "year":
          return isSameYear(date, now);
        case "custom":
          return differenceInDays(now, date) <= customPeriod;
        default:
          return false;
      }
    };

    const recentContacts = contacts.filter(contact => isWithinTimeFrame(contact.createdAt));
    
    const statusCounts = {
      lead: recentContacts.filter(c => c.status === "lead").length,
      prospect: recentContacts.filter(c => c.status === "prospect").length,
      client: recentContacts.filter(c => c.status === "client").length,
      lost: recentContacts.filter(c => c.status === "lost").length,
      terminated: recentContacts.filter(c => c.status === "terminated").length,
    };
    
    const totalLeads = statusCounts.lead + statusCounts.prospect + statusCounts.client + statusCounts.lost;
    const conversionRate = totalLeads > 0 ? (statusCounts.client / totalLeads) * 100 : 0;
    
    const totalValue = recentContacts.reduce((sum, contact) => sum + (contact.value || 0), 0);
    const averageValue = recentContacts.length > 0 ? totalValue / recentContacts.length : 0;
    
    let timeSeriesData = [];
    let compareData = [];
    let labelFormat = "";
    
    switch (timeFrame) {
      case "day":
        timeSeriesData = Array.from({ length: 24 }, (_, i) => ({
          name: `${i}:00`,
          value: recentContacts.filter(c => {
            const date = new Date(c.createdAt);
            return date.getHours() === i;
          }).length
        }));
        labelFormat = "HH:mm";
        break;
        
      case "week":
        timeSeriesData = Array.from({ length: 7 }, (_, i) => {
          const day = (i + 1) % 7;
          return {
            name: format(new Date(2023, 0, day + 1), "EEE", { locale: enUS }),
            value: recentContacts.filter(c => {
              const date = new Date(c.createdAt);
              return date.getDay() === day;
            }).length
          };
        });
        labelFormat = "EEE";
        break;
        
      case "month":
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        timeSeriesData = Array.from({ length: daysInMonth }, (_, i) => ({
          name: `${i + 1}`,
          value: recentContacts.filter(c => {
            const date = new Date(c.createdAt);
            return date.getDate() === i + 1;
          }).length
        }));
        labelFormat = "d";
        break;
        
      case "quarter":
        const quarterMonth = Math.floor(now.getMonth() / 3) * 3;
        timeSeriesData = Array.from({ length: 3 }, (_, i) => ({
          name: format(new Date(now.getFullYear(), quarterMonth + i, 1), "MMM"),
          value: recentContacts.filter(c => {
            const date = new Date(c.createdAt);
            return date.getMonth() === quarterMonth + i;
          }).length
        }));
        labelFormat = "MMM";
        break;
        
      case "year":
        timeSeriesData = Array.from({ length: 12 }, (_, i) => ({
          name: format(new Date(now.getFullYear(), i, 1), "MMM"),
          value: recentContacts.filter(c => {
            const date = new Date(c.createdAt);
            return date.getMonth() === i;
          }).length
        }));
        labelFormat = "MMM";
        break;
        
      case "custom":
        timeSeriesData = Array.from({ length: customPeriod }, (_, i) => {
          const date = subDays(now, customPeriod - i - 1);
          return {
            name: format(date, "d/M"),
            value: contacts.filter(c => {
              const contactDate = new Date(c.createdAt);
              return isSameDay(contactDate, date);
            }).length
          };
        });
        labelFormat = "d/M";
        break;
    }

    const getPreviousPeriodContacts = () => {
      const startOfCurrentPeriod = (() => {
        switch (timeFrame) {
          case "day": return startOfDay(now);
          case "week": return startOfWeek(now, { weekStartsOn: 1 });
          case "month": return startOfMonth(now);
          case "quarter": return startOfQuarter(now);
          case "year": return startOfYear(now);
          case "custom": return subDays(now, customPeriod);
          default: return startOfDay(now);
        }
      })();
      
      const startOfPreviousPeriod = (() => {
        switch (timeFrame) {
          case "day": return subDays(startOfCurrentPeriod, 1);
          case "week": return subWeeks(startOfCurrentPeriod, 1);
          case "month": return subMonths(startOfCurrentPeriod, 1);
          case "quarter": return subQuarters(startOfCurrentPeriod, 1);
          case "year": return subYears(startOfCurrentPeriod, 1);
          case "custom": return subDays(startOfCurrentPeriod, customPeriod);
          default: return subDays(startOfCurrentPeriod, 1);
        }
      })();
      
      const durationInDays = differenceInDays(startOfCurrentPeriod, startOfPreviousPeriod);
      
      return contacts.filter(contact => {
        const contactDate = new Date(contact.createdAt);
        return contactDate >= startOfPreviousPeriod && contactDate < startOfCurrentPeriod;
      });
    };
    
    const previousPeriodContacts = getPreviousPeriodContacts();
    const previousTotal = previousPeriodContacts.length;
    const currentTotal = recentContacts.length;
    const growthRate = previousTotal > 0 ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0;
    
    return {
      totalNew: recentContacts.length,
      statusCounts,
      conversionRate,
      timeSeriesData,
      averageValue,
      growthRate,
      timeFrameLabel: (() => {
        switch (timeFrame) {
          case "day": return "Today";
          case "week": return "This Week";
          case "month": return "This Month";
          case "quarter": return "This Quarter";
          case "year": return "This Year";
          case "custom": return `Last ${customPeriod} Days`;
          default: return "Period";
        }
      })()
    };
  }, [contacts, timeFrame, customPeriod]);

  const chartConfig = {
    leads: {
      label: "Leads",
      theme: {
        light: "#3b82f6",  // blue-500
        dark: "#60a5fa"    // blue-400
      }
    }
  };

  const renderTimeframeChart = (currentTimeframe: TimeFrame) => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={analytics.timeSeriesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
          <Bar dataKey="value" name="leads" fill="var(--color-leads)" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="day" value={timeFrame} onValueChange={(value) => setTimeFrame(value as TimeFrame)} className="w-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Sales Performance</h3>
          <TabsList>
            <TabsTrigger value="day">Daily</TabsTrigger>
            <TabsTrigger value="week">Weekly</TabsTrigger>
            <TabsTrigger value="month">Monthly</TabsTrigger>
            <TabsTrigger value="quarter">Quarterly</TabsTrigger>
            <TabsTrigger value="year">Yearly</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
        </div>
        
        {timeFrame === "custom" && (
          <div className="flex items-center gap-2 mb-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCustomPeriod(7)}
              className={customPeriod === 7 ? "bg-primary/10" : ""}
            >
              7 Days
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCustomPeriod(14)}
              className={customPeriod === 14 ? "bg-primary/10" : ""}
            >
              14 Days
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCustomPeriod(30)}
              className={customPeriod === 30 ? "bg-primary/10" : ""}
            >
              30 Days
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCustomPeriod(90)}
              className={customPeriod === 90 ? "bg-primary/10" : ""}
            >
              90 Days
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <Card className="shadow-sm">
            <CardContent className="p-3 flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Users className="h-4 w-4 text-blue-700" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">New Contacts</p>
                <h4 className="text-lg font-semibold">{analytics.totalNew} <span className="text-xs font-normal text-muted-foreground">in {analytics.timeFrameLabel.toLowerCase()}</span></h4>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-3 flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <TrendingUp className="h-4 w-4 text-green-700" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Conversion Rate</p>
                <h4 className="text-lg font-semibold">{analytics.conversionRate.toFixed(1)}%</h4>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-3 flex items-center">
              <div className="bg-amber-100 p-2 rounded-full mr-3">
                <Calendar className="h-4 w-4 text-amber-700" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg. Contact Value</p>
                <h4 className="text-lg font-semibold">{analytics.averageValue.toFixed(0)}€</h4>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-3 flex items-center">
              <div className={`p-2 rounded-full mr-3 ${analytics.growthRate >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <ArrowUpRight className={`h-4 w-4 ${analytics.growthRate >= 0 ? 'text-green-700' : 'text-red-700'} ${analytics.growthRate < 0 ? 'rotate-90' : ''}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Growth Rate</p>
                <h4 className="text-lg font-semibold">{analytics.growthRate.toFixed(1)}%</h4>
              </div>
            </CardContent>
          </Card>
        </div>

        <TabsContent value={timeFrame} className="w-full h-[300px]">
          <ChartContainer className="h-full" config={chartConfig}>
            {renderTimeframeChart(timeFrame)}
          </ChartContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
}
