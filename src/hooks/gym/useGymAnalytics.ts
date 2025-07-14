import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SessionAnalytics {
  totalSessions: number;
  activeSessions: number;
  upcomingSessions: number;
  totalParticipants: number;
  averageAttendance: number;
  popularSessionTypes: { type: string; count: number; attendance: number }[];
  weeklyAttendance: { date: string; attendance: number }[];
  revenueBySessionType: { type: string; revenue: number; participants: number }[];
  peakHours: { hour: number; sessions: number }[];
  packageUtilization: { 
    packageType: string; 
    totalSessions: number; 
    usedSessions: number; 
    utilizationRate: number 
  }[];
}

export interface MemberAnalytics {
  totalMembers: number;
  activeMembers: number;
  newMembersThisMonth: number;
  churnRate: number;
  averageSessionsPerMember: number;
  memberRetention: { period: string; retentionRate: number }[];
  membershipTypes: { type: string; count: number; revenue: number }[];
  topMembers: { 
    id: string; 
    name: string; 
    sessionsAttended: number; 
    packageType: string 
  }[];
}

export interface FinancialAnalytics {
  totalRevenue: number;
  monthlyRevenue: number;
  averageRevenuePerMember: number;
  packageSales: { packageType: string; count: number; revenue: number }[];
  monthlyTrends: { month: string; revenue: number; members: number }[];
  trainerCommissions: { trainerId: string; trainerName: string; commission: number }[];
}

