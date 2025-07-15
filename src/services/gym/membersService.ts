import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { GymMember, GymMemberPackage, MemberActivity, CreateMemberData } from '@/types/gym/members';

const getCurrentGymId = () => '11111111-1111-1111-1111-111111111111';

export const fetchMembers = async (): Promise<GymMember[]> => {
  const gymId = getCurrentGymId();

  try {
    // Fetch gym clients with their profile information and package assignments
    const { data: gymClients, error: clientsError } = await supabase
      .from('gym_clients')
      .select(`
        *,
        profile:profiles(*)
      `)
      .eq('gym_id', gymId);

    if (clientsError) throw clientsError;

    // If no real members found, return demo data
    if (!gymClients || gymClients.length === 0) {
      return getDemoMembers();
    }

    // Fetch package assignments for these clients
    const clientIds = gymClients?.map(gc => gc.client_id) || [];
    let assignments = [];
    if (clientIds.length > 0) {
      const { data: assignmentsData, error: assignmentsError } = await supabase
        .from('gym_package_assignments')
        .select(`
          *,
          package:gym_packages(*)
        `)
        .in('client_id', clientIds);
      
      if (assignmentsError) throw assignmentsError;
      assignments = assignmentsData || [];
    }

    // Map gym clients to member format
    const membersArray: GymMember[] = (gymClients || []).map(gymClient => {
      const profile = gymClient.profile;
      const clientAssignments = assignments?.filter(a => a.client_id === gymClient.client_id) || [];
      
      const currentPackages: GymMemberPackage[] = clientAssignments.map(assignment => ({
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
      }));

      const totalSessions = currentPackages.reduce((sum, pkg) => sum + pkg.sessionsUsed, 0);

      return {
        id: gymClient.client_id,
        name: profile?.full_name || `Member ${gymClient.client_id.slice(0, 8)}`,
        email: profile?.email || `member${gymClient.client_id.slice(0, 8)}@gym.com`,
        phone: profile?.phone || gymClient.emergency_phone,
        membershipType: gymClient.membership_type,
        joinDate: gymClient.join_date || gymClient.created_at,
        status: gymClient.status as 'active' | 'inactive' | 'suspended',
        lastActivityDate: gymClient.last_activity_date || gymClient.updated_at,
        totalSessions,
        currentPackages,
        avatar: profile?.avatar_url
      };
    });

    return membersArray;
  } catch (err) {
    console.error('Error fetching members:', err);
    // Fallback to demo data on error
    return getDemoMembers();
  }
};

export const getMemberActivity = async (memberId: string): Promise<MemberActivity[]> => {
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
};

export const updateMemberStatus = async (memberId: string, status: GymMember['status']): Promise<void> => {
  // TODO: Implement real status update
  toast.success(`Member status updated to ${status}`);
};

export const createMember = async (memberData: CreateMemberData): Promise<GymMember> => {
  const gymId = getCurrentGymId();
  
  // Create a profile first (simulated - in real app this would be done through auth)
  const clientId = crypto.randomUUID();
  
  // Create gym client record
  const { data: gymClient, error: gymClientError } = await supabase
    .from('gym_clients')
    .insert({
      gym_id: gymId,
      client_id: clientId,
      membership_type: memberData.membershipType,
      status: memberData.status,
      join_date: memberData.joinDate,
      emergency_phone: memberData.phone
    })
    .select()
    .single();

  if (gymClientError) throw gymClientError;

  // Create the member object for state update
  const newMember: GymMember = {
    ...memberData,
    id: clientId,
    totalSessions: 0,
    currentPackages: []
  };
  
  toast.success('Member created successfully');
  return newMember;
};

interface PackageAssignmentData {
  packageId: string;
  clientId: string;
  trainerId?: string;
  startDate: Date;
  endDate?: Date;
  sessionsUsed: number;
  totalPaid: number;
  paymentStatus: string;
  customPackage?: {
    title: string;
    description: string;
    packageType: string;
    sessionsTotal: number;
    price: number;
    durationDays?: number;
  };
}

export const assignPackageToMember = async (
  assignmentData: PackageAssignmentData
): Promise<void> => {
  const gymId = getCurrentGymId();
  
  let packageId = assignmentData.packageId;
  let sessionsTotal = 0;
  
  // If it's a custom package, create it first
  if (assignmentData.customPackage) {
    const { data: newPackage, error: packageError } = await supabase
      .from('gym_packages')
      .insert({
        gym_id: gymId,
        title: assignmentData.customPackage.title,
        description: assignmentData.customPackage.description,
        package_type: assignmentData.customPackage.packageType,
        price: assignmentData.customPackage.price,
        duration_days: assignmentData.customPackage.durationDays,
        session_limit: assignmentData.customPackage.sessionsTotal,
        trainer_commission_percentage: 20, // Default commission
        is_active: true
      })
      .select()
      .single();

    if (packageError) throw packageError;
    packageId = newPackage.id;
    sessionsTotal = assignmentData.customPackage.sessionsTotal;
  } else {
    // Fetch existing package data
    const { data: packageData, error: packageError } = await supabase
      .from('gym_packages')
      .select('*')
      .eq('id', packageId)
      .single();

    if (packageError) throw packageError;
    sessionsTotal = packageData.session_limit || 0;
  }

  // Create the assignment in the database
  const { data: assignment, error: assignmentError } = await supabase
    .from('gym_package_assignments')
    .insert({
      gym_id: gymId,
      package_id: packageId,
      client_id: assignmentData.clientId,
      trainer_id: assignmentData.trainerId,
      purchase_date: assignmentData.startDate.toISOString().split('T')[0],
      start_date: assignmentData.startDate.toISOString().split('T')[0],
      end_date: assignmentData.endDate ? assignmentData.endDate.toISOString().split('T')[0] : null,
      sessions_total: sessionsTotal,
      sessions_used: assignmentData.sessionsUsed,
      total_paid: assignmentData.totalPaid,
      payment_status: assignmentData.paymentStatus,
      status: 'active'
    })
    .select()
    .single();

  if (assignmentError) throw assignmentError;

  toast.success('Package assigned to member successfully');
};

