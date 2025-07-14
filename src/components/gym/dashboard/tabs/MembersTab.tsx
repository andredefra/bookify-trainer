import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Plus, 
  Users, 
  Phone, 
  Mail, 
  Calendar,
  Activity,
  CreditCard,
  MoreVertical,
  UserPlus,
  Filter
} from "lucide-react";
import { useGymMembers } from "@/hooks/gym/useGymMembers";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function MembersTab() {
  const { members, loading, error, updateMemberStatus, refetch } = useGymMembers();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMembershipTypeColor = (type: string) => {
    switch (type) {
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'unlimited': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Users className="h-8 w-8 animate-pulse mx-auto text-primary" />
          <p className="text-muted-foreground">Loading members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="space-y-4">
          <Users className="h-12 w-12 mx-auto text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold">Error Loading Members</h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
          <Button onClick={refetch} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const activeMembers = members.filter(m => m.status === 'active').length;
  const totalRevenue = members.reduce((sum, member) => 
    sum + member.currentPackages.reduce((pkgSum, pkg) => 
      pkgSum + (pkg.paymentStatus === 'paid' ? 1000 : 0), 0), 0); // Placeholder calculation

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Member Management</h2>
          <p className="text-muted-foreground">
            Manage your gym members, packages, and activities
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Member
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{members.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeMembers} active members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {members.length > 0 ? Math.round((activeMembers / members.length) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Member engagement rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {members.length > 0 ? 
                Math.round(members.reduce((sum, m) => sum + m.totalSessions, 0) / members.length) : 
                0}
            </div>
            <p className="text-xs text-muted-foreground">
              Sessions per member
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From active memberships
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">Member List</TabsTrigger>
          <TabsTrigger value="packages">Package Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No members found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filters."
                  : "Get started by adding your first member."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredMembers.map((member) => {
                const activePackage = member.currentPackages.find(pkg => pkg.status === 'active');
                const utilizationRate = activePackage ? 
                  Math.round((activePackage.sessionsUsed / activePackage.sessionsTotal) * 100) : 0;
                
                return (
                  <Card key={member.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{member.name}</CardTitle>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(member.status)}>
                                {member.status}
                              </Badge>
                              <Badge className={getMembershipTypeColor(member.membershipType)}>
                                {member.membershipType}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedMember(member.id)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Edit Member
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Assign Package
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => updateMemberStatus(member.id, 
                                member.status === 'active' ? 'inactive' : 'active')}
                            >
                              {member.status === 'active' ? 'Deactivate' : 'Activate'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate">{member.email}</span>
                        </div>
                        {member.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{member.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            Joined {new Date(member.joinDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {activePackage && (
                        <div className="p-3 rounded-lg bg-muted/30 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{activePackage.packageTitle}</span>
                            <span className={`text-sm font-medium ${getUtilizationColor(utilizationRate)}`}>
                              {utilizationRate}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${utilizationRate}%` }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {activePackage.sessionsUsed}/{activePackage.sessionsTotal} sessions used
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">{member.totalSessions}</span> total sessions
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedMember(member.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="packages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Package Utilization Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["premium", "basic", "unlimited"].map(packageType => {
                  const typeMembers = members.filter(m => m.membershipType === packageType);
                  const totalSessions = typeMembers.reduce((sum, m) => 
                    sum + m.currentPackages.reduce((pkgSum, pkg) => pkgSum + pkg.sessionsTotal, 0), 0);
                  const usedSessions = typeMembers.reduce((sum, m) => 
                    sum + m.currentPackages.reduce((pkgSum, pkg) => pkgSum + pkg.sessionsUsed, 0), 0);
                  const utilization = totalSessions > 0 ? Math.round((usedSessions / totalSessions) * 100) : 0;

                  return (
                    <div key={packageType} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getMembershipTypeColor(packageType)}>
                            {packageType}
                          </Badge>
                          <span className="font-medium">{typeMembers.length} members</span>
                        </div>
                        <span className={`font-medium ${getUtilizationColor(utilization)}`}>
                          {utilization}% utilized
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${utilization}%` }}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {usedSessions}/{totalSessions} total sessions used
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}