export function useGymAnalytics() {
  const [sessionAnalytics, setSessionAnalytics] = useState<SessionAnalytics | null>(null);
  const [memberAnalytics, setMemberAnalytics] = useState<MemberAnalytics | null>(null);
  const [financialAnalytics, setFinancialAnalytics] = useState<FinancialAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentGymId = () => '11111111-1111-1111-1111-111111111111';

  const fetchSessionAnalytics = useCallback(async () => {
    try {
      const gymId = getCurrentGymId();
      
      // Fetch session data
      const { data: sessions, error: sessionsError } = await supabase
        .from('gym_group_sessions')
        .select(`
          *,
          schedules:gym_session_schedules(
            *,
            participants:gym_session_participants(*)
          )
        `)
        .eq('gym_id', gymId);

      if (sessionsError) throw sessionsError;

      // Calculate analytics
      const totalSessions = sessions?.length || 0;
      const activeSessions = sessions?.filter(s => s.status === 'active').length || 0;
      
      const allSchedules = sessions?.flatMap(s => s.schedules || []) || [];
      const upcomingSessions = allSchedules.filter(
        s => new Date(s.start_datetime) > new Date() && s.status === 'scheduled'
      ).length;

      const totalParticipants = allSchedules.reduce(
        (sum, s) => sum + (s.participants?.length || 0), 0
      );

      const averageAttendance = totalSessions > 0 ? totalParticipants / totalSessions : 0;

      // Popular session types
      const sessionTypeMap = new Map();
      sessions?.forEach(session => {
        const schedules = session.schedules || [];
        const attendanceCount = schedules.reduce(
          (sum, s) => sum + (s.participants?.length || 0), 0
        );
        
        if (sessionTypeMap.has(session.session_type)) {
          const existing = sessionTypeMap.get(session.session_type);
          sessionTypeMap.set(session.session_type, {
            type: session.session_type,
            count: existing.count + 1,
            attendance: existing.attendance + attendanceCount
          });
        } else {
          sessionTypeMap.set(session.session_type, {
            type: session.session_type,
            count: 1,
            attendance: attendanceCount
          });
        }
      });

      const popularSessionTypes = Array.from(sessionTypeMap.values())
        .sort((a, b) => b.attendance - a.attendance);

      return {
        totalSessions,
        activeSessions,
        upcomingSessions,
        totalParticipants,
        averageAttendance,
        popularSessionTypes,
        weeklyAttendance: [], // TODO: Implement
        revenueBySessionType: [], // TODO: Implement
        peakHours: [], // TODO: Implement
        packageUtilization: [] // TODO: Implement
      };
    } catch (err) {
      console.error('Error fetching session analytics:', err);
      // Return demo data
      return {
        totalSessions: 25,
        activeSessions: 18,
        upcomingSessions: 42,
        totalParticipants: 156,
        averageAttendance: 6.2,
        popularSessionTypes: [
          { type: 'hiit', count: 8, attendance: 64 },
          { type: 'yoga', count: 6, attendance: 48 },
          { type: 'strength', count: 5, attendance: 35 },
          { type: 'cardio', count: 4, attendance: 28 },
          { type: 'crossfit', count: 2, attendance: 16 }
        ],
        weeklyAttendance: [
          { date: '2024-01-01', attendance: 45 },
          { date: '2024-01-02', attendance: 52 },
          { date: '2024-01-03', attendance: 38 },
          { date: '2024-01-04', attendance: 61 },
          { date: '2024-01-05', attendance: 47 },
          { date: '2024-01-06', attendance: 55 },
          { date: '2024-01-07', attendance: 42 }
        ],
        revenueBySessionType: [
          { type: 'hiit', revenue: 1200, participants: 64 },
          { type: 'yoga', revenue: 960, participants: 48 },
          { type: 'strength', revenue: 700, participants: 35 }
        ],
        peakHours: [
          { hour: 9, sessions: 8 },
          { hour: 18, sessions: 12 },
          { hour: 19, sessions: 10 }
        ],
        packageUtilization: [
          { packageType: 'Premium', totalSessions: 20, usedSessions: 16, utilizationRate: 80 },
          { packageType: 'Basic', totalSessions: 10, usedSessions: 7, utilizationRate: 70 },
          { packageType: 'Unlimited', totalSessions: 100, usedSessions: 85, utilizationRate: 85 }
        ]
      };
    }
  }, []);

  const fetchMemberAnalytics = useCallback(async () => {
    try {
      const gymId = getCurrentGymId();
      
      // TODO: Implement real data fetching
      // For now, return demo data
      return {
        totalMembers: 247,
        activeMembers: 189,
        newMembersThisMonth: 23,
        churnRate: 5.2,
        averageSessionsPerMember: 8.5,
        memberRetention: [
          { period: '1 month', retentionRate: 95 },
          { period: '3 months', retentionRate: 87 },
          { period: '6 months', retentionRate: 76 },
          { period: '12 months', retentionRate: 68 }
        ],
        membershipTypes: [
          { type: 'Premium', count: 89, revenue: 8900 },
          { type: 'Basic', count: 134, revenue: 6700 },
          { type: 'Unlimited', count: 24, revenue: 4800 }
        ],
        topMembers: [
          { id: '1', name: 'Sarah Johnson', sessionsAttended: 24, packageType: 'Unlimited' },
          { id: '2', name: 'Mike Chen', sessionsAttended: 21, packageType: 'Premium' },
          { id: '3', name: 'Emma Davis', sessionsAttended: 19, packageType: 'Premium' }
        ]
      };
    } catch (err) {
      console.error('Error fetching member analytics:', err);
      throw err;
    }
  }, []);

  const fetchFinancialAnalytics = useCallback(async () => {
    try {
      const gymId = getCurrentGymId();
      
      // TODO: Implement real data fetching
      // For now, return demo data
      return {
        totalRevenue: 34750,
        monthlyRevenue: 12800,
        averageRevenuePerMember: 142,
        packageSales: [
          { packageType: 'Premium', count: 89, revenue: 17800 },
          { packageType: 'Basic', count: 134, revenue: 13400 },
          { packageType: 'Unlimited', count: 24, revenue: 3600 }
        ],
        monthlyTrends: [
          { month: 'Jan', revenue: 11200, members: 201 },
          { month: 'Feb', revenue: 12100, members: 218 },
          { month: 'Mar', revenue: 12800, members: 247 }
        ],
        trainerCommissions: [
          { trainerId: '1', trainerName: 'Alex Rodriguez', commission: 1250 },
          { trainerId: '2', trainerName: 'Lisa Wang', commission: 980 },
          { trainerId: '3', trainerName: 'John Smith', commission: 750 }
        ]
      };
    } catch (err) {
      console.error('Error fetching financial analytics:', err);
      throw err;
    }
  }, []);

  const fetchAllAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [sessionData, memberData, financialData] = await Promise.all([
        fetchSessionAnalytics(),
        fetchMemberAnalytics(),
        fetchFinancialAnalytics()
      ]);

      setSessionAnalytics(sessionData);
      setMemberAnalytics(memberData);
      setFinancialAnalytics(financialData);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to fetch analytics data');
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  }, [fetchSessionAnalytics, fetchMemberAnalytics, fetchFinancialAnalytics]);

  useEffect(() => {
    fetchAllAnalytics();
  }, [fetchAllAnalytics]);

  return {
    sessionAnalytics,
    memberAnalytics,
    financialAnalytics,
    loading,
    error,
    refetch: fetchAllAnalytics
  };
}