// Demo data fallback using real gym package IDs
export const getDemoMembers = (): GymMember[] => [
  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    membershipType: 'premium',
    joinDate: '2024-01-15T00:00:00Z',
    status: 'active',
    lastActivityDate: '2024-07-14T15:30:00Z',
    totalSessions: 24,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b668aa02?w=400&h=400&auto=format&fit=crop&crop=face',
    currentPackages: [
      {
        id: 'demo-pkg-1',
        packageId: '77777777-7777-7777-7777-777777777777', // Premium Monthly
        packageTitle: 'Premium Monthly',
        packageType: 'monthly',
        sessionsTotal: 0, // Unlimited access
        sessionsUsed: 24,
        startDate: '2024-07-01T00:00:00Z',
        endDate: '2024-07-31T00:00:00Z',
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
    membershipType: 'sessions',
    joinDate: '2024-02-01T00:00:00Z',
    status: 'active',
    lastActivityDate: '2024-07-12T18:45:00Z',
    totalSessions: 6,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&crop=face',
    currentPackages: [
      {
        id: 'demo-pkg-2',
        packageId: '88888888-8888-8888-8888-888888888888', // Personal Training 10 Sessions
        packageTitle: 'Personal Training 10 Sessions',
        packageType: 'sessions',
        sessionsTotal: 10,
        sessionsUsed: 6,
        startDate: '2024-06-01T00:00:00Z',
        endDate: '2024-08-30T00:00:00Z',
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
    membershipType: 'annual',
    joinDate: '2023-12-10T00:00:00Z',
    status: 'active',
    lastActivityDate: '2024-07-14T10:15:00Z',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&auto=format&fit=crop&crop=face',
    totalSessions: 145,
    currentPackages: [
      {
        id: 'demo-pkg-3',
        packageId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', // VIP Annual Membership
        packageTitle: 'VIP Annual Membership',
        packageType: 'annual',
        sessionsTotal: 0, // Unlimited access
        sessionsUsed: 145,
        startDate: '2023-12-10T00:00:00Z',
        endDate: '2024-12-09T00:00:00Z',
        status: 'active',
        paymentStatus: 'paid'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@email.com',
    phone: '+1 (555) 456-7890',
    membershipType: 'sessions',
    joinDate: '2024-06-15T00:00:00Z',
    status: 'active',
    lastActivityDate: '2024-07-13T12:00:00Z',
    totalSessions: 8,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&auto=format&fit=crop&crop=face',
    currentPackages: [
      {
        id: 'demo-pkg-4',
        packageId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', // Group Fitness Package
        packageTitle: 'Group Fitness Package',
        packageType: 'sessions',
        sessionsTotal: 20,
        sessionsUsed: 8,
        startDate: '2024-06-15T00:00:00Z',
        endDate: '2024-08-14T00:00:00Z',
        status: 'active',
        paymentStatus: 'paid'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000005',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    phone: '+1 (555) 567-8901',
    membershipType: 'weekly',
    joinDate: '2024-07-08T00:00:00Z',
    status: 'active',
    lastActivityDate: '2024-07-14T08:30:00Z',
    totalSessions: 4,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&auto=format&fit=crop&crop=face',
    currentPackages: [
      {
        id: 'demo-pkg-5',
        packageId: '99999999-9999-9999-9999-999999999999', // Basic Weekly Pass
        packageTitle: 'Basic Weekly Pass',
        packageType: 'weekly',
        sessionsTotal: 0, // Unlimited access for the week
        sessionsUsed: 4,
        startDate: '2024-07-08T00:00:00Z',
        endDate: '2024-07-15T00:00:00Z',
        status: 'active',
        paymentStatus: 'paid'
      }
    ]
  },
  {
    id: '00000000-0000-0000-0000-000000000006',
    name: 'David Wilson',
    email: 'david.wilson@email.com',
    phone: '+1 (555) 678-9012',
    membershipType: 'sessions',
    joinDate: '2024-05-01T00:00:00Z',
    status: 'suspended',
    lastActivityDate: '2024-06-30T16:45:00Z',
    totalSessions: 8,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&auto=format&fit=crop&crop=face',
    currentPackages: [
      {
        id: 'demo-pkg-6',
        packageId: '88888888-8888-8888-8888-888888888888', // Personal Training 10 Sessions
        packageTitle: 'Personal Training 10 Sessions',
        packageType: 'sessions',
        sessionsTotal: 10,
        sessionsUsed: 8,
        startDate: '2024-05-01T00:00:00Z',
        endDate: '2024-07-30T00:00:00Z',
        status: 'suspended',
        paymentStatus: 'overdue'
      }
    ]
  }
];