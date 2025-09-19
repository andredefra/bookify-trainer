import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Euro, Clock } from "lucide-react";
import { format, addMonths } from "date-fns";
import { getPaymentSettings } from "@/components/trainer/dashboard/tabs/settings/utils/installmentUtils";

interface InstallmentPlan {
  id: string;
  name: string;
  installments: number;
  frequency: 'monthly' | 'weekly';
  processingFee?: number;
  description?: string;
}

interface InstallmentPlanSelectorProps {
  totalAmount: number;
  selectedPlan: string;
  onPlanChange: (planId: string) => void;
  onInstallmentDetailsChange: (details: InstallmentDetails) => void;
}

export interface InstallmentDetails {
  planId: string;
  installments: number;
  amountPerInstallment: number;
  totalWithFees: number;
  processingFee: number;
  schedule: Array<{
    installmentNumber: number;
    dueDate: string;
    amount: number;
  }>;
}

const generateInstallmentPlans = (): InstallmentPlan[] => {
  const settings = getPaymentSettings();
  
  const plans: InstallmentPlan[] = [
    {
      id: 'full',
      name: 'Pay in Full',
      installments: 1,
      frequency: 'monthly',
      description: 'Pay the complete amount now'
    }
  ];

  if (settings.allowInstallments) {
    settings.defaultInstallmentOptions.forEach(months => {
      const processingFee = settings.processingFeeEnabled 
        ? Math.round((settings.processingFeePercentage / 100) * 100) // Base fee calculation
        : 0;

      plans.push({
        id: `${months}-months`,
        name: `${months} Monthly Payments`,
        installments: months,
        frequency: 'monthly',
        processingFee,
        description: `Split into ${months} monthly payments`
      });
    });
  }

  return plans;
};

export function InstallmentPlanSelector({
  totalAmount,
  selectedPlan,
  onPlanChange,
  onInstallmentDetailsChange
}: InstallmentPlanSelectorProps) {
  const INSTALLMENT_PLANS = generateInstallmentPlans();
  const calculateInstallmentDetails = (plan: InstallmentPlan): InstallmentDetails => {
    const settings = getPaymentSettings();
    let processingFee = plan.processingFee || 0;
    
    // Calculate percentage-based processing fee if enabled
    if (settings.processingFeeEnabled && plan.installments > 1) {
      processingFee = Math.round((totalAmount * settings.processingFeePercentage / 100) * 100) / 100;
    }
    
    const totalWithFees = totalAmount + processingFee;
    const amountPerInstallment = totalWithFees / plan.installments;
    
    const schedule = Array.from({ length: plan.installments }, (_, index) => ({
      installmentNumber: index + 1,
      dueDate: format(addMonths(new Date(), index), 'yyyy-MM-dd'),
      amount: amountPerInstallment
    }));

    return {
      planId: plan.id,
      installments: plan.installments,
      amountPerInstallment,
      totalWithFees,
      processingFee,
      schedule
    };
  };

  const handlePlanSelection = (planId: string) => {
    onPlanChange(planId);
    const plan = INSTALLMENT_PLANS.find(p => p.id === planId);
    if (plan) {
      const details = calculateInstallmentDetails(plan);
      onInstallmentDetailsChange(details);
    }
  };

  const selectedPlanData = INSTALLMENT_PLANS.find(p => p.id === selectedPlan);
  const installmentDetails = selectedPlanData ? calculateInstallmentDetails(selectedPlanData) : null;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Payment Options</h3>
        <p className="text-sm text-muted-foreground">
          Choose how you'd like to pay for this package
        </p>
      </div>

      <RadioGroup value={selectedPlan} onValueChange={handlePlanSelection}>
        {INSTALLMENT_PLANS.map((plan) => {
          const details = calculateInstallmentDetails(plan);
          const isSelected = selectedPlan === plan.id;
          
          return (
            <div key={plan.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={plan.id} id={plan.id} />
                <Label 
                  htmlFor={plan.id} 
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{plan.name}</span>
                      {plan.processingFee && plan.processingFee > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          +€{plan.processingFee} fee
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      {plan.installments === 1 ? (
                        <span className="font-semibold">€{totalAmount.toFixed(2)}</span>
                      ) : (
                        <div>
                          <span className="font-semibold">€{details.amountPerInstallment.toFixed(2)}</span>
                          <span className="text-sm text-muted-foreground"> /month</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {plan.description}
                  </p>
                </Label>
              </div>
              
              {isSelected && plan.installments > 1 && installmentDetails && (
                <Card className="ml-6 border border-primary/20 bg-primary/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Payment Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Euro className="h-3 w-3" />
                        <span>Total: €{installmentDetails.totalWithFees.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{installmentDetails.installments} payments</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Upcoming Payments:</h4>
                      <div className="space-y-1">
                        {installmentDetails.schedule.slice(0, 3).map((payment) => (
                          <div 
                            key={payment.installmentNumber}
                            className="flex justify-between text-xs py-1 px-2 rounded bg-background/50"
                          >
                            <span>
                              Payment {payment.installmentNumber}/{installmentDetails.installments}
                            </span>
                            <span className="font-medium">
                              €{payment.amount.toFixed(2)} - {format(new Date(payment.dueDate), 'MMM dd, yyyy')}
                            </span>
                          </div>
                        ))}
                        {installmentDetails.schedule.length > 3 && (
                          <p className="text-xs text-muted-foreground text-center">
                            +{installmentDetails.schedule.length - 3} more payments
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {installmentDetails.processingFee > 0 && (
                      <div className="text-xs text-muted-foreground border-t pt-2">
                        Processing fee: €{installmentDetails.processingFee.toFixed(2)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}