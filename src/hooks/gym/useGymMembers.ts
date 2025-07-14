import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface GymMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  membershipType: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  lastActivityDate?: string;
  totalSessions: number;
  currentPackages: GymMemberPackage[];
  avatar?: string;
}

export interface GymMemberPackage {
  id: string;
  packageId: string;
  packageTitle: string;
  packageType: string;
  sessionsTotal: number;
  sessionsUsed: number;
  startDate: string;
  endDate?: string;
  status: string;
  paymentStatus: string;
}

export interface MemberActivity {
  id: string;
  memberId: string;
  activityType: 'session_attended' | 'package_purchased' | 'payment_made' | 'membership_renewed';
  description: string;
  date: string;
  sessionTitle?: string;
  packageTitle?: string;
  amount?: number;
}

export function useGymMembers() {
  const [members, setMembers] = useState<GymMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentGymId = () => '11111111-1111-1111-1111-111111111111';

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      const gymId = getCurrentGymId();

      // Fetch gym package assignments to get members
      const { data: assignments, error: assignmentsError } = await supabase
        .from('gym_package_assignments')
        .select(`
          *,
          package:gym_packages(*)
        `)
        .eq('gym_id', gymId);

      if (assignmentsError) throw assignmentsError;

      // Fetch trainer assignments to get additional member data
      const { data: trainerAssignments, error: trainerError } = await supabase
        .from('gym_trainer_assignments')
        .select('*')
        .eq('gym_id', gymId);

      if (trainerError) throw trainerError;

      // Group assignments by client_id to create member profiles
      const memberMap = new Map<string, GymMember>();

      assignments?.forEach(assignment => {
        const clientId = assignment.client_id;
        
        if (!memberMap.has(clientId)) {
          // Create new member profile
          memberMap.set(clientId, {
            id: clientId,
            name: `Member ${clientId.slice(0, 8)}`, // TODO: Get real name from profiles
            email: `member${clientId.slice(0, 8)}@gym.com`, // TODO: Get real email
            membershipType: assignment.package?.package_type || 'basic',
            joinDate: assignment.created_at,
            status: assignment.status === 'active' ? 'active' : 'inactive',
            lastActivityDate: assignment.updated_at,
            totalSessions: assignment.sessions_used || 0,
            currentPackages: []
          });
        }

        // Add package to member's current packages
        const member = memberMap.get(clientId)!;
        member.currentPackages.push({
          id: assignment.id,
          packageId: assignment.package_id,
          packageTitle: assignment.package?.title || 'Unknown Package',
          packageType: assignment.package?.package_type || 'basic',
          sessionsTotal: assignment.sessions_total || 0,
          sessionsUsed: assignment.sessions_used || 0,
          startDate: assignment.start_date,
          endDate: assignment.end_date,
          status: assignment.status || 'active',
          paymentStatus: assignment.payment_status || 'pending'
        });

        // Update total sessions
        member.totalSessions += assignment.sessions_used || 0;
      });

      const membersArray = Array.from(memberMap.values());
      setMembers(membersArray);

    } catch (err) {
      console.error('Error fetching members:', err);
      setError('Failed to fetch members');
      
      // Demo data fallback
      const demoMembers: GymMember[] = [
        {
          id: '00000000-0000-0000-0000-000000000001',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '+1 (555) 123-4567',
          membershipType: 'premium',
          joinDate: '2024-01-15T00:00:00Z',
          status: 'active',
          lastActivityDate: '2024-03-10T15:30:00Z',
          totalSessions: 24,
          currentPackages: [
            {
              id: 'pkg1',
              packageId: 'premium-monthly',
              packageTitle: 'Premium Monthly',
              packageType: 'premium',
              sessionsTotal: 30,
              sessionsUsed: 24,
              startDate: '2024-03-01T00:00:00Z',
              endDate: '2024-03-31T00:00:00Z',
              status: 'active',
              paymentStatus: 'paid'
            }
          ]
        },
        {
          id: '00000000-0000-0000-0000-000000000002',
          name: 'Mike Chen',
          email: 'mike.chen@email.com',
          phone: '+1 (555) 234-5678',
          membershipType: 'basic',
          joinDate: '2024-02-01T00:00:00Z',
          status: 'active',
          lastActivityDate: '2024-03-09T18:45:00Z',
          totalSessions: 16,
          currentPackages: [
            {
              id: 'pkg2',
              packageId: 'basic-monthly',
              packageTitle: 'Basic Monthly',
              packageType: 'basic',
              sessionsTotal: 20,
              sessionsUsed: 16,
              startDate: '2024-03-01T00:00:00Z',
              endDate: '2024-03-31T00:00:00Z',
              status: 'active',
              paymentStatus: 'paid'
            }
          ]
        },
        {
          id: '00000000-0000-0000-0000-000000000003',
          name: 'Emma Davis',
          email: 'emma.davis@email.com',
          phone: '+1 (555) 345-6789',
          membershipType: 'unlimited',
          joinDate: '2023-12-10T00:00:00Z',
          status: 'active',
          lastActivityDate: '2024-03-11T10:15:00Z',
          totalSessions: 45,
          currentPackages: [
            {
              id: 'pkg3',
              packageId: 'unlimited-monthly',
              packageTitle: 'Unlimited Monthly',
              packageType: 'unlimited',
              sessionsTotal: 100,
              sessionsUsed: 45,
              startDate: '2024-03-01T00:00:00Z',
              endDate: '2024-03-31T00:00:00Z',
              status: 'active',
              paymentStatus: 'paid'
            }
          ]
        }
      ];
      setMembers(demoMembers);
    } finally {
      setLoading(false);
    }
  }, []);

  const getMemberActivity = useCallback(async (memberId: string): Promise<MemberActivity[]> => {
    try {
      // TODO: Implement real activity fetching
      // For now return demo data
      return [
        {
          id: '1',
          memberId,
          activityType: 'session_attended',
          description: 'Attended HIIT Blast session',
          date: '2024-03-11T09:00:00Z',
          sessionTitle: 'HIIT Blast'
        },
        {
          id: '2',
          memberId,
          activityType: 'session_attended',
          description: 'Attended Yoga Flow session',
          date: '2024-03-10T18:00:00Z',
          sessionTitle: 'Yoga Flow'
        },
        {
          id: '3',
          memberId,
          activityType: 'package_purchased',
          description: 'Purchased Premium Monthly package',
          date: '2024-03-01T00:00:00Z',
          packageTitle: 'Premium Monthly',
          amount: 99
        }
      ];
    } catch (err) {
      console.error('Error fetching member activity:', err);
      return [];
    }
  }, []);

  const updateMemberStatus = useCallback(async (memberId: string, status: GymMember['status']) => {
    try {
      // TODO: Implement real status update
      setMembers(prev => prev.map(member => 
        member.id === memberId ? { ...member, status } : member
      ));
      toast.success(`Member status updated to ${status}`);
    } catch (err) {
      console.error('Error updating member status:', err);
      toast.error('Failed to update member status');
    }
  }, []);

  const createMember = useCallback(async (memberData: Omit<GymMember, 'id' | 'totalSessions' | 'currentPackages'>) => {
    try {
      // TODO: Implement real member creation
      const newMember: GymMember = {
        ...memberData,
        id: crypto.randomUUID(),
        totalSessions: 0,
        currentPackages: []
      };
      
      setMembers(prev => [newMember, ...prev]);
      toast.success('Member created successfully');
      return newMember;
    } catch (err) {
      console.error('Error creating member:', err);
      toast.error('Failed to create member');
      throw err;
    }
  }, []);

  const assignPackageToMember = useCallback(async (
    memberId: string, 
    packageId: string, 
    trainerId?: string
  ) => {
    try {
      const gymId = getCurrentGymId();
      
      // For now, just fetch the package data and create a demo assignment
      const { data: packageData, error: packageError } = await supabase
        .from('gym_packages')
        .select('*')
        .eq('id', packageId)
        .single();

      if (packageError) throw packageError;

      const newAssignment: GymMemberPackage = {
        id: crypto.randomUUID(),
        packageId,
        packageTitle: packageData.title,
        packageType: packageData.package_type,
        sessionsTotal: packageData.session_limit || 0,
        sessionsUsed: 0,
        startDate: new Date().toISOString(),
        endDate: packageData.duration_days ? 
          new Date(Date.now() + packageData.duration_days * 24 * 60 * 60 * 1000).toISOString() : 
          undefined,
        status: 'active',
        paymentStatus: 'pending'
      };

      setMembers(prev => prev.map(member => 
        member.id === memberId 
          ? { ...member, currentPackages: [...member.currentPackages, newAssignment] }
          : member
      ));

      toast.success('Package assigned to member successfully');
    } catch (err) {
      console.error('Error assigning package:', err);
      toast.error('Failed to assign package');
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return {
    members,
    loading,
    error,
    getMemberActivity,
    updateMemberStatus,
    createMember,
    assignPackageToMember,
    refetch: fetchMembers
  };
}