import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, Calendar, Euro, Users, Star } from "lucide-react";
import { useState } from "react";
import { PackagePurchaseDialog } from "./PackagePurchaseDialog";

interface GymPackage {
  id: string;
  title: string;
  description: string;
  package_type: string;
  price: number;
  duration_days: number | null;
  session_limit: number | null;
  trainer_commission_percentage: number;
  is_active: boolean;
  features: string[];
  rating: number;
  reviews_count: number;
}

interface PackageMarketplaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  gymId?: string;
}

export function PackageMarketplaceDialog({ open, onOpenChange, gymId }: PackageMarketplaceDialogProps) {
  const [selectedPackage, setSelectedPackage] = useState<GymPackage | null>(null);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);

  // Demo packages data - in real app would come from useGymPackages hook
  const packages: GymPackage[] = [
    {
      id: '1',
      title: 'Monthly Unlimited',
      description: 'Access to all gym facilities, group classes, and swimming pool',
      package_type: 'monthly',
      price: 89.99,
      duration_days: 30,
      session_limit: null,
      trainer_commission_percentage: 20,
      is_active: true,
      features: [
        'Unlimited gym access',
        'All group classes included',
        'Swimming pool access',
        'Locker room with towel service',
        'Nutritional consultation'
      ],
      rating: 4.8,
      reviews_count: 156
    },
    {
      id: '2',
      title: 'Personal Training 10 Sessions',
      description: 'One-on-one personal training sessions with certified trainers',
      package_type: 'sessions',
      price: 750.00,
      duration_days: 90,
      session_limit: 10,
      trainer_commission_percentage: 30,
      is_active: true,
      features: [
        '10 personal training sessions',
        'Customized workout plan',
        'Progress tracking',
        'Nutrition guidance',
        'Flexible scheduling'
      ],
      rating: 4.9,
      reviews_count: 89
    },
    {
      id: '3',
      title: 'Weekly Group Classes',
      description: 'Unlimited access to group fitness classes for one week',
      package_type: 'weekly',
      price: 39.99,
      duration_days: 7,
      session_limit: null,
      trainer_commission_percentage: 15,
      is_active: true,
      features: [
        'All group classes',
        'Yoga and Pilates',
        'HIIT and cardio',
        'Dance fitness',
        'Equipment included'
      ],
      rating: 4.6,
      reviews_count: 203
    },
    {
      id: '4',
      title: 'Premium Annual',
      description: 'Full year access with additional perks and services',
      package_type: 'annual',
      price: 899.99,
      duration_days: 365,
      session_limit: null,
      trainer_commission_percentage: 25,
      is_active: true,
      features: [
        'Unlimited gym access',
        'All group classes',
        'Swimming pool',
        '12 personal training sessions',
        'Guest passes (2/month)',
        'Priority booking',
        'Free gear bag'
      ],
      rating: 4.9,
      reviews_count: 67
    }
  ];

  const getPackageTypeColor = (type: string) => {
    const colors = {
      'monthly': 'bg-blue-100 text-blue-800',
      'weekly': 'bg-green-100 text-green-800',
      'sessions': 'bg-purple-100 text-purple-800',
      'annual': 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatPrice = (price: number, type: string) => {
    if (type === 'sessions') return `€${price.toFixed(2)} total`;
    if (type === 'monthly') return `€${price.toFixed(2)}/month`;
    if (type === 'weekly') return `€${price.toFixed(2)}/week`;
    if (type === 'annual') return `€${price.toFixed(2)}/year`;
    return `€${price.toFixed(2)}`;
  };

  const handlePurchasePackage = (pkg: GymPackage) => {
    setSelectedPackage(pkg);
    setPurchaseDialogOpen(true);
  };

  const handlePurchaseComplete = () => {
    setPurchaseDialogOpen(false);
    setSelectedPackage(null);
    onOpenChange(false);
    // Here you would refresh the user's packages
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Package Marketplace
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6 md:grid-cols-2">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {pkg.title}
                        <Badge variant="secondary" className={getPackageTypeColor(pkg.package_type)}>
                          {pkg.package_type}
                        </Badge>
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{pkg.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({pkg.reviews_count} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {formatPrice(pkg.price, pkg.package_type)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {pkg.description}
                  </p>
                  
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    {pkg.duration_days && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {pkg.duration_days} days
                      </div>
                    )}
                    {pkg.session_limit && (
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {pkg.session_limit} sessions
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Included:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => handlePurchasePackage(pkg)}
                  >
                    <Euro className="h-4 w-4 mr-2" />
                    Purchase Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {selectedPackage && (
        <PackagePurchaseDialog
          open={purchaseDialogOpen}
          onOpenChange={setPurchaseDialogOpen}
          package={selectedPackage}
          onPurchaseComplete={handlePurchaseComplete}
        />
      )}
    </>
  );
}