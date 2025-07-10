export interface PlanDetailsDialogProps {
  planType: 'basic' | 'essential' | 'pro';
  triggerText: string;
  children?: React.ReactNode;
}

export interface FeatureDetail {
  name: string;
  description: string;
  isInheritedFeature?: boolean;
}