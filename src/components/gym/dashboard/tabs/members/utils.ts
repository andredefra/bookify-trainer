
export const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-50 text-green-700 border-green-200";
    case "Away":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Inactive":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export const getMembershipColor = (type: string) => {
  switch (type) {
    case "Premium":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "Standard":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

export const getPlatformStatusColor = (isActive: boolean) => {
  return isActive 
    ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
    : "bg-red-50 text-red-700 border-red-200";
};

export const getPlatformStatusText = (isActive: boolean) => {
  return isActive ? "Platform Active" : "Not on Platform";
};

// Sample member data for the component
export const sampleMembers = [
  { 
    id: 1, 
    name: "Sofia Ricci", 
    email: "sofia.r@example.com",
    membershipType: "Premium",
    status: "Active",
    platformActive: true,
    lastPlatformLogin: "Today",
    joinDate: "Jan 15, 2023",
    trainingSessions: 48,
    lastActive: "Today",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80" 
  },
  { 
    id: 2, 
    name: "Luca Marino", 
    email: "luca.m@example.com",
    membershipType: "Standard",
    status: "Active",
    platformActive: false,
    lastPlatformLogin: "Never",
    joinDate: "Mar 3, 2023",
    trainingSessions: 32,
    lastActive: "Yesterday",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80" 
  },
  { 
    id: 3, 
    name: "Elena Costa", 
    email: "elena.c@example.com",
    membershipType: "Premium",
    status: "Away",
    platformActive: true,
    lastPlatformLogin: "2 days ago",
    joinDate: "Nov 12, 2022",
    trainingSessions: 56,
    lastActive: "4 days ago",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80" 
  },
  { 
    id: 4, 
    name: "Roberto Ferrari", 
    email: "roberto.f@example.com",
    membershipType: "Standard",
    status: "Active",
    platformActive: false,
    lastPlatformLogin: "Never",
    joinDate: "Feb 28, 2023",
    trainingSessions: 28,
    lastActive: "2 days ago",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80" 
  },
  { 
    id: 5, 
    name: "Martina Russo", 
    email: "martina.r@example.com",
    membershipType: "Premium",
    status: "Active",
    platformActive: true,
    lastPlatformLogin: "Yesterday",
    joinDate: "Dec 10, 2022",
    trainingSessions: 42,
    lastActive: "Today",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&h=160&q=80" 
  }
];
