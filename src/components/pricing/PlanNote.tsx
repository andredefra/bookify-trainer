interface PlanNoteProps {
  planType: 'basic' | 'essential' | 'pro';
}

export const PlanNote = ({ planType }: PlanNoteProps) => {
  if (planType === 'basic') {
    return (
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> Upgrade to Essential or Pro to unlock unlimited features and advanced business tools.
        </p>
      </div>
    );
  }
  
  if (planType === 'essential') {
    return (
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> Upgrade to Pro to unlock payment processing, advanced analytics, and business management tools.
        </p>
      </div>
    );
  }
  
  return null;
};