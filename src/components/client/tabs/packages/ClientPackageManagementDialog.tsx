import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { ClientPackagePaymentsTab } from './ClientPackagePaymentsTab';
import { ClientPackageSessionsTab } from './ClientPackageSessionsTab';

interface ClientPackageManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageData: {
    id: string;
    package: {
      title: string;
      description?: string;
      package_type?: string;
    };
    trainer_id: string;
    trainer_name: string;
    sessions_total: number;
    sessions_used: number;
    status: string;
    purchase_date: string;
    expiry_date?: string;
    total_paid: number;
  } | null;
}

export const ClientPackageManagementDialog = ({
  open,
  onOpenChange,
  packageData,
}: ClientPackageManagementDialogProps) => {
  if (!packageData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Manage Package</DialogTitle>
          <DialogDescription>{packageData.package.title}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="flex-1 overflow-auto">
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Package Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Trainer:</span>
                    <p className="font-medium">{packageData.trainer_name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <p className="font-medium capitalize">{packageData.status}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Sessions:</span>
                    <p className="font-medium">
                      {packageData.sessions_used} / {packageData.sessions_total}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Paid:</span>
                    <p className="font-medium">€{packageData.total_paid}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Purchase Date:</span>
                    <p className="font-medium">{format(new Date(packageData.purchase_date), 'PP')}</p>
                  </div>
                  {packageData.expiry_date && (
                    <div>
                      <span className="text-muted-foreground">Expiry Date:</span>
                      <p className="font-medium">{format(new Date(packageData.expiry_date), 'PP')}</p>
                    </div>
                  )}
                </div>
                {packageData.package.description && (
                  <div className="mt-4">
                    <span className="text-muted-foreground text-sm">Description:</span>
                    <p className="text-sm mt-1">{packageData.package.description}</p>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="flex-1 overflow-auto">
            {(packageData.package.package_type === 'sessions_only' || 
              packageData.package.package_type === 'hybrid') ? (
              <ClientPackageSessionsTab
                packageAssignmentId={packageData.id}
                trainerId={packageData.trainer_id}
                totalSessions={packageData.sessions_total}
              />
            ) : (
              <div className="flex items-center justify-center py-8 text-muted-foreground">
                <p className="text-sm">This package does not include sessions</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="payments" className="flex-1 overflow-hidden">
            <ClientPackagePaymentsTab packageAssignmentId={packageData.id} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
