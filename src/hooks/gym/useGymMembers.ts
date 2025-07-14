import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import type { GymMember, CreateMemberData } from '@/types/gym/members';
import {
  fetchMembers,
  getMemberActivity,
  updateMemberStatus as updateMemberStatusService,
  createMember as createMemberService,
  assignPackageToMember as assignPackageToMemberService,
  getDemoMembers
} from '@/services/gym/membersService';

export function useGymMembers() {
  const [members, setMembers] = useState<GymMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      const membersData = await fetchMembers();
      setMembers(membersData);
      setError(null);
    } catch (err) {
      console.error('Error fetching members:', err);
      setError('Failed to fetch members');
      
      // Demo data fallback only if error
      const demoMembers = getDemoMembers();
      setMembers(demoMembers);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMemberStatus = useCallback(async (memberId: string, status: GymMember['status']) => {
    try {
      await updateMemberStatusService(memberId, status);
      setMembers(prev => prev.map(member => 
        member.id === memberId ? { ...member, status } : member
      ));
    } catch (err) {
      console.error('Error updating member status:', err);
      toast.error('Failed to update member status');
    }
  }, []);

  const createMember = useCallback(async (memberData: CreateMemberData) => {
    try {
      const newMember = await createMemberService(memberData);
      setMembers(prev => [newMember, ...prev]);
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
      await assignPackageToMemberService(memberId, packageId, trainerId);
      await refetchMembers(); // Refresh data
    } catch (err) {
      console.error('Error assigning package:', err);
      toast.error('Failed to assign package');
    }
  }, [refetchMembers]);

  useEffect(() => {
    refetchMembers();
  }, [refetchMembers]);

  return {
    members,
    loading,
    error,
    getMemberActivity,
    updateMemberStatus,
    createMember,
    assignPackageToMember,
    refetch: refetchMembers
  };
}

// Re-export types for backward compatibility
export type { GymMember, GymMemberPackage, MemberActivity } from '@/types/gym/members';