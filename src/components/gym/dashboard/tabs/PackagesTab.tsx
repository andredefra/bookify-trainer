import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, DollarSign, Users, TrendingUp, Plus, Edit, Trash2, UserPlus } from "lucide-react";
import { useGymPackages } from '@/hooks/gym/useGymPackages';
import { CreatePackageDialog } from '@/components/gym/packages/CreatePackageDialog';
import { AssignPackageDialog } from '@/components/gym/packages/AssignPackageDialog';
import { PackageUsageStats } from './packages/PackageUsageStats';
import { MarketingAutomationTab } from '../../marketing/MarketingAutomationTab';

export function PackagesTab() {
  const {
    packages,
    assignments,
    loading,
    error,
    createPackage,
    updatePackage,
    deletePackage,
    assignPackageToClient,
    getRevenueStats
  } = useGymPackages();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);

  const stats = getRevenueStats();

  const getPackageTypeColor = (type: string) => {
    const colors = {
      daily: 'bg-blue-100 text-blue-800',
      weekly: 'bg-green-100 text-green-800',
      monthly: 'bg-purple-100 text-purple-800',
      quarterly: 'bg-orange-100 text-orange-800',
      yearly: 'bg-red-100 text-red-800',
      unlimited: 'bg-gold-100 text-gold-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800',
      expired: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading packages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading packages</p>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-0">
      {/* Header - Stack on mobile */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-primary" />
          <h1 className="text-xl md:text-2xl font-bold">Gym Packages</h1>
        </div>
        
        {/* Action buttons - Stack on mobile with full width */}
        <div className="flex flex-col gap-3 md:flex-row md:gap-2">
          <Button 
            onClick={() => setAssignDialogOpen(true)} 
            variant="outline"
            className="w-full md:w-auto min-h-[44px] text-base md:text-sm"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Assign Package
          </Button>
          <Button 
            onClick={() => setCreateDialogOpen(true)}
            className="w-full md:w-auto min-h-[44px] text-base md:text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Package
          </Button>
        </div>
      </div>
      
      {/* Statistics Cards - Single column on mobile */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 md:pb-2">
            <CardTitle className="text-base md:text-sm font-medium">
              Active Packages
            </CardTitle>
            <Package className="h-5 w-5 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-3xl md:text-2xl font-bold">{stats.activePackages}</div>
            <p className="text-sm md:text-xs text-muted-foreground mt-1">
              currently available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 md:pb-2">
            <CardTitle className="text-base md:text-sm font-medium">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-5 w-5 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-3xl md:text-2xl font-bold">€{stats.monthlyRevenue.toFixed(2)}</div>
            <p className="text-sm md:text-xs text-muted-foreground mt-1">
              from packages
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 md:pb-2">
            <CardTitle className="text-base md:text-sm font-medium">
              Active Subscriptions
            </CardTitle>
            <Users className="h-5 w-5 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-3xl md:text-2xl font-bold">{stats.activeSubscriptions}</div>
            <p className="text-sm md:text-xs text-muted-foreground mt-1">
              active memberships
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 md:pb-2">
            <CardTitle className="text-base md:text-sm font-medium">
              Total Revenue
            </CardTitle>
            <TrendingUp className="h-5 w-5 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-1">
            <div className="text-3xl md:text-2xl font-bold">€{stats.totalRevenue.toFixed(2)}</div>
            <p className="text-sm md:text-xs text-muted-foreground mt-1">
              all time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Package Usage Statistics */}
      <PackageUsageStats assignments={assignments} />

      {/* Tabs for Packages and Assignments */}
      <Tabs defaultValue="packages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="packages">Package Templates</TabsTrigger>
          <TabsTrigger value="assignments">Active Subscriptions</TabsTrigger>
          <TabsTrigger value="marketing">Marketing Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="packages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Package Templates</CardTitle>
              <CardDescription>
                Manage your gym package templates that can be assigned to clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              {packages.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No packages created yet</p>
                  <Button onClick={() => setCreateDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Package
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {packages.map((pkg) => (
                    <Card key={pkg.id} className="relative">
                      <CardHeader className="pb-4 md:pb-3">
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl md:text-lg mb-3 md:mb-0">{pkg.title}</CardTitle>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge className={getPackageTypeColor(pkg.package_type)}>
                                {pkg.package_type}
                              </Badge>
                              {!pkg.is_active && (
                                <Badge variant="secondary">Inactive</Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-left md:text-right">
                            <div className="text-3xl md:text-2xl font-bold">€{pkg.price}</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-4">
                        {pkg.description && (
                          <p className="text-base md:text-sm text-muted-foreground">{pkg.description}</p>
                        )}
                        <div className="space-y-2 text-base md:text-sm">
                          {pkg.duration_days && (
                            <p><span className="font-medium">Duration:</span> {pkg.duration_days} days</p>
                          )}
                          {pkg.session_limit && (
                            <p><span className="font-medium">Sessions:</span> {pkg.session_limit}</p>
                          )}
                          <p><span className="font-medium">Trainer Commission:</span> {pkg.trainer_commission_percentage}%</p>
                        </div>
                        <div className="flex flex-col gap-3 md:flex-row md:gap-2 pt-2">
                          <Button 
                            size="default" 
                            variant="outline" 
                            className="w-full md:flex-1 min-h-[44px] md:min-h-[36px] text-base md:text-sm"
                          >
                            <Edit className="w-4 h-4 mr-2 md:w-3 md:h-3 md:mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="default"
                            variant="outline" 
                            onClick={() => deletePackage(pkg.id)}
                            className="w-full md:w-auto text-red-600 hover:text-red-700 min-h-[44px] md:min-h-[36px] text-base md:text-sm"
                          >
                            <Trash2 className="w-4 h-4 md:w-3 md:h-3" />
                            <span className="md:hidden ml-2">Delete</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
              <CardDescription>
                Monitor client package assignments and subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {assignments.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No active subscriptions</p>
                  <Button onClick={() => setAssignDialogOpen(true)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Assign First Package
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <Card key={assignment.id}>
                      <CardContent className="pt-4 md:pt-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div className="space-y-3 md:space-y-1 flex-1">
                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-2">
                              <h4 className="font-medium text-base md:text-sm">
                                Client: {assignment.client_id.slice(0, 8)}...
                              </h4>
                              <Badge className={getStatusColor(assignment.status)}>
                                {assignment.status}
                              </Badge>
                            </div>
                            <p className="text-base md:text-sm text-muted-foreground">
                              <span className="font-medium">Package:</span> {assignment.package?.title || 'Unknown Package'}
                            </p>
                            <p className="text-base md:text-sm text-muted-foreground">
                              <span className="font-medium">Trainer:</span> {assignment.trainer_id ? assignment.trainer_id.slice(0, 8) + '...' : 'Gym Access Only'}
                            </p>
                          </div>
                          <div className="text-left md:text-right border-t pt-4 md:border-t-0 md:pt-0">
                            <div className="font-medium text-lg md:text-base">€{assignment.total_paid}</div>
                            <p className="text-base md:text-sm text-muted-foreground mt-1">
                              <span className="md:hidden font-medium">Sessions: </span>
                              {assignment.sessions_used}/{assignment.sessions_total || '∞'}
                              <span className="hidden md:inline"> sessions</span>
                            </p>
                            {assignment.end_date && (
                              <p className="text-sm md:text-xs text-muted-foreground mt-1">
                                <span className="md:hidden font-medium">Expires: </span>
                                <span className="hidden md:inline">Expires: </span>
                                {new Date(assignment.end_date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing" className="space-y-4">
          <MarketingAutomationTab />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <CreatePackageDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={createPackage}
      />

      <AssignPackageDialog
        open={assignDialogOpen}
        onOpenChange={setAssignDialogOpen}
        packages={packages}
        onAssign={async (assignmentData) => {
          if (assignmentData.customPackage) {
            // Handle custom package assignment differently for PackagesTab
            console.log('Custom package assignment:', assignmentData);
            return;
          }
          return assignPackageToClient(
            assignmentData.packageId,
            assignmentData.clientId,
            assignmentData.trainerId
          );
        }}
      />
    </div>
  );
}