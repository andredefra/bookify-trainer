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

export interface CreateMemberData {
  name: string;
  email: string;
  phone?: string;
  membershipType: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'suspended';
  lastActivityDate?: string;
  avatar?: string;
}