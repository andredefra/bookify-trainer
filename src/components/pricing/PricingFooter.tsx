
interface PricingFooterProps {
  disclaimerText: string;
  clientsAccessText: string;
}

export const PricingFooter = ({ disclaimerText, clientsAccessText }: PricingFooterProps) => {
  return (
    <div className="mt-16 text-center">
      <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
        {disclaimerText}
      </p>
      <p className="text-sm text-primary font-medium mt-4 max-w-2xl mx-auto">
        {clientsAccessText}
      </p>
    </div>
  );
};
