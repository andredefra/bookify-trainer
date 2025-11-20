
import { useMemo } from "react";
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
import { SalesContact } from "../types";
import { TimeFrame, TimeAnalyticsData } from "./types";

export function useTimeAnalytics(contacts: SalesContact[], timeFrame: TimeFrame, customPeriod: number): TimeAnalyticsData {
  return useMemo(() => {
    const now = new Date();
    
    const isWithinTimeFrame = (dateStr: string, compareDate = now): boolean => {
      const date = new Date(dateStr);
      
      switch (timeFrame) {
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
      case "week":
        timeSeriesData = Array.from({ length: 7 }, (_, i) => {
          const day = (i + 1) % 7;
          return {
            name: format(new Date(2025, 0, day + 1), "EEE", { locale: enUS }),
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
          name: format(new Date(2025, quarterMonth + i, 1), "MMM"),
          value: recentContacts.filter(c => {
            const date = new Date(c.createdAt);
            return date.getMonth() === quarterMonth + i;
          }).length
        }));
        labelFormat = "MMM";
        break;
        
      case "year":
        timeSeriesData = Array.from({ length: 12 }, (_, i) => ({
          name: format(new Date(2025, i, 1), "MMM"),
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
          case "week": return subWeeks(startOfCurrentPeriod, 1);
          case "month": return subMonths(startOfCurrentPeriod, 1);
          case "quarter": return subQuarters(startOfCurrentPeriod, 1);
          case "year": return subYears(startOfCurrentPeriod, 1);
          case "custom": return subDays(startOfCurrentPeriod, customPeriod);
          default: return subDays(startOfCurrentPeriod, 1);
        }
      })();
      
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
}
